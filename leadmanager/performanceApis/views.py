from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
import os
import pandas as pd
import numpy as np
from performanceApis.offline_cpd_script import gaussian_obs_log_likelihood, const_prior, offline_changepoint_detection

# Create your views here.


# convert excel file to csv, if already present then read and return csv file
def loadFile():
    path = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(path, 'process_files')
    if '2G_Daily_Dashboard2.csv' not in os.listdir(path):
        excel_df = pd.read_excel(os.path.join(path, '2G_Daily_Dashboard2.xls'))
        excel_df.to_csv(os.path.join(
            path,  '2G_Daily_Dashboard2.csv'), index=False)
        kpis = pd.read_csv(os.path.join(path, '2G_Daily_Dashboard2.csv'))
    kpis = pd.read_csv(os.path.join(path, '2G_Daily_Dashboard2.csv'))
    return kpis


def queryData(data, datefrom, dateto, bsc=''):
    # the below query was for excel...
    # data = data[(data['Start Time'] >= datefrom)
    #             & (data['Start Time'] <= dateto)]

    # convert column to datetime and then query it based on date parameters
    data['Start Time'] = pd.to_datetime(data['Start Time'])
    data = data.query('`Start Time` >= "{datefrom}" and `Start Time` <= "{dateto}"'.format(
        datefrom=datefrom, dateto=dateto))
    if bsc is not '':
        data = data[data['SUBNETWORK Name'] == bsc]
    return data


def getKpiValues(data, kpi):
    values = []
    cells = list(data['cell'].unique())
    for cell in cells:
        process_df = data[data['cell'] == cell]
        values.append(list(process_df[kpi].values))
    return values


def getDates(data):
    dates = list(data['Start Time'].unique())
    stringDates = []
    for date in dates:
        stringDates.append(str(date)[0:10])
    return stringDates


def getKpiChangePoints(dataframe, cells, kpi, detectedCells, alldetection):
    cellNames = []
    cellValues = []
    changePoints = []

    for cell in cells:
        sequence = np.array(
            dataframe[dataframe['cell'] == cell][kpi], dtype='float64')
        Q = 0
        P = 0
        Pcp = 0
        Q, P, Pcp = offline_changepoint_detection(sequence, lambda x: const_prior(
            x, l=(len(sequence)+1)), gaussian_obs_log_likelihood, truncate=-40)
        if max(np.exp(Pcp).sum(0)) > 0.7:
            alldetection.append(cell)
            detectedCells.append(cell)
            cellNames.append(cell)
            cellValues.append(list(sequence))
            changePoints.append(
                list(np.exp(Pcp).sum(0)).index(max(np.exp(Pcp).sum(0))))
    return (cellNames, cellValues, changePoints, detectedCells, alldetection)


# Api method
def getData(request):
    if not request.user.is_authenticated:
        return redirect('/mainapp/login/')
    if request.method == 'GET':

        Data = {}

        # storing cells that have been detected with Change points (for Dashboard)
        cellsWithChangePoints = []

        # storing detected cells in each kpi
        cellsMpd = []
        cellsTchTraffic = []
        cellsTchTraffic1800 = []
        cellsTchTraffic900 = []
        cellsDropsHo = []
        cellsDropsRf = []
        cellsTchAvailability = []
        cellsSdcch = []
        cellsTchRaw = []

        # get parameters
        datefrom = request.GET.get('datefrom')
        dateto = request.GET.get('dateto')
        bsc = request.GET.get('bsc')

        # load, query and then extracting date range from the dataframe
        kpis = loadFile()
        kpis = queryData(kpis, datefrom, dateto, bsc)
        dates = getDates(kpis)

        # get unique cell names
        cells = list(kpis['cell'].unique())
        totalCells = len(cells)

        # processing for Minutes Per Drop
        result = getKpiChangePoints(
            kpis, cells, 'MPD', cellsMpd, cellsWithChangePoints)
        cellsMpd = result[3]
        cellsWithChangePoints = result[4]
        Data['MPD'] = {
            'Cell_Names': result[0],
            'Cell_Values': result[1],
            'Change_Points': result[2]
        }

        # processing for Tch Traffic in Erlang
        result = getKpiChangePoints(
            kpis, cells, 'TCH_Traffic(Erl)', cellsTchTraffic, cellsWithChangePoints)
        cellsTchTraffic = result[3]
        cellsWithChangePoints = result[4]
        Data['TCH_TRAFFIC'] = {
            'Cell_Names': result[0],
            'Cell_Values': result[1],
            'Change_Points': result[2]
        }

        result = getKpiChangePoints(
            kpis, cells, 'TP: TCH_TRAFFIC_1800', cellsTchTraffic1800, cellsWithChangePoints)
        cellsTchTraffic1800 = result[3]
        cellsWithChangePoints = result[4]
        Data['TCH_TRAFFIC_1800'] = {
            'Cell_Names': result[0],
            'Cell_Values': result[1],
            'Change_Points': result[2]
        }

        result = getKpiChangePoints(
            kpis, cells, 'TP: TCH_TRAFFIC_900', cellsTchTraffic900, cellsWithChangePoints)
        cellsTchTraffic900 = result[3]
        cellsWithChangePoints = result[4]
        Data['TCH_TRAFFIC_900'] = {
            'Cell_Names': result[0],
            'Cell_Values': result[1],
            'Change_Points': result[2]
        }

        # int64 not json serializable
        # result = getKpiChangePoints(
        #     kpis, cells, 'TP_RFN: DROPS_BSS', cellsWithChangePoints)
        # cellsWithChangePoints = result[3]
        # Data['DROPS_BSS'] = {
        #     'Cell_Names': result[0],
        #     'Cell_Values': result[1],
        #     'Change_Points': result[2]
        # }

        # int64 not json serializable
        result = getKpiChangePoints(
            kpis, cells, 'TP_RFN: DROPS_HO', cellsDropsHo, cellsWithChangePoints)
        cellsDropsHo = result[3]
        cellsWithChangePoints = result[4]
        Data['DROPS_HO'] = {
            'Cell_Names': result[0],
            'Cell_Values': result[1],
            'Change_Points': result[2]
        }

        # int64 not json serializable
        result = getKpiChangePoints(
            kpis, cells, 'TP_RFN: DROPS_RF', cellsDropsRf, cellsWithChangePoints)
        cellsDropsRf = result[3]
        cellsWithChangePoints = result[4]
        Data['DROPS_RF'] = {
            'Cell_Names': result[0],
            'Cell_Values': result[1],
            'Change_Points': result[2]
        }

        result = getKpiChangePoints(
            kpis, cells, 'TP_RFN: TCH_AVAILABILITY', cellsTchAvailability, cellsWithChangePoints)
        cellsTchAvailability = result[3]
        cellsWithChangePoints = result[4]
        Data['TCH_AVAILABILITY'] = {
            'Cell_Names': result[0],
            'Cell_Values': result[1],
            'Change_Points': result[2]
        }

        result = getKpiChangePoints(
            kpis, cells, 'TP_RFN: SDCCH_BLCK', cellsSdcch, cellsWithChangePoints)
        cellsSdcch = result[3]
        cellsWithChangePoints = result[4]
        Data['SDCCH_BLOCKING'] = {
            'Cell_Names': result[0],
            'Cell_Values': result[1],
            'Change_Points': result[2]
        }

        result = getKpiChangePoints(
            kpis, cells, 'TP_RFN: TCH_RAW_BLCK', cellsTchRaw, cellsWithChangePoints)
        cellsTchRaw = result[3]
        cellsWithChangePoints = result[4]
        Data['TCH_RAW_BLOCKING'] = {
            'Cell_Names': result[0],
            'Cell_Values': result[1],
            'Change_Points': result[2]
        }

        cellsCounts = {
            'Mpd': len(cellsMpd),
            'TchTraffic': len(cellsTchTraffic),
            'TchTraffic1800': len(cellsTchTraffic1800),
            'TchTraffic900': len(cellsTchTraffic900),
            'DropsHo': len(cellsDropsHo),
            'DropsRf': len(cellsDropsRf),
            'TchAvailability': len(cellsTchAvailability),
            'SdcchBlocking': len(cellsSdcch),
            'TchRawBlocking': len(cellsTchRaw)
        }

        # return json response
        return JsonResponse({
            'Data': Data,
            'Dates': dates,
            'Total_Cells': totalCells,
            'CellsWithChangePoints': len(set(cellsWithChangePoints)),
            'detectedCellsCount': cellsCounts
        })


# Api method
def getBaseStationControllers(request):
    if not request.user.is_authenticated:
        return redirect('/mainapp/login/')
    if request.method == 'GET':
        controllers = []

        # get parameters
        datefrom = request.GET.get('datefrom')
        dateto = request.GET.get('dateto')

        # loading data file
        kpis = loadFile()

        # query data based on dates only
        kpis = queryData(kpis, datefrom, dateto)

        # extract base station controllers from the dataframe
        controllers = list(kpis['SUBNETWORK Name'].unique())

        # return json response
        return JsonResponse({
            'Controllers': controllers
        })

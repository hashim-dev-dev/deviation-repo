from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import os
import pandas as pd
import numpy as np
import datetime
from rest_framework.viewsets import GenericViewSet
from rest_framework import authentication, permissions
import json
from .apps import PredictorConfig
#from django.views.decorators.csrf import csrf_exempt


def loadcomplaints():
    path = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(path, 'process_files')
    complaints = pd.read_csv(os.path.join(path, 'complaints.csv'))
    return complaints


def loadkpis():
    path = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(path, 'process_files')
    kpis = pd.read_csv(os.path.join(path, 'kpis.csv'))
    return kpis

# reading an excel file
# complaint_file = pd.read_excel(
#     os.path.join(path, file_names[0]),
#     engine='openpyxl',
# )


def getData(request):
    distribution_regions = []
    distribution_status = []
    distribution_affected_items = []
    distribution_duration = []
    distribution_error_response = []
    if request.method == 'GET':
        # pandas dataframe
        complaints = loadcomplaints()

        # producing data for complaint distribution on regions
        regions = list(complaints['ASSIGNMENT'].value_counts().index)
        counts = list(complaints['ASSIGNMENT'].value_counts())

        for i in range(0, len(regions)):
            distribution_regions.append({
                'region': regions[i], 'count': counts[i]
            })

        # producing data for complaints status

        status = list(complaints['PROBLEM_STATUS'].value_counts().index)
        counts = list(complaints['PROBLEM_STATUS'].value_counts())

        for i in range(0, len(status)):
            distribution_status.append({
                'status': status[i], 'count': counts[i]
            })

        # producing data for complaints status

        error_response = list(
            complaints['ERROR_RESPONSE'].value_counts().index)
        counts = list(complaints['ERROR_RESPONSE'].value_counts())

        for i in range(0, len(error_response)):
            distribution_error_response.append({
                'error_response': error_response[i], 'count': counts[i]
            })

        # producing data for complaints status

        affected_item = list(complaints['AFFECTED_ITEM'].value_counts().index)
        counts = list(complaints['AFFECTED_ITEM'].value_counts())

        for i in range(0, len(affected_item)):
            distribution_affected_items.append({
                'affected_item': affected_item[i], 'count': counts[i]
            })

        # producing data for complaints status

        duration = list(complaints['DURATION'].value_counts().index)
        counts = list(complaints['DURATION'].value_counts())

        for i in range(0, len(duration)):
            distribution_duration.append({
                'duration': duration[i], 'count': counts[i]
            })

        return JsonResponse({
            'DataRegion': distribution_regions,
            'DataStatus': distribution_status,
            'DataAffectedItem': distribution_affected_items,
            'DataDuration': distribution_duration,
            'DataErrorResponse': distribution_error_response
        })


def getFieldsOnDates(request):
    if request.method == 'GET':

        # Access dates from the frontend
        dateto = request.GET.get('dateto')
        datefrom = request.GET.get('datefrom')

        # load our csv files
        complaints = loadcomplaints()

        # get unique regions within a range of dates
        regions = list(complaints.query('ACTUAL_INC_START_TIME >= "{datefrom}" and ACTUAL_INC_START_TIME <= "{dateto}"'.format(
            datefrom=datefrom, dateto=dateto))['ASSIGNMENT'].unique())

        # return HttpResponse([regions])
        return JsonResponse({"Regions": regions})


def getFieldsOnRegions(request):
    if request.method == "GET":
        # Access dates from the frontend
        dateto = request.GET.get('dateto')
        datefrom = request.GET.get('datefrom')
        region = request.GET.get('region')

        # load our csv files
        complaints = loadcomplaints()

        cities = list(
            complaints[complaints['ASSIGNMENT'] == region]['City'].unique())

        # # dataframe for certain regions and then extracting site names
        # sites = list(complaints[complaints['ASSIGNMENT'].isin(
        #     [region])]['NE_NAME'].unique())

        # # extracting cities from site names
        # cities = []
        # for site in sites:
        #     if type(site) is str:
        #         if site[0].isupper():
        #             cities.append(site[0:3])
        #         elif site[0].islower():
        #             cities.append(site[1:4])
        #         else:
        #             continue

        # eliminating repeating cities

        # return HttpResponse([dateto, datefrom, region])
        return JsonResponse({"Cities": cities})


def getFieldsOnCities(request):
    if request.method == 'GET':
        pass


def index(request):
    if request.method == 'GET':
        pass
        # return the reponse
        # return HttpResponse([complaint_file.shape, kpis.shape])


def queryKpisOnDates(data, datefrom, dateto):
    data['PERIOD_START_TIME'] = pd.to_datetime(data['PERIOD_START_TIME'])
    data = data.query('PERIOD_START_TIME >= "{datefrom}" and PERIOD_START_TIME <= "{dateto}"'.format(
        datefrom=datefrom, dateto=dateto))
    return data


def addSites(data):

    # first place sites in a list
    sites = []
    for index, row in data.iterrows():
        sites.append(row['LNBTS name'].split('_')[0])

    # convert the list into a pandas dataframe column
    sites = pd.DataFrame(sites)
    sites.columns = ['SITE_NAME']

    # add sites names to kpis
    data = pd.concat([data, sites], axis='columns')

    return data


def averageOutKpis(data):
    data = data.dropna(thresh=data.shape[0]*0.6, axis=1)
    data = data.dropna()
    return data.groupby('SITE_NAME').mean()


def getModelResponse(request):
    if request.method == 'GET':

        # get parameters to query data
        dateto = request.GET.get('dateto')
        datefrom = request.GET.get('datefrom')
        #region = request.GET.get('region')
        #city = request.GET.get('city')

        kpis = loadkpis()

        kpis = queryKpisOnDates(kpis, datefrom, dateto)
        kpis = addSites(kpis)
        kpis = averageOutKpis(kpis)
        sites = list(kpis.index)

        kpis = kpis.reset_index(drop=True)

        predictions = list(PredictorConfig.loaded_model.predict(kpis))
        return JsonResponse({
            'Predictions': predictions,
            'Sites': sites}
        )

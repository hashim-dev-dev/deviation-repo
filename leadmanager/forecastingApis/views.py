# python packages
import os
import time
from django.http.response import JsonResponse
import numpy as np
import pandas as pd

from .apps import ForecastingConfig

# django imports
from django.shortcuts import render
from django.http import HttpResponse

# custom imports
#from forecastingApis.helper import calculate_expansions, is_Expansion_Days, Prediction_Model


# predicting throughput
def predict(users_t, thpt, Dforecast):
    users = np.array(users_t).reshape(1, -1)
    ut0 = ForecastingConfig.throughputModel.predict(users)
    ut1 = ForecastingConfig.throughputModel.predict((users*(1+Dforecast)))
    inc = (ut1/ut0-1)
    inc_used = inc
    Pred_thpt = thpt + (thpt * inc_used)
    return Pred_thpt

# predicting physical resource block utilization


def predict_PRB(users_t, PRB, Dforecast):
    users = np.array(users_t).reshape(1, -1)
    ut0 = ForecastingConfig.prbModel.predict(users)
    ut1 = ForecastingConfig.prbModel.predict((users*(1+Dforecast)))
    inc = (ut1/ut0-1)
    inc_used = inc
    if users_t > 30:
        inc_3 = Dforecast * .3
        inc_used = max(inc, inc_3)
    Pred_PRB = PRB + (PRB * inc_used)
    Pred_PRB = min(Pred_PRB, 99.99)
    return Pred_PRB

# predicting users on a cell


def predict_users(users, Dforecast):
    Pred_users = users * (1+(Dforecast*1))
    return Pred_users

# determine whether the network should expand or not


def calculate_expansions(vendor, users, PRB, thpt, payload, BW):
    expand = 'No'

    if BW == '3Mhz':
        if vendor == "Nokia":
            if (users > 15 and PRB > 60 and thpt < 1.8 and payload > 1):
                expand = 'Yes'
        if vendor == "ZTE":
            if (users > 15 and PRB > 60 and thpt < 1.8 and payload > 1):
                expand = 'Yes'

    if BW == '5Mhz':
        if vendor == "Nokia":
            if (users > 18 and PRB > 65 and thpt < 1.8 and payload > 1):
                expand = 'Yes'
        if vendor == "ZTE":
            if (users > 18 and PRB > 65 and thpt < 1.8 and payload > 1):
                expand = 'Yes'

    if BW == '10Mhz':
        if vendor == "Nokia":
            if (users > 22 and PRB > 70 and thpt < 1.8 and payload > 1):
                expand = 'Yes'
        if vendor == "ZTE":
            if (users > 22 and PRB > 70 and thpt < 1.8 and payload > 1):
                expans = 'Yes'
    return expand


# prediction method
def Prediction_Model(payload, Thpt, users, PRB, growth, vendor, BW):
    payload_pred = payload*(1+growth)
    Thpt_Pred = predict(users, Thpt, growth)
    users_Pred = predict_users(users, growth)
    PRB_Pred = predict_PRB(users, PRB, growth)
    Expansion = calculate_expansions(
        vendor, users_Pred, PRB_Pred, Thpt_Pred, payload_pred, BW)
    return payload_pred, Thpt_Pred, users_Pred, PRB_Pred, Expansion


# calculating number of expansions
def is_Expansion_Days(kpi_1, kpi_2, kpi_3, kpi_4, kpi_5, kpi_6, kpi_7):
    counter = 0
    if kpi_1 == 'Yes':
        counter += 1
    if kpi_2 == 'Yes':
        counter += 1
    if kpi_3 == 'Yes':
        counter += 1
    if kpi_4 == 'Yes':
        counter += 1
    if kpi_5 == 'Yes':
        counter += 1
    if kpi_6 == 'Yes':
        counter += 1
    if kpi_7 == 'Yes':
        counter += 1
    solution = 'No'
    if counter >= 5:
        solution = 'Yes'

    return solution


# helper function
def loadFile():
    path = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(path, 'process_files')
    if 'Input_File_Sample.csv' not in os.listdir(path):
        excel_df = pd.read_excel(os.path.join(
            path, 'Input_File_Sample.xlsx'), engine='openpyxl',)
        excel_df.to_csv(os.path.join(
            path,  'Input_File_Sample.csv'), index=False)
        file = pd.read_csv(os.path.join(path, 'Input_File_Sample.csv'))
    file = pd.read_csv(os.path.join(path, 'Input_File_Sample.csv'))
    return file


def getPath():
    return os.path.join(os.path.dirname(__file__), 'process_files')


# Api method
def forecast(request):
    if request.method == 'GET':
        start_time = time.time()

        # convert excel file to csv and then load it...
        data = loadFile()

        # organize and paste the jupyter content here
        # calculating mean of numeric features (sorry this is just for scatter plots)
        data['DL Users_c'] = data[['DL Users-1', 'DL Users-2', 'DL Users-3',
                                   'DL Users-4', 'DL Users-5', 'DL Users-6', 'DL Users-7']].mean(axis=1)
        data['User DL Throughput_c'] = data[['User DL Throughput-1', 'User DL Throughput-2', 'User DL Throughput-3',
                                             'User DL Throughput-4', 'User DL Throughput-5', 'User DL Throughput-6', 'User DL Throughput-7']].mean(axis=1)
        data['Data Volume_c'] = data[['Data Volume-1', 'Data Volume-2',  'Data Volume-3',
                                      'Data Volume-4',  'Data Volume-5',  'Data Volume-6',  'Data Volume-7']].mean(axis=1)
        data['PRB Utilization_c'] = data[['PRB Utilization-1', 'PRB Utilization-2', 'PRB Utilization-3',
                                          'PRB Utilization-4', 'PRB Utilization-5', 'PRB Utilization-6', 'PRB Utilization-7']].mean(axis=1)

        # calculate current expansions
        data['Expansion_current-1'] = np.vectorize(calculate_expansions)(data['Vendor'], data['DL Users-1'],
                                                                         data['PRB Utilization-1'], data['User DL Throughput-1'], data['Data Volume-1'], data['BW'])
        data['Expansion_current-2'] = np.vectorize(calculate_expansions)(data['Vendor'], data['DL Users-2'],
                                                                         data['PRB Utilization-2'], data['User DL Throughput-2'], data['Data Volume-2'], data['BW'])
        data['Expansion_current-3'] = np.vectorize(calculate_expansions)(data['Vendor'], data['DL Users-3'],
                                                                         data['PRB Utilization-3'], data['User DL Throughput-3'], data['Data Volume-3'], data['BW'])
        data['Expansion_current-4'] = np.vectorize(calculate_expansions)(data['Vendor'], data['DL Users-4'],
                                                                         data['PRB Utilization-4'], data['User DL Throughput-4'], data['Data Volume-4'], data['BW'])
        data['Expansion_current-5'] = np.vectorize(calculate_expansions)(data['Vendor'], data['DL Users-5'],
                                                                         data['PRB Utilization-5'], data['User DL Throughput-5'], data['Data Volume-5'], data['BW'])
        data['Expansion_current-6'] = np.vectorize(calculate_expansions)(data['Vendor'], data['DL Users-6'],
                                                                         data['PRB Utilization-6'], data['User DL Throughput-6'], data['Data Volume-6'], data['BW'])
        data['Expansion_current-7'] = np.vectorize(calculate_expansions)(data['Vendor'], data['DL Users-7'],
                                                                         data['PRB Utilization-7'], data['User DL Throughput-7'], data['Data Volume-7'], data['BW'])

        # calculating main current expansion
        data['Expansion_current'] = np.vectorize(is_Expansion_Days)(data['Expansion_current-1'], data['Expansion_current-2'], data['Expansion_current-3'],
                                                                    data['Expansion_current-4'], data['Expansion_current-5'], data['Expansion_current-6'], data['Expansion_current-7'])

        data = data.head(400)
        # making predictions for the first day
        data['Pred_Payload_First-1'], data['Pred_Thpt_First-1'], data['Pred_users_First-1'], data['Pred_PRB_First-1'], data['Expansion_First-1'] = np.vectorize(
            Prediction_Model)(data['Data Volume-1'], data['User DL Throughput-1'], data['DL Users-1'], data['PRB Utilization-1'], data['First'], data['Vendor'], data['BW'])

        data['Pred_Payload_First-2'], data['Pred_Thpt_First-2'], data['Pred_users_First-2'], data['Pred_PRB_First-2'], data['Expansion_First-2'] = np.vectorize(
            Prediction_Model)(data['Data Volume-2'], data['User DL Throughput-2'], data['DL Users-2'], data['PRB Utilization-2'], data['First'], data['Vendor'], data['BW'])
        data['Pred_Payload_First-3'], data['Pred_Thpt_First-3'], data['Pred_users_First-3'], data['Pred_PRB_First-3'], data['Expansion_First-3'] = np.vectorize(
            Prediction_Model)(data['Data Volume-3'], data['User DL Throughput-3'], data['DL Users-3'], data['PRB Utilization-3'], data['First'], data['Vendor'], data['BW'])
        data['Pred_Payload_First-4'], data['Pred_Thpt_First-4'], data['Pred_users_First-4'], data['Pred_PRB_First-4'], data['Expansion_First-4'] = np.vectorize(
            Prediction_Model)(data['Data Volume-4'], data['User DL Throughput-4'], data['DL Users-4'], data['PRB Utilization-4'], data['First'], data['Vendor'], data['BW'])
        data['Pred_Payload_First-5'], data['Pred_Thpt_First-5'], data['Pred_users_First-5'], data['Pred_PRB_First-5'], data['Expansion_First-5'] = np.vectorize(
            Prediction_Model)(data['Data Volume-5'], data['User DL Throughput-5'], data['DL Users-5'], data['PRB Utilization-5'], data['First'], data['Vendor'], data['BW'])
        data['Pred_Payload_First-6'], data['Pred_Thpt_First-6'], data['Pred_users_First-6'], data['Pred_PRB_First-6'], data['Expansion_First-6'] = np.vectorize(
            Prediction_Model)(data['Data Volume-6'], data['User DL Throughput-6'], data['DL Users-6'], data['PRB Utilization-6'], data['First'], data['Vendor'], data['BW'])
        data['Pred_Payload_First-7'], data['Pred_Thpt_First-7'], data['Pred_users_First-7'], data['Pred_PRB_First-7'], data['Expansion_First-7'] = np.vectorize(
            Prediction_Model)(data['Data Volume-7'], data['User DL Throughput-7'], data['DL Users-7'], data['PRB Utilization-7'], data['First'], data['Vendor'], data['BW'])

        # Calculating main Expansion First
        data['Expansion_First'] = np.vectorize(is_Expansion_Days)(data['Expansion_First-1'], data['Expansion_First-2'], data['Expansion_First-3'],
                                                                  data['Expansion_First-4'], data['Expansion_First-5'], data['Expansion_First-6'], data['Expansion_First-7'])

        data['User DL Throughput'] = data[['User DL Throughput-1', 'User DL Throughput-2', 'User DL Throughput-3',
                                           'User DL Throughput-4', 'User DL Throughput-5', 'User DL Throughput-6', 'User DL Throughput-7']].mean(1)
        data['Pred_Thpt_First'] = data[['Pred_Thpt_First-1', 'Pred_Thpt_First-2', 'Pred_Thpt_First-3',
                                        'Pred_Thpt_First-4', 'Pred_Thpt_First-5', 'Pred_Thpt_First-6', 'Pred_Thpt_First-7', ]].mean(1)
        data['Pred_Users_First'] = data[['Pred_users_First-1', 'Pred_users_First-2', 'Pred_users_First-3',
                                         'Pred_users_First-4', 'Pred_users_First-5', 'Pred_users_First-6', 'Pred_users_First-7']].mean(1)
        data['Pred_Payload_First'] = data[['Pred_Payload_First-1', 'Pred_Payload_First-2', 'Pred_Payload_First-3',
                                           'Pred_Payload_First-4', 'Pred_Payload_First-5', 'Pred_Payload_First-6', 'Pred_Payload_First-7']].mean(1)
        data['Pred_PRB_First'] = data[['Pred_PRB_First-1', 'Pred_PRB_First-2', 'Pred_PRB_First-3',
                                       'Pred_PRB_First-4', 'Pred_PRB_First-5', 'Pred_PRB_First-6', 'Pred_PRB_First-7']].mean(1)

        # use output file to extract certain measures for Dashboard.
        path = os.path.join(getPath(), 'output.csv')
        data.to_csv(path, index=False)

        currentExpansions = data[data['Expansion_current'] == 'Yes'].shape[0]
        forecastedExpansions = data[data['Expansion_First'] == 'Yes'].shape[0]

        # query data if current or first expansion is 'Yes'
        queried = data.query('Expansion_current == "Yes" or Expansion_First == "Yes"')[
            ['CID', 'Expansion_current', 'Expansion_First']]

        # convert all columns into python list to make them Json Serializable
        current = list(queried['Expansion_current'])
        forecasted = list(queried['Expansion_First'])
        cells = list(queried['CID'])

        return JsonResponse({
            'Cells_Analyzed': data.shape[0],
            # 'Output File': list(data.columns),
            # 'Time Taken (Minutes)': (time.time()-start_time)/60,
            'Current_Expansions': currentExpansions,
            'Forecasted_Expansions': forecastedExpansions,
            'Expansions_current': current,
            'Expansions_first': forecasted,
            'Cells': cells
        })

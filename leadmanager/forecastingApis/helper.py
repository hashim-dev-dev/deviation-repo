# python packages
import numpy as np

# django packages
from .apps import ForecastingConfig


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

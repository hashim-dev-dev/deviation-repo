import os
import pickle
from django.apps import AppConfig
from django.conf import settings


class ForecastingConfig(AppConfig):
    # loading throughput Model
    path = os.path.join(settings.MODEL_FORECASTING, 'Thput_Model_U')
    throughputModel = pickle.load(open(path, 'rb'))

    # loading physical resource block Model
    path = os.path.join(settings.MODEL_FORECASTING, 'PRB_Model_U')
    prbModel = pickle.load(open(path, 'rb'))

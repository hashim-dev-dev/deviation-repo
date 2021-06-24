from django.apps import AppConfig
from django.conf import settings
import os
import pickle


class PredictorConfig(AppConfig):

    path = os.path.join(settings.MODEL_COMPLAINTS, 'finalized_model.sav')
    loaded_model = pickle.load(open(path, 'rb'))

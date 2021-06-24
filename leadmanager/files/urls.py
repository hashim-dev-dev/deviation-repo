from django.urls import path
from . import views

urlpatterns = [
    path('files/date', views.getFieldsOnDates),
    path('files/region', views.getFieldsOnRegions),
    path('files/city', views.getFieldsOnCities),
    path('files/data', views.getData),
    path('files/model', views.getModelResponse)
]

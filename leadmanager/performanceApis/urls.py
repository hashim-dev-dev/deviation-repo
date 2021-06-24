from django.urls import path
from . import views

urlpatterns = [
    # against each url map a function in the views
    path('performance/bsc', views.getBaseStationControllers),
    path('performance/data', views.getData)
]

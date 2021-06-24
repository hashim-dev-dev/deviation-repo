from django.urls import path
from . import views

urlpatterns = [
    path('forecast/api', views.forecast)
]

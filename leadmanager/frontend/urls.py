from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.index),
    path('login/', views.login_user),
    path('logout/', views.logout_user)
    #path('', TemplateView.as_view(template_name='frontend/index.html'))
]

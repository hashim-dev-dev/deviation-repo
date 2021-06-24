from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('myadmin/', admin.site.urls),
    path('mainapp/', include('frontend.urls')),
    path('', include('files.urls')),
    path('', include('performanceApis.urls')),
    path('', include('forecastingApis.urls'))
]

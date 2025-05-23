"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from home import views
from spotify.views import AuthURL
from lastfmapi.views import *
from openaiapi.views import *
from recommender.views import *

router = routers.DefaultRouter()
router.register(r'home', views.TodoViewSet, 'home')

urlpatterns = [
    path('api/', include(router.urls)),
    path("admin/", admin.site.urls),
    path("spotify/", include("spotify.urls")),
    path("lastfm/", include("lastfmapi.urls")),
    path("openai/", include("openaiapi.urls")),
    path("rec/", include("recommender.urls")),
    path('', views.home),
    #path('frontend/', include('frontend.urls')),
]

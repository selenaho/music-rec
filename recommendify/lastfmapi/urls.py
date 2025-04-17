from django.urls import path
from .views import *

app_name = 'last.fm'

urlpatterns = [
    path('api/related-artists/', related_artists_view.as_view())
]
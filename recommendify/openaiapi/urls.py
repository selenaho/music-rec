from django.urls import path
from .views import *

app_name = 'openaiAPI'

urlpatterns = [
    path('get-recs', MusicRecs.as_view()),
]
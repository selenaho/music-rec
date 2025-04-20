from django.urls import path
from .views import *

app_name = 'openaiapi'

urlpatterns = [
    path('get-recs', MusicRecs.as_view()),
]
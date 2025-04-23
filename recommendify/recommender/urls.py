from django.urls import path
from .views import *

app_name = 'recommender'

urlpatterns = [
    path('get-recs', GetRecommendations.as_view()),
]
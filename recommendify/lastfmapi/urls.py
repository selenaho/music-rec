from django.urls import path
from .views import *

app_name = 'last.fm'

urlpatterns = [
    path('similar-artists', SimilarArtists.as_view()),
]
from django.urls import path
from .views import *

app_name = 'spotify'

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('top-artists', TopArtists.as_view(), name='top-artists'),
    path('top-tracks', TopTracks.as_view()),
    path('recently-played', RecentTracks.as_view())
]
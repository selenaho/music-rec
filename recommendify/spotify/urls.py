from django.urls import path
from .views import AuthURL, spotify_callback, IsAuthenticated, TopArtists

app_name = 'spotify'

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('top-artists', TopArtists.as_view(), name='top-artists')
]
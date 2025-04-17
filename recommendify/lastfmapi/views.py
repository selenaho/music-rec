from django import render
from requests import Request, post
from spotify.views import search_spotify_artist
from spotify.views import access_token
from spotify.credentials import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET
from rest_framework import status
from rest_framework.response import Response

class RelArtists(APIView):
    def get_similar_artists(artist_name, limit=5):
    url = "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=Jennie&api_key=YOUR_API_KEY&format=json"
    params = {
        'method': 'artist.getSimilar',
        'artist': artist_name,
        'api_key': LASTFM_API_KEY,
        'format': 'json',
        'limit': limit
    }

    response = requests.get(url, params=params)
    data = response.json()

    return [
        artist['name']
        for artist in data.get('similarartists', {}).get('artist', [])
    ]

def related_artists_view(request):
    artist_name = request.GET.get("artist")
    # Get related artists from Last.fm
    related_artists = get_similar_artists(artist_name)

    # Get Spotify token
    token = get_spotify_access_token(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)

    # Map related artists to Spotify profiles
    results = []
    for name in related_artists:
        spotify_info = search_spotify_artist(name, token)
        if spotify_info:
            results.append(spotify_info)

    return Response({"artist": artist_name, "related": results})

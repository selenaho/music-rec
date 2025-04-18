from .util import *
from .credentials import LASTFM_API_KEY
from requests import Request, post
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
import requests

class SimilarArtists(APIView):
    def get(self, request, format=None):

        artist_name = request.GET.get('q')
        if not artist_name:
            return Response({"error": "Missing artist name"}, status=status.HTTP_400_BAD_REQUEST)

        endpoint = "https://ws.audioscrobbler.com/2.0/"
        params = {
            "method": "artist.getsimilar",
            "artist": artist_name,
            "api_key": LASTFM_API_KEY,
            "format": "json",
            "limit": 3
        }

        response = requests.get(endpoint, params=params)
        data = response.json()

        if "similarartists" not in data or "artist" not in data["similarartists"]:
            return Response({"error": "No similar artists found."}, status=status.HTTP_204_NO_CONTENT)

        items = data["similarartists"]["artist"]

        response = []
        for item in items:
            response.append({
                "artist": item["name"],
                "match": float(item["match"]),
                "url": item["url"]
            })

        return Response({
            "artist": artist_name,
            "similar_artists": response
        }, status=status.HTTP_200_OK)

        # artist_name = request.GET.get('q')

        # endpoint = "artist.getSimilar"

        # # response = execute_lastfm_api_call(self.request.session.session_key, endpoint)
        # response = execute_lastfm_api_call(endpoint)

        # #handling case of if we get error or nothing returned
        # if 'error' in response or 'items' not in response:
        #     return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        # items = response.get('items')
        
        # response = []

        # for item in items:
        #     artist_string = ""
        #     match_value = 0.00
        #     # In "item.get('artist')", 
        #     # 'artist' should be the main artist that we are looking to find similar artists to
        #     for artist in enumerate(item.get(artist_name).get('api_key')):
        #         artist_string = artist.get('name')
        #         match_value += artist.get('match')
        #     response.append({"artist": artist_string, "match": match_value})
        
        # # Return the results
        # return Response(response, status=status.HTTP_200_OK)



# def similar_artists_view(request):
#     artist_name = request.GET.get("artist")
#     # Get related artists from Last.fm
#     related_artists = get_similar_artists(artist_name)

#     # Get Spotify token
#     token = get_spotify_access_token(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)

#     # Map related artists to Spotify profiles
#     results = []
#     for name in related_artists:
#         spotify_info = search_spotify_artist(name, token)
#         if spotify_info:
#             results.append(spotify_info)

#     return Response({"artist": artist_name, "related": results})

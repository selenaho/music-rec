from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .util import *
import markdown

class MusicRecs(APIView):
    def post(self, request, format=None):
        #take data passed in via POST request and puts it into spotify_data and list_of_songs if exists, else puts "" into them
        spotify_data = request.data.get("spotify_data", {})
        list_of_songs = request.data.get("list_of_songs", [])
        if(not spotify_data or not list_of_songs):
            return Response({"error": "missing the needed data"})
        recs = generate_music_recs(spotify_data, list_of_songs)
        print(recs)
        html = markdown.markdown(recs)
        print(html)
        return Response({"recommendations" : html})
                

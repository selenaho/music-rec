from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .util import *

class MusicRecs(APIView):
    def get(self, request, format=None):
        if request.method == 'POST':
            #take data passed in via POST request and puts it into spotify_data if exists, else puts "" into spotify_data
            spotify_data = request.POST.get("spotify_data", "")
            if(spotify_data != ""):
                recs = generate_music_recs(spotify_data)

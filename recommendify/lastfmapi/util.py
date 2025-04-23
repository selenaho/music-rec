from .credentials import LASTFM_API_KEY
from requests import Request, post
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from django.utils import timezone
from datetime import timedelta
from requests import post, get

BASE_URL = "http://ws.audioscrobbler.com/2.0/"

def get_similar_artists(artist_name):
    endpoint = BASE_URL
    params = {
        "method": "artist.getsimilar",
        "artist": artist_name,
        "api_key": LASTFM_API_KEY,
        "format": "json",
        "limit": 1
    }

    response = requests.get(endpoint, params=params)
    data = response.json()
    
    return data
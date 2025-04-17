from .credentials import LASTFM_API_KEY
from django.utils import timezone
from datetime import timedelta
from requests import post, get

BASE_URL = "http://ws.audioscrobbler.com/2.0/"


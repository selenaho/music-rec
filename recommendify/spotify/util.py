from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, get

BASE_URL = "https://api.spotify.com/v1"

def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    print(user_tokens)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token, refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()

#checking if user is already authenticated
def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    
    if tokens:
        if tokens.expires_in <= timezone.now():
            #need to refresh token
            refresh_spotify_token(session_id)
        return True
    
    return False

def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    refresh_token = response.get('refresh_token')

    update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)

def execute_spotify_api_call(session_id, endpoint):
    tokens = get_user_tokens(session_id)
    headers = {'Content-Type': 'application/json', 'Authorization': "Bearer " + tokens.access_token}
    
    response = get(BASE_URL + endpoint, headers = headers)

    try:
        return response.json()
    except:
        return {'Error': 'Issue with request'}

def get_artist_top_tracks(query, session_id):
    # search for artist
    search_endpoint = f"/search?q={query}&type=artist"
    search_response = execute_spotify_api_call(session_id, search_endpoint)

    artist_id = search_response["artists"]["items"][0]["id"]

    # fetch top tracks of that artist using their Spotify's artist ID
    endpoint = f"/artists/{artist_id}/top-tracks?market=US"
    tracks_response = execute_spotify_api_call(session_id, endpoint)

    if "error" in tracks_response or "tracks" not in tracks_response:
        return {"error": "No top tracks found"}

    tracks = tracks_response["tracks"]

    response = []
    for track in tracks:
        artist_array = []
        for artist in track.get('artists', []):
            artist_array.append(artist.get('name'))
        
        song_name = track.get('name')
        response.append({
            "name": song_name,
            "artist": artist_array,
            "spotify_url": track.get("external_urls", {}).get("spotify", "")
        })
    return response
from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import *

#gives us the url for the request we're making to spotify api
class AuthURL(APIView):
    def get(self, request, format=None):
        #here we're writing the request we're sending to spotify api
        scopes = 'user-top-read user-follow-read user-read-recently-played'

        #generate a url for us to then send the request to the url
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        print(url)
        #to send to front end
        return Response({'url': url}, status=status.HTTP_200_OK)
    

#access and refresh tokens for specific user
def spotify_callback(request, format=None):
    code = request.GET.get('code') #how we're going to authenticate user
    error = request.GET.get('error')

    #send request back to spotify to ask for access and refresh token
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    #look at response and get tokens and stuff
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(request.session.session_key, access_token, token_type, expires_in, refresh_token)

    #return redirect('home:home') #urls are different now after react was added to app so home:home not working right now, fix later
    #return redirect('http://localhost:3000/top-artists') #DOES NOT WORK!!!!!! LEAVING HERE SO WE DO NOT ATTEMPT THIS AGAIN BECAUSE IT WILL NOT WORK!!!! - selena
    #return redirect('frontend:') #this is from when i was doing urls.py in the frontend folder
    return redirect('http://127.0.0.1:3000/recommendations') # redirects user to the similar artists page


#so frontend knows if user is authenticated or not this is the endpoint we hit to do so:
class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK) 

class TopArtists(APIView):
    def get(self, request, format=None):
        #default settings for top artists is top 10, medium time range (approx last 6 months), and offset 0 (returns the first item) 

        endpoint = "/me/top/artists"

        response = execute_spotify_api_call(self.request.session.session_key, endpoint)

        #print(response)

        #handling case of if we get error or nothing returned
        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        items = response.get('items')

        response = []
        for item in items:
            name = item['name']
            followers = (item['followers'])['total']
            response.append({"name": name, "followers": followers})

        return Response(response, status=status.HTTP_200_OK)

class TopTracks(APIView):
    def get(self, request, format=None):
        #default settings for top artists is top 10, medium time range (approx last 6 months), and offset 0 (returns the first item) 

        endpoint = "/me/top/tracks"

        response = execute_spotify_api_call(self.request.session.session_key, endpoint)

        #print(response)

        #handling case of if we get error or nothing returned
        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        items = response.get('items')

        response = []
        for item in items:
            artist_string = ""
            artist_array = []
            #print(item.get('artists'))
            for i, artist in enumerate(item.get('artists')):
                # if i > 0:
                #     artist_string += ", "
                # name = artist.get('name')
                # artist_string += name
                artist_array.append(artist.get('name'))
            song_name = item['name']
            #response.append({"name": song_name, "artist": artist_string})
            response.append({"name": song_name, "artist": artist_array})

        return Response(response, status=status.HTTP_200_OK)

class RecentTracks(APIView):
    def get(self, request, format=None):
        #default settings for top artists is top 10, medium time range (approx last 6 months), and offset 0 (returns the first item) 

        endpoint = "/me/player/recently-played"

        response = execute_spotify_api_call(self.request.session.session_key, endpoint)

        #print(response)

        #handling case of if we get error or nothing returned
        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        items = response.get('items')

        response = []
        for item in items:
            #print(item['track']['album'])
            #print(item.get('track').get('album').get('artists'))
            artist_string = ""
            artist_array = []
            for i, artist in enumerate(item.get('track').get('album').get('artists')):
                # if i > 0:
                #     artist_string += ", "
                # name = artist.get('name')
                # artist_string += name
                artist_array.append(artist.get('name'))
            song_name = item['track']['name']
            # response.append({"name": song_name, "artist": artist_string})
            response.append({"name": song_name, "artist": artist_array})

        return Response(response, status=status.HTTP_200_OK)
    
class Artist(APIView):
    def get(self, request, format=None):
        #get info for artists that match a keyword string

        query = request.GET.get('q')
        
        endpoint = "/search?q=" + query + "&type=artist"

        response = execute_spotify_api_call(self.request.session.session_key, endpoint)

        #handling case of if we get error or nothing returned
        if 'error' in response or 'artists' not in response:
            return Response({"error": "No artist"}, status=status.HTTP_204_NO_CONTENT)

        items = response.get('artists').get('items')

        response = []
        
        #getting just the first result because the others are either similar artists/artists with similar name which we don't need
        item = items[0]
        artist_id = item["id"]
        genres = item.get("genres", [])
        # response.append({"artist_id": artist_id, "genres": genres})
        
        # artist = items[0]
        # result = {
        #     "id": artist["id"],
        #     "name": artist["name"],
        #     "genres": artist.get("genres", []),
        #     "followers": artist["followers"]["total"],
        #     "popularity": artist["popularity"],
        #     "spotify_url": artist["external_urls"]["spotify"]
        # }

        return Response({"artist_id": artist_id, "genres": genres}, status=status.HTTP_200_OK)
    
class ArtistTopTracks(APIView):
    def get(self, request, format=None):

        query = request.GET.get("q")
        if not query:
            return Response({"error": "Missing artist name"}, status=status.HTTP_400_BAD_REQUEST)

        response = get_artist_top_tracks(query, self.request.session.session_key)

        if "error" in response:
            return Response({"error": "No top tracks found"}, status=status.HTTP_204_NO_CONTENT)

        return Response(response, status=status.HTTP_200_OK)
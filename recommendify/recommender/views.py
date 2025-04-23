from django.shortcuts import render
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from spotify.util import *
from openaiapi.util import *
from lastfmapi.util import *
from spotify.credentials import *
from openaiapi.credentials import *
from lastfmapi.credentials import *
import markdown

class GetRecommendations(APIView):
    def get(self, request, format=None):
        #get recent tracks
        endpoint = "/me/player/recently-played"
        response = execute_spotify_api_call(self.request.session.session_key, endpoint)
        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        items = response.get('items')

        response = []
        for item in items:
            artist_array = []
            for i, artist in enumerate(item.get('track').get('album').get('artists')):
                artist_array.append(artist.get('name'))
            song_name = item['track']['name']
            response.append({"name": song_name, "artist": artist_array})
        
        recent_tracks_array = response

        #get top artists
        endpoint = "/me/top/artists"
        response = execute_spotify_api_call(self.request.session.session_key, endpoint)
        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        items = response.get('items')

        response = []
        for item in items:
            name = item['name']
            response.append(name)

        top_artists_array = response

        #get top tracks
        endpoint = "/me/top/tracks"
        response = execute_spotify_api_call(self.request.session.session_key, endpoint)
        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        items = response.get('items')

        response = []
        for item in items:
            artist_array = []
            for i, artist in enumerate(item.get('artists')):
                artist_array.append(artist.get('name'))
            song_name = item['name']
            response.append({"name": song_name, "artist": artist_array})
        
        top_tracks_array = response

        #take the artists of each of that data and put into a set
        set_of_artists = set(top_artists_array) #set is initialized with top artists
        for song in top_tracks_array:
            for artist in song.get('artist'):
                set_of_artists.add(artist)
        for song in recent_tracks_array:
            for artist in song.get('artist'):
                set_of_artists.add(artist)

        #for each artist the user listens to get similar artist from lastfmapi
        similar_artists = []
        for artist in set_of_artists:
            data = get_similar_artists(artist)
            if "similarartists" not in data or "artist" not in data["similarartists"]:
                continue #no similar artist found so just keep going
            items = data["similarartists"]["artist"]
            for item in items:
                similar_artists.append(item["name"])
        print(similar_artists)

        #for each similar artist, get top songs
        top_songs_of_similar_artists = set()
        for artist in similar_artists:
            response = get_artist_top_tracks(artist, self.request.session.session_key)
            if "error" in response:
                continue
            for song in response:
                name = song.get("name")
                artists = song.get("artist", [])
                songInfo = f"{name} by {', '.join(artists)}"
                top_songs_of_similar_artists.add(songInfo)
        print(top_songs_of_similar_artists)

        #now make openai call
        top_tracks_cleaned = []#an array of top songs in the form song name by artist1, artist2, ..
        for song in top_tracks_array:
            name = song.get("name")
            artists = song.get("artist", [])
            songInfo = f"{name} by {', '.join(artists)}"
            top_tracks_cleaned.append(songInfo)

        recent_tracks_cleaned = []#an array of recent tracks in the form song name by artist1, artist2, ...
        for song in recent_tracks_array:
            name = song.get("name")
            artists = song.get("artist", [])
            songInfo = f"{name} by {', '.join(artists)}"
            recent_tracks_cleaned.append(songInfo)

        spotify_dict = {"topSongs": top_tracks_cleaned, "topArtists": top_artists_array, "recents": recent_tracks_cleaned}
        recs = generate_music_recs(spotify_dict, list(top_songs_of_similar_artists))
        if "error" in recs:
            return Response({"error": "there was an error getting recs from openai :("})
        html = markdown.markdown(recs)
        print(html)

        return Response({"recommendations": html})
            


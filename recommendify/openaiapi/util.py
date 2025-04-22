from .credentials import OPENAI_API_KEY
from openai import OpenAI
client = OpenAI(api_key = OPENAI_API_KEY)

def generate_music_recs(spotify_data, list_of_songs):
    song_list_string = "\n".join(list_of_songs)
    spotify_data_string = "These are top songs:\n"
    top_song_string = "\n".join(spotify_data.get("topSongs"))
    spotify_data_string += top_song_string + "\nThese are the top artists:\n"
    top_artist_string = "\n".join(spotify_data.get("topArtists"))
    spotify_data_string += top_artist_string + "\nThese are the recently listened to tracks:\n"
    recent_string = "\n".join(spotify_data.get("recents"))
    spotify_data_string += recent_string

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "system",
            "content": "You are a music recommendation assistant. Recommend ten unique songs from the provided list of songs that the user DOESN'T already listen to based on their spotify data. The recommendations MUST be a song from the list of songs provided. Avoid recommending more than one song per artist. For each song, explain why the user would enjoy listening to it in one brief sentence."
        },{
            "role": "user",
            "content": f"""List of songs: {song_list_string} spotify data: {spotify_data_string}"""
        }],
        max_tokens = 10000
    )
    recs = response.choices[0].message.content
    return recs
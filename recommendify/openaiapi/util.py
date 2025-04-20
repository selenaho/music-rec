from .credentials import OPENAI_API_KEY
from openai import OpenAI
client = OpenAI(api_key = OPENAI_API_KEY)

def generate_music_recs(spotify_data, list_of_songs):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "system",
            "content": "You are a music recommendation assistant. Choose five songs from the provided list of songs that the user would enjoy based on their spotify data. The recommendations MUST be a song from the list of songs provided."
        },{
            "role": "user",
            "content": f"""List of songs: {list_of_songs} spotify data: {spotify_data}"""
        }],
        max_tokens = 10000
    )
    recs = response.choices[0].message.content
    return recs
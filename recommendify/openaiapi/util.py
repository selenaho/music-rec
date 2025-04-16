from .credentials import OPENAI_API_KEY
from openai import OpenAI
client = OpenAI(api_key = OPENAI_API_KEY)

def generate_music_recs(spotify_data):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "system",
            "content": "You are a music recommendation assistant. Give five existing songs available to listen on spotify that the user would enjoy."
        },{
            "role": "user",
            "content": f"""Listening data: {spotify_data}"""
        }],
        max_tokens = 1000
    )
    recs = response.choices[0].message.content
    return recs
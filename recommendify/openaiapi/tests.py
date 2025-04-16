from django.test import TestCase
from .util import generate_music_recs

spotify_data = """
Recent listens: 
"i'm afraid all boys are the same" by Kitty Coen
"dead end." by Mikayla Geier
"Un p'tit baiser" by Vanessa Paradis, -M-
Top Artists:
Maisie Peters
Olivia Rodrigo
The Last Dinner Party
Laufey
Top Songs:
"Big Mouth" by Matilda Cole
"Rockstar" by LISA
"The Thrill Is Gone" by RAYE
"""

print(generate_music_recs(spotify_data))

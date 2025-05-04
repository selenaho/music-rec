# Recommendify
This web app generates ai-driven music recommendations based on user's Spotify listening history.

## Demo
<img src='https://github.com/selenaho/music-rec/blob/main/recommendify.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

## Launch Codes
1) Navigate to the folder where you wish to store the repository using `cd`. 
2) Clone this repo by entering `git clone git@github.com:selenaho/music-rec.git` and navigate into music-rec. 
3) Create and activate a virtual environment through the `python3 -m venv <VENV_NAME>` command. 
4) To activate: `source <VENV_NAME>/bin/activate`
5) Install all required elements found in the `requirements.txt` file using the `pip install -r requirements.txt` command.  

### How to Run
In the first terminal:
1) cd into `recommendify/` 
2) Run the backend through the `python3 manage.py runserver` command. 
In the second terminal:
1) cd into `recommendify/frontend/`
2) Run the frontend through the `npm start` command.
3) Navigate to the site located at `http://localhost:3000`
import os
from flask import Flask, request, render_template, session
from flask_cors import CORS, cross_origin
from openpyxl import load_workbook
from utils.file_manager import *

app = Flask(__name__, static_folder="./wc2022/build/static", template_folder="./wc2022/build")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/sign-up', methods=['GET', 'POST'])
def sign_up_func():
    user_name = request.get_json()['name']
    password = request.get_json()['password']
    return_msg = "{user_name} singed up!".format(user_name=user_name)
    if insert_row("users", [user_name, password]) == False:
        return_msg = "{user_name} Failed to singed up!".format(user_name=user_name)
    
    return {
        'user_name': user_name,
        'msg': return_msg
    }

@app.route('/games/bet-on-game', methods=['GET', 'POST'])
def bet_on_game():
    print(request.get_json()['teamA'])
    print(request.get_json()['teamB'])
    print(request.get_json()['scoreA'])
    print(request.get_json()['scoreB'])
    return {
        'msg': 'Good Luck!!!'
    }

if __name__ == '__main__':
    app.run(debug=True)
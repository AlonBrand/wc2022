import os
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="./wc2022/build/static", template_folder="./wc2022/build")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/log-in', methods=['GET', 'POST'])
def login_func(): 
    print(request.get_json()['userName'])
    # userName = request.get_json()
    return {
        'userName': request.get_json()['userName']
    }

@app.route('/games/bet-on-game', methods=['GET', 'POST'])
def bet_on_game():
    print("aaa")
    print(request.get_json()['teamA'])
    # userName = request.get_json()
    return {
        'msg': 'Good Luck!!!'
    }

if __name__ == '__main__':
    app.run(debug=True)
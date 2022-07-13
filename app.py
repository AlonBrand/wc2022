import os
from flask import Flask, request, render_template

app = Flask(__name__, static_folder="./wc2022/build/static", template_folder="./wc2022/build")

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

if __name__ == '__main__':
    app.run(debug=True)
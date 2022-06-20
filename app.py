from flask import Flask, request
app = Flask(__name__)

@app.route('/login')
def login_func(): 
    print(request.args)
    return

if __name__ == '__main__':
    app.run(debug=True)
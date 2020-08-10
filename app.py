from flask import Flask, redirect, render_template, request

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secret"


@app.route('/')
def welcome():
    '''Render welcome page.'''
    
    return render_template('welcome.html')
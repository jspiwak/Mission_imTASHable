from flask import Flask, jsonify, render_template, redirect
# from flask_mysqldb import MySQL
import os

import pandas as pd
import numpy as np
import json
from pprint import pprint

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import inspect
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/masterdata.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(db.engine, reflect=True)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/powerpoint')
def powerpoint():
    return render_template('powerpoint.html')  

@app.route('/data')
def data():
    return render_template('data.html')   

@app.route('/audio_stats')
def audio_stats():
    return render_template('audio_stats.html')

@app.route('/genre')
def genre():
    return render_template('genre.html')  

@app.route('/countries')
def countries():
    return render_template('countries.html')   

@app.route('/us_map')
def us_maps():
    return render_template('us_map.html')    

@app.route('/countries_chart')  
def countries_chart():
    return render_template('countries_chart.html')  

@app.route("/countriesdata")
def countriesdata():
    return app.send_static_file('./db/csvData.json')

if __name__ == "__main__":
    app.run(debug=True,threaded=True)

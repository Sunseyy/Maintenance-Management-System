from flask_sqlalchemy import SQLAlchemy

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///default_data.db'  # Default database URI
    SQLALCHEMY_BINDS = {
        'welding_db': 'sqlite:///welding_data.db',
        'stamping_db': 'sqlite:///stamping_data.db',
        'painting_db': 'sqlite:///painting_data.db',
        'agv_db': 'sqlite:///agv_data.db',
        'cnc_milling_db': 'sqlite:///cnc_milling_data.db',
        'leak_test_db': 'sqlite:///leak_test_data.db'
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# Initialize the SQLAlchemy object
db = SQLAlchemy()

from flask import Flask, render_template, request, jsonify, redirect, abort
from flask_sqlalchemy import SQLAlchemy
import string
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///urls.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class URL(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    original_url = db.Column(db.String(500), nullable=False)
    short_url = db.Column(db.String(10), unique=True, nullable=False)

    def __init__(self, original_url, short_url):
        self.original_url = original_url
        self.short_url = short_url

def generate_short_url():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(6))

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/shorten', methods=['POST'])
def shorten():
    data = request.get_json()
    original_url = data.get('original_url')
    custom_short_url = data.get('custom_short_url')

    if custom_short_url:
        short_url = custom_short_url
        existing_url = URL.query.filter_by(short_url=short_url).first()
        if existing_url:
            return jsonify({'error': 'Custom short URL already exists. Please choose another one.'}), 400
    else:
        short_url = generate_short_url()

    new_url = URL(original_url=original_url, short_url=short_url)
    db.session.add(new_url)
    db.session.commit()
    response_data = {
        'original_url': original_url,
        'short_url': short_url
    }
    return jsonify(response_data)

@app.route('/<short_url>')
def redirect_to_original(short_url):
    url = URL.query.filter_by(short_url=short_url).first()
    if url:
        return redirect(url.original_url)
    else:
        abort(404)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()

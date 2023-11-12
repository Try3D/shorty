# Shorty: A simple url shortener

Its so simple. Just provide it an url and it will shorten it for you.

![website](https://github.com/Try3D/shorty/assets/94473657/3b6b9d61-f3f6-4833-829d-cdce51fcdba0)

## API Endpoint
1. Shorten URL
- Endpoint: `/shorten`
- Method: `POST`
- Response
    - Success: `{ original_url : <providided url> , short_url: <new url> }`
1. Goto URL
- Endpoint: `/:short_url`
- Method: `GET`
- Response:
    - Success: Redirect to the original URL
    - Failure: Return 404 error

## Setup for development
- Ensure that you have the following tools installed
    - python
    - sqlite3
    - git
- Clone the repository to your hard drive

    $ `git clone https://github.com/Try3D/shorty`
- Install required python dependencies using `pip`

    $ `pip install -r requirements.txt`
- Run the project

    $ `python app.py`
- Go to `http://localhost:5000` to see the development server

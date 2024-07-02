from flask import Flask, render_template, request, redirect, url_for
from flask_pymongo import PyMongo

app = Flask(__name__)

# Configure MongoDB connection
app.config['MONGO_URI'] = 'mongodb://localhost:27017/Login_signup'
mongo = PyMongo(app)

# Assuming you have a collection named 'users'
users_collection = mongo.db.users

# Login and Signup route
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'login' in request.form:
            # Login logic
            username = request.form['username']
            password = request.form['password']

            user = users_collection.find_one({'username': username, 'password': password})

            if user:
                # Successful login
                return 'Login successful!'
            else:
                # Failed login
                error = 'Invalid username or password'
                return render_template('login1.html', error=error)

        elif 'signup' in request.form:
            # Signup logic
            username = request.form['username']
            email = request.form['email']
            password = request.form['password']

            # Check if the username already exists
            existing_user = users_collection.find_one({'username': username})

            if existing_user:
                error = 'Username already exists'
                return render_template('login1.html', error=error)

            # Insert the new user into the 'users' collection
            users_collection.insert_one({'username': username, 'email': email, 'password': password})

            # Now, validate the login with the newly inserted user
            user = users_collection.find_one({'username': username, 'password': password})

            if user:
                # Successful signup and login
                return 'Signup and Login successful!'
            else:
                # Failed login after signup
                error = 'Signup successful, but login failed'
                return render_template('login1.html', error=error)

    return render_template('login1.html')

if __name__ == '__main__':
    app.run(debug=True)

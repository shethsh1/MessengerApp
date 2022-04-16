# Information

Originally this was a take home assignment from a company I was applying to - to create a simple 1-1 chat. I finished it but then decided to add onto it as a personal project to practice. I swapped all the states over to redux toolkit for better state management and added many more additional functionality. I deployed the app here: https://messenger786.herokuapp.com/

## List of working features and features I intend to add in the future

- [x] Login / Signup for an account
- [x] logout 
- [x] Online/Offline status is shown next to a user 
- [x] send messages to users
- [ ] send photos to other users 
- [x] Messages and conversation saved per account 
- [x] Timestamps of messages shown 
- [x] Search for users using the search bar
- [x] Notification for unread messages
- [x] Read receipts
- [ ] Know when another user is typing
- [ ] Upload your own avatar 
- [ ] Group chat
- [ ] Add friends    


![Alt Text](https://media.giphy.com/media/IWvbtEcKQ6EOUX42q0/giphy.gif)




# Messenger

A one-to-one realtime chat app.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)

## Initial Setup

**Note:** these setup steps are not necessary when running the code on GitPod. They are only necessary when running the project on your local machine.

Create the PostgreSQL database (these instructions may need to be adapted for your operating system):

```
psql
CREATE DATABASE messenger;
\q
```

Create a `.env` file in the server directory and add the following variables (make any modifications to fit your local installation):
```
SECRET_KEY="YourSecretKey"
ENV="development"
POSTGRES_ENGINE="django.db.backends.postgresql_psycopg2"
POSTGRES_HOST="localhost"
POSTGRES_PORT=5432
POSTGRES_DATABASE="messenger"
POSTGRES_USER="user"
POSTGRES_PASSWORD="password"

```


In the server folder, install dependencies and then seed the database (you may want to use a virtual environment):

**Note:** if you're running python 3.10, you might run into an issue with the Greenlet dependency. We recommend downgrading to python 3.8 or 3.9 for this project.


```
cd server
pip install -r requirements.txt


python manage.py makemigrations
python manage.py migrate 

python manage.py shell
from messenger_backend.seed import seed
seed()
exit()

```

In the client folder, install dependencies:

```
cd client
npm install
```

### Running the Application Locally

In one terminal, start the front end:

```
cd client
npm start
```

In a separate terminal, start the back end:

```
cd server
python manage.py runserver
```

### Running Tests on the Server
```
cd server
python manage.py test
```

## How to Run E2E Tests

1. Seed the database.
1. Start the backend server.
1. Start the frontend server with `npm start` in `client` directory.
1. Open Cypress dashboard with `npx cypress open` in `client` directory.
1. Click on the test suite to run (e.g. `auth.spec.js`).

#### Notes

- You need to seed the database before each run. Because E2E test cases writes data to
  the actual database, re-seeding is necessary to assure consistent test results.
- The E2E tests are not comprehensive.
  There is a test for the authentication pages that should pass with the starting code,
  and some tests for some of the functionality for some of the tickets you will be assigned.
- When you push your changes to GitHub, E2E tests are automatically executed on GitHub Actions.
  You can find test results under Pull request > Checks > test > Cypress (see screenshots below).

![image](https://user-images.githubusercontent.com/8978815/136117299-b45a61ce-0b5c-495f-b572-05ad80b78a28.png)
![image](https://user-images.githubusercontent.com/8978815/136119935-4b941f87-0015-48c5-b93e-5bd0bcbbd64b.png)


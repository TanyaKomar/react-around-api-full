# Around the U.S.
> react-around-api-full

"Around the U.S." is an interactive page where users can add, remove, or like photos. I've done it during the Web Development course by Practicum by Yandex. 

The full API of "Around the U.S." project with authorization and registration handled by the back-end server. This app is written in Express, uses MongoDB and has a React front-end.

The server's IP address is 34.69.117.154.
The domain name is tanyakomar.students.nomoreparties.site/.
 
## Features

- User routes:
  - Register and login
  - Update user information and profile picture
- Card routes (for authorized users):
  - Create new photo cards
  - Delete cards
  - Like and dislike cards
- User authentication using jwt
- Mongo models for users and cards
- Validation and error handling
  - Route validation with celebrate/Joi
  - Error logging with Winston
  - Centralized Error Handling 

## Run locally

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.


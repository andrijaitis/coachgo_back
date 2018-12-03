# Coach-go-back-end
CoachGO back-end written with Express. This api not completed and cannot be used in a production

## Starting  server

Run nodemon app.js for a dev server. Base route is located to `http://localhost:3000/`. 

## Before start

Run `npm i` to generate to install all node modules
Don't forget to start MongoDB server

## Auth endpoints 

POST `/api/register` - Register a new coach

POST `/api/login` - Login for a coach

POST `/api/logout` - Logout for coach

 
## Athlete endpoints (must be auth in order to use)

POST `/api/athlete` - Create a new athlete

GET `/api/athletes`- Returns all athletes for a specific coach

GET `/api/injured` - Data about all injured atheltes and their injuries

GET `/api/athlete/:athleteId` - Get all data about athlete

PUT `/api/athlete/:athleteId` - Update athlete

PUT `/athleteinjury/:athleteId` - Add injury to a specific athlete

DELETE `/athleteinjury/:athleteId` - Delete specific athlete by ID

## Training endpoints (must be auth in order to use)

POST `/api/training` - Create a new training

POST `/api/trainings` - Get trainings for specific coach

GET `/api/alltraining` - Get all trainings

PUT `/api/training/:trainingId` - Update training

DELETE `/api/training/:trainingId` - Delete training

 data to post {}///
 will add later




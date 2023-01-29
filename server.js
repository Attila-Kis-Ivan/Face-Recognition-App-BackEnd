const express = require('express');
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : 'dpg-cfaf3ohgp3jsh6f1lo2g-a',
    user : 'face_recognition_app_backend_database_user',
    password : '',
    database : 'face_recognition_app_backend_database'
  }
});


const app = express();

app.use(cors())
app.use(express.json()); 

app.get('/', (req, res)=> { res.send('it is working') })
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) =>{register.handleRegister(req, res, db, bcrypt)}) 

app.get('/profile/:id', (req, res)=> {profile.handlePRofileGet(req, res, db)} )

app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}` );
})
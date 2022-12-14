const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : 'dpg-ce38a994reb9tolfedo0-a',
      port : 5432,
      user : 'eye_see_you_user',
      password : '5hutpGNnTwVIAJADen511kwvkPsDpReO',
      database : 'eye_see_you'
    }
});


const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) =>{res.send('Success')})

app.post('/signin', (req,res) =>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) =>{profile.handleProfile(req,res,db)})

app.put('/image', (req,res) => {image.hangleImage(req,res,db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res,db)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})


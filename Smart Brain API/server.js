const express = require('express');
const bodyParser= require('body-parser');
const bcrypt= require('bcrypt-nodejs')
const cors= require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

//CONNECT OUR SERVER TO THE DATABASE
//query statement that knex created for postgres
const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'test',
      database: 'smart_brain',
    },
  });

  db.select('*').from('users').then(data=>{
    console.log(data)
  })


const app= express();
app.use(bodyParser.json());
app.use(cors());

const database={
    users:[
        {
            id: "123",
            name: 'john',
            email: 'john@yahoo.com',
            password: 'cookies',
            entries: '0',
            joined: new Date()
        },
        {
            id: "124",
            name: 'sally',
            email: 'sally@yahoo.com',
            password: 'apples',
            entries: '0',
            joined: new Date()
        }
    ],
    login:[
        {
            id: '987',
            hash: '',
            email: 'john@yahoo.com'
        }
    ]
}


app.get('/', (req, resp)=>{
    resp.send('success')
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, resp) => {register.handleRegister(req, resp, db, bcrypt)})//dependency injection. we inject whatever dependencies the handle regsiter function needs.
   
app.get('/profile/:id', (req, resp)=>{profile.handleProfileGet(req, resp, db)})

app.put('/image', (req, resp)=>{image.handleImage(req, resp, db)})
/*
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});

*/
app.listen(1000, ()=>{
    console.log('app is running on 1000')
})
/*

/  --> res= this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET= user
/image -- PUT --> user

*/

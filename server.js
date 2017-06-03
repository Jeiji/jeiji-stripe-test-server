//---------------- SETUP -------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const multer  = require('multer');
const upload = multer({ dest: './client/assets' });

const app = express();

app.use( bodyParser.urlencoded( { extended : true }));
app.use(bodyParser.json());

//---------------- STATIC FILES -------------------
app.use( express.static( path.join( __dirname , './client')));
app.use( express.static( path.join( __dirname , './client/partials')));
app.use( express.static( path.join( __dirname , './server/controllers')));
app.use( express.static( path.join( __dirname , './bower_components')));
app.use( express.static( path.join( __dirname , './node_modules')));
app.set('views', __dirname + '/client/partials/');
app.set('view engine', 'ejs')

//---------------- SESSIONS -------------------
app.use(session({
  secret: 'mekele',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false , httpOnly: false , maxAge : 36000000 }
}))


//---------------- DATABASE -------------------
// require('./server/config/mongoose.js');

//---------------- ROUTES -------------------
require("./server/config/routes.js")(app);

//---------------- SERVER LISTENER -------------------
const port = 7000;
app.listen( process.env.PORT || port  , function(){
  console.log(`Listening to port ${process.env.PORT} or ${port} for 'Stripe-Test-Server'`);
});

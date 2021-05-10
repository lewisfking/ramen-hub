const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 3000;


mongoose.connect('mongodb://localhost/ramen-hub');
let db=mongoose.connection;


db.once('open', function(){
	console.log('Connected to mongoDB')
});

//check for db errors
db.on('error', function(err){
	console.log(err);
});

const app = express();

//bring in models
let User = require('./models/user');
let Experience = require('./models/experience');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.use(function(req,res,next){
	console.log(req.method);
	console.log(req.url);
	console.log(req.path);
	next();
});


//Serve static resources from public, if they exist
app.use(express.static("./views"));

app.get('/', (req, res) => {

	Experience.find({}, function(err, experiences){
		res.render('index.pug', {
			experiences: experiences
		});
	});
});

app.get('/users/add', function(req,res){
	User.find({}, function(err, users){
		res.render('add_user.pug', {
			users: users
		});
	});
});

app.get('/experiences/add', function(req,res){
	User.find({}, function(err, users){
		res.render('add_experience.pug', {
			users: users
		});
	});
});

app.post('/users/add', function (req,res){
	let user = new User();
	user.name = req.body.username;

	user.save(function(err){
		if(err){
			console.log(err);
		} else{
			res.redirect('/');
		}

	})
});

app.post('/experiences/add', function (req,res){
	let	experience = new Experience();
	experience.name = req.body.username;
	experience.barcode = req.body.barcode;
	experience.note = req.body.note;

	experience.save(function(err){
		if(err){
			console.log(err);
		} else{
			res.redirect('/');
		}

	})
});

app.listen(port,function() {
  console.log(`App listening at http://localhost:`+port);
})
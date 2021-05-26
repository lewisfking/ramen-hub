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
let Experience = require('./models/experience');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/experiences/add', function(req,res){
		res.render('add_experience.pug');
});
app.get('/experiences', function(req,res){
	res.redirect('/');
});

//get experience
app.get('/experiences/:id', function(req,res){
	Experience.findById(req.params.id, function(err, experience){
		res.render('experience.pug',{
			experience:experience			
		})
	});

});

//load edit form
app.get('/experiences/:id/edit', function(req,res){
	Experience.findById(req.params.id, function(err, experience){
		res.render('edit_experience.pug',{
			experience:experience			
		})
	});

});

app.post('/experiences', function (req,res){
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

//update experience
app.post('/experiences/:id', function (req,res){
	let	experience = {}
	experience.name = req.body.username;
	experience.barcode = req.body.barcode;
	experience.note = req.body.note;

	let query = {_id:req.params.id}

	Experience.update(query, experience, function(err){
		if(err){
			console.log(err);
		} else{
			res.redirect('/');
		}

	})
});


app.delete('/experiences/:id', function (req,res){
	let query={_id:req.params.id}

	Experience.remove(query, function(err){
		if (err){
			console.log(err);
		}
		res.send("success")


	})
})

app.listen(port,function() {
  console.log(`App listening at http://localhost:`+port);
})
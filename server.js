const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

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
	var db = JSON.parse(fs.readFileSync('./database.json'));

	res.render('index.pug', {
		experiences: db['experiences']
	}
	);
})

app.get('/users/add', function(req,res){
	var db = JSON.parse(fs.readFileSync('./database.json'));

	res.render('add_user.pug', {
		users: db['users']
	});
});

app.get('/experiences/add', function(req,res){
	var db = JSON.parse(fs.readFileSync('./database.json'));

	res.render('add_experience.pug',{
		users: db['users']
	});
});

app.post('/users/add', function (req,res){
	user = {
		"name" : req.body.username
	}
	if (user.name){
		var db = JSON.parse(fs.readFileSync('./database.json'));
		db["users"].push(user);
		fs.writeFileSync('./database.json', JSON.stringify(db,null,4))
	}
	res.redirect('/');
});
app.post('/experiences/add', function (req,res){
	experience = {
		"name" : req.body.username,
		"barcode" : req.body.barcode,
		"note" : req.body.note
	}
	if (experience.name&&experience.barcode&&experience.note){
		var db = JSON.parse(fs.readFileSync('./database.json'));
		db["experiences"].push(experience);
		fs.writeFileSync('./database.json', JSON.stringify(db,null,4))
	}
	res.redirect('/');
});

app.listen(port,function() {
  console.log(`App listening at http://localhost:`+port);
})
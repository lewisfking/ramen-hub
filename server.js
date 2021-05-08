const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var db = JSON.parse(fs.readFileSync('./database.json'));


app.use(function(req,res,next){
	console.log(req.method);
	console.log(req.url);
	console.log(req.path);
	next();
});


//Serve static resources from public, if they exist
app.use(express.static("./views"));

app.get('/', (req, res) => {
	
	res.render('index.pug', {
		experiences: db['experiences']
	}
	);
})
app.get('/users/add', function(req,res){
	res.render('add_user.pug');
});
app.get('/experiences/add', function(req,res){
	res.render('add_experience.pug');
});

app.listen(port,function() {
  console.log(`App listening at http://localhost:3000`);
})
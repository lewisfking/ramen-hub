const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(req,res,next){
	console.log(req.method);
	console.log(req.url);
	console.log(req.path);
	next();
});


//Serve static resources from public, if they exist
app.use(express.static("./views"));

app.get('/', (req, res) => {
	let experiences = [
		{
			id: 1,
			barcode: '059491000501',
			note: "spicy ow oof"
		},
		{
			id : 2,
			barcode : '8801128542661',
			note : "beef yum"
		},
		{
			id : 3,
			barcode : '8801073113428 ',
			note : "tasty chicken"
		}
	]


	res.render('index.pug', {
		experiences: experiences
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
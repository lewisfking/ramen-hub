const express = require('express')
const app = express()
const port = 3000

app.use(function(req,res,next){
	console.log(req.method);
	console.log(req.url);
	console.log(req.path);
	next();
});

//Serve static resources from public, if they exist
app.use(express.static("./views"));

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:3000`)
})
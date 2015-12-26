var express=require('express');
var app=express();
var PORT=process.env.PORT||3000; //its an env variable if app is running on heroku
app.get('/', function (req,res){ //or if its not defined, then use port 3000
	res.send('Todo api root');
});
app.listen(PORT,function(){
	console.log('Express Listening on port '+PORT+'!');
}) ;                              
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var todoNextId=1;
var _=require('underscore');

app.use(bodyParser.json());
var todos= []                     //array
// 	{id:1, //int type
// 	description: 'Meet mom for dinner', //string type
// 	completed: false  //boolean type

// }, {
// 	id:2,
// 	description:'Go to market',
// 	completed:false

// },{
// 	id:3,
// 	description:'Play ps3',
// 	completed:true 
// }];}
var PORT=process.env.PORT||3000; //its an env variable if app is running on heroku
app.get('/', function (req,res){ //or if its not defined, then use port 3000
	res.send('Todo api root');
});

// GET /todos       get all of the todos
//Get /todos/:id    get individual todo
app.get('/todos',function (req,res){
res.json(todos);
});
//GET/todos/:id
app.get('/todos/:id', function (req,res){
	var todoId=parseInt(req.params.id,10);
	var matchedTodo=_.findWhere(todos,{id: todoId}); //first param is the array, second is the object to search through that array
	//^this line just replaced the 4 below. boooM
	// var matchedTodo;
	// todos.forEach(function (todo){
	// 	if (todoId===todo.id){
	// 		matchedTodo=todo;
	// 	}

	// });
	if(matchedTodo){

		res.json(matchedTodo);
	}else{
		//res.status(404).send();
		res.send('Its not there.Just accept it ');
	}
	//Iterate through the todos array.Find the match.

	
//res.send('Asking for todo id of ' + req.params.id);

});

//Post/ todos
app.post('/todos', function (req, res){
	var body=_.pick(req.body,'description','completed');
	//errString="Homie, that some bad ass request. Try again."
	if(!_.isBoolean(body.completed)|| !_.isString(body.description)||body.description.trim().length===0){// run if body.completed is not a boolean or the other things you can see...
		return res.status(400).send();//400 means req cant be completed as bad data was provided
	//return errString;
	}
	//console.log('description : '+body.description);
	//add id to the field
	body.id= todoNextId++;
	//push body into the array
	todos.push(body);
	res.json(body);

});
app.delete('/todos/:id', function(req, res){
	var todoId=parseInt(req.params.id,10);
	var matchedTodo=_.findWhere(todos, {id: todoId});
	if(!matchedTodo){
		res.status(404).json({"error": "no todo found with that id biatch"});

	}else{
		todos=_.without(todos,matchedTodo);
		res.json(matchedTodo); //use json to send back the matched todo
	}


});
app.put('/todos/:id', function (req, res){
	var todoId=parseInt(req.params.id,10);
	var matchedTodo=_.findWhere(todos, {id: todoId});
	var body=_.pick(req.body,'description','completed');
	var validAttributes={};
	if(!matchedTodo){
		return res.status(404).send();//404-not found 400-bad syntax.
	}
//basically we're checking if we have an id that matches any one id that is already present.
	if(body.hasOwnProperty('completed')&&_.isBoolean(body.completed)){
		validAttributes.completed=body.completed;
	}else if(body.hasOwnProperty('completed')){
		//bad
		return res.status(400).send();
}
if(body.hasOwnProperty('description')&&_.isString(body.description)&&body.description.trim().length>0){
validAttributes.description=body.description;

}else if(body.hasOwnProperty('description')){
	return res.status(400).send();
}
_.extend(matchedTodo,validAttributes);//first is the original destination object, second is the object you want to use to override properties
res.json(matchedTodo);

});


app.listen(PORT,function(){
	console.log('Express Listening on port '+PORT+'           !');
}) ;                              
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var todoNextId=1;

app.use(bodyParser.json());
var todos=[{                        //array
	id:1, //int type
	description: 'Meet mom for dinner', //string type
	completed: false  //boolean type

}, {
	id:2,
	description:'Go to market',
	completed:false

},{
	id:3,
	description:'Play ps3',
	completed:true 
}];
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
	var matchedTodo;
	todos.forEach(function (todo){
		if (todoId===todo.id){
			matchedTodo=todo;
		}

	});
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
	var body=req.body;
	//console.log('description : '+body.description);
	body.id= todoNextId++;
	todos.push(body);
	res.json(body);

});

app.listen(PORT,function(){
	console.log('Express Listening on port '+PORT+'!');
}) ;                              
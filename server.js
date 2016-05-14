var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var todoNextId=1;
var _=require('underscore');
var db=require('./db.js');
app.use(bodyParser.json());
var todos= [];                  //array
var bcrypt=require('bcrypt');
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
	var query=req.query;
	var where={};
	if(query.hasOwnProperty('completed')&&query.completed=='true'){
		where.completed=true;
	}else if(query.hasOwnProperty('completed')&&query.completed=='false'){
		where.completed=false;
	}
	if(query.hasOwnProperty('q')&&query.q.length>0){//q is the query parameter you see in the address bar
		where.description={
			$like: '%'+query.q+'%' // sends the matched todo item as what the user typed. like q= walk
		};
}
db.todo.findAll({where:where}).then(function(todos){
	res.json(todos);
},function(e){
	res.status(500).send();
});


// var queryParams=req.query;
// 	var filteredTodos=todos;//set it equal to the todos array
// 	if(queryParams.hasOwnProperty('completed')&&queryParams.completed==='true'){
// 		filteredTodos=_.where(filteredTodos,{completed: true});//again, 2 parameters second one is the object with completed set to true
// }else if(queryParams.hasOwnProperty('completed')&&queryParams.completed==='false'){
// 	filteredTodos=_.where(filteredTodos,{completed: false});
// }

// 	//if hasproperty &&completed==='true'
// 	//filteredTodos=_.where(filteredTodos, ?)   //?- object used to filter the todos
// 	//else if has property && completed if 'false'


// 	res.json(filteredTodos);//every todo item is returned no matter what query parameter you have
});
//GET/todos/:id
app.get('/todos/:id', function (req,res){
	var todoId=parseInt(req.params.id,10); // two kinds of error. onne is there is no todo, the other(500) is a problem with the server , like it crashed etc.
	db.todo.findById(todoId).then(function (todo){
		if(!!todo){ //this runs only if theres a todo item. in case of a normal todo, 1! flips it to false and another flips it to true. in case of a null
			//1 ! flips it to true, the 2nd! flips it to false.
			res.json(todo.toJSON());
		}else{
			res.status(404).send();
		}

	},function(e){
		res.status(500).send();

	});
	//var matchedTodo=_.findWhere(todos,{id: todoId}); //first param is the array, second is the object to search through that array
	//^this line just replaced the 4 below. boooM
	// var matchedTodo;
	// todos.forEach(function (todo){
	// 	if (todoId===todo.id){
	// 		matchedTodo=todo;
	// 	}

	// });

	// if(matchedTodo){

	// 	res.json(matchedTodo);
	// }else{
	// 	//res.status(404).send();
	// 	res.send('Its not there.Just accept it ');
	// }
	// //Iterate through the todos array.Find the match.

	
//res.send('Asking for todo id of ' + req.params.id);

});

//Post/ todos
app.post('/todos', function (req, res){
	var body=_.pick(req.body,'description','completed');
	db.todo.create(body).then(function (todo){ //post to the database
		res.json(todo.toJSON());
	},function (e){
		res.status(400).json(e);

	});

	// //errString="Homie, that some bad ass request. Try again."
	// if(!_.isBoolean(body.completed)|| !_.isString(body.description)||body.description.trim().length===0){// run if body.completed is not a boolean or the other things you can see...
	// 	return res.status(400).send();//400 means req cant be completed as bad data was provided
	// //return errString;
	// }
	// //console.log('description : '+body.description);
	// //add id to the field
	// body.id= todoNextId++;
	// //push body into the array
	// todos.push(body);
	// res.json(body);

});
app.delete('/todos/:id', function(req, res){
	var todoId=parseInt(req.params.id,10);
	db.todo.destroy({
		where:{
			id:todoId
		}
	}).then(function (rowsDeleted){
		if(rowsDeleted===0){
			res.status(404).json({
				error: 'No todo with that id, punk'
			});

		}else{
			res.status(204).send(); //204 says everything went well and there is nothing to send back, ie the user successfully deleted that todo row
		}

	},function(){
		res.status(500).send();
	});
	// var todoId=parseInt(req.params.id,10);
	// var matchedTodo=_.findWhere(todos, {id: todoId});
	// if(!matchedTodo){
	// 	res.status(404).json({"error": "no todo found with that id biatch"});

	// }else{
	// 	todos=_.without(todos,matchedTodo);
	// 	res.json(matchedTodo); //use json to send back the matched todo
	// }


});
app.put('/todos/:id', function (req, res){
	//var matchedTodo=_.findWhere(todos, {id: todoId});
	var todoId=parseInt(req.params.id,10);

	var body=_.pick(req.body,'description','completed');
	var attributes={};
	// if(!matchedTodo){
	// 	return res.status(404).send();//404-not found 400-bad syntax.
	// }
//basically we're checking if we have an id that matches any one id that is already present.
	if(body.hasOwnProperty('completed')){
		attributes.completed=body.completed;
									}

if(body.hasOwnProperty('description')){
attributes.description=body.description;
}
// _.extend(matchedTodo,validAttributes);//first is the original destination object, second is the object you want to use to override properties
// res.json(matchedTodo);
db.todo.findById(todoId).then(function(todo){
	//-----------XXXXXXXXXXXXX----//
if(todo){
	todo.update(attributes).then(function (todo){
	res.json(todo.toJSON());  //if todo.update goes well
//--------------XXXXXXXXXXXXXXXXXX---------
}, function (e){  //if todo.update goes poorly
	res.status(400).json(e);// bad syntax error. user should change input;//param is the object of the attributes that you want to update
});
}else{
	res.status(404).send();                // findbyId went well
}     //--------------XXXXXXXXXXXXXXXXXX----------------------------
}, function(){
	res.status(500).send();            //findbyId didnt go well
	//--------------XXXXXXXXXXXXXXXXXX---------

});
//--------------XXXXXXXXXXXXXXXXXX---------

});

app.post('/users',function (req,res){
	var body=_.pick(req.body,'email', 'password');
	db.user.create(body).then(function(user){
     res.json(user.toPublicJSON());
	},function(e){
		res.status(400).json(e); //.json(e)
	});

});
//use post / good url -Posturl is POSTusers/login. i set the methos in postman rn


app.post('/users/login', function (req, res){
 var body=_.pick(req.body,'email','password');
 db.user.authenticate(body).then(function (user){
 	res.header('Auth',user.generateToken('authentication')).json(user.toPublicJSON());
	}, function(){
		res.status(401).send();
 });

});

db.sequelize.sync().then(function(){
	app.listen(PORT,function(){
	console.log('Express Listening on port '+PORT+'           !');
}) ;  

});


                            
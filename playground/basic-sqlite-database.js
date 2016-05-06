var Sequelize=require('sequelize');
var sequelize=new Sequelize (undefined,undefined,undefined,{

'dialect':'sqlite',
'storage': __dirname+'/basic-sqlite-database.sqlite'

}) ; //instance of Sequelize that we can actually do stuff with
//dialect- which database u wanna use
//specific to sqlite -filename :basic-sqlite-database.sqlite
//sequelize manages our data as javascript objects and arrays and converts them to sqlite 'calls'

var Todo=sequelize.define('todo',{
description: {
	type:Sequelize.STRING,
	allowNull:false,
	//no empty strings
	validate: {
		len:[1,250]   //characters range between 1-250.
	}
},
completed:{
	type: Sequelize.BOOLEAN,
	allowNull:false,
	defaultValue:false
}

})
sequelize.sync({force: true}).then(function(){ //force true recreates every tables from scratch
	console.log('Everything is synced');


// 	Todo.create({    //create is a method that set the attributes to your object

// description:'Get a job bob',
// completed:false
// 	}).then(function (todo){     //
// 		return Todo.create({
// 			description : 'Clean the office'
// 		});
// 	}).then(function(){
// 		//return Todo.findById(1)
// 		return Todo.findAll({
// 			where:{
// 				completed:false
// 			}
// 		});
// 	}).then(function (todo){
// if(todo){
// 	todos.forEach(function(todo){

// 	console.log(todo.toJSON());
// });
// }else{
// 	console.log('no todo found!');
// }
// 	}).catch(function (e){
// 		console.log(e);
// 	});
// }); //-----------------------------------------XXXXXXXXXXXXXXXXXXX-----------------------------------------//
// // var Sequelize = require('sequelize');
// // var sequelize = new Sequelize(undefined, undefined, undefined, {
// // 	'dialect': 'sqlite',
// // 	'storage': __dirname + '/basic-sqlite-database.sqlite'
// // });

// // var Todo = sequelize.define('todo', {
// // 	description: {
// // 		type: Sequelize.STRING
// // 	},
// // 	completed: {
// // 		type: Sequelize.BOOLEAN
// // 	}
// // })

// // sequelize.sync({force: true}).then(function () {
// // 	console.log('Everything is synced');

// // 	Todo.create({
// // 		description: 'Walking my dog like a boss',
// // 		completed: false
// // 	}).then(function (todo) {
// // 		console.log('Finished!');
// // 		console.log(todo);
// // 	});
// // });
var Sequelize=require('sequelize');
var sequelize=new Sequelize (undefined,undefined,undefined,{

'dialect':'sqlite',
'storage': __dirname+'/data/dev-todo-api.sqlite'

}) ;
var db={};
db.todo=sequelize.import(__dirname+'/models/todo.js') //set a todo property on the db object. and toss the file in that directory.
db.sequelize=sequelize;
db.Sequelize=sequelize;
module.exports=db; //set it equal to an object to export multiple stuff like the above 2 lines

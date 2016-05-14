var Sequelize=require('sequelize');
var env=process.env.NODE_ENV||'development'; //work with env variable to upload to appropriate database
var sequelize;
if(env==='production'){ //this is true when we're working on heroku
sequelize=new Sequelize(process.env.DATABASE_URL,{
	dialect:'postgres'
});
}
else{//when app isnt on heroku
	var sequelize=new Sequelize (undefined,undefined,undefined,{

'dialect':'sqlite',
'storage': __dirname+'/data/dev-todo-api.sqlite'

});

}

var db={};
db.user=sequelize.import(__dirname+'/models/user.js');
db.todo=sequelize.import(__dirname+'/models/todo.js') ;//set a todo property on the db object. and toss the file in that directory.
db.sequelize=sequelize;
db.Sequelize=sequelize;
module.exports=db; //set it equal to an object to export multiple stuff like the above 2 lines

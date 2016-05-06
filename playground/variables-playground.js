var person={
	name: 'Andrew',
	age: 21
};
function updatePerson(obj){
	// obj={
	// 	name: 'Andrew',  //I commented this later to put in to action the line=	obj.age=24;
	// 	age: 24
	// };
	obj.age=24;
	
}
updatePerson(person);
	console.log(person);


//array example
var grades= [15, 88];
function addGrades(gradesArr){
	//gradesArr.push(55);
	//gradesArr=[12,14,98]; //nothing happens .therefore use return keyword and change the following below line to :grades=addGrades(grades);
return gradesArr=[12,14,98];
}
addGrades(grades);
console.log(grades);
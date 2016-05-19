//front end code
var email=getQueryVariable('email');
var password=getQueryVariable('password');
//console.log('new user signed up: '+email+'  passowrd: '+password);
var $form = jQuery('#message-form');//selector is a way to tak an element out of the html
     var $e= $form.find('input[name=email]');
     var $p= $form.find('input[name=password]');
 $http({                //ajax 
                        //url,method type(POST,GET,PUT etc)
 url:'http://localhost:/users',
 method: 'POST'

}).then(function (resp){//success
  

 }, function (resp){//failed

 });


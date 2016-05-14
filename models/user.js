var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs=require('crypto-js');
var jwt=require('jsonwebtoken');
module.exports = function(sequelize, DataTypes) {
var user= sequelize.define('user',{
		email:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:true, //no two same emails
			validate:{
				isEmail:true
			}
		},
		salt:{
			type: DataTypes.STRING
		},
		password_hash:{
			type: DataTypes.STRING

		},
		password:{
			type:DataTypes.VIRTUAL, //new datatype, password isnt then stored in the database.
			allowNull:false,
			validate:{
				len:[7,100]
			},
			set: function (value){
				var salt=bcrypt.genSaltSync(10); //10 charactrs
				var hashedPassword=bcrypt.hashSync(value,salt);//value is the password itself
				this.setDataValue('password',value); //password=value
				this.setDataValue('salt',salt);
				this.setDataValue('password_hash', hashedPassword);
			}
		}
	// 	username:{
	// 		type:DataTypes.STRING,
	// 		allowNull:false,
	// 		validate:{
	// 			len:[3,9]
	// 		}
	// 	}
	 },
	 { hooks: {
			beforeValidate: function(user, options) {
				// user.email
				if (typeof user.email === 'string') {
					user.email = user.email.toLowerCase();
				}
			}
		},
		classMethods: {
			authenticate: function(body) {
				return new Promise(function(resolve, reject) {
					if (typeof body.email !== 'string' || typeof body.password !== 'string') {
						return reject();
					}

					user.findOne({
						where: {
							email: body.email
						}
					}).then(function(user) {
						if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
							return reject();
						}

						resolve(user);
					}, function(e) {
						reject();
					});
				});
			}
		},
		instanceMethods: {
			toPublicJSON: function() {
				var json = this.toJSON();
				return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
			},
			generateToken: function(type){
				if(!_.isString(type)){
					return undefined;
				}
				try{ //encrypting user's info. here i installed a new module-
							var stringData=JSON.stringify({id: this.get('id'),type:type});
                            var encryptedData =cryptojs.AES.encrypt(stringData,'abc123!@#!').toString();
                            var token=jwt.sign({
                            	token:encryptedData
                            }, 'qwerty098');//jwt password

                            return token;
				
				}catch(e){
					console.error(e);
				return undefined;
				}
			}
		}
	});

	return user;
};
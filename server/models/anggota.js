const validator = require('validator');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var DokterSchema = new mongoose.Schema({
	nama:{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	email:{
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate:{
			validator:validator.isEmail,
			message:"{VALUE} is not a valid email"
		}
	},
	password:{
			type: String,
			required: true,
			minlength: 6,
	},
	passwordConf:{
			type: String,
			required: true,
			minlength: 6,
	},
});

DokterSchema.methods.toJSON = function(){
	var dokter = this;
	var userObject = dokter.toObject();

	return _.pick(userObject, ['_id','nama', 'email']);
};

DokterSchema.statics.findByCredentials = function (email, password){
	var Dokter = this;
	return Dokter.findOne({email}).then((dokter) => {

		if(!dokter){
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, dokter.password, (err,res) => {
			  if(res){
					resolve(dokter);
				} else {
					reject();
				}
			});
		});
	})
};

DokterSchema.pre('save', function (next) {
	var dokter = this;
	if (dokter.isModified('password')){
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(dokter.password, salt, (err, hash) => {
		    dokter.password = hash;
				next();
		  });
		});
	} else {
		next();
	}
});

var Dokter = mongoose.model('dokter', DokterSchema);
module.exports = {Dokter};

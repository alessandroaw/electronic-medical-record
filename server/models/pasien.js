const validator = require('validator');
const mongoose = require('mongoose');
const _ = require('lodash');

var PasienSchema = new mongoose.Schema({
	nama:{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	nomorInduk:{
		type: String,
		required: true,
		trim: true,
		unique: true,
		minlength: 1,
	},
	tanggalLahir:{
		type: Date,
		required: true,
		trim: true,
		minlength: 1,
	},
	pekerjaan:{
		type: String,
		default: 'mahasiswa',
		trim: true,
		minlength: 1,
	},
	alamat:{
		type: String,
		default: 'jalan ganesha',
		trim: true,
		minlength: 1,
	},
	gender:{
		type: String,
		default: 'laki-laki',
		trim: true,
		minlength: 1,
	},
	nomorTelp:{
		type: String,
		default: '081234567891',
		trim: true,
		minlength: 1,
	},
	golonganDarah:{
		type: String,
		default: 'O+',
		trim: true,
		minlength: 1,
		maxlength: 2
	}
});

var Pasien = mongoose.model('pasien', PasienSchema);

module.exports = {Pasien};

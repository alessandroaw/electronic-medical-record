const express = require('express');
const router = express.Router();
const {Pasien} = require('../models/pasien');
const path = require('path');
const _ = require('lodash');
var {authenticate} = require('../middleware/authenticate');

// GET pendaftaran pasien
router.get('/tambah', (req, res) => {
  res.render('Pendaftaran pasien.hbs');
});

// Post pasien baru
router.post('/tambah', (req, res) => {

    var body = _.pick(req.body, [])
    var userData = new Pasien({body});

    userData.save().then((pasien) => {
      req.session.userId = pasien._id;
      return res.send(pasien)
    }). catch((e) => {
        res.send(e)
    });

});

//goes here from antrian
router.get('/:id', (req, res) => {
	res.render('Profil Pasien.hbs');
});

//goes here from profile
router.get('/form-rekam-medis', (req, res) => {
  res.render('Form Rekam Medis.hbs');
});

//goes here from profile
router.get('/rekam-medis/:id', (req, res) => {
	res.render('Rekam Medis.hbs');
});

//home
router.get('/', authenticate, (req, res) => {
	res.render('Daftar Antrian.hbs');
});

//home
router.get('/login', (req, res) => {
	res.render('Login.hbs');
});

module.exports = router;

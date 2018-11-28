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
  var body = _.pick(req.body, ['nama', 'nomorInduk', 'tanggalLahir', 'pekerjaan', 'alamat', 'nomorTelp', 'golonganDarah','rh']);
    body.golonganDarah += body.rh;
    var userData = new Pasien({
      nama: body.nama,
      nomorInduk: body.nomorInduk,
      tanggalLahir: body.tanggalLahir,
      pekerjaan: body.pekerjaan,
      alamat: body.alamat,
      nomorTelp: body.nomorTelp,
      golonganDarah: body.golonganDarah
    });
    console.log(userData);

    userData.save().then((pasien) => {
      res.redirect('/');
    }).catch((e) => {
      res.send(e)
    });

});

//goes here from antrian
router.get('/:id', (req, res) => {
  var id = req.params.id;
  Pasien.findById(id).then((pasien) => {
    res.render('Profil Pasien.hbs',{pasien});
  }).catch ((e) => {
    res.statis(400).send(e);
  })
});

//goes here from profile
router.get('/form-rekam-medis', (req, res) => {
  res.render('Form Rekam Medis.hbs');
});

//goes here from profile
router.get('/rekam-medis/:id', (req, res) => {
	res.render('Rekam Medis.hbs');
});

//antrian pasien
router.get('/', authenticate, (req, res) => {
	res.render('Daftar Antrian.hbs');
});

//home
router.get('/login', (req, res) => {
	res.render('Login.hbs');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const {Dokter} = require('../models/dokter');
const {Antrian} = require('../models/antrian');
const {MedicalRecord} = require('../models/medicalRecord');
const path = require('path');
const _ = require('lodash');
var {authenticate} = require('../middleware/authenticate');
// express().use(express.static(path.join(__dirname, '../public')));
// GET route for reading data

//home
router.get('/', authenticate, (req, res) => {
  Antrian.find({isServed:false})
  .populate('_idPasien')
  .then((antrian) => {
    console.log('masuk : ');
    console.log(antrian);
    res.render('Daftar Antrian.hbs',{antrian});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//home
router.get('/login', (req, res) => {
  var wrong = true;
  res.render('Login.hbs',{wrong});
});

//home
router.get('/tambah-mr/:id', authenticate, (req, res) => {
  var id = req.params.id;
  res.render('Form Rekam Medis.hbs',{id});
});

//home
router.post('/tambah-mr/:idPasien', authenticate, (req, res) => {
  var body = _.pick(req.body,['subjektif', 'diagnosa', 'tindakan', 'medikasi', 'catatan'])
  var emr = new MedicalRecord({
    _idPasien: req.params.idPasien,
    _idDokter: req.session.userId,
    subjektif: body.subjektif,
    diagnosa: body.diagnosa,
    tindakan: body.tindakan,
    medikasi: body.medikasi,
    catatan: body.catatan,
    tanggalPemeriksaan: new Date(),
  });
  emr.save().then((doc) => {
    console.log(doc);
    res.redirect(`/pasien/${req.params.idPasien}`)
  }).catch((e) => {
    res.status(400).send();
  });
});

router.post('/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  if(body.email && body.password){
    Dokter.findByCredentials(body.email, body.password).then((dokter) => {
      req.session.userId = dokter._id;
      return res.redirect('/dokter');
    }).catch((e) => {
      res.status(400).send();
    });

  } else {

    res.redirect('/dokter/login');
  }
});


//POST route for updating data
router.post('/signup', (req, res, next) => {
  // confirm that dokter typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    return res.status(400).send("passwords dont match");
  }

  if (req.body.email &&
    req.body.nama &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = new Dokter({
      email: req.body.email,
      nama: req.body.nama,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    });

    userData.save().then((dokter) => {
      req.session.userId = dokter._id;
      return res.send(dokter)
    }). catch((e) => {
        res.send(e)
    });

  } else {
    res.status(400).send('All fields required.');
  }
})

// GET for logout logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  } else {
    res.statis(400).send('<h1>You are not logged in yet, you need to log in to log out</h1>')
    // next();
  }
});



  //
  // router.get('/search', authenticate, (req, res) => {
  //   var keyword = new RegExp(".*"+"kimba"+".*","i");
  //   console.log(keyword);
  //   Buku.find({"author": keyword}).then((books) => {
  //     res.render('search.hbs', { books });
  //   })
  //   .catch((e) => {
  //     res.render('search.hbs', { books });
  //   });
  // });

  module.exports = router;

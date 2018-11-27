//initialize library
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// local configuration
const {ObjectID} = require('mongodb');
const {mongoose} =  require('./db/mongoose');
var {Dokter} = require('./models/dokter');
var {Pasien} = require('./models/pasien');
var {Antrian} = require('./models/antrian');
// var {authenticate} = require('./middleware/authenticate');
var app = express();
const port = process.env.PORT || 3000;
var temp = null;

// route
const pasienRoute = require('./routes/pasien');
const dokterRoute = require('./routes/dokter');

//connect to MongoDB
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	// we're connected!
});

//use sessions for tracking logins
app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
}));

// return value is function
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//hbs initialization
hbs.registerPartials(path.join(__dirname, '../views/partials'));
hbs.registerHelper('getCurrentYear', () => {return new Date().getFullYear()});
hbs.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

// set view engine
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// server logger
app.use((req,res, next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	fs.appendFile('server.log', log, (err) => {
		if(err){
			console.log(`${now} : unable to append log`);
		}
	})
	next();
});

// public page

//home
app.get('/', (req, res) => {
  if(!temp){
    temp = '';
  }
  var keyword = new RegExp(".*"+temp+".*","i");
  Pasien.find({nama:keyword}).then((pasien) => {
    res.render('Daftar Pasien.hbs', {pasien});
  }).catch((e)=> {
    res.status(400).send(e);
  });
});

app.post('/', (req, res) => {
  temp = req.body.keyword;
  res.redirect('/');
});

app.post('/tambah-antrian/:id', (req, res) => {
  var id = req.params.id;
  var antrian = new Antrian({
    _idPasien: id,
    _idDokter: null,
    timeStamp: new Date(),
  })

  antrian.save().then((doc) => {
    console.log(doc);
  });
  // res.redirect('/');
});


// route
app.use('/dokter', dokterRoute);
app.use('/pasien', pasienRoute);


//ini apa ya?
app.get('/pendaftaran', (req, res) => {
	res.render('Pendaftaran.hbs');
});



app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

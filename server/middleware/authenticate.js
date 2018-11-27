var {Dokter} = require('./../models/dokter');
var authenticate = (req, res, next) => {
	Dokter.findById(req.session.userId)
	.then((dokter) => {
		req.namaAnggota = dokter.nama;
		next();
	}).catch((e) => {
		next();
		res.redirect('/dokter/login');
		res.status(401).send();
	});
}

module.exports = {authenticate};

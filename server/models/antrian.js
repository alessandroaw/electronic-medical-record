const mongoose = require('mongoose');

var AntrianSchema = new mongoose.Schema({
  _idPasien:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pasien',
    required: true
	},
  _idDokter:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dokter',
    // required: true
	},
  timeStamp: {
    type: Date,
    required: true
  },
  isServed: {
    type: Boolean,
    default: false
  }
});

var Antrian = mongoose.model('antrian', AntrianSchema);

module.exports = {Antrian};

const mongoose = require('mongoose');

var AntrianSchema = new mongoose.Schema({
  _idAnggota:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'anggota',
    required: true
	},
  _idBuku:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'buku',
    required: true
	},
  tanggalAntrian: {
    type: Date,
    required: true
  },
  tanggalPengembalian: {
    type: Date,
    default: null
  },
  isDikembalikan: {
    type: Boolean,
    default: false
  }
});

var Antrian = mongoose.model('antrian', AntrianSchema);

module.exports = {Antrian};

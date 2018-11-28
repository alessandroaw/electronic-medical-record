const mongoose = require('mongoose');

var MedicalRecordSchema = new mongoose.Schema({
  _idAnggota:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'anggota',
    required: true
	},
  _idDokter:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'dokter',
    required: true
  },
  rekamMedis: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    default: 10
  }
});

var MedicalRecord = mongoose.model('rekamMedis', MedicalRecordSchema);

module.exports = {MedicalRecord};

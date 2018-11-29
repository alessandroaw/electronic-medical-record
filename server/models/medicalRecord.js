const mongoose = require('mongoose');

var MedicalRecordSchema = new mongoose.Schema({
  _idPasien:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'pasien',
    required: true
	},
  _idDokter:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'dokter',
    required: true
  },
  subjektif: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  diagnosa: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  tindakan: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  medikasi: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  catatan: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  tanggalPemeriksaan: {
    type: Date,
    required: true
  }
});

var MedicalRecord = mongoose.model('medicalRecord', MedicalRecordSchema);

module.exports = {MedicalRecord};

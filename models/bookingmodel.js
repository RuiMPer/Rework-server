const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  time: String, //moment library dates JS !!!
  service: { type: Schema.Types.ObjectId, ref: 'Service' },
  client: { type: Schema.Types.ObjectId, ref: 'User' },
  confirmationStatus: Boolean, //autorização por parte do worker/cliente "true/false"
  logStatus: [String], //pago, presença do cliente, atraso do cliente -> SEPARAR?
  rating: Number //https://reviewapi3.docs.apiary.io/#reference/0/review-api
  //aggregate -> mongodb
  
})

const Booking = mongoose.model('Booking', taskSchema);

module.exports = Booking;
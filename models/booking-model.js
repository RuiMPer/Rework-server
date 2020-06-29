const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  Service: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  }
})

const Booking = mongoose.model('Booking', taskSchema);

module.exports = Booking;
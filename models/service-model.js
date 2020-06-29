const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  title: String,
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Booking'}]
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
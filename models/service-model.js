const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  title: String,
  description: String,
  category: [String], //categoria p/filtro - array de strings
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  photoPath: [{ type: String }], //cloudinary + multer
  photoName: String,
  company: { type: Schema.Types.ObjectId, ref: "Company" }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
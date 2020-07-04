const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const companySchema = new Schema({
  title: String,
  workers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  logoPath: String, //cloudinary
  logoName: String, // cloudinary
  locationPin: String, //google maps
  phone: String, 
  service: [{ type: Schema.Types.ObjectId, ref: 'Service' }], 
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  verified: Boolean
}, 
{
  timestamps: true
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
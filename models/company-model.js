const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const companySchema = new Schema({
  title: String,
  workers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  logo: String, //cloudinary
  logoName: String,
  locationPin: String, //google maps
  phone: String
}, 
{
  timestamps: true
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
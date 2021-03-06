const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  googleID: String,
  password: String,
  phone: String,
  type: String, //role: worker OR client OR admin
  company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
  birthday: Date,
  photoPath: String, //cloudinary
  photoName: String
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
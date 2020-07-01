const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  googleID: String,
  password: String,
  phone: Number,
  type: String, //role: worker OR client OR admin
  company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
  birthday: Date,
  photo: String, //cloudinary
  photoName: String
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
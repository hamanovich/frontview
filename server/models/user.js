import mongoose from 'mongoose';
import md5 from 'md5';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: 'Username field is required'
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Email field is required'
  },
  password_digest: {
    type: String,
    required: 'Password field is required'
  },
  first_name: String,
  last_name: String,
  primary_skill: String,
  job_function: String,
  skype: String,
  phone: String,
  notes: {
    type: String,
    default: 'Please add some notes about yourself'
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=100`;
});

export default mongoose.model('user', userSchema);
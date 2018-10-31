import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

const candidateSchema = new Schema(
  {
    firstName: {
      type: String,
      required: 'First name field is required',
    },
    lastName: {
      type: String,
      required: 'Last name field is required',
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: 'Email field is required',
    },
    primarySkill: {
      type: String,
      required: 'Primary Skill field is required',
    },
    techLevel: {
      type: String,
      required: 'Technical Level field is required',
    },
    notes: String,
    interviewer: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: 'You must supply an interviewer',
    },
    result: {
      type: String,
      default: '',
    },
  },
  {
    toJSON: { virtuals: true },
    toOjbect: { virtuals: true },
  },
);

function autopopulate(next) {
  this.populate('user');
  next();
}

candidateSchema.pre('find', autopopulate);

candidateSchema.plugin(uniqueValidator);

export default mongoose.model('candidate', candidateSchema);

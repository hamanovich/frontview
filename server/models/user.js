import mongoose from 'mongoose';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: 'Username field is required',
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: 'Email field is required',
    },
    passwordDigest: {
      type: String,
      required: 'Password field is required',
    },
    firstName: String,
    lastName: String,
    primarySkill: String,
    jobFunction: String,
    skype: String,
    phone: String,
    notes: {
      type: String,
      default: 'Please add some notes about yourself',
    },
    role: {
      type: String,
      enum: ['user', 'owner', 'admin'],
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    confirmed: {
      type: Boolean,
      default: false,
    },
    confirmationToken: String,
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'question',
        required: 'You must supply a question',
      },
    ],
    votes: {
      like: [
        {
          type: Schema.Types.ObjectId,
          ref: 'question',
        },
      ],
      dislike: [
        {
          type: Schema.Types.ObjectId,
          ref: 'question',
        },
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toOjbect: { virtuals: true },
  },
);

userSchema.methods.generateJWT = function uSchema1() {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      role: this.role,
    },
    process.env.SECRET,
  );
};

userSchema.virtual('gravatar').get(function uSchema2() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=100`;
});

userSchema.virtual('qlists', {
  ref: 'qlist',
  localField: '_id',
  foreignField: 'author',
});

userSchema.virtual('candidates', {
  ref: 'candidate',
  localField: '_id',
  foreignField: 'interviewer',
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('user', userSchema);

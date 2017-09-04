import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: 'You must supply an author'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'question',
    required: 'You must supply a question!'
  },
  topic: {
    type: String,
    required: 'Topic can not be an empty value.'
  },
  text: {
    type: String,
    required: 'Your comment must have text!'
  }
}, {
  toJSON: { virtuals: true },
  toOjbect: { virtuals: true }
});

function autopopulate(next) {
  this.populate('author');
  next();
}

commentSchema.pre('find', autopopulate);

module.exports = mongoose.model('comment', commentSchema);
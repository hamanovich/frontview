import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const qlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title can not be an empty value.'
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'question'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: 'You must supply an author'
  },
  notes: String
}, {
  toJSON: { virtuals: true },
  toOjbect: { virtuals: true }
});

function autopopulate(next) {
  this.populate('question user');
  next();
}

qlistSchema.pre('find', autopopulate);

module.exports = mongoose.model('qlist', qlistSchema);
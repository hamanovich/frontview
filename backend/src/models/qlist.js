import mongoose from 'mongoose';
import slug from 'slug';

const { Schema } = mongoose;

const qlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'Title can not be an empty value.',
    },
    slug: {
      type: String,
      lowercase: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'question',
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: 'You must supply an author',
    },
    notes: {
      type: String,
      required: 'Notes should be filled',
    },
  },
  {
    toJSON: { virtuals: true },
    toOjbect: { virtuals: true },
  },
);

qlistSchema.pre('save', async function qlistSchema(next) {
  this.slug = slug(this.title);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const qlistWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (qlistWithSlug.length) {
    this.slug = `${this.slug}-${qlistWithSlug.length + 1}`;
  }
  next();
});

function autopopulate(next) {
  this.populate('questions');
  next();
}

qlistSchema.pre('find', autopopulate);
qlistSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('qlist', qlistSchema);

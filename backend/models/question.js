import mongoose from 'mongoose';
import slug from 'slug';

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    question: {
      type: String,
      trim: true,
      required: 'Question field is required',
    },
    slug: {
      type: String,
      lowercase: true,
    },
    skill: [
      {
        type: String,
        enum: ['HTML', 'CSS', 'JS', 'Soft', 'Other'],
        required: 'Skill field is required',
      },
    ],
    level: [
      {
        type: String,
        enum: ['Junior', 'Middle', 'Senior', 'Lead', 'Chief', 'Not specified'],
        required: 'Level field is required',
      },
    ],
    practice: {
      type: String,
      enum: ['practice', 'theory'],
      required: 'Practice field is required',
    },
    answer: {
      type: String,
      trim: true,
      required: 'Answers field is required',
    },
    answers: [Schema.Types.Mixed],
    notes: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: 'You must supply an author',
    },
    created: {
      type: Date,
      default: Date.now,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
    votes: {
      like: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      dislike: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toOjbect: { virtuals: true },
  },
);

questionSchema.index({
  question: 'text',
  answer: 'text',
  answers: 'text',
});

questionSchema.pre('save', async function qSchema1(next) {
  this.slug = slug(this.question);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const questionWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (questionWithSlug.length) {
    this.slug = `${this.slug}-${questionWithSlug.length + 1}`;
  }
  next();
});

questionSchema.statics.getListByType = function qSchema2(type) {
  return this.aggregate([
    { $unwind: `$${type}` },
    { $group: { _id: `$${type}`, count: { $sum: 1 } } },
  ]);
};

questionSchema.statics.getTopQuestions = function qSchema3() {
  return this.aggregate([
    { $lookup: { from: 'users', localField: '_id', foreignField: 'votes.like', as: 'favourite' } },
    { $addFields: { size: { $size: { $ifNull: ['$favourite', []] } } } },
    { $sort: { size: -1 } },
  ]);
};

questionSchema.virtual('comments', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'question',
});

function autopopulate(next) {
  this.populate('author comments qlists');
  next();
}

questionSchema.pre('find', autopopulate);
questionSchema.pre('findOne', autopopulate);
questionSchema.pre('findByIdAndUpdate', autopopulate);

export default mongoose.model('question', questionSchema);

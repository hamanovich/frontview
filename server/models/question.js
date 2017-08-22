import mongoose from 'mongoose';
import slug from 'slug';

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    trim: true,
    required: 'Question field is required'
  },
  slug: String,
  skill: {
    type: [String],
    required: 'Skill field is required'
  },
  level: {
    type: [String],
    required: 'Level field is required'
  },
  practice: {
    type: Boolean,
    default: false,
    required: 'Practice field is required'
  },
  answer: {
    type: String,
    trim: true,
    required: 'Answers field is required'
  },
  answers: [Schema.Types.Mixed],
  notes: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: 'You must supply an author'
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  votes: {
    like: [Schema.Types.ObjectId],
    dislike: [Schema.Types.ObjectId]
  }
}, {
  toJSON: { virtuals: true },
  toOjbect: { virtuals: true }
});

questionSchema.index({
  question: 'text',
  answer: 'text'
});

questionSchema.pre('save', async function (next) {
  if (!this.isModified('question')) {
    next();
    return;
  }

  this.slug = slug(this.question);
  
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const questionsWithSlug = await this.constructor.find({ slug: slugRegEx });

  if (questionsWithSlug.length) {
    this.slug = `${this.slug}-${questionsWithSlug.length + 1}`;
  }

  next(); 
});

questionSchema.statics.getSkillList = function () {
  return this.aggregate([
    { $unwind: '$skill' },
    { $group: { _id: '$skill', count: { $sum: 1 } } }
  ]);
};

function autopopulate(next) {
  this.populate('author');
  next();
}

questionSchema.pre('find', autopopulate);
questionSchema.pre('findOne', autopopulate);
 

export default mongoose.model('question', questionSchema);

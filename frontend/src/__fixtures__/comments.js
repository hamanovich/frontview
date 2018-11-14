export const comment = {
  _id: 1,
  author: 'Fake user',
  question: '_fakeQuestionId',
  topic: 'Fake Topic',
  text: 'Fake Text',
  created: 'fake date',
};

export const comments = [comment, { ...comment, _id: 2 }];

import isEmpty from 'lodash/isEmpty';

export default (values) => {
  const errors = {};

  if (!values.question) {
    errors.question = 'Question field is required';
  }

  if (!values.skill) {
    errors.skill = 'Skill of question is required';
  }

  if (!values.level) {
    errors.level = 'Level of question is required';
  }

  if (!values.practice) {
    errors.practice = 'Practice field is required';
  }

  if (!values.answer) {
    errors.answer = 'At least one answer should be provided';
  }

  if (values.answers !== undefined) {
    const answersArrayErrors = [];

    values.answers.forEach((answer, answerIndex) => {
      const answerErrors = {};

      if (!answer || !answer.text) {
        answerErrors.text = 'Add answer or remove';
        answersArrayErrors[answerIndex] = answerErrors;
      }
    });

    if (answersArrayErrors.length) {
      errors.answers = answersArrayErrors;
    }
  }

  errors.isValid = isEmpty(errors);

  return errors;
};

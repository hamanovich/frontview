import { FormErrors } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

interface Answer {
  text: string;
}

interface Values {
  question: string;
  skill: string;
  level: string;
  practice: string;
  answer: string;
  answers: Answer[];
  isValid: boolean;
}

export default (values: Values): FormErrors => {
  const errors: Values = {
    question: '',
    skill: '',
    level: '',
    practice: '',
    answer: '',
    answers: [],
    isValid: false,
  };

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
    const answersArrayErrors: Answer[] = [];

    values.answers.forEach((answer: Answer, answerIndex: number) => {
      const answerErrors = {
        text: '',
      };

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

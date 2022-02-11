import { isNone } from '@ember/utils';
import { capitalize } from '@ember/string';
import { on } from '@ember/object/evented';
import EmberObject, { computed, observer } from '@ember/object';
import Controller from '@ember/controller';
import ENV from 'math-facts/config/environment';

const MAX_TIME_PER_QUESTION = ENV.APP.MAX_TIME_PER_QUESTION;

export default Controller.extend({
  queryParams: ['question'],
  question: 1,
  indexOfCurrentQuestion: computed('question', function () {
    return this.question - 1;
  }),
  currentQuestion: computed('interview', 'indexOfCurrentQuestion', function () {
    return this.get('interview.questions').objectAt(this.indexOfCurrentQuestion);
  }),
  updateTitle: on('init', observer('interview', 'question', 'currentQuestion', function () {
    document.title = `(${this.question}/${this.get('interview.questions.length')}) - ${capitalize(this.get('interview.id') || '')}`;
  })),
  interview: null,
  results: null,

  goToNextQuestion() {
    if (this.get('currentQuestion.isLastQuestion') || this.shouldStopInterview()) {
      this.endInterview();
    } else {
      this.set('question', this.question + 1);
    }
  },

  endInterview() {
    this.transitionToRoute(
      'interview.summary',
      this.get('interview.id'),
      this.results
    );
  },

  shouldStopInterview() {
    let indexOfLastAnsweredQuestion = this.findIndexOfLastAnsweredQuestion();
    if (indexOfLastAnsweredQuestion < 0) {
      return false;
    }

    let questions = this.get('interview.questions');
    let lastQuestion = questions[indexOfLastAnsweredQuestion];

    let numberOfIncorrectQuestionsInColumn = questions
      .filter((question, index) => {
        if (question.get('column') !== lastQuestion.get('column')) {
          return false;
        }

        let answer = this.get('results.answers').objectAt(index);
        if (isNone(answer)) {
          return false;
        }

        return (answer.get('isWrong') || answer.get('isOverTime'));
      })
      .reduce(sum => sum + 1, 0);

    return numberOfIncorrectQuestionsInColumn >= 3;
  },

  findIndexOfLastAnsweredQuestion() {
    let answers = this.get('results.answers');

    for (let i = answers.length - 1; i >= 0; i--) {
      let answer = answers[i];
      if (!isNone(answer) && answer.get('isAnswered')) {
        return i;
      }
    }

    return -1;
  },

  gradeResponseForQuestion(response, question) {
    let actualAnswer = question.get('answer');
    let answer = parseInt(response.get('value'), 10);

    return EmberObject.create({
      answer,
      isAnswered: true,
      isCorrect: (actualAnswer === answer),
      isWrong: (actualAnswer !== answer),
      isOverTime: this.isTooLong(response.get('time'))
    });
  },

  isTooLong(time) {
    let maxTimeAllowed = this.get('results.maxTimePerQuestionInMS');

    return time > maxTimeAllowed;
  },

  actions: {
    submitResponse(response) {
      let result = this.gradeResponseForQuestion(response, this.currentQuestion);

      this.get('results.answers').replace(
        this.indexOfCurrentQuestion,
        1,
        result);

      this.results.save().then(() => this.goToNextQuestion());
    },

    endInterview() {
      this.endInterview();
    }
  }
});

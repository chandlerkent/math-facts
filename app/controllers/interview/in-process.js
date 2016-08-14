import Ember from 'ember';

const MAX_TIME_ALLOWED = 3000;

export default Ember.Controller.extend({
  queryParams: ['question'],
  question: 1,
  indexOfCurrentQuestion: Ember.computed('question', function () {
    return this.get('question') - 1;
  }),
  currentQuestion: Ember.computed('interview', 'indexOfCurrentQuestion', function () {
    return this.get('interview.questions').objectAt(this.get('indexOfCurrentQuestion'));
  }),
  updateTitle: Ember.on('init', Ember.observer('interview', 'question', 'currentQuestion', function () {
    document.title = `(${this.get('question')}/${this.get('interview.questions.length')}) - ${Ember.String.capitalize(this.get('interview.id') || '')}`;
  })),
  interview: null,
  results: null,

  goToNextQuestion() {
    if (this.get('currentQuestion.isLastQuestion') || this.shouldStopInterview()) {
      this.endInterview();
    } else {
      this.set('question', this.get('question') + 1);
    }
  },

  endInterview() {
    this.transitionToRoute(
      'interview.summary',
      this.get('interview.id'),
      this.get('results')
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
        if (Ember.isNone(answer)) {
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
      if (!Ember.isNone(answer) && answer.get('isAnswered')) {
        return i;
      }
    }

    return -1;
  },

  gradeResponseForQuestion(response, question) {
    let actualAnswer = question.get('answer');
    let answer = parseInt(response.get('value'), 10);

    return Ember.Object.create({
      answer,
      isAnswered: true,
      isCorrect: (actualAnswer === answer),
      isWrong: (actualAnswer !== answer),
      isOverTime: this.isTooLong(response.get('time'))
    });
  },

  isTooLong(time) {
    return time > MAX_TIME_ALLOWED;
  },

  actions: {
    submitResponse(response) {
      let result = this.gradeResponseForQuestion(response, this.get('currentQuestion'));

      this.get('results.answers').replace(
        this.get('indexOfCurrentQuestion'),
        1,
        result);

      this.get('results').save().then(() => this.goToNextQuestion());
    },

    endInterview() {
      this.endInterview();
    }
  }
});

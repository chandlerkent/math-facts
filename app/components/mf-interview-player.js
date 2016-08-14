import Ember from 'ember';

export default Ember.Component.extend({
  results: null,
  interview: null,
  indexOfCurrentQuestion: 0,
  submitResponse: null,
  endInterview: null,
  currentQuestion: Ember.computed('interview', 'indexOfCurrentQuestion', function () {
    return this.get('interview.questions').objectAt(this.get('indexOfCurrentQuestion'));
  }),
  percentComplete: Ember.computed('interview', 'indexOfCurrentQuestion', function () {
    return this.get('indexOfCurrentQuestion') / this.get('interview.questions.length');
  })
});

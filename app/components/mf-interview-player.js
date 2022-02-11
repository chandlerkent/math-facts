import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  results: null,
  interview: null,
  indexOfCurrentQuestion: 0,
  submitResponse: null,
  endInterview: null,
  currentQuestion: computed('interview', 'indexOfCurrentQuestion', function () {
    return this.get('interview.questions').objectAt(this.get('indexOfCurrentQuestion'));
  }),
  percentComplete: computed('interview', 'indexOfCurrentQuestion', function () {
    return this.get('indexOfCurrentQuestion') / this.get('interview.questions.length');
  })
});

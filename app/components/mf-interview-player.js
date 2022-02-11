import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  results: null,
  interview: null,
  indexOfCurrentQuestion: 0,
  submitResponse: null,
  endInterview: null,
  currentQuestion: computed(
    'indexOfCurrentQuestion',
    'interview.questions',
    function () {
      return this.get('interview.questions').objectAt(
        this.indexOfCurrentQuestion
      );
    }
  ),
  percentComplete: computed(
    'indexOfCurrentQuestion',
    'interview.questions.length',
    function () {
      return (
        this.indexOfCurrentQuestion / this.get('interview.questions.length')
      );
    }
  ),
});

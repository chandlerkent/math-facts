import { isEmpty } from '@ember/utils';
import EmberObject, { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',
  classNames: ['mf-question'],
  question: null,
  timeAllowedInMS: null,
  value: null,
  endInterview: null,
  startTime: null,
  prompt: computed('question', 'question.prompt', function () {
    let prompt = this.get('question.prompt');
    
    if (!prompt) { return prompt; }
    
    return prompt.replace('/', '&divide;');
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('value', null);
    this.set('startTime', new Date());
  },

  submitResponse(interval) {
    console.log(this.get('timeAllowedInMS'));
    this.get('onSubmitResponse')(EmberObject.create({
      value: this.get('value'),
      time: interval
    }));
  },

  actions: {
    submitResponse(interval) {
      if (isEmpty(this.get('value'))) {
        this.set('value', this.get('question.answer'));
      }
      this.submitResponse(interval);
    }
  }
});

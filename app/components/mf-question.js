import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['mf-question'],
  question: null,
  value: null,
  endInterview: null,
  startTime: null,
  prompt: Ember.computed('question', 'question.prompt', function () {
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
    this.get('onSubmitResponse')(Ember.Object.create({
      value: this.get('value'),
      time: interval
    }));
  },

  actions: {
    submitResponse(interval) {
      if (Ember.isEmpty(this.get('value'))) {
        this.set('value', this.get('question.answer'));
      }
      this.submitResponse(interval);
    }
  }
});

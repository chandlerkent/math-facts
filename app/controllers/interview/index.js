import Ember from 'ember';

export default Ember.Controller.extend({
  model: null,
  studentName: null,

  actions: {
    startInterview() {
      let name = this.get('studentName');
      if (!name) {
        return;
      }

      let interviewResult = this.store.createRecord('interview-result', {
        name,
        interviewId: this.get('model.id'),
        answers: Ember.A(new Array(this.get('model.questions.length')))
      });

      interviewResult.save().then(() => {
        this.transitionToRoute('interview.in-process', interviewResult);
      });
    }
  }
});

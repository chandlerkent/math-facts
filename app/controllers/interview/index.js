import { A } from '@ember/array';
import Controller from '@ember/controller';

export default Controller.extend({
  model: null,
  studentName: null,
  isExtendedTime: false,

  actions: {
    startInterview() {
      let name = this.studentName;
      if (!name) {
        return;
      }

      let interviewResult = this.store.createRecord('interview-result', {
        name,
        isExtendedTime: this.isExtendedTime,
        interviewId: this.get('model.id'),
        answers: A(new Array(this.get('model.questions.length')))
      });

      interviewResult.save().then(() => {
        this.transitionToRoute('interview.in-process', interviewResult);
      });
    }
  }
});

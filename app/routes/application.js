import Ember from 'ember';
import { INTERVIEWS } from '../models/interview';

export default Ember.Route.extend({
  beforeModel() {
    let data = INTERVIEWS.map(interview => {
      interview.attributes.questions = interview.attributes.questions
        .map(question => Ember.Object.create(question))
        .map((question, index) => {
          question.set('isLastQuestion', index === interview.attributes.questions.length - 1);
          question.set('response', Ember.Object.create({ response: null, time: 0, isAnswered: false }));
          question.set('id', index + 1);

          return question;
        });

      return interview;
    });

    this.cleanUpOldRecords(10);

    this.get('store').push({ data });
  },
  
  cleanUpOldRecords(keepNumberOfRecords) {
    return this.get('store').findAll('interview-result')
      .then(results => results.sortBy('takenAt').reverse())
      .then(sortedResults => sortedResults.filter((r, index) => index >= keepNumberOfRecords))
      .then(oldestTenResults => oldestTenResults.map(r => r.destroyRecord()))
      .then(deletionPromises => {
        Ember.Logger.debug('Removed records: ', deletionPromises.length);
        return deletionPromises;
      })
      .then(promises => Ember.RSVP.all(promises));
  }
});

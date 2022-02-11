import { all } from 'rsvp';
import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import { INTERVIEWS } from '../models/interview';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;

  beforeModel() {
    let data = INTERVIEWS.map((interview) => {
      interview.attributes.questions = interview.attributes.questions
        .map((question) => EmberObject.create(question))
        .map((question, index) => {
          question.set(
            'isLastQuestion',
            index === interview.attributes.questions.length - 1
          );
          question.set(
            'response',
            EmberObject.create({ response: null, time: 0, isAnswered: false })
          );
          question.set('id', index + 1);

          return question;
        });

      return interview;
    });

    this.cleanUpOldRecords(10);

    this.store.push({ data });
  }

  cleanUpOldRecords(keepNumberOfRecords) {
    return this.store
      .findAll('interview-result')
      .then((results) => results.sortBy('takenAt').reverse())
      .then((sortedResults) =>
        sortedResults.filter((r, index) => index >= keepNumberOfRecords)
      )
      .then((oldestTenResults) =>
        oldestTenResults.map((r) => r.destroyRecord())
      )
      .then((deletionPromises) => {
        console.debug('Removed records: ', deletionPromises.length);
        return deletionPromises;
      })
      .then((promises) => all(promises));
  }
}

import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import ENV from 'math-facts/config/environment';

const MAX_TIME_PER_QUESTION = ENV.APP.MAX_TIME_PER_QUESTION;

export default Model.extend({
  takenAt: attr('date', {
    defaultValue() { return new Date(); }
  }),
  name: attr('string'),
  interviewId: attr('string'),
  isExtendedTime: attr('boolean'),
  maxTimePerQuestionInMS: computed('isExtendedTime', function() {
    let isExtendedTime = this.get('isExtendedTime');
    if (isExtendedTime === undefined || isExtendedTime === null) {
      isExtendedTime = false;
    }

    return (isExtendedTime ? MAX_TIME_PER_QUESTION.EXTENDED : MAX_TIME_PER_QUESTION.DEFAULT);
  }),
  answers: attr('as-object')
});

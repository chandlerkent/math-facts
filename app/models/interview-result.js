import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  takenAt: attr('date', {
    defaultValue() { return new Date(); }
  }),
  name: attr('string'),
  interviewId: attr('string'),
  answers: attr('as-object')
});

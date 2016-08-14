import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import additionB from './interviews/addition-b';
import subtractionB from './interviews/subtraction-b';
import multiplicationB from './interviews/multiplication-b';
import divisionB from './interviews/division-b';

export const INTERVIEWS = [
  additionB,
  subtractionB,
  multiplicationB,
  divisionB
];

export default Model.extend({
  questions: attr(),
  operator: attr('string')
});

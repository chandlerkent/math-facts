import EmberObject from '@ember/object';
import { isArray } from '@ember/array';
import Transform from 'ember-data/transform';

export default Transform.extend({
  deserialize(serialized) {
    if (isArray(serialized)) {
      return serialized.map(o => EmberObject.create(o));
    }
    return EmberObject.create(serialized);
  },

  serialize(deserialized) {
    return deserialized;
  }
});

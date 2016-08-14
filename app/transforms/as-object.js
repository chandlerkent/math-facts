import Transform from 'ember-data/transform';
import Ember from 'ember';

export default Transform.extend({
  deserialize(serialized) {
    if (Ember.isArray(serialized)) {
      return serialized.map(o => Ember.Object.create(o));
    }
    return Ember.Object.create(serialized);
  },

  serialize(deserialized) {
    return deserialized;
  }
});

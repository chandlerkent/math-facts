import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);

    controller.set('studentName', null);

    document.title = Ember.String.capitalize(model.get('id') + ' Interview');
  }
});

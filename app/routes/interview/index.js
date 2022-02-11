import { capitalize } from '@ember/string';
import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);

    controller.set('studentName', null);

    document.title = capitalize(model.get('id') + ' Interview');
  }
});

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class InProcessInterviewRoute extends Route {
  @service store;

  queryParams = {
    question: {
      replace: true
    }
  }

  model(params) {
    return this.store.find('interview-result', params.result_id);
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    controller.set('interview', this.modelFor('interview'));
    controller.set('results', model);
  }
};

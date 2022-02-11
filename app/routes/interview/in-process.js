import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    question: {
      replace: true
    }
  },

  model(params) {
    return this.store.find('interview-result', params.result_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('interview', this.modelFor('interview'));
    controller.set('results', model);
  }
});

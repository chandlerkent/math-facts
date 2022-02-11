import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.peekRecord('interview', params.interview_id);
  }
});

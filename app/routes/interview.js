import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class InterviewRoute extends Route {
  @service store;

  model(params) {
    return this.store.peekRecord('interview', params.interview_id);
  }
}

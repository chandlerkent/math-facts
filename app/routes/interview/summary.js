import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  chartGenerator: service(),

  model(params) {
    let results = this.store.find('interview-result', params.result_id);

    return results;
  },

  setupController(controller, model) {
    this._super(controller, model);

    let interview = this.modelFor('interview');
    let chart = this.get('chartGenerator').createChartForInterviewAndResults(interview, model);

    controller.set('chart', chart);
    controller.set('results', model);

    document.title = `${model.get('name')} - ${capitalize(interview.get('id'))} - ${moment(model.get('takenAt')).format('MM-DD-YYYY')}`;
  }
});

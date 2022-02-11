import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('interview', { path: '/interview/:interview_id' }, function () {
    this.route('in-process', { path: '/in-process/:result_id' });
    this.route('summary', { path: '/summary/:result_id' });
  });
});

export default Router;

import EmberRouter from '@ember/routing/router';
import config from 'math-facts/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('interview', { path: '/interview/:interview_id' }, function () {
    this.route('in-process', { path: '/in-process/:result_id' });
    this.route('summary', { path: '/summary/:result_id' });
  });
});

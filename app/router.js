import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
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

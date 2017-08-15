import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['mf-colorize-interval'],
  classNameBindings: ['color'],
  maxTimeInMilliseconds: null,
  interval: null,

  color: Ember.computed('interval', function () {
    let interval = this.get('interval');
    let maxTimeInMilliseconds = parseInt(this.get('maxTimeInMilliseconds'), 10);

    if (interval < maxTimeInMilliseconds) { return ''; }

    return 'error';
  })
});

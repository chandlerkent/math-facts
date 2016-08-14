import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['mf-colorize-interval'],
  classNameBindings: ['color'],
  interval: null,

  color: Ember.computed('interval', function () {
    let interval = this.get('interval');

    if (interval < 3) { return ''; }

    // if (interval < 5) { return 'warn'; }

    return 'error';
  })
});

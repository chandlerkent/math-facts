import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',
  classNames: ['mf-colorize-interval'],
  classNameBindings: ['color'],
  maxTimeInMilliseconds: null,
  interval: null,

  color: computed('interval', 'maxTimeInMilliseconds', function () {
    let interval = this.interval;
    let maxTimeInMilliseconds = parseInt(this.maxTimeInMilliseconds, 10);

    if (interval < maxTimeInMilliseconds) {
      return '';
    }

    return 'error';
  }),
});

import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',
  classNames: ['mf-colorize-interval'],
  classNameBindings: ['color'],
  maxTimeInMilliseconds: null,
  interval: null,

  color: computed('interval', function () {
    let interval = this.get('interval');
    let maxTimeInMilliseconds = parseInt(this.get('maxTimeInMilliseconds'), 10);

    if (interval < maxTimeInMilliseconds) { return ''; }

    return 'error';
  })
});

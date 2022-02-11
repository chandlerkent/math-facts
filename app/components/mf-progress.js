import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',
  classNames: ['mf-progress'],
  percentComplete: 0.0,

  widthStyle: computed('percentComplete', function () {
    return htmlSafe('width: ' + parseFloat(this.percentComplete) * 100 + '%');
  }),
});

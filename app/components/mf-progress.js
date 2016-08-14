import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['mf-progress'],
  percentComplete: 0.0,

  widthStyle: Ember.computed('percentComplete', function () {
    return Ember.String.htmlSafe('width: ' + parseFloat(this.get('percentComplete')) * 100 + '%');
  })
});

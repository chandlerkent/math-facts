import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',
  value: null,

  actions: {
    onKeyDown(_, evt) {
      // Only allow numbers up to 9 (57).
      // Everything below the numbers are just special keys that should also
      // be allowed (like arrow keys, delete, etc.). Except for 32, which is
      // the space key.
      if (evt.which > 57 || evt.which === 32) {
        evt.preventDefault();
      }
    },

    onEnter() {
      this.enter();
    },

    refocus() {
      this.$('input').focus();
    }
  }
});

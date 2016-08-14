import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mf-colorize-interval', 'Integration | Component | mf colorize interval', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mf-colorize-interval}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mf-colorize-interval}}
      template block text
    {{/mf-colorize-interval}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

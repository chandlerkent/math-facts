import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('j-interview-instructions', 'Integration | Component | j interview instructions', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{j-interview-instructions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#j-interview-instructions}}
      template block text
    {{/j-interview-instructions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

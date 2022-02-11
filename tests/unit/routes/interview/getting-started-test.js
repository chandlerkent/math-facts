import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | interview/getting started', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:interview/getting-started');
    assert.ok(route);
  });
});

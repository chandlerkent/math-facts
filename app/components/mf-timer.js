import Ember from 'ember';

export default Ember.Component.extend({
  intervals: [],
  timerId: null,
  interval: null,
  isCounting: true,
  startTime: null,

  didReceiveAttrs() {
    this._super(...arguments);
    this.startTimer();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.stopTimer();
  },

  startTimer() {
    this.set('interval', 0);
    this.set('intervals', []);
    this.stopTimer();
    if (!this.get('isCounting')) {
      this.set('isCounting', true);
    } else {
      this.startCounting();
    }
  },

  onIsCountingChanged: Ember.observer('isCounting', function () {
    if (this.get('isCounting')) {
      this.startCounting();
    } else {
      this.stopCounting();
    }
  }),

  startCounting() {
    this.get('intervals').addObject(Ember.Object.create({
      startTime: new Date(),
      endTime: null
    }));
    this.updateInterval();
  },

  stopCounting() {
    this.set('intervals.lastObject.endTime', new Date());
    this.stopTimer();
  },

  updateInterval() {
    this.set('interval', this.computeInterval());
    this.set('timerId', Ember.run.later(this, this.updateInterval, 77));
  },

  computeInterval() {
    return this.get('intervals')
      .map(interval => {
        return (interval.get('endTime') || new Date()) - interval.get('startTime');
      })
      .reduce((sum, interval) => {
        return sum + interval;
      }, 0);
  },

  stopTimer() {
    var timerId = this.get('timerId');
    if (timerId) {
      Ember.run.cancel(timerId);
      this.set('timerId', null);
    }
  },

  actions: {
    playPause() {
      this.toggleProperty('isCounting');
    }
  }
});

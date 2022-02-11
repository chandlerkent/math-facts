import { later, cancel } from '@ember/runloop';
import EmberObject, { observer } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
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
    if (!this.isCounting) {
      this.set('isCounting', true);
    } else {
      this.startCounting();
    }
  },

  onIsCountingChanged: observer('isCounting', function () {
    if (this.isCounting) {
      this.startCounting();
    } else {
      this.stopCounting();
    }
  }),

  startCounting() {
    this.intervals.addObject(EmberObject.create({
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
    this.set('timerId', later(this, this.updateInterval, 77));
  },

  computeInterval() {
    return this.intervals
      .map(interval => {
        return (interval.get('endTime') || new Date()) - interval.get('startTime');
      })
      .reduce((sum, interval) => {
        return sum + interval;
      }, 0);
  },

  stopTimer() {
    var timerId = this.timerId;
    if (timerId) {
      cancel(timerId);
      this.set('timerId', null);
    }
  },

  actions: {
    playPause() {
      this.toggleProperty('isCounting');
    }
  }
});

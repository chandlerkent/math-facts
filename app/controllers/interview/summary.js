import Controller from '@ember/controller';

export default Controller.extend({
  chart: null,
  results: null,

  actions: {
    clickCell(row, column) {
      let chart = this.chart;

      let cell = chart[row][column];

      if (!cell.get('isInteractive')) {
        return;
      }

      cell.toggleProperty('isOverridden');
    },

    clickColumn(column) {
      let chart = this.chart;

      let active;
      for (let i = 0; i < chart.length; i++) {
        let cell = chart[i][column];
        if (!cell.get('isInteractive')) {
          continue;
        }

        if (active === undefined) {
          active = !!!cell.get('isOverridden');
        }

        cell.set('isOverridden', active);
      }
    },

    clickRow(row) {
      let chart = this.chart;

      let columns = chart[0].length;
      let active;
      for (let i = 0; i < columns; i++) {
        let cell = chart[row][i];
        if (!cell.get('isInteractive')) {
          continue;
        }

        if (active === undefined) {
          active = !!!cell.get('isOverridden');
        }

        cell.set('isOverridden', active);
      }
    },

    toggleAll() {
      let chart = this.chart;

      let rows = chart.length;
      let active;
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < chart[row].length; column++) {
          let cell = chart[row][column];
          if (!cell.get('isInteractive')) {
            continue;
          }

          if (active === undefined) {
            active = !!!cell.get('isOverridden');
          }

          cell.set('isOverridden', active);
        }
      }
    }
  }
});

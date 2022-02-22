import Ember from "ember";

export default Ember.Controller.extend({
  chart: null,
  results: null,
  printMasteredFacts: false,

  actions: {
    clickCell(row, column) {
      let chart = this.get("chart");

      let cell = chart[row][column];

      if (!cell.get("isInteractive")) {
        return;
      }

      cell.toggleProperty("isOverridden");
    },

    clickColumn(column) {
      let chart = this.get("chart");

      let active;
      for (let i = 0; i < chart.length; i++) {
        let cell = chart[i][column];
        if (!cell.get("isInteractive")) {
          continue;
        }

        if (active === undefined) {
          active = !!!cell.get("isOverridden");
        }

        cell.set("isOverridden", active);
      }
    },

    clickRow(row) {
      let chart = this.get("chart");

      let columns = chart[0].length;
      let active;
      for (let i = 0; i < columns; i++) {
        let cell = chart[row][i];
        if (!cell.get("isInteractive")) {
          continue;
        }

        if (active === undefined) {
          active = !!!cell.get("isOverridden");
        }

        cell.set("isOverridden", active);
      }
    },

    toggleAll() {
      let chart = this.get("chart");

      let rows = chart.length;
      let active;
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < chart[row].length; column++) {
          let cell = chart[row][column];
          if (!cell.get("isInteractive")) {
            continue;
          }

          if (active === undefined) {
            active = !!!cell.get("isOverridden");
          }

          cell.set("isOverridden", active);
        }
      }
    },

    print(event) {
      event.preventDefault();

      window.print();
    },
  },
});

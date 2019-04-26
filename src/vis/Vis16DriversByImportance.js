
import * as d3 from 'd3';
import DriverCircle from './components/DriverCircle';

const SCORE_MIN = -100,
      SCORE_MAX = 100;

const IMPORTANCE_MIN = 0,
      IMPORTANCE_MAX = 3;

const DRIVERS = [
  [ "as", "at", "di", "em" ],
  [ "mo", "pe", "pu", "rl" ],
  [ "aw", "co", "ea", "in" ],
  [ "po", "re", "tr", "va" ]
];

export default class Vis16DriversByImportance {

  constructor(selector, data) {

    this.selector = selector;
    this.data     = data;
    this.values   = { };

    this.initVis();
    this.initInputs();

    this.reset();

  }

  initVis() {

    this.circles = { };

    DRIVERS.forEach((quad, qi) => quad.forEach((id, di) => {

      let selector = `${this.selector} .wrap-vis svg g`,
          col      = (di % 2) + (2 * (qi % 2)),
          row      = Math.floor(di / 2) + (2 * Math.floor(qi / 2));

      this.circles[id] = new DriverCircle(id, selector, col, row);

    }));

  }
  initInputs() {

    this.$resetBtn = $(`${this.selector} .wrap-input button.reset`);
    this.$resetBtn
      .on('click', () => this.reset());

    this.$inputsScore      = $(`${this.selector} .wrap-input table.drivers-by-importance td.score input`),
    this.$inputsImportance = $(`${this.selector} .wrap-input table.drivers-by-importance td.importance input`);

    this.$inputsScore
      .attr('min', SCORE_MIN)
      .attr('max', SCORE_MAX)
      .on('input', ({ target }) => {

        let $trgt = $(target),
            id    = $trgt.closest('tr').attr('class'),
            val   = +$trgt.val();

        this.setDriverScore(id, val);

      });

    this.$inputsImportance
      .attr('min', IMPORTANCE_MIN)
      .attr('max', IMPORTANCE_MAX)
      .on('input', ({ target }) => {

        let $trgt        = $(target),
            id           = $trgt.closest('tr').attr('class'),
            val          = +$trgt.val();

        this.setDriverImportance(id, val);

      });

  }

  reset() {

    const brandElem = this.data.client.bxpElements.find((elem) => !elem.has_delta),
          drivers   = brandElem.ppElements.reduce((acc, ppElem) => ([
            ...acc,
            ...ppElem.drivers
          ]), []);

    drivers.forEach((driver) => {
      let id = driver.id;
      this.values[id] = {
        score: driver.score,
        importance: driver.selfie_rank // driver.comparison_rank
      }
    });

    this.update();

  }

  setDriverScore(id, val) {
    this.values[id].score = val;
    this.update();
  }
  setDriverImportance(id, val) {
    this.values[id].importance = val;
    this.update();
  }

  update() {

    DRIVERS.forEach((quad) => {

      let scoreSorted = quad.slice().map((id) => ({
        id: id,
        sortBy: this.values[id].score
      })).sort((a, b) => (a.sortBy - b.sortBy));

      scoreSorted.forEach((driver, i) => {

        let id         = driver.id,
            circle     = this.circles[id],
            score      = this.values[id].score,
            importance = this.values[id].importance;

        circle.updateColor(i / 3);
        circle.updateSize((importance + 1) / 4);

        let $inputsScore      = $(`${this.selector} .wrap-input table.drivers-by-importance tr.${id} td.score input`),
            $inputsImportance = $(`${this.selector} .wrap-input table.drivers-by-importance tr.${id} td.importance input`);

        $inputsScore.val(score);
        $inputsImportance.val(importance);

      });

    });

  }

}

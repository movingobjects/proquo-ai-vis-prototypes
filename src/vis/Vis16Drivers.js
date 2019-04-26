
import * as d3 from 'd3';
import DriverCircle from './components/DriverCircle';

const SCORE_MIN = -100,
      SCORE_MAX = 100;

const DRIVERS = [
  [ "as", "at", "di", "em" ],
  [ "mo", "pe", "pu", "rl" ],
  [ "aw", "co", "ea", "in" ],
  [ "po", "re", "tr", "va" ]
];

export default class Vis16Drivers {

  constructor(selector, data) {

    this.selector = selector;
    this.data     = data;
    this.values   = { };
    this.circles  = this.initCircles();

    this.initInputs();

    this.reset();

  }

  initCircles() {

    const selector = `${this.selector} .wrap-vis svg g`,
          circles = { }

    DRIVERS.forEach((quad, qi) => quad.forEach((id, di) => {

      let col = (di % 2) + (2 * (qi % 2)),
          row = Math.floor(di / 2) + (2 * Math.floor(qi / 2));

      circles[id] = new DriverCircle(id, selector, col, row);

    }));

    return circles;

  }
  initInputs() {

    this.$resetBtn = $(`${this.selector} .wrap-input button.reset`);
    this.$resetBtn
      .on('click', () => this.reset());

    this.$inputs = $(`${this.selector} .wrap-input table.drivers input`);
    this.$inputs
      .attr('min', SCORE_MIN)
      .attr('max', SCORE_MAX)
      .on('input', ({ target }) => {

        let $trgt = $(target),
            id    = $trgt.closest('tr').attr('class'),
            val   = $trgt.val();

        this.setDriverScore(id, val);

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
        score: driver.score
      }
    });

    this.update();

  }

  setDriverScore(id, val) {
    this.values[id].score = val;
    this.update();
  }

  update() {

    DRIVERS.forEach((quad) => {

      let ranked = quad.slice().map((id) => ({
        id: id,
        score: this.values[id].score
      })).sort((a, b) => (a.score - b.score));

      ranked.forEach((driver, i) => {

        this.circles[driver.id].updateColor(i / 3);

        let $inputs = $(`${this.selector} .wrap-input table.drivers tr.${driver.id} input`);
            $inputs.val(driver.score);

      });

    });

  }

}

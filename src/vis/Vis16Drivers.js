
import * as d3 from 'd3';
import DriverCircle from './components/DriverCircle';

const SCORE_MIN = -100,
      SCORE_MAX = 100;

const DRIVER_IDS = [
  "as", "at", "di", "em",
  "mo", "pe", "pu", "rl",
  "aw", "co", "ea", "in",
  "po", "re", "tr", "va"
];

export default class Vis16Drivers {

  constructor(selector, data) {

    this.selector = selector;
    this.data     = data;
    this.values   = { };

    this.initVis();
    this.reset();

    this.initInputs();

  }

  initVis() {

    const selector = `${this.selector} .wrap-vis svg circle`;

    this.circles = { };

    DRIVER_IDS.forEach((id, i) => {

      let col = i % 4,
          row = Math.floor(i / 4);

      this.circles[id] = new DriverCircle(`${selector}.${id}`, col, row);

    });

  }
  initInputs() {

    this.$resetBtn = $(`${this.selector} .wrap-input button.reset`);

    this.$resetBtn
      .on('click', () => this.reset());

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

    const scoreToPerc = d3.scaleLinear()
      .domain([ SCORE_MIN, SCORE_MAX ])
      .range([ 0, 1 ]);

    DRIVER_IDS.forEach((id, i) => {

      let percColor = scoreToPerc(this.values[id].score);

      this.circles[id].updateColor(percColor);

    })

  }

}

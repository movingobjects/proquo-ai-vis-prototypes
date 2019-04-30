
import * as d3 from 'd3';
import ThermostatDiff from './components/ThermostatDiff';

const SCORE_MIN = -100,
      SCORE_MAX = 100;

const DRIVERS = [
  [ "as", "at", "di", "em" ],
  [ "mo", "pe", "pu", "rl" ],
  [ "aw", "co", "ea", "in" ],
  [ "po", "re", "tr", "va" ]
];

export default class Vis16DriversVsCategAvg {

  constructor(selector, data) {

    this.selector    = selector;
    this.data        = data;
    this.values      = { };
    this.thermostats = this.initThermostats();

    this.initInputs();

    this.reset();

  }

  initThermostats() {

    const selector    = `${this.selector} .wrap-vis svg g`,
          thermostats = { }

    DRIVERS.forEach((quad, qi) => quad.forEach((id, di) => {

      let index = (qi * 4) + di,
          x     = 100 + (index * 35);

      thermostats[id] = new ThermostatDiff(id, selector, x);

    }));

    return thermostats;

  }
  initInputs() {

    this.$resetBtn = $(`${this.selector} .wrap-input button.reset`);
    this.$resetBtn
      .on('click', () => this.reset());

    this.$inputsScore    = $(`${this.selector} .wrap-input table.drivers td.score input`),
    this.$inputsCategAvg = $(`${this.selector} .wrap-input table.drivers td.categ-avg input`);

    this.$inputsScore
      .attr('min', SCORE_MIN)
      .attr('max', SCORE_MAX)
      .on('input', ({ target }) => {

        let $trgt = $(target),
            id    = $trgt.closest('tr').attr('class'),
            val   = +$trgt.val();

        this.setDriverScore(id, val);

      });

    this.$inputsCategAvg
      .attr('min', SCORE_MIN)
      .attr('max', SCORE_MAX)
      .on('input', ({ target }) => {

        let $trgt        = $(target),
            id           = $trgt.closest('tr').attr('class'),
            val          = +$trgt.val();

        this.setDriverCategAvg(id, val);

      });

  }

  reset() {

    const brandElem    = this.data.client.bxpElements.find((elem) => !elem.has_delta),
          brandDrivers = brandElem.ppElements.reduce((acc, ppElem) => ([
            ...acc,
            ...ppElem.drivers
          ]), []);

    brandDrivers.forEach((driver) => {
      this.values[driver.id] = { score: driver.score }
    });

    const categAvgElem    = this.data.compAvg.bxpElements.find((elem) => !elem.has_delta),
          categAvgDrivers = categAvgElem.ppElements.reduce((acc, ppElem) => ([
            ...acc,
            ...ppElem.drivers
          ]), []);

    categAvgDrivers.forEach((driver) => {
      this.values[driver.id].categAvg = driver.score;
    });

    this.update();

  }

  setDriverScore(id, val) {
    this.values[id].score = val;
    this.update();
  }
  setDriverCategAvg(id, val) {
    this.values[id].categAvg = val;
    this.update();
  }

  update() {

    let maxDiff = 0,
        diffs   = { };

    Object.keys(this.values).forEach((id) => {

      let score    = this.values[id].score,
          categAvg = this.values[id].categAvg,
          diff     = score - categAvg;

      diffs[id] = diff;
      maxDiff   = Math.max(maxDiff, Math.abs(diff));

      let $inputsScore    = $(`${this.selector} .wrap-input table.drivers tr.${id} td.score input`),
          $inputsCategAvg = $(`${this.selector} .wrap-input table.drivers tr.${id} td.categ-avg input`);

      $inputsScore.val(score);
      $inputsCategAvg.val(categAvg);

    });

    const diffToPerc = d3.scaleLinear()
      .domain([ -maxDiff, maxDiff ])
      .range([ -1, 1 ]);


    Object.keys(diffs).forEach((id) => {

      let diff = diffs[id],
          perc = diffToPerc(diff);

      this.thermostats[id].update(perc);

    })

  }

}

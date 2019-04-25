
import * as d3 from 'd3';
import Thermostat from './components/Thermostat';

import SAMPLE_DATA_SUMMARY from '../data/sample_SubscriptSummary.json';

const BXP_MIN = -2000,
      BXP_MAX = 2000;

export default class BxpVsCompetition {

  constructor(selector) {

    this.selector   = selector;

    this.thermostats = [
      new Thermostat(`${selector} .wrap-vis svg g:nth-child(1)`),
      new Thermostat(`${selector} .wrap-vis svg g:nth-child(2)`),
      new Thermostat(`${selector} .wrap-vis svg g:nth-child(3)`)
    ];

    this.initInputs();
    this.reset();

  }

  initInputs() {

    this.$resetBtn = $(`${this.selector} .wrap-input button.reset`);
    this.$inputs   = $(`${this.selector} .wrap-input input`);

    this.$resetBtn
      .on('click', () => this.reset());

    this.$inputs
      .attr('min', BXP_MIN)
      .attr('max', BXP_MAX)
      .on('input', ({ target }) => {

        let $trgt      = $(target),
            brandIndex = $trgt.closest('li').index(),
            val        = $trgt.val();

        this.update(brandIndex, val);

      });

  }

  reset() {
    this.thermostats.forEach((thermostat, i) => {
      this.update(i, this.getDataBxp(i));
    })
  }

  getDataBxp(brandIndex) {

    const client    = (brandIndex === 0) ? SAMPLE_DATA_SUMMARY.client : SAMPLE_DATA_SUMMARY.compList[brandIndex - 1],
          bxpElem   = client.bxpElements.find((elem) => !elem.has_delta);

    return bxpElem ? bxpElem.score : 0;

  }

  update(brandIndex, val) {

    const toPerc = d3.scaleLinear()
      .domain([ BXP_MIN, BXP_MAX ])
      .range([ 0, 1 ]);

    const thermostat = this.thermostats[brandIndex];
          thermostat.update(toPerc(val));

    this.updateInputs(brandIndex, val);

  }

  updateInputs(brandIndex, val) {

    const $inputs = $(`${this.selector} .wrap-input ul.brands li:nth-child(${brandIndex + 1}) input`);

    $inputs.val(val);

  }

}

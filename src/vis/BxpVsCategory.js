
import * as d3 from 'd3';
import Thermostat from './components/Thermostat';

import SAMPLE_DATA_SUMMARY from '../data/sample_SubscriptSummary.json';

const BXP_MIN = -2000,
      BXP_MAX = 2000;

export default class BxpVsCategory {

  constructor(selector) {

    this.selector   = selector;

    this.thermostat = new Thermostat(`${selector} .wrap-vis svg g`);

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

        let $trgt = $(target),
            index = $trgt.closest('li').index(),
            val   = $trgt.val();

        if (index === 0) {
          this.setBxp(val);
        } else {
          this.setCategoryBxp(val);
        }

      });

  }

  reset() {

    this.setBxp(this.getDataBxp(0));
    this.setCategoryBxp(this.getDataBxp(1));

  }

  getDataBxp(index) {

    const data    = SAMPLE_DATA_SUMMARY,
          client  = (index === 0) ? data.client : data.category,
          bxpElem = client.bxpElements.find((elem) => !elem.has_delta);

    return bxpElem ? bxpElem.score : 0;

  }

  setBxp(val) {

    const toPerc = d3.scaleLinear()
      .domain([ BXP_MIN, BXP_MAX ])
      .range([ 0, 1 ]);

    this.thermostat.update(toPerc(val));

    const $inputs = $(`${this.selector} .wrap-input ul.brands li:nth-child(1) input`);
    $inputs.val(val);

  }
  setCategoryBxp(val) {

    const toPerc = d3.scaleLinear()
      .domain([ BXP_MIN, BXP_MAX ])
      .range([ 0, 1 ]);

      const $inputs = $(`${this.selector} .wrap-input ul.brands li:nth-child(2) input`);
      $inputs.val(val);

  }

}

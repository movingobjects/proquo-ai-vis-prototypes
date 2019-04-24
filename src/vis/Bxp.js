
import * as d3 from 'd3';
import Thermostat from './components/Thermostat';

import SAMPLE_DATA_SUMMARY from '../data/sample_SubscriptSummary.json';

const BXP_MIN = -2000,
      BXP_MAX = 2000;

export default class Bxp {

  constructor(selector) {

    this.selector   = selector;
    this.thermostat = new Thermostat(`${this.selector} .wrap-vis svg`);

    this.initView();
    this.reset();

  }

  initView() {

    this.$resetBtn = $(`${this.selector} .wrap-input button.reset`);
    this.$inputs   = $(`${this.selector} .wrap-input input`);

    this.$resetBtn
      .on('click', () => this.reset());

    this.$inputs
      .attr('min', BXP_MIN)
      .attr('max', BXP_MAX)
      .on('input', ({ target }) => {
        this.update($(target).val())
      });

  }

  reset() {
    this.update(this.dataBxp);
  }

  get dataBxp() {

    const bxpElem = SAMPLE_DATA_SUMMARY.client.bxpElements.find((elem) => !elem.has_delta);

    return bxpElem ? bxpElem.score : 0;

  }

  update(val) {

    const toPerc = d3.scaleLinear()
      .domain([ BXP_MIN, BXP_MAX ])
      .range([ 0, 1 ]);

    this.thermostat.update(toPerc(val));
    this.$inputs.val(val);

  }

}

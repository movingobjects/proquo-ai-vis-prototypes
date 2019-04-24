
import * as d3 from 'd3';
import ThermostatSplit from './components/ThermostatSplit';

import SAMPLE_DATA_SUMMARY from '../data/sample_SubscriptSummary.json';

const SPLIT_MIN = -1000,
      SPLIT_MAX = 1000;

export default class BxpSplit {

  constructor(selector) {

    this.selector   = selector;
    this.thermostat = new ThermostatSplit(
      `${selector} .wrap-vis svg rect.push`,
      `${selector} .wrap-vis svg rect.pull`
    );

    this.initView();

    this.reset();

  }

  initView() {

    this.$inputs       = $(`${this.selector} .wrap-input input`);
    this.$inputsPush   = $(`${this.selector} .wrap-input p.push input`);
    this.$inputsPull   = $(`${this.selector} .wrap-input p.pull input`);
    this.$resetBtn     = $(`${this.selector} .wrap-input button.reset`);

    this.$inputs
      .attr('min', SPLIT_MIN)
      .attr('max', SPLIT_MAX);

    this.$inputsPush
      .on('input', ({ target }) => {
        let val = $(target).val();
        this.updatePush(val)
      });

    this.$inputsPull
      .on('input', ({ target }) => {
        let val = $(target).val();
        this.updatePull(val)
      });

    this.$resetBtn
      .on('click', () => this.reset());

  }

  reset() {

    this.updatePush(this.getDataSplit('push'));
    this.updatePull(this.getDataSplit('pull'));

  }

  getDataSplit(id) {

    const bxpElem   = SAMPLE_DATA_SUMMARY.client.bxpElements.find((elem) => !elem.has_delta),
          splitElem = bxpElem ? bxpElem.ppElements.find((elem) => elem.id === id) : null;

    return splitElem ? splitElem.score : 0;

  }

  updatePush(val) {

    const toPerc = d3.scaleLinear()
      .domain([ SPLIT_MIN, SPLIT_MAX ])
      .range([ 0, 1 ]);

    this.thermostat.updateA(toPerc(val));
    this.$inputsPush.val(val);

  }
  updatePull(val) {

    const toPerc = d3.scaleLinear()
      .domain([ SPLIT_MIN, SPLIT_MAX ])
      .range([ 0, 1 ]);

    this.thermostat.updateB(toPerc(val));
    this.$inputsPull.val(val);

  }

}

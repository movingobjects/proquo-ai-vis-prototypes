
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

    this.initInputs();

    this.reset();

  }

  initInputs() {

    this.$inputs   = $(`${this.selector} .wrap-input input`);
    this.$resetBtn = $(`${this.selector} .wrap-input button.reset`);

    this.$inputs
      .attr('min', SPLIT_MIN)
      .attr('max', SPLIT_MAX)
      .on('input', ({ target }) => {

        let $trgt = $(target),
            isA   = $trgt.closest('p').hasClass('push'),
            val   = $trgt.val();

        this.update(isA, val)

      });

    this.$resetBtn
      .on('click', () => this.reset());

  }

  reset() {

    this.update(true, this.getDataSplit('push'));
    this.update(false, this.getDataSplit('pull'));

  }

  getDataSplit(id) {

    const bxpElem   = SAMPLE_DATA_SUMMARY.client.bxpElements.find((elem) => !elem.has_delta),
          splitElem = bxpElem ? bxpElem.ppElements.find((elem) => elem.id === id) : null;

    return splitElem ? splitElem.score : 0;

  }

  update(isA, val) {

    const toPerc = d3.scaleLinear()
      .domain([ SPLIT_MIN, SPLIT_MAX ])
      .range([ 0, 1 ]);

    const perc = toPerc(val);

    if (isA) {
      this.thermostat.updateA(perc);
    } else {
      this.thermostat.updateB(perc);
    }

    this.updateInputs(isA ? 'push' : 'pull', val);

  }
  updateInputs(splitId, val) {

    const $inputs = $(`${this.selector} .wrap-input p.${splitId} input`);

    $inputs.val(val);

  }

}

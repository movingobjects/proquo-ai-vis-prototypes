
import * as d3 from 'd3';
import ThermostatSplit from './components/ThermostatSplit';

import SAMPLE_DATA_SUMMARY from '../data/sample_SubscriptSummary.json';

const SPLIT_MIN = -1000,
      SPLIT_MAX = 1000;

export default class BxpSplitVsCompetition {

  constructor(selector) {

    this.selector = selector;

    this.thermostats = [
      new ThermostatSplit(
        `${selector} .wrap-vis svg g.brand-a rect.push`,
        `${selector} .wrap-vis svg g.brand-a rect.pull`
      ),
      new ThermostatSplit(
        `${selector} .wrap-vis svg g.brand-b rect.push`,
        `${selector} .wrap-vis svg g.brand-b rect.pull`
      ),
      new ThermostatSplit(
        `${selector} .wrap-vis svg g.brand-c rect.push`,
        `${selector} .wrap-vis svg g.brand-c rect.pull`
      )
    ];

    this.initInputs();

    this.reset();

  }

  initInputs() {

    this.$inputs       = $(`${this.selector} .wrap-input input`);
    this.$resetBtn     = $(`${this.selector} .wrap-input button.reset`);

    this.$inputs
      .attr('min', SPLIT_MIN)
      .attr('max', SPLIT_MAX)
      .on('input', ({ target }) => {

        let $trgt      = $(target),
            brandIndex = $trgt.closest('li').index(),
            isA        = $trgt.closest('p').hasClass('push'),
            val        = $trgt.val();

        this.update(brandIndex, isA, val)

      });

    this.$resetBtn
      .on('click', () => this.reset());

  }

  reset() {

    this.thermostats.forEach((thermostat, i) => {
      this.update(i, true, this.getDataSplit(i, 'push'));
      this.update(i, false, this.getDataSplit(i, 'pull'));
    });

  }

  getDataSplit(brandIndex, splitId) {

    const client    = (brandIndex === 0) ? SAMPLE_DATA_SUMMARY.client : SAMPLE_DATA_SUMMARY.compList[brandIndex - 1],
          bxpElem   = client.bxpElements.find((elem) => !elem.has_delta),
          splitElem = bxpElem ? bxpElem.ppElements.find((elem) => elem.id === splitId) : null;

    return splitElem ? splitElem.score : 0;

  }

  update(brandIndex, isA, val) {

    const toPerc = d3.scaleLinear()
      .domain([ SPLIT_MIN, SPLIT_MAX ])
      .range([ 0, 1 ]);

    const thermostat = this.thermostats[brandIndex],
          perc       = toPerc(val);

    if (isA) {
      thermostat.updateA(perc);
    } else {
      thermostat.updateB(perc);
    }

    this.updateInput(brandIndex, isA ? 'push' : 'pull', val);

  }

  updateInput(brandIndex, splitId, val) {

    const $inputs = $(`${this.selector} .wrap-input ul.brands li:nth-child(${brandIndex + 1}) p.${splitId} input`);

    $inputs.val(val);

  }

}

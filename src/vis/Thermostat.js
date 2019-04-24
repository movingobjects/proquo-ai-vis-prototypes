
import * as d3 from 'd3';

import SAMPLE_DATA_SUMMARY from '../data/sample_SubscriptSummary.json';

const BXP_MIN = -2000,
      BXP_MAX = 2000;

export default class Thermostat {

  constructor(selector) {

    this.selector = selector;

    this.initView();

    this.update(this.dataBxp);

  }

  initView() {

    this.d3Outline = d3.select(`${this.selector} .wrap-vis svg rect.outline`);
    this.d3Fill    = d3.select(`${this.selector} .wrap-vis svg rect.fill`);

    this.$inputs   = $(`${this.selector} .wrap-input input`);
    this.$inputs
      .attr('min', BXP_MIN)
      .attr('max', BXP_MAX)
      .on('input', ({ target }) => {
        this.update($(target).val())
      });

  }

  get dataBxp() {

    const bxpElem = SAMPLE_DATA_SUMMARY.client.bxpElements.find((elem) => !elem.has_delta);

    return bxpElem ? bxpElem.score : 0;

  }

  update(val) {

    const toPerc = d3.scaleLinear()
      .domain([ BXP_MIN, BXP_MAX ])
      .range([ 0, 1 ]);

    const perc  = toPerc(val),
          areaY = +this.d3Outline.attr('y'),
          areaH = +this.d3Outline.attr('height'),
          barH  = perc * areaH,
          barY  = (areaY + areaH) - barH;

    this.d3Fill
      .attr('y', barY)
      .attr('height', barH);

    this.$inputs.val(val);

  }

}

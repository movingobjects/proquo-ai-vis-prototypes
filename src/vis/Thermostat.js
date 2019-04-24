
import * as d3 from 'd3';

import SAMPLE_DATA_SUMMARY from '../data/sample_SubscriptSummary.json';

const BXP_MIN = -2000,
      BXP_MAX = 2000;

const VIS_W = 500,
      VIS_H = 500,
      BAR_W = 50,
      BAR_H = 300;

export default class Thermostat {

  constructor(selector) {

    this.selector = selector;

    this.initView();
    this.initInput();

    this.update(this.dataBxp);

  }

  initView() {

    const selector    = `${this.selector} .wrap-vis svg`;

    this.d3chart        = d3.select(`${selector}`);
    this.d3chartOutline = d3.select(`${selector} rect.outline`);
    this.d3chartFill    = d3.select(`${selector} rect.fill`);

    this.d3chart
      .attr('width', VIS_W)
      .attr('height', VIS_H);

    const barX = (VIS_W - BAR_W) / 2,
          barY = (VIS_H - BAR_H) / 2;

    this.d3chartOutline
      .attr('x', barX)
      .attr('y', barY)
      .attr('width', BAR_W)
      .attr('height', BAR_H);

    this.d3chartFill
      .attr('x', barX)
      .attr('width', BAR_W);

  }
  initInput() {

    const onInput = (e) => this.update($(e.target).val());

    const selector    = `${this.selector} .wrap-input`;

    this.$inputRange  = $(`${selector} input[type='range']`);
    this.$inputBxpVal = $(`${selector} input[type='number']`);

    this.$inputRange
      .attr('min', BXP_MIN)
      .attr('max', BXP_MAX)
      .on('input', onInput);

    this.$inputBxpVal
      .attr('min', BXP_MIN)
      .attr('max', BXP_MAX)
      .on('input', onInput);

  }

  get dataBxp() {

    const bxpElem = SAMPLE_DATA_SUMMARY.client.bxpElements.find((elem) => !elem.has_delta);

    return bxpElem ? bxpElem.score : 0;

  }

  update(val) {

    const bxpToPerc = d3.scaleLinear()
      .domain([BXP_MIN, BXP_MAX])
      .range([0, 1]);

    const perc = bxpToPerc(val),
          barH = perc * BAR_H,
          barY = ((BAR_H + VIS_H) / 2) - barH;

    this.d3chartFill
      .attr('y', barY)
      .attr('height', barH);

    this.$inputRange.val(val);
    this.$inputBxpVal.val(val);

  }

}

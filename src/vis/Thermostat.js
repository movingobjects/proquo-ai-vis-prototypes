
import * as d3 from 'd3';

import SAMPLE_DATA_SUMMARY from '../data/sample_SubscriptSummary.json';

const BXP_MIN = -2000,
      BXP_MAX = 2000;

const VIS_W = 500,
      VIS_H = 500;

const BAR_W        = 50,
      BAR_H        = 300,
      BAR_STROKE_W = 1;

export default class Thermostat {

  constructor() {

    this.initChart();
    this.initInput();

    this.updateBxp(this.dataBxp);

  }

  initChart() {

    this.d3chart = d3.select('section#vis-1 svg');

    this.d3chart
      .attr('width', VIS_W)
      .attr('height', VIS_H);

    const barX = (VIS_W - BAR_W) / 2,
          barY = (VIS_H - BAR_H) / 2;

    this.d3chart
      .append('rect')
        .attr('x', barX)
        .attr('y', barY)
        .attr('width', BAR_W)
        .attr('height', BAR_H)
        .attr('fill-opacity', 0)
        .attr('stroke-width', BAR_STROKE_W)
        .attr('stroke', 'black');

    this.d3chartBar = this.d3chart
      .append('rect')
        .attr('x', barX + BAR_STROKE_W)
        .attr('width', BAR_W - (BAR_STROKE_W * 2));

  }
  initInput() {

    this.$inputRange  = $('section#vis-1 .input-range');
    this.$inputBxpVal = $('section#vis-1 input.bxp-val');

    const onInput = (e) => this.updateBxp($(e.target).val());

    this.$inputRange.on('input', onInput);
    this.$inputBxpVal.on('input', onInput);

  }

  get dataBxp() {

    const bxpElem = SAMPLE_DATA_SUMMARY.client.bxpElements.find((elem) => !elem.has_delta);

    return bxpElem ? bxpElem.score : 0;

  }

  updateBxp(val) {

    const bxpToPerc = d3.scaleLinear()
      .domain([BXP_MIN, BXP_MAX])
      .range([0, 1]);

    const perc = bxpToPerc(val),
          barH = perc * (BAR_H - (BAR_STROKE_W * 2)),
          barY = ((BAR_H + VIS_H) / 2) - BAR_STROKE_W - barH;

    this.d3chartBar
      .attr('y', barY)
      .attr('height', barH);

    this.$inputRange.val(val);
    this.$inputBxpVal.val(val);

  }

}

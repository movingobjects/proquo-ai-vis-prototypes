
import style from './styles/style.scss';
import * as d3 from 'd3';

import SAMPLE_DATA_SUMMARY from './data/sample_SubscriptSummary.json';
import SAMPLE_DATA_BRAND_DRIVERS from './data/sample_brandDriversGet.json';

let vis1 = {
  chart: d3.select('section#vis-1 svg'),
  inputRange: d3.select('section#vis-1 .input-range'),
  scaleBxpToPerc: d3.scaleLinear().domain([-2000, 2000]).range([0, 1])
};

(function($) {

  initDataSummary();
  initVis1();

  function initDataSummary() {

    $('section#data-summary textarea.data-summary').val(JSON.stringify(SAMPLE_DATA_SUMMARY, null, 2));
    $('section#data-summary textarea.data-drivers').val(JSON.stringify(SAMPLE_DATA_BRAND_DRIVERS, null, 2));

  }

  function initVis1() {

    let bxpElem = SAMPLE_DATA_SUMMARY.client.bxpElements.find((elem) => !elem.has_delta),
        bxp     = bxpElem ? bxpElem.score : 0;

    vis1.chart
      .attr('width', 500)
      .attr('height', 500);

    vis1.chart
      .append('rect')
        .attr('x', 200)
        .attr('y', 100)
        .attr('width', 100)
        .attr('height', 300)
        .attr('fill-opacity', 0)
        .attr('stroke-width', 1)
        .attr('stroke', 'black');

    vis1.chartBar = vis1.chart
      .append('rect')
        .attr('x', 202)
        .attr('y', 102)
        .attr('width', 96)
        .attr('height', 296);

    vis1.inputRange
      .on('input', function() {
        updateBxp(this.value);
      });

    updateBxp(bxp);

  }

  function updateBxp(val) {

    let perc = vis1.scaleBxpToPerc(val);

    let barH = 296 * perc,
        barY = 398 - barH;

    vis1.chartBar
      .attr('height', barH)
      .attr('y', barY)

    vis1.inputRange
      .property('value', val);

    $('section#vis-1 input.bxp-val').val(val);

  }

})(jQuery);

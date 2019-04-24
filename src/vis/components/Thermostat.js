
import * as d3 from 'd3';

export default class Thermostat {

  constructor(selector) {

    this.d3Outline = d3.select(`${selector} rect.outline`);
    this.d3Fill    = d3.select(`${selector} rect.fill`);

  }

  update(perc) {

    const areaY = +this.d3Outline.attr('y'),
          areaH = +this.d3Outline.attr('height');

    const fillH = perc * areaH,
          fillY = (areaY + areaH) - fillH;

    this.d3Fill
      .attr('y', fillY)
      .attr('height', fillH);

  }

}

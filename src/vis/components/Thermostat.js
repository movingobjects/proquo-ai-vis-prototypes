
import * as d3 from 'd3';

export default class Thermostat {

  constructor(selector) {

    this.selector  = selector;

    this.d3Outline = d3.select(`${selector} rect.outline`);
    this.d3Fill    = d3.select(`${selector} rect.fill`);

    this.lines     = [];

  }

  get areaH() {
    return +this.d3Outline.attr('height');
  }
  get areaY() {
    return +this.d3Outline.attr('y');
  }

  update(perc) {

    const fillH = perc * this.areaH,
          fillY = (this.areaY + this.areaH) - fillH;

    this.d3Fill
      .attr('y', fillY)
      .attr('height', fillH);

  }

  addLine(id, selector) {

    this.lines.push({
      id: id,
      d3: d3.select(selector)
    });

  }
  updateLine(id, perc) {

    const line = this.lines.find((line) => line.id === id);

    if (line) {

      let lineY = perc * this.areaH;

      line.d3
        .attr('y1', lineY)
        .attr('y2', lineY);

    }

  }


}

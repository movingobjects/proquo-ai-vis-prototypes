
import * as d3 from 'd3';

export default class ThermostatDiff {

  constructor(id, selector, x) {

    this.selector  = selector;

    this.d3Outline = d3.select(`${selector}.${id} rect.outline`);
    this.d3Fill    = d3.select(`${selector}.${id} rect.fill`);

    this.d3Outline
      .attr('x', x);

    this.d3Fill
      .attr('x', x);

  }

  get areaH() {
    return +this.d3Outline.attr('height');
  }
  get areaY() {
    return +this.d3Outline.attr('y');
  }

  update(perc) {

    const COLOR_UP   = '#48B457',
          COLOR_DOWN = '#EE5E60';

    const isUp  = (perc >= 0),
          halfH = (this.areaH / 2),
          midY  = this.areaY + halfH,
          fillH = Math.abs(perc) * halfH;

    if (isUp) {
      this.d3Fill
        .attr('y', midY - fillH)
        .attr('height', fillH)
        .style('fill', COLOR_UP);

    } else {
      this.d3Fill
        .attr('y', midY)
        .attr('height', fillH)
        .style('fill', COLOR_DOWN);
    }

  }

}

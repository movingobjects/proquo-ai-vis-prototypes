
import * as d3 from 'd3';

export default class ThermostatSplit {

  constructor(selectorA, selectorB) {

    this.d3OutlineA = d3.select(`${selectorA}.outline`);
    this.d3OutlineB = d3.select(`${selectorB}.outline`);
    this.d3FillA    = d3.select(`${selectorA}.fill`);
    this.d3FillB    = d3.select(`${selectorB}.fill`);

  }

  updateA(perc) {

    const areaX = +this.d3OutlineA.attr('x'),
          areaW = +this.d3OutlineA.attr('width');

    const fillW = perc * areaW,
          fillX = (areaX + areaW) - fillW;

    this.d3FillA
      .attr('x', fillX)
      .attr('width', fillW);

  }
  updateB(perc) {

    const areaW = +this.d3OutlineB.attr('width'),
          fillW = perc * areaW;

    this.d3FillB
      .attr('width', fillW);

  }

}

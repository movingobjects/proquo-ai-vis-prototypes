
import * as d3 from 'd3';

export default class ThermostatSplit {

  constructor(selectorA, selectorB) {

    this.d3OutlineA = d3.select(`${selectorA}.outline`);
    this.d3OutlineB = d3.select(`${selectorB}.outline`);
    this.d3FillA    = d3.select(`${selectorA}.fill`);
    this.d3FillB    = d3.select(`${selectorB}.fill`);

    this.lines     = [];

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

  addLine(id, selector) {

    this.lines.push({
      id: id,
      d3: d3.select(selector)
    });

  }
  updateLine(id, isSideA, perc) {

    const line = this.lines.find((line) => line.id === id);

    if (line) {

      let xMin, xMax;

      if (isSideA) {
        xMin = +this.d3OutlineA.attr('x') + +this.d3OutlineA.attr('width');
        xMax = +this.d3OutlineA.attr('x');
      } else {
        xMin = +this.d3OutlineB.attr('x');
        xMax = +this.d3OutlineB.attr('x') + +this.d3OutlineB.attr('width');
      }

      let percToX = d3.scaleLinear()
        .domain([ 0, 1 ])
        .range([ xMin, xMax ]);

      line.d3
        .attr('x1', percToX(perc))
        .attr('x2', percToX(perc));

    }

  }

}

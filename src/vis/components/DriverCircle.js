
import * as d3 from 'd3';

const MAX_RADIUS = 40;

export default class DriverCircle {

  constructor(selector, col, row) {

    this.selector  = selector;

    this.d3Circle = d3.select(`${selector}`);

    this.d3Circle
      .attr('cx', this.colToX(col))
      .attr('cy', this.rowToY(row))
      .attr('r', MAX_RADIUS);

  }

  updateSize(perc) {

    const radius = MAX_RADIUS * perc;

    this.d3Circle
      .attr('r', radius);

  }
  updateColor(perc) {

    const toColor = (perc) => {

      const COLOR_LOW     = '#ff6348',
            COLOR_MID     = '#fee531',
            COLOR_HIGH    = '#b9f752',
            COLOR_HIGHEST = '#00f87e';

      if (perc < 0.25) return COLOR_LOW;
      else if (perc < 0.5) return COLOR_MID;
      else if (perc < 0.75) return COLOR_HIGH;
      else return COLOR_HIGHEST;

    }

    this.d3Circle
      .attr('fill', toColor(perc));

  }

  colToX(col) {
    return 225 + col * 100;
  }
  rowToY(row) {
    return 100 + row * 100;
  }

}

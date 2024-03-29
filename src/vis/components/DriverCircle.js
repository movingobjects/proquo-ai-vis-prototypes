
import * as d3 from 'd3';

const MAX_RADIUS = 45;

export default class DriverCircle {

  constructor(id, selector, col, row) {

    this.selector = `${selector}.${id}`;

    let x = this.colToX(col),
        y = this.rowToY(row);

    this.d3Circle = d3.select(`${this.selector} circle`)
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', MAX_RADIUS);

    this.d3Text = d3.select(`${this.selector} text`)
      .text(id)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('x', x)
      .attr('y', y);

  }

  updateSize(perc) {

    const radius = MAX_RADIUS * perc,
          textOn = radius > 20;

    this.d3Circle
      .attr('r', radius);

    this.d3Text
      .style('opacity', textOn ? 1 : 0)

  }
  updateColor(perc) {

    const toColor = (perc) => {

      const COLOR_LOW     = '#DF6762',
            COLOR_MID     = '#F7E0E0',
            COLOR_HIGH    = '#D4EBDC',
            COLOR_HIGHEST = '#489D53';

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

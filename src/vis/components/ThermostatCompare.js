
import * as d3 from 'd3';

export default class ThermostatCompare {

  constructor(id, selector, x) {

    this.selector = selector;
    this.items    = [];

    this.d3Outline = d3.select(`${selector}.${id} rect.outline`);

    this.d3Outline
      .attr('x', x);

  }

  get areaW() {
    return +this.d3Outline.attr('width');
  }
  get areaH() {
    return +this.d3Outline.attr('height');
  }
  get areaY() {
    return +this.d3Outline.attr('y');
  }
  get areaX() {
    return +this.d3Outline.attr('x');
  }

  addItem(id, selector) {
    this.items.push({
      id,
      d3: d3.select(selector)
    })
  }
  updateItem(id, val) {

    const item = this.items.find((item) => item.id === id);

    if (item) {
      item.val = val;
      this.updateView();
    }

  }

  updateView() {

    this.items.forEach((item, i) => {

      if (item.val) {

        item.d3
          .attr('cx', this.areaX + (this.areaW / 2))
          .attr('cy', (this.areaY + (this.areaH / 2)) + (-item.val * (this.areaH / 2)));
      }

    })

  }

}

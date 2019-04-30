
import * as d3 from 'd3';
import ThermostatCompare from './components/ThermostatCompare';

const BXP_MIN = -2000,
      BXP_MAX = 2000;

const TEST_DATA = [
  { "date": "2013-04-28", "value": 135.98 },
  { "date": "2013-04-29", "value": 147.49 },
  { "date": "2013-04-30", "value": 146.93 },
  { "date": "2013-05-01", "value": 139.89 },
  { "date": "2013-05-02", "value": 125.6 },
  { "date": "2013-05-03", "value": 108.13 },
  { "date": "2013-05-04", "value": 115 },
  { "date": "2013-05-05", "value": 118.8 },
  { "date": "2013-05-06", "value": 124.66 },
  { "date": "2013-05-07", "value": 113.44 },
  { "date": "2013-05-08", "value": 115.78 },
  { "date": "2013-05-09", "value": 113.46 },
  { "date": "2013-05-10", "value": 122 },
  { "date": "2013-05-11", "value": 118.68 },
  { "date": "2013-05-12", "value": 117.45 },
  { "date": "2013-05-13", "value": 118.7 },
  { "date": "2013-05-14", "value": 119.8 },
  { "date": "2013-05-15", "value": 115.81 },
  { "date": "2013-05-16", "value": 118.76 },
  { "date": "2013-05-17", "value": 125.3 },
  { "date": "2013-05-18", "value": 125.25 },
  { "date": "2013-05-19", "value": 124.5 },
  { "date": "2013-05-20", "value": 123.62 },
  { "date": "2013-05-21", "value": 123 },
  { "date": "2013-05-22", "value": 124 },
  { "date": "2013-05-23", "value": 126.93 },
  { "date": "2013-05-24", "value": 133.85 },
  { "date": "2013-05-25", "value": 133.22 },
  { "date": "2013-05-26", "value": 136 },
  { "date": "2013-05-27", "value": 135.47 },
  { "date": "2013-05-28", "value": 130.58 },
  { "date": "2013-05-29", "value": 132.59 },
  { "date": "2013-05-30", "value": 132.25 },
  { "date": "2013-05-31", "value": 129.9 },
  { "date": "2013-06-01", "value": 129.78 },
  { "date": "2013-06-02", "value": 129.4 },
  { "date": "2013-06-03", "value": 122.5 },
  { "date": "2013-06-04", "value": 123.84 },
  { "date": "2013-06-05", "value": 123.47 },
  { "date": "2013-06-06", "value": 123.1 },
  { "date": "2013-06-07", "value": 119 },
  { "date": "2013-06-08", "value": 111.42 },
  { "date": "2013-06-09", "value": 108.99 },
  { "date": "2013-06-10", "value": 110.1 },
  { "date": "2013-06-11", "value": 109.6 },
  { "date": "2013-06-12", "value": 111.79 },
  { "date": "2013-06-13", "value": 110.3 },
  { "date": "2013-06-14", "value": 104.7 },
  { "date": "2013-06-15", "value": 103.7 },
  { "date": "2013-06-16", "value": 101.6 },
  { "date": "2013-06-17", "value": 102.21 },
  { "date": "2013-06-18", "value": 111.11 },
  { "date": "2013-06-19", "value": 110.22 },
  { "date": "2013-06-20", "value": 114.3 },
  { "date": "2013-06-21", "value": 114.99 },
  { "date": "2013-06-22", "value": 109.96 },
  { "date": "2013-06-23", "value": 108.8 },
  { "date": "2013-06-24", "value": 108.33 }
];


export default class VisBxpOverTime {

  constructor(selector, data) {

    this.selector = selector;
    this.data     = TEST_DATA;

    this.initInputs();

    this.reset();

  }

  initInputs() {

    this.$resetBtn = $(`${this.selector} .wrap-input button.reset`);
    this.$resetBtn
      .on('click', () => this.reset());

  }

  reset() {

    this.update();

  }

  update() {

    const data = this.data.map((item) => ({
      date: d3.timeParse("%Y-%m-%d")(item.date),
      value: item.value
    }))

    console.log(data);

    let $svg = $(`${this.selector} svg`);

    let margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width  = $svg.width()  - margin.left - margin.right,
        height = $svg.height() - margin.top - margin.bottom;

    let scaleTime = d3.scaleLinear()
      .domain(d3.extent(data, (d) => d.date))
      .range([ 0, width ]);

    let scaleValue = d3.scaleLinear()
      .domain(d3.extent(data, (d) => d.value))
      .range([ height, 0 ]);

    let area = d3.area()
      .x((d) => scaleTime(d.date))
      .y0(height)
      .y1((d) => scaleValue(d.value));

    let chart = d3.select(`${this.selector} svg`)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    chart.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

    /*

    let xAxis = d3.axisBottom(scaleTime),
        yAxis = d3.axisLeft(scaleValue);

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);*/

  }

}


import * as d3 from 'd3';
import Thermostat from './components/Thermostat';

const BXP_MIN = -2000,
      BXP_MAX = 2000;

export default class VisBxpVsCategAvg {

  constructor(selector, data) {

    this.selector   = selector;
    this.data       = data;
    this.thermostat = new Thermostat(`${selector} .wrap-vis svg g`);
    this.thermostat.addLine('category', `${selector} .wrap-vis svg line`);

    this._bxp         = 0;
    this._bxpCategory = 0;

    this.initInputs();
    this.reset();

  }

  initInputs() {

    this.$resetBtn = $(`${this.selector} .wrap-input button.reset`);
    this.$inputs   = $(`${this.selector} .wrap-input input`);

    this.$resetBtn
      .on('click', () => this.reset());

    this.$inputs
      .attr('min', BXP_MIN)
      .attr('max', BXP_MAX)
      .on('input', ({ target }) => {

        let $trgt = $(target),
            index = $trgt.closest('tr').index(),
            val   = $trgt.val();

        if (index === 0) {
          this.bxp = val;
        } else {
          this.categoryBxp = val;
        }

      });

  }

  reset() {

    const getDataBxp = (client) => client.bxpElements.find((elem) => !elem.has_delta).score;

    this.bxp         = getDataBxp(this.data.client);
    this.categoryBxp = getDataBxp(this.data.category);

  }

  set bxp(val) {

    this._bxp = val;
    this.update();

  }
  set categoryBxp(val) {

    this._bxpCategory = val;
    this.update();

  }

  update() {

    const toPerc = d3.scaleLinear()
      .domain([ BXP_MIN, BXP_MAX ])
      .range([ 0, 1 ]);

    this.thermostat.update(toPerc(this._bxp));
    this.thermostat.updateLine('category', toPerc(this._bxpCategory));

    const $inputsBxp         = $(`${this.selector} .wrap-input table.brands tr:nth-child(1) input`),
          $inputsCategoryBxp = $(`${this.selector} .wrap-input table.brands tr:nth-child(2) input`);

    $inputsBxp.val(this._bxp);
    $inputsCategoryBxp.val(this._bxpCategory);

  }

}

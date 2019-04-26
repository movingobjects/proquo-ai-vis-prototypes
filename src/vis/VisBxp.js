
import * as d3 from 'd3';
import Thermostat from './components/Thermostat';

const BXP_MIN = -2000,
      BXP_MAX = 2000;

export default class VisBxp {

  constructor(selector, data) {

    this.selector   = selector;
    this.data       = data;
    this.thermostat = new Thermostat(`${this.selector} .wrap-vis svg g`);

    this._bxp         = 0;

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
        this.bxp = $(target).val();
      });

  }

  reset() {

    this.bxp = this.data.client.bxpElements.find((elem) => !elem.has_delta).score;

  }

  set bxp(val) {

    this._bxp = val;
    this.update();

  }

  update() {

    const toPerc = d3.scaleLinear()
      .domain([ BXP_MIN, BXP_MAX ])
      .range([ 0, 1 ]);

    this.thermostat.update(toPerc(this._bxp));
    this.$inputs.val(this._bxp);

  }

}

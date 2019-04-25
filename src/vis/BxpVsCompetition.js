
import * as d3 from 'd3';
import Thermostat from './components/Thermostat';

const BXP_MIN = -2000,
      BXP_MAX = 2000;

export default class BxpVsCompetition {

  constructor(selector, data) {

    this.selector    = selector;
    this.data        = data;
    this.thermostats = [
      new Thermostat(`${selector} .wrap-vis svg g:nth-child(1)`),
      new Thermostat(`${selector} .wrap-vis svg g:nth-child(2)`),
      new Thermostat(`${selector} .wrap-vis svg g:nth-child(3)`)
    ];

    this._bxp       = 0;
    this._bxpBrandB = 0;
    this._bxpBrandC = 0;

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
            index = $trgt.closest('li').index(),
            val   = $trgt.val();

        switch (index) {

          case 0:
            this.bxp = val;
            break;

          case 1:
            this.bxpBrandB = val;
            break;

          case 2:
            this.bxpBrandC = val;
            break;

        }

      });

  }

  reset() {

    const getDataBxp = (client) => client.bxpElements.find((elem) => !elem.has_delta).score;

    this.bxp       = getDataBxp(this.data.client);
    this.bxpBrandB = getDataBxp(this.data.compList[0]);
    this.bxpBrandC = getDataBxp(this.data.compList[1]);

  }

  set bxp(val) {
    this._bxp = val;
    this.update();
  }
  set bxpBrandB(val) {
    this._bxpBrandB = val;
    this.update();
  }
  set bxpBrandC(val) {
    this._bxpBrandC = val;
    this.update();
  }

  update() {

    const toPerc = d3.scaleLinear()
      .domain([ BXP_MIN, BXP_MAX ])
      .range([ 0, 1 ]);

    this.thermostats[0].update(toPerc(this._bxp));
    this.thermostats[1].update(toPerc(this._bxpBrandB));
    this.thermostats[2].update(toPerc(this._bxpBrandC));

    const $inputsBxp       = $(`${this.selector} .wrap-input ul.brands li:nth-child(1) input`),
          $inputsBxpBrandB = $(`${this.selector} .wrap-input ul.brands li:nth-child(2) input`),
          $inputsBxpBrandC = $(`${this.selector} .wrap-input ul.brands li:nth-child(3) input`);

    $inputsBxp.val(this._bxp);
    $inputsBxpBrandB.val(this._bxpBrandB);
    $inputsBxpBrandC.val(this._bxpBrandC);

  }

}

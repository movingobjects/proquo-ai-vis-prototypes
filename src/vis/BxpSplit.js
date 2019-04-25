
import * as d3 from 'd3';
import ThermostatSplit from './components/ThermostatSplit';

const SPLIT_MIN = -1000,
      SPLIT_MAX = 1000;

export default class BxpSplit {

  constructor(selector, data) {

    this.selector   = selector;
    this.data       = data;

    this.thermostat = new ThermostatSplit(
      `${selector} .wrap-vis svg rect.push`,
      `${selector} .wrap-vis svg rect.pull`
    );

    this._bxpPush = 0;
    this._bxpPull = 0;

    this.initInputs();

    this.reset();

  }

  initInputs() {

    this.$inputs   = $(`${this.selector} .wrap-input input`);
    this.$resetBtn = $(`${this.selector} .wrap-input button.reset`);

    this.$inputs
      .attr('min', SPLIT_MIN)
      .attr('max', SPLIT_MAX)
      .on('input', ({ target }) => {

        let $trgt  = $(target),
            isPush = $trgt.closest('p').hasClass('push'),
            val   = $trgt.val();

        if (isPush) {
          this.bxpPush = val;
        } else {
          this.bxpPull = val;
        }

      });

    this.$resetBtn
      .on('click', () => this.reset());

  }

  reset() {

    const getSplit = (id) => {
      return (
        this.data.client
          .bxpElements.find((elem) => !elem.has_delta)
          .ppElements.find((elem) => elem.id === id)
          .score
      );
    }

    this.bxpPush = getSplit('push');
    this.bxpPull = getSplit('pull');

  }

  set bxpPush(val) {
    this._bxpPush = val;
    this.update();
  }
  set bxpPull(val) {
    this._bxpPull = val;
    this.update();
  }

  update() {

    const toPerc = d3.scaleLinear()
      .domain([ SPLIT_MIN, SPLIT_MAX ])
      .range([ 0, 1 ]);

    this.thermostat.updateA(toPerc(this._bxpPush));
    this.thermostat.updateB(toPerc(this._bxpPull));

    const $inputsPush = $(`${this.selector} .wrap-input p.push input`),
          $inputsPull = $(`${this.selector} .wrap-input p.pull input`);

    $inputsPush.val(this._bxpPush);
    $inputsPull.val(this._bxpPull);

  }

}

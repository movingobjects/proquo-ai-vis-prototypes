
import * as d3 from 'd3';
import ThermostatSplit from './components/ThermostatSplit';

const SPLIT_MIN = -1000,
      SPLIT_MAX = 1000;

export default class VisBxpSplitVsCategAvg {

  constructor(selector, data) {

    this.selector   = selector;
    this.data       = data;

    this.thermostat = new ThermostatSplit(
      `${selector} .wrap-vis svg rect.push`,
      `${selector} .wrap-vis svg rect.pull`
    );

    this.thermostat.addLine('push-avg', `${selector} .wrap-vis svg line.push-avg`);
    this.thermostat.addLine('pull-avg', `${selector} .wrap-vis svg line.pull-avg`);

    this._bxpPush = 0;
    this._bxpPull = 0;
    this._avgPush = 0;
    this._avgPull = 0;

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

        let $trgt      = $(target),
            isPush     = $trgt.closest('p').hasClass('push'),
            isMyBrand  = $trgt.closest('li').hasClass('my-brand'),
            isCategAvg = $trgt.closest('li').hasClass('categ-avg'),
            val        = $trgt.val();

        if (isMyBrand) {
          if (isPush) {
            this.bxpPush = val;
          } else {
            this.bxpPull = val;
          }
        } else if (isCategAvg) {
          if (isPush) {
            this.avgPush = val;
          } else {
            this.avgPull = val;
          }
        }

      });

    this.$resetBtn
      .on('click', () => this.reset());

  }

  reset() {

    const getSplit = (client, id) => {
      return (
        client
          .bxpElements.find((elem) => !elem.has_delta)
          .ppElements.find((elem) => elem.id === id)
          .score
      );
    }

    this.bxpPush = getSplit(this.data.client, 'push');
    this.bxpPull = getSplit(this.data.client, 'pull');
    this.avgPush = getSplit(this.data.compAvg, 'push');
    this.avgPull = getSplit(this.data.compAvg, 'pull');

  }

  set bxpPush(val) {
    this._bxpPush = val;
    this.update();
  }
  set bxpPull(val) {
    this._bxpPull = val;
    this.update();
  }

  set avgPush(val) {
    this._avgPush = val;
    this.update();
  }
  set avgPull(val) {
    this._avgPull = val;
    this.update();
  }

  update() {

    const toPerc = d3.scaleLinear()
      .domain([ SPLIT_MIN, SPLIT_MAX ])
      .range([ 0, 1 ]);

    this.thermostat.updateA(toPerc(this._bxpPush));
    this.thermostat.updateB(toPerc(this._bxpPull));

    this.thermostat.updateLine('push-avg', true, toPerc(this._avgPush));
    this.thermostat.updateLine('pull-avg', false, toPerc(this._avgPull));

    const $inputsPush    = $(`${this.selector} .wrap-input li.my-brand p.push input`),
          $inputsPull    = $(`${this.selector} .wrap-input li.my-brand p.pull input`),
          $inputsAvgPush = $(`${this.selector} .wrap-input li.categ-avg p.push input`),
          $inputsAvgPull = $(`${this.selector} .wrap-input li.categ-avg p.pull input`);

    $inputsPush.val(this._bxpPush);
    $inputsPull.val(this._bxpPull);

    $inputsAvgPush.val(this._avgPush);
    $inputsAvgPull.val(this._avgPull);

  }

}

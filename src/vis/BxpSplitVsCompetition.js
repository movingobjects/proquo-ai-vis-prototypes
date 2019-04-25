
import * as d3 from 'd3';
import ThermostatSplit from './components/ThermostatSplit';

const SPLIT_MIN = -1000,
      SPLIT_MAX = 1000;

export default class BxpSplitVsCompetition {

  constructor(selector, data) {

    this.selector    = selector;
    this.data        = data;
    this.thermostats = [
      new ThermostatSplit(
        `${selector} .wrap-vis svg g:nth-child(1) rect.push`,
        `${selector} .wrap-vis svg g:nth-child(1) rect.pull`
      ),
      new ThermostatSplit(
        `${selector} .wrap-vis svg g:nth-child(2) rect.push`,
        `${selector} .wrap-vis svg g:nth-child(2) rect.pull`
      ),
      new ThermostatSplit(
        `${selector} .wrap-vis svg g:nth-child(3) rect.push`,
        `${selector} .wrap-vis svg g:nth-child(3) rect.pull`
      )
    ];

    this._bxpPushes = [ 0, 0, 0 ];
    this._bxpPulls  = [ 0, 0, 0 ];

    this.initInputs();

    this.reset();

  }

  initInputs() {

    this.$inputs       = $(`${this.selector} .wrap-input input`);
    this.$resetBtn     = $(`${this.selector} .wrap-input button.reset`);

    this.$inputs
      .attr('min', SPLIT_MIN)
      .attr('max', SPLIT_MAX)
      .on('input', ({ target }) => {

        let $trgt  = $(target),
            index  = $trgt.closest('li').index(),
            isPush = $trgt.closest('p').hasClass('push'),
            val    = $trgt.val();

        if (isPush) {
          this.setBxpPush(index, val);
        } else {
          this.setBxpPull(index, val);
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

    this.setBxpPush(0, getSplit(this.data.client, 'push'));
    this.setBxpPull(0, getSplit(this.data.client, 'pull'));

    this.setBxpPush(1, getSplit(this.data.compList[0], 'push'));
    this.setBxpPull(1, getSplit(this.data.compList[0], 'pull'));

    this.setBxpPush(2, getSplit(this.data.compList[1], 'push'));
    this.setBxpPull(2, getSplit(this.data.compList[1], 'pull'));

  }

  setBxpPush(index, val) {
    this._bxpPushes[index] = val;
    this.update();
  }
  setBxpPull(index, val) {
    this._bxpPulls[index] = val;
    this.update();
  }

  update() {

    const toPerc = d3.scaleLinear()
      .domain([ SPLIT_MIN, SPLIT_MAX ])
      .range([ 0, 1 ]);

    this.thermostats.forEach((thermostat, index) => {

      let percPush = toPerc(this._bxpPushes[index]),
          percPull = toPerc(this._bxpPulls[index]);

      thermostat.updateA(percPush);
      thermostat.updateB(percPull);

    });

    $(`${this.selector} .wrap-input ul.brands li`).each((index, el) => {

      let valPush = this._bxpPushes[index],
          valPull = this._bxpPulls[index];

      $(el).find('p.push input').val(valPush);
      $(el).find('p.pull input').val(valPull);

    });

  }

}

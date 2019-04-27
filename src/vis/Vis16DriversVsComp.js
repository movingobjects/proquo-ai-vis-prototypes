
import * as d3 from 'd3';
import ThermostatCompare from './components/ThermostatCompare';

const SCORE_MIN = -100,
      SCORE_MAX = 100;

const DRIVERS = [
  [ "as", "at", "di", "em" ],
  [ "mo", "pe", "pu", "rl" ],
  [ "aw", "co", "ea", "in" ],
  [ "po", "re", "tr", "va" ]
];

export default class Vis16DriversVsComp {

  constructor(selector, data) {

    this.selector    = selector;
    this.data        = data;
    this.values      = { };
    this.thermostats = this.initThermostats();

    this.initInputs();

    this.reset();

  }

  initThermostats() {

    const selector    = `${this.selector} .wrap-vis svg g`,
          thermostats = { }

    DRIVERS.forEach((quad, qi) => quad.forEach((id, di) => {

      let index = (qi * 4) + di,
          x     = 100 + (index * 35);

      thermostats[id] = new ThermostatCompare(id, selector, x);
      thermostats[id].addItem('brandB', `${selector}.${id} g.brand-b circle`);
      thermostats[id].addItem('brandC', `${selector}.${id} g.brand-c circle`);

    }));

    return thermostats;

  }
  initInputs() {

    this.$resetBtn = $(`${this.selector} .wrap-input button.reset`);
    this.$resetBtn
      .on('click', () => this.reset());

      this.$inputs = $(`${this.selector} .wrap-input table.drivers input`);

      this.$inputs
        .attr('min', SCORE_MIN)
        .attr('max', SCORE_MAX)
        .on('input', ({ target }) => {

          let $trgt = $(target),
              id    = $trgt.closest('tr').attr('class'),
              brand = $trgt.closest('td').attr('class'),
              val   = +$trgt.val();

          if (brand === 'my-brand') {
            this.setDriverScore(id, 'myBrand', val);

          } else if (brand === 'brand-b') {
            this.setDriverScore(id, 'brandB', val);

          } else if (brand === 'brand-c') {
            this.setDriverScore(id, 'brandC', val);

          }


        });

  }

  reset() {

    const getDrivers = (client) => client.bxpElements.find((elem) => !elem.has_delta).ppElements.reduce((acc, ppElem) => ([
      ...acc,
      ...ppElem.drivers
    ]), []);

    const driversMyBrand = getDrivers(this.data.client),
          driversBrandB  = getDrivers(this.data.compList[0]),
          driversBrandC  = getDrivers(this.data.compList[1]);

    this.values = { };

    driversMyBrand.forEach((driver) => {
      this.values[driver.id] = { myBrand: driver.score }
    });
    driversBrandB.forEach((driver) => {
      this.values[driver.id].brandB = driver.score;
    });
    driversBrandC.forEach((driver) => {
      this.values[driver.id].brandC = driver.score;
    });

    this.update();

  }

  setDriverScore(id, brandId, val) {
    this.values[id][brandId] = val;

    this.update();
  }

  update() {

    let maxDiff = 0,
        diffs   = { };

    Object.keys(this.values).forEach((id) => {

      let scoreMyBrand = this.values[id].myBrand,
          scoreBrandB  = this.values[id].brandB,
          scoreBrandC  = this.values[id].brandC,
          diffB        = scoreBrandB - scoreMyBrand,
          diffC        = scoreBrandC - scoreMyBrand;

      diffs[id] = { b: diffB, c: diffC };
      maxDiff   = Math.max(maxDiff, Math.abs(diffB), Math.abs(diffC));

      let $inputsMyBrand = $(`${this.selector} .wrap-input table.drivers tr.${id} td.my-brand input`),
          $inputsBrandB  = $(`${this.selector} .wrap-input table.drivers tr.${id} td.brand-b input`),
          $inputsBrandC  = $(`${this.selector} .wrap-input table.drivers tr.${id} td.brand-c input`);

      $inputsMyBrand.val(scoreMyBrand);
      $inputsBrandB.val(scoreBrandB);
      $inputsBrandC.val(scoreBrandC);

    });

    const diffToPerc = d3.scaleLinear()
      .domain([ -maxDiff, maxDiff ])
      .range([ -1, 1 ]);

    Object.keys(diffs).forEach((id) => {

      let percB = diffToPerc(diffs[id].b),
          percC = diffToPerc(diffs[id].c);

      this.thermostats[id].updateItem('brandB', percB);
      this.thermostats[id].updateItem('brandC', percC);

    })

  }

}

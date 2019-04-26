
import style from './styles/style.scss';

import VisBxp from './vis/VisBxp';
import VisBxpSplit from './vis/VisBxpSplit';
import VisBxpSplitVsComp from './vis/VisBxpSplitVsComp';
import VisBxpVsCateg from './vis/VisBxpVsCateg';
import VisBxpVsComp from './vis/VisBxpVsComp';
import Vis16Drivers from './vis/Vis16Drivers';

import SAMPLE_DATA_SUMMARY from './data/sample_SubscriptSummary.json';
import SAMPLE_DATA_DRIVERS from './data/sample_brandDriversGet.json';

(function($) {

  let vis = [
    new VisBxp('#vis-bxp', SAMPLE_DATA_SUMMARY),
    new VisBxpVsCateg('#vis-bxp-vs-categ', SAMPLE_DATA_SUMMARY),
    new VisBxpVsComp('#vis-bxp-vs-comp', SAMPLE_DATA_SUMMARY),
    new VisBxpSplit('#vis-bxp-split', SAMPLE_DATA_SUMMARY),
    new VisBxpSplitVsComp('#vis-bxp-split-vs-comp', SAMPLE_DATA_SUMMARY),
    new Vis16Drivers('#vis-16-drivers', SAMPLE_DATA_SUMMARY)
  ];

})(jQuery)

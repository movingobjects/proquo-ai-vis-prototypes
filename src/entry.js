
import style from './styles/style.scss';

import VisBxp from './vis/VisBxp';
import VisBxpVsCategAvg from './vis/VisBxpVsCategAvg';
import VisBxpVsComp from './vis/VisBxpVsComp';
import VisBxpOverTime from './vis/VisBxpOverTime';

import VisBxpSplit from './vis/VisBxpSplit';
import VisBxpSplitVsCategAvg from './vis/VisBxpSplitVsCategAvg';
import VisBxpSplitVsComp from './vis/VisBxpSplitVsComp';

import Vis16Drivers from './vis/Vis16Drivers';
import Vis16DriversByImportance from './vis/Vis16DriversByImportance';
import Vis16DriversVsCategAvg from './vis/Vis16DriversVsCategAvg';
import Vis16DriversVsComp from './vis/Vis16DriversVsComp';

import SAMPLE_DATA_SUMMARY from './data/sample_SubscriptSummary.json';
import SAMPLE_DATA_DRIVERS from './data/sample_brandDriversGet.json';

(function($) {

  let vis = [
    new VisBxp('#vis-bxp', SAMPLE_DATA_SUMMARY),
    new VisBxpVsCategAvg('#vis-bxp-vs-categ-avg', SAMPLE_DATA_SUMMARY),
    new VisBxpVsComp('#vis-bxp-vs-comp', SAMPLE_DATA_SUMMARY),
    new VisBxpOverTime('#vis-bxp-over-time', SAMPLE_DATA_SUMMARY),
    new VisBxpSplit('#vis-bxp-split', SAMPLE_DATA_SUMMARY),
    new VisBxpSplitVsCategAvg('#vis-bxp-split-vs-categ-avg', SAMPLE_DATA_SUMMARY),
    new VisBxpSplitVsComp('#vis-bxp-split-vs-comp', SAMPLE_DATA_SUMMARY),
    new Vis16Drivers('#vis-16-drivers', SAMPLE_DATA_SUMMARY),
    new Vis16DriversByImportance('#vis-16-drivers-by-importance', SAMPLE_DATA_SUMMARY),
    new Vis16DriversVsCategAvg('#vis-16-drivers-vs-categ-avg', SAMPLE_DATA_SUMMARY),
    new Vis16DriversVsComp('#vis-16-drivers-vs-comp', SAMPLE_DATA_SUMMARY)
  ];

})(jQuery)

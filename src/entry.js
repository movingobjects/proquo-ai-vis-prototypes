
import style from './styles/style.scss';

import Bxp from './vis/Bxp';
import BxpVsCategory from './vis/BxpVsCategory';
import BxpVsCompetition from './vis/BxpVsCompetition';
import BxpSplit from './vis/BxpSplit';
import BxpSplitVsCompetition from './vis/BxpSplitVsCompetition';

import SAMPLE_DATA_SUMMARY from './data/sample_SubscriptSummary.json';
import SAMPLE_DATA_DRIVERS from './data/sample_brandDriversGet.json';

(function($) {

  let vis = [
    new Bxp('section#vis-bxp', SAMPLE_DATA_SUMMARY),
    new BxpVsCategory('section#vis-bxp-vs-category', SAMPLE_DATA_SUMMARY),
    new BxpVsCompetition('section#vis-bxp-vs-competition', SAMPLE_DATA_SUMMARY),
    new BxpSplit('section#vis-bxp-split', SAMPLE_DATA_SUMMARY),
    new BxpSplitVsCompetition('section#vis-bxp-split-vs-competition', SAMPLE_DATA_SUMMARY)
  ];

})(jQuery)

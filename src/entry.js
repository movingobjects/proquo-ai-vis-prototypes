
import style from './styles/style.scss';

import Bxp from './vis/Bxp';
import BxpVsCompetition from './vis/BxpVsCompetition';
import BxpSplit from './vis/BxpSplit';
import BxpSplitVsCompetition from './vis/BxpSplitVsCompetition';

(function($) {

  let vis = [
    new Bxp('section#vis-bxp'),
    new BxpVsCompetition('section#vis-bxp-vs-competition'),
    new BxpSplit('section#vis-bxp-split'),
    new BxpSplitVsCompetition('section#vis-bxp-split-vs-competition')
  ];

})(jQuery)

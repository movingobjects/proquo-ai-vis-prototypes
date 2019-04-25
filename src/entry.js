
import style from './styles/style.scss';

import Bxp from './vis/Bxp';
import BxpSplit from './vis/BxpSplit';
import BxpSplitCompetition from './vis/BxpSplitCompetition';

(function($) {

  let vis = [
    new Bxp('section#vis-bxp'),
    new BxpSplit('section#vis-bxp-split'),
    new BxpSplitCompetition('section#vis-bxp-split-competition')
  ];

})(jQuery)

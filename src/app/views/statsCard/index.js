// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../../redux/modules/actions';
import StatsCard              from './statsCard';

const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,
    status:       state.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        enterStatsCard: actions.enterStatsCard,
        leaveStatsCard: actions.leaveStatsCard
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsCard);

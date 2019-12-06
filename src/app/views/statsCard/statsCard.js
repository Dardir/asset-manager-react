// @flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  Panel,
  StatsCard as StatsCardComponent
}                         from '../../components';
import DatePicker from 'react-datepicker';


class StatsCard extends PureComponent {
  componentWillMount() {
    const { actions: { enterStatsCard } } = this.props;
    enterStatsCard();
  }

  componentWillUnmount() {
    const { actions: { leaveStatsCard } } = this.props;
    leaveStatsCard();
  }

  render() {
    const { status } = this.props;
    return(
      <AnimatedView>
        {/* preview: */}
        <div className="row">
          <div className="col-xs-12">
            <Panel
              title="Totals"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}>
              <div className="row">
                <div className="col-md-4 form-group">
                  <label
                    htmlFor="fromDate"
                    className="control-label has-blue">
                    <font color="blue">
                      From
                    </font>
                  </label>
                  <DatePicker className="form-control" id="startDate"/>
                </div>
                
                <div className="col-md-4 form-group">
                  <label
                    htmlFor="toDate"
                    className="control-label has-blue">
                    <font color="blue">
                      To
                    </font>
                  </label>
                  <DatePicker className="form-control" id="toDate"/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 form-group"/>
                <div className="col-md-3 form-group"/>
                <div className="col-md-3 form-group"/>
              </div>
              <div className="row">
                {
                  status.map(
                    (sts, stsIndex) => {
                      return (
                        <div className="col-md-3" key={stsIndex}>
                          <StatsCardComponent
                            statValue={sts.statValue} 
                            statLabel={sts.statLabel} 
                            icon={<i className={sts.iconClass} />}
                            backColor={sts.backColor}
                          />
                        </div>                                                 
                      );
                    }
                  )
                }
              </div>
            </Panel>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

StatsCard.propTypes= {
  actions: PropTypes.shape({
    enterStatsCard: PropTypes.func.isRequired,
    leaveStatsCard: PropTypes.func.isRequired
  })
};

export default StatsCard;

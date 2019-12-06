// @flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  Panel,
  Alert as AlertComponent
}                         from '../../components';


class AlertView extends PureComponent {
  static propTypes= {
    actions: PropTypes.shape({
      enterAlert: PropTypes.func.isRequired,
      leaveAlert: PropTypes.func.isRequired
    })
  };

  componentWillMount() {
    const { actions: { enterAlert } } = this.props;
    enterAlert();
  }

  componentWillUnmount() {
    const { actions: { leaveAlert } } = this.props;
    leaveAlert();
  }

  render() {
    const { notifications } = this.props;
    return(
      <AnimatedView>
        {/* preview: */}
        <div className="row">
          <div className="col-xs-12">
            <Panel
              title="Notifications"
              hasTitle={true}>
              {
                notifications.map(
                  (notif, notifIndex) => {
                    return (
                      <AlertComponent type={notif.type} key={notifIndex} >
                        <strong>
                          {notif.header}
                        </strong>
                        {notif.main}
                      </AlertComponent>
                    );
                  }
                )
              }
              
            </Panel>
          </div>
        </div>
        
      </AnimatedView>
    );
  }
}

export default AlertView;

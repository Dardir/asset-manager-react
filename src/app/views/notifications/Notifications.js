// @flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  Panel,
  NotificationPanel,
  Notification
}                         from '../../components';


class Notifications extends PureComponent {
  static propTypes= {
    actions: PropTypes.shape({
      enterNotifications: PropTypes.func.isRequired,
      leaveNotifications: PropTypes.func.isRequired,
      notifications: PropTypes.array.isRequired
    })
  };

  componentWillMount() {
    const { actions: { enterNotifications } } = this.props;
    enterNotifications();
  }

  componentWillUnmount() {
    const { actions: { leaveNotifications } } = this.props;
    leaveNotifications();
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
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}>
              <div className="row">
                <div className="col-md-4 col-md-offset-4">

                  <NotificationPanel title="notifications">
                    {
                      notifications.map(
                        (notif, notifIndex) => {
                          return (
                            <Notification type={notif.type} key={notifIndex} >
                              <span>
                                <strong>
                                  {notif.header}
                                </strong>
                                {notif.main}
                              </span>
                            </Notification>
                          );
                        }
                      )
                    }

                  </NotificationPanel>

                </div>
              </div>
            </Panel>
          </div>
        </div>
        
      </AnimatedView>
    );
  }
}

export default Notifications;

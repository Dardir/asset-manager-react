// @flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  Panel,
  TeamMates,
  TeamMember,
  TeamMateAddButton
}                         from '../../components';


class TeamMatesView extends PureComponent {
  enterAnimationTimer = null;

  componentWillMount() {
    const { actions: { enterTeamMatesView } } = this.props;
    enterTeamMatesView();
  }

  componentWillUnmount() {
    const { actions: { leaveTeamMatesView } } = this.props;
    leaveTeamMatesView();
    clearTimeout(this.enterAnimationTimer);
  }

  render() {
    const { members } = this.props;

    return(
      <AnimatedView>
        {/* preview: */}
        <div className="row">
          <div className="col-xs-12">
            <Panel
              hasTitle={true}
              title={'Members'}>
              <TeamMates>
                {
                  members.map(
                    (member, memberIndex) => {
                      return (
                        <TeamMember
                          key={memberIndex}
                          picture={member.picture}
                          firstname={member.firstname}
                          lastname={member.lastname}
                          profile={member.profile}
                          profileColor={member.profileColor}
                        />
                      );
                    }
                  )
                }
              </TeamMates>
              <TeamMateAddButton />
            </Panel>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

TeamMatesView.propTypes= {
  actions: PropTypes.shape({
    enterTeamMatesView: PropTypes.func.isRequired,
    leaveTeamMatesView: PropTypes.func.isRequired
  })
};

export default TeamMatesView;

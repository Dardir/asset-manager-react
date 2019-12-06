// @flow weak

import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import earningGraph         from './earningGraph';
import sideMenu             from './sideMenu';
import userInfos            from './userInfos';
import teamMates            from './teamMates';
import views                from './views';
import equipments           from './equipments';
import equipmentTree        from  './equipmentTree';
import siteTree             from  './siteTree';
import equipmentTypes       from './equipmentTypes';
import regionTypes          from './regionTypes';
import companies            from './companies';
import sites                from './sites';
import incidentTypes        from './incidentTypes';
import incidents            from './incidents';
import carTypes             from './carTypes';
import colors               from './colors';
import months               from './months';
import trainings            from './trainings';
import trainingTypes        from './trainingTypes';
import members              from './members';
import notifications        from './notifications';
import status               from './status';
import equipmentInstances   from './equipmentInstances';
import preventiveMaintenances from './preventiveMaintenances';
import correctiveMaintenances from './correctiveMaintenances';
import maintenancePlans     from    './maintenancePlans';

export const reducers = {
  earningGraph,
  sideMenu,
  userInfos,
  teamMates,
  views,
  equipments,
  equipmentTypes,
  regionTypes,
  companies,
  sites,
  incidentTypes,
  incidents,
  carTypes,
  colors,
  months,
  trainings,
  trainingTypes,
  members,
  notifications,
  status,
  equipmentTree,
  siteTree,
  equipmentInstances,
  preventiveMaintenances,
  correctiveMaintenances,
  maintenancePlans
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});

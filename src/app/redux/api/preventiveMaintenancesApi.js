import axios from 'axios';
import moment from 'moment';

export function getPreventiveMaintenancesOfTypeApi(maintenanceType) {
  //should be replaced by actual call to BE using axios framework
  return [
    {
      id: guid(),
      typeId: '12',
      date: moment(),
      location: 'Cairo',
      responsible: 'Person1',
      notes: '',
      instanceId: '13345'
    }
  ];


}


export function getAllPreventiveMaintenancesApi() {
  //should be replaced by actual call to BE using axios framework
  return [
    {
      id: guid(),
      typeId: '12',
      date: moment(),
      location: 'Cairo',
      responsible: 'Person1',
      notes: '',
      instanceId: '13345'
    },
    {
      id: guid(),
      typeId: '13',
      date: moment(),
      location: 'Ras Ghareb',
      responsible: 'Person2',
      notes: '',
      instanceId: '13345'
    }
  ];


}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}





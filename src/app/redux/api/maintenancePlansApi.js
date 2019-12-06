import axios from 'axios';

export function getMaintenancePlansApi(departmentId) {
  //should be replaced by actual call to BE using axios framework
  return [
    {
      id: '12',
      period: 3,
      units: 'Months',
      duration: 1,
      durationUnit: 'Days',
      description: 'Change Conveyors',
      departmentId: '3443',
      role: '',
      status: 'Not Done',
      equipmentTypeId:'225'
    },
    {
      id: '13',
      period: 1,
      units: 'Months',
      duration: 1,
      durationUnit: 'Days',
      description: 'Change Oil',
      departmentId: '3443',
      role: '',
      status: 'Not Done',
      equipmentTypeId:'225'
    }
  ];
  
}


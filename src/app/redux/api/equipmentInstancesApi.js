import axios from 'axios';

export function getEquipmentInstancesApi() {
  //should be replaced by actual call to BE using axios framework
  return [
    {
      id: guid(),
      isActive : true,
      typeId:'225'
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



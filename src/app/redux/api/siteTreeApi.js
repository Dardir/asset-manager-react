import axios from 'axios';

export function getSiteTreeApi() {
  return {treeData :[{ title: 'Site1', locKey:guid(), expanded: true, children: [{ title: 'Location1', locKey:'3443' }] }]};
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

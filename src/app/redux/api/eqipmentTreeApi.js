import axios from 'axios';

export function getEquipmentTreeApi() {
  return { treeData: [{ title: 'Heater', eqTypeKey: '225', equipmentTypeInfo: { properties: [], general: { isConsumable: false, threshold: '', applicableForMaintenance: false, unit: '' }, maintenance: { period: 1, units: '', duration: 1, durationUnit: '', isDeactivated: false, sendNotificationIfThreshold: false } }, expanded: true, children: [{ title: 'Fan', equipmentTypeInfo: { properties: [], general: { isConsumable: false, threshold: '', applicableForMaintenance: false, unit: '' }, maintenance: { period: 1, units: '', duration: 1, durationUnit: '', isDeactivated: false, sendNotificationIfThreshold: false } }, eqTypeKey: guid() }] }] };
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

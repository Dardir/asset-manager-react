import { fork } from 'redux-saga/effects';
import {watchRetrieveSiteTree} from './sitesSaga';
import {watchRetrieveEquipmentTree} from './EquipmentTypeSaga';
import {watchRetrieveMaintenancePlans} from './maintenancePlansSaga'
import {watchRetrievePreventiveMaintenancesOfType,watchRetrievePreventiveMaintenances} from './preventiveMaintenancesSaga'
import {watchRetrieveEquipmentInstances} from './equipmentInstancesSaga'

export default function* root() { 
  yield [
    fork(watchRetrieveSiteTree),
    fork(watchRetrieveEquipmentTree),
    fork(watchRetrieveMaintenancePlans),
    fork(watchRetrievePreventiveMaintenancesOfType),
    fork(watchRetrieveEquipmentInstances),
    fork(watchRetrievePreventiveMaintenances)
  ];
}

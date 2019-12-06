const ADD_PREVENTIVE_MAINTENANCE = 'ADD_PREVENTIVE_MAINTENANCE';
const FILTER_PREVENTIVE_MAINTENANCE = 'FILTER_PREVENTIVE_MAINTENANCE';
const CLEAR_FILTERED_PREVENTIVE_MAINTENANCES = 'CLEAR_FILTERED_PREVENTIVE_MAINTENANCES';
const UPDATE_PREVENTIVE_MAINTENANCE_INSTANCE = 'UPDATE_PREVENTIVE_MAINTENANCE_INSTANCE';
export const SGRD_RETRIEVE_PREVENTIVE_MAINTENANCE_OF_TYPE = 'SGRD_RETRIEVE_PREVENTIVE_MAINTENANCE_OF_TYPE';
const SET_PREVENTIVE_MAINTENANCES = 'SET_PREVENTIVE_MAINTENANCES';
const RETRIEVE_PREVENTIVE_MAINTENANCES_FAILED = 'RETRIEVE_PREVENTIVE_MAINTENANCES_FAILED';
export const SGRD_RETRIEVE_ALL_PREVENTIVE_MAINTENANCE = 'SGRD_RETRIEVE_ALL_PREVENTIVE_MAINTENANCE';


export default function preventiveMaintenances(state = {allinstances:[], filteredInstances:[]}, action) {
  switch (action.type) {
  case ADD_PREVENTIVE_MAINTENANCE:
    let allinstances = state.allinstances;
    allinstances.push(action.data);
    return {...state, allinstances:allinstances};
  case FILTER_PREVENTIVE_MAINTENANCE:
    let filteredInstances = state.allinstances.filter((maintenance)=>maintenance.instanceId === action.eqInstId);
    return {...state, filteredInstances:filteredInstances };
  case CLEAR_FILTERED_PREVENTIVE_MAINTENANCES:
    return {...state, filteredInstances:[]};
  case UPDATE_PREVENTIVE_MAINTENANCE_INSTANCE: {
    let updatedInstances = state.allinstances.map((instance)=>{
      if(instance.id === action.maintenanceInst.id) {
        return action.instance;
      }else{
        return instance;
      }
    });
    return {...state, allinstances: updatedInstances};
  }
  case SET_PREVENTIVE_MAINTENANCES:
    return {...state,allinstances:action.maintenances}
  default: return state;
  }
}

export function savePreventiveMaintenance(preventiveMaintenance) {
  return {
    type:         ADD_PREVENTIVE_MAINTENANCE,
    data:  preventiveMaintenance
  };
}

export function filterPreventiveMaintenance(eqInstId) {
  return{
    type: FILTER_PREVENTIVE_MAINTENANCE,
    eqInstId
  };
}

export function clearFilteredPreventiveMaintenances() {
  return{
    type: CLEAR_FILTERED_PREVENTIVE_MAINTENANCES
  };
}

export function updatePreventiveMaintenanceInstance(maintenanceInst) {
  return {
    type:         UPDATE_PREVENTIVE_MAINTENANCE_INSTANCE,
    maintenanceInst
  };
}


export function retrievePreventiveMaintenancesOfType(maintenanceType){
  return {
    type:         SGRD_RETRIEVE_PREVENTIVE_MAINTENANCE_OF_TYPE,
    maintenanceType
  };
}

export function retrievePreventiveMaintenances(){
  return {
    type:         SGRD_RETRIEVE_ALL_PREVENTIVE_MAINTENANCE
  };
}

export function setPreventiveMaintenances(maintenances){
  return {
    type:        SET_PREVENTIVE_MAINTENANCES,
    maintenances
  };
}

export function retrievePreventiveMaintenancesFailed(error){
  return {
    type:        RETRIEVE_PREVENTIVE_MAINTENANCES_FAILED,
    error
  };
}







const ADD_CORRECTIVE_MAINTENANCE = 'ADD_CORRECTIVE_MAINTENANCE';
const FILTER_CORRECTIVE_MAINTENANCE = 'FILTER_CORRECTIVE_MAINTENANCE';
const CLEAR_FILTERED_CORRECTIVE_MAINTENANCES = 'CLEAR_FILTERED_CORRECTIVE_MAINTENANCES';
const UPDATE_CORRECTIVE_MAINTENANCE_INSTANCE = 'UPDATE_CORRECTIVE_MAINTENANCE_INSTANCE';


export default function correctiveMaintenances(state = {allinstances:[], filteredInstances:[]}, action) {
  switch (action.type) {
  case ADD_CORRECTIVE_MAINTENANCE:
    let allinstances = state.allinstances;
    allinstances.push(action.data);
    return {...state, allinstances:allinstances};
  case FILTER_CORRECTIVE_MAINTENANCE:
    let filteredInstances = state.allinstances.filter((maintenance)=>maintenance.instanceId === action.eqInstId);
    return {...state, filteredInstances:filteredInstances };
  case CLEAR_FILTERED_CORRECTIVE_MAINTENANCES:
    return {...state, filteredInstances:[]};
  case UPDATE_CORRECTIVE_MAINTENANCE_INSTANCE: {
    let updatedInstances = state.allinstances.map((instance)=>{
      if(instance.id === action.maintenanceInst.id) {
        return action.instance;
      }else{
        return instance;
      }
    });
    return {...state, allinstances: updatedInstances};
  }
  default: return state;
  }
}

export function saveCorrectiveMaintenance(correctiveMaintenance) {
  return {
    type:         ADD_CORRECTIVE_MAINTENANCE,
    data:  correctiveMaintenance
  };
}

export function filterCorrectiveMaintenance(eqInstId) {
  return{
    type: FILTER_CORRECTIVE_MAINTENANCE,
    eqInstId
  };
}
  
export function clearFilteredCorrectiveMaintenances() {
  return{
    type: CLEAR_FILTERED_CORRECTIVE_MAINTENANCES
  };
}
  
export function updateCorrectiveMaintenanceInstance(maintenanceInst) {
  return {
    type:         UPDATE_CORRECTIVE_MAINTENANCE_INSTANCE,
    maintenanceInst
  };
}

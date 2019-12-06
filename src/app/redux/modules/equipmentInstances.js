const ADD_EQUIPMENT_INSTANCE = 'ADD_EQUIPMENT_INSTANCE';
const FILTER_INSTANCE_OF_TYPE = 'FILTER_INSTANCE_OF_TYPE';
const CLEAR_FILTERED_INSTANCES = 'CLEAR_FILTERED_INSTANCES';
const UPDATE_EQUIPMENT_INSTANCE = 'UPDATE_EQUIPMENT_INSTANCE';
export const SGRD_RETRIEVE_EQUIPMENT_INSTANCES = 'SGRD_RETRIEVE_EQUIPMENT_INSTANCES';
const SET_EQUIPMENT_INSTANCES = 'SET_EQUIPMENT_INSTANCES';
const RETRIEVE_EQUIPMENT_INSTANCES_FAILED = 'RETRIEVE_EQUIPMENT_INSTANCES_FAILED';


export default function equipmentInstances(state = {allinstances:[], filteredInstances:[]}, action) {
  switch (action.type) {
  case ADD_EQUIPMENT_INSTANCE:
    let allinstances = state.allinstances;
    allinstances.push(action.data);
    return {...state, allinstances:allinstances};
  case FILTER_INSTANCE_OF_TYPE:
    let filteredInstances = state.allinstances.filter((instance)=>instance.typeId === action.typeId);
    return {...state, filteredInstances:filteredInstances };
  case CLEAR_FILTERED_INSTANCES:
    return {...state, filteredInstances:[]};
  case UPDATE_EQUIPMENT_INSTANCE: {
    let updatedInstances = state.allinstances.map((instance)=>{
      if(instance.id === action.instance.id) {
        return action.instance;
      }else{
        return instance;
      }
    });
    return {...state, allinstances: updatedInstances};
  }
  case SET_EQUIPMENT_INSTANCES:
    return {...state,allinstances:action.instances};
  default: return state;
  }
}

export function saveEquipmentInstance(data) {
  return {
    type:         ADD_EQUIPMENT_INSTANCE,
    data
  };
}

export function filterInstancesOfType(typeId) {
  return{
    type: FILTER_INSTANCE_OF_TYPE,
    typeId
  };
}

export function clearFilteredInstances() {
  return{
    type: CLEAR_FILTERED_INSTANCES
  };
}

export function updateEquipmentInstance(instance) {
  return {
    type:         UPDATE_EQUIPMENT_INSTANCE,
    instance
  };
}

export function retrieveEquipmentInstances() {
  return {
    type:         SGRD_RETRIEVE_EQUIPMENT_INSTANCES
  };
}

export function setEquipmentInstances(instances) {
  return {
    type:         SET_EQUIPMENT_INSTANCES,
    instances
  };
}

export function retrieveEquipmentInstancesFailed(error) {
  return {
    type:         RETRIEVE_EQUIPMENT_INSTANCES_FAILED,
    error
  };
}





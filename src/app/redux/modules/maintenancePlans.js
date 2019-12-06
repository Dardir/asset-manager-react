const ADD_MAINTENANCE_PLAN = 'ADD_MAINTENANCE_PLAN';
const FILTER_PLAN_OF_INSTANCE = 'FILTER_PLAN_OF_INSTANCE';
const CLEAR_FILTERED_PLANS = 'CLEAR_FILTERED_PLANS';
const UPDATE_MAINTENANCE_PLAN = 'UPDATE_MAINTENANCE_PLAN';
const SET_MAINTENANCE_PLANS = 'SET_MAINTENANCE_PLANS';
const RETREIVE_MAINTENANCE_PLANS_FAILED = 'RETREIVE_MAINTENANCE_PLANS_FAILED';
export const SGRD_RETREIVE_MAINTENANCE_PLANS = 'SGRD_RETREIVE_MAINTENANCE_PLANS'


export default function maintenancePlans(state = {allPlans:[], filteredPlans:[]}, action) {
  switch (action.type) {
  case ADD_MAINTENANCE_PLAN:
    let allPlans = state.allPlans;
    allPlans.push(action.data);
    return {...state, allPlans:allPlans};
  case FILTER_PLAN_OF_INSTANCE:
    let filteredPlans = state.allPlans.filter((plan)=>plan.instanceId === action.instanceId);
    return {...state, filteredPlans:filteredPlans };
  case CLEAR_FILTERED_PLANS:
    return {...state, filteredPlans:[]};
  case UPDATE_MAINTENANCE_PLAN: {
    let updatedPlans = state.allPlans.map((plan)=>{
      if(plan.id === action.plan.id) {
        return action.plan;
      }else{
        return plan;
      }
    });
    return {...state, allPlans: updatedPlans};
  }
  case SET_MAINTENANCE_PLANS:
    return {...state, allPlans:action.plans}
  default: return state;
  }
}

export function saveMaintenancePlan(data) {
  return {
    type:         ADD_MAINTENANCE_PLAN,
    data
  };
}

export function filterPlanOfInstance(typeId) {
  return{
    type: FILTER_PLAN_OF_INSTANCE,
    typeId
  };
}

export function clearfilteredPlans() {
  return{
    type: CLEAR_FILTERED_PLANS
  };
}

export function updateMaintenancePlan(plan) {
  return {
    type:         UPDATE_MAINTENANCE_PLAN,
    plan
  };
}

export function retrieveMaintenancePlans(departmentId) {
  return {
    type:         SGRD_RETREIVE_MAINTENANCE_PLANS,
    departmentId
  };
}

export function retrieveMaintenancePlansFailed(error) {
  return {
    type:         RETREIVE_MAINTENANCE_PLANS_FAILED,
    error
  };
}

export function setMaintenancePlans(plans) {
  return {
    type:         SET_MAINTENANCE_PLANS,
    plans
  };
}


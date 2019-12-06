const ADD_INCIDENT = 'ADD_INCIDENT';


export default function incidents(state = [], action) {
  switch (action.type) {
  case ADD_INCIDENT:
    return [...state, action.payload]
  default: return state;
  }
}

export function saveIncident(incident) {
  return {
    type:         ADD_INCIDENT,
    payload:  incident
  };
}
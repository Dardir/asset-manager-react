const ADD_EQUIPMENT = 'ADD_EQUIPMENT';


export default function equipments(state = [], action) {
  switch (action.type) {
  case ADD_EQUIPMENT:
    return [...state,action.payload]
  default: return state;
  }
}

export function saveEquipment(equiment) {
  return {
    type:         ADD_EQUIPMENT,
    payload:  equiment
  };
}
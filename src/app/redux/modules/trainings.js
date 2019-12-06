const ADD_TRAINING = 'ADD_TRAINING';


export default function trainings(state = [], action) {
  switch (action.type) {
  case ADD_TRAINING:
    return [...state, action.payload]
  default: return state;
  }
}

export function saveTraining(training) {
  return {
    type:         ADD_TRAINING,
    payload:  training
  };
}
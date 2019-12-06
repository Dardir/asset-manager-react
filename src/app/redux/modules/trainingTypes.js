export default function trainingTypes(state = [], action) {
  const trnTypes = [{
    key : 1,
    value : 'Medics'
  },
  {
    key : 2,
    value : 'Crisis Management'
  },
  {
    key : 3,
    value : 'Inspections'
  },
  {
    key : 4,
    value : 'Technical'
  }
  ];   
  return trnTypes;
}

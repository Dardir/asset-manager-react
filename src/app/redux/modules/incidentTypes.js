export default function incidentTypes(state = [], action) {
  const incTypes = [{
    key : 1,
    value : 'Site incident'
  },
  {
    key : 2,
    value : 'Vehicle incident'
  },
  {
    key : 3,
    value : 'Fire incident'
  },
  {
    key : 4,
    value : 'Chemicals burning'
  },
  {
    key : 5,
    value : 'Oil leakage'
  }
  ];   
  return incTypes;
}

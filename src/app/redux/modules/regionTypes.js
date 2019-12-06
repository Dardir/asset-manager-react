export default function regionTypes(state = [], action) {
  const regTypes = [{
    key : 1,
    value : 'North'
  },
  {
    key : 2,
    value : 'South'
  },
  {
    key : 3,
    value : 'West'
  },
  {
    key : 4,
    value : 'East'
  },
  {
    key : 5,
    value : 'Suez Gulf'
  }
  ];   
  return regTypes;
}

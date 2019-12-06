export default function carTypes(state = [], action) {
  const vehicleTypes = [
    {
      key : 1,
      value : 'Heavy Vehicle'
    },
    {
      key : 2,
      value : 'Light Vehicle'
    }
  ];   
  return vehicleTypes;
}

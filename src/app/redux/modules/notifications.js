export default function notifications(state = [], action) {
  const not = [{
    type : 'danger',
    header : 'Transfer Request! ',
    main: 'Mohamed Abdel Razeq from site: site1 of company Scimitar has requested a transfer of ambulance from your site'
  },
  {
    type : 'success',
    header : 'Transfer done! ',
    main: 'You have successfully transferred an abmulance from your site to site: site1 of Scimitar company'
  },
  {
    type : 'info',
    header : 'Equipment Added! ',
    main: 'An ambulance equipment has been successfully added by you'
  },
  {
    type : 'warning',
    header : 'Warning! ',
    main: 'You have not enough fire distinguisher equipments in your site'
  }
  ];   
  return not;
}

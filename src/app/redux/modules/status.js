export default function status(state = [], action) {
  const st = [{
    statValue : '134',
    statLabel : 'Total Equipments',
    iconClass: 'fa fa-gears',
    backColor:'green'
  },
  {
    statValue : '54',
    statLabel : 'Total Trainings',
    iconClass: 'fa fa-pencil-square',
    backColor:'violet'
  },
  {
    statValue : '12',
    statLabel : 'Total Incidents',
    iconClass: 'fa fa-fire',
    backColor:'red'
  }
  ];   
  return st;
}

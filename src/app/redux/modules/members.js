export default function members(state = [], action) {
  const mem = [
    {
      firstname:    'Adham',
      lastname:     'Sabry',
      profile:      'Site Manager',
      profileColor: 'danger'
    },
    {
      firstname:    'Mohamed',
      lastname:     'Abdel Razeq',
      profile:      'Safety Manager',
      profileColor: 'success'
    },
    {
      firstname:    'Mona',
      lastname:     'Magdy',
      profile:      'Safety Engineer',
      profileColor: 'warning'
    },
    {
      firstname:    'Hassan',
      lastname:     'Ali',
      profile:      'Safety Engineer',
      profileColor: 'warning'
    }
  ];   
  return mem;
}

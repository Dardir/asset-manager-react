export const navigation = {
  brand:      'reactDirectorAdmin',
  leftLinks:  [],
  rightLinks: [
    {
      label:      'Home',
      link:       '/',
      view:       'home',
      isRouteBtn: true
    },
    {
      label:      'About',
      link:       '/about',
      view:       'about',
      isRouteBtn: true
    }
  ],
  sideMenu: [
    // Site Menu
    {
      id: 1,
      group: 'Sites',
      menus: [
        {
          name: 'Sites & Locations',
          linkTo: '/siteTree',
          faIconName: 'fa-building'
        }
      ]
    },
    // // Company Menu
    // {
    //   id: 1,
    //   group: 'Company',
    //   menus: [
    //     {
    //       name: 'Company Profile',
    //       linkTo: '/companyProfile',
    //       faIconName: 'fa-building'
    //     }
    //   ]
    // },
    // Equipment Menu
    {
      id: 2,
      group: 'Equpments',
      menus: [
        {
          name: 'Equipment Types',
          linkTo: '/equipmentTree',
          faIconName: 'fa-cogs'
        },
        // {
        //   name: 'Add Equipment',
        //   linkTo: '/addEquipment',
        //   faIconName: 'fa-plus-circle'
        // },
        // {
        //   name: 'Import Equipment',
        //   linkTo: '/importEquipment',
        //   faIconName: 'fa-arrow-right'
        // },
        // {
        //   name: 'Remove Equipment',
        //   linkTo: '/removeEquipment',
        //   faIconName: 'fa-trash'
        // },
        // {
        //   name: 'Search Equipment',
        //   linkTo: '/searchEquipment',
        //   faIconName: 'fa-search'
        // },
        {
          name: 'Equipment Instances',
          linkTo: '/equipmentInstances',
          faIconName: 'fa-object-ungroup'
        },
        // {
        //   name: 'Transfer Equipment',
        //   linkTo: '/transferEquipment',
        //   faIconName: 'fa-plane'
        // }
      ]
    },
    // Maintenance Menu
    {
      id: 3,
      group: 'Maintenance',
      menus: [
        {
          name: 'Maintenance Plans',
          linkTo: '/maintenancePlans',
          faIconName: 'fa-calendar'
        },
        {
          name: 'Preventive',
          linkTo: '/preventiveMaintenances',
          faIconName: 'fa-clock-o'
        },
        {
          name: 'Corrective',
          linkTo: '/correctiveMaintenances',
          faIconName: 'fa-wrench'
        }
      ]
    },
    // // Trainings Menu
    // {
    //   id: 3,
    //   group: 'Trainings',
    //   menus: [
    //     {
    //       name: 'Add Training',
    //       linkTo: '/addTraining',
    //       faIconName: 'fa-plus-circle'
    //     },
    //     {
    //       name: 'Import Training',
    //       linkTo: '/importTraining',
    //       faIconName: 'fa-arrow-right'
    //     },
    //     {
    //       name: 'Remove Training',
    //       linkTo: '/removeTraining',
    //       faIconName: 'fa-trash'
    //     },
    //     {
    //       name: 'Search Training',
    //       linkTo: '/searchTraining',
    //       faIconName: 'fa-search'
    //     },
    //     {
    //       name: 'Export Training',
    //       linkTo: '/exportTraining',
    //       faIconName: 'fa-arrow-left'
    //     }
    //   ]
    // },
    // // Inspection menu
    // {
    //   id: 4,
    //   group: 'Inspection',
    //   menus: [
    //     {
    //       name: 'Add Inspection',
    //       linkTo: '/addInspection',
    //       faIconName: 'fa-plus-circle'
    //     }
    //   ]
    // },
    // // Incidents menu
    // {
    //   id: 5,
    //   group: 'Incidents',
    //   menus: [
    //     {
    //       name: 'Add Incident',
    //       linkTo: '/addIncident',
    //       faIconName: 'fa-fire'
    //     },
    //     {
    //       name: 'Export Incident',
    //       linkTo: '/exportIncident',
    //       faIconName: 'fa-arrow-left'
    //     }
    //   ]
    // },
    // // Incidents menu
    // {
    //   id: 6,
    //   group: 'Emergency',
    //   menus: [
    //     {
    //       name: 'Record Emergency',
    //       linkTo: '/recordEmergency',
    //       faIconName: 'fa-camera'
    //     }
    //   ]
    // },
    // // Incidents menu
    // {
    //   id: 7,
    //   group: 'Safety Contacts',
    //   menus: [
    //     {
    //       name: 'Members',
    //       linkTo: '/Dashboard/teamMates',
    //       faIconName: 'fa-user'
    //     }
    //   ]
    // },
    // Dashboards menu
    {
      id: 8,
      group: 'Dashboards',
      menus: [
        // {
        //   name: 'Equipment Quantities',
        //   linkTo: '/Equipments/quantities',
        //   faIconName: 'fa-area-chart'
        // },
        {
          name: 'Preventive Maintenance',
          linkTo: '/prevMaint/occurrences',
          faIconName: 'fa-area-chart'
        },
        {
          name: 'Corrective Maintenance',
          linkTo: '/corMaint/occurrences',
          faIconName: 'fa-area-chart'
        }
        // ,
        // {
        //   name: 'Trainings',
        //   linkTo: '/Training/occurrences',
        //   faIconName: 'fa-area-chart'
        // },
        // {
        //   name: 'Notifications',
        //   linkTo: '/general/alerts',
        //   faIconName: 'fa-bell'
        // },
        // {
        //   name: 'Dashboard preview',
        //   linkTo: '/',
        //   faIconName: 'fa-area-chart'
        // },
        // {
        //   name: 'StatsCard',
        //   linkTo: '/Dashboard/statsCard',
        //   faIconName: 'fa-check-square-o'
        // }
        //,
        // {
        //   name: 'Work progress',
        //   linkTo: '/Dashboard/workProgress',
        //   faIconName: 'fa-briefcase'
        // },
        // {
        //   name: 'Twitter feed',
        //   linkTo: '/Dashboard/twitterFeed',
        //   faIconName: 'fa-twitter'
        // },
        // {
        //   name: 'Todo list',
        //   linkTo: '/Dashboard/todoList',
        //   faIconName: 'fa-check'
        // }
        // ,{
        //   name: 'Notifications',
        //   linkTo: '/Dashboard/notifications',
        //   faIconName: 'fa-bell'
        // }
      ]
    }// Settings menu
    ,{
      id: 4,
      group: 'Settings',
      menus: [
        {
          name: 'Notification Settings',
          linkTo: '/notSettings',
          faIconName: 'fa-envelope-open'
        },
    {
          name: 'Admin Settings',
          linkTo: '/adminSettings',
          faIconName: 'fa-cog'
        }
      ]
    }
    //,
    // group menu #2
    // ,{
    //   id: 9,
    //   group: 'General',
    //   menus: [
    //     {
    //       name: 'General preview',
    //       linkTo: '/general',
    //       faIconName: 'fa-eye'
    //     },
    //     {
    //       name: 'Breadcrumb',
    //       linkTo: '/general/breadcrumb',
    //       faIconName: 'fa-bars'
    //     },
    //     {
    //       name: 'Stat',
    //       linkTo: '/general/stat',
    //       faIconName: 'fa-bar-chart'
    //     },
    //     {
    //       name: 'Basic progress bars',
    //       linkTo: '/general/basicProgressBars',
    //       faIconName: 'fa-tasks'
    //     },
    //     {
    //       name: 'Tab panels',
    //       linkTo: '/general/tabPanels',
    //       faIconName: 'fa-columns'
    //     },
    //     {
    //       name: 'Striped progress bar',
    //       linkTo: '/general/stripedProgressBars',
    //       faIconName: 'fa-tasks'
    //     },
    //     {
    //       name: 'Pagination',
    //       linkTo: '/general/pagination',
    //       faIconName: 'fa-sort'
    //     },
    //     {
    //       name: 'Default buttons',
    //       linkTo: '/general/defaultButtons',
    //       faIconName: 'fa-hand-o-up'
    //     }
    //   ]
    // },
    // // group menu #3
    // ,{
    //   id: 10,
    //   group: 'BasicElements',
    //   menus: [
    //     {
    //       name: 'Basic Elements preview',
    //       linkTo: '/basicElements',
    //       faIconName: 'fa-eye'
    //     }
    //   ]
    // },
    // // group menu #4
    // {
    //   id: 11,
    //   group: 'SimpleTables',
    //   menus: [
    //     {
    //       name: 'Simple tables preview',
    //       linkTo: '/simpleTables',
    //       faIconName: 'fa-eye'
    //     }
    //   ]
    // }

    // Incidents menu
    // ,{
    //   id: 12,
    //   group: 'Reports',
    //   menus: [
    //     {
    //       name: 'Monthly Reports',
    //       linkTo: '/Reports/monthly',
    //       faIconName: 'fa-files-o'
    //     },
    //     {
    //       name: 'Yearly Reports',
    //       linkTo: '/Reports/yearly',
    //       faIconName: 'fa-files-o'
    //     }
    //   ]
    // }
  ]
};

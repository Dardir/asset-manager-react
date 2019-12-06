/* eslint no-process-env:0 */
import React                        from 'react';
import {
 Route,
 Switch,
 Redirect
}                                   from 'react-router-dom';
import HomeConnected                from '../views/home';
import AlertConnected               from '../views/alert';
import BasicElementsConnected       from '../views/basicElements';
import AddEquipmentConnected        from '../views/addEquipment';
import EquipmentTreeConnected       from '../views/equipmentTree';
import SiteTreeConnected            from '../views/siteTree';
import AddIncidentConnected         from '../views/addIncident';
import ExportIncidentConnected      from '../views/exportIncident';
import PreventiveMainntenancesConnected from '../views/preventiveMaintenances';
import MaintenancePlansConnected     from  '../views/maintenancePlans';
import CorrectiveMainntenancesConnected from '../views/correctiveMaintenances';
import EquipmentInstancesConnected  from '../views/equipmentInstances';
import BasicProgressBarConnected    from '../views/basicProgressBar';
import BreadcrumbViewConnected      from '../views/breadcrumb';
import EarningGraphConnected        from '../views/earningGraph';
import GeneralConnected             from '../views/general';
import NotificationsConnected       from '../views/notifications';
import PageNotFoundConnected        from '../views/pageNotFound';
import PaginationViewConnected      from '../views/pagination';
import SimpleTablesConnected        from '../views/simpleTables';
import StatViewConnected            from '../views/stat';
import StatsCardConnected           from '../views/statsCard';
import StripedProgressBarConnected  from '../views/stripedProgressBar';
import TabPanelConnected            from '../views/tabPanel';
import TeamMatesViewConnected       from '../views/teamMates';
import TodoListViewConnected        from '../views/todoList';
import TwitterFeedConnected         from '../views/twitterFeed';
import WorkProgressConnected        from '../views/workProgress';
import EquipmentQuantitiesReportConnected        from '../views/equipmentQttyReport';
import PrevMaintOccurrencesReportConnected        from '../views/prevMaintOccReport';
import CorMaintOccurrencesReportConnected        from '../views/corMaintOccReport';
import TrainingOccurrencesReportConnected        from '../views/trainingOccReport';
import AddTrainingConnected        from '../views/addTraining';
import ExportTrainingConnected     from '../views/exportTraining';


export const MainRoutes = () => (
  <Switch>
    <Route exact path="/" component={EquipmentTreeConnected} />

    <Route path="/Dashboard/statsCard" component={StatsCardConnected} />
    <Route path="/Dashboard/earningGraph" component={EarningGraphConnected} />
    <Route path="/Equipments/quantities" component={EquipmentQuantitiesReportConnected} />
    <Route path="/prevMaint/occurrences" component={PrevMaintOccurrencesReportConnected} />
    <Route path="/corMaint/occurrences" component={CorMaintOccurrencesReportConnected} />
    <Route path="/Training/occurrences" component={TrainingOccurrencesReportConnected} />   
    <Route path="/Dashboard/notifications" component={NotificationsConnected} />
    <Route path="/Dashboard/workProgress" component={WorkProgressConnected} />
    <Route path="/Dashboard/twitterFeed" component={TwitterFeedConnected} />
    <Route path="/Dashboard/teamMates" component={TeamMatesViewConnected} />
    <Route path="/Dashboard/todoList" component={TodoListViewConnected} />

    <Route exact path="/simpleTables" component={SimpleTablesConnected} />

    <Route exact path="/basicElements" component={BasicElementsConnected} />
    <Route exact path="/equipmentTree" component={EquipmentTreeConnected} />
    <Route exact path="/siteTree" component={SiteTreeConnected} />
    
    <Route exact path="/addEquipment" component={AddEquipmentConnected} />
    <Route exact path="/addIncident" component={AddIncidentConnected} />
    <Route exact path="/addTraining" component={AddTrainingConnected} />

    <Route exact path="/equipmentInstances" component={EquipmentInstancesConnected} />
    <Route exact path="/exportIncident" component={ExportIncidentConnected} />
    <Route exact path="/preventiveMaintenances" component={PreventiveMainntenancesConnected} />
    <Route exact path="/correctiveMaintenances" component={CorrectiveMainntenancesConnected} />
    <Route exact path="/maintenancePlans" component={MaintenancePlansConnected} />
    <Route exact path="/exportTraining" component={ExportTrainingConnected} />
g

    <Route exact path="/general" component={GeneralConnected} />
    <Route path="/general/breadcrumb" component={BreadcrumbViewConnected} />
    <Route path="/general/stat" component={StatViewConnected} />
    <Route path="/general/basicProgressBars" component={BasicProgressBarConnected} />
    <Route path="/general/tabPanels" component={TabPanelConnected} />
    <Route path="/general/stripedProgressBars" component={StripedProgressBarConnected} />
    <Route path="/general/alerts" component={AlertConnected} />
    <Route path="/general/pagination" component={PaginationViewConnected} />

  </Switch>
);

export default MainRoutes;

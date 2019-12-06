// @flow weak

import React, {
  PureComponent
}                     from 'react';

import {
  AnimatedView,
  Panel,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
}                         from '../../components';

import MaintenancePlanDetails from '../../components/maintenancePlanDetails';



class MaintenancePlans extends PureComponent {
  constructor(props) {
    super(props);
    //invoke BE to retrieve maintenance plans depending on department of logged in user
    //null parameter should be replaced by department ID if user belongs to specific department
    this.props.actions.retrieveMaintenancePlans(null);
    this.props.actions.retrieveEquipmentInstances();
    this.state = {
      headers: ['ID','Equipment Type ID', 'Cycle', 'Duration', 'Description', 'Department', 'Role', 'Status'],
      selectedPlan:null
    };
    this.selectPlan = this.selectPlan.bind(this);
    this.updatePlan = this.updatePlan.bind(this);
  }

  addPlan(plan) {
    const { actions: { saveMaintenancePlan } } = this.props;
    saveMaintenancePlan(plan);
    this.setState({selectedPlan:null});
  }

  updatePlan(plan) {
    const { actions: { updateMaintenancePlan } } = this.props;
    updateMaintenancePlan(plan);
    this.setState({selectedPlan:plan});
  }

  selectPlan(rowIndex,content) {
    let row = content[rowIndex];
    let selectedPlan = this.props.maintenancePlans.allPlans.filter((plan)=>{
      return plan.id === row[0];
    })[0];
    
    this.props.actions.clearfilteredPlans();
    this.setState({selectedPlan:selectedPlan});
  }

  
  render() {
    const {headers, selectedPlan} = this.state;
    const content=[];
    this.props.maintenancePlans.allPlans.map((plan, planIndex)=>{
      let contentColumns = [];
      contentColumns.push(plan.id);
      contentColumns.push(plan.equipmentTypeId);
      contentColumns.push(plan.period + " "+ plan.units);
      contentColumns.push(plan.duration + " "+ plan.durationUnit);
      contentColumns.push(plan.description);
      contentColumns.push(plan.department);
      contentColumns.push(plan.role);
      contentColumns.push(plan.status);
      content.push(contentColumns);
    });
    return(
      <div>
        <div
          className="modal fade"
          id="addMaintenancePlan"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true">
                  ×
                </button>
                <h4 className="modal-title">
                  Add New Preventive Maintenance Plan
                </h4>
              </div>
              <div className="modal-body">
              <MaintenancePlanDetails selectedPlan = {null} 
                      onSave = {this.addPlan}/>
              </div>
            </div>
          </div>
        </div>
        
        <AnimatedView>
          {/* preview: */}
          <Panel
            title="Maintenance Plans"
            hasTitle={true}
            bodyBackGndColor={'#fbffc4'}
            bodyCustomClass="table-responsive">
            <div className="row">
              <div style={{ height: 200 }}>
                <div className="box-tools m-b-15">
                  <div className="input-group">
                    <input
                      type="text"
                      name="table_search"
                      className="form-control input-sm pull-right"
                      style={{width: '150px'}}
                      placeholder="Search"
                    />
                    <div className="input-group-btn">
                      <button className="btn btn-sm btn-default">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    {
                      headers.map(
                        (header, headerIdx) => {
                          return (
                            <TableCol key={headerIdx}>
                              <font color="blue">
                                {header}
                              </font>
                            </TableCol>
                          );
                        }
                      )
                    }
                    <TableCol/>
                  </TableHeader>
                  <TableBody>
                    {
                      content.map(
                        (contentRow, contentRowIdx) => {
                          return (
                            <TableRow key={contentRowIdx}>
                              {
                                contentRow.map(
                                  (contentColumn, contentColumnIdx) => {
                                    return (
                                      <TableCol key={contentColumnIdx}>
                                        {contentColumn}
                                      </TableCol>
                                    );
                                  }
                                )
                              }
                              <TableCol>
                                <button className="btn btn-success" label="Details"
                                  onClick={(event) => this.selectPlan(contentRowIdx,content)}><i className="fa fa-info-circle" />
                            Details
                                </button>
                              </TableCol>
                            </TableRow>
                          );
                        }
                      )
                    }
                  </TableBody>
                </Table>
              </div>
            </div>
          </Panel>
          <div className="row">
            <div className="col-md-1 form-group"/>
            <div className="col-md-1 form-group"/>
            <div className="col-md-1 form-group"/>
            <div className="col-md-1 form-group"/>
            <div className="col-md-1 form-group"/>
            <div className="col-md-1 form-group"/>
            <div className="col-md-1 form-group"/>
            <div className="col-md-1 form-group"/>
            <div className="col-md-1 form-group"/>
            <button type="submit" className="btn btn-info" >Add</button>
            <button type="submit" className="btn btn-info" >Import</button>
            <button type="submit" className="btn btn-info" >Export</button>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <Panel
                title="Details"
                hasTitle={true}
                bodyBackGndColor={'#F4F5F6'}>
			        <div className="row">
                  <div style={{ height: 200 }} >
                  {(selectedPlan === null)? <div>Please select maintenance plan</div>:
                    <MaintenancePlanDetails selectedPlan = {selectedPlan} 
                      onSave = {this.updatePlan}/>
                  }
                  </div>
			        </div>
              </Panel>
            </div>
	      </div>
        
        </AnimatedView>
      </div>
    );
  }
}

export default MaintenancePlans;

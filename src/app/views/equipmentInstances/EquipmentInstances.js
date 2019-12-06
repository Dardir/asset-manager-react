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

import EquipmentInstaceDetails from '../../components/equipmentInstanceDetails';
import PreventiveMaintenanceInfo from '../../components/preventiveMaintenanceInfo/PreventiveMaintenanceInfo';
import CorrectiveMaintenanceInfo from '../../components/correctiveMaintenanceInfo/CorrectiveMaintenanceInfo';
import moment from 'moment';


class EquipmentInstances extends PureComponent {
  constructor(props) {
    super(props);
    this.props.actions.retrieveEquipmentInstances();
    this.state = {
      headers: ['Serial', 'Is-Active', 'Type-Serial'],
      selectedInstance:{},
      detailsSectionActive:false
    };
    this.selectInstance = this.selectInstance.bind(this);
    this.saveInstance = this.saveInstance.bind(this);
    this.savePreventiveMaintenance = this.savePreventiveMaintenance.bind(this);
    this.saveCorrectiveMaintenance = this.saveCorrectiveMaintenance.bind(this);
  }

  saveInstance(instance) {
    const { actions: { updateEquipmentInstance } } = this.props;
    updateEquipmentInstance(instance);
    this.setState({selectedInstance:instance});
  }

  selectInstance(rowIndex,content) {
    let row = content[rowIndex];
    let selectedInstance = this.props.equipmentInstances.allinstances.filter((instance)=>{
      return instance.id === row[0];
    })[0];
    if(selectedInstance.warrentyExpiryDate === null || selectedInstance.warrentyExpiryDate === undefined) {
      selectedInstance.isWarranty = true;
      selectedInstance.warrentyExpiryDate = moment();
    }
    this.props.actions.clearFilteredInstances();
    this.props.actions.clearFilteredPreventiveMaintenances();
    this.setState({selectedInstance:selectedInstance, detailsSectionActive:true});
  }

  savePreventiveMaintenance(maintenance) {
    const { actions: { savePreventiveMaintenance, filterPreventiveMaintenance } } = this.props;
    const {selectedInstance} = this.state;
    savePreventiveMaintenance(maintenance);
    filterPreventiveMaintenance(selectedInstance.id);
  }

  saveCorrectiveMaintenance(maintenance) {
    const { actions: { saveCorrectiveMaintenance, filterCorrectiveMaintenance } } = this.props;
    const {selectedInstance} = this.state;
    saveCorrectiveMaintenance(maintenance);
    filterCorrectiveMaintenance(selectedInstance.id);
  }
  
  render() {
    const {headers, selectedInstance, detailsSectionActive} = this.state;
    const content=[];
    this.props.equipmentInstances.allinstances.map((instance, instanceIndex)=>{
      let contentColumns = [];
      contentColumns.push(instance.id);
      let isActive = (instance.isActive)?'Active':'In-Active';
      contentColumns.push(isActive);
      contentColumns.push(instance.typeId);
      content.push(contentColumns);
    });
    return(
      <div>
        <div
          className="modal fade"
          id="addPreventiveMaintenance"
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
                  Add New Preventive Maintenance
                </h4>
              </div>
              <div className="modal-body">
                <PreventiveMaintenanceInfo
                  instanceSerial={this.state.selectedInstance.id}
                  typeSerial={this.state.selectedInstance.typeId}
                  onSave={this.savePreventiveMaintenance} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="addCorrectiveMaintenance"
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
                  Add New Corrective Maintenance
                </h4>
              </div>
              <div className="modal-body">
                <CorrectiveMaintenanceInfo
                  instanceSerial={this.state.selectedInstance.id}
                  typeSerial={this.state.selectedInstance.typeId}
                  onSave={this.saveCorrectiveMaintenance} />
              </div>
            </div>
          </div>
        </div>
        <AnimatedView>
          {/* preview: */}
          <Panel
            title="Equipment Instances"
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
                                  onClick={(event) => this.selectInstance(contentRowIdx,content)}><i className="fa fa-info-circle" />
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
                    <EquipmentInstaceDetails selectedInstance = {selectedInstance} 
                      isActive={detailsSectionActive}
                      onSave = {this.saveInstance}/>
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

export default EquipmentInstances;

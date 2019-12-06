// @flow weak

import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import TabPanel from '../../components/tabPanel/TabPanel/TabPanel';
import TabPanelHeader from '../../components/tabPanel/tabPanelHeader/TabPanelHeader';
import TabPanelBody from '../../components/tabPanel/tabPanelBody/TabPanelBody';
import TabPanelBodyContent from '../../components/tabPanel/TabPanelBodyContent/tabPanelBodyContent';
import { BorderedTable, TableHeader, TableBody, TableRow, TableCol } from '../../components';
import { withRouter } from 'react-router';

class EquipmentTypeInfo extends PureComponent {
  static propTypes = {
    equipmentTypeName: PropTypes.string,
    equipmentTypeInfo: PropTypes.object.isRequired,
    equipmentTypeSerial: PropTypes.string,
    isActive: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      saveEquipmentInstance: PropTypes.func.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      paramTypes:[{key:0, value:''}, {key:1, value:'Number'}, {key:2, value:'String'}, {key:3, value:'Date'}],
      unitTypes:[{key:0, value:''}, {key:1, value:'Hours'}, {key:2, value:'Days'}, {key:3, value:'Months'}, {key:4, value:'Years'}],
      name: '',
      info: {
        general: {
          isConsumable: false,
          threshold:'',
          applicableForMaintenance:false,
          unit:''
        },
        maintenance:{
          period:1,
          units:'',
          duration:1,
          durationUnit:'',
          isDeactivated:false,
          sendNotificationIfThreshold:false
        },
        properties: []
      }
    };

    this.addProperty = this.addProperty.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleConsumable = this.handleConsumable.bind(this);
    this.handleThresholdChange = this.handleThresholdChange.bind(this);
    this.handlePropNameChange = this.handlePropNameChange.bind(this);
    this.handleSelectParamType = this.handleSelectParamType.bind(this);
    this.handleApplicableForMaintenance = this.handleApplicableForMaintenance.bind(this);
    this.handleDeactivated = this.handleDeactivated.bind(this);
    this.handleSendNotificationifDeactivationThreshold = this.handleSendNotificationifDeactivationThreshold.bind(this);
    this.stopSubmit = this.stopSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.equipmentTypeName, info: nextProps.equipmentTypeInfo });
  }

  handleSaveButton() {
    this.props.onSave(this.state.name, this.state.info, this.props.equipmentTypeSerial);
  }

  addProperty(e) {
    e.preventDefault();
    let currentInfo = Object.assign({}, this.state.info);
    currentInfo.properties.push({
      name: '',
      type: ''
    });
    this.setState({ info: currentInfo });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }


  handleUnitChange(event) {
    let currentInfo = Object.assign({}, this.state.info);
    currentInfo.general.unit = event.target.value;
    this.setState({ info: currentInfo });
  }

  handleConsumable(event) {
    let currentInfo = Object.assign({}, this.state.info);
    currentInfo.general.isConsumable = !currentInfo.general.isConsumable;
    this.setState({ info: currentInfo });
  }

  handleApplicableForMaintenance(e) {
    let currentInfo = Object.assign({}, this.state.info);
    currentInfo.general.applicableForMaintenance = !currentInfo.general.applicableForMaintenance;
    this.setState({ info: currentInfo });
  }

  handleDeactivated(e) {
    let currentInfo = Object.assign({}, this.state.info);
    currentInfo.maintenance.isDeactivated = !currentInfo.maintenance.isDeactivated;
    this.setState({ info: currentInfo });
  }

  handleSendNotificationifDeactivationThreshold(e) {
    let currentInfo = Object.assign({}, this.state.info);
    currentInfo.maintenance.sendNotificationIfThreshold = !currentInfo.maintenance.sendNotificationIfThreshold;
    this.setState({ info: currentInfo });
  }

  handleThresholdChange(event) {
    let currentInfo = Object.assign({}, this.state.info);
    currentInfo.general.threshold = event.target.value;
    this.setState({ info: currentInfo });
  }


  handlePropNameChange(event, contentRowIdx) {
    let currentInfo = Object.assign({}, this.state.info);
    currentInfo.properties[contentRowIdx] = {...currentInfo.properties[contentRowIdx], name: event.target.value};
    this.setState({ info: currentInfo });
  }

  handleSelectParamType(event, contentRowIdx) {
    let currentInfo = Object.assign({}, this.state.info);
    currentInfo.properties[contentRowIdx] = {...currentInfo.properties[contentRowIdx], type: event.target.value};
    this.setState({ info: currentInfo });
  }

  stopSubmit(e) {
    e.preventDefault();
  }

  render() {
    let { name, info, paramTypes, unitTypes } = this.state;
    let { general, maintenance } = info;
    let {equipmentInstances} = this.props;
    const tabNames = [
      { name: 'General', tablink: 'general', isActive: true },
      { name: 'Properties', tablink: 'properties', isActive: false },
      { name: 'Instances', tablink: 'instances', isActive: false }
    ];
    return (
      <TabPanel>
        <TabPanelHeader tabItems={tabNames} />
        {(this.props.isActive) ?
          <TabPanelBody>
            <TabPanelBodyContent id="general" isActive>
              <form role="form">
                <div className="form-group">
                  <label htmlFor="equipmentTypeName">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="equipmentTypeName"
                    placeholder="Enter Name of Equipment Type"
                    value={name}
                    onChange={(event) => this.handleNameChange(event)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="equipmentTypeKey">
                    Serial
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="equipmentTypeKey"
                    value={this.props.equipmentTypeSerial}
                    disabled={true}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="equipmentTypeQntyUnit">
                    Quantity Unit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="equipmentTypeQntyUnit"
                    value={general.unit}
                    onChange={(event) => this.handleUnitChange(event)}
                  />
                </div>

                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" onChange={(event) => this.handleConsumable(event)} />
                      Is it consumable
                    </label>
                  </div>
                </div>
                {(general.isConsumable) ?
                  <div className="form-group">
                    <label htmlFor="equipmentTypeName">
                      Threshold
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="equipmentTypeThreshold"
                      placeholder="Enter Threshold"
                      value={general.threshold}
                      onChange={(event) => this.handleThresholdChange(event)}
                    />
                  </div>
                  : null}
              </form>
            </TabPanelBodyContent>
            <TabPanelBodyContent id="properties">
              <form role="form">
                <div className="form-group">
                  <label htmlFor="propertiesTable">
                    Properties
                  </label>
                  <p>
                    <button
                      className="btn btn-info" onClick={(e) => this.addProperty(e)}>
                      <i className="fa fa-plus" />
                      Add
                    </button>
                    <BorderedTable>
                      <TableHeader>
                        <TableCol>
                          <font color="blue">
                            Name
                          </font>
                        </TableCol>
                        <TableCol>
                          <font color="blue">
                            Type
                          </font>
                        </TableCol>
                      </TableHeader>
                      <TableBody>
                        {
                          info.properties.map(
                            (contentRow, contentRowIdx) => {
                              return (
                                <TableRow key={contentRowIdx}>
                                  <TableCol>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id={contentRowIdx + 'name'}
                                      placeholder="Enter Name of Property"
                                      value={contentRow.name}
                                      onChange={(event) => this.handlePropNameChange(event, contentRowIdx)}
                                    />

                                  </TableCol>
                                  <TableCol>
                                    <select className="form-control" id="paramTypeSelect" value={contentRow.type} onChange={(event) => this.handleSelectParamType(event, contentRowIdx)} >
                                      {
                                        paramTypes.map(paramType =><option key={paramType.key}>{paramType.value}</option>)
                                      }
                                    </select>
                                  </TableCol>
                                </TableRow>
                              );
                            }
                          )
                        }
                      </TableBody>
                    </BorderedTable>
                  </p>
                </div>
              </form>
            </TabPanelBodyContent>
            <TabPanelBodyContent id="instances">
              <form role="form">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3 form-group">
                      <a
                        href="#addEquipmentInstance"
                        data-toggle="modal"
                        className="btn btn-xs btn-primary">
                          Add
                      </a>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  {(equipmentInstances.filteredInstances.length > 0)?
                    <BorderedTable>
                      <TableHeader>
                        <TableCol>
                          <font color="blue">
                            Serial
                          </font>
                        </TableCol>
                        <TableCol>
                          <font color="blue">
                            Is-Active
                          </font>
                        </TableCol>
                        <TableCol/>
                      </TableHeader>
                      <TableBody>
                        {equipmentInstances.filteredInstances.map((instance, contentRowIdx)=>{
                          return(
                            <TableRow key={contentRowIdx}>
							                <TableCol>
                                <label>
                                  {instance.id}
                                </label>
							                </TableCol>
							                <TableCol>
                                <label>
                                  {(instance.isActive)? <div>Active</div>: <div>In-Active</div>}
                                </label>
							                </TableCol>
                              <TableCol>
                                <button className="btn btn-info"><i className="fa fa-edit" />Edit</button>
                              </TableCol>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </BorderedTable>
                    :
                    <div>
                      No Instances
                    </div>
                  }
                </div>
                <div className="form-group">
                  <div className="col-md-3 form-group">
                    <button className="btn btn-info" onClick={()=>{this.props.history.push(`/equipmentInstances`)}}><i className="fa fa-angle-double-right" />Show All Instances</button>
                  </div>
                </div>
              </form>
            </TabPanelBodyContent>
          </TabPanelBody> : <div>Please Select Equipment Type</div>
        }
        <div className="modal-footer">
          <button
            className="btn btn-success"
            type="button" onClick={() =>
              this.handleSaveButton()
            } disabled={!this.props.isActive}>
            Save changes
          </button>
        </div>
      </TabPanel >
      

    );
  }
}


export default withRouter(EquipmentTypeInfo);

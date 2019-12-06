// @flow weak

import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import TabPanel from '../../components/tabPanel/TabPanel/TabPanel';
import TabPanelHeader from '../../components/tabPanel/tabPanelHeader/TabPanelHeader';
import TabPanelBody from '../../components/tabPanel/tabPanelBody/TabPanelBody';
import TabPanelBodyContent from '../../components/tabPanel/TabPanelBodyContent/tabPanelBodyContent';
import { BorderedTable, TableHeader, TableBody, TableRow, TableCol, Table } from '../../components';
import { withRouter } from 'react-router';
import TreeSelect, { TreeNode, SHOW_PARENT } from 'rc-tree-select';
import 'rc-tree-select/assets/index.css';
import DatePicker from 'react-datepicker';

function parseSiteData(gData) {
  const result = [];
  if(gData !== undefined) {
    for (let i = 0; i < gData.length; i++) {
      result.push({
        title: gData[i].title,
        value: gData[i].locKey,
        disabled: false
      });
      if (gData[i].children) {
        result[i].children = parseSiteData(gData[i].children);
      }
    }
  }

  return result;
}

class EquipmentInstanceDetails extends PureComponent {
  static propTypes = {
    selectedInstance: PropTypes.object.isRequired,
    isActive: PropTypes.bool,
    onSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.props.actions.RetrieveSiteTree();    
    this.state = {
      instance: {
        typeId: '',
        id: '',
        locationId: 'CHOOSE LOCATION',
        isActive: true,
        lastPerventiveMaintenance: {},
        preventiveMaintenances: [],
        correctiveMaintenances: [],
        paramValues: [],
        parentInstanceId: '',
        isWarranty:(this.props.selectedInstance.isWarranty),
        warrentyExpiryDate: this.props.selectedInstance.warrentyExpiryDate
      },
      disableIdBox: false,
      isGenerateId: false,
      instanceType: {},
      parentInstanceType: {},
      selectedParentInstance: {},
      gData: parseSiteData(this.props.siteTree.treeData)

    };

    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleIsActive = this.handleIsActive.bind(this);
    this.getSelectedEquipmentType = this.getSelectedEquipmentType.bind(this);
    this.SearchTreesNode = this.SearchTreesNode.bind(this);
    this.SearchTreeNode = this.SearchTreeNode.bind(this);
    this.savePreventiveMaintenance = this.savePreventiveMaintenance.bind(this);
    this.saveCorrectiveMaintenance = this.saveCorrectiveMaintenance.bind(this);
    this.getSelectedParentEquipmentType = this.getSelectedParentEquipmentType.bind(this);
    this.SearchTreesNodeForParent = this.SearchTreesNodeForParent.bind(this);
    this.SearchTreeNodeForParent = this.SearchTreeNodeForParent.bind(this);
    this.selectParentInstance = this.selectParentInstance.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.onChangeChildren = this.onChangeChildren.bind(this);
    this.handleIsWarranty = this.handleIsWarranty.bind(this);
    this.handleExpiryDateChange = this.handleExpiryDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let parentEquipmentType = this.getSelectedParentEquipmentType(nextProps.selectedInstance);
    if (nextProps.selectedInstance.id !== this.props.selectedInstance.id && typeof parentEquipmentType !== 'string' && nextProps.equipmentInstances.filteredInstances.length === 0) {
      nextProps.actions.filterInstancesOfType(parentEquipmentType.eqTypeKey);
    }
    if (nextProps.selectedInstance.id !== this.props.selectedInstance.id && nextProps.preventiveMaintenances.filteredInstances.length === 0) {
      nextProps.actions.filterPreventiveMaintenance(nextProps.selectedInstance.id);
      nextProps.actions.filterCorrectiveMaintenance(nextProps.selectedInstance.id);
    }
    if (nextProps.isActive) {
      let equipmentType = this.getSelectedEquipmentType(nextProps.selectedInstance);
      let propertiesDef = equipmentType.equipmentTypeInfo.properties;
      let paramValues = propertiesDef.map((property) => {
        return {
          name: property.name,
          value: ''
        };
      });
      let newInstance = nextProps.selectedInstance;
      newInstance.paramValues = paramValues;
      this.setState({ instance: newInstance, instanceType: equipmentType, parentInstanceType: parentEquipmentType });
    } else {
      this.setState({ instance: nextProps.selectedInstance, parentInstanceType: parentEquipmentType });
    }
  }

  handleIsWarranty(e) {
    let isWarranty = this.state.instance.isWarranty;
    isWarranty = !isWarranty;
    this.setState({ instance: { ...this.state.instance, isWarranty: isWarranty } });
  }

  handleExpiryDateChange(date) {
    this.setState({ instance: { ...this.state.instance, warrentyExpiryDate: date } });
  }

  getSelectedEquipmentType(selectedNode) {
    const { equipmentTree } = this.props;
    let typeId = selectedNode.typeId;
    return this.SearchTreesNode(equipmentTree.treeData, typeId);
  }

  getSelectedParentEquipmentType(selectedNode) {
    const { equipmentTree } = this.props;
    let typeId = selectedNode.typeId;
    return this.SearchTreesNodeForParent(equipmentTree.treeData, typeId);
  }

  SearchTreesNodeForParent(trees, typeId) {
    const reducer = (accumulator, currentTree) => {
      if (accumulator !== typeId) {
        return accumulator;
      }
      let foundNode = null;
      foundNode = this.SearchTreeNodeForParent(currentTree, accumulator);
      if (foundNode === null) {
        return typeId;
      }
      return foundNode;
    };
    return trees.reduce(reducer, typeId);
  }


  SearchTreesNode(trees, typeId) {
    const reducer = (accumulator, currentTree) => {
      if (accumulator !== typeId) {
        return accumulator;
      }
      let foundNode = null;
      foundNode = this.SearchTreeNode(currentTree, accumulator);
      if (foundNode === null) {
        return typeId;
      }
      return foundNode;
    };
    return trees.reduce(reducer, typeId);
  }

  SearchTreeNode(tree, typeId) {
    if (tree.eqTypeKey === typeId) {
      return {
        title: tree.title,
        eqTypeKey: tree.eqTypeKey,
        equipmentTypeInfo: tree.equipmentTypeInfo
      };
    }
    if ('children' in tree) {
      return this.SearchTreesNode(tree.children, typeId);
    } else {
      return null;
    }
  }

  SearchTreeNodeForParent(tree, typeId) {
    if ('children' in tree) {
      let foundChild = tree.children.filter((child) => child.eqTypeKey === typeId);
      if (foundChild !== null && foundChild.length > 0) {
        return {
          title: tree.title,
          eqTypeKey: tree.eqTypeKey,
          equipmentTypeInfo: tree.equipmentTypeInfo
        };
      } else {
        return this.SearchTreesNodeForParent(tree.children, typeId);
      }
    } else {
      return null;
    }
  }

  savePreventiveMaintenance(e) {
    e.preventDefault();
    this.props.history.push('/preventiveMaintenances');
  }

  saveCorrectiveMaintenance(e) {
    e.preventDefault();
    this.props.history.push('/correctiveMaintenances');
  }

  handleSaveButton() {
    this.props.onSave(this.state.instance);
  }

  stopSubmit(e) {
    e.preventDefault();
  }


  handleIsActive(e) {
    let active = this.state.isActive;
    active = !active;
    this.setState({ instance: { ...this.state.instance, isActive: active } });
  }

  selectParentInstance(e) {
    const { equipmentInstances } = this.props;
    const { filteredInstances } = equipmentInstances;
    let selectedParentInstance = filteredInstances[e.currentTarget.value];
    this.state.instance.parentInstanceId = selectedParentInstance.id;
    this.setState({ selectedParentInstance: selectedParentInstance });
  }

  isChecked(index) {
    const { equipmentInstances } = this.props;
    const { filteredInstances } = equipmentInstances;
    return filteredInstances[index].id === this.state.instance.parentInstanceId;
  }

  clearSelection(e) {
    e.preventDefault();
    this.setState({ instance: { ...this.state.instance, parentInstanceId: '' } });
  }

  isLeaf = (value) => {
    if (!value) {
      return false;
    }
    let queues = [...this.state.gData];
    while (queues.length) {
      const item = queues.shift();
      if (item.value === value) {
        if (!item.children) {
          return true;
        }
        return false;
      }
      if (item.children) {
        queues = queues.concat(item.children);
      }
    }
    return false;
  }

  onChangeChildren(value) {
    this.setState({
      ...this.state, instance: {
        ...this.state.instance,
        locationId: this.isLeaf(value) ? value : pre
      }
    });
  }

  render() {
    let { instance, instanceType, parentInstanceType } = this.state;
    let { typeId, id, locationId, isActive, lastPerventiveMaintenance, paramValues, parentInstanceId, isWarranty, warrentyExpiryDate } = instance;
    const { preventiveMaintenances, correctiveMaintenances, equipmentInstances } = this.props;
    const { filteredInstances } = equipmentInstances;
    const headers = ['Serial', 'Is-Active'];
    const content = [];
    filteredInstances.map((instance, instanceIndex) => {
      let contentColumns = [];
      contentColumns.push(instance.id);
      let active = (instance.isActive) ? 'Active' : 'In-Active';
      contentColumns.push(active);
      content.push(contentColumns);
    });

    let parent = (typeof parentInstanceType !== 'string') ? parentInstanceType :
      {
        title: 'No parent Equipment Type',
        eqTypeKey: 'No parent Equipment Type'
      };

    const tabNames = [
      { name: 'General', tablink: 'general', isActive: true },
      { name: 'Properties', tablink: 'properties', isActive: false },
      { name: 'Preventive Maintenances', tablink: 'prevMaintenance', isActive: false },
      { name: 'Corrective Maintenances ', tablink: 'corMaintenance', isActive: false },
      { name: 'Installment', tablink: 'installment', isActive: false },
      { name: 'Location', tablink: 'locationTab', isActive: false }
    ];

    return (
      <TabPanel>
        <TabPanelHeader tabItems={tabNames} />
        {(this.props.isActive) ?
          <TabPanelBody>
            <TabPanelBodyContent id="general" isActive>
              <form role="form">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="equipmentTypeName">
                        Type Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="equipmentTypeName"
                        value={instanceType.title}
                        disabled={true}
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="equipmentTypeKey">
                        Type Serial
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="equipmentTypeKey"
                        value={typeId}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="instanceID">
                        Instance Serial
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="instanceID"
                        value={id}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>                 
                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" checked={isActive} onChange={(event) => this.handleIsActive(event)} />
                        Is Active
                    </label>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-md-6 form-group" >
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={isWarranty} onChange={(event) => this.handleIsWarranty(event)} />
                        Is Warranty
                      </label>
                    </div>
                  </div>
                  {(isWarranty)?
                    <div className="col-md-6 form-group" >
                      <label
                        htmlFor="expiryDate"
                        className="control-label has-blue">
                      Expiry Date
                      </label>
                      <DatePicker
                        className="form-control"
                        selected={warrentyExpiryDate}
                        onChange={this.handleExpiryDateChange} id="expiryDate"
                      />
                    </div>
                    :null
                  }
                </div>
              </form>
            </TabPanelBodyContent>
            <TabPanelBodyContent id="properties">
              <form role="form">
                <div className="form-group">
                  <label htmlFor="propertiesTable">
                    Properties
                  </label>
                  <p>
                    <BorderedTable>
                      <TableHeader>
                        <TableCol>
                          <font color="blue">
                            Name
                          </font>
                        </TableCol>
                        <TableCol>
                          <font color="blue">
                            Value
                          </font>
                        </TableCol>
                      </TableHeader>
                      <TableBody>
                        {
                          paramValues.map(
                            (contentRow, contentRowIdx) => {
                              return (
                                <TableRow key={contentRowIdx}>
                                  <TableCol>
                                    <label> {contentRow.name} </label>

                                  </TableCol>
                                  <TableCol>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id={contentRowIdx + 'value'}
                                      placeholder="Enter Value of Property"
                                      value={contentRow.value}
                                      onChange={(event) => this.handlePropValueChange(event, contentRowIdx)}
                                    />
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
            <TabPanelBodyContent id="prevMaintenance">
              
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3 form-group">
                      <label htmlFor="maintenancePeriod">
                        Cycle
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="maintenancePeriod"
                        value={instanceType.equipmentTypeInfo.maintenance.period}
                        disabled={true}
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label htmlFor="unitSelect">
                        Unit
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="unitSelect"
                        value={instanceType.equipmentTypeInfo.maintenance.units}
                        disabled={true}
                      />
                    </div>
                    <div className="col-md-3 form-group" />
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <div className="col-md-3 form-group">
                        <label htmlFor="maintenanceDuration">
                          Duration
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="maintenanceDuration"
                          value={instanceType.equipmentTypeInfo.maintenance.duration}
                          disabled={true}
                        />
                      </div>
                      <div className="col-md-3 form-group">
                        <label htmlFor="durationUnitSelect">
                          Unit
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="durationUnitSelect"
                          value={instanceType.equipmentTypeInfo.maintenance.durationUnit}
                          disabled={true}
                        />
                      </div>
                      <div className="col-md-3 form-group" />
                    </div>
                  </div>
                  <hr />
                  <form role="form">
                    <div className="form-group">
                      <div className="row">
                        <label>
                          Maintenace Log for this Instance
                        </label>
                      </div>
                      <div className="row">
                        <div className="col-md-3 form-group">
                          <a
                            href="#addPreventiveMaintenance"
                            data-toggle="modal"
                            className="btn btn-xs btn-primary">
                            Add
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      {(preventiveMaintenances.filteredInstances.length > 0) ?

                        <BorderedTable>
                          <TableHeader>
                            <TableCol>
                              <font color="blue">
                                ID
                              </font>
                            </TableCol>
                            <TableCol>
                              <font color="blue">
                                Date
                              </font>
                            </TableCol>
                            <TableCol>
                              <font color="blue">
                                Location
                              </font>
                            </TableCol>
                            <TableCol>
                              <font color="blue">
                                Maintenance Responsible
                              </font>
                            </TableCol>
                            <TableCol>
                              <font color="blue">
                                Notes
                              </font>
                            </TableCol>
                            <TableCol />
                          </TableHeader>
                          <TableBody>
                            {preventiveMaintenances.filteredInstances.map((maintenance, contentRowIdx) => {
                              return (
                                <TableRow key={contentRowIdx}>
                                  <TableCol>
                                    <label>
                                      {maintenance.id}
                                    </label>
                                  </TableCol>
                                  <TableCol>
                                    <label>
                                      {maintenance.date.toString()}
                                    </label>
                                  </TableCol>
                                  <TableCol>
                                    <label>
                                      {maintenance.location}
                                    </label>
                                  </TableCol>
                                  <TableCol>
                                    <label>
                                      {maintenance.responsible}
                                    </label>
                                  </TableCol>
                                  <TableCol>
                                    <label>
                                      {maintenance.notes}
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
                          No Maintenance has been recorded
                        </div>
                      }
                    </div>
                    <div className="form-group">
                      <div className="col-md-3 form-group">
                        <button className="btn btn-info" onClick={(e) => this.savePreventiveMaintenance(e)} ><i className="fa fa-angle-double-right" />Show All Preventive Maintenances</button>
                      </div>
                    </div>
                  </form>
                </div>             
            </TabPanelBodyContent>
            <TabPanelBodyContent id="corMaintenance">
              {(!instanceType.equipmentTypeInfo.general.applicableForMaintenance) ? <div> Not Applicable for Maintenance</div> :
                <div className="form-group">
                  <form role="form">
                    <div className="form-group">
                      <div className="row">
                        <label>
                          Maintenace Log for this Instance
                        </label>
                      </div>
                      <div className="row">
                        <div className="col-md-3 form-group">
                          <a
                            href="#addCorrectiveMaintenance"
                            data-toggle="modal"
                            className="btn btn-xs btn-primary">
                            Add
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      {(correctiveMaintenances.filteredInstances.length > 0) ?

                        <BorderedTable>
                          <TableHeader>
                            <TableCol>
                              <font color="blue">
                                ID
                              </font>
                            </TableCol>
                            <TableCol>
                              <font color="blue">
                                Date
                              </font>
                            </TableCol>
                            <TableCol>
                              <font color="blue">
                                Location
                              </font>
                            </TableCol>
                            <TableCol>
                              <font color="blue">
                                Maintenance Responsible
                              </font>
                            </TableCol>
                            <TableCol>
                              <font color="blue">
                                Notes
                              </font>
                            </TableCol>
                            <TableCol>
                              <font color="blue">
                                Reason
                              </font>
                            </TableCol>
                            <TableCol />
                          </TableHeader>
                          <TableBody>
                            {correctiveMaintenances.filteredInstances.map((maintenance, contentRowIdx) => {
                              return (
                                <TableRow key={contentRowIdx}>
                                  <TableCol>
                                    <label>
                                      {maintenance.id}
                                    </label>
                                  </TableCol>
                                  <TableCol>
                                    <label>
                                      {maintenance.date.toString()}
                                    </label>
                                  </TableCol>
                                  <TableCol>
                                    <label>
                                      {maintenance.location}
                                    </label>
                                  </TableCol>
                                  <TableCol>
                                    <label>
                                      {maintenance.responsible}
                                    </label>
                                  </TableCol>
                                  <TableCol>
                                    <label>
                                      {maintenance.notes}
                                    </label>
                                  </TableCol>
                                  <TableCol>
                                    <label>
                                      {maintenance.reason}
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
                          No Maintenance has been recorded
                        </div>
                      }
                    </div>
                    <div className="form-group">
                      <div className="col-md-3 form-group">
                        <button className="btn btn-info" onClick={(e) => this.saveCorrectiveMaintenance(e)} ><i className="fa fa-angle-double-right" />Show All Corrective Maintenances</button>
                      </div>
                    </div>
                  </form>
                </div>
              }

            </TabPanelBodyContent>
            <TabPanelBodyContent id="installment">
              <div className="form-group">
                <form role="form">
                  <div className="form-group">
                    <div className="row">
                      <label>
                        Please choose which equipment instance to install into
                      </label>
                    </div>
                    <div className="row">
                      <div className="col-md-3 form-group">
                        <label htmlFor="typenameinput">
                          Parent Type Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="typenameinput"
                          value={parent.title}
                          disabled={true}
                        />
                      </div>
                      <div className="col-md-4 form-group">
                        <label htmlFor="typeidinput">
                          Parent Type ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="typeidinput"
                          value={parent.eqTypeKey}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        {(filteredInstances.length > 0) ?

                          <Table>
                            <TableHeader>
                              <TableCol />
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
                            </TableHeader>
                            <TableBody>
                              {
                                content.map(
                                  (contentRow, contentRowIdx) => {
                                    return (
                                      <TableRow key={contentRowIdx}>
                                        <TableCol>
                                          <input type="radio" id={contentRowIdx} name="radioGroup" value={contentRowIdx} onChange={this.selectParentInstance} checked={this.isChecked(contentRowIdx)} />
                                        </TableCol>
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
                                      </TableRow>
                                    );
                                  }
                                )
                              }
                            </TableBody>
                            <button className="btn btn-xs btn-primary" onClick={this.clearSelection}>Clear</button>
                          </Table>
                          :
                          <div />

                        }
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </TabPanelBodyContent>
            <TabPanelBodyContent id="locationTab">
              <div className="row">
                <div className="col-md-4 form-group">
                  <label
                    className="control-label"
                    htmlFor="siteSelect">
                    Please choose which location this instance belongs to
                  </label>
                  <div className="control-select">
                    <TreeSelect
                      style={{ width: 300 }}
                      transitionName="rc-tree-select-dropdown-slide-up"
                      choiceTransitionName="rc-tree-select-selection__choice-zoom"
                      dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                      placeholder={<i>Choose Location</i>}
                      searchPlaceholder="please search"
                      showSearch allowClear treeLine
                      value={this.state.instance.locationId}
                      treeData={this.state.gData}
                      treeNodeFilterProp="label"
                      filterTreeNode={false}
                      onChange={(value) => {
                        this.onChangeChildren(value); 
                      }}
                    />
                  </div>
                </div>
              </div>
            </TabPanelBodyContent>
          </TabPanelBody> : <div>Please Select Equipment Instance</div>
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


export default withRouter(EquipmentInstanceDetails);

// @flow weak

import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import TabPanel from '../../components/tabPanel/TabPanel/TabPanel';
import TabPanelHeader from '../../components/tabPanel/tabPanelHeader/TabPanelHeader';
import TabPanelBody from '../../components/tabPanel/tabPanelBody/TabPanelBody';
import TabPanelBodyContent from '../../components/tabPanel/TabPanelBodyContent/tabPanelBodyContent';
//import { BorderedTable, TableHeader, TableBody, TableRow, TableCol, Table } from '../../components';
import { withRouter } from 'react-router';
import TreeSelect, { TreeNode, SHOW_PARENT } from 'rc-tree-select';
import 'rc-tree-select/assets/index.css';
import DatePicker from 'react-datepicker';

function parseSiteData(gData) {
  const result = [];
  if (gData !== undefined) {
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

function parseEquipmentTypeData(eqData) {
  const result = [];
  if (eqData !== undefined) {
    for (let i = 0; i < eqData.length; i++) {
      result.push({
        title: eqData[i].title,
        value: eqData[i].eqTypeKey,
        disabled: false
      });
      if (eqData[i].children) {
        result[i].children = parseEquipmentTypeData(eqData[i].children);
      }
    }
  }

  return result;
}

class MaintenancePlanDetails extends PureComponent {
  static propTypes = {
    selectedPlan: PropTypes.object,
    onSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.props.actions.RetrieveSiteTree();
    this.state = {
      unitTypes: [{ key: 0, value: '' }, { key: 1, value: 'Hours' }, { key: 2, value: 'Days' }, { key: 3, value: 'Months' }, { key: 4, value: 'Years' }],
      maintenancePlan: {
        id: '',
        period: 1,
        units: '',
        duration: 1,
        durationUnit: '',
        description: '',
        departmentId: '',
        role: '',
        status: 'Not Done',
        equipmentTypeId: ''
      },
      gData: parseSiteData(this.props.siteTree.treeData),
      eqData: parseEquipmentTypeData(this.props.equipmentTree.treeData),
      isGenerateId: false,
      disableIdBox: false

    };

    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleGenerateId = this.handleGenerateId.bind(this);
    this.guid = this.guid.bind(this);
    this.s4 = this.s4.bind(this);
    this.onChangeEquipmentTypeMenu = this.onChangeEquipmentTypeMenu.bind(this);
    this.onChangeChildren = this.onChangeChildren.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleSelectUnit = this.handleSelectUnit.bind(this);
    this.handleSelecDurationtUnit = this.handleSelecDurationtUnit.bind(this);



  }

  componentWillReceiveProps(nextProps) {
    let newPlan = nextProps.selectedPlan;
    if (newPlan !== null) {
      this.setState({ maintenancePlan: newPlan });
    }
  }

  handlePeriodChange(event) {
    let currentPlan = Object.assign({}, this.state.maintenancePlan);
    currentPlan.period = event.target.value;
    this.setState({ maintenancePlan: currentPlan });
  }

  handleSelectUnit(event) {
    let currentPlan = Object.assign({}, this.state.maintenancePlan);
    currentPlan.units = event.target.value;
    this.setState({ maintenancePlan: currentPlan });
  }

  handleSelecDurationtUnit(event) {
    let currentPlan = Object.assign({}, this.state.maintenancePlan);
    currentPlan.durationUnit = event.target.value;
    this.setState({ maintenancePlan: currentPlan });
  }

  handleIdChange(event) {
    this.setState({ maintenancePlan: { ...this.state.maintenancePlan, id: event.target.value } });
  }

  handleDescriptionChange(event){
    this.setState({ maintenancePlan: { ...this.state.maintenancePlan, description: event.target.value } });
  }

  handleGenerateId(event) {
    let generateId = this.state.isGenerateId;
    generateId = !generateId;
    if (generateId) {
      let newPlan = { ...this.state.maintenancePlan, id: this.guid() };
      this.setState({ isGenerateId: generateId, maintenancePlan: newPlan, disableIdBox: true });
    } else {
      let newPlan = { ...this.state.maintenancePlan, id: '' };
      this.setState({ isGenerateId: generateId, maintenancePlan: newPlan, disableIdBox: false });
    }
  }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  handleSaveButton() {
    this.props.onSave(this.state.maintenancePlan);
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
      ...this.state, maintenancePlan: {
        ...this.state.maintenancePlan,
        locationId: this.isLeaf(value) ? value : pre
      }
    });
  }
  onChangeEquipmentTypeMenu(value) {
    this.setState({
      ...this.state, maintenancePlan: {
        ...this.state.maintenancePlan,
        equipmentTypeId: value
      }
    });
  }

  render() {
    let { maintenancePlan, disableIdBox, unitTypes } = this.state;
    let { id, description } = maintenancePlan;
    const { preventiveMaintenances, selectedPlan } = this.props;

    let tabNames = [];
    if (selectedPlan !== null) {
      tabNames = [
        { name: 'Details', tablink: 'details', isActive: true },
        { name: 'Maintenances', tablink: 'maintenances', isActive: false }];
    } else {
      tabNames = [
        { name: 'Details', tablink: 'details', isActive: true }];
    }

    return (
      <TabPanel>
        <TabPanelHeader tabItems={tabNames} />
        {(selectedPlan === null) ? <div>Please Select Maintenance Plan</div> :
          <TabPanelBody>
            <TabPanelBodyContent id="details" isActive>
              <form role="form">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4 form-group">
                      <label htmlFor="planID">
                        Plan ID
                    </label>
                      <input
                        type="text"
                        className="form-control"
                        id="planID"
                        value={id}
                        onChange={(event) => this.handleIdChange(event)}
                        disabled={disableIdBox}
                      />
                      {(selectedPlan === null) ?
                        <div className="col-md-6 form-group">
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" onChange={(event) => this.handleGenerateId(event)} />
                              Generate ID
                      </label>
                          </div>
                        </div>
                        : null
                      }
                    </div>
                    <div className="col-md-4 form-group">
                      <label
                        className="control-label"
                        htmlFor="siteSelect">
                        Select Department
                     </label>
                      <div className="control-select">
                        <TreeSelect
                          style={{ width: 300 }}
                          transitionName="rc-tree-select-dropdown-slide-up"
                          choiceTransitionName="rc-tree-select-selection__choice-zoom"
                          dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                          placeholder={<i>Choose Department</i>}
                          searchPlaceholder="please search"
                          showSearch allowClear treeLine
                          value={this.state.maintenancePlan.departmentId}
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
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-8 form-group">
                        <textarea className="form-control" name="plan-description" placeholder="Please Enter Plan Description.." rows="3" cols="100" value={description}
                          onChange={(event) => this.handleDescriptionChange(event)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4 form-group">
                      <label
                        className="control-label"
                        htmlFor="eqTypeSelect">
                        Select Equipment Type
                  </label>
                      <div className="control-select">
                        <TreeSelect
                          style={{ width: 300 }}
                          transitionName="rc-tree-select-dropdown-slide-up"
                          choiceTransitionName="rc-tree-select-selection__choice-zoom"
                          dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                          placeholder={<i>Choose Equipment Type</i>}
                          searchPlaceholder="please search"
                          showSearch allowClear treeLine
                          value={this.state.maintenancePlan.equipmentTypeId}
                          treeData={this.state.eqData}
                          treeNodeFilterProp="label"
                          filterTreeNode={false}
                          onChange={(value) => {
                            this.onChangeEquipmentTypeMenu(value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 form-group">
                      <label htmlFor="maintenancePeriod">
                        Cycle
                        </label>
                      <input
                        type="number"
                        className="form-control"
                        id="maintenancePeriod"
                        value={maintenancePlan.period}
                        onChange={(event) => this.handlePeriodChange(event)}
                      />
                    </div>
                    <div className="col-md-4 form-group">
                      <label htmlFor="unitSelect">
                        Unit
                        </label>
                      <select className="form-control" id="unitSelect" value={maintenancePlan.units} onChange={(event) => this.handleSelectUnit(event)} >
                        {
                          unitTypes.map(unitType => <option key={unitType.key}>{unitType.value}</option>)
                        }
                      </select>
                    </div>
                    <div className="col-md-3 form-group" />
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <div className="col-md-4 form-group">
                        <label htmlFor="maintenanceDuration">
                          Duration
                          </label>
                        <input
                          type="number"
                          className="form-control"
                          id="maintenanceDuration"
                          value={maintenancePlan.duration}
                          onChange={(event) => this.handleDurationChange(event)}
                        />
                      </div>
                      <div className="col-md-4 form-group">
                        <label htmlFor="durationUnitSelect">
                          Unit
                          </label>
                        <select className="form-control" id="durationUnitSelect" value={maintenancePlan.durationUnit} onChange={(event) => this.handleSelecDurationtUnit(event)} >
                          {
                            unitTypes.map(unitType => <option key={unitType.key}>{unitType.value}</option>)
                          }
                        </select>
                      </div>
                      <div className="col-md-3 form-group" />
                    </div>
                  </div>
                </div>
              </form>
            </TabPanelBodyContent>
            <TabPanelBodyContent id="maintenances">
              <div>Maintenances of this plan</div>
            </TabPanelBodyContent>

          </TabPanelBody>}

        <div className="modal-footer">
          <button
            className="btn btn-success"
            type="button" onClick={() =>
              this.handleSaveButton()
            } >
            Save changes
          </button>
        </div>
      </TabPanel >
    );
  }
}


export default withRouter(MaintenancePlanDetails);

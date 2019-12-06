// @flow weak

import React, {
  PureComponent
} from 'react';

import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';
import { withRouter } from 'react-router';
import {
  AnimatedView, Panel
} from '../../components';

import SortableTree, { addNodeUnderParent, removeNodeAtPath, getNodeAtPath } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import EquipmentTypeInfo from '../../components/equipmentTypeInfo';
import EquipmentInstanceBasicInfo from '../../components/equipmentInstanceInfo/EquipmentInstanceBasicInfo';
import Loader from 'react-loader';


class EquipmentTree extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      setTreeData: PropTypes.func.isRequired,
      selectTreeNode: PropTypes.func.isRequired,
      changeNodeInfo: PropTypes.func.isRequired,
      saveEquipmentInstance: PropTypes.func.isRequired
    })
  };
  constructor(props) {
    super(props);
    this.props.actions.retrieveEquipmentInstances();
    this.state = {
      saveButtonDisabled: true,
      detailsSectionActive:false,
      refresh:true
    };
    this.changeTreeData = this.changeTreeData.bind(this);
    this.addNode = this.addNode.bind(this);
    this.selectRow = this.selectNode.bind(this);
    this.saveEquipmentType = this.saveEquipmentType.bind(this);
    this.s4 = this.s4.bind(this);
    this.guid = this.guid.bind(this);
    this.saveEquipmentInstance = this.saveEquipmentInstance.bind(this);
  }

  componentWillMount() {
    const { actions: { RetrieveEquipmentTree }, equipmentTree } = this.props;
    if(equipmentTree.treeData === undefined || equipmentTree.treeData.length === 0) {
      RetrieveEquipmentTree();
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

  changeTreeData(treeData) {
    const { actions: { setTreeData } } = this.props;
    setTreeData(treeData);
    this.setState({ saveButtonDisabled: false });
  }

  selectNode(rowInfo) {
    const { actions: { selectTreeNode, filterInstancesOfType } } = this.props;
    selectTreeNode(rowInfo);
    filterInstancesOfType(rowInfo.node.eqTypeKey);
    this.setState({ detailsSectionActive:true });
  }

  saveEquipmentType(eqName, eqInfo, nodeId) {
    const { actions: { changeNodeInfo } } = this.props;
    changeNodeInfo(eqName, eqInfo, nodeId);
  }

  saveEquipmentInstance(instance) {
    const { actions: { saveEquipmentInstance, filterInstancesOfType } } = this.props;
    saveEquipmentInstance(instance);
    filterInstancesOfType(instance.typeId);
    this.setState({refresh:!this.state.refresh});
  }

  addNode(rowInfo) {
    let { node, treeIndex, path } = rowInfo;
    const { actions: { setTreeData } } = this.props;
    let parentNode = getNodeAtPath({
      treeData: this.props.equipmentTree.treeData,
      path: path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      ignoreCollapsed: true
    });
    let getNodeKey = ({ node: object, treeIndex: number }) => {
      return number;
    };
    let parentKey = getNodeKey(parentNode);
    if (parentKey == -1) {
      parentKey = null;
    }
    let newTree = addNodeUnderParent({
      treeData: this.props.equipmentTree.treeData,
      parentKey: parentKey,
      expandParent: true,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: {
        title: 'New Equipment',
        eqTypeKey: this.guid(),
        equipmentTypeInfo: { properties:[], general:{isConsumable:false, threshold:'', applicableForMaintenance:false, unit:''}, maintenance:{period:1, units:'', duration:1, durationUnit:'', isDeactivated:false, sendNotificationIfThreshold:false} }
      }
    });
    setTreeData({
      treeData: newTree.treeData
    });
    this.setState({ saveButtonDisabled: false });
  }


  render() {
    let { saveButtonDisabled, detailsSectionActive, refresh } = this.state;
    return (
      <div>
        <div
          className="modal fade"
          id="addEquipmentInstance"
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
                  Add New Instance
                </h4>
              </div>
              <div className="modal-body">
                <EquipmentInstanceBasicInfo
                  equipmentTypeSerial={this.props.equipmentTree.selectedNode.node.eqTypeKey}
                  showSave = {true}
                  onSave={this.saveEquipmentInstance} 
                  refresh={refresh}
                  initialId={''}/>

              </div>
            </div>
          </div>
        </div>
        <Loader loaded={!this.props.equipmentTree.isFetchingEquipmentTree}>
          {(this.props.equipmentTree.retrieveError === null)? 
            <AnimatedView>
              {/* preview: */}
              <div className="row">
                <div className="col-xs-12">
                  <Panel
                    title="Equipment Hierarchy"
                    hasTitle={true}
                    bodyBackGndColor={'#F4F5F6'}>
                    <div className="row">
                      <div style={{ height: 200 }}>
                        <SortableTree
                          treeData={this.props.equipmentTree.treeData}
                          onChange={treeData => this.changeTreeData({ treeData })}
                          generateNodeProps={rowInfo => ({
                            buttons: [
                              <button className="btn btn-info" label="Add"
                                onClick={(event) => this.addNode(rowInfo)}><i className="fa fa-plus" />Add</button>,
                              <button className="btn btn-success" label="Details"
                                onClick={(event) => this.selectNode(rowInfo)}><i className="fa fa-info-circle" />
                            Details
                              </button>
                            ]
                          })}
                        />
                      </div>

                    </div>
                  </Panel>
                  <div className="row">
                    <div className="col-md-2 form-group" />
                    <div className="col-md-2 form-group" />
                    <div className="col-md-2 form-group" />
                    <div className="col-md-2 form-group" />
                    <div className="col-md-2 form-group" />
                    <button className="btn btn-info" disabled={saveButtonDisabled}
                      onClick={() =>
                        this.saveEquipmentType()
                      }
                    >
                  Save
                    </button>
                    <button className="btn btn-info"
                      onClick={() =>
                        this.changeTreeData({
                          treeData: this.props.equipmentTree.treeData.concat({
                            title: 'New Equipment',
                            eqTypeKey: this.guid(),
                            equipmentTypeInfo: { properties: [], general: { isConsumable: false, threshold: '', applicableForMaintenance: false, unit:'' }, maintenance: { period: 1, units: '', duration: 1, durationUnit: '', isDeactivated: false, sendNotificationIfThreshold: false } }
                          })
                        })
                      }
                    >
                  Add Equipment
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12">
                    <Panel
                      title="Details"
                      hasTitle={true}
                      bodyBackGndColor={'#F4F5F6'}>
                      <div className="row">
                        <div style={{ height: 200 }}>
                          <EquipmentTypeInfo
                            equipmentTypeName={this.props.equipmentTree.selectedNode.node.title}
                            equipmentTypeInfo={this.props.equipmentTree.selectedNode.node.equipmentTypeInfo}
                            equipmentTypeSerial={this.props.equipmentTree.selectedNode.node.eqTypeKey}
                            onSave={this.saveEquipmentType} 
                            isActive= {detailsSectionActive}/>
                        </div>
                      </div>
                    </Panel>
                  </div>
                </div>   


              </div>
            </AnimatedView>: <p>{this.props.equipmentTree.retrieveError}</p>}
        </Loader>
      </div >
    );
  }
}

export default withRouter(EquipmentTree);

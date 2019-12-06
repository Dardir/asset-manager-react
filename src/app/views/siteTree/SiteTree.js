// @flow weak

import React, {
  PureComponent
} from 'react';

import TextInput from '../../components/textInput/TextInput';
import TabPanel             from '../../components/tabPanel/TabPanel/TabPanel';
import TabPanelHeader       from '../../components/tabPanel/tabPanelHeader/TabPanelHeader';
import TabPanelBody         from '../../components/tabPanel/tabPanelBody/TabPanelBody';
import TabPanelBodyContent  from '../../components/tabPanel/TabPanelBodyContent/tabPanelBodyContent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';
import { withRouter } from 'react-router';
import {
  AnimatedView, Panel
} from '../../components';

import SortableTree, { addNodeUnderParent, removeNodeAtPath, getNodeAtPath } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import Loader from 'react-loader';


class SiteTree extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      setTreeData: PropTypes.func.isRequired,
      selectTreeNode: PropTypes.func.isRequired,
      RetrieveSiteTree: PropTypes.func.isRequired
    })
  };
  constructor(props) {
    super(props);
    this.state = {
      saveButtonDisabled: true
    };
    this.changeTreeData = this.changeTreeData.bind(this);
    this.addNode = this.addNode.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.savesiteTree = this.savesiteTree.bind(this);
    this.guid = this.guid.bind(this);
    this.s4 = this.s4.bind(this);
  }

  componentWillMount() {
    const { actions: { RetrieveSiteTree }, siteTree } = this.props;
    if(siteTree.treeData === undefined || siteTree.treeData.length === 0) {
      RetrieveSiteTree();
    }
  }

  changeTreeData(treeData) {
    const { actions: { setTreeData } } = this.props;
    setTreeData(treeData);
    this.setState({ saveButtonDisabled: false });
  }

  selectRow(rowInfo) {
    const { actions: { selectTreeNode } } = this.props;
    selectTreeNode(rowInfo);
  }

  savesiteTree() {

  }

  addNode(rowInfo) {
    let { node, treeIndex, path } = rowInfo;
    const { actions: { setTreeData } } = this.props;
    let parentNode = getNodeAtPath({
      treeData: this.props.siteTree.treeData,
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
      treeData: this.props.siteTree.treeData,
      parentKey: parentKey,
      expandParent: true,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: {
        title: 'New Location',
        locKey:this.guid()
      }
    });
    setTreeData({
      treeData: newTree.treeData
    });
    this.setState({ saveButtonDisabled: false });
  }

  guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
    this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }
  
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const mockHeader = [
      {name: 'Properties', tablink: 'properties', isActive: true},
      {name: 'Location', tablink: 'location', isActive: false},
      {name: 'Instances', tablink: 'instances', isActive: false},
      {name: 'Preventive Maintenance', tablink: 'maintenance', isActive: false}
    ];
    let { saveButtonDisabled } = this.state;
    return (
      <div>
        <div
          className="modal fade"
          id="equipmentTypeModal"
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
                  {this.props.siteTree.selectedSiteNode.title}
                </h4>
              </div>
              <div className="modal-body">
                <TabPanel>
                  <TabPanelHeader tabItems={mockHeader} />
                  <TabPanelBody>
                    <TabPanelBodyContent id="properties">
                      &nbsp;properties
                    </TabPanelBodyContent>
                    <TabPanelBodyContent id="location">+
                      &nbsp;location
                    </TabPanelBodyContent>
                    <TabPanelBodyContent id="instances">
                      &nbsp;instances
                    </TabPanelBodyContent>
                    <TabPanelBodyContent id="maintenance">
                      &nbsp;maintenance
                    </TabPanelBodyContent>
                  </TabPanelBody>
                </TabPanel>
              </div>
              <div className="modal-footer">
                <button
                  data-dismiss="modal"
                  className="btn btn-default"
                  type="button">
                  Close
                </button>
                <button
                  className="btn btn-success"
                  type="button">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <Loader loaded={!this.props.siteTree.isFetchingSiteTree}>
          {(this.props.siteTree.retrieveError === null)? 
            <AnimatedView>
              {/* preview: */}
              <div className="row">
                <div className="col-xs-12">
                  <Panel
                    title="Site Hierarchy"
                    hasTitle={true}
                    bodyBackGndColor={'#F4F5F6'}>
                    <div className="row">
                      <div style={{ height: 400 }}>
                        <SortableTree
                          treeData={this.props.siteTree.treeData}
                          onChange={treeData => this.changeTreeData({ treeData })}
                          generateNodeProps={rowInfo => ({
                            buttons: [
                              <button className="btn btn-info" label="Add"
                                onClick={(event) => this.addNode(rowInfo)}>Add Location</button>,
                              <button className="btn btn-success" label="Open"
                                onClick={(event) => this.selectRow(rowInfo)} data-toggle="modal">
                                <a
                                  href="#siteModal"
                                  data-toggle="modal"
                                  className="btn btn-xs btn-success">
                              Open
                                </a>
                              </button>
                            ]
                          })}
                        />
                      </div>

                    </div>
                  </Panel>
                  <div className="row">
                    <div className="col-md-1 form-group" />
                    <div className="col-md-1 form-group" />
                    <div className="col-md-1 form-group" />
                    <div className="col-md-1 form-group" />
                    <div className="col-md-1 form-group" />
                    <div className="col-md-1 form-group" />
                    <div className="col-md-1 form-group" />
                    <div className="col-md-1 form-group" />
                    <div className="col-md-1 form-group" />
                    <div className="col-md-1 form-group" />
                
                    <button className="btn btn-info" disabled={saveButtonDisabled}
                      onClick={() =>
                        this.savesiteTree()
                      }
                    >
                  Save
                    </button>
                    <button className="btn btn-info"
                      onClick={() =>
                        this.changeTreeData({
                          treeData: this.props.siteTree.treeData.concat({
                            title: 'New Site'
                          })
                        })
                      }
                    >
                  Add Site
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedView> : <p>{this.props.siteTree.retrieveError}</p>}
        </Loader>
      </div>
    );
  }
}

export default withRouter(SiteTree);

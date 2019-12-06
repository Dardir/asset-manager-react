// @flow weak

import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';


class EquipmentInstanceBasicInfo extends PureComponent {
  static propTypes = {
    equipmentTypeSerial: PropTypes.string,
    onSave: PropTypes.func,
    showSave:PropTypes.bool.isRequired,
    initializedInstance:PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      instance: {
        typeId: '',
        id: '',
        locationId: '',
        isActive: true,
        lastPerventiveMaintenance:{},
	      preventiveMaintenances:[],
	      correctiveMaintenances:[],
        paramValues: [],
        parentInstanceId: ''
      },
      isGenerateId: false,
      disableIdBox: false
    };
    if ('initializedInstance' in this.props) {
      this.state.instance = this.props.initializedInstance;
    }

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleGenerateId = this.handleGenerateId.bind(this);
    this.s4 = this.s4.bind(this);
    this.guid = this.guid.bind(this);
    this.handleIsActive = this.handleIsActive.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isGenerateId:false, instance: { ...this.state.instance, id: nextProps.initialId, typeId: nextProps.equipmentTypeSerial } });;
  }

  handleSaveButton() {
    this.state.instance.typeId = this.props.equipmentTypeSerial;
    this.props.onSave(this.state.instance);
  }


  handleIdChange(event) {
    this.setState({ instance: { ...this.state.instance, id: event.target.value } });
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

  handleGenerateId(event) {
    let generateId = this.state.isGenerateId;
    generateId = !generateId;
    if (generateId) {
      let newInstance = { ...this.state.instance, id: this.guid() };
      this.setState({ isGenerateId: generateId, instance: newInstance, disableIdBox: true });
    } else {
      let newInstance = { ...this.state.instance, id: '' };
      this.setState({ isGenerateId: generateId, instance: newInstance, disableIdBox: false });
    }
  }
  
  handleIsActive(e) {
    let active = this.state.isActive;
    active = !active;
    this.setState({ instance: { ...this.state.instance, isActive: active } });
  }

  render() {
    let { instance, disableIdBox, isGenerateId } = this.state;
    let { id, isActive } = instance;
    let{showSave} = this.props;
    return (
      <form role="form">
        <div className="form-group">
          <label htmlFor="equipmentTypeKey">
            Type Serial
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
          <div className="row">
            <div className="col-md-12 form-group">
              <label htmlFor="instanceID">
                Instance Serial
              </label>
              <input
                type="text"
                className="form-control"
                id="instanceID"
                value={id}
                onChange={(event) => this.handleIdChange(event)}
                disabled={disableIdBox}
              />
            </div>
            <div className="col-md-6 form-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" onChange={(event) => this.handleGenerateId(event)} checked = {isGenerateId}/>
                  Generate Serial
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">       
          <div className="form-group">
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={isActive} onChange={(event) => this.handleIsActive(event)} />
                  Is Active
              </label>
            </div>
          </div>

          {(showSave)?
            <div className="row">
              <div className="col-md-2 form-group" />
              <div className="col-md-2 form-group" />
              <div className="col-md-2 form-group" />
              <div className="col-md-2 form-group" />
              <div className="col-md-2 form-group" />
              <button className="btn btn-info" data-dismiss="modal"
                onClick={() =>
                  this.handleSaveButton()
                }
              >
                  Save
              </button>
            </div>:null
          }
        </div>
      </form>
    );
  }
}
    
    
export default EquipmentInstanceBasicInfo;

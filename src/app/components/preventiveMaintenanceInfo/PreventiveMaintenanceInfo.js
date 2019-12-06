// @flow weak

import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class PreventiveMaintenanceInfo extends PureComponent {
  static propTypes = {
    instanceSerial: PropTypes.string,
    typeSerial: PropTypes.string,
    onSave: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      preventiveMaintenance: {
        id:'',
        date: moment(),
        location:'',
        responsible:'',
        notes:'',
        instanceId:'',
        typeId:''
      },
      isGenerateId: false,
      disableIdBox: false
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleGenerateId = this.handleGenerateId.bind(this);
    this.s4 = this.s4.bind(this);
    this.guid = this.guid.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleResponsibleChange = this.handleResponsibleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state.preventiveMaintenance.instanceId = nextProps.instanceSerial;
    this.state.preventiveMaintenance.typeId = nextProps.typeSerial;
  }

  handleSaveButton() {
    this.state.preventiveMaintenance.instanceId = this.props.instanceSerial;
    this.state.preventiveMaintenance.typeId = this.props.typeSerial;
    this.props.onSave(this.state.preventiveMaintenance);
  }

  handleLocationChange(event) {
    this.setState({ preventiveMaintenance: { ...this.state.preventiveMaintenance, location: event.target.value } });
  }

  handleResponsibleChange(event) {
    this.setState({ preventiveMaintenance: { ...this.state.preventiveMaintenance, responsible: event.target.value } });
  }
  
  handleNotesChange(event) {
    this.setState({ preventiveMaintenance: { ...this.state.preventiveMaintenance, notes: event.target.value } });
  }


  handleIdChange(event) {
    this.setState({ preventiveMaintenance: { ...this.state.preventiveMaintenance, id: event.target.value } });
  }

  handleDateChange(date) {
    this.setState({ preventiveMaintenance: { ...this.state.preventiveMaintenance, date: date } });
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
      let newInstance = { ...this.state.preventiveMaintenance, id: this.guid() };
      this.setState({ isGenerateId: generateId, preventiveMaintenance: newInstance, disableIdBox: true });
    } else {
      let newInstance = { ...this.state.preventiveMaintenance, id: '' };
      this.setState({ isGenerateId: generateId, preventiveMaintenance: newInstance, disableIdBox: false });
    }
  }

  render() {
    let { preventiveMaintenance, disableIdBox } = this.state;
    let { id, location, date, responsible, notes, warrentyExpiryDate } = preventiveMaintenance;
    return (
      <form role="form">
        <div className="form-group">
          <label htmlFor="equipmentinstanceKey">
            Instance ID
          </label>
          <input
            type="text"
            className="form-control"
            id="equipmentinstanceKey"
            value={this.props.instanceSerial}
            disabled={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="equipmentTypeKey">
            Type ID
          </label>
          <input
            type="text"
            className="form-control"
            id="equipmentTypeKey"
            value={this.props.typeSerial}
            disabled={true}
          />
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-md-12 form-group">
              <label htmlFor="instanceID">
                Maintenance ID
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
                  <input type="checkbox" onChange={(event) => this.handleGenerateId(event)} />
                  Generate ID
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="location">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={location}
                onChange={(event) => this.handleLocationChange(event)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="responsible">
                Responsible
              </label>
              <input
                type="text"
                className="form-control"
                id="responsible"
                value={responsible}
                onChange={(event) => this.handleResponsibleChange(event)}
              />
            </div>
          </div>
          <div className="form-group">
            <hr/>
            <div className="row">
              <div className="col-md-12 form-group" >
                <label
                  htmlFor="maintenanceDate"
                  className="control-label has-blue">
                      Maintenance Date

                </label>
                <DatePicker
                  className="form-control"
                  selected={date}
                  onChange={this.handleDateChange} id="maintenanceDate"
                />
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-12 form-group">
                <label htmlFor="notes">
                Notes
                </label>
                <textarea className="form-control" rows="4" cols="50" value={notes}
                  onChange={(event) => this.handleNotesChange(event)}/>
              </div>
            </div>
            

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
            </div> 
          </div>
        </div>
      </form>
    );
  }
}


export default PreventiveMaintenanceInfo;

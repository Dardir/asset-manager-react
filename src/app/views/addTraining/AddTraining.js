// @flow weak

import React, {
  PureComponent
}                     from 'react';

import TextInput from '../../components/textInput/TextInput';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes          from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';
import { withRouter } from 'react-router';
import {
  AnimatedView, Panel
}                         from '../../components';


class AddTraining extends PureComponent {
  static propTypes= {
    actions: PropTypes.shape({
      saveTraining: PropTypes.func.isRequired
    })
  };
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      selectedtrType: this.props.trainingTypes[0],
      place: '',
      endDate: moment(),
      provider: '',
      attendees: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectTrType = this.handleSelectTrType.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.handleProviderChange = this.handleProviderChange.bind(this);
    this.handleAttendeesChange = this.handleAttendeesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(date) {
    const currentState = this.state;
    currentState.startDate  = date;
    this.setState({
      currentState
    });
  }

  handleEndDate(date) {
    const currentState = this.state;
    currentState.endDate  = date;
    this.setState({
      currentState
    });
  }

  handleSelectTrType(e) {
    const currentState = this.state;
    currentState.selectedtrType  = e.target.value;
    this.setState({
      currentState
    });
  }
  
  handlePlaceChange(val) {
    const currentState = this.state;
    currentState.place  = val;
    this.setState({
      currentState
    });
  }

  handleProviderChange(val) {
    const currentState = this.state;
    currentState.provider  = val;
    this.setState({
      currentState
    });
  }

  handleAttendeesChange(val) {
    const currentState = this.state;
    currentState.attendees  = val;
    this.setState({
      currentState
    });
  }

  handleSubmit() {
    const { actions: { saveTraining } } = this.props;
    saveTraining(
      {
        trainingType: this.state.selectedtrType,
        startOfTraining: this.state.startDate,
        endDate: this.state.endDate,
        place: this.state.place,
        provider: this.state.provider,
        attendees: this.state.attendees
      }
    );  
    this.props.history.push('/exportTraining');
  }

  render() {
    return(
      <AnimatedView>
        {/* preview: */}
        <div className="row">
          <div className="col-xs-12">
            <Panel
              title="Please Enter Training Details"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}>
              <div className="row">
                <div className="col-md-4 form-group">
                  <label
                    className="control-label"
                    htmlFor="trainingTypeSelect">
                    <font color="blue">
                  Training Type
                    </font>
                  </label>
                  <div>
                    <select className="form-control" id="trainingTypeSelect" value={this.state.selectedtrType} onChange={this.handleSelectTrType} >
                      {
                        this.props.trainingTypes.map(trType =><option key={trType.key}>{trType.value}</option>)
                      }
                    </select>
                  </div>
                </div>

                <div className="col-md-4 form-group">
                  <label
                    htmlFor="startDate"
                    className="control-label has-blue">
                    <font color="blue">
                      Start Of Training
                    </font>
                  </label>
                  <DatePicker
                    className="form-control"
                    selected={this.state.startDate}
                    onChange={this.handleChange} id="startDate"
                  />
                </div>
                
                <div className="col-md-4 form-group">
                  <label
                    htmlFor="endDate"
                    className="control-label has-blue">
                    <font color="blue">
                      End Date
                    </font>
                  </label>
                  <DatePicker
                    className="form-control"
                    selected={this.state.endDate}
                    onChange={this.handleEndDate} id="endDate"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 form-group">
                  <TextInput label="Place" id="place_input" value={this.state.place} onChange={this.handlePlaceChange}/>
                </div>

                <div className="col-md-4 form-group">
                  <TextInput label="Provider" id="provider_input" value={this.state.provider} onChange={this.handleProviderChange}/>
                </div>
                
                <div className="col-md-4 form-group">
                  <TextInput label="Number of Attendees" id="attendees_input" value={this.state.attendees} onChange={this.handleAttendeesChange}/>
                </div>
              </div>
            </Panel>
            <div className="row">
              <div className="col-md-2 form-group"/>
              <div className="col-md-2 form-group"/>
              <div className="col-md-2 form-group"/>
              <div className="col-md-2 form-group"/>
              <div className="col-md-2 form-group"/>
              <button type="submit" className="btn btn-info" onClick ={this.handleSubmit} >Submit</button>
            </div>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

export default withRouter(AddTraining);

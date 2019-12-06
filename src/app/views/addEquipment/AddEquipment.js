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


class AddEquipment extends PureComponent {
  static propTypes= {
    actions: PropTypes.shape({
      saveEquipment: PropTypes.func.isRequired
    })
  };
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      selectedEqType: this.props.equipmentTypes[0],
      expiryDate: moment(),
      cost: '',
      brand: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectEqType = this.handleSelectEqType.bind(this);
    this.handleExpiryDate = this.handleExpiryDate.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(date) {
    const currentState = this.state;
    currentState.startDate  = date;
    this.setState({
      currentState
    });
  }

  handleExpiryDate(date) {
    const currentState = this.state;
    currentState.expiryDate  = date;
    this.setState({
      currentState
    });
  }

  handleSelectEqType(e) {
    const currentState = this.state;
    currentState.selectedEqType  = e.target.value;
    this.setState({
      currentState
    });
  }
  

  handleCostChange(val) {
    const currentState = this.state;
    currentState.cost  = val;
    this.setState({
      currentState
    });
  }

  handleBrandChange(val) {
    const currentState = this.state;
    currentState.brand  = val;
    this.setState({
      currentState
    });
  }

  handleSubmit() {
    const { actions: { saveEquipment } } = this.props;
    saveEquipment(
      {
        equipmentType: this.state.selectedEqType,
        startOfService: this.state.startDate,
        expiryDate: this.state.expiryDate,
        cost: this.state.cost,
        brand: this.state.brand
      }
    );  
    this.props.history.push('/exportEquipment');
  }

  render() {
    return(
      <AnimatedView>
        {/* preview: */}
        <div className="row">
          <div className="col-xs-12">
            <Panel
              title="Please Enter Equipment Details"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}>
              <div className="row">
                <div className="col-md-4 form-group">
                  <label
                    className="control-label"
                    htmlFor="equipmentTypeSelect">
                    <font color="blue">
                  Equipment Type
                    </font>
                  </label>
                  <div>
                    <select className="form-control" id="equipmentTypeSelect" value={this.state.selectedEqType} onChange={this.handleSelectEqType} >
                      {
                        this.props.equipmentTypes.map(eqType =><option key={eqType.key}>{eqType.value}</option>)
                      }
                    </select>
                  </div>
                </div>

                <div className="col-md-4 form-group">
                  <label
                    htmlFor="startDate"
                    className="control-label has-blue">
                    <font color="blue">
                      Start Of Service
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
                    htmlFor="expiryDate"
                    className="control-label has-blue">
                    <font color="blue">
                      Expiry Date
                    </font>
                  </label>
                  <DatePicker
                    className="form-control"
                    selected={this.state.expiryDate}
                    onChange={this.handleExpiryDate} id="expiryDate"
                  />
                </div>
              </div>

              <div className="row">

                <div className="col-md-4 form-group">
                  <TextInput label="Cost" id="cost_input" value={this.state.cost} onChange={this.handleCostChange}/>
                </div>
                
                <div className="col-md-4 form-group">
                  <TextInput label="Brand" id="brand_input" value={this.state.brand} onChange={this.handleBrandChange}/>
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

export default withRouter(AddEquipment);

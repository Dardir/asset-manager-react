// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import TextInput from '../textInput/TextInput';


class VehicleIncident extends PureComponent {
  static propTypes = {
    carTypes:            PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelectedCarType: PropTypes.func,
    handleCarPlateNumber: PropTypes.func,
    handleNumberOfKilos: PropTypes.func,
    handleCostOfIncident: PropTypes.func,
    handleNumberOfRoadInjuries: PropTypes.func,
    handleNumberOfRoadFatalities: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCarType:'',
      carPlateNumber:'',
      numberOfKilos:'',
      costOfIncident:'',
      numberOfRoadInjuries:'',
      numberOfRoadFatalities:''
    };
    this.handleCarType = this.handleCarType.bind(this);
    this.handlePlateNumber = this.handlePlateNumber.bind(this);
    this.handleKilos = this.handleKilos.bind(this);
    this.handleCost = this.handleCost.bind(this);
    this.handleInjuries = this.handleInjuries.bind(this);
    this.handleFatalities = this.handleFatalities.bind(this);
  }

  handleCarType(val) {
    this.props.handleSelectedCarType(val);
  }

  handlePlateNumber(val) {
    this.props.handleCarPlateNumber(val);
  }

  handleKilos(val) {
    this.props.handleNumberOfKilos(val);
  }

  handleInjuries(val) {
    this.props.handleNumberOfRoadInjuries(val);
  }
  
  handleFatalities(val) {
    this.props.handleNumberOfRoadFatalities(val);
  }

  handleCost(val) {
    this.props.handleCostOfIncident(val);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4 form-group">
            <label
              className="control-label"
              htmlFor="carTypeSelect">
              <font color="blue">
                  Vehicle Type
              </font>
            </label>
            <div>
              <select className="form-control" id="carTypeSelect" value={this.state.selectedCarType} onChange={this.handleCarType} >
                {
                  this.props.carTypes.map(carType =><option key={carType.key}>{carType.value}</option>)
                }
              </select>
            </div>
          </div>
          <div className="col-md-4 form-group">
            <TextInput label="Car Plate Number" id="plate_input" value={this.state.carPlateNumber} onChange={this.handlePlateNumber}/>
          </div>
          <div className="col-md-4 form-group">
            <TextInput label="Number of kilos" id="kilos_input" value={this.state.numberOfKilos} onChange={this.handleKilos}/>
          </div>  
        </div>

        <div className="row">
          <div className="col-md-4 form-group">
            <TextInput label="Cost of Incident" id="cost_input" value={this.state.costOfIncident} onChange={this.handleCost}/>
          </div>
          <div className="col-md-4 form-group">
            <TextInput label="Number of Road Injuries" id="injuries_input" value={this.state.numberOfRoadInjuries} onChange={this.handleInjuries}/>
          </div>
          <div className="col-md-4 form-group">
            <TextInput label="Number of Road Fatalities" id="fatalities_input" value={this.state.numberOfRoadFatalities} onChange={this.handleFatalities}/>
          </div>
        </div>
      </div>
    );
  }
}

export default VehicleIncident;

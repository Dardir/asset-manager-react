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

import {FireIncident} from '../../components';
import {VehicleIncident} from '../../components';


class AddIncident extends PureComponent {
  static propTypes= {
    actions: PropTypes.shape({
      saveIncident: PropTypes.func.isRequired
    })
  };
  constructor(props) {
    super(props);
    this.state = {
      incidentDate: moment(),
      selectIncidentType: this.props.incidentTypes[0],
      fatalitiesNo: '',
      injuriesNo: '',
      lostHoursNo: '',
      fireIncident:{
        equipmentLoss:'',
        totalLoss:'',
        prdLoss:'',
        materialLoss:''
      },
      vehicleIncident:{
        carType:'',
        plateNumber:'',
        numberOfKilos:'',
        costOfIncident:'',
        roadInjuries:'',
        roadFatalities:''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectIncidentType = this.handleSelectIncidentType.bind(this);
    this.handleExpiryDate = this.handleExpiryDate.bind(this);
    this.handleFatalitiesChange = this.handleFatalitiesChange.bind(this);
    this.handleInjuriestChange = this.handleInjuriestChange.bind(this);
    this.handleHoursChange = this.handleHoursChange.bind(this);

    this.handleEquipmentLoss= this.handleEquipmentLoss.bind(this);
    this.handleTotalLoss= this.handleTotalLoss.bind(this);
    this.handleProductionInterruptionLoss= this.handleProductionInterruptionLoss.bind(this);
    this.handleMaterialDamage= this.handleMaterialDamage.bind(this);

    this.handleSelectedCarType= this.handleSelectedCarType.bind(this);
    this.handleCarPlateNumber= this.handleCarPlateNumber.bind(this);
    this.handleNumberOfKilos= this.handleNumberOfKilos.bind(this);
    this.handleCostOfIncident= this.handleCostOfIncident.bind(this);
    this.handleNumberOfRoadInjuries= this.handleNumberOfRoadInjuries.bind(this);
    this.handleNumberOfRoadFatalities= this.handleNumberOfRoadFatalities.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(date) {
    const currentState = this.state;
    currentState.incidentDate  = date;
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

  handleSelectIncidentType(e) {
    const currentState = this.state;
    currentState.selectIncidentType  = e.target.value;
    this.setState({
      currentState
    });
  }
  
  handleFatalitiesChange(val) {
    const currentState = this.state;
    currentState.fatalitiesNo  = val;
    this.setState({
      currentState
    });
  }

  handleInjuriestChange(val) {
    const currentState = this.state;
    currentState.injuriesNo  = val;
    this.setState({
      currentState
    });
  }

  handleHoursChange(val) {
    const currentState = this.state;
    currentState.lostHoursNo  = val;
    this.setState({
      currentState
    });
  }

  handleEquipmentLoss(val) {
    const currentState = this.state;
    currentState.fireIncident.equipmentLoss  = val;
    this.setState({
      currentState
    });
  }

  handleTotalLoss(val) {
    const currentState = this.state;
    currentState.fireIncident.totalLoss  = val;
    this.setState({
      currentState
    });
  }

  handleProductionInterruptionLoss(val) {
    const currentState = this.state;
    currentState.fireIncident.prdLoss  = val;
    this.setState({
      currentState
    });
  }

  handleMaterialDamage(val) {
    const currentState = this.state;
    currentState.fireIncident.materialLoss  = val;
    this.setState({
      currentState
    });
  }

  handleSelectedCarType(val) {
    const currentState = this.state;
    currentState.vehicleIncident.carType  = val;
    this.setState({
      currentState
    });
  }

  handleCarPlateNumber(val) {
    const currentState = this.state;
    currentState.vehicleIncident.plateNumber  = val;
    this.setState({
      currentState
    });
  }

  handleNumberOfKilos(val) {
    const currentState = this.state;
    currentState.vehicleIncident.numberOfKilos  = val;
    this.setState({
      currentState
    });
  }

  handleCostOfIncident(val) {
    const currentState = this.state;
    currentState.vehicleIncident.costOfIncident  = val;
    this.setState({
      currentState
    });
  }

  handleNumberOfRoadInjuries(val) {
    const currentState = this.state;
    currentState.vehicleIncident.roadInjuries  = val;
    this.setState({
      currentState
    });
  }

  handleNumberOfRoadFatalities(val) {
    const currentState = this.state;
    currentState.vehicleIncident.roadFatalities  = val;
    this.setState({
      currentState
    });
  }

  handleSubmit() {
    const { actions: { saveIncident } } = this.props;
    switch(this.state.selectIncidentType){
    case 'Fire incident':
      saveIncident(
        {
          incidentType: this.state.selectIncidentType,
          incidentDate: this.state.incidentDate,
          fatalitiesNo: this.state.fatalitiesNo,
          injuriesNo: this.state.injuriesNo,
          lostHoursNo: this.state.lostHoursNo,
          fireIncident: this.state.fireIncident
        }); break;
    case 'Vehicle incident':
      saveIncident(
        {
          incidentType: this.state.selectIncidentType,
          incidentDate: this.state.incidentDate,
          fatalitiesNo: this.state.fatalitiesNo,
          injuriesNo: this.state.injuriesNo,
          lostHoursNo: this.state.lostHoursNo,
          vehicleIncident: this.state.vehicleIncident
        }); break;    
    default:
    }
    this.props.history.push('/exportIncident');
  }

  render() {
    let incidentSection;
    switch(this.state.selectIncidentType) {
    case 'Fire incident': incidentSection = 
              (<FireIncident handleEquipmentLoss={this.handleEquipmentLoss}
                handleMaterialDamage={this.handleMaterialDamage}
                handleProductionInterruptionLoss={this.handleProductionInterruptionLoss}
                handleTotalLoss={this.handleTotalLoss}/>); break;
    case 'Vehicle incident': incidentSection = 
                (<VehicleIncident carTypes={this.props.carTypes}  
                  handleSelectedCarType={this.handleSelectedCarType}
                  handleCarPlateNumber={this.handleCarPlateNumber}
                  handleNumberOfKilos={this.handleNumberOfKilos}
                  handleCostOfIncident={this.handleCostOfIncident}
                  handleNumberOfRoadInjuries={this.handleNumberOfRoadInjuries}
                  handleNumberOfRoadFatalities={this.handleNumberOfRoadFatalities}/>); break;
    default: incidentSection = null;
    }
    return(
      <AnimatedView>
        {/* preview: */}
        <div className="row">
          <div className="col-xs-12">
            <Panel
              title="Please Enter Incident Details"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}>
              <div className="row">
                <div className="col-md-4 form-group">
                  <label
                    className="control-label"
                    htmlFor="incidentTypeSelect">
                    <font color="blue">
                  Incident Type
                    </font>
                  </label>
                  <div>
                    <select className="form-control" id="incidentTypeSelect" value={this.state.selectIncidentType} onChange={this.handleSelectIncidentType} >
                      {
                        this.props.incidentTypes.map(incType =><option key={incType.key}>{incType.value}</option>)
                      }
                    </select>
                  </div>
                </div>

                <div className="col-md-4 form-group">
                  <label
                    htmlFor="incidentDate"
                    className="control-label has-blue">
                    <font color="blue">
                      Incident Date
                    </font>
                  </label>
                  <DatePicker
                    className="form-control"
                    selected={this.state.incidentDate}
                    onChange={this.handleChange} id="incidentDate"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 form-group">
                  <TextInput label="Number of Injuries" id="injuries_input" value={this.state.injuriesNo} onChange={this.handleInjuriestChange}/>
                </div>
                
                <div className="col-md-4 form-group">
                  <TextInput label="Number of Lost Hours" id="hours_input" value={this.state.lostHoursNo} onChange={this.handleHoursChange}/>
                </div>

                <div className="col-md-4 form-group">
                  <TextInput label="Number of fatalities (in the field)" id="fatalities_input" value={this.state.fatalitiesNo} onChange={this.handleFatalitiesChange}/>
                </div>
                
              </div>

              {incidentSection}
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

export default withRouter(AddIncident);

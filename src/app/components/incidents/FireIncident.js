// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import TextInput from '../textInput/TextInput';


class FireIncident extends PureComponent {
  static propTypes = {
    handleEquipmentLoss: PropTypes.func,
    handleTotalLoss: PropTypes.func,
    handleProductionInterruptionLoss: PropTypes.func,
    handleMaterialDamage: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      eqipmentLosses:'',
      totalLosses:'',
      prdLosses:'',
      matLosses:''
    };
    this.handleEqLos = this.handleEqLos.bind(this);
    this.handleTotLos = this.handleTotLos.bind(this);
    this.handlePrdLos = this.handlePrdLos.bind(this);
    this.handleMatLos = this.handleMatLos.bind(this);
  }

  handleEqLos(val) {
    this.props.handleEquipmentLoss(val);
  }

  handleTotLos(val) {
    this.props.handleTotalLoss(val);
  }

  handlePrdLos(val) {
    this.props.handleProductionInterruptionLoss(val);
  }

  handleMatLos(val) {
    this.props.handleMaterialDamage(val);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4 form-group">
            <TextInput label="Equipment Losses" id="eqLosses_input" value={this.state.eqipmentLosses} onChange={this.handleEqLos}/>
          </div>
          <div className="col-md-4 form-group">
            <TextInput label="Total Losses in EGP" id="totalLosses_input" value={this.state.totalLosses} onChange={this.handleTotLos}/>
          </div>
          <div className="col-md-4 form-group">
            <TextInput label="Losses Due to Production Interruption" id="prdLosses_input" value={this.state.prdLosses} onChange={this.handlePrdLos}/>
          </div>  
        </div>

        <div className="row">
          <div className="col-md-4 form-group">
            <TextInput label="Losses Due to Material Damage" id="matLosses_input" value={this.state.matLosses} onChange={this.handleMatLos}/>
          </div>
        </div>
      </div>
    );
  }
}

export default FireIncident;

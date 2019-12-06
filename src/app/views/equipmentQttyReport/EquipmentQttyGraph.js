// @flow weak

import React, {
  PureComponent
}                         from 'react';
import {
  AnimatedView,
  Panel,
  EarningGraph as EarningGraphComponent  
}                         from '../../components';

import BarChart from '../../components/barChart/BarChart';

class EquipmentQttyGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Fire Truck',
          backgroundColor: 'rgba(255,255,204,0.5)',
          borderColor: 'yellow',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Ambulance',
          backgroundColor: 'rgba(221,255,247,0.5)',
          borderColor: 'blue',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ],
      datasetsBar: [
        {
          label: 'Fire Truck',
          backgroundColor: '#d6b80e',
          borderColor: '#d6b80e',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Ambulance',
          backgroundColor: '#8e9fe5',
          borderColor: '#8e9fe5',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }
  
  render() {
    const {labels, datasets,datasetsBar} = this.state;

    
    return(
      <AnimatedView>
        {/* preview: */}
        <div className="row">
          <div className="col-xs-12">
            <Panel
              title="Equipment Quantities"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}>
              <div className="row">
                <div className="col-md-4 form-group">
                  <label
                    className="control-label"
                    htmlFor="regionSelect">
                    <font color="blue">
                  Region
                    </font>
                  </label>
                  <div>
                    <select className="form-control" id="regionSelect" value={this.state.selectedEqType} onChange={this.handleSelectEqType} >
                      {
                        this.props.regions.map(eqType =><option key={eqType.key}>{eqType.value}</option>)
                      }
                    </select>
                  </div>
                </div>

                <div className="col-md-4 form-group">
                  <label
                    className="control-label"
                    htmlFor="companySelect">
                    <font color="blue">
                  Company
                    </font>
                  </label>
                  <div>
                    <select className="form-control" id="companySelect" value={this.state.selectedEqType} onChange={this.handleSelectEqType} >
                      {
                        this.props.companies.map(eqType =><option key={eqType.key}>{eqType.value}</option>)
                      }
                    </select>
                  </div>
                </div>

                <div className="col-md-4 form-group">
                  <label
                    className="control-label"
                    htmlFor="siteSelect">
                    <font color="blue">
                  Sites
                    </font>
                  </label>
                  <div>
                    <select className="form-control" id="siteSelect" value={this.state.selectedEqType} onChange={this.handleSelectEqType} >
                      {
                        this.props.sites.map(eqType =><option key={eqType.key}>{eqType.value}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <EarningGraphComponent
                    labels={labels}
                    datasets={datasets}
                    title="Quantity graph"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <BarChart
                    labels={labels}
                    datasets={datasetsBar}
                    title="Bar graph"
                  />
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

export default EquipmentQttyGraph;

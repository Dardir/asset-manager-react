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

class PrevMaintOccGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.getDataSets = this.getDataSets.bind(this);
    let datasets = this.getDataSets();
    let years = [2000];
    for(let i=0; i<=50; i++) {
      years.push(years[i]+1);
    }
    years = years.map((year)=>{
      return {
        key: year,
        value:year
      }
    });
    this.state = {
      labels: this.props.months,
      datasets: datasets,
      years:years
    };
  }

  getDataSets() {
    let allEquipmentTypes = this.props.preventiveMaintenances.allinstances.map(function (currentMaintenance) {
      return currentMaintenance.typeId;
    });
    let uniqueEquipmentTypes = this.uniq(allEquipmentTypes);
    let allPreventiveMaintences = this.props.preventiveMaintenances;
    let sets = uniqueEquipmentTypes.map(function (eqType) {
      let countList=[];
      // looping over the 12 months
      for(let i=1; i<=12; i++) {
        let count = 0;
        let maintListFilteredPerMonthPerType = allPreventiveMaintences.allinstances.filter(function (maintenance) {
          if(maintenance.typeId === eqType) {
            let month = maintenance.date.toDate().getMonth()+1;
            if(month === i) {
              count = count+1;
              return true;
            }else{
              return false;
            }
          }else{
            return false;
          }
        });
        countList.push(count);
      }
      return countList;
    });
    console.log('resulted sets is '+JSON.stringify(sets));
    let colors = this.props.colors;

    let resultDataSet = sets.map(function (set, index) {
      return{
        label: uniqueEquipmentTypes[index],
        backgroundColor: colors[index],
        borderColor: '#d6b80e',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: set
      };
    });
    console.log('resultDataSet is '+JSON.stringify(resultDataSet));
    return resultDataSet;
  }
  uniq(a) {
    let seen = {};
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }
  
  render() {
    const {labels, datasets} = this.state;
    return(
      <AnimatedView>
        {/* preview: */}
        <div className="row">
          <div className="col-xs-12">
            <Panel
              title="Preventive Maintenance Per Equipment Types"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}>
              <div className="row">
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
                <div className="col-md-4 form-group">
                  <label
                    className="control-label"
                    htmlFor="yearSelect">
                    <font color="blue">
                  Year
                    </font>
                  </label>
                  <div>
                    <select className="form-control" id="yearSelect" value={this.state.selectedEqType} onChange={this.handleSelectEqType} >
                      {
                        this.state.years.map(year =><option key={year.key}>{year.value}</option>)
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
                    title="Maintenance graph Per Months"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <BarChart
                    labels={labels}
                    datasets={datasets}
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

export default PrevMaintOccGraph;

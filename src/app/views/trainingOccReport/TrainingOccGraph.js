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

class TrainingOccGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.getDataSets = this.getDataSets.bind(this);
    let datasets = this.getDataSets();
    this.state = {
      labels: this.props.months,
      datasets: datasets
    };
  }

  getDataSets() {
    let allTrainingTypes = this.props.trainings.map(function (currentTraining) {
      return currentTraining.trainingType;
    });
    let uniqueTrainingTypes = this.uniq(allTrainingTypes);
    let allTrainings = this.props.trainings;
    let sets = uniqueTrainingTypes.map(function (trType) {
      let countList=[];
      // looping over the 12 months
      for(let i=1; i<=12; i++) {
        let count = 0;
        let trListFilteredPerMonthPerType = allTrainings.filter(function (tr) {
          if(tr.trainingType === trType) {
            let month = tr.startOfTraining.toDate().getMonth()+1;
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
        label: uniqueTrainingTypes[index],
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
              title="Trainings"
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
                        this.props.regions.map(reg =><option key={reg.key}>{reg.value}</option>)
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
                        this.props.companies.map(comp =><option key={comp.key}>{comp.value}</option>)
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
                        this.props.sites.map(st =><option key={st.key}>{st.value}</option>)
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

export default TrainingOccGraph;

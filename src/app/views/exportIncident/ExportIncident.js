// @flow weak

import React, {
  PureComponent
}                     from 'react';

import {
  AnimatedView,
  Panel,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
}                         from '../../components';


class ExportIncident extends PureComponent {
  constructor(props) {
    super(props);
    const contentRows=[];
    for(let i =0; i<this.props.incidents.length; i++) {
      let inc = this.props.incidents[i];
      let contentColumns = [];
      if(inc.incidentType.value != undefined) {
        contentColumns.push(inc.incidentType.value);
      } else{
        contentColumns.push(inc.incidentType);
      }     
      contentColumns.push(inc.incidentDate.toString());
      contentColumns.push(inc.fatalitiesNo);
      contentColumns.push(inc.injuriesNo);
      contentColumns.push(inc.lostHoursNo);
      contentRows.push(contentColumns);
    }
    this.state = {
      headers: ['Type', 'Date', 'Fatalities', 'Injuries', 'Lost Hours'],
      content: contentRows
    };
  }

  
  render() {
    const {
      headers,
      content
    } = this.state;
    
    return(
      <AnimatedView>
        {/* preview: */}
        <Panel
          title="Incidents"
          hasTitle={true}
          bodyBackGndColor={'#fbffc4'}
          bodyCustomClass="table-responsive">
          <Table>
            <TableHeader>
              {
                headers.map(
                  (header, headerIdx) => {
                    return (
                      <TableCol key={headerIdx}>
                        <font color="blue">
                          {header}
                        </font>
                      </TableCol>
                    );
                  }
                )
              }
            </TableHeader>
            <TableBody>
              {
                content.map(
                  (contentRow, contentRowIdx) => {
                    return (
                      <TableRow key={contentRowIdx}>
                        {
                          contentRow.map(
                            (contentColumn, contentColumnIdx) => {
                              return (
                                <TableCol key={contentColumnIdx}>
                                  {contentColumn}
                                </TableCol>
                              );
                            }
                          )
                        }
                      </TableRow>
                    );
                  }
                )
              }
            </TableBody>
          </Table>
        </Panel>
        <div className="row">
          <div className="col-md-2 form-group"/>
          <div className="col-md-2 form-group"/>
          <div className="col-md-2 form-group"/>
          <div className="col-md-2 form-group"/>
          <div className="col-md-2 form-group"/>
          <button type="submit" className="btn btn-info" >Export</button>
        </div>
      </AnimatedView>
    );
  }
}

export default ExportIncident;

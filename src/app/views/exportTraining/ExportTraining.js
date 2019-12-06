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


class ExportTraining extends PureComponent {
  constructor(props) {
    super(props);
    const contentRows=[];
    for(let i =0; i<this.props.trainings.length; i++) {
      let tr = this.props.trainings[i];
      let contentColumns = [];
      if(tr.trainingType.value != undefined) {
        contentColumns.push(tr.trainingType.value);
      } else{
        contentColumns.push(tr.trainingType);
      }     
      contentColumns.push(tr.startOfTraining.toString());
      contentColumns.push(tr.endDate.toString());
      contentColumns.push(tr.place);
      contentColumns.push(tr.provider);
      contentColumns.push(tr.attendees);
      
      contentRows.push(contentColumns);
    }
    this.state = {
      headers: ['Type', 'Start Of Training', 'End Date', 'Place', 'Provider', 'Number of Attendees'],
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
          title="Trainings"
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

export default ExportTraining;

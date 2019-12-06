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


class CorrectiveMaintenances extends PureComponent {
  constructor(props) {
    super(props);
    const contentRows=[];
    this.props.correctiveMaintenances.allinstances.map((maintenance)=>{
      let contentColumns = [];
      contentColumns.push(maintenance.id);
      contentColumns.push(maintenance.instanceId);
      contentColumns.push(maintenance.typeId);
      contentColumns.push(maintenance.date.toString());
      contentColumns.push(maintenance.location);
      contentColumns.push(maintenance.responsible);
      contentColumns.push(maintenance.reason);
      contentColumns.push(maintenance.notes);

      contentRows.push(contentColumns);
    });
    this.state = {
      headers: ['ID', 'Instance ID', 'Type ID', 'Date', 'Location', 'Responsible', 'Reason', 'Notes'],
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
          title="Corrective Maintenances"
          hasTitle={true}
          bodyBackGndColor={'#fbffc4'}
          bodyCustomClass="table-responsive">
          <div className="box-tools m-b-15">
            <div className="input-group">
              <input
                type="text"
                name="table_search"
                className="form-control input-sm pull-right"
                style={{width: '150px'}}
                placeholder="Search"
              />
              <div className="input-group-btn">
                <button className="btn btn-sm btn-default">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </div>
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
              <TableCol/>
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
                        <TableCol>
                          <button className="btn btn-success" label="Details"
                            onClick={(event) => this.selectMaintenance(contentRowIdx)}><i className="fa fa-edit" />
                            Edit
                          </button>
                        </TableCol>
                      </TableRow>
                    );
                  }
                )
              }
            </TableBody>
          </Table>
        </Panel>
        <div className="row">
          <div className="col-md-1 form-group"/>
          <div className="col-md-1 form-group"/>
          <div className="col-md-1 form-group"/>
          <div className="col-md-1 form-group"/>
          <div className="col-md-1 form-group"/>
          <div className="col-md-1 form-group"/>
          <div className="col-md-1 form-group"/>
          <div className="col-md-1 form-group"/>
          <div className="col-md-1 form-group"/>
          <button type="submit" className="btn btn-info" >Add</button>
          <button type="submit" className="btn btn-info" >Import</button>
          <button type="submit" className="btn btn-info" >Export</button>
        </div>
      </AnimatedView>
    );
  }
}

export default CorrectiveMaintenances;

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


class PreventiveMaintenances extends PureComponent {
  constructor(props) {
    super(props);
    this.props.actions.retrievePreventiveMaintenances();
  }

  
  render() {
    const contentRows=[];
    this.props.preventiveMaintenances.allinstances.map((maintenance)=>{
      let contentColumns = [];
      contentColumns.push(maintenance.id);
      contentColumns.push(maintenance.instanceId);
      contentColumns.push(maintenance.typeId);
      contentColumns.push(maintenance.date.toString());
      contentColumns.push(maintenance.location);
      contentColumns.push(maintenance.responsible);
      contentColumns.push(maintenance.typeId);
      contentColumns.push(maintenance.notes);

      contentRows.push(contentColumns);
    });
    const headers= ['ID', 'Instance ID', 'Type ID', 'Date', 'Location', 'Responsible','Plan ID', 'Notes'];
    
    
    return(
      <AnimatedView>
        {/* preview: */}
        <Panel
          title="Preventive Maintenances"
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
                contentRows.map(
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
                        {/* <TableCol>
                          <button className="btn btn-success" label="Details"
                            onClick={(event) => this.selectMaintenance(contentRowIdx)}><i className="fa fa-edit" />
                            Edit
                          </button>
                        </TableCol> */}
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
          <div className="col-md-1 form-group"/>
          <div className="col-md-1 form-group"/>
          <button type="submit" className="btn btn-info" >Export</button>
        </div>
      </AnimatedView>
    );
  }
}

export default PreventiveMaintenances;

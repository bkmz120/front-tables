import React, { Component} from 'react';
import PropTypes from 'prop-types';

import Table from "Common/components/Table";
import {companyDataHeaders} from 'Constants/companyDataHeaders';
import "./style.scss";


export default class TableView extends Component {
  constructor(props) {
    super(props);
    if (props.flatCompaniesData==null) {
      props.loadData();
    }

    this.dataHeaders = [
      {
        name:"Company",
        label:"Comp",
        type:"string",
        required:true,
      },
      ...companyDataHeaders
    ]

  }

  render() {
    const {data} = this.props;

    let table;
    if (data!=null) {
      table = (
        <Table
          headers={this.dataHeaders}
          data={data}
        />
      );
    }

    return (
      <div className="tableView">
        {table}
      </div>
    )
  }
}

TableView.propTypes = {
  loadData:PropTypes.func.isRequired,
}


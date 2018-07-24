import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TBodyRow from 'Common/components/TBodyRow';

import "./style.scss";

export default class TBody extends Component {

  checkFilters(row) {
    let suitFilters = true;
    for (let clmName in row) {
      let filter = this.props.filters[clmName];
      if (filter!=="") {
        if (this.props.clmsTypes[clmName]==="string" && row[clmName].toLowerCase().indexOf(filter)==-1) {
          suitFilters = false;
          break;
        }
        if (this.props.clmsTypes[clmName]==="number" && row[clmName].indexOf(filter)!==0) {
          suitFilters = false;
          break;
        }
      }
    }
    return suitFilters;
  }

  render() {
    const {headers,data} = this.props;

    let rows = [];

    for (let rowIndex = 0;rowIndex < data.length;rowIndex++) {
      if (this.checkFilters(data[rowIndex])) {
        let row = (
          <TBodyRow
            key={data[rowIndex].id}
            headers={headers}
            row={data[rowIndex]}
          />
        );
        rows.push(row);
      }
    }

    return (
      <tbody className = "tbody">
        {rows}
      </tbody>
    )
  }
}

TBody.propTypes = {
  headers:PropTypes.array.isRequired,
  clmsTypes:PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  data:PropTypes.array.isRequired,
}
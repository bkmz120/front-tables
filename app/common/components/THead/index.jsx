import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./style.scss";

export default class THead extends Component {
  constructor(props) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
    this.changeOrderOfClm = this.changeOrderOfClm.bind(this);
  }

  changeFilter(e) {
    this.props.onChangeFilter(e.target.name,e.target.value);
  }

  changeOrderOfClm(e) {
    this.props.onOrderOfClmChange(e.target.getAttribute("name"));
  }

  render() {
    console.log('render THead');
    const {headers,filters} = this.props;
    let headerCells = [],
        filterCells = [];

    for (let i=0;i<headers.length;i++) {
      let orderClass = "";
      if (this.props.orderOfClms!==undefined) {
        if (this.props.orderOfClms[headers[i].name]==="ASC") {
          orderClass = " thead__label_asc";
        } else if (this.props.orderOfClms[headers[i].name]==="DESC") {
          orderClass = " thead__label_desc";
        } else {
          orderClass = " thead__label_sortable";
        }
      }

      const headerCell = (
        <td
          className = "thead__cell thead__cell_header"
          key={headers[i].name}
        >
          <span
            className={"thead__label" + orderClass}
            name={headers[i].name}
            onClick={this.changeOrderOfClm}
          >
            {headers[i].label}
          </span>
        </td>
      );

      const filterCell = (
        <td
          className = "thead__cell thead__cell_filter"
          key={headers[i].name}
        >
          <input
            type="text"
            className="thead__filter-inp"
            name={headers[i].name}
            value={filters[headers[i].name]}
            onChange={this.changeFilter}
          />
        </td>
      );

      headerCells.push(headerCell);
      filterCells.push(filterCell);
    }

    return (
      <thead className = "thead">
        <tr className="thead__row">
          {headerCells}
        </tr>
        <tr className="thead__row">
          {filterCells}
        </tr>
      </thead>
    )
  }
}

THead.propTypes = {
  headers: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  orderOfClms: PropTypes.object,
  onChangeFilter: PropTypes.func,
  onOrderOfClmChange: PropTypes.func,
  onClmMove: PropTypes.func,
  onClmVisibleToggl: PropTypes.func,
}
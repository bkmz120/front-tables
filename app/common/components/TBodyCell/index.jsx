import React, { Component,PureComponent } from 'react';
import PropTypes from 'prop-types';


export default class TBodyCell extends PureComponent {
  MAX_STR_LENGHT = 5;

  truncateCell(type,value) {
   if (type==='number') {
    return value;
   }
   else if (type==='string') {
    if (value.length > this.MAX_STR_LENGHT)
      return value.substring(0,this.MAX_STR_LENGHT)+'...';
    else
      return value;
   }
  };

  render() {
    const {type,value} = this.props;

    return (
      <td
        className = "tbody__cell"
      >
        {value}
      </td>
    )
  }
}

TBodyCell.propTypes = {
  type:PropTypes.string.isRequired,
  value:PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
}


import React, { Component,PureComponent } from 'react';
import PropTypes from 'prop-types';


export default class THiddenClms extends PureComponent {

  render() {
    const {headers} = this.props;

    let hiddenClms = [];
    for (let i=0;i<headers.length;i++) {
      if (headers())
    }

    return (
      <div className="tHiddenClms">

      </div>
    )
  }
}

THiddenClms.propTypes = {
  headers:PropTypes.array.isRequired,
  onClmShow:PropTypes.func.isRequired,
}


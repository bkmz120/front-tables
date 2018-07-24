import React, { Component,PureComponent } from 'react';
import PropTypes from 'prop-types';

import "./style.scss";

export default class THiddenClms extends PureComponent {

  clmShow = (clmName) => e => {
    this.props.onClmShow(clmName);
  }

  render() {
    const {headers} = this.props;

    let hiddenClms = [];

    for (let i=0;i< headers.length;i++) {
      if (!headers[i].visible) {
        const item = (
          <div className="tHiddenClms__item" key={headers[i].name}>
            {headers[i].label}
            <i
              className="fa fa-eye tHiddenClms__show"
              onClick={this.clmShow(headers[i].name)}
            />
          </div>
        );

        hiddenClms.push(item);
      }
    }

    let visibleClass = "";
    if (hiddenClms.length>0) {
      visibleClass = "tHiddenClms_visible";
    }
    else {
      hiddenClms = <div className="tHiddenClms__allVisible">(All columns are visible)</div>;
    }

    return (
      <div className={`tHiddenClms ${visibleClass}`}>
        <div className="tHiddenClms__text">
          Hidden columns:
        </div>
        <div className="tHiddenClms__items">
          {hiddenClms}
        </div>
      </div>
    )
  }
}

THiddenClms.propTypes = {
  headers:PropTypes.array.isRequired,
  onClmShow:PropTypes.func.isRequired,
}


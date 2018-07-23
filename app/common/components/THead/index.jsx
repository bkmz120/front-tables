import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import "./style.scss";

export default class THead extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dropClmName:null,
      dragClmName:null,
    }

    this.dragObject = {};

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    document.onmouseup = this.onMouseUp;
  }

  changeFilter = (clmName) => e => {
    this.props.onChangeFilter(clmName,e.target.value);
  }

  changeOrderOfClm = (clmName) => e => {
    this.props.onOrderOfClmChange(clmName);
  }

  hideClm = (clmName) => e => {
    this.props.onClmHide(clmName);
  }

  onMouseDown(e) {
    if (e.button !== 0) {
      return;
    }

    let elem = e.target.closest('.handler');
    if (!elem) return;
    let cell = elem.closest('.thead__cell');
    this.setState({
      dragClmName:cell.getAttribute("name")
    })

    this.dragObject.on = true;
    this.dragObject.downX = e.pageX;
    this.dragObject.downY = e.pageY;
  }

  onMouseMove(e) {
    if (!this.dragObject.on) return;

    let moveX = e.pageX - this.dragObject.downX;
    let moveY = e.pageY - this.dragObject.downY;
    if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
      return;
    }

    let elem = document.elementFromPoint(e.clientX, e.clientY);
    let cell = elem.closest('.thead__cell');
    let dropClmName = cell.getAttribute("name");
    if (dropClmName!==this.state.dragClmName) {
      this.setState({
        dropClmName
      })
    }
    else {
      this.setState({
        dropClmName:null
      })
    }


    return false;
  }

  onMouseUp(e) {
    if (this.dragObject.on) {
      if (this.state.dragClmName!==this.state.dropClmName && this.state.dragClmName!==null) {
        this.props.onClmMove(this.state.dragClmName,this.state.dropClmName);
      }

      this.setState({
        dropClmName:null,
      })
      this.dragObject = {};
    }
  }



  render() {
    console.log('render THead');
    const {headers,filters} = this.props;
    let headerCells = [],
        filterCells = [];

    for (let i=0;i<headers.length;i++) {
      if (!headers[i].visible) continue;

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

      let hideBtn;
      if (!headers[i].required) {
        hideBtn = (
          <div className="thead__hideLine">
            <span
              className="thead__hideBtn"
              onClick={this.hideClm(headers[i].name)}
            >
              hide
            </span>
          </div>
        );
      }

      let dropHereClass = "";
      if (this.state.dropClmName===headers[i].name) {
        dropHereClass="thead__cell_dropHere";
      }

      const headerCell = (
        <td
          className = {`thead__cell thead__cell_header ${dropHereClass}`}
          name={headers[i].name}
          key={headers[i].name}
        >
          <span
            className={`thead__label ${orderClass}`}
            onClick={this.changeOrderOfClm(headers[i].name)}
          >
            {headers[i].label}
          </span>

          {hideBtn}

          <div className="thead__cellHandle handler"></div>
          <div className="thead__dropLabel"></div>
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
            value={filters[headers[i].name]}
            onChange={this.changeFilter(headers[i].name)}
          />
        </td>
      );

      headerCells.push(headerCell);
      filterCells.push(filterCell);
    }

    return (
      <thead
        className="thead"
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
      >
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
  onClmHide: PropTypes.func,
}
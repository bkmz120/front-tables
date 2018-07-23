import React, { Component } from 'react';
import PropTypes from 'prop-types';

import THead from 'Common/components/THead';
import TBody from 'Common/components/TBody';
import "./style.scss";

export default class Table extends Component {
  constructor(props) {
    super(props);
    let headers = [...props.headers],
        data = [...props.data],
        filters = {},
        orderOfClms = {};

    for (let i=0;i<headers.length;i++) {
      headers[i].visible = true;
      filters[headers[i].name] = "";
      orderOfClms[headers[i].name] = null;
    }

    orderOfClms[headers[0].name] = "ASC";

    this.clmsTypes = {}
    for (let i=0;i<this.props.headers.length;i++) {
      this.clmsTypes[this.props.headers[i].name] = this.props.headers[i].type;
    }

    data = this.sortData(data,headers[0].name,orderOfClms[headers[0].name]);

    this.state = {
      headers,
      data,
      filters,
      orderOfClms
    }



    this.changeOrder = this.changeOrder.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.changeOrderOfClm = this.changeOrderOfClm.bind(this);
    this.hideClm = this.hideClm.bind(this);
  }

  changeOrder() {
    const firstIndex = 0;
    const secondIndex = 1;
    const results= this.state.headers.slice();
    const firstItem = this.state.headers[firstIndex];
    results[firstIndex] = this.state.headers[secondIndex];
    results[secondIndex] = firstItem;

    this.setState({
      headers:results
    })
  }

  changeFilter(name,value) {
    let filters = {...this.state.filters}
    filters[name] = value.toLowerCase();

    this.setState({
      filters
    })
  }

  changeOrderOfClm(name) {
    let orderOfClms = {...this.state.orderOfClms};
    if (orderOfClms[name]!=null) {
      if (orderOfClms[name]==="ASC") orderOfClms[name]="DESC";
      else orderOfClms[name]="ASC";
    } else {
      for (let clm in orderOfClms) {
        if (orderOfClms[clm]!=null) {
          orderOfClms[clm] = null;
        } else if (clm===name) {
          orderOfClms[clm] = "ASC";
        }
      }
    }

    let data = [...this.state.data];
    data = this.sortData(data,name,orderOfClms[name]);

    this.setState({
      data,
      orderOfClms
    });
  }

  filterFloat(value) {
      if(/^(\-|\+)?([0-9]+(\.[0-9]+)?)$/
        .test(value))
        return Number(value);
    return NaN;
  }

  sortData(data,clmName,order) {
    return data.sort((a,b) => {
      let val1,val2;
      if (this.clmsTypes[clmName]==="number") {
        if (a[clmName]==="") {
          val1 = 0;
        }
        else {
          val1 = this.filterFloat(a[clmName]);
        }
        if (b[clmName]==="") {
          val2 = 0;
        }
        else {
          val2 = this.filterFloat(b[clmName]);
        }
      } else {
        val1 = a[clmName];
        val2 = b[clmName];
      }

      if (order==="ASC") {
        return (val1 < val2?-1:(val1 > val2 ?1:0));
      }
      else {
        return (val1 < val2?1:(val1 > val2 ?-1:0));
      }
    });
  }

  hideClm(clmName) {
    let headers = [...this.state.headers],
        filters = {...this.state.filters};


    for (let i=0;i<headers.length;i++) {
      if (headers[i].name===clmName) {
        headers[i].visible = false;
        filters[clmName] = "";
        break;
      }
    }

    this.setState({
      headers,
      filters
    });
  }

  render() {
    console.log('render Table');
    return (
      <div>
        <table className="table">
          <THead
            headers = {this.state.headers}
            filters = {this.state.filters}
            orderOfClms = {this.state.orderOfClms}
            onChangeFilter = {this.changeFilter}
            onOrderOfClmChange = {this.changeOrderOfClm}
            onClmHide = {this.hideClm}
          />
          <TBody
            headers = {this.state.headers}
            clmsTypes = {this.clmsTypes}
            filters = {this.state.filters}
            data = {this.state.data}
          />
        </table>
        <button onClick={this.changeOrder}> new order </button>
      </div>
    )
  }
}


Table.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}
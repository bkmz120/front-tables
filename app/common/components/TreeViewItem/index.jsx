import React, { Component} from 'react';
import PropTypes from 'prop-types';

import Table from "Common/components/Table";
import {companyDataHeaders} from 'Constants/companyDataHeaders';

import "./style.scss";


export default class TreeViewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen:false,
    }

    this.onNameClick = this.onNameClick.bind(this);
  }

  onNameClick() {
    let isOpen = !this.state.isOpen;

    if (isOpen && this.props.data==undefined) {
      this.props.loadCompany(this.props.companyName);
    }

    this.setState({
      isOpen
    })
  }

  render() {
    const {companyName,data} = this.props;

    let table;
    if (this.state.isOpen && data!==undefined) {
      table = (
        <Table
          headers={companyDataHeaders}
          data={data}
        />
      );
    }

    return (
      <div className="treeViewItem">
        <div className="treeViewItem__name">
          <span className="treeViewItem__name-value" onClick={this.onNameClick}>{companyName}</span>
        </div>

        {table}
      </div>
    )
  }
}

TreeViewItem.propTypes = {
  companyName:PropTypes.string.isRequired,
  data:PropTypes.array,
  loadCompany:PropTypes.func.isRequired,
}


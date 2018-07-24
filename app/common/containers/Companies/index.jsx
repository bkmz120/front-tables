import React, { Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import TreeView from 'Common/components/TreeView';
import TableView from 'Common/components/TableView';
import * as API from 'Constants/api';
import "./style.scss";

export default class Companies extends Component {
  VIEW_TYPE_TREE = 'VIEW_TYPE_TREE';
  VIEW_TYPE_TABLE = 'VIEW_TYPE_TABLE';
  VIEW_TYPE_DEFAULT = this.VIEW_TYPE_TREE;

  constructor(props) {
    super(props);

    this.state = {
      companies:null,
      dataByCompany:{},
      flatCompaniesData:null,
    }

    if (this.props.viewType===undefined) {
      this.state.viewType = this.VIEW_TYPE_DEFAULT;
    } else if (this.props.viewType==="table") {
      this.state.viewType = this.VIEW_TYPE_TABLE;
    } else if (this.props.viewType==="tree") {
      this.state.viewType = this.VIEW_TYPE_TREE;
    }

    this.loadCompany = this.loadCompany.bind(this);
    this.loadFlatData = this.loadFlatData.bind(this);
    this.loadCompanies();
  }

  changeViewType = (viewType) => e => {
    if (viewType!==this.state.viewType) {
      this.setState({
        viewType
      });
    }
  }

  loadCompanies() {
    let that = this;
    axios.get(API.COMPANY_LIST)
      .then(function (response) {
        that.setState({
          companies:response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  loadCompanyPromise(companyName) {
    return axios
      .get(API.COMPANY_VIEW + '?title=' + companyName)
      .then((response) => {
        let companyData = response.data;
        for (let i=0;i< companyData.length;i++) {
          companyData[i].id = companyName + i;
        }
        return companyData
      })
  }

  loadCompany(companyName) {
    let that = this;
    this.loadCompanyPromise(companyName)
      .then((companyData) => {
        let dataByCompany = {...that.state.dataByCompany}
        dataByCompany[companyName] = companyData;
        that.setState({
          dataByCompany
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  loadFlatData() {
    let companiesLoadPromises = [],
        dataByCompany = {...this.state.dataByCompany};
    let that = this;

    for (let i=0;i < this.state.companies.length;i++) {
      let companyName = this.state.companies[i];
      if (this.state.dataByCompany[companyName]===undefined) {
        let promise = this
          .loadCompanyPromise(this.state.companies[i])
          .then((companyData) => {
            dataByCompany[companyName] = companyData;
          });
        companiesLoadPromises.push(promise);
      }
    }

    Promise.all(companiesLoadPromises).then(() => {
      let flatCompaniesData = [];
      for (let companyName in dataByCompany) {
        for (let i=0;i< dataByCompany[companyName].length;i++) {
          let row = dataByCompany[companyName][i];
          row['Company'] = companyName;
          flatCompaniesData.push(row);
        }
      }
      that.setState({
        flatCompaniesData,
        dataByCompany
      })
    });
  }

  render() {
    let view;
    if (this.state.companies===null) {
      view = <div>Loading companies....</div>
    }
    else if (this.state.viewType===this.VIEW_TYPE_TREE) {
      view = (
        <TreeView
          companies={this.state.companies}
          dataByCompany={this.state.dataByCompany}
          loadCompany={this.loadCompany}
        />
      );
    } else if(this.state.viewType===this.VIEW_TYPE_TABLE) {
      view = (
        <TableView
          data={this.state.flatCompaniesData}
          loadData={this.loadFlatData}
        />
      );
    }

    return (
      <div className="companies">
        <div className="companies__viewTypes">
          <div
            className={`companies__viewType ${this.state.viewType===this.VIEW_TYPE_TABLE?'companies__viewType_active':''}`}
            onClick={this.changeViewType(this.VIEW_TYPE_TABLE)}
          >
            table
          </div>
          <div
            className={`companies__viewType ${this.state.viewType===this.VIEW_TYPE_TREE?'companies__viewType_active':''}`}
            onClick={this.changeViewType(this.VIEW_TYPE_TREE)}
          >
            tree
          </div>
        </div>
        {view}
      </div>
    )
  }
}

Companies.propTypes = {

}


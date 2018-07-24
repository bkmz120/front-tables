import React, { Component} from 'react';
import PropTypes from 'prop-types';

import TreeViewItem from 'Common/components/TreeViewItem';
import "./style.scss";


export default class TreeView extends Component {

  render() {
    const {companies,dataByCompany,loadCompany} = this.props;

    let items = [];
    for (let i=0;i<companies.length;i++) {
      let item = (
        <TreeViewItem
          key={i}
          companyName={companies[i]}
          data={dataByCompany[companies[i]]}
          loadCompany={loadCompany}
        />
      );
      items.push(item);
    }

    return (
      <div className="treeView">
        <div className="treeView__title">Companies list</div>
        {items}
      </div>
    )
  }
}

TreeView.propTypes = {
  companies:PropTypes.array.isRequired,
  dataByCompany:PropTypes.object.isRequired,
  loadCompany:PropTypes.func.isRequired,
}


import React from 'react';
import { Provider } from 'react-redux';

import {store} from 'Store';
import './reset.scss';
import './style.scss';

import {companyDataHeaders} from 'Constants/companyDataHeaders';
import Table from 'Common/components/Table';

// import {tableData} from 'Constants/demo';
// import {tableData} from 'Constants/demo-mid';
import {tableData} from 'Constants/demo-mini';


for (let i=0;i < tableData.length;i++) {
  tableData[i].id = i;

}

console.log("Data count: ",tableData.length);

export const App = () => (
  <Provider store={store}>
    <Table
      headers={companyDataHeaders}
      data={tableData}
    />
  </Provider>
)
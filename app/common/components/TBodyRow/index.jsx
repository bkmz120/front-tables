import React, { PureComponent} from 'react';
import PropTypes from 'prop-types';

import TBodyCell from 'Common/components/TBodyCell';

export default class TBodyRow extends PureComponent {

  render() {
    const {row,headers} = this.props;

    let cells = [];

    for (let headerIndex=0;headerIndex < headers.length;headerIndex++) {
      if (!headers[headerIndex].visible) continue;
      const cell = (
        <TBodyCell
          key={row.id + "." + headers[headerIndex].name}
          type={headers[headerIndex].type}
          value={row[headers[headerIndex].name]}
        />
      );
      cells.push(cell);
    }

    return (
      <tr>
        {cells}
      </tr>
    )
  }
}

TBodyRow.propTypes = {
  headers:PropTypes.array.isRequired,
  row:PropTypes.object.isRequired,
}

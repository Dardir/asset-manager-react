// @flow weak

import React      from 'react';
import PropTypes  from 'prop-types';

const BorderedTable = ({
  children
}) => (
  <table className="table table-bordered">
    {children}
  </table>
);

BorderedTable.propTypes = {
  children: PropTypes.node.isRequired
};

export default BorderedTable;

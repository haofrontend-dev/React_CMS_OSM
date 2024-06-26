import React from 'react'
import PropTypes from 'prop-types'; 
import { TableCell, TableRow } from '@mui/material';

const TableEmptyRows = ({ emptyRows, height }) => {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}

TableEmptyRows.propTypes = {
  emptyRows: PropTypes.number,
  height: PropTypes.number,
};

export default TableEmptyRows

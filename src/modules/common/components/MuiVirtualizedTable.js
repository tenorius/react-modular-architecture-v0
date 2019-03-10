import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
// import 'react-virtualized/styles.css';

const Styled = {};

Styled.AutoSizer = styled(AutoSizer)`
  .flex-container {
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .table-row {
    cursor: pointer;
    &.odd {
      /* background-color: #f7f7f7; */
    }
    &.even {
      /* Even rows */
    }
  }
  .table-row-hover:hover {
    background-color: #f7f7f7;
  }
  .table-cell {
    flex: 1;
  }
  .no-click {
    cursor: initial;
  }
  .ReactVirtualized__Table__headerRow {
    overflow: auto;
    z-index: 2;
    position: relative;
    background-color: #66bb6b;
    /* box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.2), 0px 3px 2px -1px rgba(0,0,0,0.14), 0px 4px 1px -2px rgba(0,0,0,0.12); */
    .table-cell {
      color: #fff;
      font-size: 0.8rem;
      font-weight: bold;
    }
  }
  .ReactVirtualized__Table__Grid {
    z-index: 1;
  }
  .table-cell {
    padding: 0 10px !important;
  }
`;

class MuiVirtualizedTable extends PureComponent {
  getRowClassName = ({ index }) => {
    const { rowClassName, onRowClick } = this.props;
    const classes = [];
    classes.push('table-row');
    classes.push('flex-container');
    classes.push(rowClassName);
    // Not disabled row
    if (index !== -1 && onRowClick != null) {
      classes.push(index % 2 ? 'odd' : 'even');
      classes.push('table-row-hover');
    }
    return classes.join(' ');
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        className={`table-cell flex-container ${onRowClick == null ? 'no-click' : ''}`}
        component="div"
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner = !columns[columnIndex].disableSort && sort != null ? (
      <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
        {label}
      </TableSortLabel>
    ) : (
      label
    );

    return (
      <TableCell
        className="table-cell flex-container no-click"
        component="div"
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { columns, ...tableProps } = this.props;
    return (
      <Styled.AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
              let renderer;
              if (cellContentRenderer != null) {
                renderer = cellRendererProps => this.cellRenderer({
                  cellData: cellContentRenderer(cellRendererProps),
                  columnIndex: index,
                });
              } else {
                renderer = this.cellRenderer;
              }

              return (
                <Column
                  className={`flex-container ${className}`}
                  key={dataKey}
                  headerRenderer={headerProps => this.headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                  })
                  }
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </Styled.AutoSizer>
    );
  }
}

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56,
};

export default MuiVirtualizedTable;

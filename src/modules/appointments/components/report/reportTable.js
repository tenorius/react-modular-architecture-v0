/* eslint-disable no-multi-spaces */
import React from 'react';
import styled from 'styled-components';
import { withI18n } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

import PersonIcon from '@material-ui/icons/Person';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import WrappedVirtualizedTable from '../../../common/components/muiVirtualizedTable';
import { media } from '../../../common/utils/style-utils';

const Styled = {};

Styled.Wrapper = styled(Grid)`
  /* ... */
`;

Styled.ChipsWrapper = styled(Grid)`
  justify-content: space-around;
  align-items: center;
  ${media.md} {
    justify-content: flex-start;
  }
`;

Styled.TextField = styled(TextField)`
  width: 100%;
`;

Styled.TableContainer = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  ${media.md} {
    height: 400px !important;
  }
`;

const reportTable = (props) => {
  const {
    tableData,
    tableFilter,
    filterChange,
    t,
  } = props;
  const columns = [
    { label: t('pid'),           dataKey: 'pid',              width: 100 },
    { label: t('eid'),           dataKey: 'eid',              width: 100, flexGrow: 1 },
    { label: t('carrer'),        dataKey: 'careertrackDescr', width: 100 },
    { label: t('level'),         dataKey: 'level',            width: 50 },
    { label: t('metrocity'),     dataKey: 'metrocity',        width: 50 },
    { label: t('chg'),           dataKey: 'chg',              width: 50 },
    { label: t('bd'),            dataKey: 'bd',               width: 50 },
    { label: t('idle_small'),    dataKey: 'idle',             width: 50 },
    { label: t('status'),        dataKey: 'status',           width: 100 },
    { label: t('updated_at'),    dataKey: 'timestamp',        width: 100 },
  ];
  const chips = [
    { id: 0, label: t('report.chip_executives'), value: tableData.length, icon: <PersonIcon />, color: 'secondary' },
    { id: 1, label: t('report.chip_empty_appointments'), value: tableData.filter(e => (e.status === 'empty')).length, icon: <ErrorIcon />, color: 'default' },
    { id: 2, label: t('report.chip_saved_appointments'), value: tableData.filter(e => (e.status !== 'empty')).length, icon: <CheckCircleIcon />, color: 'primary' },
  ];
  return (
    <Styled.Wrapper>
      <Grid container direction="row" spacing={16}>
        <Styled.ChipsWrapper item xs={12} md container spacing={8}>
          {chips.map(chip => (
            <Grid item key={chip.id}>
              <Tooltip
                title={chip.label}
                placement="top"
                disableFocusListener
                disableTouchListener
              >
                <Chip icon={chip.icon} label={chip.value} color={chip.color} />
              </Tooltip>
            </Grid>
          ))}
        </Styled.ChipsWrapper>
        <Grid item xs={12} md>
          <Styled.TextField
            id="test"
            label={t('search')}
            value={tableFilter}
            onChange={filterChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Styled.TableContainer style={{ height: Math.floor(window.innerHeight * 0.4) }}>
            <WrappedVirtualizedTable
              rowCount={tableData.length}
              rowGetter={({ index }) => tableData[index]}
              onRowClick={event => console.log(event)}
              columns={columns}
            />
          </Styled.TableContainer>
        </Grid>
      </Grid>
    </Styled.Wrapper>
  );
};

export default withI18n()(reportTable);

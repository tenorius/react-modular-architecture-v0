import React from 'react';
import styled from 'styled-components';
import { withI18n } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const Styled = {};

Styled.Wrapper = styled(Grid)`
  /* ... */
`;

const reportForm = (props) => {
  const {
    disableForm,
    fiscalYear,
    month,
    fortnight,
    country,
    // metrocity,
    fiscalYearOptions,
    monthOptions,
    fortnightOptions,
    regionOptions,
    handleChange,
    onClick,
    t,
  } = props;
  return (
    <Styled.Wrapper container direction="row" spacing={16}>
      <Grid item xs={4} sm={2}>
        <FormControl className="select-input">
          <InputLabel htmlFor="fy-select">{t('report.year')}</InputLabel>
          <Select
            value={fiscalYear}
            disabled={disableForm}
            onChange={handleChange}
            inputProps={{
              name: 'fiscalYear',
              id: 'fy-select',
            }}
          >
            {fiscalYearOptions && fiscalYearOptions.map(({ value, label }) => (
              <MenuItem value={value}>{ label }</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sm={2}>
        <FormControl className="select-input">
          <InputLabel htmlFor="month-select">{t('report.month')}</InputLabel>
          <Select
            value={month}
            disabled={disableForm}
            onChange={handleChange}
            inputProps={{
              name: 'month',
              id: 'month-select',
            }}
          >
            {monthOptions && monthOptions.map(({ value, label }) => (
              <MenuItem value={value}>{ label }</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sm={2}>
        <FormControl className="select-input">
          <InputLabel htmlFor="fortnight-select">{t('report.fortnight')}</InputLabel>
          <Select
            value={fortnight}
            disabled={disableForm}
            onChange={handleChange}
            inputProps={{
              name: 'fortnight',
              id: 'fortnight-select',
            }}
          >
            {fortnightOptions && fortnightOptions.map(({ value, label }) => (
              <MenuItem value={value}>{ label }</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl className="select-input">
          <InputLabel htmlFor="country-select">{t('report.country')}</InputLabel>
          <Select
            value={country}
            disabled={disableForm}
            onChange={handleChange}
            inputProps={{
              name: 'country',
              id: 'country-select',
            }}
          >
            {Object.keys(regionOptions || {}).map(key => (
              <MenuItem value={regionOptions[key].value}>{ regionOptions[key].label }</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {/* <Grid item xs={6} sm={4}>
        <FormControl className="select-input">
          <InputLabel htmlFor="metrocity-select">{t('report.metrocity')}</InputLabel>
          <Select
            value={metrocity}
            disabled={disableForm}
            onChange={handleChange}
            inputProps={{
              name: 'metrocity',
              id: 'metrocity-select',
            }}
          >
            {regionOptions && regionOptions[country] && regionOptions[country].metrocities.map(state => (
              <MenuItem value={state.value}>{state.label}</MenuItem>))
            }
          </Select>
        </FormControl>
      </Grid> */}
      <Grid container item xs={12} sm={4} spacing={16}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            name="teste"
            disabled={disableForm}
            onClick={() => onClick('view')}
            style={{ width: '100%' }}
          >
            {t('report.view')}
          </Button>
        </Grid>
        <Grid item xs={6} >
          <Button
            variant="contained"
            color="secondary"
            disabled={disableForm}
            onClick={() => onClick('download')}
            style={{ width: '100%' }}
          >
            {t('report.download')}
          </Button>
        </Grid>
      </Grid>
    </Styled.Wrapper>
  );
};

export default withI18n()(reportForm);

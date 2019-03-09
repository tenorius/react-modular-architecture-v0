// General Imports
import React from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { withI18n } from 'react-i18next';
import moment from 'moment';

// Material UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

// Custom UI
import myToast from '../../common/utils/toast';

// Ducks
import { duckOperations as adminOperations } from '../ducks/index';

// Styled components
const Styled = {};

Styled.Wrapper = styled.div`
  /* ... */
`;

Styled.FormControl = styled(FormControl)`
  width: 100%;
`;

Styled.Divider = styled(Divider)`
  margin: 30px 0 !important;
`;

Styled.sahInput = styled.input`
  width: 100%;
`;

// Component
class SAH extends React.Component {
  state = {
    loadingSah: false,
    paramsReady: false,
    showTable: false,
    sahRows: [],
    inputs: {
      country: '',
      metrocity: '',
      year: '',
      month: '',
    },
  }

  componentDidMount() {
    const { t } = this.props;
    this.props.actions.fetchGetSahParams()
      .on('done', () => {
        this.setState({ paramsReady: true });
      })
      .on('error', () => {
        myToast.error(t('toast-messages.generic_error'));
      })
      .on('fail', () => {
        myToast.error(t('toast-messages.generic_error'));
      });
  }

  search = () => {
    const { country, metrocity, year } = this.state.inputs;
    // Loading data state
    this.setState({
      loadingSah: true,
      showTable: true,
    });
    // API success callback
    const onSuccess = () => {
      const { adminSah } = this.props;
      // Creates the base for each row
      const sahRows = Array(12).fill(null)
        .map((v, k) => ({
          month: k + 1,
          fortnight1: 88,
          fortnight2: 88,
        }));
      // Group sahs
      adminSah.sahs.forEach((sah) => {
        const monthIndex = sah.month - 1;
        const sahRow = sahRows[monthIndex];
        // Fill fortnight sah
        sahRow[`fortnight${sah.fortnight}`] = sah.hours;
      });
      this.setState({
        loadingSah: false,
        sahRows,
      });
    };
    // API error callback
    const onError = () => {
      // Toast message
      const { t } = this.props;
      myToast.error(t('toast-messages.generic_error'));
      // State reset
      this.setState({
        loadingSah: false,
        showTable: false,
      });
    };
    // API call
    this.props.actions.fetchGetSahByYear(country, metrocity, year)
      .on('done', onSuccess)
      .on('error', onError)
      .on('fail', onError);
  }

  save = () => {
    const { t, adminSah } = this.props;
    const {
      sahRows,
      inputs: { country, metrocity },
    } = this.state;
    this.setState({ loadingSah: true });
    const sahsToSave = [];
    // If adminSah.sahs is empty, all elements must be saved
    if (adminSah.sahs.length === 0) {
      sahRows.forEach((row) => {
        const newSahGetter = (hours, fortnight) => ({
          month: row.month,
          year: adminSah.year,
          hours,
          fortnight,
        });
        sahsToSave.push(newSahGetter(row.fortnight1, 1));
        sahsToSave.push(newSahGetter(row.fortnight2, 2));
      });
    } else {
      // Gather the adminSah.sahs references that had value changed
      sahRows.forEach((row) => {
        // Search for the equivalent sah in the admin data
        // but ignore unchanged values
        const findSahToSaveIndex = (month, hours, fortnight) => adminSah.sahs.findIndex(sah => (
          sah.month === month
          && sah.fortnight === fortnight
          && sah.hours !== hours
        ));
        const sahFortnight1Index = findSahToSaveIndex(row.month, row.fortnight1, 1);
        const sahFortnight2Index = findSahToSaveIndex(row.month, row.fortnight2, 2);
        // Push the sahs references that must be saved
        if (sahFortnight1Index !== -1) {
          sahsToSave.push({
            ...adminSah.sahs[sahFortnight1Index],
            year: adminSah.year,
            hours: row.fortnight1,
          });
        }
        if (sahFortnight2Index !== -1) {
          sahsToSave.push({
            ...adminSah.sahs[sahFortnight2Index],
            year: adminSah.year,
            hours: row.fortnight2,
          });
        }
      });
    }
    // API success callback
    const onSuccess = () => {
      // Toast message
      myToast.success(t('toast-messages.sah_saved'));
      // Success state
      this.setState({
        loadingSah: false,
        showTable: false,
      });
    };
    // API error callback
    const onError = () => {
      // Toast message
      myToast.error(t('toast-messages.generic_error'));
      // State reset
      this.setState({ loadingSah: false });
    };
    // API call
    this.props.actions.fetchSaveSahByYear(country, metrocity, sahsToSave)
      .on('done', onSuccess)
      .on('error', onError)
      .on('fail', onError);
  }

  handleInputChange = ref => (event) => {
    const { value } = event.target;
    this.setState(state => ({
      showTable: false,
      inputs: {
        ...state.inputs,
        [ref]: value,
      },
    }));
  }

  handleSahFormSubmition = (event) => {
    event.preventDefault(); // No page reload
    this.save();
  }

  handleSahChange = (month, fortnight) => (event) => {
    const { value } = event.target;
    this.setState((state) => {
      // Copy state array
      const sahRows = [...state.sahRows];
      // Find target index
      const changedRowIndex = sahRows.findIndex(row => row.month === month);
      // Copy target object
      const changedRow = { ...sahRows[changedRowIndex] };
      // Assign new values
      changedRow[`fortnight${fortnight}`] = parseFloat(value);
      sahRows[changedRowIndex] = changedRow;
      // Set new state
      return {
        ...state,
        sahRows,
      };
    });
  }

  render() {
    // State
    const {
      loadingSah,
      showTable,
      paramsReady,
      sahRows,
      inputs: { country, metrocity, year },
    } = this.state;
    // Props
    const {
      t,
      adminSah,
      adminSahParams: { regions, years },
    } = this.props;
    // Options
    const countryOptions = regions
      ? Object.keys(regions).map(countryName => regions[countryName])
      : [];
    const metrocityOptions = country
      ? [{ label: '', value: '' }, ...regions[country].metrocities]
      : [];
    const yearOptions = years
      ? years.map(y => ({ label: y.toString(), value: y }))
      : [];
    // Inputs configuration
    const selectInputs = [
      {
        name: 'country',
        labelKey: 'country',
        value: country,
        options: countryOptions,
        required: true,
      },
      {
        name: 'metrocity',
        labelKey: 'metrocity',
        value: metrocity,
        options: metrocityOptions,
        disabled: !metrocityOptions.length,
      },
      {
        name: 'year',
        labelKey: 'year',
        value: year,
        options: yearOptions,
        required: true,
      },
    ];
    // JSX
    return (
      <Styled.Wrapper>
        {paramsReady
          ? (
            <div>
              <Typography variant="h5" gutterBottom>{t('sah_title')}</Typography>
              <Grid container direction="row" spacing={16}>
                {selectInputs.map(input => (
                  <Grid item xs={6} key={input.name}>
                    <Styled.FormControl disabled={input.disabled} required={input.required}>
                      <InputLabel htmlFor={input.name}>{t(input.labelKey)}</InputLabel>
                      <Select
                        value={input.value}
                        onChange={this.handleInputChange(input.name)}
                        inputProps={{
                          name: input.name,
                          id: input.name,
                        }}
                      >
                        {input.options.map(option => (
                          <MenuItem key={option.value} value={option.value}>{ option.label }</MenuItem>
                        ))}
                      </Select>
                    </Styled.FormControl>
                  </Grid>
                ))}
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.search}
                    style={{ width: '100%' }}
                    disabled={!country || !year}
                  >
                    {t('search')}
                  </Button>
                </Grid>
              </Grid>
              <Styled.Divider />
              {showTable
                ? (
                  <div>
                    {!loadingSah
                      ? (
                        <form onSubmit={this.handleSahFormSubmition}>
                          {adminSah.sahs.length === 0
                            ? (
                              <p>{t('new_sah_warning')}</p>
                            )
                            : null
                          }
                          <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                          >
                            {t(adminSah.sahs.length === 0 ? 'create' : 'save')}
                          </Button>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>{t('month')}</TableCell>
                                <TableCell align="right">{`${t('fortnight')} 1`}</TableCell>
                                <TableCell align="right">{`${t('fortnight')} 2`}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {sahRows.map(sah => (
                                <TableRow key={sah.month}>
                                  <TableCell component="th" scope="row">{moment(`/${sah.month}`).format('MMM')}</TableCell>
                                  <TableCell>
                                    <Styled.sahInput
                                      type="number"
                                      onChange={this.handleSahChange(sah.month, 1)}
                                      value={sah.fortnight1}
                                      required
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Styled.sahInput
                                      type="number"
                                      onChange={this.handleSahChange(sah.month, 2)}
                                      value={sah.fortnight2}
                                      required
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </form>
                      )
                      : (
                        <div style={{ display: 'flex' }}>
                          <CircularProgress size={80} style={{ margin: 'auto' }} />
                        </div>
                      )
                    }
                  </div>
                )
                : null
              }
            </div>
          )
          : (
            <div style={{ display: 'flex' }}>
              <CircularProgress size={80} style={{ margin: 'auto' }} />
            </div>
          )
        }
      </Styled.Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  adminSahParams: state.adminSahParams,
  adminSah: state.adminSah,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(adminOperations, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(),
)(SAH);

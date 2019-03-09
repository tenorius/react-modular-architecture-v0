import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { withI18n } from 'react-i18next';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import myToast from '../../common/utils/toast';

import { duckOperations as permissionsOperations } from '../ducks/index';

const Styled = {};

Styled.Wrapper = styled.div`
  .form-control {
    width: 100%;
  }
`;

Styled.Divider = styled(Divider)`
  margin: 16px 0 !important;
`;

class Permission extends Component {
  state = {
    paramsReady: false,
    showForm: false,
    createMode: false,
    inputs: {
      searchPid: '',
      formEid: '',
      formPid: '',
      formProfile: '',
      formWhitelist: false,
      formCountries: [],
    },
  }

  componentDidMount() {
    const { t } = this.props;
    this.props.actions.fetchGetParams()
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

  searchPermissions = () => {
    const { searchPid: pid } = this.state.inputs;
    const { t } = this.props;

    if (!pid) {
      myToast.error(t('toast-messages.pid_required'));
      return;
    }

    this.setState({
      createMode: false,
      showForm: false,
    });

    this.props.actions.fetchGetPermissions({ pid })
      .on('done', () => {
        const permissionId = this.props.permissions.list[0];
        const permission = this.props.permissions.byIds[permissionId];
        this.setState({ showForm: true });
        if (permission) {
          this.setState(state => ({
            ...state,
            inputs: {
              ...state.inputs,
              formPid: permission.pid,
              formProfile: permission.profile,
              formWhitelist: permission.whitelist,
              formCountries: permission.regions.map(r => r.country),
            },
          }));
        } else {
          this.setState(state => ({
            ...state,
            createMode: true,
            inputs: {
              ...state.inputs,
              formPid: pid,
              formProfile: '',
              formWhitelist: false,
              formCountries: [],
            },
          }));
        }
      });
  }

  savePermissions = () => {
    const { t } = this.props;
    const {
      formPid: pid,
      formProfile: profile,
      formWhitelist: whitelist,
      formCountries: countries,
    } = this.state.inputs;
    const regions = countries.map((c) => {
      const {
        value: country,
        label: countryDescr,
      } = this.props.permissions.params.regions[c];
      return {
        country,
        countryDescr,
      };
    });
    const id = this.props.permissions.list[0];
    this.props.actions.fetchSavePermissions({ id, pid, profile, whitelist, regions })
      .on('done', () => {
        this.setState({ showForm: false });
        myToast.success(t('toast-messages.permission_saved'));
      })
      .on('error', () => {
        myToast.error(t('toast-messages.generic_error'));
      })
      .on('fail', () => {
        myToast.error(t('toast-messages.generic_error'));
      });
  }

  handleInputChange = ref => (event) => {
    const { value } = event.target;
    const showForm = ref !== 'searchPid';
    this.setState(state => ({
      showForm,
      inputs: {
        ...state.inputs,
        [ref]: value,
      },
    }));
  }

  handleCheckChange = ref => (event) => {
    const { checked } = event.target;
    this.setState(state => ({
      inputs: {
        ...state.inputs,
        [ref]: checked,
      },
    }));
  }

  render() {
    const {
      paramsReady,
      showForm,
      createMode,
      inputs: {
        searchPid,
        // formEid,
        formPid,
        formProfile,
        formWhitelist,
        formCountries,
      },
    } = this.state;
    const {
      permissions: {
        params: {
          profiles,
          regions: countries,
        },
      },
      t,
    } = this.props;

    return !paramsReady ? null : (
      <Styled.Wrapper>
        <Typography variant="h5" gutterBottom>{t('permissions_title')}</Typography>
        <Grid container direction="row" alignItems="center" spacing={16}>
          <Grid item xs={6}>
            <TextField
              className="form-control"
              label={t('search_by_pid')}
              value={searchPid}
              onChange={this.handleInputChange('searchPid')}
              inputProps={{
                name: 'searchPid',
                id: 'searchPid',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={this.searchPermissions}
              >
                {t('search')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Styled.Divider />
        {showForm
          ? (
            <Grid container direction="row" spacing={16}>
              {createMode
                ? (
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>{t('permission_not_found')}</Typography>
                    </Grid>
                )
                : null
              }
              {/* <Grid item xs={4}>
                <TextField
                  className="form-control"
                  label={t('eid')}
                  value={formEid}
                  onChange={this.handleInputChange('formEid')}
                  disabled
                  inputProps={{
                    name: 'formEid',
                    id: 'formEid',
                  }}
                />
              </Grid> */}
              <Grid item xs={6}>
                <TextField
                  className="form-control"
                  label={t('pid')}
                  value={formPid}
                  onChange={this.handleInputChange('formPid')}
                  disabled
                  inputProps={{
                    name: 'formPid',
                    id: 'formPid',
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl className="form-control">
                  <InputLabel htmlFor="formProfile">{t('profile')}</InputLabel>
                  <Select
                    value={formProfile}
                    onChange={this.handleInputChange('formProfile')}
                    inputProps={{
                      name: 'formProfile',
                      id: 'formProfile',
                    }}
                  >
                    {profiles.map(profile => (
                      <MenuItem key={profile.value} value={profile.value}>{ profile.label }</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl className="form-control">
                  <InputLabel htmlFor="select-multiple-checkbox">{t('countries')}</InputLabel>
                  <Select
                    multiple
                    value={formCountries}
                    onChange={this.handleInputChange('formCountries')}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selecteds => selecteds.map(s => countries[s].label).join(', ')}
                  >
                    {Object.keys(countries).map((key) => {
                      const country = countries[key];
                      return (
                        <MenuItem key={country.value} value={country.value}>
                          <Checkbox checked={formCountries.includes(country.value)} />
                          <ListItemText primary={country.label} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={formWhitelist}
                      onChange={this.handleCheckChange('formWhitelist')}
                      value="formWhitelist"
                      color="primary"
                    />
                  )}
                  label={t('whitelist')}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={this.savePermissions}
                >
                  {createMode ? t('create') : t('save')}
                </Button>
              </Grid>
            </Grid>
          )
          : null
        }
      </Styled.Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  permissions: state.permissions,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(permissionsOperations, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(),
)(Permission);

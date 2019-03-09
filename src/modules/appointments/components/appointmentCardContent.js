import React, { Fragment } from 'react';
import { withI18n } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid/Grid';
import styled from 'styled-components';
import dataStatus from '../constants/dataStatus';


const MyTextField = styled(TextField)`
  margin-right: 4px !important;
  margin-top: 0px !important;
  label{
    color: #9c9c9c;
    font-weight: 500;
  }
  > div::before{
    border-bottom-color: #00ddbb !important;
  }
  input {
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      appearance: none;
    }
  }

  .MuiInputLabel-formControl-274{

  }

  @media (max-width: 600px) {
    label {
      &.MuiFormLabel-root-280{
        font-size: 0.8rem;
      }
      &.MuiInputLabel-formControl-274{
        transform: translate(0, 30px) scale(1);
      }
      &.MuiInputLabel-shrink-276{
        transform: translate(0, 1.5px) scale(0.75);
      }
  }
  }
`;

const AppointmentCardContent = (props) => {
  const { form, sahExceeded, appointment, onEdit, onSave, onBlur, onChange, t } = props;
  switch (appointment.status) {
    case dataStatus.EMPTY:
      return <AddCircleIcon onClick={() => onEdit(appointment.id)} />;
    case dataStatus.EDIT:
      return (
        <Fragment>
          {Object.keys(form).map(k => (
            k === 'comment' ? null
              : (
                <Grid item xs={4} key={k}>
                  <MyTextField
                    id={`${k}`}
                    value={form[k].value}
                    error={sahExceeded}
                    label={t(k)}
                    name={form[k].name}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyPress={onSave}
                    type="number"
                    margin="normal"
                    style={
                      { width: '100%' }
                    }
                  />
                </Grid>
              )
          ))}
        </Fragment>
      );
    case dataStatus.SAVED:
      return (
        <Fragment>
          {Object.keys(form)
            .filter(k => form[k].value)
            .map(k => (
              k === 'comment' ? null : (
                <Grid item xs={4} key={k} onClick={() => onEdit(appointment.id)}>
                  <span className="label">{t(k)}</span>
                  <span className="value">{form[k].value}</span>
                  <span>h</span>
                </Grid>
              )))}
        </Fragment>
      );
    default:
      return null;
  }
};

export default withI18n()(AppointmentCardContent);

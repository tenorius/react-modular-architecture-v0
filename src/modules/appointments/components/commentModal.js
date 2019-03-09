import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Calendar from '@material-ui/icons/CalendarToday';
import { withI18n } from 'react-i18next';


const Wrapper = styled(Paper)`
  position: absolute!important;
  top: 50%!important;
  left: 50%!important;
  width: 90%!important;
  max-width: 600px;
  background-color: #fff!important;
  transform: translate(-50%, -50%)!important;
  
  .header{
    height: 80px;
    background: #66BB6A;
    border-top: 4px solid darkgreen;
    .date{
      height: 100%;
      color: white;
      font-size: 16px;
      font-weight: 600;
    }
    svg{
      margin-right: 10px;
      fill: white;
    }
  }
  .body{
    padding: 16px;
  }
  .footer{
    padding: 16px;
    height: 60px;
  }
`;

const MyButton = styled(Button)`
  height: 36px;
  margin-left: 16px!important;
`;

const CommentModal = (props) => {
  const { onChange, lastDay, inputControl, onSave, onClear, t } = props;
  const parts = lastDay.split('-');
  let firstDay;
  if (parts[2] !== '15') {
    firstDay = `${parts[0]}-${parts[1]}-15`;
  } else {
    firstDay = `${parts[0]}-${parts[1]}-01`;
  }
  return (
    <Wrapper className="__CommentModal">
      <div className="header">
        <Grid className="date" container direction="row" justify="center" alignItems="center">
          <Calendar />
          <span>{`  ${t('DD/MMM/YYYY', { date: new Date(firstDay) })} - ${t('DD/MMM/YYYY', { date: new Date(lastDay) })}`}</span>
        </Grid>
      </div>
      <div className="body">
        <TextField
          fullWidth
          multiline
          rowsMax={4}
          rows={4}
          value={inputControl.value}
          label={t(inputControl.name)}
          name={inputControl.name}
          onChange={onChange}
          type="text"
          autoFocus
        />
      </div>
      <Divider />
      <Grid container direction="row" alignItems="center" justify="flex-end" className="footer">
        <MyButton variant="contained" color="secondary" onClick={onClear}>
          {t('cancel')}
        </MyButton>
        <MyButton variant="contained" color="secondary" onClick={onSave}>
          {t('ok')}
        </MyButton>
      </Grid>
    </Wrapper>
  );
};


export default withI18n()(CommentModal);

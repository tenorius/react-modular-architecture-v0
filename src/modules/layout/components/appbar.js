import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withI18n } from 'react-i18next';
import moment from 'moment';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import MDAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import withWidth from '@material-ui/core/withWidth';
import Hidden from '@material-ui/core/Hidden';
import { media } from '../../common/utils/style-utils';
// import LanguageChanger from '../../common/components/LanguageChanger';

const Styled = {};

Styled.Wrapper = styled(MDAppBar)`
  transition: all 0.2s ease-in-out;
  position: fixed !important;
  top: 0 !important;
  z-index: 3 !important;
  small {
    opacity: .6;
  }
  .gray {
    color: #a9a9a9;
  }
  ${media.sm} {
    background-color: white !important;
    color: #66BB6A !important;
    height: 90px !important;

    .MuiToolbar-root-66.MuiToolbar-regular-68.MuiToolbar-gutters-67{
      height: 100% !important;
    }
  }
`;

Styled.Logo = styled.a`
  height: 64px;
  width: 64px;
  padding: 8px;
  margin-right: 20px;
  img{
    height: 100%;
    width: auto;
  }
`;

Styled.Button = styled(Button)`
  color: red!important;
  //background-color: red!important;
`;

const AppBar = (props) => {
  const { onToggle, width, theme, t, currentFortnightLastDay, user, onLogoClick } = props;
  const logout = () => { window.localStorage.clear(); window.location = 'https://portal.accenture.com'; };
  const lastDay = currentFortnightLastDay || '';
  const parts = lastDay.split('-');
  const firstDay = `${parts[0]}-${parts[1]}-${parts[2] === '15' ? '01' : '15'}`;
  const parsedFirstDay = moment(firstDay).format('DD/MM/YYYY')
  const parsedLastDay = moment(lastDay).format('DD/MM/YYYY')
  return (
    <Styled.Wrapper position="static" theme={theme} width={width}>
      <Toolbar style={{ height: '100%' }}>
        <Hidden smUp>
          <IconButton color="inherit" aria-label="Menu" onClick={onToggle}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden xsDown>
          <Styled.Logo onClick={onLogoClick}>
            <img src="images/accTechLogo.svg" alt="accenture logo" />
          </Styled.Logo>
        </Hidden>
        <Grid container direction="column" style={{ flexGrow: 1 }}>
          <Typography variant="h6" color="inherit">
            <span>FORECAST </span>
            <small>v2</small>
          </Typography>
          <Hidden xsDown>
            <span className="gray">
              <b>{user.eid}</b> - CL{user.level} - {user.metrocity}
              { currentFortnightLastDay
                ? (
                  <span> | { parsedFirstDay } - { parsedLastDay }</span>
                )
                : null
              }
            </span>
          </Hidden>
        </Grid>
        <Hidden xsDown>
          <Styled.Button onClick={logout}>{t('logout')}</Styled.Button>
        </Hidden>
      </Toolbar>
    </Styled.Wrapper>
  );
};

const mapStateToProps = state => ({
  currentFortnightLastDay: state.app.currentFortnightLastDay,
  user: state.user,
});

export default compose(
  withWidth({ withTheme: true }),
  withI18n(),
  connect(mapStateToProps)
)(AppBar);

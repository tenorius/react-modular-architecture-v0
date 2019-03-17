import React from 'react';
import { Link } from 'react-router-dom';
import { withI18n } from 'react-i18next';

import Typography from '@material-ui/core/Typography';

import LanguageChanger from '../components/LanguageChanger';

const home = ({ t }) => (
  <React.Fragment>
    <Typography variant="h6">{t('homePage.title')}</Typography>
    <Typography variant="subtitle1">{t('homePage.message')}</Typography>
    <LanguageChanger />
    <br />
    <br />
    <div>
      <Link to="/examples/api">{t('homePage.linkApi')}</Link>
      <br />
      <Link to="/examples/styled-components">{t('homePage.linkStyledComponents')}</Link>
    </div>
  </React.Fragment>
);

export default withI18n()(home);

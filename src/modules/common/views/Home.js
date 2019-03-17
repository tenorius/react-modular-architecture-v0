import React from 'react';
import { withI18n } from 'react-i18next';

import Typography from '@material-ui/core/Typography';

import LanguageChanger from '../components/LanguageChanger';

const home = ({ t }) => (
  <React.Fragment>
    <Typography variant="title">{t('introMessages.title')}</Typography>
    <Typography variant="subheading">{t('introMessages.message')}</Typography>
    <LanguageChanger />
  </React.Fragment>
);

export default withI18n()(home);

import React from 'react';
import { NamespacesConsumer } from 'react-i18next';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import languages from '../constants/languages';

const LanguageChanger = () => (
  <NamespacesConsumer>
    {
      (t, { i18n }) => (
        <Select
          value={i18n.languages[0]}
          onChange={e => i18n.changeLanguage(e.target.value)}
        >
          {Object.keys(languages).map(language => (
            <MenuItem key={language} value={languages[language].value}>{languages[language].name}</MenuItem>
          ))}
        </Select>
      )
    }
  </NamespacesConsumer>
);

export default LanguageChanger;

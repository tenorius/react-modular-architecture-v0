import React from 'react';
import { withNamespaces, withI18n, NamespacesConsumer } from 'react-i18next';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const child = (props) => {
  const { t } = props;
  return (
    <div>
      <hr />
      <h3>Child</h3>
      <p>{t('common')}</p>
      <p>{t('appointments')}</p>
      <p>{t('foo')}</p>
    </div>
  );
};

const Child = withI18n()(child);

const LngChanger = () => (
  <NamespacesConsumer>
    {
      (t, { i18n }) => (
        <RadioGroup value={i18n.languages[0]} onChange={(e, value) => i18n.changeLanguage(value)}>
          <FormControlLabel value="en" label="English" control={<Radio />} />
          <FormControlLabel value="pt" label="Português" control={<Radio />} />
          <FormControlLabel value="es" label="Español" control={<Radio />} />
        </RadioGroup>
      )
    }
  </NamespacesConsumer>
);

const Landing = (props) => {
  const { t } = props;
  return (
    <div>
      <LngChanger />
      <p>{t('common')}</p>
      <p>{t('appointments')}</p>
      <p>{t('foo')}</p>
      <Child />
    </div>
  );
};

export default withNamespaces(['appointments'])(Landing);

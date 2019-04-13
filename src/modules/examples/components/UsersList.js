import React from 'react';
import { withI18n } from 'react-i18next';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import UserCard from './UserCard';

const Styled = {};

Styled.Typography = styled(Typography)``;

Styled.UsersContainer = styled.div`
  padding: 20px;
  ${Styled.Typography} {
    color: #9c9c9c;
  }
`;

const usersList = (props) => {
  const { t, users, handleClick } = props;
  // Render component
  return (
    <React.Fragment>
      <Button
        className="button-red"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {t('apiPage.getUsers')}
      </Button>
      <br />
      <Styled.UsersContainer>
        <Grid container direction="row" spacing={16}>
          { users.length
            ? users.map(userId => (
              <Grid item xs={12} sm={6} md={4} key={userId}>
                <UserCard userId={userId} />
              </Grid>
            ))
            : <Styled.Typography variant="overline">{t('apiPage.noUsers')}</Styled.Typography>
          }
        </Grid>
      </Styled.UsersContainer>
    </React.Fragment>
  );
};

export default withI18n()(usersList);

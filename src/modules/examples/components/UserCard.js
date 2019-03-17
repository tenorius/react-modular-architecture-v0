import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withI18n } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Styled = {};

Styled.Paper = styled(Paper)`
  display: flex;
  padding: 16px;
  min-height: 200px;
  text-align: center;
`;

Styled.ProfilePic = styled.img`
  border-radius: 50%;
  min-width: 50px;
  max-width: 50px;
  min-height: 50px;
  max-height: 50px;
  background-color: #eeeeee;
`;

Styled.Headline = styled(Typography)``;

Styled.Subheading = styled(Typography)`
  color: #606060;
  font-size: ${12 / 16}em;
`;

Styled.Quotation = styled(Typography)`
  font-style: italic;
`;

const userCard = (props) => {
  const { user } = props;
  // Disable browser image cache
  const imageUrl = user.name && `https://picsum.photos/150/150/?random&foo=${user.id}`;
  return (
    <Styled.Paper>
      <Grid container direction="column" justify="space-between" alignItems="center">
        <Grid item>
          {imageUrl
            ? <Styled.ProfilePic src={imageUrl} alt="User profile" />
            : <Skeleton circle height={50} width={50} />
          }
          <Styled.Headline>{user.name || <Skeleton />}</Styled.Headline>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <Styled.Subheading>
            {user.username
              ? `@${user.username}`
              : <Skeleton />
            }
          </Styled.Subheading>
          <Styled.Subheading>{user.email || <Skeleton width={100} />}</Styled.Subheading>
        </Grid>
        <Grid item>
          <Styled.Quotation>
            {user.company
              ? `"${user.company.catchPhrase}"`
              : <Skeleton width={150} />
            }
          </Styled.Quotation>
        </Grid>
      </Grid>
    </Styled.Paper>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    user: users,
    company: companies,
    address: addresses,
  } = state.app.entities;
  // Fetch user data
  let user = { };
  if (users && users[ownProps.userId]) {
    user = { ...users[ownProps.userId] };
    user.company = companies[user.company];
    user.address = addresses[user.address];
  }
  // Returned prop
  return { user };
};

export default compose(
  connect(mapStateToProps),
  withI18n(),
)(userCard);

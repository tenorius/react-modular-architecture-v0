import React from 'react';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const Wrapper = styled.div`
  
  width: 250px;
  .user{
    padding: 10px 0px;
    margin: 10px;
    //border: 1px solid lightgray;
    //border-radius: 4px;
    text-align: center;
    
    .image{
      width: 100%;
      height: 60px;
      margin-bottom: 10px;
      img{
        height: 100%;
        width: auto;
      }
    }
    p{
      font-size: 11px;
      font-weight: 100;
    }
    .name{
      font-weight: 600;
      color: #66BB6A;
      font-size: 14px;
    }
    .state{
      font-weight: bold;
    }
  }
`;

const StyledButton = styled(Button)`
  position: absolute!important;
  bottom: 0;
  width: 100%;
  border-radius: 0!important;
`;

const Drawer = ({ level, name, metrocity }) => {
  let text;
  if (!level) {
    text = 'Accenture Leadership';
  } else if (level && level <= 7) {
    text = `Permission of Manager - CL${level}`;
  } else {
    text = `Accenture - CL${level}`;
  }

  return (
    <Wrapper>
      <div className="user">
        <div className="image">
          <img src="images/user-icon.svg" alt="user icon" />
        </div>
        <span className="name">{name}</span>
        <p>
          <span className="permission">{text}</span>
          <span> - </span>
          <span className="state">{metrocity}</span>
        </p>
      </div>
      <Divider />
      <StyledButton variant="contained" color="secondary">
        LOGOUT
      </StyledButton>
    </Wrapper>
  );
};

export default Drawer;

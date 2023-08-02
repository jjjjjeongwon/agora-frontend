import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginSignupTitle = () => {
  return <LoginText>PoLY WoRLD</LoginText>;
};

const LoginText = styled.div`
  top: 15%;
  color: white;
  width: 300px;
  height: 90px;
  font-family: 'luckiest guy';

  font-size: 80px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 40px auto 100px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default LoginSignupTitle;

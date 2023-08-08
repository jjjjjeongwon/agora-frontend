import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginSignupTitle = () => {
  const navigate = useNavigate();
  return <LoginText onClick={() => navigate('/login')}>PoLY WoRLD</LoginText>;
};

const LoginText = styled.div`
  top: 15%;
  color: white;
  /* #00C6A7 */
  width: 300px;
  height: 90px;
  font-family: 'luckiest guy';

  font-size: 80px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 40px auto 40px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default LoginSignupTitle;

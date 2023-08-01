//packages
import React from 'react';
import { styled } from 'styled-components';

//route
import { useNavigate } from 'react-router-dom';

//components
import LoginSignupTitle from '../ui/public/LoginSignupTitle';

const Main = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <LogoContainer>
        <LoginSignupTitle>PoLY WoRD </LoginSignupTitle>
        <Location>
          <ButtonBackground />
          <AccessButton
            onClick={() => {
              navigate('/login');
            }}
          >
            START
          </AccessButton>
        </Location>
      </LogoContainer>

      <HomeICon>
        <img src="/images/home.png" alt="" />
      </HomeICon>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  width: 70%;
  display: flex;

  padding: 120px 90px;
`;

const LogoContainer = styled.div`
  padding-top: 60px;
`;

const Location = styled.div`
  position: absolute;
`;

const ButtonBackground = styled.div`
  position: absolute;
  width: 200px;
  height: 60px;
  border-radius: 18px;
  top: 0;

  left: 0;
  box-shadow: 0 5px #0158b4;
`;

const AccessButton = styled.div`
  cursor: pointer;
  font-family: 'luckiest guy';
  top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  position: relative;
  width: 200px;
  height: 55px;
  color: white;
  box-sizing: border-box;
  padding: 16px 32px;
  border-radius: 18px;
  box-shadow: inset 0 -2px 10px #78cfff99;
  transition: transform 0.2s cubic-bezier(0, 0.51, 0.58, 0.99);
  background: linear-gradient(180deg, #07b9fe 0%, #1160be 100%);
`;

const HomeICon = styled.div`
  margin: 60px auto 60px 260px;
`;

export default Main;

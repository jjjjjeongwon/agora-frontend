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
        <LoginSignupTitle>AGORA</LoginSignupTitle>
        <AccessButton
          onClick={() => {
            navigate('/login');
          }}
        >
          클릭해서 접속하기
        </AccessButton>
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

const AccessButton = styled.div`
  margin: 100px 40px;
  width: 200px;
  height: 55px;
  border-radius: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #004ce4;
  /* font-weight: bold; */
  font-size: 18px;
  background-color: transparent;
  border: 1px solid #004ce4;
  cursor: pointer;
  &:hover {
    transition-duration: 0.3s;
    background-color: #e8eeff;
  }
`;

const HomeICon = styled.div`
  margin: 60px auto 60px 260px;
`;

export default Main;

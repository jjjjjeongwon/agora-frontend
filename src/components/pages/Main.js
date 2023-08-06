//packages
import React from 'react';
import { styled, keyframes } from 'styled-components';

//route
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <Container>
        <LogoContainer>
          <Title>PoLY WoRLD </Title>
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
      </Container>
    </MainContainer>
  );
};

const rotationAnimation = keyframes`
    from {
        transform: rotate(-3deg);
    } to{
        transform: rotate(3deg);
    }
`;

const MainContainer = styled.div`
  background-image: url('/images/background_main.png');
  background-size: cover;
  font-family: 'Noto Sans KR';
  font-style: normal;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  animation: ${rotationAnimation} 1s linear infinite alternate;
  top: 20%;
  color: white;
  width: 300px;
  height: 90px;
  font-family: 'luckiest guy';

  font-size: 140px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 40px auto 140px;
  cursor: pointer;
`;
const Container = styled.div`
  margin: 300px auto;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  padding-top: 60px;
`;

const Location = styled.div`
  position: absolute;
`;

const ButtonBackground = styled.div`
  /* left: 30px ; */
  margin-left: 40px;
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
  margin-left: 40px;
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

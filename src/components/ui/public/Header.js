import styled from 'styled-components';
import { HiOutlineLogout } from 'react-icons/hi';
import { TbUserSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { NickNameState } from '../../../state/UserAtom';

const Header = ({ setFriend }) => {
  const navigate = useNavigate();
  const loginNickName = useRecoilValue(NickNameState);

  console.log(loginNickName);

  const nickname = loginNickName;

  const userLogout = () => {
    sessionStorage.removeItem('isLogin');
    alert('로그아웃!');
    navigate('/');
  };
  return (
    <Container>
      <Logo>
        Poly
        <br />
        World
      </Logo>
      <Wrap>
        <NickName>UUJEEN</NickName>
        <IconWrap>
          <Logout onClick={() => setFriend(true)}>
            <HoverWrap color="white" hoverColor="#BCC9C6">
              <TbUserSearch size={29} />
            </HoverWrap>
          </Logout>
          <Logout onClick={userLogout}>
            <HoverWrap color="white" hoverColor="#BCC9C6">
              <HiOutlineLogout size={29} />
            </HoverWrap>
          </Logout>
        </IconWrap>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  width: 90vw;
  height: 10%;
  /* border: 2px solid gray; */
`;

const Logo = styled.div`
  color: white;
  font-family: 'luckiest guy';
  font-size: 50px;
`;

const Wrap = styled.div`
  width: 330px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HoverWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: ${({ color }) => color ?? 'white'};
  }
  svg:hover {
    color: ${({ hoverColor }) => hoverColor ?? 'grey'};
  }
`;

const NickName = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
  margin-right: 20px;
  height: 80px;
  color: white;
  font-family: 'luckiest guy';
`;

const IconWrap = styled.div`
  width: 165px;
  align-items: center;
  justify-content: space-between;
  display: flex;
`;

const Logout = styled.div`
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 35px;
  border: 5px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Header;

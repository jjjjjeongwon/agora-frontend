import styled, { keyframes, css } from 'styled-components';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { JoinExitState } from '../../../../state/UserAtom';

const JoinExitAlert = () => {
  const [visible, setVisible] = useState(true);
  const [joinExit, setJoinExit] = useRecoilState(JoinExitState);

  console.log(joinExit.nickName);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // 2초 후에 사라짐

    // 컴포넌트가 unmount될 때 timer를 정리해주어야 합니다.
    return () => clearTimeout(timer);
  }, [joinExit.nickName, joinExit.enter]); // 빈 dependency 배열을 사용하여 이 effect를 컴포넌트가 mount될 때만 실행하도록 합니다.

  if (!visible) {
    return null; // 컴포넌트가 보이지 않을 때는 아무것도 렌더링하지 않습니다.
  }

  return (
    <>
      <Container visible={visible}>
        <img src="/images/joinAlert.png" alt="" />
        <TextBox>
          {joinExit.nickName} {joinExit.enter}
        </TextBox>
      </Container>
    </>
  );
};

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Container = styled.div`
  width: 150px;
  height: 100px;
  top: 6%;
  right: 6%;
  /* background-color: transparent; */
  position: absolute;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
  }
  opacity: 1;
  ${(props) =>
    props.visible
      ? css`
          animation: ${fadeOut} 5s linear;
        `
      : ''}
`;

const TextBox = styled.div`
  font-size: 20px;
  font-family: 'jua';
  font-weight: 700;
  color: #5277df;
  position: absolute;
  top: 28%;
  left: 18%;
`;

export default JoinExitAlert;

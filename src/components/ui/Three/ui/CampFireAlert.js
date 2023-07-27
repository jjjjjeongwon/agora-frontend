import styled, { keyframes, css } from 'styled-components';
import { useState, useEffect } from 'react';

const CampFireAlert = ({ viewCampModal }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // 2초 후에 사라짐

    // 컴포넌트가 unmount될 때 timer를 정리해주어야 합니다.
    return () => clearTimeout(timer);
  }, []); // 빈 dependency 배열을 사용하여 이 effect를 컴포넌트가 mount될 때만 실행하도록 합니다.

  if (!visible) {
    return null; // 컴포넌트가 보이지 않을 때는 아무것도 렌더링하지 않습니다.
  }
  return (
    <>
      {/* <Container visible={visible}> */}
      <Container visible={visible}>
        <img src="/images/campfireAlert.png" alt="" />
        <TextBox>
          잠시 후,
          <br />
          5분 간 캠프파이어가 시작됩니다!
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
  width: 450px;
  height: 140px;
  top: 6%;
  left: 35%;
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
  font-size: 26px;
  font-family: 'jua';
  font-weight: 700;
  color: #6a5b4c;
  position: absolute;
  top: 28%;
  left: 4%;
`;

export default CampFireAlert;

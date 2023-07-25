import styled, { keyframes, css } from 'styled-components';
import { useState, useEffect } from 'react';

const TalkBubble = ({ message }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3초 후에 사라짐

    // 컴포넌트가 unmount될 때 timer를 정리해주어야 합니다.
    return () => clearTimeout(timer);
  }, []); // 빈 dependency 배열을 사용하여 이 effect를 컴포넌트가 mount될 때만 실행하도록 합니다.

  if (!visible) {
    return null; // 컴포넌트가 보이지 않을 때는 아무것도 렌더링하지 않습니다.
  }

  return (
    <Container visible={visible}>
      <TalkPlace>{message}</TalkPlace>
    </Container>
  );
};

//점점 사라지는 효과
// const fadeOut = keyframes`
//   from {
//     opacity: 1;
//   }
//   to {
//     opacity: 0;
//   }
// `;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/images/bubble.png');
  background-size: cover;

  width: 190px;
  height: 160px;
`;
// 점점 사라지는 효과 필요하면 Container에 추가
// opacity: 1;
// ${(props) =>
// props.visible
// ? css`
//   animation: ${fadeOut} 2s linear;
//  `
// : ''}

const TalkPlace = styled.div`
  width: 72%;
  height: 66%;
`;

export default TalkBubble;

import { forwardRef, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

const VisitListWriteModal = forwardRef((props, ref) => {
  let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

  // 모달 끄기
  useEffect(() => {
    console.log('ddd');
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      props.setLetterModalOpen(false);
    }
  };

  return (
    <>
      <Container ref={wrapperRef}>ssss</Container>
    </>
  );
});

const Container = styled.div`
  width: 300px;
  height: 300px;
  right: 5%;
  bottom: 10%;
  /* background-color: transparent; */
  position: absolute;
  box-sizing: border-box;
  margin: 5% auto;
  padding: 10px 20px;
  border-radius: 10px;
  background-image: url('/images/visitPaper.png');
  background-size: cover;
`;

export default VisitListWriteModal;

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
      <Container ref={wrapperRef}>
        <VisitListTitle>MEMO</VisitListTitle>
        <Content></Content>
        <CustomButton>WRITE</CustomButton>
      </Container>
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
  padding: 40px 45px;
  border-radius: 10px;
  background-image: url('/images/visitPaper.png');
  background-size: cover;
`;

const VisitListTitle = styled.div`
  font-family: 'gloria hallelujah';
  margin-left: 50px;
  margin-bottom: 30px;
  /* font-family: 'bagel fat one'; */
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.input`
  width: 100%;
  height: 60px;
  background-color: #e6d6c5;
  border: 1px solid #b2947c;
  border-radius: 5px;
  outline: none;
`;

const CustomButton = styled.div`
  font-family: 'gloria hallelujah';

  width: 100px;
  height: 28px;
  border-radius: 27px;
  display: flex;
  margin: 30px auto auto 15px;
  align-items: center;
  justify-content: center;
  color: #916a3f;
  font-size: 16px;
  background-color: #e5d2c1;
  border: 1.5px solid #916a3f;
  cursor: pointer;
  &:hover {
    transition-duration: 0.3s;
    background-color: white;
  }
`;
export default VisitListWriteModal;

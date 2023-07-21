import { forwardRef, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

const VisitListModal = forwardRef((props, ref) => {
  let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

  // 모달 끄기
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      props.setModalOpen(false);
    }
  };

  return (
    <>
      <Container ref={wrapperRef}>
        <PostIt>방명록 남기고 갑니다!</PostIt>
      </Container>
    </>
  );
});

const Container = styled.div`
  width: 35%;
  height: 80%;
  /* background-color: transparent; */
  position: relative;
  box-sizing: border-box;
  margin: 5% auto;
  padding: 10px 20px;
  border-radius: 10px;
  background-image: url('/images/notepad.png');
  background-size: cover;
`;

const PostIt = styled.div`
  margin: 200px auto auto 40px;
  width: 150px;
  height: 150px;
  padding: 25px;
  font-size: 12px;
  box-sizing: border-box;
  background-image: url('/images/postit.png');
`;

export default VisitListModal;

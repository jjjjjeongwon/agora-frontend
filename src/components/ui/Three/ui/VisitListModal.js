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
        <Title>Visit List</Title>
        <PostIt>
          <UserName>WONNIE</UserName>
          <Text>저랑 관심사가 너무 비슷한 것 같아요!</Text>
          <MapButton>Map</MapButton>
        </PostIt>
        <PostItCopy>
          <UserName>KIEL</UserName>
          <Text>제 맵에도 놀러오세요! 이야기해봐요 :)</Text>
          <MapButton>Map</MapButton>
        </PostItCopy>
      </Container>
    </>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 680px;
  /* background-color: transparent; */
  position: relative;
  box-sizing: border-box;
  margin: 2% auto;
  padding: 130px 95px 100px;
  border-radius: 10px;
  background-image: url('/images/customNote.png');
  background-size: cover;
`;

const Title = styled.div`
  font-family: 'gloria hallelujah';
  /* font-family: 'bagel fat one'; */
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostIt = styled.div`
  /* margin: auto; */
  width: 150px;
  height: 150px;
  padding: 25px;
  font-size: 12px;
  box-sizing: border-box;
  background-image: url('/images/visitPaper.png');
  background-size: cover;
`;
const PostItCopy = styled.div`
  margin: 15px auto auto 90px;
  width: 150px;
  height: 150px;
  padding: 25px;
  font-size: 12px;
  box-sizing: border-box;
  background-image: url('/images/visitPaper.png');
  background-size: cover;
`;

const UserName = styled.div`
  font-family: 'gloria hallelujah';
  font-size: 10px;
  margin-left: 40px;
`;

const Text = styled.div`
  margin-top: 10px;
  background-color: transparent;
  /* font-family: 'jua'; */
`;

const MapButton = styled.div`
  font-family: 'gloria hallelujah';

  width: 50px;
  height: 15px;
  border-radius: 27px;
  display: flex;
  margin: 25px auto auto 0px;
  align-items: center;
  justify-content: center;
  color: #916a3f;
  font-size: 10px;
  background-color: #e5d2c1;
  border: 1.5px solid #916a3f;
  cursor: pointer;
  &:hover {
    transition-duration: 0.3s;
    background-color: white;
  }
`;

export default VisitListModal;

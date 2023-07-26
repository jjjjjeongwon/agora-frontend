import { forwardRef, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import sports from '../../../../assets/images/sports.png';
import car from '../../../../assets/images/car.png';
import bread from '../../../../assets/images/bread.png';
import game from '../../../../assets/images/game.png';
import music from '../../../../assets/images/music.png';
import trip from '../../../../assets/images/trip.png';

const MapCustomModal = forwardRef((props, ref) => {
  let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

  const tagList = {
    0: trip,
    1: sports,
    2: car,
    3: music,
    4: game,
    5: bread,
  };

  const [selectedTagNumber, setSelectedTagNumber] = useState(0);

  // 모달 끄기
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      props.setCustomModalOpen(false);
    }
  };

  const handleTagSelect = (e) => {
    setSelectedTagNumber(e.target.value);
  };

  return (
    <>
      <Container ref={wrapperRef}>
        <CustomTitle>Custom Map</CustomTitle>
        <TitleName>Tag (preview)</TitleName>

        <TagSelectWrap>
          <TagImage src={tagList[selectedTagNumber]} />
          <SelectPlaceDropBox onChange={handleTagSelect}>
            <option value="0">여행 </option>
            <option value="1">운동</option>
            <option value="2">자동차 </option>
            <option value="3">음악 </option>
            <option value="4">게임</option>
            <option value="5">빵 </option>
          </SelectPlaceDropBox>
        </TagSelectWrap>
        <TitleName>Title</TitleName>
        <InputTitle placeholder="관심사 글에 대한 제목을 입력해주세요"></InputTitle>
        <TitleName>Contents</TitleName>
        <InputText placeholder="관심사에 대한 내용을 자유롭게 입력해주세요"></InputText>
        <CustomButton>CUSTOM</CustomButton>
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

const TagSelectWrap = styled.div`
  display: flex;
  justify-content: space-between;
  /* height: 100px; */
  /* margin-bottom: 5px; */
`;

const TitleName = styled.div`
  font-family: 'gloria hallelujah';
  font-size: 13px;
`;

const TagImage = styled.img`
  background-color: transparent;
  border-radius: 10px;
  width: 65%;
  height: 130px;
  object-fit: contain;
  margin-top: 2px;
`;

const SelectPlaceDropBox = styled.select`
  /* margin-top: 35px; */
  width: 100px;
  height: 35px;
  color: #858899;
  border: 0.85px solid #e1e1e8;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

const CustomTitle = styled.div`
  font-family: 'gloria hallelujah';
  /* font-family: 'bagel fat one'; */
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputTitle = styled.input`
  height: 22px;
  background-color: transparent;
  border: 1px solid #7e7e7f;
  border-radius: 5px;
  outline: none;
`;
const InputText = styled.input`
  height: 50px;
  background-color: transparent;
  border: 1px solid #7e7e7f;
  border-radius: 5px;
  outline: none;
`;

const CustomButton = styled.div`
  font-family: 'gloria hallelujah';

  width: 120px;
  height: 32px;
  border-radius: 27px;
  display: flex;
  margin: 30px auto auto;
  align-items: center;
  justify-content: center;
  color: #916a3f;
  font-size: 16px;
  background-color: #dbd8cf;
  border: 1.5px solid #916a3f;
  cursor: pointer;
  &:hover {
    transition-duration: 0.3s;
    background-color: white;
  }
`;

export default MapCustomModal;

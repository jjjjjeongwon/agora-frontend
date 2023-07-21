import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TagButton from '../ui/MapList/TagButton';

const MapViewBox = ({ nickname, nickname2, image, image2 }) => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => {
        navigate('/three');
      }}
    >
      <MapWrap>
        <LockIconWrap>
          <img src="/images/lock.png" alt="" />
        </LockIconWrap>
        <BoxWrap>
          <TagLockWrap>
            <TagButtonWrap>
              <TagButton tag="동물" />
              <TagButton tag="여행" />

              <TagButton tag="맛집" />
            </TagButtonWrap>
            <Nickname>{nickname}</Nickname>
          </TagLockWrap>
          <ImageWrap>
            <img src={image} alt="" />
          </ImageWrap>
        </BoxWrap>
      </MapWrap>
      <MapWrap>
        <LockIconWrap>
          <img src="/images/lock.png" alt="" />
        </LockIconWrap>
        <BoxWrap>
          <TagLockWrap>
            <TagButtonWrap>
              <TagButton tag="동물" />
              <TagButton tag="여행" />

              <TagButton tag="맛집" />
            </TagButtonWrap>
            <Nickname>{nickname2}</Nickname>
          </TagLockWrap>
          <ImageWrap>
            <img src={image2} alt="" />
          </ImageWrap>
        </BoxWrap>
      </MapWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  :hover {
    transform: scale(1.02);
    transition: transform 0.3s;
  }
`;

const MapWrap = styled.div``;

const LockIconWrap = styled.div`
  width: 40px;
  height: 40px;
  pointer-events: none;
  margin-left: 450px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const BoxWrap = styled.div`
  padding: 20px;
  width: 450px;
  height: 240px;
  background-color: #f0f0f0;
  border-radius: 20px;
  box-shadow: 4px 2px 23px 0.5px rgba(0, 0, 0, 0.55);
`;

const TagLockWrap = styled.div`
  display: flex;
  pointer-events: none;
  justify-content: space-between;
`;

const TagButtonWrap = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Nickname = styled.div`
  margin-left: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const ImageWrap = styled.div`
  pointer-events: none;

  margin-top: 5px;
  margin-left: 80px;
  width: 370px;
  height: 190px;
  img {
    width: 100%;
    height: 100%;
  }
`;
export default MapViewBox;

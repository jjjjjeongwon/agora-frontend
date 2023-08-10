import styled, { keyframes, css } from 'styled-components';
import { useState, useEffect } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BsFillChatRightDotsFill } from 'react-icons/bs';

const NpcTalkModal = ({ setNpcTalkOpen, setNpcTalk }) => {
  return (
    <>
      <Container>
        <img src="/images/npctalk.png" alt="" />
        <ChatIconWrap>
          <BsFillChatRightDotsFill size={48} color="#F2676E" />
        </ChatIconWrap>
        <TextBox>
          안녕! 만나서 반가워! 나는 호랭이야!
          <br />
          오른쪽으로 가면 파도를 타고 새로운 친구를 만나볼 수 있어!
        </TextBox>
        <IconWrap onClick={() => setNpcTalk(false)}>
          <BiSolidDownArrow size={28} color="#F2676E" />
        </IconWrap>
      </Container>
    </>
  );
};

// 1. 애니메이션 정의
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) ;
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const bounceTwo = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) rotate(-15deg);
  }
  40% {
    transform: translateY(-6px) rotate(-15deg);
  }
  60% {
    transform: translateY(-5px) rotate(-15deg);
  }
`;

const Container = styled.div`
  display: flex;
  width: 610px;
  height: 200px;
  top: 20%;
  left: 35%;
  /* background-color: transparent; */
  position: absolute;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
  }
  opacity: 1;
`;

const ChatIconWrap = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0%;
  left: 3%;

  animation: ${bounceTwo} 4s infinite;
`;

const IconWrap = styled.div`
  cursor: pointer;
  position: absolute;
  top: 60%;
  right: 7%;

  animation: ${bounce} 1s infinite;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  /* font-family: 'jua'; */
  font-weight: 600;
  color: #203337;
  position: absolute;
  line-height: 140%;
  top: 25%;
  left: 7%;
`;

export default NpcTalkModal;

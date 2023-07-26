import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import SocketChat from '../ui/Three/chat/SocketChat';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes, css } from 'styled-components';
import VisitListModal from '../ui/Three/ui/VisitListModal';
import gsap from 'gsap';
import io from 'socket.io-client';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//components
import EnvSky from '../ui/Three/3Dcanvas/EnvSky';
import EnvStars from '../ui/Three/3Dcanvas/EnvStars';
import Floor from '../ui/Three/3Dcanvas/Floor';
import Player from '../ui/Three/3Dcanvas/Player';
import Light from '../ui/Three/3Dcanvas/Light';
import Spot from '../ui/Three/3Dcanvas/Spot';

// global state
import { useRecoilState } from 'recoil';
import { LoginState, UserState } from '../../state/UserAtom';
import MapCustomModal from '../ui/Three/ui/MapCustomModal';
import VisitListWriteModal from '../ui/Three/ui/VisitListWriteModal';
import RoomHonorAlert from '../ui/Three/ui/RoomHonorAlert';
import TalkBubble from '../ui/Three/chat/TalkBubble';
import House from '../ui/Three/3Dcanvas/House';
import Tree from '../ui/Three/3Dcanvas/Tree';
import CampFire from '../ui/Three/3Dcanvas/CampFire';

const socket = io('http://15.164.176.168:8080/');

const ThreeViewTest = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const [myId, setMyId] = useRecoilState(UserState);
  const [nickName, setNickName] = useState('');
  const [sendNickName, setSendNickName] = useState('');

  const [myPlayer, setMyPlayer] = useState({});

  const roomName = useParams().id;
  const navigate = useNavigate();
  const aspectRatio = window.innerWidth / window.innerHeight;

  //spots
  const houseSpot = [5, 0.005, 5];
  const postSpot = [10, 0.005, 5];

  // 모달창 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
    if (modalOpen === true) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  };

  const showLetterModal = () => {
    if (letterModalOpen === true) {
      setLetterModalOpen(false);
    } else {
      setLetterModalOpen(true);
    }
  };

  const showCustomModal = () => {
    if (customModalOpen === true) {
      setCustomModalOpen(false);
    } else {
      setCustomModalOpen(true);
    }
  };
  useEffect(() => {}, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#000',
      }}
    >
      <Canvas
        gl={{ antialias: true }}
        shadows={{
          enabled: true,
          autoUpdate: true,
          type: THREE.PCFSoftShadowMap,
        }}
        camera={{
          fov: 50,
          aspect: aspectRatio,
          near: 0.1,
          far: 1000,
          position: [0, 3, 7],
          zoom: 0.5,
        }}
      >
        <Floor />
        <Light />
        {}
        <Spot spot={houseSpot} />
        <Spot spot={postSpot} />
        <Suspense fallback={null}>
          <EnvSky />
          <EnvStars />
          <CampFire />
          <Tree />
          <House />
          <Player
            socket={socket}
            roomName={roomName}
            myPlayer={myPlayer}
            setMyPlayer={setMyPlayer}
          />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <RoomHonorAlert />
      <ChatWrap>
        <SocketChat roomName={roomName} socket={socket} />
      </ChatWrap>
      <PlusICon
        onClick={() => {
          navigate('/maplist');
        }}
      >
        <img src="/images/magnifier.png" alt="" />
      </PlusICon>

      {/* 맵 커스텀 모달 */}
      <PostBox onClick={showCustomModal}>
        <img src="/images/tool.png" alt="" />
      </PostBox>
      <ContainerMap customModalOpen={customModalOpen}>
        {customModalOpen && (
          <MapCustomModal setCustomModalOpen={setCustomModalOpen} />
        )}
      </ContainerMap>

      {/* 밤명록 작성 모달 */}
      {/* <PostBox onClick={showLetterModal}>
        <img src="/images/letter.png" alt="" />
      </PostBox> */}
      {/* <ContainerLetter letterModalOpen={letterModalOpen}>
              {letterModalOpen && (
                <VisitListWriteModal setLetterModalOpen={setLetterModalOpen} />
              )}
            </ContainerLetter> */}

      {/* 우체통 모달 */}
      {/* <PostBox onClick={showModal}>
        <img src="/images/letter.png" alt="" />
      </PostBox> */}
      {/* <Container modalOpen={modalOpen}>
        {modalOpen && <VisitListModal setModalOpen={setModalOpen} />}
      </Container> */}
    </div>
  );
};

const rotationAnimation = keyframes`
    from {
        transform: rotate(-5deg);
    } to{
        transform: rotate(5deg);
    }
`;

const PlusICon = styled.div`
  /* animation: ${rotationAnimation} 1s linear infinite alternate; */
  position: absolute;
  cursor: pointer;
  left: 0.1%;
  bottom: 0.1%;
  width: 80px;
  height: 80px;
  margin: 40px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const PostBox = styled.div`
  animation: ${rotationAnimation} 1s linear infinite alternate;

  position: absolute;
  cursor: pointer;
  right: 3%;
  bottom: 5%;
  width: 80px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  ${({ modalOpen }) => {
    return css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: ${modalOpen ? 1 : -1};
      background: ${modalOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
    `;
  }}
`;

const ContainerLetter = styled.div`
  ${({ letterModalOpen }) => {
    return css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: ${letterModalOpen ? 1 : -1};
      background: ${letterModalOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
    `;
  }}
`;

const ContainerMap = styled.div`
  ${({ customModalOpen }) => {
    return css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: ${customModalOpen ? 1 : -1};
      background: ${customModalOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
    `;
  }}
`;

const ChatWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: 'white';
`;

export default ThreeViewTest;

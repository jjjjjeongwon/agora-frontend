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

//components
import EnvSky from '../ui/Three/3Dcanvas/EnvSky';
import EnvStars from '../ui/Three/3Dcanvas/EnvStars';
import Floor from '../ui/Three/3Dcanvas/Floor';
import Player from '../ui/Three/3Dcanvas/Player';
import Light from '../ui/Three/3Dcanvas/Light';
import Spot from '../ui/Three/3Dcanvas/Spot';

// global state
import { useRecoilState } from 'recoil';
import {
  LoginState,
  UserState,
  UserCount,
  JoinExitState,
} from '../../state/UserAtom';

import MapCustomModal from '../ui/Three/ui/MapCustomModal';
import VisitListWriteModal from '../ui/Three/ui/VisitListWriteModal';
import RoomHonorAlert from '../ui/Three/ui/RoomHonorAlert';
import TalkBubble from '../ui/Three/chat/TalkBubble';
import Game from '../ui/Three/3Dcanvas/Game';
import House from '../ui/Three/3Dcanvas/House';
import Tree from '../ui/Three/3Dcanvas/Tree';
import CampFire from '../ui/Three/3Dcanvas/CampFire';
import PostOfficeBox from '../ui/Three/3Dcanvas/PostOfficeBox';
import JoinExitAlert from '../ui/Three/ui/JoinExitAlert';
import CampFireAlert from '../ui/Three/ui/CampFireAlert';

const socket = io('http://52.79.224.132:8080/');

const Three = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const [myId, setMyId] = useRecoilState(UserState);
  const [joinExit, setJoinExit] = useRecoilState(JoinExitState);

  const [nickName, setNickName] = useState('');
  const [sendNickName, setSendNickName] = useState('');

  const [viewVisitList, setViewVisitList] = useState(false);
  const [viewCampModal, setViewCampModal] = useState(false);

  const [myPlayer, setMyPlayer] = useState({});

  const [countUser, setCountUser] = useRecoilState(UserCount);

  const roomName = useParams().id;
  const navigate = useNavigate();
  const aspectRatio = window.innerWidth / window.innerHeight;

  //spots
  const gameSpot = { x: 5, y: 0.005, z: 5 };
  const postSpot = { x: 10, y: 0.005, z: 5 };

  // 모달창 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  // 모달창 노출

  useEffect(() => {
    if (viewVisitList === false) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }, [viewVisitList]);

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
        <EnvSky />
        <EnvStars />
        <Floor />
        <Light />
        <Spot spot={gameSpot} />
        <Spot spot={postSpot} />
        <Suspense fallback={null}>
          <CampFire myPlayer={myPlayer} setViewCampModal={setViewCampModal} />
          <Tree />
          <House />
          <PostOfficeBox
            myPlayer={myPlayer}
            postSpot={postSpot}
            setViewVisitList={setViewVisitList}
          />
          <Game myPlayer={myPlayer} gameSpot={gameSpot} />
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
      {joinExit.enter && <JoinExitAlert />}

      {viewCampModal && <CampFireAlert viewCampModal={viewCampModal} />}

      <CountUser>{countUser}</CountUser>

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
      <PostBoxCopy onClick={showCustomModal}>
        <img src="/images/tool.png" alt="" />
      </PostBoxCopy>
      <ContainerMap customModalOpen={customModalOpen}>
        {customModalOpen && (
          <MapCustomModal setCustomModalOpen={setCustomModalOpen} />
        )}
      </ContainerMap>

      {/* 밤명록 작성 모달 */}
      <PostBox onClick={showLetterModal}>
        <img src="/images/letter.png" alt="" />
      </PostBox>
      <ContainerLetter letterModalOpen={letterModalOpen}>
        {letterModalOpen && (
          <VisitListWriteModal setLetterModalOpen={setLetterModalOpen} />
        )}
      </ContainerLetter>

      {/* 우체통 모달 */}
      {/* <PostBox onClick={showModal}>
        <img src="/images/letter.png" alt="" />
      </PostBox> */}
      <Container modalOpen={modalOpen}>
        {modalOpen && <VisitListModal setModalOpen={setModalOpen} />}
      </Container>
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
const PostBoxCopy = styled.div`
  animation: ${rotationAnimation} 1s linear infinite alternate;

  position: absolute;
  cursor: pointer;
  right: 12%;
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

const CountUser = styled.div`
  top: 3%;
  right: 3%;
  color: #5277df;
  font-family: 'jua';
  font-size: 50px;
  position: absolute;
`;

const ChatWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: 'white';
`;
export default Three;

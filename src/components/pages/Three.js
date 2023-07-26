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
import { LoginState, UserState } from '../../state/UserAtom';

const socket = io('http://15.164.176.168:8080/');

const Three = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const [myId, setMyId] = useRecoilState(UserState);

  console.log(myId);
  const [nickName, setNickName] = useState('');
  const [sendNickName, setSendNickName] = useState('');

  const roomName = useParams().id;
  const navigate = useNavigate();
  // 모달창 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const aspectRatio = window.innerWidth / window.innerHeight;
  // 모달창 노출
  const showModal = () => {
    if (modalOpen === true) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
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
          position: [0, 4, 7],
          zoom: 0.5,
        }}
      >
        <Floor />
        <Light />
        <Spot />
        <Suspense fallback={null}>
          <EnvSky />
          <EnvStars />
          <Player socket={socket} roomName={roomName} />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <ChatWrap>
        <SocketChat roomName={roomName} socket={socket} />
      </ChatWrap>
      <HomeICon
        onClick={() => {
          navigate('/maplist');
        }}
      >
        <img src="/images/magnifier.png" alt="" />
      </HomeICon>
      <PostBox onClick={showModal}>
        <img src="/images/postbox.png" alt="" />
      </PostBox>
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

const HomeICon = styled.div`
  animation: ${rotationAnimation} 1s linear infinite alternate;
  position: absolute;
  cursor: pointer;
  left: 1%;
  bottom: 1%;
  width: 90px;
  height: 90px;
  margin: 60px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const PostBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: 5%;
  bottom: 5%;
  width: 120px;
  height: 120px;
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

const ChatWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: 'white';
`;

export default Three;

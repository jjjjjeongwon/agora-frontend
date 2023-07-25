import { OrbitControls, Sky, Stars } from '@react-three/drei';
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
import Floor from '../ui/Three/3Dcanvas/Floor';
import Player from '../ui/Three/3Dcanvas/Player';
import Light from '../ui/Three/3Dcanvas/Light';
import Spot from '../ui/Three/3Dcanvas/Spot';

const socket = io('http://3.35.5.22:8080/');

const Three = () => {
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
          position: [0, 8, 8],
          zoom: 0.5,
        }}
      >
        <Floor />
        <Light />
        <Spot />
        <Suspense fallback={null}>
          <Sky
            distance={4500}
            sunPosition={[0, 1, 0]}
            inclination={0}
            azimuth={0.25}
          />

          <Stars
            radius={100} // Radius of the inner sphere (default=100)
            depth={50} // Depth of area where stars should fit (default=50)
            count={5000} // Amount of stars (default=5000)
            factor={4} // Size factor (default=4)
            saturation={0} // Saturation 0-1 (default=0)
            fade // Faded dots (default=false)
          />
          <Player />
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

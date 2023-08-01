import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
//components
import EnvSky from '../ui/World/3Dcanvas/EnvSky';
import Floor from '../ui/World/3Dcanvas/Floor';
import Player from '../ui/CollectionSpace/Player copy';
import Light from '../ui/World/3Dcanvas/Light';
import Spot from '../ui/World/3Dcanvas/Spot';
// global state
import { useRecoilState, useRecoilValue } from 'recoil';
import { JoinExitState } from '../../state/UserAtom';

import RoomHonorAlert from '../layout/World/RoomHonorAlert';
import House from '../ui/World/3Dcanvas/House';
import PostOfficeBox from '../ui/World/3Dcanvas/PostOfficeBox';
import styled, { css } from 'styled-components';
import Gallery from '../ui/World/3Dcanvas/Gallery';
import VideoPlane from '../ui/World/3Dcanvas/VideoPlane';
import LoadingSpinner from '../ui/public/LoadingSpinner';
import GuestBook from '../ui/World/3Dcanvas/GuestBook';
import Tree from '../ui/World/3Dcanvas/Tree';
import ImageCollection from '../ui/World/3Dcanvas/ImageCollection';
import FloorFence from '../ui/World/3Dcanvas/FloorFence';
import VisitListWriteModal from '../ui/Three/ui/VisitListWriteModal';
import { OrbitControls } from '@react-three/drei';

const World = () => {
  //route
  const navigate = useNavigate();
  const roomName = useParams().id;
  const canvasRef = useRef();
  const containerRef = useRef();

  //state
  const [myPlayer, setMyPlayer] = useState({});
  const [isCollectionVisible, setIsColletionVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  //globalState
  const joinExit = useRecoilValue(JoinExitState);

  //spots
  const gameSpot = { x: 5, y: 0.005, z: 5 };
  const postSpot = { x: 10, y: 0.005, z: 5 };

  const aspectRatio = window.innerWidth / window.innerHeight;

  useEffect(() => {
    // return () => {
    //   containerRef.current.appendChild(.domElement);
    //   if (containerRef.current) {
    //     containerRef.current.removeChild(canvasRef.domElement);
    //   }
    // };
  }, []);
  useEffect(() => {
    if (
      Math.abs(gameSpot.x - myPlayer.x) < 1.5 &&
      Math.abs(gameSpot.z - myPlayer.z) < 1.5
    ) {
      setIsColletionVisible(true);
      navigate('/collectionspace');
    } else {
      setIsColletionVisible(false);
    }
  }, [gameSpot, myPlayer]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#000',
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          ref={canvasRef}
          gl={{ antialias: true }}
          shadows={{
            enabled: true,
            autoUpdate: true,
            type: THREE.PCFSoftShadowMap,
          }}
          camera={{
            fov: 45,
            aspect: aspectRatio,
            near: 0.1,
            far: 1000,
            position: [0, 2, 5],
          }}
          // orthographic
          // camera={{
          //   zoom: 50,
          //   position: [1, 5, 5],
          //   left: -1 * aspectRatio,
          //   right: 1 * aspectRatio,
          //   top: 1,
          //   bottom: -1,
          //   near: -1000,
          //   far: 1000,
          // }}
        >
          <EnvSky />
          <Light />
          <Spot spot={gameSpot} />
          <Spot spot={postSpot} />
          <House />
          {/* <ImageCollection /> */}
          {/* <Gallery /> */}
          <FloorFence />
          <Tree />
          <GuestBook />
          {/* <VideoPlane /> */}
          {/* <PostOfficeBox myPlayer={myPlayer} postSpot={postSpot} /> */}
          <Floor />
          <Player
            roomName={roomName}
            setMyPlayer={setMyPlayer}
            setIsLocked={setIsLocked}
            isLocked={isLocked}
          />
          <OrbitControls
            enableDamping
            minDistance={5}
            maxDistance={15}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 - 0.05}
          />
        </Canvas>
      </Suspense>
      {/* <VisitListWriteModal /> */}
      <CrossHair isLocked={isLocked} />
      <RoomHonorAlert />
    </div>
  );
};

const CrossHair = styled.div`
  ${({ isLocked }) => {
    return css`
      position: fixed;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 2px;
      background: #f00;
      border: 10px solid #fff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      visibility: ${isLocked
        ? 'visible'
        : 'hidden'}; // initial visibility is hidden
    `;
  }}
`;

export default World;

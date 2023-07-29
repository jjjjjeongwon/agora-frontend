import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
//components
import EnvSky from '../ui/World/3Dcanvas/EnvSky';
import EnvStars from '../ui/World/3Dcanvas/EnvStars';
import Floor from '../ui/World/3Dcanvas/Floor';
import Player from '../ui/World/3Dcanvas/Player';
import Light from '../ui/World/3Dcanvas/Light';
import Spot from '../ui/World/3Dcanvas/Spot';

// global state
import { useRecoilState, useRecoilValue } from 'recoil';
import { JoinExitState } from '../../state/UserAtom';

import RoomHonorAlert from '../layout/World/RoomHonorAlert';
import House from '../ui/World/3Dcanvas/House';
import Tree from '../ui/World/3Dcanvas/Tree';
import PostOfficeBox from '../ui/World/3Dcanvas/PostOfficeBox';
import CollectionSpace from './CollectionSpace';

const World = () => {
  //route
  const navigate = useNavigate();
  const roomName = useParams().id;

  //state
  const [myPlayer, setMyPlayer] = useState({});
  const [isCollectionVisible, setIsColletionVisible] = useState(false);

  //globalState
  const joinExit = useRecoilValue(JoinExitState);

  //spots
  const gameSpot = { x: 5, y: 0.005, z: 5 };
  const postSpot = { x: 10, y: 0.005, z: 5 };

  const aspectRatio = window.innerWidth / window.innerHeight;
  console.log('올라 갔나?', isCollectionVisible);

  useEffect(() => {
    if (
      Math.abs(gameSpot.x - myPlayer.x) < 1.5 &&
      Math.abs(gameSpot.z - myPlayer.z) < 1.5
    ) {
      setIsColletionVisible(true);
    } else {
      setIsColletionVisible(false);
    }
  }, [gameSpot, myPlayer]);

  return isCollectionVisible ? (
    <CollectionSpace />
  ) : (
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
          position: [0, 2, 4],
        }}
      >
        <EnvSky />
        <EnvStars />
        <Floor />
        <Light />
        <Spot spot={gameSpot} />
        <Spot spot={postSpot} />
        <Suspense fallback={null}>
          <Tree />
          <House />
          <PostOfficeBox myPlayer={myPlayer} postSpot={postSpot} />
          <Player
            roomName={roomName}
            myPlayer={myPlayer}
            setMyPlayer={setMyPlayer}
          />
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>
      <RoomHonorAlert />
    </div>
  );
};

export default World;

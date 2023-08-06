import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyboardControls, Preload } from '@react-three/drei';
import { Physics } from '@react-three/rapier';

//components
import EnvSky from '../ui/World/3Dcanvas/EnvSky';
import Floor from '../ui/World/3Dcanvas/Floor';
import Player from '../ui/CollectionSpace/Player';
import Light from '../ui/World/3Dcanvas/Light';
import Spot from '../ui/World/3Dcanvas/Spot';
// global state
import { useRecoilState, useRecoilValue } from 'recoil';
import { JoinExitState } from '../../state/UserAtom';

import RoomHonorAlert from '../layout/World/RoomHonorAlert';
import House from '../ui/World/3Dcanvas/House';
import PostOfficeBox from '../ui/World/3Dcanvas/PostOfficeBox';
import styled, { css } from 'styled-components';
import VideoPlane from '../ui/World/3Dcanvas/VideoPlane';
import LoadingSpinner from '../ui/public/LoadingSpinner';
import HouseName from '../ui/World/3Dcanvas/HouseName';
import Tree from '../ui/World/3Dcanvas/Tree';
import ImageCollection from '../ui/World/3Dcanvas/ImageCollection';
import FloorFence from '../ui/World/3Dcanvas/FloorFence';
import VisitListWriteModal from '../ui/Three/ui/VisitListWriteModal';

import Header from '../ui/public/Header';
import userAPI from '../../apis/userAPI';
import FriendsModal from '../ui/public/FriendsModal';
import Road from '../ui/World/3Dcanvas/Road';
import Lamp from '../ui/World/3Dcanvas/Lamp';
import Car from '../ui/World/3Dcanvas/Car';

import { CharacterController } from '../ui/World/3Dcanvas/CharacterController';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

const World = () => {
  //route
  const navigate = useNavigate();
  const roomName = useParams().id;
  const canvasRef = useRef();
  const containerRef = useRef();
  const glRef = useRef();
  //state
  const [myPlayer, setMyPlayer] = useState({});
  const [isCollectionVisible, setIsColletionVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [friend, setFriend] = useState(false);

  const playTransitionSound = () => {
    const audio = new Audio('/musics/doorsound.mp3');
    audio.play();
  };

  const fadeIn = {
    hidden: { opacity: 0 }, // 초기 상태
    visible: { opacity: 1 }, // 최종 상태
  };

  const [friendModalOpen, setFriendModalOpen] = useState(false);
  //globalState
  const joinExit = useRecoilValue(JoinExitState);

  //spots
  const mySpot = { x: -12, y: 0.005, z: -16 };
  const friendSpot1 = { x: -12, y: 0.005, z: 20 };
  const waveSpot = { x: 0, y: 0.005, z: -26 };

  const aspectRatio = window.innerWidth / window.innerHeight;

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ],
    []
  );

  // const userId = JSON.parse(sessionStorage.getItem('isLogin'))['IdState'];

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await userAPI.get(`/user/${userId}/content`);

  //     console.log('서버 응답:', response.data);

  //     // 성공적으로 게시물을 생성한 후에 추가적인 처리를 할 수 있습니다.
  //   } catch (error) {
  //     console.error('서버 오류:', error);
  //   }
  // };
  // console.log(friend);

  useEffect(() => {
    if (friend === true) {
      setFriendModalOpen(true);
    } else {
      setFriendModalOpen(false);
    }
  }, [friend]);
  useEffect(() => {
    if (
      Math.abs(mySpot.x - myPlayer.x) < 1 &&
      Math.abs(mySpot.z - myPlayer.z) < 1
    ) {
      // setIsColletionVisible(true);
      navigate('/collectionspace/1');
      playTransitionSound();
    } else if (
      Math.abs(friendSpot1.x - myPlayer.x) < 1 &&
      Math.abs(friendSpot1.z - myPlayer.z) < 1
    ) {
      // setIsColletionVisible(false);
      navigate('/collectionspace_three');
      playTransitionSound();
    } else if (
      Math.abs(waveSpot.x - myPlayer.x) < 1 &&
      Math.abs(waveSpot.z - myPlayer.z) < 1
    ) {
      // setIsColletionVisible(false);
      navigate('/collectionspace_two');
      playTransitionSound();
    }
  }, [myPlayer]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.5 }} // 이동 시간 설정
      variants={fadeIn} // 애니메이션 variant
    >
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: '#000',
        }}
      >
        <KeyboardControls map={map}>
          <Canvas
            ref={canvasRef}
            gl={{ antialias: true }}
            shadows={{
              enabled: true,
              autoUpdate: true,
              type: THREE.PCFSoftShadowMap,
            }}
            camera={{
              fov: 42,
              aspect: aspectRatio,
              near: 0.1,
              far: 1000,
              position: [0, 10, 25],
            }}
          >
            <Suspense fallback={null}>
              <Physics>
                <EnvSky />
                <Light />
                <Spot spot={mySpot} />
                <Spot spot={friendSpot1} />
                <Spot spot={waveSpot} />

                <Lamp />
                <Road />
                <House />
                <Car />
                {/* <FloorFence /> */}
                <Tree />
                <HouseName />
                <Floor />
                {/* <Player
              roomName={roomName}
              setMyPlayer={setMyPlayer}
              setIsLocked={setIsLocked}
              isLocked={isLocked}
            /> */}
                <CharacterController setMyPlayer={setMyPlayer} />
              </Physics>
            </Suspense>
            <Preload all />
          </Canvas>
        </KeyboardControls>
        <RoomHonorAlert />
        <Header setFriend={setFriend} />
        {friendModalOpen && (
          <FriendsModal
            setFriendModalOpen={setFriendModalOpen}
            setFriend={setFriend}
          />
        )}
      </div>
    </motion.div>
  );
};

export default World;

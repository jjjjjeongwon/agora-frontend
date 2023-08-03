import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
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
import GuestBook from '../ui/World/3Dcanvas/HouseName';
import Tree from '../ui/World/3Dcanvas/Tree';
import ImageCollection from '../ui/World/3Dcanvas/ImageCollection';
import FloorFence from '../ui/World/3Dcanvas/FloorFence';
import VisitListWriteModal from '../ui/Three/ui/VisitListWriteModal';
import { OrbitControls } from '@react-three/drei';
import Header from '../ui/public/Header';
import userAPI from '../../apis/userAPI';
import FriendsModal from '../ui/public/FriendsModal';
import Road from '../ui/World/3Dcanvas/Road';
import Lamp from '../ui/World/3Dcanvas/Lamp';
import Car from '../ui/World/3Dcanvas/Car';

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

  const [friendModalOpen, setFriendModalOpen] = useState(false);
  //globalState
  const joinExit = useRecoilValue(JoinExitState);

  //spots
  const mySpot = { x: -12, y: 0.005, z: -16 };
  const friendSpot1 = { x: -12, y: 0.005, z: 20 };
  const waveSpot = { x: 0, y: 0.005, z: -26 };

  const aspectRatio = window.innerWidth / window.innerHeight;

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
  console.log(friend);

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
    } else if (
      Math.abs(friendSpot1.x - myPlayer.x) < 1 &&
      Math.abs(friendSpot1.z - myPlayer.z) < 1
    ) {
      // setIsColletionVisible(false);
      navigate('/collectionspace_three');
    } else if (
      Math.abs(waveSpot.x - myPlayer.x) < 1 &&
      Math.abs(waveSpot.z - myPlayer.z) < 1
    ) {
      // setIsColletionVisible(false);
      navigate('/collectionspace_two');
    }
  }, [myPlayer]);

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
            position: [0, 1.7, 26],
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
          <Spot spot={mySpot} />
          <Spot spot={friendSpot1} />
          <Spot spot={waveSpot} />
          <Lamp />
          <Road />
          <House />
          <Car />
          <FloorFence />
          <Tree />
          <GuestBook />
          {/* <PostOfficeBox myPlayer={myPlayer} friendSpot1={friendSpot1} /> */}
          <Floor />
          <Player
            roomName={roomName}
            setMyPlayer={setMyPlayer}
            setIsLocked={setIsLocked}
            isLocked={isLocked}
          />
        </Canvas>
      </Suspense>
      <RoomHonorAlert />
      <Header setFriend={setFriend} />
      <CrossHair isLocked={isLocked} />
      {friendModalOpen && (
        <FriendsModal
          setFriendModalOpen={setFriendModalOpen}
          setFriend={setFriend}
        />
      )}
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

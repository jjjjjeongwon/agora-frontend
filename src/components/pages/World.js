import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyboardControls, Preload } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Swal from 'sweetalert2';

//components
import EnvSky from '../ui/World/3Dcanvas/EnvSky';
import Floor from '../ui/World/3Dcanvas/Floor';
import Light from '../ui/World/3Dcanvas/Light';
import Spot from '../ui/World/3Dcanvas/Spot';
import Tree from '../ui/World/3Dcanvas/Tree';
import Road from '../ui/World/3Dcanvas/Road';
import House from '../ui/World/3Dcanvas/House';
import Pond from '../ui/World/3Dcanvas/Pond';
import Beach from '../ui/World/3Dcanvas/Beach';
import Stuff from '../ui/World/3Dcanvas/Stuff';
import Milestone from '../ui/World/3Dcanvas/Milestone';
import Sparkle from '../ui/World/3Dcanvas/Sparkle';
import HouseName from '../ui/World/3Dcanvas/HouseName';
import EnvStars from '../ui/CollectionSpace/EnvStars';
import Lamp from '../ui/World/3Dcanvas/Lamp';
import { CharacterController } from '../ui/World/3Dcanvas/CharacterController';

// global state
import { useRecoilState, useRecoilValue } from 'recoil';
import { JoinExitState, IdRecoilState, IdState } from '../../state/UserAtom';

import RoomHonorAlert from '../layout/World/RoomHonorAlert';

import VisitListWriteModal from '../ui/Three/ui/VisitListWriteModal';

import Header from '../ui/public/Header';
import userAPI from '../../apis/userAPI';
import FriendsModal from '../ui/public/FriendsModal';

import LoadingSpinner from '../ui/public/LoadingSpinner';

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
  const [selectRoom, setSelectRoom] = useState();
  const [flag, setFlag] = useState(true);
  const [friendsInfo, setFriendsInfo] = useState();

  const playTransitionSound = (link) => {
    const audio = new Audio('/musics/doorsound.mp3');

    audio.play();
  };
  const randomMapSound = () => {
    const audio = new Audio('/musics/beachsound.mp3');

    audio.addEventListener('ended', () => {
      navigate('/collectionspace_two');
    });
    audio.play();
  };

  const fadeIn = {
    hidden: { opacity: 0 }, // 초기 상태
    visible: { opacity: 1 }, // 최종 상태
  };

  const [friendModalOpen, setFriendModalOpen] = useState(false);
  //globalState
  const joinExit = useRecoilValue(JoinExitState);
  const recoilLoginId = useRecoilValue(IdRecoilState);
  const loginId = useRecoilValue(IdState);

  //spots
  const mySpot = { x: -10, y: 0.005, z: -4 };
  const friendSpot1 = { x: -17, y: 0.005, z: 15 };
  const waveSpot = { x: 35, y: 0.005, z: 4.5 };

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

  const userId = recoilLoginId;

  const enterRandomMap = () => {
    console.log('MapMap');
    Swal.fire({
      title: '파도타기 맵에 입장하시겠습니까?',
      confirmButtonColor: '#0e72ed',
    }).then((result) => {
      if (result.isConfirmed) {
        randomMapSound();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (recoilLoginId !== 0) {
      try {
        const response = await userAPI.get(`/user/${recoilLoginId}/content`);

        console.log('서버 응답:', response.data);
        setSelectRoom(response.data.userHouseNum);
        setFriendsInfo(response.data.friendsInfoArray);

        // 성공적으로 게시물을 생성한 후에 추가적인 처리를 할 수 있습니다.
      } catch (error) {
        console.error('서버 오류:', error);
      }
    } else {
      try {
        const response = await userAPI.get(`/user/${loginId}/content`);

        console.log('서버 응답:', response.data);
        setSelectRoom(response.data.userHouseNum);
        setFriendsInfo(response.data.friendsInfoArray);

        // 성공적으로 게시물을 생성한 후에 추가적인 처리를 할 수 있습니다.
      } catch (error) {
        console.error('서버 오류:', error);
      }
    }
  };

  const getRandomUser = async (e) => {
    // e.preventDefault();

    try {
      const response = await userAPI.get('/user/surfing');

      console.log('서버 응답:', response.data);

      // 성공적으로 게시물을 생성한 후에 추가적인 처리를 할 수 있습니다.
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

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
      if (selectRoom === 1) {
        navigate(`/collectionspace/${userId}`);
        playTransitionSound();
      } else if (selectRoom === 2) {
        navigate(`/collectionspace_two/${userId}`);
        playTransitionSound();
      } else if (selectRoom === 3) {
        navigate(`/collectionspace_three/${userId}`);
        playTransitionSound();
      }
    } else if (
      Math.abs(friendSpot1.x - myPlayer.x) < 1 &&
      Math.abs(friendSpot1.z - myPlayer.z) < 1
    ) {
      navigate('/collectionspace_three');
      playTransitionSound();
    } else if (
      Math.abs(waveSpot.x - myPlayer.x) < 1 &&
      Math.abs(waveSpot.z - myPlayer.z) < 1 &&
      flag
    ) {
      enterRandomMap();
      setFlag(false);
      // if (selectRoom === 1) {
      //   navigate(`/collectionspace/${userId}`);
      //   playTransitionSound();
      // } else if (selectRoom === 2) {
      //   navigate(`/collectionspace_two/${userId}`);
      //   playTransitionSound();
      // } else if (selectRoom === 3) {
      //   navigate(`/collectionspace_three/${userId}`);
      //   playTransitionSound();
      // }
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
          <Suspense fallback={null}>
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
              <EnvSky />
              <EnvStars />
              <Light />
              <Spot spot={mySpot} />
              <Spot spot={friendSpot1} />
              <Spot spot={waveSpot} />
              <Sparkle />
              {/* <HouseName /> */}
              <Physics>
                <Beach />
                <Pond />
                <Road />
                <Milestone />
                <Stuff />
                <House />
                <Tree />
                <Lamp />
                <Floor />
                <CharacterController
                  setMyPlayer={setMyPlayer}
                  friendModalOpen={friendModalOpen}
                />
              </Physics>
              <Preload all />
            </Canvas>
            <RoomHonorAlert />
          </Suspense>
        </KeyboardControls>
        <Header setFriend={setFriend} />
        {friendModalOpen && (
          <FriendsModal
            setFriendModalOpen={setFriendModalOpen}
            setFriend={setFriend}
            friendsInfo={friendsInfo}
            setFriendsInfo={setFriendsInfo}
          />
        )}
      </div>
    </motion.div>
  );
};

export default World;

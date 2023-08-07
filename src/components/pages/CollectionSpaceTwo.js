import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useState, useEffect, useRef, Suspense } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import EnvSky from '../ui/CollectionSpace/EnvSky';
import EnvStars from '../ui/CollectionSpace/EnvStars';
import Floor from '../ui/CollectionSpaceTwo/Floor';
import Light from '../ui/CollectionSpaceTwo/Light';
import Wall from '../ui/CollectionSpaceTwo/Wall';
import Player from '../ui/CollectionSpace/Player';
import World from './World';
import Spot from '../ui/World/3Dcanvas/Spot';
import Door from '../ui/CollectionSpace/Door';
import Video from '../ui/CollectionSpaceTwo/Video';
import Tv from '../ui/CollectionSpaceTwo/Tv';
import ImageFrame from '../ui/CollectionSpaceTwo/ImageFrame';
import CollectImage from '../ui/CollectionSpaceTwo/CollectImage';
import VisitText from '../ui/CollectionSpaceTwo/VisitText';
import VisitCard from '../ui/CollectionSpace/VisitCard';
import Bed from '../ui/CollectionSpaceTwo/Bed';
import Table from '../ui/CollectionSpaceTwo/Table';
import LoadingSpinner from '../ui/public/LoadingSpinner';
import Camera from '../ui/CollectionSpaceTwo/Camera';
import TvTable from '../ui/CollectionSpaceTwo/TvTable';
import UploadVideoModal from '../ui/public/UploadVideoModal';
import UploadImagePostModal from '../ui/public/UploadImagePostModal';
import ViewImagePostModal from '../ui/public/ViewImagePostModal';
import Remote from '../ui/CollectionSpaceTwo/Remote';
import Lug from '../ui/CollectionSpaceTwo/Lug';
import Pencil from '../ui/CollectionSpaceTwo/Pencil';
import Window from '../ui/CollectionSpaceTwo/Window';
import Plant from '../ui/CollectionSpaceTwo/Plant';
import PhotoBook from '../ui/CollectionSpaceTwo/PhotoBook';
import BedsideTable from '../ui/CollectionSpaceTwo/BedsideTable';
import MusicBox from '../ui/CollectionSpaceTwo/MusicBox';
import ImageEffect from './ImageEffect';
import PhotoBoxHeader from '../ui/public/PhotoBoxHeader';
import ExitFooter from '../ui/public/ExitFooter';

const CollectionSpaceTwo = () => {
  const aspect = window.innerWidth / window.innerHeight;
  const doorSpot = { x: 2.1, y: 0.1, z: -6 };
  const roomName = useParams().id;
  const navigate = useNavigate();

  const [isCollectionVisible, setIsColletionVisible] = useState(false);

  const [myPlayer, setMyPlayer] = useState({});
  const [isLocked, setIsLocked] = useState(false);
  const [album, setAlbum] = useState(false);
  const [camera, setCamera] = useState(false);
  const [pencil, setPencil] = useState(false);
  const [visitMemo, setVisitMemo] = useState(false);
  const [videoRemote, setVideoRemote] = useState(false);

  const [albumModalOpen, setAlbumModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [uploadImageModalOpen, setUploadImageModalOpen] = useState(false);

  const [showImageEffect, setShowImageEffect] = useState(false);

  const playTransitionSound = () => {
    const audio = new Audio('/musics/doorsound.mp3');
    audio.play();
  };

  const fadeIn = {
    hidden: { opacity: 0 }, // 초기 상태
    visible: { opacity: 1 }, // 최종 상태
  };

  useEffect(() => {
    if (album === true) {
      setAlbumModalOpen(true);
    } else {
      setAlbumModalOpen(false);
    }
  }, [album]);

  useEffect(() => {
    if (camera === true) {
      setUploadImageModalOpen(true);
    } else {
      setUploadImageModalOpen(false);
    }
  }, [camera]);

  useEffect(() => {
    if (videoRemote === true) {
      setVideoModalOpen(true);
    } else {
      setVideoModalOpen(false);
    }
  }, [videoRemote]);

  useEffect(() => {
    if (
      Math.abs(doorSpot.x - myPlayer.x) < 1 &&
      Math.abs(doorSpot.z - myPlayer.z) < 1
    ) {
      setIsColletionVisible(true);
      navigate('/world');
      playTransitionSound();
    } else {
      setIsColletionVisible(false);
    }
  }, [doorSpot]);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 3, delay: 1 }} // 이동 시간 설정
      variants={fadeIn} // 애니메이션 variant
    >
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: '#000',
        }}
      >
        <Suspense fallback={null}>
          {showImageEffect ? (
            <ImageEffect />
          ) : (
            <Canvas
              gl={{ antialias: true }}
              shadows={{
                enabled: true,
                autoUpdate: true,
                type: THREE.PCFSoftShadowMap,
              }}
              camera={{
                fov: 45,
                aspect: aspect,
                near: 0.1,
                far: 100,
                position: [2, 2.6, -4],
                zoom: 0.5,
              }}
              // orthographic
              // camera={{
              //   zoom: 50,
              //   position: [1, 10, 5],
              //   left: -1 * aspect,
              //   right: 1 * aspect,
              //   top: 1,
              //   bottom: -1,
              //   near: 0.1,
              //   far: 1000,
              // }}
            >
              <EnvSky />
              <EnvStars />
              <Light />
              <Lug />
              <Floor />
              <Tv />
              <Remote />
              <TvTable />
              <CollectImage />
              <ImageFrame />
              <VisitText />
              {/* <VisitCard /> */}
              <Camera />
              <Pencil />
              <Table />
              <Bed />
              <Door />
              <Video />
              <Wall />
              <Window />
              <Plant />
              <PhotoBook />
              <BedsideTable />
              <MusicBox />
              <Spot spot={doorSpot} />
              <Player
                roomName={roomName}
                setMyPlayer={setMyPlayer}
                setIsLocked={setIsLocked}
                isLocked={isLocked}
                setAlbum={setAlbum}
                setCamera={setCamera}
                setPencil={setPencil}
                setVisitMemo={setVisitMemo}
                setVideoRemote={setVideoRemote}
                setShowImageEffect={setShowImageEffect}
              />
            </Canvas>
          )}
        </Suspense>
        {/* <WriteVisitMemoModal /> */}

        {showImageEffect ? <PhotoBoxHeader /> : ''}
        {showImageEffect ? <ExitFooter /> : ''}
        <CrossHair isLocked={isLocked} />
      </div>
    </motion.div>
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

export default CollectionSpaceTwo;

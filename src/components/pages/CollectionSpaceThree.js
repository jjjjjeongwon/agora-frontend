import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useState, useEffect, useRef, Suspense } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

// Components
import EnvSky from '../ui/CollectionSpace/EnvSky';
import EnvStars from '../ui/CollectionSpace/EnvStars';
import Floor from '../ui/CollectionSpaceThree/Floor';
import Light from '../ui/CollectionSpaceThree/Light';
import Wall from '../ui/CollectionSpaceThree/Wall';
import Player from '../ui/CollectionSpace/Player';
import Spot from '../ui/World/3Dcanvas/Spot';
import Door from '../ui/CollectionSpace/Door';
import Video from '../ui/CollectionSpaceThree/Video';
import Tv from '../ui/CollectionSpaceTwo/Tv';
import ImageFrame from '../ui/CollectionSpaceThree/ImageFrame';
import CollectImage from '../ui/CollectionSpaceThree/CollectImage';
import VisitText from '../ui/CollectionSpaceThree/VisitText';
import VisitCard from '../ui/CollectionSpaceThree/VisitCard';
import Bed from '../ui/CollectionSpaceThree/Bed';
import Table from '../ui/CollectionSpaceThree/Table';
import Camera from '../ui/CollectionSpaceThree/Camera';
import TvTable from '../ui/CollectionSpaceThree/TvTable';
import Remote from '../ui/CollectionSpaceThree/Remote';
import Rabbit from '../ui/CollectionSpaceThree/Rabbit';
import Lug from '../ui/CollectionSpaceTwo/Lug';
import Pencil from '../ui/CollectionSpaceThree/Pencil';
import Window from '../ui/CollectionSpaceThree/Window';
import Closet from '../ui/CollectionSpaceThree/Closet';
import Mirror from '../ui/CollectionSpaceThree/Mirror';
import Piano from '../ui/CollectionSpaceThree/Piano';
import CafeTable from '../ui/CollectionSpaceThree/CafeTable';
import WriteVisitMemoModal from '../ui/public/WriteVisitMemoModal';
import Flower from '../ui/CollectionSpaceThree/Flower';

const CollectionSpaceThree = () => {
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

  const [pencilModalOpen, setPencilModalOpen] = useState(false);

  useEffect(() => {
    if (pencil === true) {
      setPencilModalOpen(true);
    } else {
      setPencilModalOpen(false);
    }
  }, [pencil]);

  useEffect(() => {
    if (
      Math.abs(doorSpot.x - myPlayer.x) < 1.5 &&
      Math.abs(doorSpot.z - myPlayer.z) < 1.5
    ) {
      setIsColletionVisible(true);
      navigate('/world');
    } else {
      setIsColletionVisible(false);
    }
  }, [doorSpot]);
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#000',
      }}
    >
      <Suspense fallback={null}>
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
            position: [2, 2, -4],
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
          <Rabbit />
          <EnvSky />
          <EnvStars />
          <Light />
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
          <Closet />
          <Piano />
          <CafeTable />
          <Flower />
          {/* <Mirror /> */}
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
          />
        </Canvas>
      </Suspense>
      {/* <UploadVideoModal /> */}
      {/* <UploadImagePostModal /> */}
      {/* <ViewImagePostModal /> */}
      <Container pencilModalOpen={pencilModalOpen}>
        {pencilModalOpen && (
          <WriteVisitMemoModal
            setPencilModalOpen={setPencilModalOpen}
            setPencil={setPencil}
          />
        )}
      </Container>

      <CrossHair isLocked={isLocked} />
    </div>
  );
};

const Container = styled.div`
  ${({ pencilModalOpen }) => {
    return css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: ${pencilModalOpen ? 1 : -1};
      background: ${pencilModalOpen ? 'rgba(0, 0, 0, 0.4)' : 'transparent'};
    `;
  }}
`;

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

export default CollectionSpaceThree;

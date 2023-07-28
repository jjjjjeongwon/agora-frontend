import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';

// Components
import EnvSky from '../ui/CollectionSpace/EnvSky';
import EnvStars from '../ui/CollectionSpace/EnvStars';
import Floor from '../ui/CollectionSpace/Floor';
import Light from '../ui/CollectionSpace/Light';
import Player from '../ui/CollectionSpace/Player';

const CollectionSpace = () => {
  const aspect = window.innerWidth / window.innerHeight;

  useEffect(() => {});
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
          aspect: aspect,
          near: 0.1,
          far: 100,
          position: [0, 3, 7],
          zoom: 0.5,
        }}
      >
        <EnvSky />
        <EnvStars />
        <Light />
        <Floor />
        <Player />
      </Canvas>
    </div>
  );
};

export default CollectionSpace;

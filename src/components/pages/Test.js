import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useState, useEffect, useRef, Suspense } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Components
import EnvSky from '../ui/CollectionSpace/EnvSky';
import EnvStars from '../ui/CollectionSpace/EnvStars';
import Floor from '../ui/CollectionSpace/Floor';
import Light from '../ui/CollectionSpace/Light';
import Player from '../ui/CollectionSpace/Player';
import Wall from '../ui/CollectionSpace/Wall';
import ImageFrame from '../ui/CollectionSpace/ImageFrame';

useGLTF.preload('../models/gallery.glb');

const Test = () => {
  const aspect = window.innerWidth / window.innerHeight;
  const glb = useGLTF('../models/gallery.glb');
  const mesh = glb.scene.children[0];

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
          far: 1000,
          position: [0, 1.7, 2],
          zoom: 0.5,
        }}
      >
        <EnvSky />
        <EnvStars />
        <Light />
        <primitive object={mesh} dispose={null} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Test;

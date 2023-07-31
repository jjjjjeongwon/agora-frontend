import { useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react';
import * as THREE from 'three';

const FloorFence = ({ myPlayer, postSpot }) => {
  const glb = useGLTF('../models/worldFloor_ver5.glb');
  const floorFence = glb.scene.children[0];
  useEffect(() => {
    if (!floorFence) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
      }
    });

    // floorFence.position.set(18, 2, 16);
    floorFence.position.set(0, 0, 0);
  });

  return <primitive object={floorFence} dispose={null} />;
};

export default FloorFence;

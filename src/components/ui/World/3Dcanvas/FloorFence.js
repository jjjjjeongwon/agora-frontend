import { useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react';
import * as THREE from 'three';

const FloorFence = ({ myPlayer, postSpot }) => {
  const glb = useGLTF('../models/worldFloor.glb');
  const floorFence = glb.scene.children[0];
  useEffect(() => {
    if (!floorFence) return;

    floorFence.position.set(-0.5, -0.1, -1.2);
  });

  return <primitive object={floorFence} dispose={null} />;
};

export default FloorFence;

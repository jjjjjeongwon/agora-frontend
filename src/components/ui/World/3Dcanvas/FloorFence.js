import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useEffect } from 'react';
import * as THREE from 'three';

useGLTF.preload('../models/worldFloor.glb');
const FloorFence = () => {
  const glb = useGLTF('../models/worldFloor.glb');
  const floorFence = glb.scene.children[0];
  useEffect(() => {
    if (!floorFence) return;

    floorFence.position.set(-0.5, -0.1, -1.2);
  });

  return (
    <RigidBody type="fixed">
      <primitive object={floorFence} dispose={null} />
    </RigidBody>
  );
};

export default FloorFence;

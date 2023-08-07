import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const Beach = () => {
  const glb = useGLTF('../models/beach/beach.glb');
  const beach = glb.scene.children[0];

  useEffect(() => {
    if (!beach) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
  });
  return (
    <>
      <RigidBody type="fixed">
        <primitive position={[24, -1.2, 3]} object={beach} dispose={null} />
      </RigidBody>
    </>
  );
};

export default Beach;

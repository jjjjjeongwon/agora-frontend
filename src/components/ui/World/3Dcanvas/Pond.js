import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

useGLTF.preload('../models/pond/Fairy_Pond.glb');
const Pond = () => {
  const glb = useGLTF('../models/pond/Fairy_Pond.glb');
  const pond = glb.scene.children[0];

  useEffect(() => {
    if (!pond) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
  });
  return (
    <>
      <RigidBody type="fixed">
        <primitive position={[-2, 0, -2]} object={pond} dispose={null} />
      </RigidBody>
    </>
  );
};

export default Pond;

import { useGLTF } from '@react-three/drei';
import React from 'react';

const CampFire = () => {
  const glb = useGLTF('../models/army_campfire_01.glb');
  const campFire = glb.scene.children[0];
  campFire?.position.set(10, 0, -7);
  return <primitive object={campFire} dispose={null} />;
};
export default CampFire;

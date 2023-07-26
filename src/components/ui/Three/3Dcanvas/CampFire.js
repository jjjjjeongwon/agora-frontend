import { useGLTF } from '@react-three/drei';
import React from 'react';

const CampFire = () => {
  const glb = useGLTF('../models/army_campfire_01.glb');
  const campFire = glb.scene.children[0];
  campFire?.position.set(7, 0, -7);
  campFire && (campFire.scale.x = 2.5);
  campFire && (campFire.scale.y = 2.5);
  campFire && (campFire.scale.z = 2.5);

  return <primitive object={campFire} dispose={null} />;
};
export default CampFire;

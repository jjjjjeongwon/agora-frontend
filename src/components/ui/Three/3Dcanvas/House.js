import { useGLTF } from '@react-three/drei';
import React from 'react';

const House = () => {
  const glb = useGLTF('../models/house.glb');
  const house = glb.scene.children[0];
  house?.position.set(5, 1, 2);
  return <primitive object={house} dispose={null} />;
};

export default House;

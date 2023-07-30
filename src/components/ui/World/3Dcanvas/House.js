import { useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react';

const House = () => {
  const glb = useGLTF('../models/house.glb');
  const house = glb.scene.children[0];
  useEffect(() => {
    if (!house) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    house.position.set(5, 2, 2);
    house.scale.x = 2;
    house.scale.y = 2;
    house.scale.z = 2;
  }, []);

  return <primitive name={'house'} castShadow object={house} dispose={null} />;
};

export default House;

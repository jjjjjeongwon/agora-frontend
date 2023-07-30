import { useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react';

const Grass = () => {
  const glb = useGLTF('../models/grass.glb');
  const house = glb.scene.children[0];
  useEffect(() => {
    if (!house) return;
    console.log(glb.scene);
    glb.scene.traverse((child) => {
      if (child.ismesh) {
        child.castShadow = true;
      }
      house.scale.x = 50;
      house.scale.y = 50;
      house.scale.z = 50;
      house.position.y = -1;
    });
  }, []);

  return <primitive object={house} dispose={null} />;
};

export default Grass;

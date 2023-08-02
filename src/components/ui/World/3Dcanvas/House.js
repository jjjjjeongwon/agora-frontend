import { useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react';

const House = () => {
  const glb = useGLTF('../models/house/orange_building1.glb');
  const house = glb.scene.children[0];
  const { scene } = useGLTF('../models/house/small_house.gltf');

  useEffect(() => {
    if (!house) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    house.position.set(5, 0.5, 2);
    house.scale.set(0.8, 0.8, 0.8);
  }, []);

  return (
    <>
      <primitive
        castShadow
        receiveShadow
        position={[-15, 0, -18]}
        scale={[4, 4, 4]}
        rotation={[0, Math.PI / 2, 0]}
        object={scene}
        dispose={null}
      />
      <primitive name={'house'} castShadow object={house} dispose={null} />
    </>
  );
};

export default House;

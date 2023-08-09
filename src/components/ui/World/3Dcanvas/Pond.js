import { useGLTF, useAnimations } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useEffect } from 'react';

useGLTF.preload('../models/pond/cartoon_pond.glb');

const Pond = () => {
  const glb = useGLTF('../models/pond/cartoon_pond.glb');
  const pond = glb.scene.children[0];
  const glbs = [];
  glbs.push(glb);
  useEffect(() => {
    if (!pond) return;

    glbs.map((glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    });
  }, []);
  return (
    <RigidBody type="fixed">
      <>
        <primitive
          position={[-4, -0.2, 11]}
          scale={[0.2, 0.2, 0.2]}
          castShadow
          receiveShadow
          rotation={[-Math.PI / 2, 0, Math.PI / 12]}
          object={pond.clone()}
          dispose={null}
        />
      </>
    </RigidBody>
  );
};

export default Pond;

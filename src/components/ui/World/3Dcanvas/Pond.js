import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useEffect } from 'react';
useGLTF.preload('../models/pond/cartoon_pond.glb');

const Road = () => {
  const glb = useGLTF('../models/pond/cartoon_pond.glb');
  const road = glb.scene.children[0];
  const glbs = [];
  glbs.push(glb);
  useEffect(() => {
    if (!road) return;

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
          object={road.clone()}
          dispose={null}
        />
      </>
    </RigidBody>
  );
};

export default Road;

import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useEffect } from 'react';
useGLTF.preload('../models/beach/beach.glb');

const Beach = () => {
  const glb = useGLTF('../models/beach/beach.glb');
  const beach = glb.scene.children[0];
  const glbs = [];
  glbs.push(glb);
  useEffect(() => {
    if (!beach) return;

    glbs.map((glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) child.receiveShadow = true;
      });
    });
  }, []);
  return (
    <RigidBody type="fixed">
      <>
        <primitive
          position={[35, 0, 5]}
          scale={[0.3, 0.3, 0.3]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          object={beach.clone()}
          dispose={null}
        />
      </>
    </RigidBody>
  );
};

export default Beach;

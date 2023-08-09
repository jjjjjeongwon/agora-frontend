import { useGLTF } from '@react-three/drei';
import { CylinderCollider, RigidBody } from '@react-three/rapier';
import React, { useRef, useEffect } from 'react';
import { waitForAllSettled } from 'recoil';
import { radToDeg } from 'three/src/math/MathUtils';
useGLTF.preload('../models/stuff/Milestone.glb');

const Milestone = () => {
  const glb = useGLTF('../models/stuff/Milestone.glb');
  const mileStone = glb.scene.children[0];
  const glbs = [];
  glbs.push(glb);
  useEffect(() => {
    if (!mileStone) return;

    glbs.map((glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) child.castShadow = true;
      });
    });
  }, []);
  return (
    <RigidBody type="fixed">
      <>
        <primitive
          castShadow
          position={[-2, -0.5, 22.5]}
          object={mileStone.clone()}
          dispose={null}
        />
        <primitive
          castShadow
          position={[12, -0.5, 6]}
          object={mileStone.clone()}
          dispose={null}
        />
      </>
    </RigidBody>
  );
};

export default Milestone;

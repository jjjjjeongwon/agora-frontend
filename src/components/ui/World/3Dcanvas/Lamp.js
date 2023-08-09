import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useEffect, useState, useRef } from 'react';

useGLTF.preload('../models/road/street_lamp.gltf');
const Lamp = ({ myPlayer, postSpot }) => {
  const glb = useGLTF('../models/road/street_lamp.gltf');
  const lamp = glb.scene.children[0];
  const group = useRef();
  useEffect(() => {
    if (!Lamp) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  });

  return (
    <RigidBody type="fixed">
      <group ref={group}>
        <primitive
          position={[-8.5, -0.5, 15.5]}
          castShadow
          receivShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[-12.4, -0.5, 13]}
          castShadow
          receivShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[9.4, -0.5, 2.75]}
          castShadow
          receivShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[12.6, -0.5, 2]}
          castShadow
          receivShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[26.6, -0.5, 1.6]}
          castShadow
          receivShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[26.6, -0.5, 5.5]}
          castShadow
          receivShadow
          object={lamp.clone()}
          dispose={null}
        />
      </group>
    </RigidBody>
  );
};

export default Lamp;

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
      }
    });
  });

  return (
    <RigidBody type="fixed">
      <group ref={group}>
        <primitive
          position={[-3, 0, 21]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[3, 0, 21]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[-3, 0, 15]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[3, 0, 15]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[-3, 0, 1]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[3, 0, 1]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[-3, 0, -5]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[3, 0, -5]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[-3, 0, -15]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[3, 0, -15]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[-3, 0, -21]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
        <primitive
          position={[3, 0, -21]}
          castShadow
          object={lamp.clone()}
          dispose={null}
        />
      </group>
    </RigidBody>
  );
};

export default Lamp;

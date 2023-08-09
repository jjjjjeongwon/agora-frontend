import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef } from 'react';

useGLTF.preload('../models/house/Store_House.glb');
useGLTF.preload('../models/house/Red_Small_House.glb');
useGLTF.preload('../models/house/Mushroom_House.glb');
useGLTF.preload('../models/house/Bridge_House.glb');
const House = () => {
  const glb = useGLTF('../models/house/Store_House.glb');
  const glb2 = useGLTF('../models/house/Red_Small_House.glb');
  const glb3 = useGLTF('../models/house/Mushroom_House.glb');
  const glb4 = useGLTF('../models/house/Bridge_House.glb');

  const store = glb.scene.children[0];
  const redSmall = glb2.scene.children[0];
  const mushroom = glb3.scene.children[0];
  const bridge = glb4.scene.children[0];
  const group = useRef();

  const glbs = [glb, glb2, glb3];
  useEffect(() => {
    if (!store || !redSmall || !mushroom || !bridge) return;

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
      <group ref={group}>
        <primitive
          castShadow
          receiveShadow
          position={[-13, 0, -7]}
          rotation={[0, -Math.PI * 0.25, 0]}
          object={store.clone()}
          dispose={null}
        />
        <primitive
          castShadow
          receiveShadow
          position={[-20, 0, 15]}
          object={redSmall.clone()}
          dispose={null}
        />
        <primitive
          castShadow
          receiveShadow
          position={[3, -1.2, -12]}
          scale={[0.5, 0.5, 0.5]}
          object={bridge.clone()}
          dispose={null}
        />
        <primitive
          castShadow
          receiveShadow
          position={[12, 0, -5]}
          rotation={[0, Math.PI * 1.25, 0]}
          object={store.clone()}
          dispose={null}
        />
        <primitive
          castShadow
          receiveShadow
          position={[-5.5, 0, -10]}
          rotation={[0, -Math.PI * 0.35, 0]}
          object={redSmall.clone()}
          dispose={null}
        />
        <primitive
          castShadow
          receiveShadow
          position={[-13, -0.5, 4]}
          rotation={[0, -Math.PI * 0.15, 0]}
          object={mushroom.clone()}
          dispose={null}
        />
      </group>
    </RigidBody>
  );
};

export default House;

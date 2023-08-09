import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useEffect } from 'react';
import { radToDeg } from 'three/src/math/MathUtils';
useGLTF.preload('../models/stuff/Box_stuff.glb');
useGLTF.preload('../models/stuff/Big_Wood_stuff.glb');

const Stuff = () => {
  const glb = useGLTF('../models/stuff/Box_stuff.glb');
  const glb1 = useGLTF('../models/stuff/Big_Wood_stuff.glb');
  const boxStuff = glb.scene.children[0];
  const woodStuff = glb1.scene.children[0];
  const glbs = [];
  glbs.push(glb);
  glbs.push(glb1);
  useEffect(() => {
    if (!boxStuff) return;

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
          position={[-2.5, -0.3, 21]}
          castShadow
          rotation={[0, -Math.PI / 2, 0]}
          object={boxStuff.clone()}
          dispose={null}
        />
        <primitive
          position={[-16, -0.5, 20]}
          castShadow
          object={woodStuff.clone()}
          dispose={null}
        />
      </>
    </RigidBody>
  );
};

export default Stuff;

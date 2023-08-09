import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useEffect } from 'react';
import { radToDeg } from 'three/src/math/MathUtils';
useGLTF.preload('../models/stuff/Box_stuff.glb');
useGLTF.preload('../models/stuff/Big_Wood_stuff.glb');
useGLTF.preload('../models/stuff/White_Bench.glb');
useGLTF.preload('../models/stuff/Human_Car.glb');

const Stuff = () => {
  const glb = useGLTF('../models/stuff/Box_stuff.glb');
  const glb1 = useGLTF('../models/stuff/Big_Wood_stuff.glb');
  const glb2 = useGLTF('../models/stuff/White_Bench.glb');
  const glb3 = useGLTF('../models/stuff/Human_Car.glb');

  const boxStuff = glb.scene.children[0];
  const woodStuff = glb1.scene.children[0];
  const bench = glb2.scene.children[0];
  const car = glb3.scene.children[0];

  const glbs = [];
  glbs.push(glb);
  glbs.push(glb1);
  glbs.push(glb2);
  glbs.push(glb3);
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
        <primitive
          position={[-19.5, -0.5, 20]}
          castShadow
          rotation={[0, Math.PI, 0]}
          object={car.clone()}
          dispose={null}
        />
        <primitive
          position={[-16, -0.5, 20]}
          castShadow
          object={woodStuff.clone()}
          dispose={null}
        />
        <primitive
          position={[-8, -0.3, -8]}
          castShadow
          rotation={[0, -Math.PI / 4, 0]}
          object={boxStuff.clone()}
          dispose={null}
        />
        <primitive
          position={[-6, -0.5, 5]}
          castShadow
          scale={[0.1, 0.1, 0.1]}
          rotation={[0, Math.PI / 8, 0]}
          object={bench.clone()}
          dispose={null}
        />
        <primitive
          position={[-0.2, -0.5, 6.5]}
          castShadow
          scale={[0.1, 0.1, 0.1]}
          rotation={[0, -Math.PI / 6, 0]}
          object={bench.clone()}
          dispose={null}
        />
        <primitive
          position={[-3.7, -0.5, 17.5]}
          castShadow
          scale={[0.1, 0.1, 0.1]}
          rotation={[0, -Math.PI, 0]}
          object={bench.clone()}
          dispose={null}
        />
        <primitive
          position={[19.7, -0.5, 0.3]}
          castShadow
          scale={[0.1, 0.1, 0.1]}
          object={bench.clone()}
          dispose={null}
        />
      </>
    </RigidBody>
  );
};

export default Stuff;

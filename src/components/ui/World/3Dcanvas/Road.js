import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useEffect } from 'react';
import { radToDeg } from 'three/src/math/MathUtils';
useGLTF.preload('../models/road/Stone_Road.glb');
const Road = () => {
  const glb = useGLTF('../models/road/Stone_Road.glb');
  const road = glb.scene.children[0];
  const glbs = [];
  glbs.push(glb);
  useEffect(() => {
    if (!road) return;

    glbs.map((glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) child.receiveShadow = true;
      });
    });
  }, []);
  return (
    <RigidBody type="fixed">
      <>
        {/* 왼쪽 길 */}
        <primitive
          position={[0, -0.25, 28]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, Math.PI / 12]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-1.5, -0.25, 25.3]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, Math.PI / 8]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-3.5, -0.25, 22.8]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, Math.PI / 6]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-5.5, -0.25, 20.5]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, Math.PI / 6]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-8, -0.25, 18.3]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, Math.PI / 3.5]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-10.3, -0.25, 16.5]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, Math.PI / 3]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-13, -0.25, 15]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, Math.PI / 3]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-16, -0.25, 14.2]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2.2]}
          object={road.clone()}
          dispose={null}
        />
      </>
      <>
        {/* 오른쪽 길 */}
        <primitive
          position={[-0.9, -0.25, 22.5]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.1]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[0, -0.25, 19.5]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.15]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[1, -0.25, 16.5]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.18]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[2.3, -0.25, 13.8]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.18]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[3.7, -0.25, 10.9]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.22]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[5.7, -0.25, 8.4]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.3]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[7.8, -0.25, 6.3]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.3]}
          object={road.clone()}
          dispose={null}
        />
      </>
    </RigidBody>
  );
};

export default Road;

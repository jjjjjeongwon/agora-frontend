import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useEffect } from 'react';
import { DoubleSide, MeshBasicMaterial } from 'three';
import { radToDeg } from 'three/src/math/MathUtils';
useGLTF.preload('../models/road/Stone_Road.glb');
useGLTF.preload('../models/road/Wood_Bridge.glb');

const Road = () => {
  const glb = useGLTF('../models/road/Stone_Road.glb');
  const glb1 = useGLTF('../models/road/Wood_Bridge.glb');
  const road = glb.scene.children[0];
  const bridge = glb1.scene.children[0];
  const glbs = [];
  glbs.push(glb);
  glbs.push(glb1);
  useEffect(() => {
    if (!road) return;

    glbs.map((glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });
    });
  }, []);
  return (
    <>
      <RigidBody type="fixed">
        {/* 왼쪽 길 */}
        <>
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
          {/* 왼쪽-오른쪽 길 */}
          <primitive
            position={[-10.3, -0.25, 13.8]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 16]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[-10.3, -0.25, 10.6]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 15]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[-10.3, -0.25, 7.5]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 12]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[-9.8, -0.25, 4.5]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 10]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[-9.3, -0.25, 1.5]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 7]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[-8.3, -0.25, -1.5]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 7]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[-7, -0.25, -4]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[-4.5, -0.25, -6.2]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            object={road.clone()}
            dispose={null}
          />
        </>
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
        <primitive
          position={[10, -0.25, 4.3]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.35]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[13, -0.25, 3.2]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.5]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[16, -0.25, 3]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.5]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[19, -0.25, 3]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.55]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[22, -0.25, 3.1]}
          scale={[3, 3, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI * 1.6]}
          object={road.clone()}
          dispose={null}
        />
        <>
          {/* 오른쪽-왼쪽 길 */}
          <primitive
            position={[10.5, -0.25, 1]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, Math.PI / 6]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[8.5, -0.25, -1.5]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, Math.PI / 6]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[6.5, -0.25, -4]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, Math.PI / 6]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[4.3, -0.25, -6.3]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, Math.PI / 4.5]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[1.3, -0.25, -7.3]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            object={road.clone()}
            dispose={null}
          />
          <primitive
            position={[-1.5, -0.25, -7]}
            scale={[3, 3, 3]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            object={road.clone()}
            dispose={null}
          />
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[32, -0.2, 4]}>
            <planeGeometry args={[6, 2]} />
            <meshBasicMaterial
              color={'white'}
              side={DoubleSide}
              transparent
              opacity={0}
            />
          </mesh>
        </>
      </RigidBody>
      <primitive
        position={[31.5, -0.3, 4]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.5, 0.5, 0.5]}
        object={bridge.clone()}
        dispose={null}
      />
    </>
  );
};

export default Road;

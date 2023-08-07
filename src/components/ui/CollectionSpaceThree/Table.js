import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, PlaneGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';
const Table = () => {
  const glb = useGLTF('../models/table/dressing_table.glb');
  const table = glb.scene.children[0];
  useEffect(() => {
    if (!table) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    // table.position.y = 0;
    table.position.set(-4.6, 1.2, -4.9);

    table.scale.x = 0.02;
    table.scale.y = 0.02;
    table.scale.z = 0.0255;
  }, []);

  return (
    <>
      {/* <mesh name="chair" position={[-4.5, 1, -5]}>
        <boxGeometry args={[2, 0.3, 2.5]} />
        <meshStandardMaterial color={'white'} transparent opacity={0} />
      </mesh>
      <mesh
        castShadow
        name="desk"
        position={[-4, 2, 5]}
        rotation={[Math.PI / 2, 0, Math.PI]}
      >
        <planeGeometry args={[3, 1]} />
        <meshStandardMaterial
          color={'white'}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh> */}
      <primitive
        castShadow
        receiveShadow
        object={table.clone()}
        dispose={null}
      />
    </>
  );
};

export default Table;

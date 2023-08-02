import { useGLTF, Float } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import * as THREE from 'three';

const Pencil = () => {
  const glb = useGLTF('../models/pencil/cartoon_notebook__pencil.glb');
  const pencil = glb.scene.children[0];
  const { scene } = useThree();

  const pointGeometry = new THREE.CylinderGeometry(0.12, 0, 0.28, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: 'red' });

  useEffect(() => {
    if (!pencil) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    pencil.position.set(-4.2, 1.25, -5);
    pencil.scale.x = 0.004;
    pencil.scale.y = 0.004;
    pencil.scale.z = 0.004;
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: 'white',
        side: THREE.DoubleSide,
      })
    );
    mesh.name = 'pencil';

    mesh.position.x = pencil.position.x;
    mesh.position.y = pencil.position.y;
    mesh.position.z = pencil.position.z;
    scene.add(mesh);
  });
  return (
    <>
      <Float
        speed={10}
        rotationIntensity={0.1}
        floatIntensity={0.01}
        floatingRange={[0, 0.1]}
      >
        <mesh
          position={[-4.2, 1.7, -5]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive object={pencil} dispose={null} />
    </>
  );
};

export default Pencil;

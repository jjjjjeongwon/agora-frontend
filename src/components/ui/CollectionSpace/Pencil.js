import { useGLTF, Float } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { CylinderGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Pencil = ({ userId, params }) => {
  const glb = useGLTF('../models/pencil/cup_with_pencils.glb');
  const pencil = glb.scene.children[0];
  const { scene, camera } = useThree();
  const pointGeometry = new THREE.CylinderGeometry(0.14, 0, 0.3, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: 'red' });

  const coneRef = useRef();

  useEffect(() => {
    if (!pencil) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    pencil.position.set(-3.3, 1.855, -4.4);

    const mesh = new THREE.Mesh(
      new CylinderGeometry(0.1, 0.1, 0.2, 32),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: 'white',
        side: THREE.DoubleSide,
      })
    );
    mesh.name = 'pencil';
    mesh.castShadow = true;
    mesh.position.set(-3.3, 1.9, -4.4);
    scene.add(mesh);
  });

  useFrame(() => {
    if (params === userId) return;
    if (
      Math.abs(coneRef.current.position.x - camera.position.x) < 3.5 &&
      Math.abs(coneRef.current.position.z - camera.position.z) < 3.5
    ) {
      coneRef.current.visible = true;
    } else {
      coneRef.current.visible = false;
    }
  });
  if (params === userId)
    return <primitive castShadow object={pencil.clone()} dispose={null} />;
  return (
    <>
      <Float
        speed={30}
        rotationIntensity={0.1}
        floatIntensity={0.01}
        floatingRange={[0, 0.1]}
      >
        <mesh
          ref={coneRef}
          position={[-3.3, 2.3, -4.4]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive castShadow object={pencil.clone()} dispose={null} />
    </>
  );
};

export default Pencil;

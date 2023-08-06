import { useGLTF, Float } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { CylinderGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Airpods = () => {
  const glb = useGLTF('../models/airpods/airpods_low_poly.glb');
  const airpods = glb.scene.children[0];
  const { scene, camera } = useThree();
  const pointGeometry = new THREE.CylinderGeometry(0.14, 0, 0.3, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: 'red' });

  const coneRef = useRef();
  useEffect(() => {
    if (!airpods) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    airpods.position.set(-3.5, 1.9, -3.3);
    airpods.rotation.set(0, -Math.PI * (3 / 4), Math.PI);
    airpods.scale.set(0.1, 0.1, 0.1);

    const mesh = new THREE.Mesh(
      new CylinderGeometry(0.1, 0.1, 0.1, 32),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: 'white',
        side: THREE.DoubleSide,
      })
    );
    mesh.name = 'airpods';
    mesh.castShadow = true;
    mesh.position.set(-3.5, 1.9, -3.3);
    scene.add(mesh);
  });
  useFrame(() => {
    if (
      Math.abs(coneRef.current.position.x - camera.position.x) < 2 &&
      Math.abs(coneRef.current.position.z - camera.position.z) < 2
    ) {
      console.log('true');
      coneRef.current.visible = true;
    } else {
      coneRef.current.visible = false;
    }
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
          ref={coneRef}
          position={[-3.5, 2.2, -3.3]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive object={airpods} dispose={null} />
    </>
  );
};

export default Airpods;

import { Float, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { CylinderGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Piano = () => {
  const glb = useGLTF('../models/piano/low_poly_piano.glb');
  const piano = glb.scene.children[0];
  const { scene, camera } = useThree();

  const pointGeometry = new THREE.CylinderGeometry(0.14, 0, 0.3, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: 'red' });

  const coneRef = useRef();

  useEffect(() => {
    if (!piano) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    piano.position.x = 3.7;
    piano.position.y = 0;
    piano.position.z = -1.15;
    piano.scale.x = 0.5;
    piano.scale.y = 0.4;
    piano.scale.z = 0.5;
    const mesh = new THREE.Mesh(
      new CylinderGeometry(0.05, 0.05, 0.05, 32),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: 'white',
        side: THREE.DoubleSide,
      })
    );
    mesh.castShadow = true;

    mesh.position.x = piano.position.x;
    mesh.position.y = piano.position.y + 0.1;
    mesh.position.z = piano.position.z;
    mesh.rotation.x = piano.rotation.x;
    mesh.rotation.y = piano.rotation.y;
    mesh.rotation.z = piano.rotation.z;
    scene.add(mesh);
  });

  useFrame(() => {
    if (
      Math.abs(coneRef.current.position.x - camera.position.x) < 3.5 &&
      Math.abs(coneRef.current.position.z - camera.position.z) < 3.5
    ) {
      coneRef.current.visible = true;
    } else {
      coneRef.current.visible = false;
    }
  });
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
          position={[5, 3, -3.2]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive object={piano} dispose={null} />
    </>
  );
};

export default Piano;

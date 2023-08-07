import { Float, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const PhotoBook = () => {
  const glb = useGLTF('../models/photoBook/book_low_poly.glb');
  const photoBook = glb.scene.children[0];
  const { scene, camera } = useThree();
  const pointGeometry = new THREE.CylinderGeometry(0.14, 0, 0.3, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: 'red' });

  const coneRef = useRef();

  useEffect(() => {
    if (!photoBook) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    photoBook.position.set(-11.1, -20.2, -9.72);
    photoBook.rotation.x = -Math.PI * (5 / 6);

    const mesh = new THREE.Mesh(
      new BoxGeometry(1, 0.5, 0.4),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: 'white',
      })
    );
    mesh.name = 'photoBook';
    mesh.position.set(-5.1, 1.2, 2.4);
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
          position={[-4.5, 1.3, 2.55]}
          geometry={pointGeometry}
          material={pointMaterial}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </Float>
      <primitive castShadow object={photoBook.clone()} dispose={null} />
    </>
  );
};

export default PhotoBook;

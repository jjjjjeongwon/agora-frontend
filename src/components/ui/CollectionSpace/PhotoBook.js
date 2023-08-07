import { useGLTF, Float } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { BoxGeometry, MeshBasicMaterial, CylinderGeometry } from 'three';
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

    photoBook.position.set(14.7, 1.75, -18.2);
    photoBook.rotation.z = -Math.PI / 3;

    const mesh = new THREE.Mesh(
      new CylinderGeometry(0.1, 0.1, 0.1, 32),
      new BoxGeometry(0.6, 0.2, 0.6),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: 'white',
        side: THREE.DoubleSide,
      })
    );
    mesh.name = 'photoBook';
    mesh.castShadow = true;
    mesh.position.set(-3.6, 1.9, -0.6);
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
          position={[-3.5, 2.2, -3.3]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive object={photoBook} dispose={null} />;
    </>
  );
};

export default PhotoBook;

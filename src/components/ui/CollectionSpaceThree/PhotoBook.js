import { Float, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { BoxGeometry, MeshBasicMaterial, CylinderGeometry } from 'three';
import * as THREE from 'three';

const PhotoBook = ({ onLoad = () => {} }) => {
  const glb = useGLTF('../models/photoBook/book_low_poly.glb');
  const photoBook = glb.scene.children[0];
  const { scene, camera } = useThree();
  const pointGeometry = new THREE.CylinderGeometry(0.14, 0, 0.3, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: 'red' });

  const coneRef = useRef();

  useEffect(() => {
    if (photoBook) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      photoBook.position.set(19, 1, -19);
      photoBook.rotation.z = -Math.PI / 3;

      const mesh = new THREE.Mesh(
        new CylinderGeometry(0.1, 0.1, 0.1, 32),

        new BoxGeometry(0.7, 0.1, 0.6),
        new MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          color: 'white',
          side: THREE.DoubleSide,
        })
      );
      mesh.name = 'photoBook';
      mesh.position.set(0.7, 1.2, -1.45);
      scene.add(mesh);

      if (typeof onLoad === 'function') {
        onLoad();
      }
    }
  }, [photoBook, onLoad]);

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

  if (!photoBook) return null;

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
          position={[0.5, 2, -1.3]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive castShadow object={photoBook.clone()} dispose={null} />
    </>
  );
};

export default PhotoBook;

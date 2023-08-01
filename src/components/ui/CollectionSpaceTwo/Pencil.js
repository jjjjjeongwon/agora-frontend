import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { CylinderGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Pencil = () => {
  const glb = useGLTF('../models/pencil/cup_with_pencils.glb');
  const pencil = glb.scene.children[0];
  const { scene } = useThree();

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
      new CylinderGeometry(0.05, 0.05, 0.05, 32),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: 'white',
        side: THREE.DoubleSide,
      })
    );
    mesh.castShadow = true;
    mesh.position.set(-3.3, 2, -4.4);
    scene.add(mesh);
  });
  return <primitive object={pencil} dispose={null} />;
};

export default Pencil;

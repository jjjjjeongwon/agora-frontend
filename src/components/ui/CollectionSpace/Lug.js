import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Lug = () => {
  const glb = useGLTF('../models/lug/paloma_large_wool_rug.glb');
  const lug = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!lug) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    lug.position.set(1.5, 0.1, -2);
    lug.scale.set(0.02, 0.02, 0.02);
    lug.rotation.z = Math.PI / 2;

    // const mesh = new THREE.Mesh(
    //   new BoxGeometry(0.2, 0.2, 0.6),
    //   new MeshBasicMaterial({ transparent: true, opacity: 0 })
    // );

    // mesh.castShadow = true;
    // mesh.position.x = lug.position.x;
    // mesh.position.y = lug.position.y;
    // mesh.position.z = lug.position.z;
    // scene.add(mesh);
  });
  return <primitive castShadow receiveShadow object={lug} dispose={null} />;
};

export default Lug;

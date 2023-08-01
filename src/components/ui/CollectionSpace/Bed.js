import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';
const Bed = () => {
  const glb = useGLTF('../models/bed/bed2.glb');
  const { scene } = useThree();
  const bed = glb.scene.children[0];
  useEffect(() => {
    if (!bed) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    // bed.position.y = 0;
    bed.position.set(-2.5, 0, 3.5);
    bed.rotation.z = Math.PI / 2;
    bed.scale.x = 0.05;
    bed.scale.y = 0.05;
    bed.scale.z = 0.05;
    const mesh = new THREE.Mesh(
      new BoxGeometry(4, 1, 3),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    mesh.castShadow = true;
    mesh.position.x = bed.position.x + 1;
    mesh.position.y = bed.position.y + 1;
    mesh.position.z = bed.position.z + 0.4;
    // scene.add(mesh);
  }, []);

  return <primitive castShadow object={bed} dispose={null} />;
};

export default Bed;

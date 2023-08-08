import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Korea = () => {
  const glb = useGLTF('../models/korea/korea_pearl.glb');
  const korea = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!korea) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    // korea.position.y = 0;
    korea.position.set(0.3, 0.8, 4.5);
    korea.scale.x = 15;
    korea.scale.z = 20;
    korea.scale.y = 10;
    korea.rotation.x = Math.PI / 2;
    // korea.rotation.y = 0;
    // korea.rotation.z = Math.PI / 2;
    // const mesh = new THREE.Mesh(
    //   new BoxGeometry(0.5, 3, 5),
    //   new MeshBasicMaterial({ transparent: true, opacity: 0 })
    // );

    // mesh.position.x = korea.position.x + 1.5;
    // mesh.position.y = korea.position.y;
    // mesh.position.z = korea.position.z + 2;
    // scene.add(mesh);
  }, []);

  return (
    <primitive
      name={'korea'}
      castShadow
      object={korea.clone()}
      dispose={null}
    />
  );
};

export default Korea;

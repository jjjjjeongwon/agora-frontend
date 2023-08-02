import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Rabbit = () => {
  const glb = useGLTF('../models/rabbit/cute_bunny.glb');
  const rabbit = glb.scene.children[0];
  const { scene } = useThree();
  useEffect(() => {
    if (!rabbit) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
    rabbit.position.set(-1.55, 0.5, 5);
    rabbit.scale.set(0.5, 0.5, 0.5);
    rabbit.rotation.z = Math.PI;
    const mesh = new THREE.Mesh(
      new BoxGeometry(0.2, 0.2, 0.6),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );

    mesh.castShadow = true;
    mesh.position.x = rabbit.position.x;
    mesh.position.y = rabbit.position.y;
    mesh.position.z = rabbit.position.z;
    scene.add(mesh);
  });
  return <primitive object={rabbit} dispose={null} />;
};

export default Rabbit;

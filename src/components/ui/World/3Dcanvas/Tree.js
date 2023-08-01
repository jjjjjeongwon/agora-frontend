import { useGLTF } from '@react-three/drei';
import React, { useRef, useEffect } from 'react';

const Tree = () => {
  const glb = useGLTF('../models/cartoon_tree.glb');
  const tree = glb.scene.children[0];
  useEffect(() => {
    if (!tree) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    tree.position.set(-7, 0, 2);
  }, []);
  return <primitive object={tree} dispose={null} />;
};

export default Tree;

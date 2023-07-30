import { useGLTF } from '@react-three/drei';
import React, { useRef, useEffect } from 'react';

const Tree = () => {
  const glb = useGLTF('../models/palm_tree.glb');
  const treeRef = glb.scene.children[0];
  const tree = useRef(treeRef);
  useEffect(() => {
    if (!tree) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    tree.current.position.set(-7, 0, 2);
    tree.current.scale.x = 2;
    tree.current.scale.y = 2;
    tree.current.scale.z = 2;
  }, []);
  return <primitive object={tree.current} dispose={null} />;
};

export default Tree;

import { useGLTF } from '@react-three/drei';
import React from 'react';

const Tree = () => {
  const glb = useGLTF('../models/palm_tree.glb');
  const tree = glb.scene.children[0];
  tree?.position.set(1, 0, 2);
  return <primitive object={tree} dispose={null} />;
};

export default Tree;

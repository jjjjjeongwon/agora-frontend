import { useGLTF } from '@react-three/drei';
import React from 'react';

const Tree = () => {
  const glb = useGLTF('../models/palm_tree.glb');
  const tree = glb.scene.children[0];
  tree?.position.set(-7, 0, 2);
  tree && (tree.scale.x = 2);
  tree && (tree.scale.y = 2);
  tree && (tree.scale.z = 2);
  return <primitive object={tree} dispose={null} />;
};

export default Tree;

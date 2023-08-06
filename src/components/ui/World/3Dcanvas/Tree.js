import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useEffect } from 'react';

useGLTF.preload('../models/tree/cartoon_tree.glb');
useGLTF.preload('../models/tree/cartoon_big_tree.glb');
const Tree = () => {
  const glb = useGLTF('../models/tree/cartoon_tree.glb');
  const glb1 = useGLTF('../models/tree/cartoon_big_tree.glb');

  const glbs = [];
  const tree = glb.scene.children[0];
  const bigTree = glb1.scene.children[0];
  glbs.push(glb);
  glbs.push(glb1);

  useEffect(() => {
    if (!tree || !bigTree) return;

    glbs.map((glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    });
  }, []);

  return (
    <RigidBody type="fixed">
      <primitive position={[-7, 0, 2]} object={tree.clone()} dispose={null} />
      <primitive
        position={[6, 0, -10]}
        object={bigTree.clone()}
        dispose={null}
      />
    </RigidBody>
  );
};

export default Tree;

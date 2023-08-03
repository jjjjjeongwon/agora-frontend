import { useGLTF } from '@react-three/drei';
import React, { useRef, useEffect } from 'react';

const Tree = () => {
  const glb = useGLTF('../models/tree/cartoon_tree.glb');
  const glb1 = useGLTF('../models/tree/cartoon_big_tree.glb');
  const glb2 = useGLTF('../models/tree/maple_tree.glb');

  const glbs = [];
  const tree = glb.scene.children[0];
  const bigTree = glb1.scene.children[0];
  const mapleTree = glb2.scene.children[0];
  glbs.push(glb);
  glbs.push(glb1);
  glbs.push(glb2);

  useEffect(() => {
    if (!tree || !bigTree || !mapleTree) return;

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
    <>
      <primitive position={[-7, 0, 2]} object={tree.clone()} dispose={null} />
      <primitive
        position={[6, 0, -10]}
        object={bigTree.clone()}
        dispose={null}
      />
      <primitive
        position={[-6, 0, 23]}
        scale={[6, 6, 6]}
        object={mapleTree.clone()}
        dispose={null}
      />
    </>
  );
};

export default Tree;

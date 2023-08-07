import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useEffect } from 'react';

useGLTF.preload('../models/tree/cartoon_tree.glb');
useGLTF.preload('../models/tree/cartoon_big_tree.glb');
useGLTF.preload('../models/tree/Silver_Big_Tree.glb');
useGLTF.preload('../models/tree/Group_Tree.glb');
useGLTF.preload('../models/tree/Round_Group_Tree.glb');
const Tree = () => {
  const glb = useGLTF('../models/tree/cartoon_tree.glb');
  const glb1 = useGLTF('../models/tree/cartoon_big_tree.glb');
  const glb2 = useGLTF('../models/tree/Silver_Big_Tree.glb');
  const glb3 = useGLTF('../models/tree/Group_Tree.glb');
  const glb4 = useGLTF('../models/tree/Round_Group_Tree.glb');

  const glbs = [];
  const tree = glb.scene.children[0];
  const bigTree = glb1.scene.children[0];
  const silverBigTree = glb2.scene.children[0];
  const groupTree = glb3.scene.children[0];
  const roundGroupTree = glb4.scene.children[0];

  glbs.push(glb);
  glbs.push(glb1);
  glbs.push(glb2);
  glbs.push(glb3);
  glbs.push(glb4);

  useEffect(() => {
    if (!tree || !bigTree || !silverBigTree || !groupTree || !roundGroupTree)
      return;

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
      <group>
        <primitive
          position={[0, 0, -28]}
          rotation={[0, -Math.PI / 2, 0]}
          object={roundGroupTree.clone()}
          dispose={null}
        />
        <primitive
          position={[23, 0, -15]}
          rotation={[0, -Math.PI * 0.75, 0]}
          scale={[0.8, 0.8, 0.8]}
          object={roundGroupTree.clone()}
          dispose={null}
        />
        <primitive
          position={[-21, 0, -17]}
          rotation={[0, -Math.PI * 0.25, 0]}
          scale={[0.8, 0.8, 0.8]}
          object={roundGroupTree.clone()}
          dispose={null}
        />
        {/* <primitive position={[-7, 0, 2]} object={tree.clone()} dispose={null} /> */}
        {/* <primitive
        position={[6, 0, -10]}
        object={bigTree.clone()}
        dispose={null}
      /> */}
        <primitive
          position={[0, 0, 0]}
          object={silverBigTree.clone()}
          scale={[0.8, 0.8, 0.8]}
          dispose={null}
        />
      </group>
    </RigidBody>
  );
};

export default Tree;

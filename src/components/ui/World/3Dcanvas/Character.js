import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

useGLTF.preload('../models/men.gltf');
export default function Character(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('../models/men.gltf');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[props.moveState].reset().fadeIn(0.2).play();

    return () => {
      actions[props.moveState].fadeOut(0.2);
    };
  }, [props.moveState]);

  console.log(actions);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Root003" scale={0.64}>
          <primitive object={nodes.LeftFootCtrl} />
          <primitive object={nodes.RightFootCtrl} />
          <primitive object={nodes.HipsCtrl} />
          <skinnedMesh
            name="characterMedium"
            geometry={nodes.characterMedium.geometry}
            material={materials['skin.001']}
            skeleton={nodes.characterMedium.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

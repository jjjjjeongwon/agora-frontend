import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

useGLTF.preload('../models/men.gltf');
const Character = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('../models/men.gltf');
  const { actions } = useAnimations(animations, group);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    actions['Run'].reset().fadeIn(0.2).play();
    return () => {
      actions['Run'].fadeOut(0.2);
    };
  }, [props.moveState]);

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
};

export default Character;

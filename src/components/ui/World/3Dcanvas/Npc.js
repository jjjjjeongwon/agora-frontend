import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
useGLTF.preload('../models/TigerCharacter.gltf');
const Npc = (props) => {
  const rigidbody = useRef();
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    '../models/TigerCharacter.gltf'
  );
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!rigidbody.current) return;
    else {
      actions?.Idle.play();
    }
  }, []);
  return (
    <RigidBody
      position={[6, -0.2, 5]}
      ref={rigidbody}
      colliders={false}
      scale={[0.5, 0.5, 0.5]}
      type="fixed"
    >
      <CapsuleCollider args={[0.9, 0.4]} position={[0, 0.9, 0]} />
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Armature" position={[0, 0.536, 0]} scale={0.535}>
            <primitive object={nodes.Bone} />
            <skinnedMesh
              castShadow
              name="body"
              geometry={nodes.body.geometry}
              material={materials.Material}
              skeleton={nodes.body.skeleton}
            />
            <skinnedMesh
              castShadow
              name="body_2"
              geometry={nodes.body_2.geometry}
              material={materials['Material.004']}
              skeleton={nodes.body_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name="ear_2"
              geometry={nodes.ear_2.geometry}
              material={materials['Material.005']}
              skeleton={nodes.ear_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name="eyebrown"
              geometry={nodes.eyebrown.geometry}
              material={materials['Material.002']}
              skeleton={nodes.eyebrown.skeleton}
            />
            <skinnedMesh
              castShadow
              name="eyes"
              geometry={nodes.eyes.geometry}
              material={materials['Material.001']}
              skeleton={nodes.eyes.skeleton}
            />
            <skinnedMesh
              castShadow
              name="head"
              geometry={nodes.head.geometry}
              material={materials.Material}
              skeleton={nodes.head.skeleton}
            />
            <skinnedMesh
              castShadow
              name="head_2"
              geometry={nodes.head_2.geometry}
              material={materials['Material.003']}
              skeleton={nodes.head_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name="mouth"
              geometry={nodes.mouth.geometry}
              material={materials['Material.001']}
              skeleton={nodes.mouth.skeleton}
            />
            <skinnedMesh
              castShadow
              name="nose"
              geometry={nodes.nose.geometry}
              material={materials['Material.002']}
              skeleton={nodes.nose.skeleton}
            />
            <skinnedMesh
              castShadow
              name="tail"
              geometry={nodes.tail.geometry}
              material={materials.Material}
              skeleton={nodes.tail.skeleton}
            />
          </group>
        </group>
      </group>
    </RigidBody>
  );
};

export default Npc;

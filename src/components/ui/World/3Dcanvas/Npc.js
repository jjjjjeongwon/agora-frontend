import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';

useGLTF.preload('../models/TigerCharacter.gltf');

const Npc = (props) => {
  const rigidbody = useRef();
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    '../models/TigerCharacter.gltf'
  );
  const { actions } = useAnimations(animations, group);
  const [isAnimating, setIsAnimating] = useState(false);
  const { scene, gl, camera } = useThree();

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  useEffect(() => {
    if (!rigidbody.current) return;
    else {
      actions?.Idle.play();
    }
    function checkIntersects() {
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children);
      for (const item of intersects) {
        if (item.object.parent?.parent?.parent?.name === 'Npc') {
          setIsAnimating(true);
          props.setNpcTalk(true);
        }
        break;
      }
    }

    gl.domElement.addEventListener('click', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
      checkIntersects();
    });
    return () =>
      gl.domElement.addEventListener('click', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
        checkIntersects();
      });
  }, []);
  useEffect(() => {
    if (props.npcTalk) {
      gsap.to(camera.position, {
        duration: 1,
        x: 6,
        y: 5,
        z: 14,
      });
    }
  }, [props.npcTalk]);
  return (
    <>
      <RigidBody
        position={[6, -0.2, 5]}
        ref={rigidbody}
        colliders={false}
        name="Npc"
        scale={[0.5, 0.5, 0.5]}
        type="fixed"
      >
        <CapsuleCollider args={[0.9, 0.4]} position={[0, 0.9, 0]} />
        <group ref={group} name="Npc" {...props} dispose={null}>
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
    </>
  );
};

export default Npc;

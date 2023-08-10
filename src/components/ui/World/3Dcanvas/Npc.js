import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';

useGLTF.preload('../models/TigerCharacter.gltf');

const NpcText = (props) => {
  const meshRef = useRef();
  const visibleRef = useRef(false);

  const texCanvas = document.createElement('canvas');

  const texContext = texCanvas.getContext('2d');

  texCanvas.width = 600;
  texCanvas.height = 600;

  const canvasTexture = new THREE.CanvasTexture(texCanvas);

  const geometry = new THREE.PlaneGeometry(6, 6);
  const material = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
  });

  useFrame(() => {
    // Draw on the canvas
    texContext.clearRect(0, 0, texCanvas.width, texCanvas.height);
    texContext.fillStyle = 'white';
    texContext.font = 'bold 15px Noto Sans KR';
    texContext.fillText('안녕! 만나서 반가워! 나는 정오미야!', 0, 200);
    texContext.fillStyle = 'white';
    texContext.font = 'bold 15px Noto Sans KR';
    texContext.fillText(
      '오른쪽으로 가면 파도를 타고 새로운 친구를 만나볼 수 있어!',
      0,
      220
    );
    if (props.isAnimating) {
      visibleRef.current = true;
    } else {
      visibleRef.current = false;
    }
  }, []);
  return (
    <>
      <mesh
        castShadow={false}
        visible={visibleRef.current}
        geometry={geometry}
        material={material}
        position={[5, 1, 5]}
      />
    </>
  );
};

const Npc = (props) => {
  const rigidbody = useRef();
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    '../models/TigerCharacter.gltf'
  );
  const { actions } = useAnimations(animations, group);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!rigidbody.current) return;
    else {
      actions?.Idle.play();
    }
  }, []);
  useFrame((state) => {
    if (
      Math.abs(6 - props.myPlayer.x) < 2 &&
      Math.abs(8 - props.myPlayer.z) < 2
    ) {
      setIsAnimating(true);
      //   gsap.to(state.camera.position, {
      //     y: 3,
      //     z: 15,
      //   });
    } else {
      setIsAnimating(false);
    }
  });
  return (
    <>
      <NpcText isAnimating={isAnimating} />
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
    </>
  );
};

export default Npc;

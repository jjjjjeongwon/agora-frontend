import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Window = () => {
  const glb = useGLTF('../models/window/double_door_window.glb');
  const _window = glb.scene.children[0];
  const { scene } = useThree();
  useEffect(() => {
    if (!_window) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

    _window.position.x = 1.5;
    _window.position.y = 2.3;
    _window.position.z = 5.5;
    _window.scale.x = 0.015;
    _window.scale.y = 0.06;
    _window.scale.z = 0.01;
    _window.rotation.z = Math.PI;
    // _window.rotation.z = Math.PI / 2;
    // const mesh = new THREE.Mesh(
    //   new BoxGeometry(0.1, 0.2, 0.3),
    //   new MeshBasicMaterial({
    //     transparent: true,
    //     opacity: 0,
    //     side: THREE.DoubleSide,
    //   })
    // );
    // mesh.castShadow = true;
    // mesh.position.x = _window.position.x;
    // mesh.position.y = _window.position.y + 0.1;
    // mesh.position.z = _window.position.z;
    // mesh.rotation.x = _window.rotation.x;
    // mesh.rotation.y = _window.rotation.y;
    // mesh.rotation.z = _window.rotation.z;
    // scene.add(mesh);
  });
  return <primitive object={_window} dispose={null} />;
};

export default Window;

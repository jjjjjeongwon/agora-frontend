import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Camera = () => {
  const glb = useGLTF('../models/camera/camera_3d.glb');
  //   const glb = useGLTF('../models/cartoon_furniture.glb');
  const camera = glb.scene.children[0];
  const { scene } = useThree();
  useEffect(() => {
    if (!camera) return;

    camera.position.x = -2;
    camera.position.y = 1.2;
    camera.position.z = 4;
    camera.rotation.x = -Math.PI / 6;
    // camera.rotation.y = Math.PI;
    camera.rotation.z = Math.PI / 2;
    camera.scale.x = 0.0003;
    camera.scale.y = 0.0003;
    camera.scale.z = 0.0003;
    const mesh = new THREE.Mesh(
      new BoxGeometry(0.3, 0.4, 0.5),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      })
    );
    mesh.name = 'camera';
    mesh.castShadow = true;
    mesh.position.x = camera.position.x;
    mesh.position.y = camera.position.y;
    mesh.position.z = camera.position.z;
    scene.add(mesh);
  });
  return <primitive object={camera} dispose={null} />;
};

export default Camera;

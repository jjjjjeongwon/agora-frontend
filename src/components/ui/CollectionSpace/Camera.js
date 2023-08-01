import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Camera = () => {
  const glb = useGLTF('../models/camera/camera_3d.glb');
  //   const glb = useGLTF('../models/cartoon_furniture.glb');
  const camera = glb.scene.children[0];

  useEffect(() => {
    if (!camera) return;

    camera.position.x = 0;
    camera.position.y = 2;
    camera.position.z = 0;
    camera.scale.x = 0.0001;
    camera.scale.y = 0.0001;
    camera.scale.z = 0.0001;
  });
  return <primitive object={camera} dispose={null} />;
};

export default Camera;

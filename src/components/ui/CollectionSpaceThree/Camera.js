import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Camera = () => {
  const glb = useGLTF("../models/camera/low_poly_hand_camera.glb");
  const camera = glb.scene.children[0];
  const { scene } = useThree();
  useEffect(() => {
    if (!camera) return;

    camera.position.x = -5;
    camera.position.y = 1.85;
    camera.position.z = 3.3;
    camera.scale.x = 0.1;
    camera.scale.y = 0.1;
    camera.scale.z = 0.1;
    camera.rotation.z = Math.PI / 2;
    const mesh = new THREE.Mesh(
      new BoxGeometry(0.1, 0.2, 0.3),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      })
    );
    mesh.castShadow = true;
    mesh.position.x = camera.position.x;
    mesh.position.y = camera.position.y + 0.1;
    mesh.position.z = camera.position.z;
    mesh.rotation.x = camera.rotation.x;
    mesh.rotation.y = camera.rotation.y;
    mesh.rotation.z = camera.rotation.z;
    scene.add(mesh);
  });
  return <primitive object={camera} dispose={null} />;
};

export default Camera;

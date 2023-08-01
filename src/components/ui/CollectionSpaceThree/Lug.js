import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Lug = () => {
  const glb = useGLTF("../models/lug/round_carpet.glb");
  const lug = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!lug) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    lug.position.set(0, 0.1, 0.5);
    lug.scale.set(0.05, 0.05, 0.05);
    lug.rotation.z = Math.PI / 2;

    // const mesh = new THREE.Mesh(
    //   new BoxGeometry(0.2, 0.2, 0.6),
    //   new MeshBasicMaterial({ transparent: true, opacity: 0 })
    // );

    // mesh.castShadow = true;
    // mesh.position.x = lug.position.x;
    // mesh.position.y = lug.position.y;
    // mesh.position.z = lug.position.z;
    // scene.add(mesh);
  });
  return <primitive object={lug} dispose={null} />;
};

export default Lug;

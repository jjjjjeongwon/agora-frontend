import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Flower = () => {
  const glb = useGLTF("../models/flower/flower_pot.glb");
  const flower = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!flower) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    flower.position.set(0.8, 1.2, -0.8);
    flower.scale.set(0.2, 0.2, 0.2);
  });
  return <primitive object={flower} dispose={null} />;
};

export default Flower;

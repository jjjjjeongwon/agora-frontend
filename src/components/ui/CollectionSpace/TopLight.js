import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const TopLight = () => {
  const glb = useGLTF("../models/light/house_light.glb");
  const topLight = glb.scene.children[0];

  useEffect(() => {
    if (!topLight) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    // topLight.position.y = 0;
    topLight.position.set(0, 5, 0);
  }, []);

  return (
    <primitive name={"topLight"} castShadow object={topLight} dispose={null} />
  );
};

export default TopLight;

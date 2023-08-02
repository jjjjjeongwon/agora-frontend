import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const CafeTable = () => {
  const glb = useGLTF("../models/table/low_low_poly_table.glb");
  const cafeTable = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!cafeTable) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    cafeTable.position.set(0.8, 0, 1);
    cafeTable.scale.set(0.2, 0.2, 0.2);
  });
  return <primitive object={cafeTable} dispose={null} />;
};

export default CafeTable;

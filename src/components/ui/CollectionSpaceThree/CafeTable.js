import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const CafeTable = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/table/low_low_poly_table.glb");
  const cafeTable = glb.scene.children[0];

  useEffect(() => {
    if (cafeTable) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      cafeTable.position.set(0.8, 0, -0.8);
      cafeTable.scale.set(0.2, 0.2, 0.2);

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [cafeTable, onLoad]);

  if (!cafeTable) return null;

  return (
    <primitive
      castShadow
      receiveShadow
      object={cafeTable.clone()}
      dispose={null}
    />
  );
};

export default CafeTable;

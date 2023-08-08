import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const BedsideTable = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/table/low_poly_dining_table.glb");
  const bedsideTable = glb.scene.children[0];

  useEffect(() => {
    if (bedsideTable) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      bedsideTable.position.set(-4.75, -0.2, -1.12);
      bedsideTable.scale.x = 0.002;
      bedsideTable.scale.y = 0.004;
      bedsideTable.scale.z = 0.004;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [bedsideTable, onLoad]);

  if (!bedsideTable) return null;

  return (
    <primitive
      castShadow
      receiveShadow
      object={bedsideTable.clone()}
      dispose={null}
    />
  );
};

export default BedsideTable;

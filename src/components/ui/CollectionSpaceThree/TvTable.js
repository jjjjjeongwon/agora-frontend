import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const TvTable = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/table/white_tv_table.glb");
  const tvTable = glb.scene.children[0];

  useEffect(() => {
    if (tvTable) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      // tvTable.position.y = 0;
      tvTable.position.set(4.75, -0.1, 2.36);
      tvTable.scale.x = 0.025;
      tvTable.scale.y = 0.03;
      tvTable.scale.z = 0.045;
      tvTable.rotation.x = -Math.PI / 2;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [tvTable, onLoad]);

  if (!tvTable) return null;

  return (
    <primitive
      castShadow
      receiveShadow
      object={tvTable.clone()}
      dispose={null}
    />
  );
};

export default TvTable;

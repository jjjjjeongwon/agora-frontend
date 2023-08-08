import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const TvTable = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/table/tv_table_white.glb");
  const tvTable = glb.scene.children[0];

  useEffect(() => {
    if (tvTable) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      tvTable.position.set(5, -0.1, 2.6);
      tvTable.scale.x = 0.023;
      tvTable.scale.y = 0.023;
      tvTable.scale.z = 0.023;
      tvTable.rotation.x = -Math.PI / 2;
      tvTable.rotation.z = -Math.PI / 2;

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

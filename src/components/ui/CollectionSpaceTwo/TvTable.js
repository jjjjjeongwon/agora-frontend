import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const TvTable = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/table/low_poly_style_tv_stand.glb");
  const tvTable = glb.scene.children[0];

  useEffect(() => {
    if (tvTable) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      tvTable.position.set(4.9, 0.7, 2.2);
      tvTable.scale.x = 0.0095;
      tvTable.scale.y = 0.006;
      tvTable.scale.z = 0.009;
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

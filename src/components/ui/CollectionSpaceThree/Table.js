import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Table = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/table/dressing_table.glb");
  const table = glb.scene.children[0];

  useEffect(() => {
    if (table) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      // table.position.y = 0;
      table.position.set(-4.6, 1.2, -4.9);

      table.scale.x = 0.02;
      table.scale.y = 0.02;
      table.scale.z = 0.0255;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [table, onLoad]);

  if (!table) return null;

  return (
    <>
      <primitive
        castShadow
        receiveShadow
        object={table.clone()}
        dispose={null}
      />
    </>
  );
};

export default Table;

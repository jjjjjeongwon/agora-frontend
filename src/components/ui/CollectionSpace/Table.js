import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Table = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/table/desk_low-poly.glb");
  const table = glb.scene.children[0];

  useEffect(() => {
    if (table) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      table.position.set(-4.2, 0, -2);
      table.scale.x = 0.01;
      table.scale.y = 0.01;
      table.scale.z = 0.009;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [table, onLoad]);

  if (!table) return null;

  return (
    <primitive castShadow receiveShadow object={table.clone()} dispose={null} />
  );
};

export default Table;

import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Table = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/table/desk.glb");
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
      table.position.set(-2.3, 1, 4.3);
      table.rotation.z = Math.PI / 2;
      table.scale.x = 2;
      table.scale.y = 2;
      table.scale.z = 2;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [table, onLoad]);

  if (!table) return null;

  return (
    <>
      <mesh castShadow name="chair" position={[-2.5, 1, 3]}>
        <boxGeometry args={[0.5, 1, 0.7]} />
        <meshStandardMaterial color={"white"} transparent opacity={0} />
      </mesh>
      <mesh
        castShadow
        name="desk"
        position={[-4, 2, 5]}
        rotation={[Math.PI / 2, 0, Math.PI]}
      >
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial color={"white"} transparent opacity={0} />
      </mesh>
      <primitive
        castShadow
        recieveShadow
        object={table.clone()}
        dispose={null}
      />
    </>
  );
};

export default Table;

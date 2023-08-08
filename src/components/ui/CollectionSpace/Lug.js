import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Lug = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/lug/paloma_large_wool_rug.glb");
  const lug = glb.scene.children[0];

  useEffect(() => {
    if (lug) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      lug.position.set(1.5, 0.1, -2);
      lug.scale.set(0.02, 0.02, 0.02);
      lug.rotation.z = Math.PI / 2;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [lug, onLoad]);

  if (!lug) return null;

  return (
    <primitive castShadow receiveShadow object={lug.clone()} dispose={null} />
  );
};

export default Lug;

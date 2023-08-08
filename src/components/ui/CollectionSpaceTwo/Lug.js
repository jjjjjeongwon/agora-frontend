import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Lug = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/lug/round_carpet.glb");
  const lug = glb.scene.children[0];

  useEffect(() => {
    if (lug) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      lug.position.set(0, 0.1, 0.5);
      lug.scale.set(0.05, 0.05, 0.05);
      lug.rotation.z = Math.PI / 2;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [lug, onLoad]);

  if (!lug) return null;

  return <primitive object={lug.clone()} dispose={null} />;
};

export default Lug;

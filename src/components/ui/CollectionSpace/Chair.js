import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Chair = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/chair/office_chair.glb");
  const chair = glb.scene.children[0];
  useEffect(() => {
    if (chair) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      chair.position.set(-2, 0, -2);
      chair.scale.set(2, 2, 2);
      chair.rotation.z = -Math.PI / 2;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [chair, onLoad]);

  if (!chair) return null;

  return <primitive object={chair.clone()} dispose={null} />;
};

export default Chair;

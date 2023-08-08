import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Closet = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/closet/closet.glb");
  const closet = glb.scene.children[0];

  useEffect(() => {
    if (closet) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      closet.position.x = -2;
      closet.position.y = -0.6;
      closet.position.z = -5;
      closet.scale.x = 0.17;
      closet.scale.y = 0.17;
      closet.scale.z = 0.17;
      closet.rotation.z = Math.PI;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [closet, onLoad]);

  if (!closet) return null;

  return (
    <primitive
      castShadow
      receiveShadow
      object={closet.clone()}
      dispose={null}
    />
  );
};

export default Closet;

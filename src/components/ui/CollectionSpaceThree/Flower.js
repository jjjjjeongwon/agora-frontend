import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Flower = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/flower/flower_pot.glb");
  const flower = glb.scene.children[0];

  useEffect(() => {
    if (flower) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      flower.position.set(0.8, 1.2, -0.8);
      flower.scale.set(0.2, 0.2, 0.2);

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [flower, onLoad]);

  if (!flower) return null;

  return (
    <primitive
      castShadow
      receiveShadow
      object={flower.clone()}
      dispose={null}
    />
  );
};

export default Flower;

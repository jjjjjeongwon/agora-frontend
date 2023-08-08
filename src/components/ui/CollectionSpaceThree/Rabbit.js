import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Rabbit = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/rabbit/cute_bunny.glb");
  const rabbit = glb.scene.children[0];

  useEffect(() => {
    if (rabbit) {
      glb.scene.traverse((child) => {
        if (child.isMesh) child.castShadow = true;
      });
      rabbit.position.set(-1.55, 0.5, 5);
      rabbit.scale.set(0.5, 0.5, 0.5);
      rabbit.rotation.z = Math.PI;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [rabbit, onLoad]);

  if (!rabbit) return null;

  return <primitive castShadow object={rabbit.clone()} dispose={null} />;
};

export default Rabbit;

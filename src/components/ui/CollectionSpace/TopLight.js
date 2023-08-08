import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const TopLight = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/light/house_light.glb");
  const topLight = glb.scene.children[0];

  useEffect(() => {
    if (topLight) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      // topLight.position.y = 0;
      topLight.position.set(0, 5, 0);

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [topLight, onLoad]);

  if (!topLight) return null;

  return (
    <primitive
      name={"topLight"}
      castShadow
      object={topLight.clone()}
      dispose={null}
    />
  );
};

export default TopLight;

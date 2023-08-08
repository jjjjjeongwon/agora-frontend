import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Tv = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/tv/screen_led.glb");
  const tv = glb.scene.children[0];

  useEffect(() => {
    if (tv) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      tv.position.set(5.4, 3.5, 2.2);
      tv.scale.x = 0.6;
      tv.scale.z = 0.7;
      tv.rotation.x = Math.PI / 2;
      tv.rotation.y = Math.PI;
      tv.rotation.z = Math.PI / 2;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [tv, onLoad]);

  if (!tv) return null;

  return (
    <primitive name={"tv"} castShadow object={tv.clone()} dispose={null} />
  );
};

export default Tv;

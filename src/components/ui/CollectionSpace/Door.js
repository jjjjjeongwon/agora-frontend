import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Door = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/door/door.glb");
  const door = glb.scene.children[0];

  useEffect(() => {
    if (door) {
      door.position.set(-3, 0, -4.5);
      door.scale.x = 0.03;
      door.scale.y = 0.02;
      door.scale.z = 0.02;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [door, onLoad]);

  if (!door) return null;

  return <primitive castShadow object={door.clone()} dispose={null} />;
};

export default Door;

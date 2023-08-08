import { useGLTF } from "@react-three/drei";
import React, { useEffect, useState } from "react";

const Bed = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/bed/cartoon_bed.glb");
  const bed = glb.scene.children[0];

  useEffect(() => {
    if (bed) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      bed.position.set(-3, 0, -3.5);
      bed.rotation.z = Math.PI / 2;
      bed.scale.x = 70;
      bed.scale.y = 70;
      bed.scale.z = 70;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [bed, onLoad]);

  if (!bed) return null;

  return (
    <primitive castShadow receiveShadow object={bed.clone()} dispose={null} />
  );
};

export default Bed;

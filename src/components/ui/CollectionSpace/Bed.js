import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Bed = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/bed/bed_grey.glb");
  const bed = glb.scene.children[0];

  useEffect(() => {
    if (bed) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      bed.position.set(-2.5, 0, 3.5);
      bed.rotation.z = Math.PI / 2;
      bed.scale.x = 0.025;
      bed.scale.y = 0.02;
      bed.scale.z = 0.02;

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

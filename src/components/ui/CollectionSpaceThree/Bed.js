import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Bed = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/bed/bed_with_pillow.glb");
  const bed = glb.scene.children[0];

  useEffect(() => {
    if (bed) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      bed.position.set(-3.65, 0, 3);
      bed.rotation.z = -Math.PI / 2;
      bed.scale.x = 1;
      bed.scale.y = 1;
      bed.scale.z = 1;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [bed, onLoad]);

  if (!bed) return null;

  return <primitive castshadow object={bed.clone()} dispose={null} />;
};

export default Bed;

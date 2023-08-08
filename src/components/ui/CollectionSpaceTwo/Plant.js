import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Plant = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/plant/low-poly_plant.glb");
  const plant = glb.scene.children[0];

  useEffect(() => {
    if (plant) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      plant.position.x = 3.2;
      plant.position.y = 0;
      plant.position.z = 4.5;
      plant.scale.x = 8;
      plant.scale.y = 8;
      plant.scale.z = 8;
      plant.rotation.z = -(Math.PI / 2);

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [plant, onLoad]);

  if (!plant) return null;

  return <primitive castShadow object={plant.clone()} dispose={null} />;
};

export default Plant;

import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Korea = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/korea/korea_pearl.glb");
  const korea = glb.scene.children[0];

  useEffect(() => {
    if (korea) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      korea.position.set(0.3, 0.8, 4.5);
      korea.scale.x = 15;
      korea.scale.z = 20;
      korea.scale.y = 10;
      korea.rotation.x = Math.PI / 2;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [korea, onLoad]);

  if (!korea) return null;

  return (
    <primitive
      name={"korea"}
      castShadow
      object={korea.clone()}
      dispose={null}
    />
  );
};

export default Korea;

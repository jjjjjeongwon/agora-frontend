import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Window = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/window/window.glb");
  const _window = glb.scene.children[0];

  useEffect(() => {
    if (_window) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      _window.position.x = 0;
      _window.position.y = 3;
      _window.position.z = 8;
      _window.scale.x = 2;
      _window.scale.y = 3;
      _window.scale.z = 2;
      _window.rotation.z = Math.PI;

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [_window, onLoad]);

  if (!_window) return null;

  return <primitive object={_window.clone()} dispose={null} />;
};

export default Window;

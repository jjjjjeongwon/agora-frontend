import { useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react';

const Window = ({ onLoad = () => {} }) => {
  const glb = useGLTF('../models/window/double_door_window.glb');
  const _window = glb.scene.children[0];

  useEffect(() => {
    if (_window) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
        }
      });

      _window.position.x = 1.5;
      _window.position.y = 2.3;
      _window.position.z = 5.5;
      _window.scale.x = 0.015;
      _window.scale.y = 0.06;
      _window.scale.z = 0.01;
      _window.rotation.z = Math.PI;

      if (typeof onLoad === 'function') {
        onLoad();
      }
    }
  }, [_window, onLoad]);

  if (!_window) return null;

  return <primitive object={_window.clone()} dispose={null} />;
};

export default Window;

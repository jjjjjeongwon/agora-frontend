import { useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react';

const Tv = () => {
  const glb = useGLTF('../models/tv/screen_led.glb');
  const tv = glb.scene.children[0];
  useEffect(() => {
    if (!tv) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    // tv.position.y = 0;
    tv.position.set(5.4, 3, 2.5);
    tv.scale.x = 0.6;
    tv.scale.z = 0.7;
    tv.rotation.x = Math.PI / 2;
    tv.rotation.y = Math.PI;
    tv.rotation.z = Math.PI / 2;
  }, []);

  return <primitive name={'tv'} castShadow object={tv} dispose={null} />;
};

export default Tv;

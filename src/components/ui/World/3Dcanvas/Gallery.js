import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

useGLTF.preload('../models/gallery.glb');
const Gallery = () => {
  const glb = useGLTF('../models/gallery.glb');
  const mesh = glb.scene.children[0];

  useEffect(() => {
    if (!mesh) return;
    glb.scene.traverse((child) => {
      console.log(child);
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    mesh.position.x = -17;
    mesh.position.z = 5;
    mesh.position.y = 0.1;
  }, []);
  return <primitive castShadow receiveShadow object={mesh} dispose={null} />;
};

export default Gallery;

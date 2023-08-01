import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const VisitCard = () => {
  const glb = useGLTF('../models/postit/yellowpost.glb');
  const mesh = glb.scene.children[0];
  useEffect(() => {
    if (!mesh) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
    mesh.scale.x = 0.5;
    mesh.scale.y = 0.5;
    mesh.scale.z = 0.5;
    mesh.position.set(-3.2, 5, -5.5);
    mesh.rotation.set(0, Math.PI * 2, 0);
  });
  return <primitive object={mesh} dispose={null} />;
};

export default VisitCard;

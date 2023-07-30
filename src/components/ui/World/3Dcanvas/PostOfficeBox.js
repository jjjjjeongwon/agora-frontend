import { useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
const PostOfficeBox = ({ myPlayer, postSpot }) => {
  const glb = useGLTF('../models/postbox.glb');
  const postOfficeBox = glb.scene.children[0];

  useEffect(() => {
    if (!postOfficeBox) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

    postOfficeBox.position.set(10, 0.1, 2);
    postOfficeBox.scale.x = 0.02;
    postOfficeBox.scale.y = 0.02;
    postOfficeBox.scale.z = 0.02;
  });

  return <primitive castShadow object={postOfficeBox} dispose={null} />;
};

export default PostOfficeBox;

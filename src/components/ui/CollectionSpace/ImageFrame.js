import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

const ImageFrame = () => {
  const glb = useGLTF('../models/imageframe/photo_frame.glb');
  const mesh = glb.scene.children[0];

  useEffect(() => {
    if (!mesh) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
    mesh.scale.x = 5;
    mesh.scale.y = 5;
    mesh.scale.z = 5;
  });
  return (
    <>
      <primitive
        position={[-5, 9, -8]}
        // position={[-3.2, 2, -5.5]}
        rotation={[0, 0, Math.PI / 2]}
        object={mesh}
        dispose={null}
      />
    </>
  );
};

export default ImageFrame;

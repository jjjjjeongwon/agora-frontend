import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

const ImageCollection = () => {
  const glb = useGLTF('../models/picture_frame1.glb');
  const mesh = glb.scene.children[0];

  useEffect(() => {
    if (!mesh) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
  });
  return (
    <>
      <primitive
        position={[-19.1, 2, 17]}
        rotation={[0, Math.PI, Math.PI / 2]}
        object={mesh.clone()}
        dispose={null}
      />
      <primitive
        position={[-19.1, 2, 14]}
        rotation={[0, Math.PI, Math.PI / 2]}
        object={mesh.clone()}
        dispose={null}
      />
      <primitive
        position={[-19.1, 2, 11]}
        rotation={[0, Math.PI, Math.PI / 2]}
        object={mesh.clone()}
        dispose={null}
      />
      <primitive
        position={[-19.1, 2, 8]}
        rotation={[0, Math.PI, Math.PI / 2]}
        object={mesh.clone()}
        dispose={null}
      />
      <primitive
        position={[-19.1, 2, 5]}
        rotation={[0, Math.PI, Math.PI / 2]}
        object={mesh.clone()}
        dispose={null}
      />
      <primitive
        position={[-19.1, 2, 2]}
        rotation={[0, Math.PI, Math.PI / 2]}
        object={mesh.clone()}
        dispose={null}
      />
      <primitive
        position={[-19.1, 2, -1]}
        rotation={[0, Math.PI, Math.PI / 2]}
        object={mesh.clone()}
        dispose={null}
      />
      <primitive
        position={[-19.1, 2, -4]}
        rotation={[0, Math.PI, Math.PI / 2]}
        object={mesh.clone()}
        dispose={null}
      />
      <primitive
        position={[-19.1, 2, -7]}
        rotation={[0, Math.PI, Math.PI / 2]}
        object={mesh.clone()}
        dispose={null}
      />
    </>
  );
};

export default ImageCollection;

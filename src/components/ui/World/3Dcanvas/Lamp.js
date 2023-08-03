import { useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
const Lamp = ({ myPlayer, postSpot }) => {
  const glb = useGLTF('../models/road/street_lamp.gltf');
  const lamp = glb.scene.children[0];

  useEffect(() => {
    if (!Lamp) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  });

  return (
    <>
      <primitive
        position={[-3, 0, 21]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
      <primitive
        position={[3, 0, 21]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
      <primitive
        position={[-3, 0, 15]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
      <primitive
        position={[3, 0, 15]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
      <primitive
        position={[-3, 0, 1]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
      <primitive
        position={[3, 0, 1]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
      <primitive
        position={[-3, 0, -5]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
      <primitive
        position={[3, 0, -5]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
      <primitive
        position={[-3, 0, -15]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
      <primitive
        position={[3, 0, -15]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
      <primitive
        position={[-3, 0, -21]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
      <primitive
        position={[3, 0, -21]}
        castShadow
        object={lamp.clone()}
        dispose={null}
      />
    </>
  );
};

export default Lamp;

import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';

useGLTF.preload('../models/house/small_house.gltf');
const House = () => {
  // const glb = useGLTF('../models/house/orange_building1.glb');
  // const house = glb.scene.children[0];
  const gltf = useGLTF('../models/house/small_house.gltf');
  const house = gltf.scene.children[0];

  useEffect(() => {
    if (!house) return;

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    house.position.set(5, 0.5, 2);
    house.scale.set(0.8, 0.8, 0.8);
  }, []);

  return (
    <RigidBody type="fixed">
      {/* <primitive name={'house'} castShadow object={house} dispose={null} /> */}
      <primitive
        castShadow
        receiveShadow
        position={[-15, 0, -18]}
        scale={[6, 6, 6]}
        rotation={[0, Math.PI / 2, 0]}
        object={house.clone()}
        dispose={null}
      />

      <primitive
        castShadow
        receiveShadow
        position={[15, 0, -18]}
        scale={[6, 6, 6]}
        rotation={[0, -Math.PI / 2, 0]}
        object={house.clone()}
        dispose={null}
      />

      <primitive
        castShadow
        receiveShadow
        position={[15, 0, 0]}
        scale={[6, 6, 6]}
        rotation={[0, -Math.PI / 2, 0]}
        object={house.clone()}
        dispose={null}
      />

      <primitive
        castShadow
        receiveShadow
        position={[-15, 0, 0]}
        scale={[6, 6, 6]}
        rotation={[0, Math.PI / 2, 0]}
        object={house.clone()}
        dispose={null}
      />

      <primitive
        castShadow
        receiveShadow
        position={[15, 0, 18]}
        scale={[6, 6, 6]}
        rotation={[0, -Math.PI / 2, 0]}
        object={house.clone()}
        dispose={null}
      />

      <primitive
        castShadow
        receiveShadow
        position={[-15, 0, 18]}
        scale={[6, 6, 6]}
        rotation={[0, Math.PI / 2, 0]}
        object={house.clone()}
        dispose={null}
      />
    </RigidBody>
  );
};

export default House;

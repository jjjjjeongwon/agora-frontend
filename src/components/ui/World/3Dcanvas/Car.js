import { useGLTF } from '@react-three/drei';
import React, { useRef, useEffect } from 'react';

const Car = () => {
  const glb = useGLTF('../models/car/car.gltf');
  const glb1 = useGLTF('../models/car/ice_cream_car.gltf');
  const glb2 = useGLTF('../models/car/truck.gltf');
  const glb3 = useGLTF('../models/car/suv.gltf');
  const glb4 = useGLTF('../models/car/luxury_suv.gltf');

  const glbs = [];
  const car = glb.scene.children[0];
  const ice_cream_car = glb1.scene.children[0];
  const truck = glb2.scene.children[0];
  const suv = glb3.scene.children[0];
  const luxury_suv = glb4.scene.children[0];
  glbs.push(glb);
  glbs.push(glb1);
  glbs.push(glb2);
  glbs.push(glb3);

  useEffect(() => {
    if (!car || !ice_cream_car || !truck || !suv) return;

    glbs.map((glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    });
  }, []);

  return (
    <>
      <primitive
        position={[-10, 0, 14]}
        rotation={[0, Math.PI / 2, 0]}
        object={car.clone()}
        dispose={null}
      />
      <primitive
        position={[4, 0, -22]}
        object={ice_cream_car.clone()}
        dispose={null}
      />
      <primitive
        position={[3.5, 0, 10]}
        object={truck.clone()}
        dispose={null}
      />
      <primitive
        position={[9, 0, 21]}
        rotation={[0, -Math.PI / 2, 0]}
        object={suv.clone()}
        dispose={null}
      />
      <primitive
        position={[-10, 0, -21]}
        rotation={[0, Math.PI / 2, 0]}
        object={luxury_suv.clone()}
        dispose={null}
      />
    </>
  );
};

export default Car;

import { useGLTF } from '@react-three/drei';
import React, { useRef, useEffect } from 'react';

const Road = () => {
  const glb = useGLTF('../models/road/Street_Straight.glb');
  const glb1 = useGLTF('../models/road/Street_4Way.glb');
  const road = glb.scene.children[0];
  const crossRoad = glb1.scene.children[0];
  const glbs = [];
  glbs.push(glb);
  glbs.push(glb1);
  useEffect(() => {
    if (!road) return;

    glbs.map((glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) child.receiveShadow = true;
      });
    });
    // glb.scene.traverse((child) => {
    //   if (child.isMesh) {
    //     child.receiveShadow = true;
    //   }
    // });

    road.scale.set(2, 2, 2);
    crossRoad.scale.set(2, 2, 2);
  }, []);
  return (
    <>
      {/* 일직선 도로 */}
      <primitive
        position={[0, -0.1, 26]}
        rotation={[0, Math.PI / 2, 0]}
        object={road.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, 22]}
        rotation={[0, Math.PI / 2, 0]}
        object={road.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, 18]}
        object={crossRoad.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, 14]}
        rotation={[0, Math.PI / 2, 0]}
        object={road.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, 10]}
        rotation={[0, Math.PI / 2, 0]}
        object={road.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, 6]}
        rotation={[0, Math.PI / 2, 0]}
        object={road.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, 2]}
        rotation={[0, Math.PI / 2, 0]}
        object={road.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, -2]}
        object={crossRoad.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, -6]}
        rotation={[0, Math.PI / 2, 0]}
        object={road.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, -10]}
        rotation={[0, Math.PI / 2, 0]}
        object={road.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, -14]}
        rotation={[0, Math.PI / 2, 0]}
        object={road.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, -18]}
        object={crossRoad.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, -22]}
        rotation={[0, Math.PI / 2, 0]}
        object={road.clone()}
        dispose={null}
      />
      <primitive
        position={[0, -0.1, -26]}
        rotation={[0, Math.PI / 2, 0]}
        object={road.clone()}
        dispose={null}
      />
      {/* 꺾이는도로 */}
      <>
        <primitive
          position={[4, -0.1, -18]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[8, -0.1, -18]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-4, -0.1, -18]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-8, -0.1, -18]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[4, -0.1, -2]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[8, -0.1, -2]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-4, -0.1, -2]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-8, -0.1, -2]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[4, -0.1, 18]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[8, -0.1, 18]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-4, -0.1, 18]}
          object={road.clone()}
          dispose={null}
        />
        <primitive
          position={[-8, -0.1, 18]}
          object={road.clone()}
          dispose={null}
        />
      </>
    </>
  );
};

export default Road;

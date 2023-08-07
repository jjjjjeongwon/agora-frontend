import { useGLTF, Float } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { CylinderGeometry, BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Remote = () => {
  const glb = useGLTF('../models/remote/tv_remote.glb');
  const remote = glb.scene.children[0];
  const { scene, camera } = useThree();
  const pointGeometry = new THREE.CylinderGeometry(0.14, 0, 0.3, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: 'red' });

  const coneRef = useRef();

  useEffect(() => {
    if (!remote) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
    remote.position.set(4.4, 1.6, -0.55);
    remote.scale.set(0.03, 0.03, 0.03);

    const mesh = new THREE.Mesh(
      new BoxGeometry(0.5, 0.3, 0.5),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );

    mesh.name = 'Remote';
    mesh.position.x = remote.position.x;
    mesh.position.y = remote.position.y;
    mesh.position.z = remote.position.z;
    scene.add(mesh);
  });

  useFrame(() => {
    if (
      Math.abs(coneRef.current.position.x - camera.position.x) < 3.5 &&
      Math.abs(coneRef.current.position.z - camera.position.z) < 3.5
    ) {
      coneRef.current.visible = true;
    } else {
      coneRef.current.visible = false;
    }
  });
  return (
    <>
      <Float
        speed={30}
        rotationIntensity={0.1}
        floatIntensity={0.01}
        floatingRange={[0, 0.1]}
      >
        <mesh
          ref={coneRef}
          position={[4.5, 2, -0.6]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive object={remote} dispose={null} />
    </>
  );
};

export default Remote;

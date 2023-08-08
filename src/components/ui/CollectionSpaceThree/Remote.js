import { Float, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { BoxGeometry, MeshBasicMaterial, CylinderGeometry } from 'three';
import * as THREE from 'three';

const Remote = ({ userId, params }) => {
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
    remote.position.set(4.4, 1.4, 1.5);
    remote.scale.set(0.03, 0.03, 0.03);

    const mesh = new THREE.Mesh(
      new BoxGeometry(1, 0.2, 0.8),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    mesh.name = 'Remote';
    mesh.position.x = remote.position.x;
    mesh.position.y = remote.position.y;
    mesh.position.z = remote.position.z;
    scene.add(mesh);
  });

  useFrame(() => {
    if (params !== userId) return;

    if (
      Math.abs(coneRef.current.position.x - camera.position.x) < 3.5 &&
      Math.abs(coneRef.current.position.z - camera.position.z) < 3.5
    ) {
      coneRef.current.visible = true;
    } else {
      coneRef.current.visible = false;
    }
  });

  if (params !== userId)
    return <primitive castShadow object={remote.clone()} dispose={null} />;
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
          position={[4.4, 2, 2]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive castShadow object={remote.clone()} dispose={null} />
    </>
  );
};

export default Remote;

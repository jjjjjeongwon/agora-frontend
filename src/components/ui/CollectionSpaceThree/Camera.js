import { Float, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { BoxGeometry, MeshBasicMaterial, CylinderGeometry } from 'three';
import * as THREE from 'three';

const Camera = () => {
  const glb = useGLTF('../models/camera/low_poly_hand_camera.glb');
  const cameraMesh = glb.scene.children[0];
  const { scene, camera } = useThree();
  const pointGeometry = new THREE.CylinderGeometry(0.14, 0, 0.3, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: 'red' });
  const coneRef = useRef();

  useEffect(() => {
    if (!cameraMesh) return;

    cameraMesh.position.x = -5;
    cameraMesh.position.y = 1.4;
    cameraMesh.position.z = 3.3;
    cameraMesh.scale.x = 0.1;
    cameraMesh.scale.y = 0.1;
    cameraMesh.scale.z = 0.1;
    cameraMesh.rotation.z = Math.PI / 2;
    const mesh = new THREE.Mesh(
      new CylinderGeometry(0.1, 0.1, 0.1, 32),

      new BoxGeometry(0.1, 0.2, 0.3),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      })
    );
    mesh.name = 'camera';

    mesh.castShadow = true;
    mesh.position.x = cameraMesh.position.x;
    mesh.position.y = cameraMesh.position.y + 0.1;
    mesh.position.z = cameraMesh.position.z;
    mesh.rotation.x = cameraMesh.rotation.x;
    mesh.rotation.y = cameraMesh.rotation.y;
    mesh.rotation.z = cameraMesh.rotation.z;
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
          position={[-5, 2, 3.3]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>{' '}
      <primitive object={cameraMesh} dispose={null} />
    </>
  );
};

export default Camera;

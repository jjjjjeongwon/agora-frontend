import { useGLTF, Float } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import {
  BoxGeometry,
  PlaneGeometry,
  MeshBasicMaterial,
  CylinderGeometry,
} from 'three';
import * as THREE from 'three';
const MusicBox = ({ userId, params }) => {
  const glb = useGLTF('../models/musicBox/phonograph.glb');
  const musicBox = glb.scene.children[0];
  const { scene, camera } = useThree();
  const pointGeometry = new THREE.CylinderGeometry(0.14, 0, 0.3, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: 'red' });

  const mesh = new THREE.Mesh(
    new BoxGeometry(2, 1, 6),
    new MeshBasicMaterial({ transparent: true, opacity: 1 })
  );

  const coneRef = useRef();

  useEffect(() => {
    if (!musicBox) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

    musicBox.position.set(-4.75, 1, -1.12);
    musicBox.scale.set(0.5, 0.5, 0.5);
    musicBox.rotation.z = -Math.PI / 2;

    // const mesh = new THREE.Mesh(
    //   new CylinderGeometry(0.1, 0.1, 0.1, 32),
    //   new BoxGeometry(2, 1, 6),
    //   new MeshBasicMaterial({ transparent: true, opacity: 0 })
    // );
    // const upMesh = new THREE.Mesh(
    //   new PlaneGeometry(2, 6),
    //   new MeshBasicMaterial({
    //     transparent: true,
    //     opacity: 0,
    //     color: 'white',
    //     side: THREE.DoubleSide,
    //   })
    // );
    // upMesh.receiveShadow = true;
    // mesh.castShadow = true;
    // mesh.position.x = musicBox.position.x + 1;
    // mesh.position.y = musicBox.position.y + 1;
    // mesh.position.z = musicBox.position.z + 1;

    // upMesh.position.x = -4;
    // upMesh.position.y = 1.854;
    // upMesh.position.z = -2;
    // upMesh.rotation.x = Math.PI / 2;
    // scene.add(mesh, upMesh);
  }, []);

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
    return <primitive castShadow object={musicBox.clone()} dispose={null} />;

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
          position={[-4.8, 3.3, -1.2]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive castShadow object={musicBox.clone()} dispose={null} />
    </>
  );
};

export default MusicBox;

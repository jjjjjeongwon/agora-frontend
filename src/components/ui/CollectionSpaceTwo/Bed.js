import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';
const Bed = () => {
  const glb = useGLTF('../models/bed/cartoon_bed.glb');
  const { scene } = useThree();
  const bed = glb.scene.children[0];
  useEffect(() => {
    if (!bed) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    // bed.position.y = 0;
    bed.position.set(-2.5, 0, -3.5);
    // bed.position.set(0, 0, 0);
    bed.rotation.z = Math.PI / 2;
    bed.scale.x = 70;
    bed.scale.y = 70;
    bed.scale.z = 70;
    const mesh = new THREE.Mesh(
      new BoxGeometry(5, 1, 3),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    const upMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: 'white',
        side: THREE.DoubleSide,
      })
    );

    upMesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.position.x = bed.position.x;
    mesh.position.y = bed.position.y + 1;
    mesh.position.z = bed.position.z + 0.4;
    upMesh.position.x = bed.position.x;
    upMesh.position.y = bed.position.y + 1.17;
    upMesh.position.z = bed.position.z;
    upMesh.rotation.x = -Math.PI / 2;

    scene.add(mesh, upMesh);
  }, []);

  return <primitive castShadow object={bed} dispose={null} />;
};

export default Bed;

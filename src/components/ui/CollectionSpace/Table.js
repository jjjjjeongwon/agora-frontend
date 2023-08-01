import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';
const Table = () => {
  const glb = useGLTF('../models/table/desk_low-poly.glb');
  const table = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!table) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    // table.position.y = 0;
    table.position.set(-4.2, 0, -2);
    // table.rotation.z = Math.PI * 1.5;
    table.scale.x = 0.01;
    table.scale.y = 0.01;
    table.scale.z = 0.009;
    const mesh = new THREE.Mesh(
      new BoxGeometry(2, 1, 6),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );

    mesh.castShadow = true;
    mesh.position.x = table.position.x + 1;
    mesh.position.y = table.position.y + 1;
    mesh.position.z = table.position.z + 1;
    scene.add(mesh);
  }, []);

  return <primitive castShadow object={table} dispose={null} />;
};

export default Table;

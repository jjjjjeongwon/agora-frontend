import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { CylinderGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Piano = () => {
  const glb = useGLTF("../models/piano/low_poly_piano.glb");
  const piano = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!piano) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    piano.position.x = 3.7;
    piano.position.y = 0;
    piano.position.z = -1.15;
    piano.scale.x = 0.5;
    piano.scale.y = 0.4;
    piano.scale.z = 0.5;
    const mesh = new THREE.Mesh(
      new CylinderGeometry(0.05, 0.05, 0.05, 32),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: "white",
        side: THREE.DoubleSide,
      })
    );
    mesh.castShadow = true;

    mesh.position.x = piano.position.x;
    mesh.position.y = piano.position.y + 0.1;
    mesh.position.z = piano.position.z;
    mesh.rotation.x = piano.rotation.x;
    mesh.rotation.y = piano.rotation.y;
    mesh.rotation.z = piano.rotation.z;
    scene.add(mesh);
  });
  return <primitive object={piano} dispose={null} />;
};

export default Piano;

import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { CylinderGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Closet = () => {
  const glb = useGLTF("../models/closet/closet.glb");
  const closet = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!closet) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    closet.position.x = -2;
    closet.position.y = -0.6;
    closet.position.z = -5;
    closet.scale.x = 0.17;
    closet.scale.y = 0.17;
    closet.scale.z = 0.17;
    closet.rotation.z = Math.PI;
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

    mesh.position.x = closet.position.x;
    mesh.position.y = closet.position.y + 0.1;
    mesh.position.z = closet.position.z;
    mesh.rotation.x = closet.rotation.x;
    mesh.rotation.y = closet.rotation.y;
    mesh.rotation.z = closet.rotation.z;
    scene.add(mesh);
  });
  return <primitive object={closet} dispose={null} />;
};

export default Closet;

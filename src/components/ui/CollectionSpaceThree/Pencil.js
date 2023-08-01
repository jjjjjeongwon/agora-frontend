import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { CylinderGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Pencil = () => {
  const glb = useGLTF("../models/pencil/cup_with_pencils.glb");
  const pencil = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!pencil) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    pencil.position.x = -2.5;
    pencil.position.y = 1.84;
    pencil.position.z = 4;
    pencil.scale.x = 0.17;
    pencil.scale.y = 0.17;
    pencil.scale.z = 0.17;
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

    mesh.position.x = pencil.position.x;
    mesh.position.y = pencil.position.y + 0.1;
    mesh.position.z = pencil.position.z;
    mesh.rotation.x = pencil.rotation.x;
    mesh.rotation.y = pencil.rotation.y;
    mesh.rotation.z = pencil.rotation.z;
    scene.add(mesh);
  });
  return <primitive object={pencil} dispose={null} />;
};

export default Pencil;

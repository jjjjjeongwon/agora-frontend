import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { CylinderGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Mirror = () => {
  const glb = useGLTF(
    "../models/mirror/stylized_low_poly_wooden_full_length_mirror.glb"
  );
  const mirror = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!mirror) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    mirror.position.x = 1;
    mirror.position.y = 1;
    mirror.position.z = 1;
    mirror.scale.x = 1;
    mirror.scale.y = 1;
    mirror.scale.z = 1;
    mirror.rotation.z = Math.PI;
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

    mesh.position.x = mirror.position.x;
    mesh.position.y = mirror.position.y + 0.1;
    mesh.position.z = mirror.position.z;
    mesh.rotation.x = mirror.rotation.x;
    mesh.rotation.y = mirror.rotation.y;
    mesh.rotation.z = mirror.rotation.z;
    scene.add(mesh);
  });
  return <primitive object={mirror} dispose={null} />;
};

export default Mirror;

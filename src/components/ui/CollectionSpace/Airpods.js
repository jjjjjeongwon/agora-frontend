import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { CylinderGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Airpods = () => {
  const glb = useGLTF("../models/airpods/airpods_low_poly.glb");
  const airpods = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!airpods) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    airpods.position.set(-3.5, 1.9, -3.3);
    airpods.rotation.set(0, -Math.PI * (3 / 4), Math.PI);
    airpods.scale.set(0.1, 0.1, 0.1);

    const mesh = new THREE.Mesh(
      new CylinderGeometry(0.1, 0.1, 0.2, 32),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: "white",
        side: THREE.DoubleSide,
      })
    );
    mesh.name = "airpods";
    mesh.castShadow = true;
    mesh.position.set(-3.3, 1.9, -4.4);
    scene.add(mesh);
  });
  return <primitive object={airpods} dispose={null} />;
};

export default Airpods;

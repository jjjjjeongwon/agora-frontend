import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Plant = () => {
  const glb = useGLTF("../models/plant/low-poly_plant.glb");
  const plant = glb.scene.children[0];
  const { scene } = useThree();
  useEffect(() => {
    if (!plant) return;

    plant.position.x = 3.2;
    plant.position.y = 0;
    plant.position.z = 4.5;
    plant.scale.x = 8;
    plant.scale.y = 8;
    plant.scale.z = 8;
    plant.rotation.z = -(Math.PI / 2);
    // plant.rotation.z = Math.PI / 2;
    const mesh = new THREE.Mesh(
      new BoxGeometry(0.1, 0.2, 0.3),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      })
    );
    mesh.castShadow = true;
    mesh.position.x = plant.position.x;
    mesh.position.y = plant.position.y + 0.1;
    mesh.position.z = plant.position.z;
    mesh.rotation.x = plant.rotation.x;
    mesh.rotation.y = plant.rotation.y;
    mesh.rotation.z = plant.rotation.z;
    scene.add(mesh);
  });
  return <primitive object={plant} dispose={null} />;
};

export default Plant;

import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, PlaneGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";
const BedsideTable = () => {
  const glb = useGLTF("../models/table/low_poly_dining_table.glb");
  const bedsideTable = glb.scene.children[0];
  const { scene } = useThree();
  const mesh = new THREE.Mesh(
    new BoxGeometry(2, 1, 6),
    new MeshBasicMaterial({ transparent: true, opacity: 1 })
  );
  useEffect(() => {
    if (!bedsideTable) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    // bedsideTable.position.y = 0;
    bedsideTable.position.set(-4.75, -0.2, -1.12);
    // bedsideTable.rotation.z = Math.PI * 1.5;
    bedsideTable.scale.x = 0.002;
    bedsideTable.scale.y = 0.004;
    bedsideTable.scale.z = 0.004;
    const mesh = new THREE.Mesh(
      new BoxGeometry(2, 1, 6),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    const upMesh = new THREE.Mesh(
      new PlaneGeometry(2, 6),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: "white",
        side: THREE.DoubleSide,
      })
    );
    upMesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.position.x = bedsideTable.position.x + 1;
    mesh.position.y = bedsideTable.position.y + 1;
    mesh.position.z = bedsideTable.position.z + 1;

    upMesh.position.x = -4;
    upMesh.position.y = 1.854;
    upMesh.position.z = -2;
    upMesh.rotation.x = Math.PI / 2;
    scene.add(mesh, upMesh);
  }, []);

  return <primitive castShadow object={bedsideTable} dispose={null} />;
};

export default BedsideTable;

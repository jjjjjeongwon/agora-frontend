import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";
const TvTable = () => {
  const glb = useGLTF("../models/table/white_tv_table.glb");
  const tvTable = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!tvTable) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    // tvTable.position.y = 0;
    tvTable.position.set(4.4, 0.5, 2.2);
    tvTable.scale.x = 0.025;
    tvTable.scale.y = 0.03;
    tvTable.scale.z = 0.045;
    tvTable.rotation.x = -Math.PI / 2;

    // tvTable.rotation.y = Math.PI / 2;
    const mesh = new THREE.Mesh(
      new BoxGeometry(2, 1, 4),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );

    const upMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 3),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: "white",
        side: THREE.DoubleSide,
      })
    );

    upMesh.position.set(
      tvTable.position.x,
      tvTable.position.y + 1.7,
      tvTable.position.z
    );
    upMesh.rotation.x = Math.PI / 2;

    upMesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.position.x = tvTable.position.x + 1;
    mesh.position.y = tvTable.position.y + 2;
    mesh.position.z = tvTable.position.z + 1;
    scene.add(mesh, upMesh);
  }, []);

  return <primitive castShadow object={tvTable} dispose={null} />;
};

export default TvTable;

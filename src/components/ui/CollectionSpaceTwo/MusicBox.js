import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, PlaneGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";
const MusicBox = () => {
  const glb = useGLTF("../models/musicBox/phonograph.glb");
  const musicBox = glb.scene.children[0];
  const { scene } = useThree();
  const mesh = new THREE.Mesh(
    new BoxGeometry(2, 1, 6),
    new MeshBasicMaterial({ transparent: true, opacity: 1 })
  );
  useEffect(() => {
    if (!musicBox) return;

    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

    musicBox.position.set(-4.75, 1, -1.12);
    musicBox.scale.set(0.5, 0.5, 0.5);
    musicBox.rotation.z = -Math.PI / 2;

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
    mesh.position.x = musicBox.position.x + 1;
    mesh.position.y = musicBox.position.y + 1;
    mesh.position.z = musicBox.position.z + 1;

    upMesh.position.x = -4;
    upMesh.position.y = 1.854;
    upMesh.position.z = -2;
    upMesh.rotation.x = Math.PI / 2;
    scene.add(mesh, upMesh);
  }, []);

  return <primitive castShadow object={musicBox} dispose={null} />;
};

export default MusicBox;

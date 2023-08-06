import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const PhotoBook = () => {
  const glb = useGLTF("../models/photoBook/book_low_poly.glb");
  const photoBook = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!photoBook) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    photoBook.position.set(-11.1, -20.2, -9.72);
    photoBook.rotation.x = -Math.PI * (5 / 6);

    const mesh = new THREE.Mesh(
      new BoxGeometry(1, 0.5, 0.4),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: "white",
        side: THREE.DoubleSide,
      })
    );
    mesh.name = "photoBook";
    mesh.castShadow = true;
    mesh.position.set(-5.1, 1.2, 2.4);
    scene.add(mesh);
  });
  return <primitive object={photoBook} dispose={null} />;
};

export default PhotoBook;

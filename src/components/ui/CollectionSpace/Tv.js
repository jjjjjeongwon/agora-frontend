import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Tv = ({ onLoad = () => {} }) => {
  const glb = useGLTF("../models/tv/screen_led.glb");
  const tv = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (tv) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      // tv.position.y = 0;
      tv.position.set(5.4, 3.5, 2.5);
      tv.scale.x = 0.6;
      tv.scale.z = 0.7;
      tv.rotation.x = Math.PI / 2;
      tv.rotation.y = Math.PI;
      tv.rotation.z = Math.PI / 2;
      const mesh = new THREE.Mesh(
        new BoxGeometry(0.5, 3, 5),
        new MeshBasicMaterial({ transparent: true, opacity: 0 })
      );
      mesh.position.x = tv.position.x + 1.5;
      mesh.position.y = tv.position.y;
      mesh.position.z = tv.position.z + 2;
      scene.add(mesh);

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [tv, onLoad]);

  if (!tv) return null;

  return (
    <primitive name={"tv"} castShadow object={tv.clone()} dispose={null} />
  );
};

export default Tv;

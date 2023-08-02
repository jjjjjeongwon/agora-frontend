import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Remote = () => {
  const glb = useGLTF("../models/remote/tv_remote.glb");
  const remote = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!remote) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
    remote.position.set(4.4, 1.4, 2);
    remote.scale.set(0.03, 0.03, 0.03);

    const mesh = new THREE.Mesh(
      new BoxGeometry(0.2, 0.2, 0.6),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );

    mesh.castShadow = true;
    mesh.position.x = remote.position.x;
    mesh.position.y = remote.position.y;
    mesh.position.z = remote.position.z;
    scene.add(mesh);
  });
  return <primitive object={remote} dispose={null} />;
};

export default Remote;

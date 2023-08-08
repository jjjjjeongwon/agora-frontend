import { useGLTF, Float } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { CylinderGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Pencil = ({ userId, params, onLoad = () => {} }) => {
  const glb = useGLTF("../models/pencil/cup_with_pencils.glb");
  const pencil = glb.scene.children[0];
  const { scene, camera } = useThree();
  const pointGeometry = new THREE.CylinderGeometry(0.14, 0, 0.3, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: "red" });

  const coneRef = useRef();

  useEffect(() => {
    if (pencil) {
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
        new CylinderGeometry(0.2, 0.2, 0.5, 32),
        new MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          color: "white",
          side: THREE.DoubleSide,
        })
      );
      mesh.name = "pencil";

      mesh.position.x = pencil.position.x;
      mesh.position.y = pencil.position.y + 0.1;
      mesh.position.z = pencil.position.z;
      scene.add(mesh);

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [pencil, onLoad]);

  useFrame(() => {
    if (params === userId) return;

    if (
      Math.abs(coneRef.current.position.x - camera.position.x) < 3.5 &&
      Math.abs(coneRef.current.position.z - camera.position.z) < 3.5
    ) {
      coneRef.current.visible = true;
    } else {
      coneRef.current.visible = false;
    }
  });

  if (!pencil) return null;

  if (params === userId)
    return <primitive castShadow object={pencil.clone()} dispose={null} />;
  return (
    <>
      <Float
        speed={30}
        rotationIntensity={0.1}
        floatIntensity={0.01}
        floatingRange={[0, 0.1]}
      >
        <mesh
          ref={coneRef}
          position={[-2.4, 2.8, 4.2]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive castShadow object={pencil.clone()} dispose={null} />
    </>
  );
};

export default Pencil;

import { useGLTF, Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Pencil = ({ userId, params, onLoad = () => {} }) => {
  const glb = useGLTF("../models/pencil/cartoon_notebook__pencil.glb");
  const pencil = glb.scene.children[0];
  const { scene, camera } = useThree();
  const coneRef = useRef();

  const pointGeometry = new THREE.CylinderGeometry(0.12, 0, 0.28, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: "red" });

  useEffect(() => {
    if (pencil) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      pencil.position.set(-4.2, 1.25, -5);
      pencil.scale.x = 0.004;
      pencil.scale.y = 0.004;
      pencil.scale.z = 0.004;
      const mesh = new THREE.Mesh(
        new BoxGeometry(0.3, 0.3, 0.3),
        new MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          color: "white",
          side: THREE.DoubleSide,
        })
      );
      mesh.name = "pencil";

      mesh.position.x = pencil.position.x;
      mesh.position.y = pencil.position.y;
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
          position={[-4.2, 1.7, -5]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive castShadow object={pencil.clone()} dispose={null} />
    </>
  );
};

export default Pencil;

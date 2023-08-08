import { useGLTF, Float } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { BoxGeometry, MeshBasicMaterial } from "three";
import * as THREE from "three";

const Camera = ({ userId, params, onLoad = () => {} }) => {
  const glb = useGLTF("../models/camera/low_poly_hand_camera.glb");
  const cameraMesh = glb.scene.children[0];
  const { scene, camera } = useThree();
  const pointGeometry = new THREE.CylinderGeometry(0.14, 0, 0.3, 32);
  const pointMaterial = new THREE.MeshStandardMaterial({ color: "red" });

  const coneRef = useRef();

  useEffect(() => {
    if (cameraMesh) {
      cameraMesh.position.x = -5;
      cameraMesh.position.y = 1.85;
      cameraMesh.position.z = 3.3;
      cameraMesh.scale.x = 0.1;
      cameraMesh.scale.y = 0.1;
      cameraMesh.scale.z = 0.1;
      cameraMesh.rotation.z = Math.PI / 2;
      const mesh = new THREE.Mesh(
        new BoxGeometry(0.4, 0.3, 0.4),
        new MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        })
      );
      mesh.name = "camera";

      mesh.position.x = cameraMesh.position.x;
      mesh.position.y = cameraMesh.position.y + 0.1;
      mesh.position.z = cameraMesh.position.z;
      mesh.rotation.x = cameraMesh.rotation.x;
      mesh.rotation.y = cameraMesh.rotation.y;
      mesh.rotation.z = cameraMesh.rotation.z;
      scene.add(mesh);

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [cameraMesh, onLoad]);

  useFrame(() => {
    if (params !== userId) return;
    if (
      Math.abs(coneRef.current.position.x - camera.position.x) < 3.5 &&
      Math.abs(coneRef.current.position.z - camera.position.z) < 3.5
    ) {
      coneRef.current.visible = true;
    } else {
      coneRef.current.visible = false;
    }
  });

  if (!cameraMesh) return null;

  if (params !== userId)
    return (
      <primitive
        castShadow
        receiveShadow
        object={cameraMesh.clone()}
        dispose={null}
      />
    );

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
          position={[-5, 2.5, 3.3]}
          geometry={pointGeometry}
          material={pointMaterial}
        />
      </Float>
      <primitive
        castShadow
        receiveShadow
        object={cameraMesh.clone()}
        dispose={null}
      />
    </>
  );
};

export default Camera;

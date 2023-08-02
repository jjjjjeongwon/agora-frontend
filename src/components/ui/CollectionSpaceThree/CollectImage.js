import React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

const CollectImage = () => {
  const image = useLoader(THREE.TextureLoader, "../images/test.jpeg");
  const geometry = new THREE.PlaneGeometry(0.85, 1.25);
  const material = new THREE.MeshStandardMaterial({
    map: image,
    image: THREE.DoubleSide,
  });
  return (
    <>
      <mesh
        position={[5.3, 4.0, -3]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[3, 1.5, 1]}
        geometry={geometry}
        material={material}
      ></mesh>
      <mesh
        position={[-5.38, 2.9, 0.8]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1, 1]}
        geometry={geometry}
        material={material}
      ></mesh>
      <mesh
        position={[-5.38, 4.3, 3]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1, 1]}
        geometry={geometry}
        material={material}
      ></mesh>
      <mesh
        position={[-5.38, 3.5, -2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1.5, 2, 1]}
        geometry={geometry}
        material={material}
      ></mesh>
      <mesh
        position={[-3.7, 4, 5.4]}
        rotation={[0, Math.PI, 0]}
        scale={[4, 1.5, 1]}
        geometry={geometry}
        material={material}
      ></mesh>
    </>
  );
};

export default CollectImage;

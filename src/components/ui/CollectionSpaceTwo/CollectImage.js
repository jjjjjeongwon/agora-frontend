import React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

const CollectImage = () => {
  const image = useLoader(THREE.TextureLoader, "../images/room1_4.png");
  const image2 = useLoader(THREE.TextureLoader, "../images/room2_1.png");
  const image3 = useLoader(THREE.TextureLoader, "../images/room2_2.png");
  const image4 = useLoader(THREE.TextureLoader, "../images/room3_1.png");
  const image5 = useLoader(THREE.TextureLoader, "../images/room1_2.png");
  const geometry = new THREE.PlaneGeometry(0.85, 1.25);
  const material = new THREE.MeshStandardMaterial({
    map: image,
    side: THREE.DoubleSide,
  });
  const material2 = new THREE.MeshStandardMaterial({
    map: image2,
    side: THREE.DoubleSide,
  });
  const material3 = new THREE.MeshStandardMaterial({
    map: image3,
    side: THREE.DoubleSide,
  });
  const material4 = new THREE.MeshStandardMaterial({
    map: image4,
    side: THREE.DoubleSide,
  });
  const material5 = new THREE.MeshStandardMaterial({
    map: image5,
    side: THREE.DoubleSide,
  });

  return (
    <>
      {/* 침대쪽 */}
      <mesh
        name="image_1"
        position={[-5.38, 3.9, -3.05]}
        rotation={[0, Math.PI / 2, 0]}
        geometry={geometry}
        material={material}
      ></mesh>

      {/* 침대 반대쪽 */}
      <mesh
        name="image_2"
        position={[5.367, 3.3, -3.1]}
        rotation={[0, -Math.PI / 2, 0]}
        geometry={geometry}
        scale={[3, 2.4, 1]}
        material={material2}
      ></mesh>

      {/* 침대 옆 */}
      <mesh
        name="image_3"
        position={[-3.05, 4.2, 5.382]}
        rotation={[0, 0, 0]}
        scale={[2.1, 1.6, 1]}
        geometry={geometry}
        material={material3}
      ></mesh>
      <mesh
        name="image_4"
        position={[-5.38, 4, -0.1]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[2.4, 2, 1]}
        geometry={geometry}
        material={material4}
      ></mesh>
      <mesh
        name="image_5"
        position={[-5.382, 4.2, 3.425]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1.965, 1, 1]}
        geometry={geometry}
        material={material5}
      ></mesh>
    </>
  );
};

export default CollectImage;

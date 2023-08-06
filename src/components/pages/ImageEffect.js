import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useTexture, OrbitControls } from "@react-three/drei";
import gsap from "gsap";

const ImagePanel = ({ imageSrc, x, y, z }) => {
  const meshRef = useRef();
  const texture = useTexture(imageSrc);

  return (
    <mesh ref={meshRef} position={[x, y, z]} lookAt={[0, 0, 0]}>
      <planeGeometry args={[0.3, 0.3]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default function ImageEffect() {
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 8, 8), []);
  const spherePositionArray = sphereGeometry.attributes.position.array;

  const imagePanelProps = useMemo(() => {
    const props = [];
    for (let i = 0; i < spherePositionArray.length; i += 3) {
      props.push({
        imageSrc: `/images/0${Math.ceil(Math.random() * 5)}.jpg`,
        x: spherePositionArray[i],
        y: spherePositionArray[i + 1],
        z: spherePositionArray[i + 2],
      });
    }
    return props;
  }, [spherePositionArray]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#000",
      }}
    >
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.5, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 2]} />
        {imagePanelProps.map((props, index) => (
          <ImagePanel key={index} {...props} />
        ))}
        <OrbitControls enableDamping />
      </Canvas>
      <div className="btns" style={{ position: "absolute", top: 10, left: 10 }}>
        <button data-type="random">Random</button>
        <button data-type="sphere" style={{ marginLeft: 10 }}>
          Sphere
        </button>
      </div>
    </div>
  );
}

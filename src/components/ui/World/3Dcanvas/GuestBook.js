import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GuestBook = () => {
  const meshRef = useRef();
  const textRef = useRef();
  const texCanvas = document.createElement('canvas');
  const texContext = texCanvas.getContext('2d');
  texCanvas.width = 200;
  texCanvas.height = 200;
  const canvasTexture = new THREE.CanvasTexture(texCanvas);

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
  });

  useFrame(() => {
    // Draw on the canvas
    texContext.clearRect(0, 0, texCanvas.width, texCanvas.height);
    texContext.fillStyle = 'white';
    texContext.font = 'bold 50px sans-serif';
    texContext.fillText('UUJEEN', 0, 50);

    //   // Update the texture
    canvasTexture.needsUpdate = true;
  }, []);
  return (
    <>
      <mesh
        castShadow={false}
        ref={meshRef}
        geometry={geometry}
        material={material}
        rotation={[0, Math.PI / 2, 0]}
        position={[-11, 1, -12]}
      ></mesh>
    </>
  );
};

export default GuestBook;

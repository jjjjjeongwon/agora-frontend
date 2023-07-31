import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GuestBook = () => {
  const meshRef = useRef();
  const textRef = useRef();
  const texCanvas = document.createElement('canvas');
  const texContext = texCanvas.getContext('2d');
  texCanvas.width = 500;
  texCanvas.height = 500;
  const canvasTexture = new THREE.CanvasTexture(texCanvas);

  const geometry = new THREE.PlaneGeometry(3, 3);
  const material = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    // side: THREE.DoubleSide,
  });

  useFrame(() => {
    // Draw on the canvas
    texContext.clearRect(0, 0, texCanvas.width, texCanvas.height);
    texContext.fillStyle = 'white';
    texContext.font = 'bold 50px sans-serif';
    texContext.fillText('Oh2do 화이팅!', 50, 50);

    //   // Update the texture
    canvasTexture.needsUpdate = true;
  }, []);
  return (
    <>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        position={[0, 2, 0]}
      ></mesh>
    </>
  );
};

export default GuestBook;

import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
const VisitText = () => {
  const meshRef = useRef();
  const textRef = useRef();
  const texCanvas = document.createElement('canvas');
  const texContext = texCanvas.getContext('2d');
  texCanvas.width = 100;
  texCanvas.height = 100;
  const canvasTexture = new THREE.CanvasTexture(texCanvas);

  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    transparent: true,
    // opacity: 0.5,
    side: THREE.DoubleSide,
  });

  useFrame(() => {
    // Draw on the canvas
    texContext.clearRect(0, 0, texCanvas.width, texCanvas.height);
    texContext.fillStyle = 'yellow';
    texContext.fillRect(0, 0, texCanvas.width, texCanvas.height);
    texContext.fillStyle = 'black';
    texContext.font = 'bold 14px sans-serif';
    texContext.fillText('너무 좋아요!!!:)', 5, 50);

    //   // Update the texture
    canvasTexture.needsUpdate = true;
  }, []);
  return (
    <>
      <mesh
        name="visit_text"
        ref={meshRef}
        geometry={geometry}
        material={material}
        position={[-2.5, 3.5, -5.48]}
      ></mesh>
    </>
  );
};

export default VisitText;

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
  const texCanvas2 = document.createElement('canvas');
  const texContext2 = texCanvas2.getContext('2d');
  texCanvas2.width = 100;
  texCanvas2.height = 100;
  const texCanvas3 = document.createElement('canvas');
  const texContext3 = texCanvas3.getContext('2d');
  texCanvas3.width = 100;
  texCanvas3.height = 100;
  const texCanvas4 = document.createElement('canvas');
  const texContext4 = texCanvas4.getContext('2d');
  texCanvas4.width = 100;
  texCanvas4.height = 100;
  const texCanvas5 = document.createElement('canvas');
  const texContext5 = texCanvas5.getContext('2d');
  texCanvas5.width = 100;
  texCanvas5.height = 100;

  const canvasTexture = new THREE.CanvasTexture(texCanvas);
  const canvasTexture2 = new THREE.CanvasTexture(texCanvas2);
  const canvasTexture3 = new THREE.CanvasTexture(texCanvas3);
  const canvasTexture4 = new THREE.CanvasTexture(texCanvas4);
  const canvasTexture5 = new THREE.CanvasTexture(texCanvas5);

  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    transparent: true,
    // opacity: 0.5,
    side: THREE.DoubleSide,
  });
  const material2 = new THREE.MeshBasicMaterial({
    map: canvasTexture2,
    transparent: true,
    // opacity: 0.5,
    side: THREE.DoubleSide,
  });
  const material3 = new THREE.MeshBasicMaterial({
    map: canvasTexture3,
    transparent: true,
    // opacity: 0.5,
    side: THREE.DoubleSide,
  });
  const material4 = new THREE.MeshBasicMaterial({
    map: canvasTexture4,
    transparent: true,
    // opacity: 0.5,
    side: THREE.DoubleSide,
  });
  const material5 = new THREE.MeshBasicMaterial({
    map: canvasTexture5,
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
    texContext.fillText('너무 좋아요!', 5, 50);

    texContext2.clearRect(0, 0, texCanvas2.width, texCanvas2.height);
    texContext2.fillStyle = 'yellow';
    texContext2.fillRect(0, 0, texCanvas2.width, texCanvas2.height);
    texContext2.fillStyle = 'black';
    texContext2.font = 'bold 14px sans-serif';
    texContext2.fillText('퍼가요~', 5, 50);

    texContext3.clearRect(0, 0, texCanvas3.width, texCanvas3.height);
    texContext3.fillStyle = 'yellow';
    texContext3.fillRect(0, 0, texCanvas3.width, texCanvas3.height);
    texContext3.fillStyle = 'black';
    texContext3.font = 'bold 14px sans-serif';
    texContext3.fillText('이뻐요!', 5, 50);

    texContext4.clearRect(0, 0, texCanvas4.width, texCanvas4.height);
    texContext4.fillStyle = 'yellow';
    texContext4.fillRect(0, 0, texCanvas4.width, texCanvas4.height);
    texContext4.fillStyle = 'black';
    texContext4.font = 'bold 14px sans-serif';
    texContext4.fillText('팬이에요~', 5, 50);

    texContext5.clearRect(0, 0, texCanvas5.width, texCanvas5.height);
    texContext5.fillStyle = 'yellow';
    texContext5.fillRect(0, 0, texCanvas5.width, texCanvas5.height);
    texContext5.fillStyle = 'black';
    texContext5.font = 'bold 14px sans-serif';
    texContext5.fillText('너무 별로에요!', 5, 50);

    //   // Update the texture
    canvasTexture.needsUpdate = true;
    canvasTexture2.needsUpdate = true;
    canvasTexture3.needsUpdate = true;
    canvasTexture4.needsUpdate = true;
    canvasTexture5.needsUpdate = true;
  }, []);
  return (
    <>
      <mesh
        name="visit_text"
        ref={meshRef}
        geometry={geometry}
        material={material}
        position={[-4, 3, -5.48]}
      ></mesh>
      <mesh
        name="visit_text"
        ref={meshRef}
        geometry={geometry}
        material={material3}
        position={[-2, 5, -5.48]}
      ></mesh>
    </>
  );
};

export default VisitText;

/*
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const texts = ["너무 좋아요!!!", "너무 싫어요!!!", "너무 좋아요@@@", "너무 싫어요###", "너무 별로에요!!!", 추가 텍스트 ];

const VisitText = () => {
  const meshRef = useRef();
  const textRef = useRef();

  const canvases = texts.map(() => document.createElement("canvas"));
  const contexts = canvases.map(canvas => {
    canvas.width = 100;
    canvas.height = 100;
    return canvas.getContext("2d");
  });

  const textures = canvases.map(canvas => new THREE.CanvasTexture(canvas));

  const materials = textures.map(texture => 
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    })
  );

  const geometry = new THREE.PlaneGeometry(1, 1);

  useFrame(() => {
    contexts.forEach((context, i) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = "yellow";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = "black";
      context.font = "bold 14px sans-serif";
      context.fillText(texts[i], 5, 50);

      textures[i].needsUpdate = true;
    });
  }, []);

  return (
    <>
      {materials.map((material, i) => 
        <mesh
          key={i}
          name={`visit_text_${i}`}
          ref={meshRef}
          geometry={geometry}
          material={material}
          position={[-4 + i, 3 + (i % 2) * 0.5, -5.48]}
        />
      )}
    </>
  );
};

export default VisitText; 
*/

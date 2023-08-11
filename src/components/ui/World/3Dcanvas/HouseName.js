// import React, { useEffect, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import { Float } from '@react-three/drei';

// const HouseName = ({friendsInfo}) => {
//   const meshRef = useRef();

//   const texCanvas = document.createElement('canvas');
//   const texCanvas2 = document.createElement('canvas');
//   const texCanvas3 = document.createElement('canvas');
//   const texCanvas4 = document.createElement('canvas');
//   const texCanvas5 = document.createElement('canvas');
//   const texCanvas6 = document.createElement('canvas');

//   const texContext = texCanvas.getContext('2d');
//   const texContext2 = texCanvas2.getContext('2d');
//   const texContext3 = texCanvas3.getContext('2d');
//   const texContext4 = texCanvas4.getContext('2d');
//   const texContext5 = texCanvas5.getContext('2d');
//   const texContext6 = texCanvas6.getContext('2d');

//   texCanvas.width = 500;
//   texCanvas.height = 500;
//   texCanvas2.width = 500;
//   texCanvas2.height = 500;
//   texCanvas3.width = 500;
//   texCanvas3.height = 500;
//   texCanvas4.width = 500;
//   texCanvas4.height = 500;
//   texCanvas5.width = 500;
//   texCanvas5.height = 500;
//   texCanvas6.width = 500;
//   texCanvas6.height = 500;

//   const canvasTexture = new THREE.CanvasTexture(texCanvas);
//   const canvasTexture2 = new THREE.CanvasTexture(texCanvas2);
//   const canvasTexture3 = new THREE.CanvasTexture(texCanvas3);
//   const canvasTexture4 = new THREE.CanvasTexture(texCanvas4);
//   const canvasTexture5 = new THREE.CanvasTexture(texCanvas5);
//   const canvasTexture6 = new THREE.CanvasTexture(texCanvas6);

//   const geometry = new THREE.PlaneGeometry(5, 5);
//   const material = new THREE.MeshBasicMaterial({
//     map: canvasTexture,
//     transparent: true,
//     opacity: 1,
//     side: THREE.DoubleSide,
//   });
//   const material2 = new THREE.MeshBasicMaterial({
//     map: canvasTexture2,
//     transparent: true,
//     opacity: 1,
//     side: THREE.DoubleSide,
//   });
//   const material3 = new THREE.MeshBasicMaterial({
//     map: canvasTexture3,
//     transparent: true,
//     opacity: 1,
//     side: THREE.DoubleSide,
//   });
//   const material4 = new THREE.MeshBasicMaterial({
//     map: canvasTexture4,
//     transparent: true,
//     opacity: 1,
//     side: THREE.DoubleSide,
//   });
//   const material5 = new THREE.MeshBasicMaterial({
//     map: canvasTexture5,
//     transparent: true,
//     opacity: 1,
//     side: THREE.DoubleSide,
//   });
//   const material6 = new THREE.MeshBasicMaterial({
//     map: canvasTexture6,
//     transparent: true,
//     opacity: 1,
//     side: THREE.DoubleSide,
//   });

//   useFrame(() => {
//     // Draw on the canvas
//     texContext.clearRect(0, 0, texCanvas.width, texCanvas.height);
//     texContext.fillStyle = 'white';
//     texContext.font = '30px luckiest guy';
//     texContext.fillText('UUJEEN', 0, 200);
//     texContext2.clearRect(0, 0, texCanvas.width, texCanvas2.height);
//     texContext2.fillStyle = 'white';
//     texContext2.font = '30px luckiest guy';
//     texContext2.fillText('닉네임', 0, 200);
//     texContext3.clearRect(0, 0, texCanvas.width, texCanvas3.height);
//     texContext3.fillStyle = 'white';
//     texContext3.font = '30px luckiest guy';
//     texContext3.fillText('성환', 0, 200);
//     texContext4.clearRect(0, 0, texCanvas.width, texCanvas4.height);
//     texContext4.fillStyle = 'white';
//     texContext4.font = '30px luckiest guy';
//     texContext4.fillText('상주', 0, 200);
//     texContext5.clearRect(0, 0, texCanvas.width, texCanvas5.height);
//     texContext5.fillStyle = 'white';
//     texContext5.font = '30px luckiest guy';
//     texContext5.fillText('정원', 0, 200);
//     texContext6.clearRect(0, 0, texCanvas.width, texCanvas6.height);
//     texContext6.fillStyle = 'white';
//     texContext6.font = '30px luckiest guy';
//     texContext6.fillText('파도', 0, 200);
//   }, []);
//   return (
//     <>
//       <Float
//         speed={10}
//         rotationIntensity={0.1}
//         floatIntensity={0.01}
//         floatingRange={[0, 0.1]}
//       >
//         <mesh
//           castShadow={false}
//           ref={meshRef}
//           geometry={geometry}
//           material={material}
//           position={[5.2, 3, -7.7]}
//         />
//         <mesh
//           castShadow={false}
//           ref={meshRef}
//           geometry={geometry}
//           material={material2}
//           rotation={[0, -Math.PI / 4, 0]}
//           position={[11, 3, 0]}
//         />
//         <mesh
//           castShadow={false}
//           ref={meshRef}
//           geometry={geometry}
//           material={material3}
//           rotation={[0, Math.PI / 4, 0]}
//           position={[-8, 3, -4]}
//         />
//         <mesh
//           castShadow={false}
//           ref={meshRef}
//           geometry={geometry}
//           material={material4}
//           rotation={[0, Math.PI / 5.5, 0]}
//           position={[-2, 2.5, -6.8]}
//         />
//         <mesh
//           castShadow={false}
//           ref={meshRef}
//           geometry={geometry}
//           material={material5}
//           rotation={[0, Math.PI / 4, 0]}
//           position={[-9.7, 2, 5.5]}
//         />
//         <mesh
//           castShadow={false}
//           ref={meshRef}
//           geometry={geometry}
//           material={material6}
//           rotation={[0, Math.PI / 4, 0]}
//           position={[-15, 3, 15]}
//         />
//       </Float>
//     </>
//   );
// };

// export default HouseName;

import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const HouseName = ({ friendsInfo }) => {
  const positions = [
    [-15, 2, 15],
    [-9.7, 2, 5.5],
    [-2, 2, -6.8],
    [-8, 2, -4],
    [11, 2, 0],
    [5.2, 2, -7.7], //내집
  ];

  const rotations = [
    [0, Math.PI / 4, 0],
    [0, Math.PI / 4, 0],
    [0, Math.PI / 5.5, 0],
    [0, Math.PI / 4, 0],
    [0, -Math.PI / 4, 0],
    [0, 0, 0],
  ];

  const canvasRefs = friendsInfo?.map(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    return canvas;
  });

  useFrame(() => {
    canvasRefs?.forEach((canvas, index) => {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.font = '30px luckiest guy';
      ctx.fillText(friendsInfo[index]?.nickname || '', 0, 200);
    });
  });

  const textures = canvasRefs?.map((canvas) => new THREE.CanvasTexture(canvas));
  const materials = textures?.map((texture) => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });
  });

  const geometry = new THREE.PlaneGeometry(5, 5);

  return (
    <Float
      speed={10}
      rotationIntensity={0.1}
      floatIntensity={0.01}
      floatingRange={[0, 0.1]}
    >
      {materials?.map((material, index) => (
        <mesh
          key={index}
          castShadow={false}
          geometry={geometry}
          material={material}
          position={positions[index]}
          rotation={rotations[index]}
        />
      ))}
    </Float>
  );
};

export default HouseName;

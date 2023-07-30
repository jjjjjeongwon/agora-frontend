// // import React, { useEffect, useRef } from 'react';
// // import { useThree } from '@react-three/fiber';
// // import * as THREE from 'three';

// // const GuestBook = () => {
// //   const meshRef = useRef();
// //   const { canvas } = useThree();
// //   const textRef = useRef();
// //   useEffect(() => {
// //     const texContext = canvas.getContext('2d');
// //     texContext.fillStyle = 'white';
// //     texContext.font = 'bold 50px sans-serif';
// //     texContext.fillText('1분코딩', 200, 200);

// //     const texture = new THREE.CanvasTexture(canvas);
// //     texture.needsUpdate = true;
// //     textureRef.current = texture;
// //   }, []);
// //   return (
// //     <>
// //       <mesh ref={meshRef} position={[10, 0, 15]}>
// //         <planeGeometry args={[2, 2]} />
// //         <meshBasicMaterial map={textRef.current} />
// //       </mesh>
// //     </>
// //   );
// // };

// // export default GuestBook;

// import React, { useEffect, useRef } from 'react';
// import { useThree, useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// const GuestBook = () => {
//   const meshRef = useRef();
//   const { canvas } = useThree();
//   const textureRef = useRef();

//   useFrame(() => {
//     // Get the canvas context and draw text on it
//     if (canvas) {
//       const texContext = canvas?.getContext('2d');
//       texContext.fillStyle = 'black';
//       texContext.font = 'bold 10px sans-serif';
//       texContext.fillText('1분코딩', 1, 1);

//       // Create a Three.js texture from the canvas
//       const texture = new THREE.CanvasTexture(textureRef.current);
//       texture.needsUpdate = true;
//       textureRef.current = texture;
//     }
//   }, []);

//   return (
//     <>
//       <mesh ref={meshRef} position={[0, 2, 0]}>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshBasicMaterial map={textureRef.current} color={'orange'} />
//       </mesh>
//     </>
//   );
// };

// export default GuestBook;

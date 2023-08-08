import { Sparkles } from '@react-three/drei';

const Sparkle = () => {
  const count = 100;
  const noise = 1;
  const opacity = 3;
  const size = 10;
  const scale = [0.5, 1, 0.5];
  const speed = 10;
  return (
    <>
      <Sparkles
        color="yellow"
        position={[-10, 0.7, -4]}
        count={count}
        noise={noise}
        opacity={opacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color="yellow"
        position={[-17, 0.7, 15]}
        count={count}
        noise={noise}
        opacity={opacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color="yellow"
        position={[35, 0.7, 4]}
        count={count}
        noise={noise}
        opacity={opacity}
        size={size}
        scale={scale}
        speed={speed}
      />
    </>
  );
};
export default Sparkle;

// import React from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// const Portal = ({ count = 500, radius = 5 }) => {
//   const positions = new Float32Array(count * 3);
//   const colors = new Float32Array(count * 3);

//   const orangeColor = new THREE.Color('orange');

//   for (let i = 0; i < count; i++) {
//     const angle = 2 * Math.PI * Math.random();
//     const x = radius * Math.cos(angle);
//     const y = radius * Math.sin(angle);
//     const z = (Math.random() - 0.5) * 0.5; // This gives a small variation in depth

//     positions.set([x, y, z], i * 3);
//     colors.set([orangeColor.r, orangeColor.g, orangeColor.b], i * 3);
//   }

//   const geometry = new THREE.BufferGeometry();
//   geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//   geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//   useFrame(({ clock }) => {
//     geometry.attributes.position.needsUpdate = true;
//     const time = clock.getElapsedTime();
//     for (let i = 0; i < count; i++) {
//       const z = 0.1 * Math.sin(5 * Math.PI * (i / count + time));
//       positions[i * 3 + 2] = z;
//     }
//   });

//   return (
//     <points scale={[0.05, 0.1, 0.05]} position={[0, 5, 15]}>
//       <primitive object={geometry} />
//       <pointsMaterial size={0.05} vertexColors={true} />
//     </points>
//   );
// };

// export default Portal;

import { Sparkles } from '@react-three/drei';

const Portal = () => {
  const count = 100;
  const noise = 1;
  const baseOpacity = 1;
  const pointOpacity = 0.3;
  const size = 40;
  const scale = [0.7, 1.5, 0.7];
  const speed = 10;
  const baseColor = '#00FFFF';
  const pointColor = 'white';
  return (
    <>
      <Sparkles
        color={baseColor}
        position={[-17, 0.7, 15]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[-17, 0.7, 15]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={baseColor}
        position={[-11.7, 0.7, 5.5]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[-11.7, 0.7, 5.5]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={baseColor}
        position={[-4.2, 0.7, -6.8]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[-4.2, 0.7, -6.8]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={baseColor}
        position={[-10, 0.7, -4]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[-10, 0.7, -4]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={baseColor}
        position={[3.2, 0.7, -7.7]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[3.2, 0.7, -7.7]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={baseColor}
        position={[35, 0.7, 4]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[35, 0.7, 4]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
    </>
  );
};
export default Portal;

// import React, { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three';

// // 파티클 생성 로직
// const particleCount = 1000;
// const particles = new Float32Array(particleCount * 3);
// for (let i = 0; i < particleCount * 3; i++) {
//   particles[i] = (Math.random() - 0.5) * 2;
// }

// // 지오메트리 및 머티리얼 생성
// const geometry = new BufferGeometry();
// geometry.setAttribute('position', new Float32BufferAttribute(particles, 3));

// const material = new PointsMaterial({ color: 'yellow', size: 0.05 });

// const Portal = () => {
//   const portalRef = useRef();

//   useFrame(({ clock }) => {
//     if (portalRef.current) {
//       portalRef.current.rotation.x = clock.getElapsedTime();
//       portalRef.current.rotation.z = clock.getElapsedTime();
//     }
//   });

//   return (
//     <points
//       ref={portalRef}
//       position={[0, 1.5, 10]}
//       geometry={geometry}
//       material={material}
//     />
//   );
// };

// export default Portal;

// import React, { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import {
//   BufferGeometry,
//   Float32BufferAttribute,
//   PointsMaterial,
//   AdditiveBlending,
//   TextureLoader,
// } from 'three';
// const particleCount = 1000;
// const particles = new Float32Array(particleCount * 3);

// const torusRadius = 0.9; // 띠의 중심에서 띠의 바깥쪽까지의 거리
// const tubeRadius = 0.05; // 띠의 두께의 절반

// for (let i = 0; i < particleCount; i++) {
//   const theta = (i / particleCount) * 2 * Math.PI;
//   const phi = (Math.random() - 0.5) * Math.PI;

//   const r = torusRadius + tubeRadius * Math.sin(phi);

//   const x = r * Math.cos(theta); // x 좌표로 torus의 주 경로 설정
//   const y = r * Math.sin(theta); // y 좌표로 torus의 주 경로 설정
//   const z = tubeRadius * Math.cos(phi); // z 좌표로 띠의 두께 설정

//   particles[i * 3] = x;
//   particles[i * 3 + 1] = y;
//   particles[i * 3 + 2] = z;
// }

// const geometry = new BufferGeometry();
// geometry.setAttribute('position', new Float32BufferAttribute(particles, 3));

// const material = new PointsMaterial({
//   color: 'yellow',
//   size: 0.05,
// });

// const Portal = () => {
//   const portalRef = useRef();

//   useFrame(({ clock }) => {
//     if (portalRef.current) {
//       portalRef.current.rotation.z = clock.getElapsedTime();
//     }
//   });

//   return (
//     <>
//       <points
//         ref={portalRef}
//         castShadow
//         position={[-10, 0.7, -4.5]}
//         geometry={geometry}
//         material={material}
//         rotation={[0, Math.PI / 9, 0]}
//       />
//     </>
//   );
// };

// export default Portal;

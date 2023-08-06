// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import gsap from 'gsap';
// import ImagePanel from '../layout/ImagePanel'; // ImagePanel 컴포넌트의 경로에 맞게 수정해주세요.
// import { Canvas } from '@react-three/fiber';
// import Light from '../layout/Light';

// export default function ImageEffect() {
//   const canvasRef = useRef();
//   const canvas = canvasRef.current;
//   const aspect = window.innerWidth / window.innerHeight;
//   let imagePanels = [];
//   const randomPositionArray = [];

//   const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
//   const spherePositionArray = sphereGeometry.attributes.position.array;

//   const textureLoader = new THREE.TextureLoader();

//   const setShape = (e) => {
//     let array;
//     const type = e.target.dataset.type;
//     switch (type) {
//       case 'random':
//         array = randomPositionArray;
//         break;
//       case 'sphere':
//         array = spherePositionArray;
//         break;
//     }
//     for (let i = 0; i < imagePanels.length; i++) {
//       gsap.to(imagePanels[i].mesh.position, {
//         duration: 2,
//         x: array[i * 3],
//         y: array[i * 3 + 1],
//         z: array[i * 3 + 2],
//       });

//       // 회전
//       if (type === 'random') {
//         gsap.to(imagePanels[i].mesh.rotation, {
//           duration: 2,
//           x: 0,
//           y: 0,
//           z: 0,
//         });
//       } else if (type === 'sphere') {
//         gsap.to(imagePanels[i].mesh.rotation, {
//           duration: 2,
//           x: imagePanels[i].sphereRotationX,
//           y: imagePanels[i].sphereRotationY,
//           z: imagePanels[i].sphereRotationZ,
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     // Points

//     for (let i = 0; i < spherePositionArray.length; i++) {
//       randomPositionArray.push((Math.random() - 0.5) * 10);
//     }

//     // 여러개의 ImagePanel 설정
//     for (let i = 0; i < spherePositionArray.length; i += 3) {
//       const imagePanel = new ImagePanel({
//         textureLoader: textureLoader,
//         geometry: new THREE.PlaneGeometry(0.3, 0.3),
//         imageSrc: `/images/0${Math.ceil(Math.random() * 5)}.jpg`,
//         x: spherePositionArray[i],
//         y: spherePositionArray[i + 1],
//         z: spherePositionArray[i + 2],
//       });
//       imagePanels.push(imagePanel);
//     }

//     return () => {};
//   }, []);

//   return (
//     <>
//       <div
//         style={{
//           position: 'relative',
//           width: '100vw',
//           height: '100vh',
//           background: '#000',
//         }}
//       >
//         <Canvas
//           ref={canvasRef}
//           gl={{ antialias: true }}
//           camera={{
//             fov: 75,
//             aspect: aspect,
//             near: 0.1,
//             far: 1000,
//             position: [0, 1.5, 4],
//           }}
//           id="three-canvas"
//         >
//           <Light />
//           <OrbitControls enableDamping />
//         </Canvas>
//         <div className="btns">
//           <button
//             data-type="random"
//             style={{ position: 'absolute', left: '20px', top: '20px' }}
//             onClick={setShape}
//           >
//             Random
//           </button>
//           <button
//             data-type="sphere"
//             style={{ position: 'absolute', left: '20px', top: '50px' }}
//             onClick={setShape}
//           >
//             Sphere
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
// const ImagePanel = ({ imageSrc, x, y, z }) => {
//   const meshRef = useRef();
//   const { scene } = useThree();

//   useEffect(() => {
//     const textureLoader = new TextureLoader();
//     const texture = textureLoader.load(imageSrc);
//     const material = new MeshBasicMaterial({
//       map: texture,
//       side: DoubleSide,
//     });

//     const mesh = new Mesh(new THREE.PlaneGeometry(0.3, 0.3), material);
//     mesh.position.set(x, y, z);
//     mesh.lookAt(0, 0, 0);

//     // Sphere상태의 회전각을 저장해 둠
//     mesh.sphereRotationX = mesh.rotation.x;
//     mesh.sphereRotationY = mesh.rotation.y;
//     mesh.sphereRotationZ = mesh.rotation.z;

//     scene.add(mesh);
//     meshRef.current = mesh;

//     return () => {
//       scene.remove(mesh);
//     };
//   }, [scene, imageSrc, x, y, z]);

//   return null; // Three.js 객체를 직접 렌더링하지 않기 때문에 null을 반환합니다.
// };

import React, {
  useEffect,
  useRef,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  DoubleSide,
} from "react";
import * as THREE from "three";

import { Canvas, useThree, extend } from "@react-three/fiber";
import {
  useTexture,
  OrbitControls,
  Html,
  PerspectiveCamera,
} from "@react-three/drei";
import gsap, { random } from "gsap";
import Light from "../layout/Light";

const ImagePanel = ({ imageSrc, x, y, z }) => {
  const meshRef = useRef();
  const { scene } = useThree();
  const texture = useTexture(imageSrc);

  useEffect(() => {
    const material = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
    });

    const mesh = new Mesh(new PlaneGeometry(0.3, 0.3), material);
    mesh.position.set(x, y, z);
    mesh.lookAt(0, 0, 0);

    // Sphere상태의 회전각을 저장해 둠
    mesh.sphereRotationX = mesh.rotation.x;
    mesh.sphereRotationY = mesh.rotation.y;
    mesh.sphereRotationZ = mesh.rotation.z;

    scene.add(mesh);
    meshRef.current = mesh;

    return () => {
      scene.remove(mesh);
    };
  }, [scene, texture, x, y, z]);

  return null; // Three.js 객체를 직접 렌더링하지 않기 때문에 null을 반환합니다.
};

export default function ImageEffect() {
  const canvasRef = useRef();
  const canvas = canvasRef.current;
  const aspect = window.innerWidth / window.innerHeight;
  let imagePanels = [];
  const randomPositionArray = [];

  const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
  const spherePositionArray = sphereGeometry.attributes.position.array;

  useEffect(() => {
    // Points

    const setShape = () => {
      // let array;
      // const type = e;
      // switch (type) {
      //   case 'random':
      //     array = randomPositionArray;
      //     break;
      //   case 'sphere':
      //     array = spherePositionArray;
      //     break;
      //   default:
      //     array = randomPositionArray;
      //     break;
      // }
      const array = randomPositionArray;
      const type = "random";
      for (let i = 0; i < imagePanels.length; i++) {
        gsap.to(imagePanels[i].position, {
          duration: 2,
          x: array[i * 3],
          y: array[i * 3 + 1],
          z: array[i * 3 + 2],
        });

        // 회전
        if (type === "random") {
          gsap.to(imagePanels[i].rotation, {
            duration: 2,
            x: 0,
            y: 0,
            z: 0,
          });
        } else if (type === "sphere") {
          gsap.to(imagePanels[i].rotation, {
            duration: 2,
            x: imagePanels[i].sphereRotationX,
            y: imagePanels[i].sphereRotationY,
            z: imagePanels[i].sphereRotationZ,
          });
        }
      }
    };

    for (let i = 0; i < spherePositionArray.length; i++) {
      randomPositionArray.push((Math.random() - 0.5) * 10);
    }

    // 여러개의 ImagePanel 설정
    for (let i = 0; i < spherePositionArray.length; i += 3) {
      const imagePanel = {
        mesh: null,
        sphereRotationX: null,
        sphereRotationY: null,
        sphereRotationZ: null,
      };
      imagePanels.push(imagePanel);
    }

    setShape("random");

    return () => {};
  }, []);

  return (
    <>
      <Light />
      <PerspectiveCamera
        fov={75}
        far={1000}
        near={0.1}
        position={[0, 1.5, 4]}
      />
      <OrbitControls enableDamping />
      {imagePanels.map((index) => (
        <ImagePanel
          key={index}
          imageSrc={`/images/0${Math.ceil(Math.random() * 5)}.jpg`}
          x={spherePositionArray[index * 3]}
          y={spherePositionArray[index * 3 + 1]}
          z={spherePositionArray[index * 3 + 2]}
          ref={(mesh) => {
            imagePanels[index].mesh = mesh;
          }}
        />
      ))}
      <Html>
        <div className="btns">
          <button
            data-type="random"
            style={{ position: "absolute", left: "20px", top: "20px" }}
          >
            Random
          </button>
          <button
            data-type="sphere"
            style={{ position: "absolute", left: "20px", top: "50px" }}
          >
            Sphere
          </button>
        </div>
      </Html>
    </>
  );
}

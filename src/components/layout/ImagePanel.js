import React, { useRef, useEffect } from 'react';
import { DoubleSide, Mesh, MeshBasicMaterial, TextureLoader } from 'three';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ImagePanel = ({ imageSrc, x, y, z }) => {
  const meshRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(imageSrc);
    const material = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
    });

    const mesh = new Mesh(new THREE.PlaneGeometry(0.3, 0.3), material);
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
  }, [scene, imageSrc, x, y, z]);

  return null; // Three.js 객체를 직접 렌더링하지 않기 때문에 null을 반환합니다.
};

export default ImagePanel;

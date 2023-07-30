import { useGLTF } from '@react-three/drei';
import { Euler } from 'three';
import React, { useEffect } from 'react';

const HouseTwo = () => {
  const glb = useGLTF('../models/stylized_house.glb');
  const house = glb.scene.children[0];

  useEffect(() => {
    if (!house) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
      house.position.set(10, -0.1, -10);
      house.rotation.z = -Math.PI / 2;
      house.scale.set(3, 3, 3);
    });
  }, []);

  // // 방향을 돌리기 위해 Euler 객체를 생성하고 각 축에 대한 회전값을 설정합니다.
  // const rotation = new Euler(0, 0, 0); // 여기서는 Y축으로 90도 회전한 것입니다.
  // house && house.rotation.copy(rotation);
  // house && (house.rotation.z = -Math.PI / 2); // 바닥에 붙은 채로 90도 회전
  // house?.position.set(10, -0.1, -10);
  // house && (house.scale.x = 3);
  // house && (house.scale.y = 3);
  // house && (house.scale.z = 3);
  return <primitive object={house} dispose={null} />;
};

export default HouseTwo;

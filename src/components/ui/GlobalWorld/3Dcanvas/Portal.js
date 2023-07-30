import { useGLTF } from '@react-three/drei';
import { Euler } from 'three';
import React from 'react';

const Portal = () => {
  const glb = useGLTF('../models/portal.glb');
  const house = glb.scene.children[0];

  // // 방향을 돌리기 위해 Euler 객체를 생성하고 각 축에 대한 회전값을 설정합니다.
  //   const rotation = new Euler(0, 0, 0); // 여기서는 Y축으로 90도 회전한 것입니다.
  //   house && house.rotation.copy(rotation);
  //     house.rotation.z = -(Math.PI / 2); // 바닥에 붙은 채로 90도 회전
  house?.position.set(0, -0.01, 0);
  house && (house.scale.x = 1);
  house && (house.scale.y = 1);
  house && (house.scale.z = 1);
  return <primitive object={house} dispose={null} />;
};

export default Portal;

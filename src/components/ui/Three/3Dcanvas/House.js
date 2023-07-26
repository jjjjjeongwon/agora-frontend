import { useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
const House = ({ myPlayer, houseSpot }) => {
  const glb = useGLTF('../models/house.glb');
  const house = glb.scene.children[0];
  house?.position.set(5, -1.3, 2);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (
      Math.abs(houseSpot.x - myPlayer.x) < 1.5 &&
      Math.abs(houseSpot.z - myPlayer.z) < 1.5
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [houseSpot, myPlayer]);
  useEffect(() => {
    if (isVisible) {
      house && (house.visible = true);
      gsap.to(house.position, {
        duration: 1.3,
        y: 1,
        ease: 'Bounce.easeOut',
      });
    } else {
      house && (house.visible = false);
      gsap.to(house.position, {
        duration: 1,
        y: -1.3,
      });
    }
  }, [isVisible]);
  return <primitive object={house} dispose={null} />;
};

export default House;

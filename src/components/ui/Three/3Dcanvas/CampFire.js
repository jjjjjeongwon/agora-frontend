import { useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
const CampFire = ({ myPlayer, setViewCampModal }) => {
  const glb = useGLTF('../models/army_campfire_01.glb');
  const campFire = glb.scene.children[0];
  campFire?.position.set(7, 0, -7);
  campFire && (campFire.scale.x = 2.5);
  campFire && (campFire.scale.y = 2.5);
  campFire && (campFire.scale.z = 2.5);
  const [isVisible, setIsVisible] = useState(false);
  console.log(isVisible);
  useEffect(() => {
    if (
      Math.abs(campFire?.position.x - myPlayer.x) < 2 &&
      Math.abs(campFire?.position.z - myPlayer.z) < 2
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [myPlayer]);

  useEffect(() => {
    if (isVisible) {
      setViewCampModal(true);
    } else {
      setViewCampModal(false);
    }
  }, [isVisible]);

  return <primitive object={campFire} dispose={null} />;
};
export default CampFire;

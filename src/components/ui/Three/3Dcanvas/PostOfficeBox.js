import { useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
const PostOfficeBox = ({ myPlayer, postSpot, setViewVisitList }) => {
  const glb = useGLTF('../models/postbox.glb');
  const postOfficeBox = glb.scene.children[0];
  postOfficeBox?.position.set(10, 0, 2);
  // postOfficeBox?.scale.x = 0.5;
  // postOfficeBox?.scale.y = 0.5;
  // postOfficeBox?.scale.z = 0.5;
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (
      Math.abs(postSpot.x - myPlayer.x) < 1.5 &&
      Math.abs(postSpot.z - myPlayer.z) < 1.5
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [postSpot, myPlayer]);
  useEffect(() => {
    if (isVisible) {
      setViewVisitList(true);
    } else {
      setViewVisitList(false);
    }
  }, [isVisible]);
  return <primitive object={postOfficeBox} dispose={null} />;
};

export default PostOfficeBox;

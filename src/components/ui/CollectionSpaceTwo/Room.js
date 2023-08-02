import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';
const Room = () => {
  const glb = useGLTF('../models/room/red_room.glb');
  const room = glb.scene.children[0];

  useEffect(() => {
    if (!room) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = new THREE.MeshPhongMaterial({
            specular: 0x000000,
          });
        }
      }
    });
    room.position.set(-2.5, 0, 3.5);
    room.rotation.z = Math.PI / 2;
    room.scale.set(0.019, 0.019, 0.019);
  });
  return <primitive object={room} dispose={null} />;
};

export default Room;

import { useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
const Game = ({ myPlayer, gameSpot }) => {
  const glb = useGLTF('../models/game.glb');
  const game = glb.scene.children[0];
  game && (game.scale.x = 0.8);
  game && (game.scale.y = 0.8);
  game && (game.scale.z = 0.8);
  game?.position.set(5, -1.3, 2);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (
      Math.abs(gameSpot.x - myPlayer.x) < 1.5 &&
      Math.abs(gameSpot.z - myPlayer.z) < 1.5
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [gameSpot, myPlayer]);
  useEffect(() => {
    if (isVisible) {
      game && (game.visible = true);
      gsap.to(game.position, {
        duration: 1.3,
        y: 0.7,
        ease: 'Bounce.easeOut',
      });
    } else {
      game && (game.visible = false);
      gsap.to(game.position, {
        duration: 1,
        y: -1.3,
      });
    }
  }, [isVisible]);
  return <primitive object={game} dispose={null} />;
};

export default Game;

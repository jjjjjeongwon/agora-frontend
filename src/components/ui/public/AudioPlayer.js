import React, { useEffect } from 'react';
import { Howl, Howler } from 'howler';

const AudioPlayer = ({ src }) => {
  useEffect(() => {
    const sound = new Howl({
      src,
      autoplay: true,
      loop: true,
      volume: 0.5,
    });

    sound.play();

    // Clean up function
    return () => {
      sound.unload();
    };
  }, [src]);

  return null;
};

export default AudioPlayer;

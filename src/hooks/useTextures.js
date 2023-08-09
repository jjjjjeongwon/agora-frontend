import * as THREE from 'three';
import { useState, useEffect } from 'react';

const useTextures = (urls) => {
  const [textures, setTextures] = useState([]);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loadedTextures = [];

    urls.forEach((url) => {
      loader.load(url, (texture) => {
        loadedTextures.push(texture);
        if (loadedTextures.length === urls.length) {
          setTextures(loadedTextures);
        }
      });
    });
  }, [urls]);

  return textures;
};

export default useTextures;

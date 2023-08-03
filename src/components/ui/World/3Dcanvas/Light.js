import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';

const Light = () => {
  const three = useThree();
  const lightRef = useRef();
  useEffect(() => {
    const light = lightRef.current;
    if (light) {
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      light.shadow.camera.left = -100;
      light.shadow.camera.right = 100;
      light.shadow.camera.top = 100;
      light.shadow.camera.bottom = -100;
      light.shadow.camera.near = -100;
      light.shadow.camera.far = 100;
    }
  }, []);
  return (
    <>
      <ambientLight color={'white'} intensity={0.5} />
      <SpotLight
        castShadow
        angle={80}
        intensity={0.4}
        position={[0, 30, 0]}
        color={'white'}
      />
      <directionalLight
        ref={lightRef}
        receiveShadow={false}
        castShadow
        intensity={0.5}
        position={[5, 15, 5]}
      />
      ;
    </>
  );
};

export default Light;

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';

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
      <ambientLight color={'white'} intensity={0.7} />
      <directionalLight ref={lightRef} castShadow position={[3, 3, 0]} />;
    </>
  );
};

export default Light;

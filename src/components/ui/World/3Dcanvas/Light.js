import { useEffect, useRef } from 'react';

const Light = () => {
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
      <ambientLight color={'white'} intensity={0.4} />
      <directionalLight
        ref={lightRef}
        castShadow
        intensity={0.5}
        position={[5, 15, 5]}
      />
      ;
    </>
  );
};

export default Light;

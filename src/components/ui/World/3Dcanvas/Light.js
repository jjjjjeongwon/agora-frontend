import { useEffect, useRef } from 'react';

const Light = () => {
  return (
    <>
      {/* <ambientLight color={'white'} intensity={0.4} /> */}
      <directionalLight
        castShadow
        intensity={0.9}
        color={'#9e69da'}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        position={[30, 30, 30]}
      />
      ;
    </>
  );
};

export default Light;

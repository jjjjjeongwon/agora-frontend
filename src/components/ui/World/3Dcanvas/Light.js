const Light = () => {
  return (
    <>
      <directionalLight
        castShadow
        intensity={0.7}
        color={'#9e69da'}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        position={[30, 30, 30]}
      />
      ;
    </>
  );
};

export default Light;

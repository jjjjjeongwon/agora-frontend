const Light = () => {
  return (
    <>
      <directionalLight
        castShadow
        intensity={0.4}
        color={'white'}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-mapSize-width={4086}
        shadow-mapSize-height={4086}
        position={[30, 30, 30]}
      />
      ;
    </>
  );
};

export default Light;

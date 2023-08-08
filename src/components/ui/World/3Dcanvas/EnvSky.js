import { Environment, Sky } from '@react-three/drei';

const EnvSky = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Sky
        distance={4500}
        sunPosition={[100, 30, 100]}
        inclination={0}
        azimuth={0.25}
      />
    </>
  );
};

export default EnvSky;

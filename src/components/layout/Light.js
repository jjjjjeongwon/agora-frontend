import { useEffect } from 'react';
const Light = () => {
  useEffect(() => {}, []);
  return (
    <>
      <ambientLight color={'white'} intensity={0.5} />
      <directionalLight color={'white'} position={[1, 0, 2]} />
    </>
  );
};

export default Light;

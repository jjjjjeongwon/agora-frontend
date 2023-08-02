import { Bounds } from '@react-three/drei';

const Point = () => {
  return (
    <Bounds fit clip>
      <mesh receiveShadow position={[-2.5, 3, 4]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.1, 0.2, 32]}></coneGeometry>
        <meshStandardMaterial
          roughness={0.7}
          metalness={0.7}
          color={'red'}
        ></meshStandardMaterial>
      </mesh>
    </Bounds>
  );
};

export default Point;

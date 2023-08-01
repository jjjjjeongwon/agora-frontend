import * as THREE from 'three';
const Floor = () => {
  return (
    <>
      <mesh
        castShadow
        receiveShadow
        name="floor"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
      >
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={'#354C5E'} />
      </mesh>
      <mesh name="top" rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={'#DDD9DC'} />;
      </mesh>
    </>
  );
};

export default Floor;

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
        <meshStandardMaterial color={'#B59B74'} />
      </mesh>
      <mesh name="top" rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={'#D39C8A'} />;
      </mesh>
    </>
  );
};

export default Floor;

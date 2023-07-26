const Spot = ({ spot }) => {
  return (
    <mesh
      name="spot"
      position={spot}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <circleGeometry args={[2, 64, 64]} />
      <meshStandardMaterial color={'yellow'} transparent opacity={0.5} />
    </mesh>
  );
};

export default Spot;

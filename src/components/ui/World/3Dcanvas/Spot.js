const Spot = ({ spot }) => {
  return (
    <mesh
      name="spot"
      position={[spot.x, spot.y, spot.z]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <circleGeometry args={[0.3, 64, 64]} />
      <meshStandardMaterial color={'white'} transparent opacity={0} />
    </mesh>
  );
};

export default Spot;

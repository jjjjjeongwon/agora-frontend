import { Sparkles } from '@react-three/drei';

const Sparkle = () => {
  const count = 100;
  const noise = 1;
  const opacity = 2;
  const size = 10;
  const scale = [0.5, 1, 0.5];
  const speed = 1;
  return (
    <>
      <Sparkles
        color="yellow"
        position={[-10, 0.7, -4]}
        count={count}
        noise={noise}
        opacity={opacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color="yellow"
        position={[-17, 0.7, 15]}
        count={count}
        noise={noise}
        opacity={opacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color="yellow"
        position={[35, 0.7, 4]}
        count={count}
        noise={noise}
        opacity={opacity}
        size={size}
        scale={scale}
        speed={speed}
      />
    </>
  );
};
export default Sparkle;

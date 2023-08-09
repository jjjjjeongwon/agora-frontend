import { Sparkles } from '@react-three/drei';

const Portal = () => {
  const count = 100;
  const noise = 1;
  const baseOpacity = 1;
  const pointOpacity = 0.3;
  const size = 40;
  const scale = [0.7, 1.5, 0.7];
  const speed = 10;
  const baseColor = '#00FFFF';
  const pointColor = 'white';
  return (
    <>
      <Sparkles
        color={baseColor}
        position={[-17, 0.7, 15]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[-17, 0.7, 15]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={baseColor}
        position={[-11.7, 0.7, 5.5]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[-11.7, 0.7, 5.5]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={baseColor}
        position={[-4.2, 0.7, -6.8]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[-4.2, 0.7, -6.8]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={baseColor}
        position={[-10, 0.7, -4]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[-10, 0.7, -4]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={baseColor}
        position={[3.2, 0.7, -7.7]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[3.2, 0.7, -7.7]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={baseColor}
        position={[10, 0.7, -2.7]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[10, 0.7, -2.7]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={baseColor}
        position={[35, 0.7, 4]}
        count={count}
        noise={noise}
        opacity={baseOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
      <Sparkles
        color={pointColor}
        position={[35, 0.7, 4]}
        count={count}
        noise={noise}
        opacity={pointOpacity}
        size={size}
        scale={scale}
        speed={speed}
      />
    </>
  );
};
export default Portal;

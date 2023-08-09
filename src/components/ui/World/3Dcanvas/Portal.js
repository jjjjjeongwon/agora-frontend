import { Sparkles } from '@react-three/drei';
import React from 'react';

const Portal = ({ friendsInfo }) => {
  const count = 100;
  const noise = 1;
  const baseOpacity = 1;
  const pointOpacity = 0.3;
  const size = 40;
  const scale = [0.7, 1.5, 0.7];
  const speed = 10;
  const baseColor = '#00FFFF';
  const pointColor = 'white';

  const positions = [
    [-17, 0.7, 15],
    [-11.7, 0.7, 5.5],
    [-4.2, 0.7, -6.8],
    [-10, 0.7, -4],
    [10, 0.7, -2.7],
  ];
  return (
    <>
      {/* 내 집 */}
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
      {/* 파도타기  */}
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

      {/* 친구 집 들 */}
      {friendsInfo.map((friendPosition, idx) => (
        // 각 친구의 위치에 대해 두 개의 Sparkles 컴포넌트 렌더링
        <React.Fragment key={idx}>
          <Sparkles
            color={baseColor}
            position={positions[idx]}
            count={count}
            noise={noise}
            opacity={baseOpacity}
            size={size}
            scale={scale}
            speed={speed}
          />
          <Sparkles
            color={pointColor}
            position={positions[idx]}
            count={count}
            noise={noise}
            opacity={pointOpacity}
            size={size}
            scale={scale}
            speed={speed}
          />
        </React.Fragment>
      ))}
    </>
  );
};
export default Portal;

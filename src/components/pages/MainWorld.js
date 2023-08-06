import { KeyboardControls, Loader, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense, useMemo } from 'react';
import Experience from '../ui/World/3Dcanvas/Experience';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

const MainWorld = () => {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ],
    []
  );

  const { progress } = useProgress();
  return (
    <KeyboardControls map={map}>
      <Canvas shadows camera={{ position: [0, 10, 25], fov: 42 }}>
        <color attach="background" args={['#e3daf7']} />
        <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
};

export default MainWorld;

import * as THREE from 'three';
import { Suspense } from 'react';
import { useAspect, useVideoTexture, useTexture } from '@react-three/drei';

const Video = () => {
  return (
    <mesh position={[5.32, 3.5, 2.5]} rotation={[0, Math.PI / 2, 0]}>
      <Scene />
    </mesh>
  );
};

function Scene() {
  return (
    <mesh>
      <planeGeometry args={[5, 3]} />
      <Suspense fallback={<FallbackMaterial url="../images/test.jpeg" />}>
        <VideoMaterial url="../videos/birthday.mp4" />
      </Suspense>
    </mesh>
  );
}

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url);
  return (
    <meshBasicMaterial
      map={texture}
      side={THREE.DoubleSide}
      toneMapped={false}
    />
  );
}

function FallbackMaterial({ url }) {
  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

export default Video;

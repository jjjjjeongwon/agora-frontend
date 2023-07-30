import * as THREE from 'three';
import { Suspense } from 'react';
import { useAspect, useVideoTexture, useTexture } from '@react-three/drei';

const VideoPlane = () => {
  return (
    <mesh position={[-5, 2, -15]}>
      <Scene />
    </mesh>
  );
};

function Scene() {
  return (
    <mesh castShadow receiveShadow>
      <planeGeometry args={[5, 5]} />
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
  return (
    <meshBasicMaterial
      map={texture}
      side={THREE.DoubleSide}
      toneMapped={false}
    />
  );
}

export default VideoPlane;

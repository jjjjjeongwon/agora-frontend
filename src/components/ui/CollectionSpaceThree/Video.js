import * as THREE from "three";
import { Suspense } from "react";
import { useAspect, useVideoTexture, useTexture } from "@react-three/drei";

const Video = () => {
  return (
    <mesh position={[5.32, 3.5, 2.2]} rotation={[0, Math.PI / 2, 0]}>
      <Scene />
    </mesh>
  );
};

function Scene() {
  const video = document.createElement("video");
  video.src = "../videos/birthday.mp4"; // 비디오 경로
  video.load(); // 메타데이터를 로드합니다.

  const videoWidth = video.videoWidth; // 비디오의 가로 크기
  const videoHeight = video.videoHeight; // 비디오의 세로 크기

  const aspectRatio = videoWidth / videoHeight; // 비디오의 가로 세로 비율

  return (
    <mesh>
      <planeGeometry args={[5, 5 / aspectRatio]} />{" "}
      {/* 지오메트리의 크기를 비디오의 비율에 맞게 조정합니다. */}
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

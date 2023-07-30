import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const ImageFrame = () => {
  const image = useLoader(THREE.TextureLoader, '../images/test.jpeg');
  return (
    <>
      <mesh rotation={[0, -Math.PI * 2, 0]} position={[-4, 3, -5.99]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>
      <mesh rotation={[0, -Math.PI * 2, 0]} position={[0, 3, -5.99]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>
      <mesh rotation={[0, -Math.PI * 2, 0]} position={[4, 3, -5.99]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>

      <mesh rotation={[0, Math.PI, 0]} position={[-4, 3, 5.99]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]} position={[0, 3, 5.99]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]} position={[4, 3, 5.99]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>

      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5.99, 3, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5.99, 3, 4]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5.99, 3, -4]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5.99, 3, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5.99, 3, 4]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5.99, 3, -4]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={image} />
      </mesh>
    </>
  );
};

export default ImageFrame;

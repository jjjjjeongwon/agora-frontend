import { useGLTF, OrbitControls, Sky, Stars } from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import SocketChat from '../ui/Three/SocketChat';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes, css } from 'styled-components';
import VisitListModal from '../ui/Three/VisitListModal';
import gsap from 'gsap';
import io from 'socket.io-client';
import { useKeyPress } from 'react-use';
const socket = io('http://3.35.5.22:8080/');

const Floor = () => {
  const floorTexture = useLoader(THREE.TextureLoader, '../images/grid.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.x = 10;
  floorTexture.repeat.y = 10;
  return (
    <mesh castShadow receiveShadow name="floor" rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={floorTexture} />
    </mesh>
  );
};

useGLTF.preload('../models/Bear.glb');
const Player = () => {
  const glb = useGLTF('../models/Bear.glb');
  const playerMesh = glb.scene.children[0];
  playerMesh.position.y = 0.5;
  const three = useThree();

  const upPress = useKeyPress('w');
  const downPress = useKeyPress('s');
  const leftPress = useKeyPress('a');
  const rightPress = useKeyPress('d');
  const upArrowPress = useKeyPress('ArrowUp');
  const downArrowPress = useKeyPress('ArrowDown');
  const leftArrowPress = useKeyPress('ArrowLeft');
  const rightArrowPress = useKeyPress('ArrowRight');

  const mixer = new THREE.AnimationMixer(playerMesh);
  const actions = [
    mixer.clipAction(glb.animations[0]),
    mixer.clipAction(glb.animations[1]),
  ];
  playerMesh.userData.animations = actions;
  console.log(playerMesh.userData.animations);

  useEffect(() => {
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    playerMesh.scale.x = 0.5;
    playerMesh.scale.y = 0.5;
    playerMesh.scale.z = 0.5;
  }, []);
  useFrame((state, delta) => {
    if (!playerMesh) return;
    // TODO 이곳에서 이동로직 처리
    mixer.update(delta);
    const speed = 0.05;
    const rotationSpeed = 0.1;

    let targetYRotation = null;

    if (upPress || upArrowPress) {
      playerMesh.position.z -= speed;
      three.camera.position.z -= speed;
      targetYRotation = Math.PI;
    }
    if (downPress || downArrowPress) {
      playerMesh.position.z += speed;
      three.camera.position.z += speed;
      targetYRotation = 0;
    }
    if (leftPress || leftArrowPress) {
      playerMesh.position.x -= speed;
      three.camera.position.x -= speed;
      targetYRotation = Math.PI / 2;
    }
    if (rightPress || rightArrowPress) {
      playerMesh.position.x += speed;
      three.camera.position.x += speed;
      targetYRotation = -Math.PI / 2;
    }

    // 회전값을 보간합니다.
    if (targetYRotation !== null) {
      playerMesh.rotation.y = THREE.MathUtils.lerp(
        playerMesh.rotation.y,
        targetYRotation,
        rotationSpeed
      );
    }

    if (
      upPress ||
      downPress ||
      leftPress ||
      rightPress ||
      upArrowPress ||
      downArrowPress ||
      leftArrowPress ||
      rightArrowPress
    ) {
      playerMesh.userData.animations[0].stop();
      playerMesh.userData.animations[1].play();
    } else {
      playerMesh.userData.animations[0].play();
      playerMesh.userData.animations[1].stop();
    }
  });
  return <primitive name={'character'} object={glb.scene} dispose={null} />;
};

// Light를 별도의 컴포넌트로 분리했다.
const LightComponent = () => {
  const three = useThree();
  const lightRef = useRef();
  useEffect(() => {
    const light = lightRef.current;
    if (light) {
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      light.shadow.camera.left = -100;
      light.shadow.camera.right = 100;
      light.shadow.camera.top = 100;
      light.shadow.camera.bottom = -100;
      light.shadow.camera.near = -100;
      light.shadow.camera.far = 100;
    }
  }, []);
  return (
    <>
      <ambientLight color={'white'} intensity={0.7} />
      <directionalLight ref={lightRef} castShadow position={[3, 3, 3]} />;
    </>
  );
};

const Spot = () => {
  return (
    <mesh
      name="spot"
      position={[5, 0.005, 5]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <CircleGeometry args={[6, 6]} />
      <meshStandardMaterial color={'yellow'} transparent opacity={0.5} />
    </mesh>
  );
};

const Three = () => {
  const roomName = useParams().id;
  const navigate = useNavigate();
  // 모달창 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const aspectRatio = window.innerWidth / window.innerHeight;
  // 모달창 노출
  const showModal = () => {
    if (modalOpen === true) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  };
  useEffect(() => {}, []);
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#000',
      }}
    >
      <Canvas
        gl={{ antialias: true }}
        shadows={{
          enabled: true,
          autoUpdate: true,
          type: THREE.PCFSoftShadowMap,
        }}
        camera={{
          fov: 50,
          aspect: aspectRatio,
          near: 0.1,
          far: 1000,
          position: [0, 3, 0],
          zoom: 0.5,
        }}
      >
        <Floor />
        <LightComponent />
        <Spot />
        <Suspense fallback={null}>
          <Sky
            distance={4500}
            sunPosition={[0, 1, 0]}
            inclination={0}
            azimuth={0.25}
          />

          <Stars
            radius={100} // Radius of the inner sphere (default=100)
            depth={50} // Depth of area where stars should fit (default=50)
            count={5000} // Amount of stars (default=5000)
            factor={4} // Size factor (default=4)
            saturation={0} // Saturation 0-1 (default=0)
            fade // Faded dots (default=false)
          />
          <Player />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <ChatWrap>
        <SocketChat roomName={roomName} socket={socket} />
      </ChatWrap>
      <HomeICon
        onClick={() => {
          navigate('/maplist');
        }}
      >
        <img src="/images/magnifier.png" alt="" />
      </HomeICon>
      <PostBox onClick={showModal}>
        <img src="/images/postbox.png" alt="" />
      </PostBox>
      <Container modalOpen={modalOpen}>
        {modalOpen && <VisitListModal setModalOpen={setModalOpen} />}
      </Container>
    </div>
  );
};

const rotationAnimation = keyframes`
    from {
        transform: rotate(-5deg);
    } to{
        transform: rotate(5deg);
    }
`;

const HomeICon = styled.div`
  animation: ${rotationAnimation} 1s linear infinite alternate;
  position: absolute;
  cursor: pointer;
  left: 1%;
  bottom: 1%;
  width: 90px;
  height: 90px;
  margin: 60px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const PostBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: 5%;
  bottom: 5%;
  width: 120px;
  height: 120px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  ${({ modalOpen }) => {
    return css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: ${modalOpen ? 1 : -1};
      background: ${modalOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
    `;
  }}
`;

const ChatWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: 'white';
`;

export default Three;

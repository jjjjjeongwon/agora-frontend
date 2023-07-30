import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Player } from '../ui/Three/ui/Player';
import { House } from '../ui/Three/ui/House';
import gsap from 'gsap';
import { styled, keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import VisitListModal from '../ui/Three/ui/VisitListModal';

const Three = () => {
  const containerRef = useRef();
  const navigate = useNavigate();

  // 모달창 상태 관리
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    if (modalOpen === true) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    // Your main.js code here, with some modifications.
    // Texture
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load('/images/grass.png');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.x = 10;
    floorTexture.repeat.y = 10;

    // 1. Replace the canvas query selector with a ref.
    const canvas = containerRef.current;
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      // canvas,
      antialias: true,
    });
    // 2. Replace window.addEventListener calls with useEffect and cleanup functions.
    renderer.setSize(
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight
    );
    renderer.setPixelRatio(containerRef.current.devicePixelRatio > 1 ? 2 : 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Rest of the code...
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.OrthographicCamera(
      -(window.innerWidth / window.innerHeight), // left
      window.innerWidth / window.innerHeight, // right,
      1, // top
      -1, // bottom
      -1000,
      1000
    );

    const cameraPosition = new THREE.Vector3(1, 5, 5);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.zoom = 0.2;
    camera.updateProjectionMatrix();
    scene.add(camera);

    // Light
    const ambientLight = new THREE.AmbientLight('white', 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('white', 0.5);
    const directionalLightOriginPosition = new THREE.Vector3(1, 1, 1);
    directionalLight.position.x = directionalLightOriginPosition.x;
    directionalLight.position.y = directionalLightOriginPosition.y;
    directionalLight.position.z = directionalLightOriginPosition.z;
    directionalLight.castShadow = true;

    // mapSize 세팅으로 그림자 퀄리티 설정
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    // 그림자 범위
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.camera.near = -100;
    directionalLight.shadow.camera.far = 100;
    scene.add(directionalLight);

    // Mesh
    const meshes = [];
    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({
        map: floorTexture,
      })
    );
    floorMesh.name = 'floor';
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    meshes.push(floorMesh);

    const pointerMesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.5, 32),
      new THREE.MeshBasicMaterial({
        color: 'crimson',
        transparent: true,
        opacity: 0,
      })
    );
    pointerMesh.rotation.x = -Math.PI / 2;
    pointerMesh.position.y = 0.01;
    pointerMesh.receiveShadow = true;
    scene.add(pointerMesh);

    const spotMesh = new THREE.Mesh(
      new THREE.CircleGeometry(1, 32),
      new THREE.MeshStandardMaterial({
        color: 'green',
        transparent: true,
        opacity: 0.1,
      })
    );
    spotMesh.position.set(5, 0.005, 5);
    spotMesh.rotation.x = -Math.PI / 2;
    spotMesh.receiveShadow = true;
    scene.add(spotMesh);

    const gltfLoader = new GLTFLoader();

    // glb 파일 로드하기(당구대)
    gltfLoader.load('./models/billiard_table.glb', (gltf) => {
      // 불러온 glb 파일에서 메시 가져오기
      const houseModel = gltf.scene.children[0];

      // 불러온 glb 파일 위치 및 크기 조정
      houseModel.position.x = -3;
      houseModel.position.y = 1;
      houseModel.position.z = -7;
      // houseModel.scale.x = 0.1;
      // houseModel.scale.y = 0.1;
      // houseModel.scale.z = 0.1;

      // scene에 mesh 추가하기
      scene.add(houseModel);
    });

    // glb 파일 로드하기(공)
    gltfLoader.load('./models/footvolley_ball.glb', (gltf) => {
      // 불러온 glb 파일에서 메시 가져오기
      const houseModel = gltf.scene.children[0];

      // 불러온 glb 파일 위치 및 크기 조정
      houseModel.position.x = 0;
      houseModel.position.y = 1;
      houseModel.position.z = 2;
      // houseModel.scale.x = 0.1;
      // houseModel.scale.y = 0.1;
      // houseModel.scale.z = 0.1;

      // scene에 mesh 추가하기
      scene.add(houseModel);
    });

    // glb 파일 로드하기(음악)
    gltfLoader.load('./models/gramophone.glb', (gltf) => {
      // 불러온 glb 파일에서 메시 가져오기
      const houseModel = gltf.scene.children[0];

      // 불러온 glb 파일 위치 및 크기 조정
      houseModel.position.x = 10;
      houseModel.position.y = 2;
      houseModel.position.z = 1.5;
      houseModel.scale.x = 0.3;
      houseModel.scale.y = 0.3;
      houseModel.scale.z = 0.3;

      // scene에 mesh 추가하기
      scene.add(houseModel);
    });

    const house = new House({
      gltfLoader,
      scene,
      modelSrc: './models/house.glb',
      x: 5,
      y: -1.3,
      z: 2,
    });

    const player = new Player({
      scene,
      meshes,
      gltfLoader,
      modelSrc: './models/ilbuni.glb',
    });

    const raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let destinationPoint = new THREE.Vector3();
    let angle = 0;
    let isPressed = false; // 마우스를 누르고 있는 상태

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
      const delta = clock.getDelta();

      if (player.mixer) player.mixer.update(delta);

      if (player.modelMesh) {
        camera.lookAt(player.modelMesh.position);
      }

      if (player.modelMesh) {
        if (isPressed) {
          raycasting();
        }

        if (player.moving) {
          // 걸어가는 상태
          angle = Math.atan2(
            destinationPoint.z - player.modelMesh.position.z,
            destinationPoint.x - player.modelMesh.position.x
          );
          player.modelMesh.position.x += Math.cos(angle) * 0.05;
          player.modelMesh.position.z += Math.sin(angle) * 0.05;

          camera.position.x = cameraPosition.x + player.modelMesh.position.x;
          camera.position.z = cameraPosition.z + player.modelMesh.position.z;

          player.actions[0].stop();
          player.actions[1].play();

          if (
            Math.abs(destinationPoint.x - player.modelMesh.position.x) < 0.03 &&
            Math.abs(destinationPoint.z - player.modelMesh.position.z) < 0.03
          ) {
            player.moving = false;
            // console.log('멈춤');
          }

          if (
            Math.abs(spotMesh.position.x - player.modelMesh.position.x) < 1.5 &&
            Math.abs(spotMesh.position.z - player.modelMesh.position.z) < 1.5
          ) {
            if (!house.visible) {
              // console.log('나와');
              house.visible = true;
              spotMesh.material.color.set('seagreen');
              gsap.to(house.modelMesh.position, {
                duration: 1,
                y: 1,
                ease: 'Bounce.easeOut',
              });
              gsap.to(camera.position, {
                duration: 1,
                y: 3,
              });
            }
          } else if (house.visible) {
            // console.log('들어가');
            house.visible = false;
            spotMesh.material.color.set('yellow');
            gsap.to(house.modelMesh.position, {
              duration: 0.5,
              y: -1.3,
            });
            gsap.to(camera.position, {
              duration: 1,
              y: 5,
            });
          }
        } else {
          // 서 있는 상태
          player.actions[1].stop();
          player.actions[0].play();
        }
      }

      renderer.render(scene, camera);
      // renderer.setAnimationLoop(draw);
      requestAnimationFrame(draw);
    }
    function checkIntersects() {
      // raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(meshes);
      for (const item of intersects) {
        if (item.object.name === 'floor') {
          destinationPoint.x = item.point.x;
          destinationPoint.y = 0.3;
          destinationPoint.z = item.point.z;
          player.modelMesh.lookAt(destinationPoint);

          // console.log(item.point)

          player.moving = true;

          pointerMesh.position.x = destinationPoint.x;
          pointerMesh.position.z = destinationPoint.z;
        }
        break;
      }
    }

    function setSize() {
      camera.left = -(
        containerRef.current.offsetWidth / containerRef.current.offsetHeight
      );
      camera.right =
        containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      camera.top = 1;
      camera.bottom = -1;

      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
      renderer.render(scene, camera);
    }
    // 이벤트
    window.addEventListener('resize', setSize);

    // 마우스 좌표를 three.js에 맞게 변환
    function calculateMousePosition(e) {
      mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1);
    }

    // 변환된 마우스 좌표를 이용해 래이캐스팅
    function raycasting() {
      raycaster.setFromCamera(mouse, camera);
      checkIntersects();
    }

    // 마우스 이벤트
    canvas.addEventListener('mousedown', (e) => {
      isPressed = true;
      calculateMousePosition(e);
    });
    canvas.addEventListener('mouseup', () => {
      isPressed = false;
    });
    canvas.addEventListener('mousemove', (e) => {
      if (isPressed) {
        calculateMousePosition(e);
      }
    });

    // 터치 이벤트
    canvas.addEventListener('touchstart', (e) => {
      isPressed = true;
      calculateMousePosition(e.touches[0]);
    });
    canvas.addEventListener('touchend', () => {
      isPressed = false;
    });
    canvas.addEventListener('touchmove', (e) => {
      if (isPressed) {
        calculateMousePosition(e.touches[0]);
      }
    });

    if (containerRef.current) {
      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
      containerRef.current.appendChild(renderer.domElement);
      draw();
    }
    // Don't forget to return a cleanup function to remove event listeners and dispose of Three.js objects.
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount.

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100vh' }}
      ref={containerRef}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'white',
        }}
      ></div>
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

export default Three;

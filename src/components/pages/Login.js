import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LoginSignupTitle from '../ui/public/LoginSignupTitle';
import LoginSignupInputForm from '../ui/public/LoginSignupInputForm';
import LoginErrorMessage from '../ui/Login/LoginErrorMessage';
import LoginSignupButton from '../ui/public/LoginSignupButton';
import SignupButton from '../ui/Signup/SignupButton';
import PasswordInputForm from '../ui/public/PasswordInputForm';
import userAPI from '../../apis/userAPI';

import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const checkLogin = async () => {
    await userAPI
      .post('/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }) //추가
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: `반갑습니다!`,
          confirmButtonColor: '#0e72ed',
        });
        navigate('/world');
      })
      .catch((err) => {
        console.log('포스트 요청 에러', err);
        Swal.fire({
          title: `아이디 또는 패스워드를 확인해주세요!`,
          confirmButtonColor: '#0e72ed',
        });
      });
  };
  return (
    <LoginContainer>
      <LoginSignupTitle />
      <Wrap>
        <LoginWrap>
          <LoginSignupInputForm inputRef={emailRef} text="아이디" />
          <PasswordInputForm
            inputRef={passwordRef}
            type="password"
            text="비밀번호"
          />
          <LoginErrorMessage />
          <LoginSignupButton clickSubmit={checkLogin} text="로그인" />
          <SignupButton clickSubmit={() => navigate('/signup')} />
        </LoginWrap>
      </Wrap>
    </LoginContainer>
  );
};
const LoginContainer = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  width: 500px;
  height: 400px;
  max-width: 500px;
  max-height: 400px;
  min-width: 500px;
  min-height: 400px;
  background-color: white;
  border: 1px solid #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const LoginWrap = styled.div`
  margin: 50px 150px;
`;

export default Login;

// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// function Login() {
//   const ref = useRef();

//   useEffect(() => {
//     const camera = new THREE.PerspectiveCamera(
//       70,
//       window.innerWidth / window.innerHeight,
//       3,
//       1000
//     );
//     camera.position.x = 300;

//     camera.position.y = 10;

//     camera.position.z = 500;

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xedede9);

//     const light = new THREE.DirectionalLight(0xffffff, 1.5);
//     light.position.set(200, 200, 200);
//     scene.add(light);

//     const geometry = new THREE.BoxGeometry(200, 200, 10);
//     const material = [
//       new THREE.MeshBasicMaterial({
//         map: new THREE.TextureLoader().load('/images/sampleImage.png'),
//       }),
//       new THREE.MeshBasicMaterial({
//         map: new THREE.TextureLoader().load('/images/sampleImage.png'),
//       }),
//       new THREE.MeshBasicMaterial({
//         map: new THREE.TextureLoader().load(
//           'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
//         ),
//       }),
//       new THREE.MeshBasicMaterial({
//         map: new THREE.TextureLoader().load(
//           'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
//         ),
//       }),
//       new THREE.MeshBasicMaterial({
//         map: new THREE.TextureLoader().load(
//           'https://images.unsplash.com/photo-1596854273338-cbf078ec7071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80'
//         ),
//       }),
//       new THREE.MeshBasicMaterial({
//         map: new THREE.TextureLoader().load(
//           'https://images.unsplash.com/photo-1596854273338-cbf078ec7071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80'
//         ),
//       }),
//     ];

//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     ref.current.appendChild(renderer.domElement);

//     // const controls = new OrbitControls(camera, renderer.domElement);
//     // controls.autoRotate = false;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//       // controls.update();
//     };

//     animate();

//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener('resize', onWindowResize);

//     return () => {
//       window.removeEventListener('resize', onWindowResize);
//     };
//   }, []);

//   return <div ref={ref} />;
// }
// export default Login;

// import { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { useAspect, useVideoTexture, useTexture } from '@react-three/drei';

// export default function Login() {
//   return (
//     <div
//       style={{
//         position: 'relative',
//         width: '50vw',
//         height: '50vh',
//         background: '#000',
//       }}
//     >
//       <Canvas orthographic>
//         <Scene />
//       </Canvas>
//     </div>
//   );
// }

// function Scene() {
//   const size = useAspect(1800, 1000);
//   return (
//     <mesh scale={size}>
//       <planeGeometry />
//       <Suspense fallback={<FallbackMaterial url="/images/alarm.png" />}>
//         <VideoMaterial url="/videos/gwangalli.mp4" />
//       </Suspense>
//     </mesh>
//   );
// }

// function VideoMaterial({ url }) {
//   const texture = useVideoTexture(url);
//   return <meshBasicMaterial map={texture} toneMapped={false} />;
// }

// function FallbackMaterial({ url }) {
//   const texture = useTexture(url);
//   return <meshBasicMaterial map={texture} toneMapped={false} />;
// }

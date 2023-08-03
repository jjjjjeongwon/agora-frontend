import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import ImagePanel from '../layout/ImagePanel'; // ImagePanel 컴포넌트의 경로에 맞게 수정해주세요.

export default function ImageEffect() {
  const canvasRef = useRef();

  useEffect(() => {
    let canvas;
    let renderer;
    let scene;
    let camera;
    let controls;
    let imagePanels = [];
    const randomPositionArray = [];

    // Renderer
    canvas = canvasRef.current;
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 1.5;
    camera.position.z = 4;
    scene.add(camera);

    // Light
    const ambientLight = new THREE.AmbientLight('white', 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('white', 1);
    directionalLight.position.x = 1;
    directionalLight.position.z = 2;
    scene.add(directionalLight);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Points
    const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
    const spherePositionArray = sphereGeometry.attributes.position.array;
    for (let i = 0; i < spherePositionArray.length; i++) {
      randomPositionArray.push((Math.random() - 0.5) * 10);
    }

    const textureLoader = new THREE.TextureLoader();

    // 여러개의 ImagePanel 설정
    for (let i = 0; i < spherePositionArray.length; i += 3) {
      const imagePanel = new ImagePanel({
        textureLoader: textureLoader,
        scene,
        geometry: new THREE.PlaneGeometry(0.3, 0.3),
        imageSrc: `/images/0${Math.ceil(Math.random() * 5)}.jpg`,
        x: spherePositionArray[i],
        y: spherePositionArray[i + 1],
        z: spherePositionArray[i + 2],
      });
      imagePanels.push(imagePanel);
    }

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
      const delta = clock.getDelta();
      controls.update();
      renderer.render(scene, camera);
      renderer.setAnimationLoop(draw);
    }

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }

    function setShape(e) {
      let array;
      const type = e.target.dataset.type;
      switch (type) {
        case 'random':
          array = randomPositionArray;
          break;
        case 'sphere':
          array = spherePositionArray;
          break;
      }
      for (let i = 0; i < imagePanels.length; i++) {
        gsap.to(imagePanels[i].mesh.position, {
          duration: 2,
          x: array[i * 3],
          y: array[i * 3 + 1],
          z: array[i * 3 + 2],
        });

        // 회전
        if (type === 'random') {
          gsap.to(imagePanels[i].mesh.rotation, {
            duration: 2,
            x: 0,
            y: 0,
            z: 0,
          });
        } else if (type === 'sphere') {
          gsap.to(imagePanels[i].mesh.rotation, {
            duration: 2,
            x: imagePanels[i].sphereRotationX,
            y: imagePanels[i].sphereRotationY,
            z: imagePanels[i].sphereRotationZ,
          });
        }
      }
    }

    // 버튼 이벤트 처리
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btns');

    const randomBtn = document.createElement('button');
    randomBtn.dataset.type = 'random';
    randomBtn.style.cssText = 'position: absolute; left:20px; top:20px;';
    randomBtn.innerHTML = 'Random';
    btnWrapper.append(randomBtn);

    const sphereBtn = document.createElement('button');
    sphereBtn.dataset.type = 'sphere';
    sphereBtn.style.cssText = 'position: absolute; left:20px; top:50px;';
    sphereBtn.innerHTML = 'Sphere';
    btnWrapper.append(sphereBtn);

    document.body.append(btnWrapper);

    btnWrapper.addEventListener('click', setShape);
    window.addEventListener('resize', setSize);

    draw();

    return () => {
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: '#000',
        }}
      >
        <canvas ref={canvasRef} id="three-canvas"></canvas>
        <div className="btns">
          <button
            data-type="random"
            style={{ position: 'absolute', left: '20px', top: '20px' }}
          >
            Random
          </button>
          <button
            data-type="sphere"
            style={{ position: 'absolute', left: '20px', top: '50px' }}
          >
            Sphere
          </button>
        </div>
      </div>
    </>
  );
}

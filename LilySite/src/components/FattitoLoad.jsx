// /models/molang_3_d_copy.glb

// import React, { useLayoutEffect, useRef } from 'react'
// import { useGLTF, useScroll } from '@react-three/drei'
// import gsap from "gsap"
// import { useFrame } from '@react-three/fiber';

// export function FattitoLoad(props){
    
//     const { nodes, materials } = useGLTF('./models/molang_3_d_copy.glb')
//     console_
//     const ref = useRef()
    
//     return (
//         <group {...props} dispose={null} ref={ref}> 
//             {/* <mesh geometry={nodes['01_office'].geometry} material={materials['01']}/> */}
//             {/* <mesh geometry={nodes['']} */}
//         </group>
//     );
// }

// useGLTF.preload('./models/molang_3_d_copy.glb')

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import SplineLoader from '@splinetool/loader';

// camera
const camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2,  -50000, 10000);
camera.position.set(0, 0, 0);
camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

// scene
const scene = new THREE.Scene();

// spline scene
const loader = new SplineLoader();
loader.load(
  'https://prod.spline.design/c6OWWgw47EY30Sa0/scene.splinecode',
  (splineScene) => {
    scene.add(splineScene);
  }
);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

scene.background = new THREE.Color('#ffd2d2');
renderer.setClearAlpha(1);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.125;

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.left = window.innerWidth / - 2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / - 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
  controls.update();
  renderer.render(scene, camera);
}



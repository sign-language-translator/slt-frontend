import { Canvas } from "@react-three/fiber";
import React from "react";
import "./index.css";
import { OrbitControls } from '@react-three/drei';

import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { CCDIKSolver, CCDIKHelper } from 'three/addons/animation/CCDIKSolver.js';

export default function Avatar({ points }) {
  let scene, camera, renderer, orbitControls, transformControls;

  const OOI = {};
  let IKSolver;

  let conf;

  let modelLink = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb'

  init();

  async function init() {
    conf = {
      ik_solver: true,
      update: updateIK
    };

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, .17);
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.001, 5000);
    camera.position.set(0.9728517749133652, 1.1044765132727201, 0.7316689528482836);
    camera.lookAt(scene.position);

    const ambientLight = new THREE.AmbientLight(0xffffff, 8);
    scene.add(ambientLight);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    const gltf = await gltfLoader.loadAsync(modelLink);
    gltf.scene.traverse(n => {
      if (n.name === 'mixamorigRightArm') OOI.arm = n;
      if (n.name === 'mixamorigRightForeArm') OOI.forearm = n;
      if (n.name === 'mixamorigRightHand') OOI.hand = n;
      if (n.name === 'mixamorigRightHandMiddle1') OOI.mover = n;
      if (n.name === 'stacy') OOI.kira = n;
    });
    scene.add(gltf.scene);

    const targetPosition = OOI.hand.position.clone();

    OOI.kira.add(OOI.kira.skeleton.bones[0]); // this causes camera change

    const iks = [
      {
        target: 34, // "target_hand_l"
        effector: 33, // "lowerarm_l"
        links: [
          {
            index: 32, // "hand_l" 
            rotationMin: new THREE.Vector3(1.2, - 1.8, - .4),
            rotationMax: new THREE.Vector3(17, 11, 30)
          },
        ],
      }
    ];
    IKSolver = new CCDIKSolver(OOI.kira, iks);
    const ccdikhelper = new CCDIKHelper(OOI.kira, iks, 0.01);
    scene.add(ccdikhelper);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    transformControls = new TransformControls(camera, renderer.domElement);
    transformControls.size = 0.75;
    transformControls.space = 'world';
    transformControls.attach(OOI.mover);
    scene.add(transformControls);

    // transformControls.addEventListener('mouseDown', () => {
    //   conf.ik_solver = true; // Enable IK solver on mouse down
    // });
    // transformControls.addEventListener('mouseUp', () => {
    //   conf.ik_solver = false; // Disable IK solver on mouse up
    // });
  }

  function updateIK() {
    if (IKSolver) IKSolver.update();
    scene.traverse(function (object) {
      if (object.isSkinnedMesh) object.computeBoundingSphere();
    });
  }

  function animate() {
    if (conf.ik_solver) {
      updateIK();
    }
    renderer.render(scene, camera);
  }
  return (
    <div id="canvas-container">
      <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
        <ambientLight intensity={0.69} />
        <primitive key={modelLink} object={scene} />
        <axesHelper args={[1]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

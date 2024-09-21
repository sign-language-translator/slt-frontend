import { Canvas } from "@react-three/fiber";
import React from "react";
import "./index.css";
// import { OrbitControls } from '@react-three/drei';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { CCDIKSolver, CCDIKHelper } from 'three/addons/animation/CCDIKSolver.js';
import modelLink from './test_bone.glb';

export default function Avatar({ points }) {
  let scene, camera, renderer, orbitControls, transformControls;

  const OOI = {};
  let IKSolver;

  let conf;

  // let modelLink = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb'
  // let modelLink = './test_bone.glb'

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
      if (n.name === 'lowerarm_l') OOI.lowerarm_l = n;
      if (n.name === 'Upperarm_l') OOI.Upperarm_l = n;
      if (n.name === 'hand_l') OOI.hand_l = n;
      if (n.name === 'target_hand_l') OOI.target_hand_l = n;
      if (n.name === 'Kira_Shirt_left') OOI.kira = n;
    });
    scene.add(gltf.scene);

    // console.log(scene)

    const targetPosition = OOI.hand_l.position.clone();

    OOI.kira.add(OOI.kira.skeleton.bones[0]);

    const lowerArmLIndex = OOI.kira.skeleton.bones.indexOf(OOI.lowerarm_l);
    const upperArmLIndex = OOI.kira.skeleton.bones.indexOf(OOI.Upperarm_l);
    const handLIndex = OOI.kira.skeleton.bones.indexOf(OOI.hand_l);
    const targetHandLIndex = OOI.kira.skeleton.bones.indexOf(OOI.target_hand_l);

    const iks = [
      {
        target: targetHandLIndex, // "target_hand_l"
        effector: handLIndex, // "hand_l"
        links: [
          {
            index: lowerArmLIndex, // "lowerarm_l"
            // rotationMin: new THREE.Vector3(-0, -0, -0),
            // rotationMax: new THREE.Vector3(0, 0, 0)
          },
          {
            index: upperArmLIndex, // "Upperarm_l"
            // rotationMin: new THREE.Vector3(-1, -0, -0),
            // rotationMax: new THREE.Vector3(1, 0, 0)
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

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.minDistance = 0.2;
    orbitControls.maxDistance = 1.5;
    orbitControls.enableDamping = true;
    orbitControls.target.copy(targetPosition);

    transformControls = new TransformControls(camera, renderer.domElement);
    transformControls.size = 0.75;
    transformControls.space = 'world';
    transformControls.attach(OOI.target_hand_l);
    scene.add(transformControls);

    transformControls.addEventListener('mouseDown', () => orbitControls.enabled = false);
    transformControls.addEventListener('mouseUp', () => orbitControls.enabled = true);
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
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

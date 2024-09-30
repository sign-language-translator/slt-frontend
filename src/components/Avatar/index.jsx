import { Canvas } from "@react-three/fiber";
import React from "react";
import "./index.css";
import { OrbitControls } from '@react-three/drei';

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import modelLink from './rain.glb';

export default function Avatar({ points }) {
  let scene, camera, origin;

  const RAIN = {}

  init();

  async function init() {
    scene = new THREE.Scene();
    origin = new THREE.Vector3();

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.001, 5000);
    camera.position.set(0.9728517749133652, 1.1044765132727201, 0.7316689528482836);
    camera.lookAt(scene.position);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    const gltf = await gltfLoader.loadAsync(modelLink);

    gltf.scene.traverse(n => {
      if (n.name === 'lowerarm_l') RAIN.lowerarm_l = n;
      if (n.name === 'upperarm_l') RAIN.upperarm_l = n;
      if (n.name === 'shoulder_l') RAIN.shoulder_l = n;

      if (n.name === 'elbow_joint_l') RAIN.elbow_joint_l = n;
      if (n.name === 'shoulder_joint_l') RAIN.shoulder_joint_l = n;
      if (n.name === 'wrist_joint_l') RAIN.wrist_joint_l = n;

      if (n.name === 'GEO-rain_arms') RAIN.rain_arms = n;
    });
    RAIN.lowerarm_l.endPoint = RAIN.wrist_joint_l;
    RAIN.upperarm_l.endPoint = RAIN.elbow_joint_l;
    RAIN.shoulder_l.endPoint = RAIN.shoulder_joint_l;

    RAIN.upperarm_l.children = [RAIN.lowerarm_l]
    RAIN.shoulder_l.children = [RAIN.upperarm_l]

    scene.add(gltf.scene);

    RAIN.rain_arms.add(RAIN.rain_arms.skeleton.bones[0]);

    console.log(RAIN.shoulder_l)

    rotate(RAIN.upperarm_l, 0, 0, 45)
  }

  function rotate(bone, x, y, z) {
    scene.updateMatrixWorld(true);
    console.log(origin.setFromMatrixPosition(bone.endPoint.matrixWorld))
    bone.rotation.x += THREE.MathUtils.degToRad(x);
    bone.rotation.y += THREE.MathUtils.degToRad(y);
    bone.rotation.z += THREE.MathUtils.degToRad(z);
    scene.updateMatrixWorld(true);
    console.log(origin.setFromMatrixPosition(bone.endPoint.matrixWorld))
  }

  function distance3D(start, end) {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let dz = end.z - start.z;

    return (dx, dy, dz);
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

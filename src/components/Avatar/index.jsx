// @ts-check

import React from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
// import { Environment, Stats, useFBX } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import "./index.css";
import { isJsonString } from "../../utils";

/**
 * rotates the bone to look along the provided direction in world space.
 * direction should be target minus bone's world position.
 * @param {THREE.Object3D} bone - the bone to rotate
 * @param {THREE.Vector3} direction - the world direction to look along
 */
function boneLookAlongWorld(bone, direction) {
  var q = new THREE.Quaternion().setFromUnitVectors(bone.up.normalize(), direction.normalize());
  if (bone.parent) {
    let parentQuaternion = bone.parent.getWorldQuaternion(new THREE.Quaternion()).clone();
    q = q.premultiply(parentQuaternion.invert());
  }
  bone.quaternion.copy(q);
}

/**
 * Maps the bone names in the avatar rig to the pairs of joint names in the input data
 *
 * Each key represents a bone from the avatar rig, and the value is an array of two joint names
 * representing the joints that the bone connects.
 * @constant {Object<string, string[]>} boneMappings
 */
const boneMappings = {
  mixamorigLeftArm: ["leftShoulder", "leftElbow"],
  mixamorigLeftForeArm: ["leftElbow", "leftWrist"],
  mixamorigRightArm: ["rightShoulder", "rightElbow"],
  mixamorigRightForeArm: ["rightElbow", "rightWrist"],
  mixamorig2LeftArm: ["leftShoulder", "leftElbow"],
  mixamorig2LeftForeArm: ["leftElbow", "leftWrist"],
  mixamorig2RightArm: ["rightShoulder", "rightElbow"],
  mixamorig2RightForeArm: ["rightElbow", "rightWrist"],
};

/**
 * Sets the pose of the avatar based on the 3D world landmarks data.
 * @param {THREE.Object3D} avatar - The avatar object to change posture of.
 * @param {Object<string, number[]>} landmarks - The 3D world landmarks data, mapping name of a joint to [x, y, z] coordinates of the landmark in global space. Joint names must be present in `boneMappings` constant.
 * @example
 * setPose(avatar, {"leftShoulder": [0, 0, 0], "leftElbow": [0, 1, 0]}); // sets the pose of the avatar to have the left arm pointing upwards
 */
function setPose(avatar, landmarks) {
  for (const [rigBoneName, jointNames] of Object.entries(boneMappings)) {
    if (landmarks[jointNames[0]] && landmarks[jointNames[1]]) {
      let bone = avatar.getObjectByName(rigBoneName);
      if (!bone) continue;

      let direction = new THREE.Vector3().subVectors(
        new THREE.Vector3().fromArray(landmarks[jointNames[1]]),
        new THREE.Vector3().fromArray(landmarks[jointNames[0]])
      );
      boneLookAlongWorld(bone, direction);
    }
  }
  avatar.updateMatrixWorld(); // ! needed??
}

/**
 * Animates the avatar based on the 3D world landmarks data.
 * @param {THREE.Object3D} avatar - The avatar object to change posture of.
 * @param {Object<string, number[]>[]} frames - Array of 3D world landmarks data, each index corresponds to 1 frame/timeStep/pose. Each frame's object maps name of a body joint to its [x, y, z] coordinates in global space. Joint names must be present in `boneMappings` constant.
 * @param {number} fps - The frame rate of the animation (e.g. 30).
 * @example
 * poseAnimation(avatar, [{"leftShoulder": [0, 0, 0], "leftElbow": [0, 1, 0]}, {"leftShoulder": [0, 0, 0], "leftElbow": [0, 0, 1]}], 1); // animates the avatar to point the left arm upwards and then forwards at 1 framePerSecond.
 */
function poseAnimation(avatar, frames, fps) {
  if (frames.length === 0) return;
  let index = 0;

  let interval = setInterval(
    function () {
      if (index < frames.length) {
        setPose(avatar, frames[index]);
        index++;
      } else {
        // Stop the loop when data ends
        clearInterval(interval);
      }
    },
    fps ? 1000 / fps : 50
  );
}

export default function Avatar({ points }) {
  let frames = [];
  if (isJsonString(points)) {
    frames = JSON.parse(points);
  }

  // ==== Initialize the avatar ==== //
  const scene = new THREE.Scene();
  // var avatar = useFBX("src/assets/avatar/mixamo-bot.fbx");
  // avatar.scale.set(0.01, 0.01, 0.01); // cm to m
  var avatar = loadStacy();

  scene.add(avatar);

  scene.position.y = -2.5;
  scene.scale.set(2.5, 2.5, 2.5);

  // ==== Animate the avatar ==== //
  poseAnimation(scene, frames, 25);

  return (
    <div id="canvas-container">
      <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 4, 5]} intensity={25} />
        <primitive object={scene} />
        <OrbitControls />
        {/* <Environment files="src/assets/avatar/hdri-pultusk-castle.jpg" background /> */}
        {/* <axesHelper args={[1]} /> */}
        {/* <Stats /> */}
      </Canvas>
    </div>
  );
}

/**
 * https://tympanus.net/codrops/2019/10/14/how-to-create-an-interactive-3d-character-with-three-js/
 * @returns {THREE.Object3D} - The avatar object.
 */
function loadStacy() {
  let avatar = useGLTF("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb").scene;
  avatar.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;

      let texture = new THREE.TextureLoader().load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy.jpg");
      texture.flipY = false;

      o.material = new THREE.MeshPhongMaterial({
        map: texture,
        color: 0xffffff,
        skinning: true,
      });
    }
  });
  return avatar;
}

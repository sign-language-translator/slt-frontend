import { OrbitControls, useGLTF } from "@react-three/drei";
// import { Environment, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import "./index.css";
import { isJsonString } from "@utils/index";
// import PropTypes from 'prop-types';

// function AvatarGLTF({ url, texture, animations, basePosition, idleAnimation, transformFuctions, scale }) {
//   return <primitive />;
// }

export default function Avatar({ points }) {
  let inputAnim = {};
  if (isJsonString(points)) {
    inputAnim = JSON.parse(points);
  }

  // ! ==== Initialize the avatar ==== ! //
  // load the avatar
  const avatarGLTF = useGLTF("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb");
  const avatar = avatarGLTF.scene;

  // load & apply skin texture
  let avatarTexture = new THREE.TextureLoader().load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy.jpg");
  avatarTexture.flipY = false;
  const avatarMaterial = new THREE.MeshPhongMaterial({
    map: avatarTexture,
    color: 0xffffff,
  });
  avatar.traverse((obj3d) => {
    if (obj3d.isMesh) {
      obj3d.castShadow = true;
      obj3d.receiveShadow = true;
      obj3d.material = avatarMaterial;
    }
  });

  // Adjust avatar size & placement
  avatar.position.y = -3;
  avatar.scale.set(3, 3, 3);

  // ! ==== Animate the avatar ==== ! //
  // bind joints to variables
  let leftShoulder = avatar.getObjectByName("mixamorigLeftArm"),
    leftElbow = avatar.getObjectByName("mixamorigLeftForeArm"),
    leftWrist = avatar.getObjectByName("mixamorigLeftHand"),
    rightShoulder = avatar.getObjectByName("mixamorigRightArm"),
    rightElbow = avatar.getObjectByName("mixamorigRightForeArm"),
    rightWrist = avatar.getObjectByName("mixamorigRightHand"),
    rightPinkyTip = avatar.getObjectByName("mixamorigRightHandPinky3"),
    rightRingTip = avatar.getObjectByName("mixamorigRightHandRing3");

  // detach joints from their parent bones and attach them to the avatar
  // to make them transform in world space
  avatar.attach(leftShoulder);
  avatar.attach(rightShoulder);
  avatar.attach(leftElbow);
  avatar.attach(rightElbow);

  // leftShoulder.scale.set(new THREE.Vector3(1, 2, 1).normalize());

  if (inputAnim.name) {
    const mixer = new THREE.AnimationMixer(avatar);
    // const clock = new THREE.Clock();

    // Start the animation
    function update(t) {
      mixer.update(0.05);
      requestAnimationFrame(update);
    }

    // * Bind an animation to the avatar
    let inputAnimClip = THREE.AnimationClip.parse(inputAnim);
    let inputAnimJointsNames = inputAnimClip.tracks.map((track) => track.name.split(".")[0]);

    let idleAnimClip = THREE.AnimationClip.findByName(avatarGLTF.animations, "idle").clone();
    let useableIdleTracks = idleAnimClip.tracks.filter(
      (track) => !inputAnimJointsNames.includes(track.name.split(".")[0])
    );

    if (useableIdleTracks.length > 0) {
      let newTimeSteps = [];
      let numTimeSteps = useableIdleTracks[0].times.length;
      for (let i = 1; i <= numTimeSteps; i++) {
        newTimeSteps.push((inputAnimClip.duration * i) / numTimeSteps);
      }

      for (let i = 0; i < useableIdleTracks.length; i++) {
        useableIdleTracks[i].times = newTimeSteps;
        inputAnimClip.tracks.push(useableIdleTracks[i]);
      }
    }

    console.log(inputAnimClip);

    const animAction = mixer.clipAction(inputAnimClip);
    animAction.play();
    // console.log(THREE.AnimationClip.toJSON(idleAnim));
    // idleAnim.tracks.push(pos);

    update();
  }
  return (
    <div id="canvas-container">
      <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
        {/* <Environment files="/img/hdri/vaporwave.jpg" background /> */}
        <ambientLight intensity={0.69} />
        <primitive object={avatarGLTF.scene} />
        <axesHelper args={[1]} />
        <OrbitControls />
        {/* <Stats /> */}
      </Canvas>
    </div>
  );
}

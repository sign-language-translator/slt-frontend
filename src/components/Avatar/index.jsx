import { Environment, OrbitControls, useGLTF, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import "./index.css";
import { isJsonString } from "../../utils";
import { CCDIKSolver, CCDIKHelper } from 'three/addons/animation/CCDIKSolver.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

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

  console.log(avatar)
  // console.log(rightElbow)
  // console.log(leftShoulder.constructor.name)

  const OOI = {}
  avatar.traverse( n => {
    if ( n.name === 'mixamorigRightArm' ) OOI.arm = n;
    if ( n.name === 'mixamorigRightForeArm' ) OOI.forearm = n;
    if ( n.name === 'mixamorigRightHand' ) OOI.hand = n;
    if ( n.name === 'stacy' ) OOI.kira = n;
  } );
  const targetPosition = OOI.hand.position.clone();
  OOI.kira.add( OOI.kira.skeleton.bones[ 0 ] );
  console.log(OOI)
  const iks = [
    {
      target: 34, // "target_hand_l"
      effector: 32, // "hand_l"
      links: [
        {
          index: 33, // "lowerarm_l"
          rotationMin: new THREE.Vector3( 1.2, - 1.8, - .4 ),
          rotationMax: new THREE.Vector3( 17, 11, 30 )
        },
      ],
    }
  ];
  let IKSolver = new CCDIKSolver( OOI.kira, iks );
  const ccdikhelper = new CCDIKHelper( OOI.kira, iks, 0.01 );
  avatar.add(ccdikhelper)

  let camera, renderer, transformControls;

  let conf = {
    ik_solver: true,
    update: updateIK
  };

  camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.001, 5000 );
  camera.position.set( 0.9728517749133652, 1.1044765132727201, 0.7316689528482836 );
  camera.lookAt( avatar.position );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setAnimationLoop( animate );
  document.body.appendChild( renderer.domElement );

  transformControls = new TransformControls( camera, renderer.domElement );
  transformControls.size = 0.75;
  transformControls.showX = false;
  transformControls.space = 'world';
  transformControls.attach( OOI.hand );
  avatar.add( transformControls );

  function animate( ) {
    if ( conf.ik_solver ) {
      updateIK();
    }
    // orbitControls.update();
    renderer.render( avatar, camera );
  }
  function updateIK() {
    if ( IKSolver ) IKSolver.update();
    avatar.traverse( function ( object ) {
      if ( object.isSkinnedMesh ) object.computeBoundingSphere();
    } );
  }

  

  // // detach joints from their parent bones and attach them to the avatar
  // // to make them transform in world space
  // avatar.attach(leftShoulder);
  // avatar.attach(rightShoulder);
  // avatar.attach(leftElbow);
  // avatar.attach(rightElbow);

  // // leftShoulder.scale.set(new THREE.Vector3(1, 2, 1).normalize());

  // if (inputAnim.name) {
  //   const mixer = new THREE.AnimationMixer(avatar);
  //   // const clock = new THREE.Clock();

  //   // Start the animation
  //   function update(t) {
  //     mixer.update(0.05);
  //     requestAnimationFrame(update);
  //   }

  //   // * Bind an animation to the avatar
  //   let inputAnimClip = THREE.AnimationClip.parse(inputAnim);
  //   let inputAnimJointsNames = inputAnimClip.tracks.map((track) => track.name.split(".")[0]);

  //   let idleAnimClip = THREE.AnimationClip.findByName(avatarGLTF.animations, "idle").clone();
  //   let useableIdleTracks = idleAnimClip.tracks.filter(
  //     (track) => !inputAnimJointsNames.includes(track.name.split(".")[0])
  //   );

  //   if (useableIdleTracks.length > 0) {
  //     let newTimeSteps = [];
  //     let numTimeSteps = useableIdleTracks[0].times.length;
  //     for (let i = 1; i <= numTimeSteps; i++) {
  //       newTimeSteps.push((inputAnimClip.duration * i) / numTimeSteps);
  //     }

  //     for (let i = 0; i < useableIdleTracks.length; i++) {
  //       useableIdleTracks[i].times = newTimeSteps;
  //       inputAnimClip.tracks.push(useableIdleTracks[i]);
  //     }
  //   }

  //   console.log(inputAnimClip);

  //   const animAction = mixer.clipAction(inputAnimClip);
  //   animAction.play();
  //   // console.log(THREE.AnimationClip.toJSON(idleAnim));
  //   // idleAnim.tracks.push(pos);

  //   update();
  // }
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

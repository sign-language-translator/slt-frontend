import * as THREE from "three";

function setWorldRotation(joint, x = 0, y = 0, z = 0, add = false) {
  const parent = joint.parent;
  joint.removeFromParent();
  if (add) {
    joint.rotation.x += x;
    joint.rotation.y += y;
    joint.rotation.z += z;
  } else {
    joint.rotation.set(x, y, z);
  }
  parent.attach(joint);
  return joint;
}

function setWorldQuaternion(joint, x = 0, y = 0, z = 0, w = 1) {
  const parent = joint.parent;
  joint.removeFromParent();
  joint.quaternion.set(x, y, z, w);
  parent.attach(joint);
  return joint;
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function skeletonInfo(avatar) {
  let data = {};
  avatar.traverse((o) => {
    if (o.isBone) {
      let worldVector = new THREE.Vector3();
      o.getWorldPosition(worldVector);
      data[o.name] = {
        world: worldVector.toArray(),
        up: o.up.toArray(),
        parent: o.parent.name,
        children: o.children.map((c) => c.name),
      };
    }
  });
  return data;
}

export { setWorldRotation, setWorldQuaternion, isJsonString, skeletonInfo };

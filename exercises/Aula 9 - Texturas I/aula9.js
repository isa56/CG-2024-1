import * as THREE from "three";
import { OrbitControls } from "../../../build/jsm/controls/OrbitControls.js";
import {
  initRenderer,
  initCamera,
  initDefaultBasicLight,
  setDefaultMaterial,
  InfoBox,
  onWindowResize,
  createGroundPlaneXZ,
} from "../../../libs/util/util.js";

let scene, renderer, camera, material, light, orbit; // Initial variables
scene = new THREE.Scene(); // Create main scene
renderer = initRenderer(); // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

// create the ground plane
let plane = createGroundPlaneXZ(20, 20);
scene.add(plane);

// create a cube
let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
let cube = new THREE.Mesh(cubeGeometry, material);
// position the cube
cube.position.set(0.0, 2.0, 0.0);
// add the cube to the scene
scene.add(cube);

// Util functions

// Function to set a texture
function setMaterial(file, repeatU = 1, repeatV = 1, color = 'rgb(255,255,255)'){
  let mat = new THREE.MeshBasicMaterial({ map: loader.load(file), color:color});
     mat.map.colorSpace = THREE.SRGBColorSpace;
  mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
  mat.map.minFilter = mat.map.magFilter = THREE.LinearFilter;
  mat.map.repeat.set(repeatU,repeatV); 
  return mat;
}

function createCylinder(pos, mat) {
  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1);
  let cylinder = new THREE.Mesh(cylinderGeometry, mat);

  cylinder.position.set(pos.x, 0.5, pos.z);
  cylinder.castShadow = true;

  scene.add(cylinder);
  return cylinder;
}

let cylinderMat = [
  setMaterial(), // corpo
  setMaterial(), // topo
  setMaterial(), // baixo
]



// Use this to show information onscreen
let controls = new InfoBox();
controls.add("Basic Scene");
controls.addParagraph();
controls.add("Use mouse to interact:");
controls.add("* Left button to rotate");
controls.add("* Right button to translate (pan)");
controls.add("* Scroll to zoom in/out.");
controls.show();

render();
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}

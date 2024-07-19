import * as THREE from "three";
import GUI from "../../libs/util/dat.gui.module.js";
import { OrbitControls } from "../../build/jsm/controls/OrbitControls.js";
import {
  initRenderer,
  setDefaultMaterial,
  initDefaultBasicLight,
  onWindowResize,
  createLightSphere,
} from "../../libs/util/util.js";
import { loadLightPostScene } from "../../libs/util/utilScenes.js";

let scene, renderer, camera, orbit;
scene = new THREE.Scene(); // Create main scene
renderer = initRenderer(); // View function in util/utils
renderer.setClearColor("rgb(30, 30, 42)");
camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.lookAt(0, 0, 0);
camera.position.set(5, 5, 5);
camera.up.set(0, 1, 0);
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
let axesHelper = new THREE.AxesHelper(3);
axesHelper.visible = false;
scene.add(axesHelper);

let dirPosition = new THREE.Vector3(2, 2, 4);
const dirLight = new THREE.DirectionalLight("white", 0.2);
dirLight.position.copy(dirPosition);
//mainLight.castShadow = true;
scene.add(dirLight);

// Load default scene
loadLightPostScene(scene);

////////////////////////////////////////////// Exercício Aula 6:

function createCube(pos, mat) {
  let cubeGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
  let cube = new THREE.Mesh(cubeGeometry, mat);
  // position the cube
  cube.position.set(pos.x, 0.5, pos.z);
  cube.castShadow = true;
  // add the cube to the scene
  scene.add(cube);
  return cube;
}

function createCylinder(pos, mat) {
  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1);
  let cylinder = new THREE.Mesh(cylinderGeometry, mat);

  cylinder.position.set(pos.x, 0.5, pos.z);
  cylinder.castShadow = true;

  scene.add(cylinder);
  return cylinder;
}

function loadObjectsToScene() {
  let cube1 = createCube({ x: 2, z: 0 }, setDefaultMaterial());
  let cube2 = createCube(
    { x: 2, z: 2 },
    setDefaultMaterial("rgb(20, 20, 255)")
  );
  let cylinder1 = createCylinder(
    { x: 1, z: -2 },
    setDefaultMaterial("rgb(20, 255, 20)")
  );
  let cylinder2 = createCylinder(
    { x: 1, z: 4 },
    setDefaultMaterial("rgb(165, 30, 165)")
  );

  /*
  console.log(
    "cube 1:",
    cube1.castShadow,
    "cube 2:",
    cube2.castShadow,
    "cylinder 1:",
    cylinder1.castShadow,
    "cylinder 2:",
    cylinder2.castShadow
  );
  */
}

const lightColor = "rgb(255, 255, 255)";

function createAmbientLight() {
  let ambientLight = new THREE.AmbientLight(lightColor);
  ambientLight.castShadow = true;
  scene.add(ambientLight);
}

// TODO: Esse cara
function createSpotlight() {
  let position = new THREE.Vector3();
  let spotLight = new THREE.SpotLight(lightColor, 0.8);
  spotLight.position.copy(position);
  spotLight.angle = THREE.MathUtils.degToRad(40);
  spotLight.castShadow = true;

  scene.add(spotLight);
}

function createDirectionalLight() {
  let position = new THREE.Vector3(0.5, 2, -1.5);
  let directionalLight = new THREE.DirectionalLight(lightColor, 0.8);
  directionalLight.position.copy(position);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}

// createAmbientLight();
// createDirectionalLight();
createSpotlight();

loadObjectsToScene();

// REMOVA ESTA LINHA APÓS CONFIGURAR AS LUZES DESTE EXERCÍCIO
// initDefaultBasicLight(scene);

/////////////////////////////

//---------------------------------------------------------
// Load external objects
buildInterface();
render();

function buildInterface() {
  // GUI interface
  let gui = new GUI();
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

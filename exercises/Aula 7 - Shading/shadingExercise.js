import * as THREE from "three";
import GUI from "../../libs/util/dat.gui.module.js";
import { OrbitControls } from "../../build/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "../../build/jsm/geometries/TeapotGeometry.js";

import {
  initRenderer,
  onWindowResize,
  createGroundPlaneXZ,
} from "../../libs/util/util.js";
import {
  MeshPhongMaterial,
  MeshLambertMaterial,
} from "../../build/three.module.js";

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

////////////////////////////////////////////// Exercício Aula 7:

let plane = createGroundPlaneXZ(20, 20);
scene.add(plane);

function createCylinder(pos, castShadow = false) {
  const cylinderGeometry = new THREE.CylinderGeometry(0.1, 1, 3);

  const cylinderMaterial = new THREE.MeshPhongMaterial({
    color: "rgb(20, 100, 168)",
    flatShading: true,
  });

  let cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

  cylinder.position.set(pos.x, 1.5, pos.z);
  cylinder.castShadow = castShadow;

  scene.add(cylinder);
  return cylinder;
}

function createTeapot(pos, castShadow) {
  const teapotGeometry = new TeapotGeometry(0.5);

  const teapotMaterial = new MeshPhongMaterial({
    color: "rgb(255, 20, 20)",
    shininess: "200",
    specular: "rgb(255, 255, 255)",
  });

  let teapot = new THREE.Mesh(teapotGeometry, teapotMaterial);
  
  teapot.position.set(pos.x, 0.5, pos.z);
  teapot.castShadow = castShadow;

  scene.add(teapot);

  return teapot;
}

function createSphere(pos, castShadow) {
  const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32);

  const sphereMaterial = new MeshLambertMaterial({
    color: "rgb(20, 180, 70)",
  });

  let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.set(pos.x, 0.4, pos.z);
  sphere.castShadow = castShadow;

  scene.add(sphere);

  return sphere;
}

function loadObjectsToScene() {
  let castShadow = true;

  // TODO: Exercício 2

  let cylinder1 = createCylinder({ x: 1, z: -2 }, castShadow);
  let teapot1 = createTeapot({ x: -1.3, z: -1.7 }, castShadow);
  let sphere1 = createSphere({ x: -4, z: -1.3 }, castShadow);
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
  let position = new THREE.Vector3(5, 0.6, -1.5);
  let directionalLight = new THREE.DirectionalLight(lightColor, 0.8);
  directionalLight.position.copy(position);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}

// createAmbientLight();
createDirectionalLight();
// createSpotlight();

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

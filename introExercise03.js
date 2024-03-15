import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

let scene, renderer, camera, material, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);


//////////////////////////////////  EXERCÍCIOS 03 //////////////////////////////////

function randomizeColor() {
    return Math.floor(Math.random() * 255);
}

function createAndPositionCube(positionX = 0, positionY = 0, positionZ = 0) {
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cube = new THREE.Mesh(cubeGeometry, setDefaultMaterial(`rgb(${randomizeColor()}, ${randomizeColor()}, ${randomizeColor()})`));
    cube.position.set(positionX, positionY, positionZ);
    scene.add(cube);
}

let posX = -4;
let posZ = -4;

for (let i = 0; i < 3; i++) {
    let posX = -4;
    for (let j = 0; j < 3; j++) {
        createAndPositionCube(posX, 1.5, posZ);
        posX += 4;
    }
    posZ += 4;
}


///////////////////////////////// FIM EXERCÍCIOS 03 /////////////////////////////////

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xffffff,2);
scene.add(light);

const loader = new GLTFLoader();

loader.load('/static/models/cube.glb', function(gltf){

    scene.add(gltf.scene);

}, undefined, function(error){

    console.error(error);

});

camera.position.z = 5;

function animate(){

    requestAnimationFrame(animate);

    renderer.render(scene,camera);

}

animate();
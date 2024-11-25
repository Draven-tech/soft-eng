import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


const MAX_STARS = 300;
const stars = [];


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render (scene, camera);


window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const earthTexture = new THREE.TextureLoader().load('textures/earth.jpg')
const bumpsTexture = new THREE.TextureLoader().load('textures/bumps.jpg')
const cloudTexture = new THREE.TextureLoader().load('textures/cloud.png')
const oceanTexture = new THREE.TextureLoader().load('textures/ocean.png')
const nightLightTexture = new THREE.TextureLoader().load('textures/nightLight.png')

const geometry = new THREE.SphereGeometry( 18, 32, 16 );
const material = new THREE.MeshStandardMaterial({ 
  color: 0xfffffffff,
  map: earthTexture,
  normalMap: bumpsTexture
}); 
const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );
scene.add(sphere);
sphere.position.set(0, -8, 2); //position ang sphere 
sphere.rotation.y = Math.PI / 1.2; //start at the ph
sphere.rotation.x = Math.PI/ -11; //tilt backward



/////////////////lights



const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Soft light, low intensity
scene.add(ambientLight);


////////////////////////////////////////////////////////// controll movement thru mouse

const controls = new OrbitControls(camera, renderer.domElement);

// controls.maxPolarAngle = Math.PI / 2; 
// controls.minPolarAngle = Math.PI / 2;


function addStar() {
  if (stars.length >= MAX_STARS) return; // Prevent adding more than MAX_STARS

  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const x = THREE.MathUtils.randFloatSpread(200); 
  const y = THREE.MathUtils.randFloatSpread(200); 
  const z = THREE.MathUtils.randFloat(-30, 100); // Adjust range if needed

  star.position.set(x, y, z);
  scene.add(star);
  stars.push(star);
}

// Add finite stars to the scene
for (let i = 0; i < MAX_STARS; i++) {
  addStar();
}

///////////////////////////animations


function animate(){
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.0007; // asa ga tuyok ang sphere 

  stars.forEach((star, index) => {
    star.position.x += 0.05;

    if (star.position.x > 100) {
      scene.remove(star);
      stars.splice(index, 1);
      addStar();
    }
  });

  controls.update();

  renderer.render(scene, camera);
}



animate()



///////////////////harmbuger menu js /////////////////////////

const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

const overlay = document.querySelector('.overlay');

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
  overlay.classList.toggle('active');
});

////////////////////////////////////////////////////////////////
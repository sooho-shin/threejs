import * as THREE from "three";

// renderer comElement 는 canvas

// document.body.appendChild(renderer.domElement);
export default function example() {
  const canvas = document.getElementById("container");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // renderer.setClearAlpha(1);
  renderer.setClearColor(0x00ff00);
  // renderer.setClearAlpha(0.5);

  //Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  // Camera
  // perspective Camera ( 원근 카메라 )

  /*
    종횡비란 화면의 가로 세로 비율이다 
  */

  const camera = new THREE.PerspectiveCamera(
    75, //시야각
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );
  camera.position.x = 1;
  camera.position.z = 5;
  camera.position.y = 2;

  scene.add(camera);

  // Mesh

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "red",
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", setSize);
}

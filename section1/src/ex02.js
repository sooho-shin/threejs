import * as THREE from "three";

// renderer comElement 는 canvas

// document.body.appendChild(renderer.domElement);
export default function example() {
  const canvas = document.getElementById("container");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  /*
  window.devicePixelRatio 사용자 기기별 픽셀비율
  2배수인지 3배수인지 1배수인지 같은거?
  */
  console.log(window.devicePixelRatio);

  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // 그냥 window.devicePixelRatio 로 박는거 보다 위처럼 3항 연산자로 하는게 성능상 유리하다

  //Scene
  const scene = new THREE.Scene();

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

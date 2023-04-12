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

  //Scene
  const scene = new THREE.Scene();

  // Camera
  // perspective Camera ( 원근 카메라 )
  // const camera = new THREE.PerspectiveCamera(
  //   75, //시야각
  //   window.innerWidth / window.innerHeight, // 종횡비(aspect)
  //   0.1, // near
  //   1000 // far
  // );
  // camera.position.x = 1;
  // camera.position.z = 5;
  // camera.position.y = 2;

  // Orthographic Camera ( 직교 카메라 )
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right
    1, // top
    -1, // bottom
    0.1, // near
    1000 // far
  );

  camera.position.x = 1;
  camera.position.z = 5;
  camera.position.y = 2;
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5;

  camera.updateProjectionMatrix(); // 카메라 업데이트를 했으면 이렇게 해야함 ( 여기에서는 zoom 속성을 추가했음)
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
}

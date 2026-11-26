import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const BOUND = 1.04;

export default function Planet() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
    camera.position.set(0, 0.12, 4);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.7;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.35;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI - 0.35;
    controls.target.set(0, 0, 0);

    const map = new THREE.TextureLoader().load("/earth-day.jpg");
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 96),
      new THREE.MeshBasicMaterial({ map })
    );
    earth.rotation.y = -Math.PI / 2;
    scene.add(earth);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.035, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: { glowColor: { value: new THREE.Color("#8eb7e8") } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 glowColor;
          void main() {
            float rim = pow(clamp(0.45 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 2.8);
            gl_FragColor = vec4(glowColor, rim * 0.55);
          }
        `,
      })
    );
    scene.add(glow);

    const frameCamera = () => {
      const width = Math.max(wrap.clientWidth, 1);
      const height = Math.max(wrap.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const vFov = (camera.fov * Math.PI) / 180;
      const distForHeight = BOUND / Math.tan(vFov / 2);
      const distance = Math.max(distForHeight, distForHeight / camera.aspect) * 1.06;
      const offset = camera.position.clone().sub(controls.target);
      if (offset.lengthSq() < 0.001) offset.set(0, 0.12, 1);
      offset.setLength(distance);
      camera.position.copy(controls.target).add(offset);
      controls.minDistance = distance;
      controls.maxDistance = distance;
      controls.update();
    };

    frameCamera();
    const observer = new ResizeObserver(frameCamera);
    observer.observe(wrap);

    const stopSpin = () => {
      controls.autoRotate = false;
    };
    const resumeSpin = () => {
      controls.autoRotate = !reduced;
    };
    renderer.domElement.addEventListener("pointerdown", stopSpin);
    window.addEventListener("pointerup", resumeSpin);

    let frame = 0;
    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointerdown", stopSpin);
      window.removeEventListener("pointerup", resumeSpin);
      controls.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          [].concat(object.material).forEach((material) => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={wrapRef} className="planet" role="img" aria-label="Career Planet globe. Drag to turn it." />
  );
}

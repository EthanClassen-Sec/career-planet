import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const BOUND = 1.12;

export default function Planet() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
    camera.position.set(0, 0.08, 4);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.55;
    controls.autoRotate = false;
    controls.minPolarAngle = 0.55;
    controls.maxPolarAngle = Math.PI - 0.55;
    controls.target.set(0, 0, 0);

    const loader = new THREE.TextureLoader();
    const dayMap = loader.load("/earth-day.jpg");
    const lightsMap = loader.load("/earth-lights.png");
    dayMap.colorSpace = THREE.SRGBColorSpace;
    lightsMap.colorSpace = THREE.SRGBColorSpace;
    dayMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
    lightsMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 96),
      new THREE.ShaderMaterial({
        uniforms: {
          dayMap: { value: dayMap },
          lightsMap: { value: lightsMap },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          uniform sampler2D dayMap;
          uniform sampler2D lightsMap;
          void main() {
            vec3 day = texture2D(dayMap, vUv).rgb;
            vec3 lights = texture2D(lightsMap, vUv).rgb;
            float lum = dot(day, vec3(0.299, 0.587, 0.114));
            float land = smoothstep(0.22, 0.42, lum);
            vec3 ocean = vec3(0.008, 0.03, 0.12);
            vec3 ground = day * vec3(0.38, 0.32, 0.22) + vec3(0.03, 0.04, 0.06);
            vec3 color = mix(ocean, ground, land);
            float city = max(max(lights.r, lights.g), lights.b);
            city = smoothstep(0.14, 0.42, city);
            color += vec3(1.0, 0.55, 0.14) * city * 1.35;
            float rim = pow(clamp(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 1.35);
            color += vec3(0.2, 0.55, 1.0) * rim * 1.05;
            float warm = pow(clamp(dot(vNormal, normalize(vec3(0.75, -0.3, 0.45))), 0.0, 1.0), 3.0);
            color += vec3(1.0, 0.42, 0.12) * warm * 0.18;
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      })
    );
    earth.rotation.y = -Math.PI / 2;
    scene.add(earth);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.07, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: { glowColor: { value: new THREE.Color("#6cb6ff") } },
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
            float rim = pow(clamp(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 2.1);
            gl_FragColor = vec4(glowColor, rim * 0.85);
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
      const distance = Math.max(distForHeight, distForHeight / camera.aspect) * 1.04;
      const offset = camera.position.clone().sub(controls.target);
      if (offset.lengthSq() < 0.001) offset.set(0, 0.08, 1);
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
    renderer.domElement.addEventListener("pointerdown", stopSpin);

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
      dayMap.dispose();
      lightsMap.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={wrapRef} className="planet" role="img" aria-label="Earth centred on Africa. Drag to turn it." />
  );
}

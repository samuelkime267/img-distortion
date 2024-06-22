/* eslint-disable */

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import fragmentShader from "../shader/fragment.glsl";
import vertexShader from "../shader/vertex.glsl";
import { ShaderMaterial } from "three";

const Experience = () => {
  const shaderMaterialRef = useRef<ShaderMaterial>(null);
  useFrame((state, deltaTime) => {
    if (!shaderMaterialRef.current) return;
    shaderMaterialRef.current.uniforms.time.value += 0.05;
  });

  return (
    <>
      <OrbitControls />

      <mesh>
        <shaderMaterial
          ref={shaderMaterialRef}
          uniforms={{ time: { value: 0 } }}
          side={THREE.DoubleSide}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
        <planeGeometry args={[1, 1, 1, 1]} />
      </mesh>
    </>
  );
};

export default Experience;

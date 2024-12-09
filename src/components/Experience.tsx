/* eslint-disable */

import * as THREE from "three";
import { useRef } from "react";
import fragmentShader from "../shader/fragment.glsl";
import vertexShader from "../shader/vertex.glsl";
import useImageDistortion from "../hooks/useImageDistortion";

const Experience = () => {
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { uniforms } = useImageDistortion(shaderMaterialRef, meshRef);

  return (
    <>
      <color attach={"background"} args={["#f6ead7"]} />
      <mesh ref={meshRef}>
        <shaderMaterial
          ref={shaderMaterialRef}
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          transparent
        />
        <planeGeometry args={[1, 1, 32, 32]} />
      </mesh>
    </>
  );
};

export default Experience;

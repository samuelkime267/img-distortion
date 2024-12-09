import * as THREE from "three";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import interiorImg from "../assets/interior.jpg";
import luxuryImg from "../assets/luxury.jpg";
import sportImg from "../assets/sports.jpg";
import vehicleImg from "../assets/vehicles.jpg";
import gsap from "gsap";

function normalize(
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

export default function useImageDistortion(
  shaderMaterialRef: React.RefObject<THREE.ShaderMaterial>,
  meshRef: React.RefObject<
    THREE.Mesh<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.Material | THREE.Material[],
      THREE.Object3DEventMap
    >
  >
) {
  const {
    viewport: { width, height },
    pointer,
  } = useThree();
  const strength = 0.5;
  const position = useRef(new THREE.Vector3(0, 0, 0));
  const currentImg = useRef(0);

  const onPositionUpdate = useCallback(() => {
    if (!meshRef.current || !shaderMaterialRef.current) return;

    const offset = meshRef.current.position
      .clone()
      .sub(position.current)
      .multiplyScalar(strength);
    shaderMaterialRef.current.uniforms.uOffset.value = offset;
  }, [meshRef, shaderMaterialRef]);

  const textures = useTexture([interiorImg, luxuryImg, sportImg, vehicleImg]);

  useEffect(() => {
    if (!meshRef.current || !textures) return;
    const setImgRatio = () => {
      if (!meshRef.current) return;
      const imgRatio =
        textures[currentImg.current].source.data.width /
        textures[currentImg.current].source.data.height;
      meshRef.current.scale.set(imgRatio, 1, 1);
    };

    setImgRatio();

    const handleImgChange = () => {
      if (!shaderMaterialRef.current || !meshRef.current) return;

      currentImg.current = (currentImg.current + 1) % textures.length;
      shaderMaterialRef.current.uniforms.uTexture.value =
        textures[currentImg.current];
      setImgRatio();
    };

    window.addEventListener("click", handleImgChange);

    return () => {
      window.removeEventListener("click", handleImgChange);
    };
  }, [textures, meshRef, shaderMaterialRef]);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!shaderMaterialRef.current || !meshRef.current) return;

      const x = normalize(pointer.x, -1, 1, -width / 2, width / 2);
      const y = normalize(pointer.y, -1, 1, -height / 2, height / 2);

      position.current.set(x, y, 0);
      gsap.to(meshRef.current.position, {
        x,
        y,
        ease: "Power4.easeOut",
        duration: 1,
        onUpdate: onPositionUpdate,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [width, height, onPositionUpdate, pointer, shaderMaterialRef, meshRef]);

  const uniforms = useMemo(() => {
    return {
      uTexture: { value: textures[currentImg.current] },
      uAlpha: { value: 1 },
      uOffset: { value: new THREE.Vector2(0, 0) },
    };
  }, [textures]);

  return { uniforms };
}

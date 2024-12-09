uniform sampler2D uTexture;
uniform float uAlpha;
uniform vec2 uOffset;


varying vec2 vUv;


vec3 rgbShift(sampler2D imgTexture, vec2 uv, vec2 offset) {
	float r = texture2D(imgTexture,uv + uOffset).r;
	vec2 gb = texture2D(imgTexture,uv).gb;
	return vec3(r,gb);
}



void main() {

	// vec3 color = texture2D(uTexture,vUv).rgb;

  vec3 color = rgbShift(uTexture,vUv,uOffset).rgb;
  gl_FragColor = vec4(color,uAlpha);
}
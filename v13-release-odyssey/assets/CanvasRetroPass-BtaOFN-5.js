import{r as e}from"./rolldown-runtime-S-ySWqyJ.js";import{i as t}from"./react-vendor-BLBwLZpb.js";import{C as n,n as r,r as i,t as a}from"./three-vendor-FpVRIyvr.js";import{a as o,r as s}from"./r3f-vendor-CzHA-HHR.js";var c=e(t(),1),l={uniforms:{tDiffuse:{value:null},uResolution:{value:new n(1,1)},uStrength:{value:0},uPixelSize:{value:2},uPaletteSteps:{value:14},uChromaticOffset:{value:.001}},vertexShader:`
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uStrength;
    uniform float uPixelSize;
    uniform float uPaletteSteps;
    uniform float uChromaticOffset;
    varying vec2 vUv;

    float bayer4(vec2 pixel) {
      int x = int(mod(pixel.x, 4.0));
      int y = int(mod(pixel.y, 4.0));
      int index = x + y * 4;
      if (index == 0) return 0.0 / 16.0;
      if (index == 1) return 8.0 / 16.0;
      if (index == 2) return 2.0 / 16.0;
      if (index == 3) return 10.0 / 16.0;
      if (index == 4) return 12.0 / 16.0;
      if (index == 5) return 4.0 / 16.0;
      if (index == 6) return 14.0 / 16.0;
      if (index == 7) return 6.0 / 16.0;
      if (index == 8) return 3.0 / 16.0;
      if (index == 9) return 11.0 / 16.0;
      if (index == 10) return 1.0 / 16.0;
      if (index == 11) return 9.0 / 16.0;
      if (index == 12) return 15.0 / 16.0;
      if (index == 13) return 7.0 / 16.0;
      if (index == 14) return 13.0 / 16.0;
      return 5.0 / 16.0;
    }

    void main() {
      vec2 pixel = vUv * uResolution;
      vec2 snappedUv = (floor(pixel / uPixelSize) * uPixelSize + uPixelSize * 0.5) / uResolution;
      vec2 uv = mix(vUv, snappedUv, uStrength * 0.42);

      float vignette = smoothstep(0.92, 0.24, distance(vUv, vec2(0.5)));
      float chroma = uChromaticOffset * uStrength;
      vec3 color;
      color.r = texture2D(tDiffuse, uv + vec2(chroma, 0.0)).r;
      color.g = texture2D(tDiffuse, uv).g;
      color.b = texture2D(tDiffuse, uv - vec2(chroma, 0.0)).b;

      float threshold = bayer4(pixel) - 0.5;
      vec3 quantized = floor(color * uPaletteSteps + threshold * uStrength * 0.72) / uPaletteSteps;
      color = mix(color, quantized, uStrength * 0.34);
      color *= mix(0.94, 1.03, vignette);
      color += vec3(0.018, 0.036, 0.032) * uStrength * vignette;

      gl_FragColor = vec4(color, 1.0);
    }
  `};function u(e,t){return e||t===`low`?0:t===`high`?.62:.34}function d({active:e,qualityTier:t}){let{gl:n,scene:d,camera:f,size:p}=o(),m=(0,c.useMemo)(()=>{let e=new r(n);e.addPass(new a(d,f));let t=new i(l);return e.addPass(t),{composer:e,shaderPass:t}},[f,n,d]);return(0,c.useEffect)(()=>(document.body.dataset.museumCanvasRetroPass=t,()=>{delete document.body.dataset.museumCanvasRetroPass}),[t]),(0,c.useEffect)(()=>{let e=n.getPixelRatio();m.composer.setPixelRatio(e),m.composer.setSize(p.width,p.height),m.shaderPass.uniforms.uResolution.value.set(p.width*e,p.height*e)},[m,n,p.height,p.width]),(0,c.useEffect)(()=>()=>{m.composer.dispose(),m.shaderPass.material.dispose()},[m]),s((n,r)=>{let i=m.shaderPass.uniforms,a=u(e,t);i.uStrength.value+=(a-i.uStrength.value)*(1-8e-4**r),i.uPixelSize.value=t===`high`?2:1.35,i.uPaletteSteps.value=t===`high`?13:18,i.uChromaticOffset.value=t===`high`?.0012:55e-5,m.composer.render(r)},1),null}export{d as CanvasRetroPass};
export type HolographicRenderer = { setMotion: (enabled: boolean) => void; dispose: () => void };

// Fixed image coordinates with animated silver lighting: one texture, one pass, two triangles.
export function createHolographicRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement, enabled: boolean): HolographicRenderer {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power', preserveDrawingBuffer: false });
  if (!gl) throw new Error('WebGL unavailable');
  const vertexSource = `attribute vec2 a_position; varying vec2 v_uv; void main(){v_uv=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}`;
  const fragmentSource = `precision mediump float;
    uniform sampler2D u_image; uniform vec2 u_resolution; uniform vec2 u_imageSize;
    uniform float u_time; uniform float u_motion; varying vec2 v_uv;
    float building(vec2 p){
      float roof=.08+.045*(1.-smoothstep(.38,.47,p.x));
      float right=.734+.098*smoothstep(.40,.46,p.y);
      return smoothstep(.235,.255,p.x)*(1.-smoothstep(right,right+.016,p.x))*smoothstep(roof,roof+.018,p.y)*(1.-smoothstep(.72,.75,p.y));
    }
    void main(){
      float screenRatio=u_resolution.x/u_resolution.y, imageRatio=u_imageSize.x/u_imageSize.y;
      vec2 fit=vec2(min(1.,screenRatio/imageRatio),min(1.,imageRatio/screenRatio));
      vec2 uv=(v_uv-.5)*fit+.5;
      vec2 p=vec2(uv.x,1.-uv.y);
      float shape=building(p), floorDepth=smoothstep(.48,1.,p.y)*.84;
vec3 color=texture2D(u_image,clamp(uv,.002,.998)).rgb;
      float scan=.72-fract(.42+u_time*.13)*.64;
      float band=exp(-pow((p.y-scan)/.022,2.));
      float detail=smoothstep(.19,.75,max(color.b,color.g));
      color+=vec3(.72)*band*detail*shape*.65*u_motion;
      color+=vec3(.10)*detail*shape*(.65+.35*sin(u_time*1.4+p.y*9.))*u_motion;
      float pulse=pow(max(0.,sin(p.x*25.-u_time*.55)),16.);
      color+=vec3(.14)*pulse*floorDepth*detail*.12*u_motion;
      gl_FragColor=vec4(color,1.);
    }`;
  function shader(type: number, source: string) {
    const result=gl!.createShader(type)!;
    gl!.shaderSource(result,source); gl!.compileShader(result);
    if(!gl!.getShaderParameter(result,gl!.COMPILE_STATUS)) { const message=gl!.getShaderInfoLog(result); gl!.deleteShader(result); throw new Error(message || 'Shader compilation failed'); }
    return result;
  }
  const vertex=shader(gl.VERTEX_SHADER,vertexSource), fragment=shader(gl.FRAGMENT_SHADER,fragmentSource);
  const program=gl.createProgram()!;
  gl.attachShader(program,vertex); gl.attachShader(program,fragment); gl.linkProgram(program);
  gl.deleteShader(vertex); gl.deleteShader(fragment);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)) { gl.deleteProgram(program); throw new Error('Unable to link hero shader'); }
  gl.useProgram(program);
  const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const location=gl.getAttribLocation(program,'a_position'); gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location,2,gl.FLOAT,false,0,0);
  const texture=gl.createTexture(); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  const uniforms = { resolution:gl.getUniformLocation(program,'u_resolution'), imageSize:gl.getUniformLocation(program,'u_imageSize'), time:gl.getUniformLocation(program,'u_time'), motion:gl.getUniformLocation(program,'u_motion') };
  gl.uniform1i(gl.getUniformLocation(program,'u_image'),0); gl.uniform2f(uniforms.imageSize,image.naturalWidth,image.naturalHeight);
  const small=window.matchMedia('(max-width: 760px)').matches;
  const interval=1000/(small?24:30);
  let frame=0, disposed=false, contextLost=false, motion=enabled, visible=true, lastTime=0, elapsed=0, previous=0;
function render(now: number) {
    frame=0;
    if(disposed||contextLost||document.hidden||!visible) return;
    if(motion&&now-lastTime<interval) { frame=requestAnimationFrame(render); return; }
    const delta=previous?Math.min((now-previous)/1000,.1):0;
    previous=now; lastTime=now; if(motion) elapsed+=delta;
gl!.uniform1f(uniforms.time,elapsed); gl!.uniform1f(uniforms.motion,motion?1:0);
    gl!.drawArrays(gl!.TRIANGLES,0,6);
    canvas.dataset.amsFrames=String(Number(canvas.dataset.amsFrames||0)+1);
    canvas.dataset.amsState=motion?'playing':'still';
    if(motion) frame=requestAnimationFrame(render);
  }
  function schedule(){if(!frame&&!disposed&&!contextLost&&visible&&!document.hidden)frame=requestAnimationFrame(render);}
  function resize(){const dpr=Math.min(devicePixelRatio,small?1:1.5); canvas.width=Math.round(canvas.clientWidth*dpr);canvas.height=Math.round(canvas.clientHeight*dpr); gl!.viewport(0,0,canvas.width,canvas.height);gl!.uniform2f(uniforms.resolution,canvas.width,canvas.height);schedule();}
  const resizeObserver=new ResizeObserver(resize); resizeObserver.observe(canvas);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;previous=0;if(visible)schedule();else{cancelAnimationFrame(frame);frame=0;canvas.dataset.amsState='paused';}},{threshold:0}); observer.observe(canvas);
  function visibility(){previous=0;if(document.hidden){cancelAnimationFrame(frame);frame=0;canvas.dataset.amsState='paused';}else schedule();}
  function lost(event:Event){event.preventDefault();contextLost=true;cancelAnimationFrame(frame);frame=0;canvas.style.opacity='0';canvas.dataset.amsState='fallback';}
  document.addEventListener('visibilitychange',visibility);canvas.addEventListener('webglcontextlost',lost);
  resize();canvas.dataset.amsDrawCalls='1';canvas.dataset.amsTriangles='2';
  return {setMotion(value){motion=value;previous=0;lastTime=0;schedule();},dispose(){disposed=true;cancelAnimationFrame(frame);resizeObserver.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('webglcontextlost',lost);gl!.deleteTexture(texture);gl!.deleteBuffer(buffer);gl!.deleteProgram(program);gl!.getExtension('WEBGL_lose_context')?.loseContext();}};
}

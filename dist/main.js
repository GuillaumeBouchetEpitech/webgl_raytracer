var WQ=Object.defineProperty;var r=(Q,$)=>{for(var J in $)WQ(Q,J,{get:$[J],enumerable:!0,configurable:!0,set:(U)=>$[J]=()=>U})};var p0=["requestFullscreen","webkitRequestFullscreen","mozRequestFullScreen","msRequestFullscreen"],DQ=["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","msfullscreenchange"];class P0{_onFullScreenChangeCallbacks=[];_isInitialized=!1;_initialize(){if(this._isInitialized)return;this._isInitialized=!0;const Q=()=>{this._onFullScreenChangeCallbacks.forEach(($)=>$())};for(let $ of DQ)document.addEventListener($,Q,!1)}isCompatible(Q){for(let $ of p0)if($ in Q)return!0;return!1}isFullScreen(Q){return document.fullscreenElement===Q}async requestFullScreen(Q){if(this.isFullScreen(Q))return{success:!1,message:"element already in full screen"};this._initialize();for(let $ of p0)if($ in Q)return Q[$](),{success:!0,message:"request for full screen done"};return{success:!1,message:"unsupported request for full screen"}}addOnFullScreenChange(Q){this._onFullScreenChangeCallbacks.push(Q)}removeOnFullScreenChange(Q){const $=this._onFullScreenChangeCallbacks.indexOf(Q);if($<0)return;this._onFullScreenChangeCallbacks.splice($,1)}}var $$=new P0;var K0={Num0:48,Num1:49,Num2:50,Num3:51,Num4:52,Num5:53,Num6:54,Num7:55,Num8:56,Num9:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,Semicolon:186,Equal:187,Comma:188,Minus:189,Period:190,BackQuote:192,BracketLeft:219,Backslash:220,BracketRight:221,Quote:222,Shift:16,Ctrl:17,Alt:18,CapsLock:20,Tab:9,Enter:13,Pause:19,Escape:27,Space:32,PageUp:33,PageDown:34,End:35,Home:36,ArrowLeft:37,ArrowUp:38,ArrowRight:39,ArrowDown:40,PrintScreen:44,Insert:45,Delete:46,ContextMenu:93,ScrollLock:145,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,F16:127,F17:128,F18:129,F19:130,F20:131,F21:132,F22:133,F23:134,F24:135,NumPad0:96,NumPad1:97,NumPad2:98,NumPad3:99,NumPad4:100,NumPad5:101,NumPad6:102,NumPad7:103,NumPad8:104,NumPad9:105,NumPadMultiply:106,NumPadAdd:107,NumPadSubtract:109,NumPadDecimal:110,NumPadDivide:111,NumLock:144,NumPadComma:194,NumPadEqual:12};class k0{_pressedKeysSet=new Set;_preventDefaultKeysSet=new Set;_activated=!1;_handleKeyDown;_handleKeyUp;constructor(){const Q=(J)=>{const{keyCode:U}=J;if(this._preventDefaultKeysSet.has(U))J.preventDefault();this._pressedKeysSet.add(U)},$=(J)=>{const{keyCode:U}=J;if(this._preventDefaultKeysSet.has(U))J.preventDefault();this._pressedKeysSet.delete(U)};this._activated=!1,this._handleKeyDown=Q.bind(this),this._handleKeyUp=$.bind(this)}isPressed(...Q){for(let $ of Q)if(this._pressedKeysSet.has(K0[$]))return!0;return!1}preventDefault(Q){this._preventDefaultKeysSet.add(K0[Q])}enableDefault(Q){this._preventDefaultKeysSet.delete(K0[Q])}activate(){if(this._activated)return;this._pressedKeysSet.clear(),document.addEventListener("keydown",this._handleKeyDown),document.addEventListener("keyup",this._handleKeyUp),this._activated=!0}deactivate(){if(!this._activated)return;this._pressedKeysSet.clear(),document.removeEventListener("keydown",this._handleKeyDown),document.removeEventListener("keyup",this._handleKeyUp),this._activated=!1}}var p=new k0;var GQ={Left:0,Middle:1,Right:2};class z0{_pressedButtonsSet=new Set;_activated=!1;_handleMouseDown;_handleMouseUp;_handleMouseMove;_deltaX=0;_deltaY=0;constructor(){const Q=(U)=>{this._pressedButtonsSet.add(U.button)},$=(U)=>{this._pressedButtonsSet.delete(U.button)},J=(U)=>{this._deltaX+=U.movementX||U.mozMovementX||U.webkitMovementX||0,this._deltaY+=U.movementY||U.mozMovementY||U.webkitMovementY||0};this._activated=!1,this._handleMouseDown=Q.bind(this),this._handleMouseUp=$.bind(this),this._handleMouseMove=J.bind(this)}activate(){if(this._activated)return;this._pressedButtonsSet.clear(),document.addEventListener("mousedown",this._handleMouseDown),document.addEventListener("mouseup",this._handleMouseUp),document.addEventListener("mousemove",this._handleMouseMove),this._activated=!0}deactivate(){if(!this._activated)return;this._pressedButtonsSet.clear(),document.removeEventListener("mousedown",this._handleMouseDown),document.removeEventListener("mouseup",this._handleMouseUp),document.removeEventListener("mousemove",this._handleMouseMove),this._activated=!1}isButtonPressed(Q){return this._pressedButtonsSet.has(GQ[Q])}deltaX(){return this._deltaX}deltaY(){return this._deltaY}resetDelta(){this._deltaX=0,this._deltaY=0}}var u=new z0;var y0=["requestPointerLock","mozRequestPointerLock","webkitRequestPointerLock"],LQ=["exitPointerLock","mozExitPointerLock","webkitExitPointerLock"],VQ=["pointerLockElement","mozPointerLockElement","webkitPointerLockElement"],wQ=[{methodName:"onpointerlockchange",propertyName:"pointerlockchange"},{methodName:"onmozpointerlockchange",propertyName:"mozpointerlockchange"},{methodName:"onwebkitpointerlockchange",propertyName:"webkitpointerlockchange"}],AQ=[{methodName:"onpointerlockerror",propertyName:"pointerlockerror"},{methodName:"onmozpointerlockerror",propertyName:"mozpointerlockerror"},{methodName:"onwebkitpointerlockerror",propertyName:"webkitpointerlockerror"}];class C0{_onLockChangeCallbacks=[];_onLockErrorCallbacks=[];_timeSinceLastLockChange=0;_latestRequestHtmlElement;_isInitialized=!1;_initialize(){if(this._isInitialized)return;this._isInitialized=!0;const Q=()=>{this._timeSinceLastLockChange=Date.now(),this._onLockChangeCallbacks.forEach((J)=>J())},$=(J)=>{this._timeSinceLastLockChange=Date.now(),this._onLockErrorCallbacks.forEach((U)=>U(J))};for(let J of wQ)if(J.methodName in document){document.addEventListener(J.propertyName,Q,!1);break}for(let J of AQ)if(J.methodName in document){document.addEventListener(J.propertyName,$,!1);break}}canBePointerLocked(Q){for(let $ of y0)if($ in Q)return!0;return!1}isPointerLocked(Q){for(let $ of VQ)if($ in document)return document[$]===Q;return!1}async requestPointerLock(Q){if(this.isPointerLocked(Q))return{success:!1,message:"element already locked"};if(this._initialize(),this._timeSinceLastLockChange>0){const $=(Date.now()-this._timeSinceLastLockChange)/1000;if($<1.1)return{success:!1,message:`request for lock was too early, time to wait: ${$.toFixed(2)}sec`}}this._timeSinceLastLockChange=Date.now();for(let $ of y0)if($ in Q){const J={unadjustedMovement:!1};try{await Q[$](J)}catch(U){return{success:!1,message:`request for lock was too early, time to wait: ${((Date.now()-this._timeSinceLastLockChange)/1000).toFixed(2)}sec`}}return this._timeSinceLastLockChange=Date.now(),{success:!0,message:"request for lock done"}}return{success:!1,message:"unsupported request for lock"}}allowPointerLockedOnClickEvent(Q){if(Q===this._latestRequestHtmlElement)return;this._latestRequestHtmlElement=Q;const $=async()=>{Q.removeEventListener("click",$);const J=await this.requestPointerLock(Q);if(this._latestRequestHtmlElement=void 0,!J.success)this.allowPointerLockedOnClickEvent(Q)};Q.addEventListener("click",$)}exitPointerLock(){for(let Q of LQ)if(Q in document){document[Q]();break}}addOnLockChange(Q){this._onLockChangeCallbacks.push(Q)}removeOnLockChange(Q){const $=this._onLockChangeCallbacks.indexOf(Q);if($<0)return;this._onLockChangeCallbacks.splice($,1)}addOnLockError(Q){this._onLockErrorCallbacks.push(Q)}removeOnLockError(Q){const $=this._onLockErrorCallbacks.indexOf(Q);if($<0)return;this._onLockErrorCallbacks.splice($,1)}}var l=new C0;class m0{id;createdAt=Date.now();positionX;positionY;deltaX=0;deltaY=0;constructor(Q,$,J){this.id=Q,this.positionX=$,this.positionY=J}resetDelta(){this.deltaX=0,this.deltaY=0}}class g0{_activated=!1;_allTouchDataMap=new Map;_allCachedTouchDataArray=[];_handleTouchStart;_handleTouchEnd;_handleTouchMove;constructor(){const Q=(U)=>{U.preventDefault();for(let Z=0;Z<U.changedTouches.length;++Z){const{identifier:j,pageX:N,pageY:H}=U.changedTouches[Z],Y=new m0(j,N,H);this._allTouchDataMap.set(`${j}`,Y),this._allCachedTouchDataArray.length=0}},$=(U)=>{U.preventDefault();for(let Z=0;Z<U.changedTouches.length;++Z){const{identifier:j}=U.changedTouches[Z];this._allTouchDataMap.delete(`${j}`),this._allCachedTouchDataArray.length=0}},J=(U)=>{U.preventDefault();for(let Z=0;Z<U.changedTouches.length;++Z){const{identifier:j,pageX:N,pageY:H}=U.changedTouches[Z],Y=this._allTouchDataMap.get(`${j}`);if(!Y)continue;const O=N-Y.positionX,K=H-Y.positionY;Y.deltaX+=O,Y.deltaY+=K,Y.positionX=N,Y.positionY=H}};this._activated=!1,this._handleTouchStart=Q.bind(this),this._handleTouchEnd=$.bind(this),this._handleTouchMove=J.bind(this)}isSupported(Q){return"ontouchstart"in Q}activate(Q){if(!this.isSupported(Q))return;if(this._activated)return;this._allTouchDataMap.clear(),this._allCachedTouchDataArray.length=0,Q.addEventListener("touchstart",this._handleTouchStart),Q.addEventListener("touchend",this._handleTouchEnd),Q.addEventListener("touchcancel",this._handleTouchEnd),Q.addEventListener("touchmove",this._handleTouchMove,{passive:!1}),this._activated=!0}deactivate(Q){if(!this._activated)return;this._allTouchDataMap.clear(),this._allCachedTouchDataArray.length=0,Q.removeEventListener("touchstart",this._handleTouchStart),Q.removeEventListener("touchend",this._handleTouchEnd),Q.removeEventListener("touchcancel",this._handleTouchEnd),Q.removeEventListener("touchmove",this._handleTouchMove),this._activated=!1}_refreshCache(){if(this._allCachedTouchDataArray.length===0)this._allCachedTouchDataArray=[...this._allTouchDataMap.values()]}getTouchData(){return this._refreshCache(),this._allCachedTouchDataArray}resetDeltas(){this._refreshCache(),this._allCachedTouchDataArray.forEach((Q)=>Q.resetDelta())}}var e=new g0;class c0{_activated=!1;_onVisibilityChangeCallbacks=[];_handleVisibilityChange;constructor(){const Q=()=>{const $=this.isVisible();this._onVisibilityChangeCallbacks.forEach((J)=>J($))};this._handleVisibilityChange=Q.bind(this)}activate(){if(console.log("this.isSupported()",this.isSupported()),console.log("this._activated",this._activated),this._activated)return;document.addEventListener("visibilitychange",this._handleVisibilityChange,!1),this._activated=!0}deactivate(){if(!this._activated)return;document.removeEventListener("visibilitychange",this._handleVisibilityChange,!1),this._activated=!1}isSupported(){return"onvisibilitychange"in document}isVisible(){return document.hidden===!0}addVisibilityChange(Q){this._onVisibilityChangeCallbacks.push(Q)}removeVisibilityChange(Q){const $=this._onVisibilityChangeCallbacks.indexOf(Q);if($<0)return;this._onVisibilityChangeCallbacks.splice($,1)}}var O$=new c0;var x0=()=>{return!!window.WebGL2RenderingContext};class D{static _gl=null;static _extensionLoseContext=null;static initialize(Q){const $={alpha:!1,antialias:!1,depth:!0,failIfMajorPerformanceCaveat:!1,powerPreference:"high-performance",premultipliedAlpha:!0,preserveDrawingBuffer:!0,stencil:!1};if(D._gl=Q.getContext("webgl2",$),!D._gl)throw new Error("could not create webgl context");D._extensionLoseContext=D._gl.getExtension("WEBGL_lose_context"),D._gl.getExtension("EXT_color_buffer_float"),D._gl.getExtension("EXT_float_blend")}static getContext(){if(!D._gl)throw new Error("webgl context not initialized");return D._gl}static getExtensionLoseContext(){return D._extensionLoseContext}static getExtensionLoseContextStrict(){if(!D._extensionLoseContext)throw new Error("lose context extension not available");return D._extensionLoseContext}}class F0{_texture=null;initialize(Q=[]){if(this._texture)throw new Error("data texture already initialized");const $=D.getContext();this._texture=$.createTexture(),$.bindTexture($.TEXTURE_2D,this._texture),$.texParameteri($.TEXTURE_2D,$.TEXTURE_WRAP_S,$.CLAMP_TO_EDGE),$.texParameteri($.TEXTURE_2D,$.TEXTURE_WRAP_T,$.CLAMP_TO_EDGE),$.texParameteri($.TEXTURE_2D,$.TEXTURE_MIN_FILTER,$.NEAREST),$.texParameteri($.TEXTURE_2D,$.TEXTURE_MAG_FILTER,$.NEAREST),this.update(Q)}update(Q){if(!this._texture)throw new Error("data texture not initialized");const $=D.getContext();$.bindTexture($.TEXTURE_2D,this._texture);const J=new Float32Array(Q),U=0,Z=$.R32F,j=Q.length,N=1,H=0,Y=$.RED,O=$.FLOAT;$.texImage2D($.TEXTURE_2D,U,Z,j,N,H,Y,O,J)}bind(){if(!this._texture)throw new Error("data texture not initialized");const Q=D.getContext();Q.bindTexture(Q.TEXTURE_2D,this._texture)}}class I0{_frameBuffer;constructor(){const Q=D.getContext();this._frameBuffer=Q.createFramebuffer()}attachTexture(Q){const $=D.getContext();$.bindFramebuffer($.FRAMEBUFFER,this._frameBuffer);const J=0;$.framebufferTexture2D($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_2D,Q.getRawObject(),J)}bind(){const Q=D.getContext();Q.bindFramebuffer(Q.FRAMEBUFFER,this._frameBuffer)}static unbind(){const Q=D.getContext();Q.bindFramebuffer(Q.FRAMEBUFFER,null)}}var C;(function(t){t.BytesPerPixel=4;let $;(function(F){F[F["float"]=0]="float";F[F["vec2f"]=1]="vec2f";F[F["vec3f"]=2]="vec3f";F[F["vec4f"]=3]="vec4f";F[F["mat3f"]=4]="mat3f";F[F["mat4f"]=5]="mat4f"})($=t.AttributeType||(t.AttributeType={}));const J=(N)=>{switch(N){case $.float:return 1;case $.vec2f:return 2;case $.vec3f:return 3;case $.vec4f:return 4;case $.mat3f:return 9;case $.mat4f:return 16}};let U;(function(O){O[O["lines"]=0]="lines";O[O["triangles"]=1]="triangles";O[O["triangleStrip"]=2]="triangleStrip"})(U=t.PrimitiveType||(t.PrimitiveType={}));class Z{_def;_vao;_vbos;_primitiveType;_primitiveStart=0;_primitiveCount=0;_instanceCount=0;_isInstanced=!1;constructor(N,H){const Y=D.getContext();if(H.vbos.length===0)throw new Error("empty vbo definition");for(let K of H.vbos){if(K.attrs.length===0)throw new Error("empty vbo attribute definition");for(let I of K.attrs)if(!N.hasAttribute(I.name))throw new Error(`attribute not found, name="${I.name}"`)}switch(this._def=H,H.primitiveType){case U.lines:this._primitiveType=Y.LINES;break;case U.triangles:this._primitiveType=Y.TRIANGLES;break;case U.triangleStrip:this._primitiveType=Y.TRIANGLE_STRIP;break;default:throw new Error("primitive type not found")}const O=Y.createVertexArray();if(!O)throw new Error("fail o create a vao unit");this._vao=O,Y.bindVertexArray(this._vao),this._vbos=[];for(let K of this._def.vbos){const I=Y.createBuffer();if(!I)throw new Error("fail o create a vbo unit");this._vbos.push({object:I,maxSize:0,dynamic:K.dynamic||!1}),Y.bindBuffer(Y.ARRAY_BUFFER,I);let F=K.stride||0;if(!F){for(let q of K.attrs)switch(q.type){case $.float:F+=1;break;case $.vec2f:F+=2;break;case $.vec3f:F+=3;break;case $.vec4f:F+=4;break;case $.mat3f:F+=9;break;case $.mat4f:F+=16;break}F*=4}for(let q of K.attrs){let R=1,E=1;switch(q.type){case $.float:R=1,E=1;break;case $.vec2f:R=2,E=1;break;case $.vec3f:R=3,E=1;break;case $.vec4f:R=4,E=1;break;case $.mat3f:R=3,E=3;break;case $.mat4f:R=4,E=4;break}const B=N.getAttribute(q.name);for(let W=0;W<E;++W){const A=B+W,L=(q.index+W*R)*4;if(Y.enableVertexAttribArray(A),Y.vertexAttribPointer(A,R,Y.FLOAT,!1,F,L),K.instanced===!0)Y.vertexAttribDivisor(A,1),this._isInstanced=!0}}}Y.bindVertexArray(null)}dispose(){const N=D.getContext();for(let H of this._vbos)N.deleteBuffer(H.object);this._vbos.length=0,N.deleteVertexArray(this._vao)}setBufferSize(N,H){if(N<0||N>=this._vbos.length)throw new Error("no buffer available to that index");if(H<=0)return;const Y=this._vbos[N];if(H<Y.maxSize)return;Y.maxSize=H;const O=D.getContext(),K=Y.dynamic?O.DYNAMIC_DRAW:O.STATIC_DRAW;O.bindBuffer(O.ARRAY_BUFFER,Y.object),O.bufferData(O.ARRAY_BUFFER,H,K),O.bindBuffer(O.ARRAY_BUFFER,null)}setFloatBufferSize(N,H){this.setBufferSize(N,H*4)}updateBuffer(N,H,Y){if(N<0||N>=this._vbos.length)throw new Error("no buffer available to that index");if(Y<=0)return;const O=D.getContext(),K=H instanceof Float32Array?H:new Float32Array(H),I=this._vbos[N];if(O.bindBuffer(O.ARRAY_BUFFER,I.object),Y>I.maxSize){I.maxSize=Y;const F=I.dynamic?O.DYNAMIC_DRAW:O.STATIC_DRAW;O.bufferData(O.ARRAY_BUFFER,K,F,0,Y)}else O.bufferSubData(O.ARRAY_BUFFER,0,K,0,Y);O.bindBuffer(O.ARRAY_BUFFER,null)}render(){if(this._primitiveCount==0)return;if(this._isInstanced&&this._instanceCount==0)return;const N=D.getContext();if(N.bindVertexArray(this._vao),this._isInstanced===!0)N.drawArraysInstanced(this._primitiveType,this._primitiveStart,this._primitiveCount,this._instanceCount);else N.drawArrays(this._primitiveType,this._primitiveStart,this._primitiveCount);N.bindVertexArray(null)}setPrimitiveStart(N){this._primitiveStart=N}setPrimitiveCount(N){this._primitiveCount=N}setInstancedCount(N){this._instanceCount=N}}t.Geometry=Z;class j{_def={vbos:[],primitiveType:U.lines};reset(){return this._def={vbos:[],primitiveType:U.lines},this}getDef(){return this._def}setPrimitiveType(N){return this._def.primitiveType=U[N],this}addVbo(){return this._def.vbos.push({attrs:[],instanced:!1}),this}setVboAsInstanced(){return this._getLastVbo().instanced=!0,this}setVboAsDynamic(){return this._getLastVbo().dynamic=!0,this}setStride(N){return this._getLastVbo().stride=N,this}addVboAttribute(N,H){const Y=this._getLastVbo(),O=Y.attrs.length>0?Y.attrs[Y.attrs.length-1]:null;return Y.attrs.push({name:N,type:$[H],index:O?O.index+J(O.type):0}),this}_getLastVbo(){if(this._def.vbos.length===0)throw new Error("no VBO setup");return this._def.vbos[this._def.vbos.length-1]}}t.GeometryBuilder=j})(C||(C={}));class c{static _isBound=null;_name;_program;_attributes=new Map;_uniforms=new Map;constructor(Q,$){this._name=Q;const J=D.getContext(),U=this._getShader($.vertexSrc,J.VERTEX_SHADER),Z=this._getShader($.fragmentSrc,J.FRAGMENT_SHADER),j=J.createProgram();if(!j)throw new Error("could not create a shader program");if(J.attachShader(j,U),J.attachShader(j,Z),J.linkProgram(j),J.deleteShader(U),J.deleteShader(Z),!J.getProgramParameter(j,J.LINK_STATUS)){const N=J.getProgramInfoLog(j);throw new Error("Failed to initialized shaders, Error linking:"+N)}this._program=j,this.bind(()=>{this._getAttributes($.attributes),this._getUniforms($.uniforms)})}async bind(Q){if(c._isBound!==null)throw new Error(`Double shader binding (bound: ${c._isBound._name}, binding: ${this._name})`);c._isBound=this,D.getContext().useProgram(this._program),Q(),c.unbind()}static unbind(){D.getContext().useProgram(null),c._isBound=null}isBound(){return c._isBound===this}hasAttribute(Q){return this._attributes.has(Q)}getAttribute(Q){const $=this._attributes.get(Q);if($===void 0)throw new Error(`attribute not found: ${Q}`);return $}getUniform(Q){const $=this._uniforms.get(Q);if($===void 0)throw new Error(`uniform not found: ${Q}`);return $}setTextureUniform(Q,$,J){const U=D.getContext();U.activeTexture(U.TEXTURE0+J),U.uniform1i(this.getUniform(Q),J),$.bind()}setInteger1Uniform(Q,$){D.getContext().uniform1i(this.getUniform(Q),$)}setInteger2Uniform(Q,$,J){D.getContext().uniform2i(this.getUniform(Q),$,J)}setInteger3Uniform(Q,$,J,U){D.getContext().uniform3i(this.getUniform(Q),$,J,U)}setFloat1Uniform(Q,$){D.getContext().uniform1f(this.getUniform(Q),$)}setFloat2Uniform(Q,$,J){D.getContext().uniform2f(this.getUniform(Q),$,J)}setFloat3Uniform(Q,$,J,U){D.getContext().uniform3f(this.getUniform(Q),$,J,U)}setMatrix4Uniform(Q,$){D.getContext().uniformMatrix4fv(this.getUniform(Q),!1,$)}_getAttributes(Q){const $=D.getContext();for(let J=0;J<Q.length;++J){const U=$.getAttribLocation(this._program,Q[J]);if(U<0)throw new Error(`attribute not found => ${Q[J]}`);this._attributes.set(Q[J],U)}}_getUniforms(Q){const $=D.getContext();for(let J=0;J<Q.length;++J){const U=$.getUniformLocation(this._program,Q[J]);if(U===null)throw new Error(`uniform not found => ${Q[J]}`);this._uniforms.set(Q[J],U)}}_getShader(Q,$){const J=D.getContext(),U=J.createShader($);if(!U)throw new Error("could not create a shader");if(J.shaderSource(U,Q),J.compileShader(U),!J.getShaderParameter(U,J.COMPILE_STATUS)){let Z=J.getShaderInfoLog(U);if(!Z)Z="failed to compile a shader";throw new Error(Z)}return U}}class a{_width=0;_height=0;_texture=null;constructor(){}loadFromMemory(Q,$,J){this._allocate(Q,$,J)}allocate(Q,$){this._allocate(Q,$)}resize(Q,$){this._allocate(Q,$)}_allocate(Q,$,J=null){const U=D.getContext();if(!this._texture)this._texture=U.createTexture();U.bindTexture(U.TEXTURE_2D,this._texture),U.texParameteri(U.TEXTURE_2D,U.TEXTURE_WRAP_S,U.CLAMP_TO_EDGE),U.texParameteri(U.TEXTURE_2D,U.TEXTURE_WRAP_T,U.CLAMP_TO_EDGE),U.texParameteri(U.TEXTURE_2D,U.TEXTURE_MIN_FILTER,U.NEAREST),U.texParameteri(U.TEXTURE_2D,U.TEXTURE_MAG_FILTER,U.NEAREST);const Z=0,j=U.RGBA,N=0,H=U.RGBA,Y=U.UNSIGNED_BYTE;U.texImage2D(U.TEXTURE_2D,Z,j,Q,$,N,H,Y,J),U.bindTexture(U.TEXTURE_2D,null)}getWidth(){if(!this._texture)throw new Error("texture not initialized");return this._width}getHeight(){if(!this._texture)throw new Error("texture not initialized");return this._height}bind(){if(!this._texture)throw new Error("texture not initialized");const Q=D.getContext();Q.bindTexture(Q.TEXTURE_2D,this._texture)}static unbind(){const Q=D.getContext();Q.bindTexture(Q.TEXTURE_2D,null)}getRawObject(){if(!this._texture)throw new Error("texture not initialized");return this._texture}}class R0{_textAreaElement;_lines=[];_maxLines=30;constructor(Q){if(this._textAreaElement=document.getElementById(Q),!this._textAreaElement)throw new Error(`DOM elements not found, id=${Q}`);this._textAreaElement.value=""}log(...Q){if(Q.length===0)return;const $=Array.prototype.slice.call(Q).join(" ");console.log($),this._pushText($)}error(...Q){if(Q.length===0)return;const $=Array.prototype.slice.call(Q).join(" ");console.error($),this._pushText(`[ERR] - ${$}`)}_pushText(Q){if(this._lines.push(Q),this._lines.length>this._maxLines)this._lines.splice(0,this._lines.length-this._maxLines);this._textAreaElement.value=`${this._lines.join("\n")}\n`,this._textAreaElement.scrollTop=this._textAreaElement.scrollHeight}peekLast(){if(this._lines.length>0)return this._lines[this._lines.length-1];return}popLast(){if(this._lines.length>0)this._lines.splice(this._lines.length-1,1)}}class M0{_framesDelta=[];_averageDelta=0;_minDelta=0;_maxDelta=0;pushDelta(Q){if(this._framesDelta.length>=100)this._framesDelta.shift();this._framesDelta.push(Q),this._minDelta=999999999,this._maxDelta=-999999999,this._averageDelta=0;for(let $ of this._framesDelta)this._minDelta=Math.min(this._minDelta,$),this._maxDelta=Math.max(this._maxDelta,$),this._averageDelta+=$;this._averageDelta/=this._framesDelta.length}get framesDelta(){return this._framesDelta}get averageDelta(){return this._averageDelta}get minDelta(){return this._minDelta}get maxDelta(){return this._maxDelta}}var d0=(Q,$,J,U,Z,j=!1)=>{const H=Math.ceil(J.maxDelta/5)*5;{U.pushOriginBoundRectangle(Q,$,[0,0,0,0.5]);const Y=[[Q[0]+$[0]*0,Q[1]+$[1]*0,0],[Q[0]+$[0]*1,Q[1]+$[1]*0,0],[Q[0]+$[0]*1,Q[1]+$[1]*1,0],[Q[0]+$[0]*0,Q[1]+$[1]*1,0]];U.pushLine(Y[0],Y[1],[1,1,1]),U.pushLine(Y[1],Y[2],[1,1,1]),U.pushLine(Y[2],Y[3],[1,1,1]),U.pushLine(Y[3],Y[0],[1,1,1])}for(let Y=5;Y<H;Y+=5){const O=Y/H,K=[Q[0]+0,Q[1]+$[1]*O,0],I=[Q[0]+$[0],Q[1]+$[1]*O,0];U.pushLine(K,I,[0.5,0.5,0.5])}if(J.framesDelta.length>=2){const Y=$[0]/J.framesDelta.length;let O=J.framesDelta[0],K=0,I=$[1]*O/H;for(let F=1;F<J.framesDelta.length;++F){const q=J.framesDelta[F],R=F*Y,E=$[1]*q/H,B=[Q[0]+K,Q[1]+I,0],W=[Q[0]+R,Q[1]+E,0];U.pushLine(B,W,[1,1,1]),O=q,K=R,I=E}}{const{averageDelta:K,maxDelta:I,minDelta:F}=J;let q=`~${K.toFixed(0)}ms`,R=`<${I}ms`,E=`>${F}ms`;if(j===!0){const B=(W)=>W<999?W.toFixed(0):"???";q+=`\n~${B(1000/K)}fps`,R+=`\n<${B(1000/I)}fps`,E+=`\n>${B(1000/F)}fps`}Z.setTextScale(14).setTextAlign("left","top").setTextColor(1,1,0.75).pushText(q,[Q[0]+7,Q[1]-8]).setTextAlign("left","centered").setTextColor(1,0.75,0.75).pushText(R,[Q[0]+$[0]+7,Q[1]+$[1]-7]).setTextColor(0.75,1,0.75).pushText(E,[Q[0]+$[0]+7,Q[1]+7]).setTextColor(1,1,1)}};var v=0.000001,m=typeof Float32Array!=="undefined"?Float32Array:Array,U0=Math.random,s$=Math.PI/180;if(!Math.hypot)Math.hypot=function(){var Q=0,$=arguments.length;while($--)Q+=arguments[$]*arguments[$];return Math.sqrt(Q)};var P={};r(P,{transpose:()=>{{return pQ}},translate:()=>{{return yQ}},targetTo:()=>{{return H7}},subtract:()=>{{return u0}},sub:()=>{{return R7}},str:()=>{{return Y7}},set:()=>{{return fQ}},scale:()=>{{return CQ}},rotateZ:()=>{{return xQ}},rotateY:()=>{{return cQ}},rotateX:()=>{{return gQ}},rotate:()=>{{return mQ}},perspectiveZO:()=>{{return J7}},perspectiveNO:()=>{{return i0}},perspectiveFromFieldOfView:()=>{{return U7}},perspective:()=>{{return $7}},orthoZO:()=>{{return j7}},orthoNO:()=>{{return r0}},ortho:()=>{{return Z7}},multiplyScalarAndAdd:()=>{{return F7}},multiplyScalar:()=>{{return K7}},multiply:()=>{{return b0}},mul:()=>{{return q7}},lookAt:()=>{{return N7}},invert:()=>{{return PQ}},identity:()=>{{return s0}},getTranslation:()=>{{return uQ}},getScaling:()=>{{return n0}},getRotation:()=>{{return eQ}},frustum:()=>{{return Q7}},fromZRotation:()=>{{return iQ}},fromYRotation:()=>{{return nQ}},fromXRotation:()=>{{return lQ}},fromValues:()=>{{return hQ}},fromTranslation:()=>{{return dQ}},fromScaling:()=>{{return sQ}},fromRotationTranslationScaleOrigin:()=>{{return oQ}},fromRotationTranslationScale:()=>{{return aQ}},fromRotationTranslation:()=>{{return l0}},fromRotation:()=>{{return bQ}},fromQuat2:()=>{{return rQ}},fromQuat:()=>{{return tQ}},frob:()=>{{return O7}},exactEquals:()=>{{return I7}},equals:()=>{{return B7}},determinant:()=>{{return zQ}},create:()=>{{return vQ}},copy:()=>{{return SQ}},clone:()=>{{return TQ}},adjoint:()=>{{return kQ}},add:()=>{{return X7}}});function vQ(){var Q=new m(16);if(m!=Float32Array)Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0;return Q[0]=1,Q[5]=1,Q[10]=1,Q[15]=1,Q}function TQ(Q){var $=new m(16);return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$[3]=Q[3],$[4]=Q[4],$[5]=Q[5],$[6]=Q[6],$[7]=Q[7],$[8]=Q[8],$[9]=Q[9],$[10]=Q[10],$[11]=Q[11],$[12]=Q[12],$[13]=Q[13],$[14]=Q[14],$[15]=Q[15],$}function SQ(Q,$){return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],Q}function hQ(Q,$,J,U,Z,j,N,H,Y,O,K,I,F,q,R,E){var B=new m(16);return B[0]=Q,B[1]=$,B[2]=J,B[3]=U,B[4]=Z,B[5]=j,B[6]=N,B[7]=H,B[8]=Y,B[9]=O,B[10]=K,B[11]=I,B[12]=F,B[13]=q,B[14]=R,B[15]=E,B}function fQ(Q,$,J,U,Z,j,N,H,Y,O,K,I,F,q,R,E,B){return Q[0]=$,Q[1]=J,Q[2]=U,Q[3]=Z,Q[4]=j,Q[5]=N,Q[6]=H,Q[7]=Y,Q[8]=O,Q[9]=K,Q[10]=I,Q[11]=F,Q[12]=q,Q[13]=R,Q[14]=E,Q[15]=B,Q}function s0(Q){return Q[0]=1,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=1,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=1,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function pQ(Q,$){if(Q===$){var J=$[1],U=$[2],Z=$[3],j=$[6],N=$[7],H=$[11];Q[1]=$[4],Q[2]=$[8],Q[3]=$[12],Q[4]=J,Q[6]=$[9],Q[7]=$[13],Q[8]=U,Q[9]=j,Q[11]=$[14],Q[12]=Z,Q[13]=N,Q[14]=H}else Q[0]=$[0],Q[1]=$[4],Q[2]=$[8],Q[3]=$[12],Q[4]=$[1],Q[5]=$[5],Q[6]=$[9],Q[7]=$[13],Q[8]=$[2],Q[9]=$[6],Q[10]=$[10],Q[11]=$[14],Q[12]=$[3],Q[13]=$[7],Q[14]=$[11],Q[15]=$[15];return Q}function PQ(Q,$){var J=$[0],U=$[1],Z=$[2],j=$[3],N=$[4],H=$[5],Y=$[6],O=$[7],K=$[8],I=$[9],F=$[10],q=$[11],R=$[12],E=$[13],B=$[14],W=$[15],A=J*H-U*N,L=J*Y-Z*N,w=J*O-j*N,V=U*Y-Z*H,G=U*O-j*H,T=Z*O-j*Y,h=K*E-I*R,S=K*B-F*R,f=K*W-q*R,k=I*B-F*E,z=I*W-q*E,y=F*W-q*B,_=A*y-L*z+w*k+V*f-G*S+T*h;if(!_)return null;return _=1/_,Q[0]=(H*y-Y*z+O*k)*_,Q[1]=(Z*z-U*y-j*k)*_,Q[2]=(E*T-B*G+W*V)*_,Q[3]=(F*G-I*T-q*V)*_,Q[4]=(Y*f-N*y-O*S)*_,Q[5]=(J*y-Z*f+j*S)*_,Q[6]=(B*w-R*T-W*L)*_,Q[7]=(K*T-F*w+q*L)*_,Q[8]=(N*z-H*f+O*h)*_,Q[9]=(U*f-J*z-j*h)*_,Q[10]=(R*G-E*w+W*A)*_,Q[11]=(I*w-K*G-q*A)*_,Q[12]=(H*S-N*k-Y*h)*_,Q[13]=(J*k-U*S+Z*h)*_,Q[14]=(E*L-R*V-B*A)*_,Q[15]=(K*V-I*L+F*A)*_,Q}function kQ(Q,$){var J=$[0],U=$[1],Z=$[2],j=$[3],N=$[4],H=$[5],Y=$[6],O=$[7],K=$[8],I=$[9],F=$[10],q=$[11],R=$[12],E=$[13],B=$[14],W=$[15];return Q[0]=H*(F*W-q*B)-I*(Y*W-O*B)+E*(Y*q-O*F),Q[1]=-(U*(F*W-q*B)-I*(Z*W-j*B)+E*(Z*q-j*F)),Q[2]=U*(Y*W-O*B)-H*(Z*W-j*B)+E*(Z*O-j*Y),Q[3]=-(U*(Y*q-O*F)-H*(Z*q-j*F)+I*(Z*O-j*Y)),Q[4]=-(N*(F*W-q*B)-K*(Y*W-O*B)+R*(Y*q-O*F)),Q[5]=J*(F*W-q*B)-K*(Z*W-j*B)+R*(Z*q-j*F),Q[6]=-(J*(Y*W-O*B)-N*(Z*W-j*B)+R*(Z*O-j*Y)),Q[7]=J*(Y*q-O*F)-N*(Z*q-j*F)+K*(Z*O-j*Y),Q[8]=N*(I*W-q*E)-K*(H*W-O*E)+R*(H*q-O*I),Q[9]=-(J*(I*W-q*E)-K*(U*W-j*E)+R*(U*q-j*I)),Q[10]=J*(H*W-O*E)-N*(U*W-j*E)+R*(U*O-j*H),Q[11]=-(J*(H*q-O*I)-N*(U*q-j*I)+K*(U*O-j*H)),Q[12]=-(N*(I*B-F*E)-K*(H*B-Y*E)+R*(H*F-Y*I)),Q[13]=J*(I*B-F*E)-K*(U*B-Z*E)+R*(U*F-Z*I),Q[14]=-(J*(H*B-Y*E)-N*(U*B-Z*E)+R*(U*Y-Z*H)),Q[15]=J*(H*F-Y*I)-N*(U*F-Z*I)+K*(U*Y-Z*H),Q}function zQ(Q){var $=Q[0],J=Q[1],U=Q[2],Z=Q[3],j=Q[4],N=Q[5],H=Q[6],Y=Q[7],O=Q[8],K=Q[9],I=Q[10],F=Q[11],q=Q[12],R=Q[13],E=Q[14],B=Q[15],W=$*N-J*j,A=$*H-U*j,L=$*Y-Z*j,w=J*H-U*N,V=J*Y-Z*N,G=U*Y-Z*H,T=O*R-K*q,h=O*E-I*q,S=O*B-F*q,f=K*E-I*R,k=K*B-F*R,z=I*B-F*E;return W*z-A*k+L*f+w*S-V*h+G*T}function b0(Q,$,J){var U=$[0],Z=$[1],j=$[2],N=$[3],H=$[4],Y=$[5],O=$[6],K=$[7],I=$[8],F=$[9],q=$[10],R=$[11],E=$[12],B=$[13],W=$[14],A=$[15],L=J[0],w=J[1],V=J[2],G=J[3];return Q[0]=L*U+w*H+V*I+G*E,Q[1]=L*Z+w*Y+V*F+G*B,Q[2]=L*j+w*O+V*q+G*W,Q[3]=L*N+w*K+V*R+G*A,L=J[4],w=J[5],V=J[6],G=J[7],Q[4]=L*U+w*H+V*I+G*E,Q[5]=L*Z+w*Y+V*F+G*B,Q[6]=L*j+w*O+V*q+G*W,Q[7]=L*N+w*K+V*R+G*A,L=J[8],w=J[9],V=J[10],G=J[11],Q[8]=L*U+w*H+V*I+G*E,Q[9]=L*Z+w*Y+V*F+G*B,Q[10]=L*j+w*O+V*q+G*W,Q[11]=L*N+w*K+V*R+G*A,L=J[12],w=J[13],V=J[14],G=J[15],Q[12]=L*U+w*H+V*I+G*E,Q[13]=L*Z+w*Y+V*F+G*B,Q[14]=L*j+w*O+V*q+G*W,Q[15]=L*N+w*K+V*R+G*A,Q}function yQ(Q,$,J){var U=J[0],Z=J[1],j=J[2],N,H,Y,O,K,I,F,q,R,E,B,W;if($===Q)Q[12]=$[0]*U+$[4]*Z+$[8]*j+$[12],Q[13]=$[1]*U+$[5]*Z+$[9]*j+$[13],Q[14]=$[2]*U+$[6]*Z+$[10]*j+$[14],Q[15]=$[3]*U+$[7]*Z+$[11]*j+$[15];else N=$[0],H=$[1],Y=$[2],O=$[3],K=$[4],I=$[5],F=$[6],q=$[7],R=$[8],E=$[9],B=$[10],W=$[11],Q[0]=N,Q[1]=H,Q[2]=Y,Q[3]=O,Q[4]=K,Q[5]=I,Q[6]=F,Q[7]=q,Q[8]=R,Q[9]=E,Q[10]=B,Q[11]=W,Q[12]=N*U+K*Z+R*j+$[12],Q[13]=H*U+I*Z+E*j+$[13],Q[14]=Y*U+F*Z+B*j+$[14],Q[15]=O*U+q*Z+W*j+$[15];return Q}function CQ(Q,$,J){var U=J[0],Z=J[1],j=J[2];return Q[0]=$[0]*U,Q[1]=$[1]*U,Q[2]=$[2]*U,Q[3]=$[3]*U,Q[4]=$[4]*Z,Q[5]=$[5]*Z,Q[6]=$[6]*Z,Q[7]=$[7]*Z,Q[8]=$[8]*j,Q[9]=$[9]*j,Q[10]=$[10]*j,Q[11]=$[11]*j,Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],Q}function mQ(Q,$,J,U){var Z=U[0],j=U[1],N=U[2],H=Math.hypot(Z,j,N),Y,O,K,I,F,q,R,E,B,W,A,L,w,V,G,T,h,S,f,k,z,y,_,x;if(H<v)return null;if(H=1/H,Z*=H,j*=H,N*=H,Y=Math.sin(J),O=Math.cos(J),K=1-O,I=$[0],F=$[1],q=$[2],R=$[3],E=$[4],B=$[5],W=$[6],A=$[7],L=$[8],w=$[9],V=$[10],G=$[11],T=Z*Z*K+O,h=j*Z*K+N*Y,S=N*Z*K-j*Y,f=Z*j*K-N*Y,k=j*j*K+O,z=N*j*K+Z*Y,y=Z*N*K+j*Y,_=j*N*K-Z*Y,x=N*N*K+O,Q[0]=I*T+E*h+L*S,Q[1]=F*T+B*h+w*S,Q[2]=q*T+W*h+V*S,Q[3]=R*T+A*h+G*S,Q[4]=I*f+E*k+L*z,Q[5]=F*f+B*k+w*z,Q[6]=q*f+W*k+V*z,Q[7]=R*f+A*k+G*z,Q[8]=I*y+E*_+L*x,Q[9]=F*y+B*_+w*x,Q[10]=q*y+W*_+V*x,Q[11]=R*y+A*_+G*x,$!==Q)Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15];return Q}function gQ(Q,$,J){var U=Math.sin(J),Z=Math.cos(J),j=$[4],N=$[5],H=$[6],Y=$[7],O=$[8],K=$[9],I=$[10],F=$[11];if($!==Q)Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15];return Q[4]=j*Z+O*U,Q[5]=N*Z+K*U,Q[6]=H*Z+I*U,Q[7]=Y*Z+F*U,Q[8]=O*Z-j*U,Q[9]=K*Z-N*U,Q[10]=I*Z-H*U,Q[11]=F*Z-Y*U,Q}function cQ(Q,$,J){var U=Math.sin(J),Z=Math.cos(J),j=$[0],N=$[1],H=$[2],Y=$[3],O=$[8],K=$[9],I=$[10],F=$[11];if($!==Q)Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15];return Q[0]=j*Z-O*U,Q[1]=N*Z-K*U,Q[2]=H*Z-I*U,Q[3]=Y*Z-F*U,Q[8]=j*U+O*Z,Q[9]=N*U+K*Z,Q[10]=H*U+I*Z,Q[11]=Y*U+F*Z,Q}function xQ(Q,$,J){var U=Math.sin(J),Z=Math.cos(J),j=$[0],N=$[1],H=$[2],Y=$[3],O=$[4],K=$[5],I=$[6],F=$[7];if($!==Q)Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15];return Q[0]=j*Z+O*U,Q[1]=N*Z+K*U,Q[2]=H*Z+I*U,Q[3]=Y*Z+F*U,Q[4]=O*Z-j*U,Q[5]=K*Z-N*U,Q[6]=I*Z-H*U,Q[7]=F*Z-Y*U,Q}function dQ(Q,$){return Q[0]=1,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=1,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=1,Q[11]=0,Q[12]=$[0],Q[13]=$[1],Q[14]=$[2],Q[15]=1,Q}function sQ(Q,$){return Q[0]=$[0],Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=$[1],Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=$[2],Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function bQ(Q,$,J){var U=J[0],Z=J[1],j=J[2],N=Math.hypot(U,Z,j),H,Y,O;if(N<v)return null;return N=1/N,U*=N,Z*=N,j*=N,H=Math.sin($),Y=Math.cos($),O=1-Y,Q[0]=U*U*O+Y,Q[1]=Z*U*O+j*H,Q[2]=j*U*O-Z*H,Q[3]=0,Q[4]=U*Z*O-j*H,Q[5]=Z*Z*O+Y,Q[6]=j*Z*O+U*H,Q[7]=0,Q[8]=U*j*O+Z*H,Q[9]=Z*j*O-U*H,Q[10]=j*j*O+Y,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function lQ(Q,$){var J=Math.sin($),U=Math.cos($);return Q[0]=1,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=U,Q[6]=J,Q[7]=0,Q[8]=0,Q[9]=-J,Q[10]=U,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function nQ(Q,$){var J=Math.sin($),U=Math.cos($);return Q[0]=U,Q[1]=0,Q[2]=-J,Q[3]=0,Q[4]=0,Q[5]=1,Q[6]=0,Q[7]=0,Q[8]=J,Q[9]=0,Q[10]=U,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function iQ(Q,$){var J=Math.sin($),U=Math.cos($);return Q[0]=U,Q[1]=J,Q[2]=0,Q[3]=0,Q[4]=-J,Q[5]=U,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=1,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function l0(Q,$,J){var U=$[0],Z=$[1],j=$[2],N=$[3],H=U+U,Y=Z+Z,O=j+j,K=U*H,I=U*Y,F=U*O,q=Z*Y,R=Z*O,E=j*O,B=N*H,W=N*Y,A=N*O;return Q[0]=1-(q+E),Q[1]=I+A,Q[2]=F-W,Q[3]=0,Q[4]=I-A,Q[5]=1-(K+E),Q[6]=R+B,Q[7]=0,Q[8]=F+W,Q[9]=R-B,Q[10]=1-(K+q),Q[11]=0,Q[12]=J[0],Q[13]=J[1],Q[14]=J[2],Q[15]=1,Q}function rQ(Q,$){var J=new m(3),U=-$[0],Z=-$[1],j=-$[2],N=$[3],H=$[4],Y=$[5],O=$[6],K=$[7],I=U*U+Z*Z+j*j+N*N;if(I>0)J[0]=(H*N+K*U+Y*j-O*Z)*2/I,J[1]=(Y*N+K*Z+O*U-H*j)*2/I,J[2]=(O*N+K*j+H*Z-Y*U)*2/I;else J[0]=(H*N+K*U+Y*j-O*Z)*2,J[1]=(Y*N+K*Z+O*U-H*j)*2,J[2]=(O*N+K*j+H*Z-Y*U)*2;return l0(Q,$,J),Q}function uQ(Q,$){return Q[0]=$[12],Q[1]=$[13],Q[2]=$[14],Q}function n0(Q,$){var J=$[0],U=$[1],Z=$[2],j=$[4],N=$[5],H=$[6],Y=$[8],O=$[9],K=$[10];return Q[0]=Math.hypot(J,U,Z),Q[1]=Math.hypot(j,N,H),Q[2]=Math.hypot(Y,O,K),Q}function eQ(Q,$){var J=new m(3);n0(J,$);var U=1/J[0],Z=1/J[1],j=1/J[2],N=$[0]*U,H=$[1]*Z,Y=$[2]*j,O=$[4]*U,K=$[5]*Z,I=$[6]*j,F=$[8]*U,q=$[9]*Z,R=$[10]*j,E=N+K+R,B=0;if(E>0)B=Math.sqrt(E+1)*2,Q[3]=0.25*B,Q[0]=(I-q)/B,Q[1]=(F-Y)/B,Q[2]=(H-O)/B;else if(N>K&&N>R)B=Math.sqrt(1+N-K-R)*2,Q[3]=(I-q)/B,Q[0]=0.25*B,Q[1]=(H+O)/B,Q[2]=(F+Y)/B;else if(K>R)B=Math.sqrt(1+K-N-R)*2,Q[3]=(F-Y)/B,Q[0]=(H+O)/B,Q[1]=0.25*B,Q[2]=(I+q)/B;else B=Math.sqrt(1+R-N-K)*2,Q[3]=(H-O)/B,Q[0]=(F+Y)/B,Q[1]=(I+q)/B,Q[2]=0.25*B;return Q}function aQ(Q,$,J,U){var Z=$[0],j=$[1],N=$[2],H=$[3],Y=Z+Z,O=j+j,K=N+N,I=Z*Y,F=Z*O,q=Z*K,R=j*O,E=j*K,B=N*K,W=H*Y,A=H*O,L=H*K,w=U[0],V=U[1],G=U[2];return Q[0]=(1-(R+B))*w,Q[1]=(F+L)*w,Q[2]=(q-A)*w,Q[3]=0,Q[4]=(F-L)*V,Q[5]=(1-(I+B))*V,Q[6]=(E+W)*V,Q[7]=0,Q[8]=(q+A)*G,Q[9]=(E-W)*G,Q[10]=(1-(I+R))*G,Q[11]=0,Q[12]=J[0],Q[13]=J[1],Q[14]=J[2],Q[15]=1,Q}function oQ(Q,$,J,U,Z){var j=$[0],N=$[1],H=$[2],Y=$[3],O=j+j,K=N+N,I=H+H,F=j*O,q=j*K,R=j*I,E=N*K,B=N*I,W=H*I,A=Y*O,L=Y*K,w=Y*I,V=U[0],G=U[1],T=U[2],h=Z[0],S=Z[1],f=Z[2],k=(1-(E+W))*V,z=(q+w)*V,y=(R-L)*V,_=(q-w)*G,x=(1-(F+W))*G,$0=(B+A)*G,J0=(R+L)*T,h0=(B-A)*T,f0=(1-(F+E))*T;return Q[0]=k,Q[1]=z,Q[2]=y,Q[3]=0,Q[4]=_,Q[5]=x,Q[6]=$0,Q[7]=0,Q[8]=J0,Q[9]=h0,Q[10]=f0,Q[11]=0,Q[12]=J[0]+h-(k*h+_*S+J0*f),Q[13]=J[1]+S-(z*h+x*S+h0*f),Q[14]=J[2]+f-(y*h+$0*S+f0*f),Q[15]=1,Q}function tQ(Q,$){var J=$[0],U=$[1],Z=$[2],j=$[3],N=J+J,H=U+U,Y=Z+Z,O=J*N,K=U*N,I=U*H,F=Z*N,q=Z*H,R=Z*Y,E=j*N,B=j*H,W=j*Y;return Q[0]=1-I-R,Q[1]=K+W,Q[2]=F-B,Q[3]=0,Q[4]=K-W,Q[5]=1-O-R,Q[6]=q+E,Q[7]=0,Q[8]=F+B,Q[9]=q-E,Q[10]=1-O-I,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function Q7(Q,$,J,U,Z,j,N){var H=1/(J-$),Y=1/(Z-U),O=1/(j-N);return Q[0]=j*2*H,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=j*2*Y,Q[6]=0,Q[7]=0,Q[8]=(J+$)*H,Q[9]=(Z+U)*Y,Q[10]=(N+j)*O,Q[11]=-1,Q[12]=0,Q[13]=0,Q[14]=N*j*2*O,Q[15]=0,Q}function i0(Q,$,J,U,Z){var j=1/Math.tan($/2),N;if(Q[0]=j/J,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=j,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[11]=-1,Q[12]=0,Q[13]=0,Q[15]=0,Z!=null&&Z!==Infinity)N=1/(U-Z),Q[10]=(Z+U)*N,Q[14]=2*Z*U*N;else Q[10]=-1,Q[14]=-2*U;return Q}function J7(Q,$,J,U,Z){var j=1/Math.tan($/2),N;if(Q[0]=j/J,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=j,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[11]=-1,Q[12]=0,Q[13]=0,Q[15]=0,Z!=null&&Z!==Infinity)N=1/(U-Z),Q[10]=Z*N,Q[14]=Z*U*N;else Q[10]=-1,Q[14]=-U;return Q}function U7(Q,$,J,U){var Z=Math.tan($.upDegrees*Math.PI/180),j=Math.tan($.downDegrees*Math.PI/180),N=Math.tan($.leftDegrees*Math.PI/180),H=Math.tan($.rightDegrees*Math.PI/180),Y=2/(N+H),O=2/(Z+j);return Q[0]=Y,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=O,Q[6]=0,Q[7]=0,Q[8]=-((N-H)*Y*0.5),Q[9]=(Z-j)*O*0.5,Q[10]=U/(J-U),Q[11]=-1,Q[12]=0,Q[13]=0,Q[14]=U*J/(J-U),Q[15]=0,Q}function r0(Q,$,J,U,Z,j,N){var H=1/($-J),Y=1/(U-Z),O=1/(j-N);return Q[0]=-2*H,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=-2*Y,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=2*O,Q[11]=0,Q[12]=($+J)*H,Q[13]=(Z+U)*Y,Q[14]=(N+j)*O,Q[15]=1,Q}function j7(Q,$,J,U,Z,j,N){var H=1/($-J),Y=1/(U-Z),O=1/(j-N);return Q[0]=-2*H,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=-2*Y,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=O,Q[11]=0,Q[12]=($+J)*H,Q[13]=(Z+U)*Y,Q[14]=j*O,Q[15]=1,Q}function N7(Q,$,J,U){var Z,j,N,H,Y,O,K,I,F,q,R=$[0],E=$[1],B=$[2],W=U[0],A=U[1],L=U[2],w=J[0],V=J[1],G=J[2];if(Math.abs(R-w)<v&&Math.abs(E-V)<v&&Math.abs(B-G)<v)return s0(Q);if(K=R-w,I=E-V,F=B-G,q=1/Math.hypot(K,I,F),K*=q,I*=q,F*=q,Z=A*F-L*I,j=L*K-W*F,N=W*I-A*K,q=Math.hypot(Z,j,N),!q)Z=0,j=0,N=0;else q=1/q,Z*=q,j*=q,N*=q;if(H=I*N-F*j,Y=F*Z-K*N,O=K*j-I*Z,q=Math.hypot(H,Y,O),!q)H=0,Y=0,O=0;else q=1/q,H*=q,Y*=q,O*=q;return Q[0]=Z,Q[1]=H,Q[2]=K,Q[3]=0,Q[4]=j,Q[5]=Y,Q[6]=I,Q[7]=0,Q[8]=N,Q[9]=O,Q[10]=F,Q[11]=0,Q[12]=-(Z*R+j*E+N*B),Q[13]=-(H*R+Y*E+O*B),Q[14]=-(K*R+I*E+F*B),Q[15]=1,Q}function H7(Q,$,J,U){var Z=$[0],j=$[1],N=$[2],H=U[0],Y=U[1],O=U[2],K=Z-J[0],I=j-J[1],F=N-J[2],q=K*K+I*I+F*F;if(q>0)q=1/Math.sqrt(q),K*=q,I*=q,F*=q;var R=Y*F-O*I,E=O*K-H*F,B=H*I-Y*K;if(q=R*R+E*E+B*B,q>0)q=1/Math.sqrt(q),R*=q,E*=q,B*=q;return Q[0]=R,Q[1]=E,Q[2]=B,Q[3]=0,Q[4]=I*B-F*E,Q[5]=F*R-K*B,Q[6]=K*E-I*R,Q[7]=0,Q[8]=K,Q[9]=I,Q[10]=F,Q[11]=0,Q[12]=Z,Q[13]=j,Q[14]=N,Q[15]=1,Q}function Y7(Q){return"mat4("+Q[0]+", "+Q[1]+", "+Q[2]+", "+Q[3]+", "+Q[4]+", "+Q[5]+", "+Q[6]+", "+Q[7]+", "+Q[8]+", "+Q[9]+", "+Q[10]+", "+Q[11]+", "+Q[12]+", "+Q[13]+", "+Q[14]+", "+Q[15]+")"}function O7(Q){return Math.hypot(Q[0],Q[1],Q[2],Q[3],Q[4],Q[5],Q[6],Q[7],Q[8],Q[9],Q[10],Q[11],Q[12],Q[13],Q[14],Q[15])}function X7(Q,$,J){return Q[0]=$[0]+J[0],Q[1]=$[1]+J[1],Q[2]=$[2]+J[2],Q[3]=$[3]+J[3],Q[4]=$[4]+J[4],Q[5]=$[5]+J[5],Q[6]=$[6]+J[6],Q[7]=$[7]+J[7],Q[8]=$[8]+J[8],Q[9]=$[9]+J[9],Q[10]=$[10]+J[10],Q[11]=$[11]+J[11],Q[12]=$[12]+J[12],Q[13]=$[13]+J[13],Q[14]=$[14]+J[14],Q[15]=$[15]+J[15],Q}function u0(Q,$,J){return Q[0]=$[0]-J[0],Q[1]=$[1]-J[1],Q[2]=$[2]-J[2],Q[3]=$[3]-J[3],Q[4]=$[4]-J[4],Q[5]=$[5]-J[5],Q[6]=$[6]-J[6],Q[7]=$[7]-J[7],Q[8]=$[8]-J[8],Q[9]=$[9]-J[9],Q[10]=$[10]-J[10],Q[11]=$[11]-J[11],Q[12]=$[12]-J[12],Q[13]=$[13]-J[13],Q[14]=$[14]-J[14],Q[15]=$[15]-J[15],Q}function K7(Q,$,J){return Q[0]=$[0]*J,Q[1]=$[1]*J,Q[2]=$[2]*J,Q[3]=$[3]*J,Q[4]=$[4]*J,Q[5]=$[5]*J,Q[6]=$[6]*J,Q[7]=$[7]*J,Q[8]=$[8]*J,Q[9]=$[9]*J,Q[10]=$[10]*J,Q[11]=$[11]*J,Q[12]=$[12]*J,Q[13]=$[13]*J,Q[14]=$[14]*J,Q[15]=$[15]*J,Q}function F7(Q,$,J,U){return Q[0]=$[0]+J[0]*U,Q[1]=$[1]+J[1]*U,Q[2]=$[2]+J[2]*U,Q[3]=$[3]+J[3]*U,Q[4]=$[4]+J[4]*U,Q[5]=$[5]+J[5]*U,Q[6]=$[6]+J[6]*U,Q[7]=$[7]+J[7]*U,Q[8]=$[8]+J[8]*U,Q[9]=$[9]+J[9]*U,Q[10]=$[10]+J[10]*U,Q[11]=$[11]+J[11]*U,Q[12]=$[12]+J[12]*U,Q[13]=$[13]+J[13]*U,Q[14]=$[14]+J[14]*U,Q[15]=$[15]+J[15]*U,Q}function I7(Q,$){return Q[0]===$[0]&&Q[1]===$[1]&&Q[2]===$[2]&&Q[3]===$[3]&&Q[4]===$[4]&&Q[5]===$[5]&&Q[6]===$[6]&&Q[7]===$[7]&&Q[8]===$[8]&&Q[9]===$[9]&&Q[10]===$[10]&&Q[11]===$[11]&&Q[12]===$[12]&&Q[13]===$[13]&&Q[14]===$[14]&&Q[15]===$[15]}function B7(Q,$){var J=Q[0],U=Q[1],Z=Q[2],j=Q[3],N=Q[4],H=Q[5],Y=Q[6],O=Q[7],K=Q[8],I=Q[9],F=Q[10],q=Q[11],R=Q[12],E=Q[13],B=Q[14],W=Q[15],A=$[0],L=$[1],w=$[2],V=$[3],G=$[4],T=$[5],h=$[6],S=$[7],f=$[8],k=$[9],z=$[10],y=$[11],_=$[12],x=$[13],$0=$[14],J0=$[15];return Math.abs(J-A)<=v*Math.max(1,Math.abs(J),Math.abs(A))&&Math.abs(U-L)<=v*Math.max(1,Math.abs(U),Math.abs(L))&&Math.abs(Z-w)<=v*Math.max(1,Math.abs(Z),Math.abs(w))&&Math.abs(j-V)<=v*Math.max(1,Math.abs(j),Math.abs(V))&&Math.abs(N-G)<=v*Math.max(1,Math.abs(N),Math.abs(G))&&Math.abs(H-T)<=v*Math.max(1,Math.abs(H),Math.abs(T))&&Math.abs(Y-h)<=v*Math.max(1,Math.abs(Y),Math.abs(h))&&Math.abs(O-S)<=v*Math.max(1,Math.abs(O),Math.abs(S))&&Math.abs(K-f)<=v*Math.max(1,Math.abs(K),Math.abs(f))&&Math.abs(I-k)<=v*Math.max(1,Math.abs(I),Math.abs(k))&&Math.abs(F-z)<=v*Math.max(1,Math.abs(F),Math.abs(z))&&Math.abs(q-y)<=v*Math.max(1,Math.abs(q),Math.abs(y))&&Math.abs(R-_)<=v*Math.max(1,Math.abs(R),Math.abs(_))&&Math.abs(E-x)<=v*Math.max(1,Math.abs(E),Math.abs(x))&&Math.abs(B-$0)<=v*Math.max(1,Math.abs(B),Math.abs($0))&&Math.abs(W-J0)<=v*Math.max(1,Math.abs(W),Math.abs(J0))}var $7=i0,Z7=r0,q7=b0,R7=u0;var M={};r(M,{zero:()=>{{return b7}},transformQuat:()=>{{return g7}},transformMat4:()=>{{return C7}},transformMat3:()=>{{return m7}},subtract:()=>{{return o0}},sub:()=>{{return r7}},str:()=>{{return l7}},squaredLength:()=>{{return UQ}},squaredDistance:()=>{{return JQ}},sqrLen:()=>{{return Q8}},sqrDist:()=>{{return o7}},set:()=>{{return D7}},scaleAndAdd:()=>{{return T7}},scale:()=>{{return v7}},round:()=>{{return _7}},rotateZ:()=>{{return d7}},rotateY:()=>{{return x7}},rotateX:()=>{{return c7}},random:()=>{{return y7}},normalize:()=>{{return f7}},negate:()=>{{return S7}},multiply:()=>{{return t0}},mul:()=>{{return u7}},min:()=>{{return w7}},max:()=>{{return A7}},lerp:()=>{{return P7}},length:()=>{{return a0}},len:()=>{{return t7}},inverse:()=>{{return h7}},hermite:()=>{{return k7}},fromValues:()=>{{return E7}},forEach:()=>{{return $8}},floor:()=>{{return V7}},exactEquals:()=>{{return n7}},equals:()=>{{return i7}},dot:()=>{{return ZQ}},divide:()=>{{return QQ}},div:()=>{{return e7}},distance:()=>{{return $Q}},dist:()=>{{return a7}},cross:()=>{{return p7}},create:()=>{{return e0}},copy:()=>{{return W7}},clone:()=>{{return M7}},ceil:()=>{{return L7}},bezier:()=>{{return z7}},angle:()=>{{return s7}},add:()=>{{return G7}}});function e0(){var Q=new m(3);if(m!=Float32Array)Q[0]=0,Q[1]=0,Q[2]=0;return Q}function M7(Q){var $=new m(3);return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$}function a0(Q){var $=Q[0],J=Q[1],U=Q[2];return Math.hypot($,J,U)}function E7(Q,$,J){var U=new m(3);return U[0]=Q,U[1]=$,U[2]=J,U}function W7(Q,$){return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q}function D7(Q,$,J,U){return Q[0]=$,Q[1]=J,Q[2]=U,Q}function G7(Q,$,J){return Q[0]=$[0]+J[0],Q[1]=$[1]+J[1],Q[2]=$[2]+J[2],Q}function o0(Q,$,J){return Q[0]=$[0]-J[0],Q[1]=$[1]-J[1],Q[2]=$[2]-J[2],Q}function t0(Q,$,J){return Q[0]=$[0]*J[0],Q[1]=$[1]*J[1],Q[2]=$[2]*J[2],Q}function QQ(Q,$,J){return Q[0]=$[0]/J[0],Q[1]=$[1]/J[1],Q[2]=$[2]/J[2],Q}function L7(Q,$){return Q[0]=Math.ceil($[0]),Q[1]=Math.ceil($[1]),Q[2]=Math.ceil($[2]),Q}function V7(Q,$){return Q[0]=Math.floor($[0]),Q[1]=Math.floor($[1]),Q[2]=Math.floor($[2]),Q}function w7(Q,$,J){return Q[0]=Math.min($[0],J[0]),Q[1]=Math.min($[1],J[1]),Q[2]=Math.min($[2],J[2]),Q}function A7(Q,$,J){return Q[0]=Math.max($[0],J[0]),Q[1]=Math.max($[1],J[1]),Q[2]=Math.max($[2],J[2]),Q}function _7(Q,$){return Q[0]=Math.round($[0]),Q[1]=Math.round($[1]),Q[2]=Math.round($[2]),Q}function v7(Q,$,J){return Q[0]=$[0]*J,Q[1]=$[1]*J,Q[2]=$[2]*J,Q}function T7(Q,$,J,U){return Q[0]=$[0]+J[0]*U,Q[1]=$[1]+J[1]*U,Q[2]=$[2]+J[2]*U,Q}function $Q(Q,$){var J=$[0]-Q[0],U=$[1]-Q[1],Z=$[2]-Q[2];return Math.hypot(J,U,Z)}function JQ(Q,$){var J=$[0]-Q[0],U=$[1]-Q[1],Z=$[2]-Q[2];return J*J+U*U+Z*Z}function UQ(Q){var $=Q[0],J=Q[1],U=Q[2];return $*$+J*J+U*U}function S7(Q,$){return Q[0]=-$[0],Q[1]=-$[1],Q[2]=-$[2],Q}function h7(Q,$){return Q[0]=1/$[0],Q[1]=1/$[1],Q[2]=1/$[2],Q}function f7(Q,$){var J=$[0],U=$[1],Z=$[2],j=J*J+U*U+Z*Z;if(j>0)j=1/Math.sqrt(j);return Q[0]=$[0]*j,Q[1]=$[1]*j,Q[2]=$[2]*j,Q}function ZQ(Q,$){return Q[0]*$[0]+Q[1]*$[1]+Q[2]*$[2]}function p7(Q,$,J){var U=$[0],Z=$[1],j=$[2],N=J[0],H=J[1],Y=J[2];return Q[0]=Z*Y-j*H,Q[1]=j*N-U*Y,Q[2]=U*H-Z*N,Q}function P7(Q,$,J,U){var Z=$[0],j=$[1],N=$[2];return Q[0]=Z+U*(J[0]-Z),Q[1]=j+U*(J[1]-j),Q[2]=N+U*(J[2]-N),Q}function k7(Q,$,J,U,Z,j){var N=j*j,H=N*(2*j-3)+1,Y=N*(j-2)+j,O=N*(j-1),K=N*(3-2*j);return Q[0]=$[0]*H+J[0]*Y+U[0]*O+Z[0]*K,Q[1]=$[1]*H+J[1]*Y+U[1]*O+Z[1]*K,Q[2]=$[2]*H+J[2]*Y+U[2]*O+Z[2]*K,Q}function z7(Q,$,J,U,Z,j){var N=1-j,H=N*N,Y=j*j,O=H*N,K=3*j*H,I=3*Y*N,F=Y*j;return Q[0]=$[0]*O+J[0]*K+U[0]*I+Z[0]*F,Q[1]=$[1]*O+J[1]*K+U[1]*I+Z[1]*F,Q[2]=$[2]*O+J[2]*K+U[2]*I+Z[2]*F,Q}function y7(Q,$){$=$||1;var J=U0()*2*Math.PI,U=U0()*2-1,Z=Math.sqrt(1-U*U)*$;return Q[0]=Math.cos(J)*Z,Q[1]=Math.sin(J)*Z,Q[2]=U*$,Q}function C7(Q,$,J){var U=$[0],Z=$[1],j=$[2],N=J[3]*U+J[7]*Z+J[11]*j+J[15];return N=N||1,Q[0]=(J[0]*U+J[4]*Z+J[8]*j+J[12])/N,Q[1]=(J[1]*U+J[5]*Z+J[9]*j+J[13])/N,Q[2]=(J[2]*U+J[6]*Z+J[10]*j+J[14])/N,Q}function m7(Q,$,J){var U=$[0],Z=$[1],j=$[2];return Q[0]=U*J[0]+Z*J[3]+j*J[6],Q[1]=U*J[1]+Z*J[4]+j*J[7],Q[2]=U*J[2]+Z*J[5]+j*J[8],Q}function g7(Q,$,J){var U=J[0],Z=J[1],j=J[2],N=J[3],H=$[0],Y=$[1],O=$[2],K=Z*O-j*Y,I=j*H-U*O,F=U*Y-Z*H,q=Z*F-j*I,R=j*K-U*F,E=U*I-Z*K,B=N*2;return K*=B,I*=B,F*=B,q*=2,R*=2,E*=2,Q[0]=H+K+q,Q[1]=Y+I+R,Q[2]=O+F+E,Q}function c7(Q,$,J,U){var Z=[],j=[];return Z[0]=$[0]-J[0],Z[1]=$[1]-J[1],Z[2]=$[2]-J[2],j[0]=Z[0],j[1]=Z[1]*Math.cos(U)-Z[2]*Math.sin(U),j[2]=Z[1]*Math.sin(U)+Z[2]*Math.cos(U),Q[0]=j[0]+J[0],Q[1]=j[1]+J[1],Q[2]=j[2]+J[2],Q}function x7(Q,$,J,U){var Z=[],j=[];return Z[0]=$[0]-J[0],Z[1]=$[1]-J[1],Z[2]=$[2]-J[2],j[0]=Z[2]*Math.sin(U)+Z[0]*Math.cos(U),j[1]=Z[1],j[2]=Z[2]*Math.cos(U)-Z[0]*Math.sin(U),Q[0]=j[0]+J[0],Q[1]=j[1]+J[1],Q[2]=j[2]+J[2],Q}function d7(Q,$,J,U){var Z=[],j=[];return Z[0]=$[0]-J[0],Z[1]=$[1]-J[1],Z[2]=$[2]-J[2],j[0]=Z[0]*Math.cos(U)-Z[1]*Math.sin(U),j[1]=Z[0]*Math.sin(U)+Z[1]*Math.cos(U),j[2]=Z[2],Q[0]=j[0]+J[0],Q[1]=j[1]+J[1],Q[2]=j[2]+J[2],Q}function s7(Q,$){var J=Q[0],U=Q[1],Z=Q[2],j=$[0],N=$[1],H=$[2],Y=Math.sqrt(J*J+U*U+Z*Z),O=Math.sqrt(j*j+N*N+H*H),K=Y*O,I=K&&ZQ(Q,$)/K;return Math.acos(Math.min(Math.max(I,-1),1))}function b7(Q){return Q[0]=0,Q[1]=0,Q[2]=0,Q}function l7(Q){return"vec3("+Q[0]+", "+Q[1]+", "+Q[2]+")"}function n7(Q,$){return Q[0]===$[0]&&Q[1]===$[1]&&Q[2]===$[2]}function i7(Q,$){var J=Q[0],U=Q[1],Z=Q[2],j=$[0],N=$[1],H=$[2];return Math.abs(J-j)<=v*Math.max(1,Math.abs(J),Math.abs(j))&&Math.abs(U-N)<=v*Math.max(1,Math.abs(U),Math.abs(N))&&Math.abs(Z-H)<=v*Math.max(1,Math.abs(Z),Math.abs(H))}var r7=o0,u7=t0,e7=QQ,a7=$Q,o7=JQ,t7=a0,Q8=UQ,$8=function(){var Q=e0();return function($,J,U,Z,j,N){var H,Y;if(!J)J=3;if(!U)U=0;if(Z)Y=Math.min(Z*J+U,$.length);else Y=$.length;for(H=U;H<Y;H+=J)Q[0]=$[H],Q[1]=$[H+1],Q[2]=$[H+2],j(Q,Q,N),$[H]=Q[0],$[H+1]=Q[1],$[H+2]=Q[2];return $}}();var Z0={};r(Z0,{zero:()=>{{return v8}},transformMat4:()=>{{return w8}},transformMat3:()=>{{return V8}},transformMat2d:()=>{{return L8}},transformMat2:()=>{{return G8}},subtract:()=>{{return NQ}},sub:()=>{{return p8}},str:()=>{{return T8}},squaredLength:()=>{{return FQ}},squaredDistance:()=>{{return XQ}},sqrLen:()=>{{return C8}},sqrDist:()=>{{return y8}},set:()=>{{return j8}},scaleAndAdd:()=>{{return I8}},scale:()=>{{return F8}},round:()=>{{return K8}},rotate:()=>{{return A8}},random:()=>{{return D8}},normalize:()=>{{return R8}},negate:()=>{{return B8}},multiply:()=>{{return HQ}},mul:()=>{{return P8}},min:()=>{{return O8}},max:()=>{{return X8}},lerp:()=>{{return W8}},length:()=>{{return KQ}},len:()=>{{return f8}},inverse:()=>{{return q8}},fromValues:()=>{{return U8}},forEach:()=>{{return m8}},floor:()=>{{return Y8}},exactEquals:()=>{{return S8}},equals:()=>{{return h8}},dot:()=>{{return M8}},divide:()=>{{return YQ}},div:()=>{{return k8}},distance:()=>{{return OQ}},dist:()=>{{return z8}},cross:()=>{{return E8}},create:()=>{{return jQ}},copy:()=>{{return Z8}},clone:()=>{{return J8}},ceil:()=>{{return H8}},angle:()=>{{return _8}},add:()=>{{return N8}}});function jQ(){var Q=new m(2);if(m!=Float32Array)Q[0]=0,Q[1]=0;return Q}function J8(Q){var $=new m(2);return $[0]=Q[0],$[1]=Q[1],$}function U8(Q,$){var J=new m(2);return J[0]=Q,J[1]=$,J}function Z8(Q,$){return Q[0]=$[0],Q[1]=$[1],Q}function j8(Q,$,J){return Q[0]=$,Q[1]=J,Q}function N8(Q,$,J){return Q[0]=$[0]+J[0],Q[1]=$[1]+J[1],Q}function NQ(Q,$,J){return Q[0]=$[0]-J[0],Q[1]=$[1]-J[1],Q}function HQ(Q,$,J){return Q[0]=$[0]*J[0],Q[1]=$[1]*J[1],Q}function YQ(Q,$,J){return Q[0]=$[0]/J[0],Q[1]=$[1]/J[1],Q}function H8(Q,$){return Q[0]=Math.ceil($[0]),Q[1]=Math.ceil($[1]),Q}function Y8(Q,$){return Q[0]=Math.floor($[0]),Q[1]=Math.floor($[1]),Q}function O8(Q,$,J){return Q[0]=Math.min($[0],J[0]),Q[1]=Math.min($[1],J[1]),Q}function X8(Q,$,J){return Q[0]=Math.max($[0],J[0]),Q[1]=Math.max($[1],J[1]),Q}function K8(Q,$){return Q[0]=Math.round($[0]),Q[1]=Math.round($[1]),Q}function F8(Q,$,J){return Q[0]=$[0]*J,Q[1]=$[1]*J,Q}function I8(Q,$,J,U){return Q[0]=$[0]+J[0]*U,Q[1]=$[1]+J[1]*U,Q}function OQ(Q,$){var J=$[0]-Q[0],U=$[1]-Q[1];return Math.hypot(J,U)}function XQ(Q,$){var J=$[0]-Q[0],U=$[1]-Q[1];return J*J+U*U}function KQ(Q){var $=Q[0],J=Q[1];return Math.hypot($,J)}function FQ(Q){var $=Q[0],J=Q[1];return $*$+J*J}function B8(Q,$){return Q[0]=-$[0],Q[1]=-$[1],Q}function q8(Q,$){return Q[0]=1/$[0],Q[1]=1/$[1],Q}function R8(Q,$){var J=$[0],U=$[1],Z=J*J+U*U;if(Z>0)Z=1/Math.sqrt(Z);return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q}function M8(Q,$){return Q[0]*$[0]+Q[1]*$[1]}function E8(Q,$,J){var U=$[0]*J[1]-$[1]*J[0];return Q[0]=Q[1]=0,Q[2]=U,Q}function W8(Q,$,J,U){var Z=$[0],j=$[1];return Q[0]=Z+U*(J[0]-Z),Q[1]=j+U*(J[1]-j),Q}function D8(Q,$){$=$||1;var J=U0()*2*Math.PI;return Q[0]=Math.cos(J)*$,Q[1]=Math.sin(J)*$,Q}function G8(Q,$,J){var U=$[0],Z=$[1];return Q[0]=J[0]*U+J[2]*Z,Q[1]=J[1]*U+J[3]*Z,Q}function L8(Q,$,J){var U=$[0],Z=$[1];return Q[0]=J[0]*U+J[2]*Z+J[4],Q[1]=J[1]*U+J[3]*Z+J[5],Q}function V8(Q,$,J){var U=$[0],Z=$[1];return Q[0]=J[0]*U+J[3]*Z+J[6],Q[1]=J[1]*U+J[4]*Z+J[7],Q}function w8(Q,$,J){var U=$[0],Z=$[1];return Q[0]=J[0]*U+J[4]*Z+J[12],Q[1]=J[1]*U+J[5]*Z+J[13],Q}function A8(Q,$,J,U){var Z=$[0]-J[0],j=$[1]-J[1],N=Math.sin(U),H=Math.cos(U);return Q[0]=Z*H-j*N+J[0],Q[1]=Z*N+j*H+J[1],Q}function _8(Q,$){var J=Q[0],U=Q[1],Z=$[0],j=$[1],N=Math.sqrt(J*J+U*U)*Math.sqrt(Z*Z+j*j),H=N&&(J*Z+U*j)/N;return Math.acos(Math.min(Math.max(H,-1),1))}function v8(Q){return Q[0]=0,Q[1]=0,Q}function T8(Q){return"vec2("+Q[0]+", "+Q[1]+")"}function S8(Q,$){return Q[0]===$[0]&&Q[1]===$[1]}function h8(Q,$){var J=Q[0],U=Q[1],Z=$[0],j=$[1];return Math.abs(J-Z)<=v*Math.max(1,Math.abs(J),Math.abs(Z))&&Math.abs(U-j)<=v*Math.max(1,Math.abs(U),Math.abs(j))}var f8=KQ,p8=NQ,P8=HQ,k8=YQ,z8=OQ,y8=XQ,C8=FQ,m8=function(){var Q=jQ();return function($,J,U,Z,j,N){var H,Y;if(!J)J=2;if(!U)U=0;if(Z)Y=Math.min(Z*J+U,$.length);else Y=$.length;for(H=U;H<Y;H+=J)Q[0]=$[H],Q[1]=$[H+1],j(Q,Q,N),$[H]=Q[0],$[H+1]=Q[1];return $}}();var n=[0.2,0.2,0.2],i=[0.2,0.6,0.2],g8=(Q,$)=>{Q.push({center:[$[0],$[1]],size:[40,40],text:"A\nQ",color:p.isPressed("A","Q")?i:n}),Q.push({center:[$[0]+45,$[1]],size:[40,40],text:"S",color:p.isPressed("S")?i:n}),Q.push({center:[$[0]+45,$[1]+45],size:[40,40],text:"W\nZ",color:p.isPressed("W","Z")?i:n}),Q.push({center:[$[0]+90,$[1]],size:[40,40],text:"D",color:p.isPressed("D")?i:n})},c8=(Q,$)=>{Q.push({center:[$[0],$[1]],size:[40,40],lines:[{a:[15,0],b:[-8,0],thickness:6,color:[1,1,1]},{a:[0,10],b:[-12,-2],thickness:6,color:[1,1,1]},{a:[0,-10],b:[-12,2],thickness:6,color:[1,1,1]}],color:p.isPressed("ArrowLeft")?i:n}),Q.push({center:[$[0]+45,$[1]],size:[40,40],lines:[{a:[0,15],b:[0,-8],thickness:6,color:[1,1,1]},{a:[10,0],b:[-2,-12],thickness:6,color:[1,1,1]},{a:[-10,0],b:[2,-12],thickness:6,color:[1,1,1]}],color:p.isPressed("ArrowDown")?i:n}),Q.push({center:[$[0]+45,$[1]+45],size:[40,40],lines:[{a:[0,-15],b:[0,8],thickness:6,color:[1,1,1]},{a:[10,0],b:[-2,12],thickness:6,color:[1,1,1]},{a:[-10,0],b:[2,12],thickness:6,color:[1,1,1]}],color:p.isPressed("ArrowUp")?i:n}),Q.push({center:[$[0]+90,$[1]],size:[40,40],lines:[{a:[-15,0],b:[8,0],thickness:6,color:[1,1,1]},{a:[0,10],b:[12,-2],thickness:6,color:[1,1,1]},{a:[0,-10],b:[12,2],thickness:6,color:[1,1,1]}],color:p.isPressed("ArrowRight")?i:n})},x8=(Q,$,J)=>{if(e.isSupported($))Q.push({center:[J[0]+115,J[1]],size:[230,60],text:"Touch Events\nSupported\n(double tap)",color:[0,0.5,0]});else Q.push({center:[J[0]+115,J[1]],size:[230,60],text:"Touch Events\nNot Supported",color:[0.5,0,0]});if(l.canBePointerLocked($))Q.push({center:[J[0]+105,J[1]+70],size:[210,60],text:"Mouse\nSupported",color:[0,0.5,0]});else Q.push({center:[J[0]+105,J[1]+70],size:[210,60],text:"Mouse Events\nNot Supported",color:[0.5,0,0]})},IQ=(Q,$,J)=>{const U=[],Z=[27,165],j=[27,260],N=[7,35];g8(U,Z),c8(U,j),x8(U,Q,N),U.forEach((H)=>{const{center:Y}=H;if($.pushCenteredRectangle(M.fromValues(Y[0],Y[1],-0.3),H.size,[0,0,0]),$.pushCenteredRectangle(M.fromValues(Y[0],Y[1],-0.2),[H.size[0]-2,H.size[1]-2],H.color),H.text)J.setTextScale(16).setTextAlign("centered","centered").pushText(H.text,Y).setTextAlign("left","top");if(H.lines)H.lines.forEach((O)=>{$.pushThickLine([Y[0]+O.a[0],Y[1]+O.a[1],0],[Y[0]+O.b[0],Y[1]+O.b[1],0],O.thickness,O.color)})})};var Q0={X:0,Y:1,Z:2};class W0{_isActivated=!1;_theta=0;_phi=0;_mouseSensibility;_keyboardSensibility;_touchSensibility;_movingSpeed;_touchWasActive=!1;_touchStartTime=0;_touchMoveForward=!1;_axisIndices;_position=M.fromValues(0,0,0);_target=M.fromValues(0,0,0);_forwardAxis=M.fromValues(1,0,0);_leftAxis=M.fromValues(0,0,1);_upAxis=M.fromValues(0,1,0);constructor(Q){this._mouseSensibility=Q.mouseSensibility,this._keyboardSensibility=Q.keyboardSensibility,this._touchSensibility=Q.touchSensibility,this._movingSpeed=Q.movingSpeed,M.copy(this._position,Q.position),this._axisIndices=[Q.coordinates?Q0[Q.coordinates[0]]:Q0.X,Q.coordinates?Q0[Q.coordinates[1]]:Q0.Y,Q.coordinates?Q0[Q.coordinates[2]]:Q0.Z],this._theta=Q.theta,this._phi=Q.phi}isActivated(){return this._isActivated}update(Q){let $=!1,J=!1,U=!1,Z=!1,j=0,N=0;const H=Math.PI/180;{const G=u.deltaX()*this._mouseSensibility,T=u.deltaY()*this._mouseSensibility;j-=G*H,N-=T*H}const Y=e.getTouchData().length>0;if(Y){if(!this._touchWasActive){const S=Date.now();if((S-this._touchStartTime)/1000<0.25)this._touchMoveForward=!0;else this._touchStartTime=S}const G=e.getTouchData()[0],T=G.deltaX*this._touchSensibility,h=G.deltaY*this._touchSensibility;j-=T*H,N-=h*H}else this._touchMoveForward=!1;if(this._touchWasActive=Y,this._touchMoveForward)$=!0;const O=this._movingSpeed*Q,K=M.fromValues(0,0,0);M.scale(K,this._forwardAxis,O);const I=M.fromValues(0,0,0);if(M.scale(I,this._leftAxis,O),p.isPressed("Z","W"))$=!0;if(p.isPressed("S"))J=!0;if(p.isPressed("A","Q"))U=!0;if(p.isPressed("D"))Z=!0;const F=this._keyboardSensibility*Q;if(p.isPressed("ArrowUp"))N+=F;else if(p.isPressed("ArrowDown"))N-=F;if(p.isPressed("ArrowLeft"))j+=F;else if(p.isPressed("ArrowRight"))j-=F;this._theta+=j,this._phi+=N;const q=Math.PI*0.5,R=q*0.95;this._phi=Math.min(Math.max(this._phi,-R),+R);const E=Math.cos(this._theta),B=Math.sin(this._theta),[W,A,L]=this._axisIndices,w=Math.cos(this._phi+q);this._upAxis[W]=w*E,this._upAxis[A]=w*B,this._upAxis[L]=Math.sin(this._phi+q);const V=Math.cos(this._phi);if(this._forwardAxis[W]=V*E,this._forwardAxis[A]=V*B,this._forwardAxis[L]=Math.sin(this._phi),M.cross(this._leftAxis,this._upAxis,this._forwardAxis),$)M.add(this._position,this._position,K);else if(J)M.sub(this._position,this._position,K);if(U)M.add(this._position,this._position,I);else if(Z)M.sub(this._position,this._position,I);M.add(this._target,this._position,this._forwardAxis)}getPosition(){return this._position}setPosition(Q){M.copy(this._position,Q)}getTarget(){return this._target}getForwardAxis(){return this._forwardAxis}getLeftAxis(){return this._leftAxis}getUpAxis(){return this._upAxis}getTheta(){return this._theta}getPhi(){return this._phi}getTouchMoveForward(){return this._touchMoveForward}}var s;(function(J){J[J["perspective"]=0]="perspective";J[J["orthogonal"]=1]="orthogonal"})(s||(s={}));class B0{_projectionType=s.perspective;_perspectiveData;_orthogonalData;_viewportPos=Z0.fromValues(0,0);_viewportSize=Z0.fromValues(0,0);_projectionMatrix=P.create();_viewMatrix=P.create();_composedMatrix=P.create();_eye=M.fromValues(0,0,0);_target=M.fromValues(0,0,0);_upAxis=M.fromValues(0,0,0);setAsPerspective(Q){this._projectionType=s.perspective;let $=Q.aspectRatio;if($===void 0)$=this._viewportSize[0]/this._viewportSize[1];this._perspectiveData={fovy:Q.fovy,aspectRatio:$,near:Q.near,far:Q.far}}setAsOrthogonal(Q){this._projectionType=s.orthogonal,this._orthogonalData={...Q}}setViewportPos(Q,$){this._viewportPos[0]=Q,this._viewportPos[1]=$}getViewportPos(){return this._viewportPos}setViewportSize(Q,$){if(this._viewportSize[0]=Q,this._viewportSize[1]=$,this._projectionType!==s.perspective&&this._perspectiveData)this._perspectiveData.aspectRatio=this._viewportSize[0]/this._viewportSize[1]}getViewportSize(){return this._viewportSize}lookAt(Q,$,J){M.copy(this._eye,Q),M.copy(this._target,$),M.copy(this._upAxis,J)}setEye(Q){M.copy(this._eye,Q)}setTarget(Q){M.copy(this._target,Q)}setUpAxis(Q){M.copy(this._upAxis,Q)}getEye(){return this._eye}getTarget(){return this._target}getUpAxis(){return this._upAxis}addOffset(Q){M.add(this._eye,this._eye,Q),M.add(this._target,this._target,Q)}subOffset(Q){M.subtract(this._eye,this._eye,Q),M.subtract(this._target,this._target,Q)}computeMatrices(){if(this._projectionType===s.perspective){const{fovy:Q,aspectRatio:$,near:J,far:U}=this._perspectiveData;P.perspective(this._projectionMatrix,Q,$,J,U)}else if(this._projectionType===s.orthogonal){const{left:Q,right:$,top:J,bottom:U,near:Z,far:j}=this._orthogonalData;P.ortho(this._projectionMatrix,Q,$,J,U,Z,j)}P.lookAt(this._viewMatrix,this._eye,this._target,this._upAxis),this.computeComposedMatrix()}computeComposedMatrix(){P.multiply(this._composedMatrix,this._projectionMatrix,this._viewMatrix)}setProjectionMatrix(Q){P.copy(this._projectionMatrix,Q)}setViewMatrix(Q){P.copy(this._viewMatrix,Q)}setComposedMatrix(Q){P.copy(this._composedMatrix,Q)}getProjectionMatrix(){return this._projectionMatrix}getViewMatrix(){return this._viewMatrix}getComposedMatrix(){return this._composedMatrix}getPerspectiveData(){if(this._projectionType!==s.perspective)throw new Error("not a perspective projection");return this._perspectiveData}getOrthogonalData(){if(this._projectionType!==s.orthogonal)throw new Error("not an orthogonal projection");return this._orthogonalData}}var N0={};r(N0,{vertex:()=>{{return d8}},fragment:()=>{{return s8}}});var d8=`
#version 300 es

precision highp float;

uniform mat4 u_composedMatrix;

in vec3 a_vertex_position;
in vec4 a_vertex_color;

flat out vec4 v_color;

void main(void)
{
  gl_Position = u_composedMatrix * vec4(a_vertex_position, 1.0);

  v_color = a_vertex_color;
}
`.trim(),s8=`
#version 300 es

precision lowp float;

flat in vec4 v_color;

out vec4 o_color;

void main(void)
{
  o_color = v_color;
}

`.trim();var BQ=14336;class D0{_shader;_geometry;_buffer=new Float32Array(BQ);_currentSize=0;constructor(Q,$){this._shader=Q;const J={...$,primitiveType:C.PrimitiveType.lines};this._geometry=new C.Geometry(Q,J),this._geometry.setFloatBufferSize(0,BQ)}pushLine(Q,$,J){if(this._currentSize+14>=this._buffer.length)if(this._shader.isBound())this.flush();else return;const U=J[3]??1;this._buffer[this._currentSize+0]=Q[0],this._buffer[this._currentSize+1]=Q[1],this._buffer[this._currentSize+2]=Q[2],this._buffer[this._currentSize+3]=J[0],this._buffer[this._currentSize+4]=J[1],this._buffer[this._currentSize+5]=J[2],this._buffer[this._currentSize+6]=U,this._currentSize+=7,this._buffer[this._currentSize+0]=$[0],this._buffer[this._currentSize+1]=$[1],this._buffer[this._currentSize+2]=$[2],this._buffer[this._currentSize+3]=J[0],this._buffer[this._currentSize+4]=J[1],this._buffer[this._currentSize+5]=J[2],this._buffer[this._currentSize+6]=U,this._currentSize+=7}canRender(){return this._currentSize>0}flush(){if(!this.canRender())return;this._geometry.updateBuffer(0,this._buffer,this._currentSize),this._geometry.setPrimitiveCount(this._currentSize/7),this._geometry.render(),this.clear()}clear(){this._currentSize=0}}var qQ=7168;class G0{_shader;_geometry;_buffer=new Float32Array(qQ);_currentSize=0;constructor(Q,$){this._shader=Q;const J={...$,primitiveType:C.PrimitiveType.triangles};this._geometry=new C.Geometry(Q,J),this._geometry.setFloatBufferSize(0,qQ)}pushTriangle(Q,$,J,U){if(this._currentSize+42>=this._buffer.length)if(this._shader.isBound())this.flush();else return;const Z=U[3]??1;this._buffer[this._currentSize+0]=Q[0],this._buffer[this._currentSize+1]=Q[1],this._buffer[this._currentSize+2]=Q[2],this._buffer[this._currentSize+3]=U[0],this._buffer[this._currentSize+4]=U[1],this._buffer[this._currentSize+5]=U[2],this._buffer[this._currentSize+6]=Z,this._currentSize+=7,this._buffer[this._currentSize+0]=$[0],this._buffer[this._currentSize+1]=$[1],this._buffer[this._currentSize+2]=$[2],this._buffer[this._currentSize+3]=U[0],this._buffer[this._currentSize+4]=U[1],this._buffer[this._currentSize+5]=U[2],this._buffer[this._currentSize+6]=Z,this._currentSize+=7,this._buffer[this._currentSize+0]=J[0],this._buffer[this._currentSize+1]=J[1],this._buffer[this._currentSize+2]=J[2],this._buffer[this._currentSize+3]=U[0],this._buffer[this._currentSize+4]=U[1],this._buffer[this._currentSize+5]=U[2],this._buffer[this._currentSize+6]=Z,this._currentSize+=7}pushLine(Q,$,J,U){if(this._currentSize+42>=this._buffer.length)return;const Z=$[0]-Q[0],j=$[1]-Q[1],N=Math.atan2(j,Z)+Math.PI*0.5,H=Math.cos(N)*J*0.5,Y=Math.sin(N)*J*0.5;this.pushTriangle([Q[0]-H,Q[1]-Y,Q[2]],[$[0]-H,$[1]-Y,$[2]],[$[0]+H,$[1]+Y,$[2]],U),this.pushTriangle([Q[0]-H,Q[1]-Y,Q[2]],[$[0]+H,$[1]+Y,$[2]],[Q[0]+H,Q[1]+Y,Q[2]],U)}pushRotatedLine(Q,$,J,U,Z){this.pushLine([Q[0]-J*Math.cos($),Q[1]-J*Math.sin($),Q[2]],[Q[0]+J*Math.cos($),Q[1]+J*Math.sin($),Q[2]],U,Z)}pushOriginBoundRectangle(Q,$,J){if(this._currentSize+42>=this._buffer.length)return;const U=[Q[0]+$[0],Q[1]+$[1]];this.pushTriangle([Q[0],Q[1],Q[2]],[U[0],U[1],Q[2]],[Q[0],U[1],Q[2]],J),this.pushTriangle([Q[0],Q[1],Q[2]],[U[0],Q[1],Q[2]],[U[0],U[1],Q[2]],J)}pushCenteredRectangle(Q,$,J){const U=[Q[0]-$[0]*0.5,Q[1]-$[1]*0.5,Q[2]];this.pushOriginBoundRectangle(U,$,J)}canRender(){return this._currentSize>0}flush(){if(!this.canRender())return;this._geometry.updateBuffer(0,this._buffer,this._currentSize),this._geometry.setPrimitiveCount(this._currentSize/7),this._geometry.render(),this.clear()}clear(){this._currentSize=0}}class L0{_shader;_wireFramesStackRenderer;_trianglesStackRenderer;constructor(){this._shader=new c("StackRenderers",{vertexSrc:N0.vertex,fragmentSrc:N0.fragment,attributes:["a_vertex_position","a_vertex_color"],uniforms:["u_composedMatrix"]});const Q=new C.GeometryBuilder;Q.reset().setPrimitiveType("lines").addVbo().setVboAsDynamic().addVboAttribute("a_vertex_position","vec3f").addVboAttribute("a_vertex_color","vec4f"),this._wireFramesStackRenderer=new D0(this._shader,Q.getDef()),this._trianglesStackRenderer=new G0(this._shader,Q.getDef())}pushLine(Q,$,J){this._wireFramesStackRenderer.pushLine(Q,$,J)}pushCross(Q,$,J){const U=[[Q[0]-$,Q[1],Q[2]],[Q[0]+$,Q[1],Q[2]],[Q[0],Q[1]-$,Q[2]],[Q[0],Q[1]+$,Q[2]],[Q[0],Q[1],Q[2]-$],[Q[0],Q[1],Q[2]+$]],Z=[0,1,2,3,4,5];for(let j=0;j<Z.length;j+=2){const N=U[j+0],H=U[j+1];this._wireFramesStackRenderer.pushLine(N,H,J)}}pushThickLine(Q,$,J,U){this._trianglesStackRenderer.pushLine(Q,$,J,U)}pushRotatedLine(Q,$,J,U,Z){this._trianglesStackRenderer.pushRotatedLine(Q,$,J,U,Z)}pushOriginBoundRectangle(Q,$,J){this._trianglesStackRenderer.pushOriginBoundRectangle(Q,$,J)}pushCenteredRectangle(Q,$,J){this._trianglesStackRenderer.pushCenteredRectangle(Q,$,J)}pushTriangle(Q,$,J,U){this._trianglesStackRenderer.pushTriangle(Q,$,J,U)}flush(Q){if(!this._wireFramesStackRenderer.canRender()&&!this._trianglesStackRenderer.canRender())return;this._shader.bind(()=>{this._shader.setMatrix4Uniform("u_composedMatrix",Q),this._wireFramesStackRenderer.flush(),this._trianglesStackRenderer.flush()})}safeRender(Q,$){this._shader.bind(()=>{this._shader.setMatrix4Uniform("u_composedMatrix",Q),$(),this._wireFramesStackRenderer.flush(),this._trianglesStackRenderer.flush()})}clear(){this._wireFramesStackRenderer.clear(),this._trianglesStackRenderer.clear()}}var H0={};r(H0,{vertex:()=>{{return l8}},fragment:()=>{{return n8}}});var l8=`

#version 300 es

precision highp float;

in vec2 a_vertexPosition;
in vec3 a_plotPosition;

out vec3 v_position;

void main(void)
{
  gl_Position = vec4(a_vertexPosition, 1.0, 1.0);

  v_position = a_plotPosition;
}

`.trim(),n8=`

#version 300 es

precision highp float;

//
//
//

uniform vec3        u_cameraEye;

//

uniform sampler2D   u_sceneTextureData;
uniform int         u_sceneTextureSize;

uniform int       u_spheresStart;
uniform int       u_spheresStop;

uniform int       u_boxesStart;
uniform int       u_boxesStop;

uniform int       u_trianglesStart;
uniform int       u_trianglesStop;

//

uniform sampler2D   u_lightsTextureData;

uniform int       u_sunLightsStart;
uniform int       u_sunLightsStop;

uniform int       u_spotLightsStart;
uniform int       u_spotLightsStop;

//
//
//

in vec3  v_position;

out vec4 o_color;

//

const float     g_ambiantLight = 0.05;

const int       g_reflectionMax = 2;
const bool      g_shadowsEnabled = true;

const vec3      g_backgroundColor = vec3(0.1);

//

struct RayValues
{
  vec3 origin;
  vec3 direction;
};

struct RayResult
{
  bool hasHit;
  float depth;
  vec3 position;
  vec3 normal;
  vec4 color;
  float reflection;
  bool lightEnabled;
};

//
//
//
//
//

float getSceneDataByIndex(int index)
{
  return texelFetch(u_sceneTextureData, ivec2(index, 0), 0).x;
}

vec3 getSceneVec3ByIndex(int index)
{
  return vec3(
    texelFetch(u_sceneTextureData, ivec2(index + 0, 0), 0).x,
    texelFetch(u_sceneTextureData, ivec2(index + 1, 0), 0).x,
    texelFetch(u_sceneTextureData, ivec2(index + 2, 0), 0).x
  );
}

float getLightsDataByIndex(int index)
{
  return texelFetch(u_lightsTextureData, ivec2(index, 0), 0).x;
}

vec3 getLightsVec3ByIndex(int index)
{
  return vec3(
    texelFetch(u_lightsTextureData, ivec2(index + 0, 0), 0).x,
    texelFetch(u_lightsTextureData, ivec2(index + 1, 0), 0).x,
    texelFetch(u_lightsTextureData, ivec2(index + 2, 0), 0).x
  );
}

//
//
//
//
//

bool intersectSphere(RayValues ray, float radius, out float distance, out vec3 normal)
{
  float nearValue = 0.001; // TODO: hardcoded
  float farValue = 100.0; // TODO: hardcoded

  float b = dot(ray.origin, ray.direction);
  float c = dot(ray.origin, ray.origin) - radius * radius;
  float h = b * b - c;
  if (h < 0.0)
    return false;

  h = sqrt(h);

  float d1 = -b - h;
  if (d1 >= nearValue && d1 <= farValue)
  {
    normal = normalize(ray.origin + ray.direction * d1);
    distance = d1;
    return true;
  }

  float d2 = -b + h;
  if (d2 >= nearValue && d2 <= farValue)
  {
    normal = normalize(ray.origin + ray.direction * d2);
    distance = d2;
    return true;
  }

  return false;
}

bool intersectBox(RayValues ray, vec3 boxSize, out float distance, out vec3 normal)
{
  float nearValue = 0.001; // TODO: hardcoded
  float farValue = 100.0; // TODO: hardcoded

  //
  //
  // sad hack: fix a shadow related bug

  if (ray.direction.x == 0.0) ray.direction.x = -1e-8;
  if (ray.direction.y == 0.0) ray.direction.y = -1e-8;
  if (ray.direction.z == 0.0) ray.direction.z = -1e-8;

  // sad hack: fix a shadow related bug
  //
  //

  vec3 m = sign(ray.direction) / max(abs(ray.direction), 1e-8);
  vec3 n = m * ray.origin;
  vec3 k = abs(m) * boxSize;

  vec3 t1 = -n - k;
  vec3 t2 = -n + k;

  float tN = max(max(t1.x, t1.y), t1.z);
  float tF = min(min(t2.x, t2.y), t2.z);

  if (tN > tF || tF <= 0.0)
    return false;

  if (tN >= nearValue && tN <= farValue)
  {
    normal = normalize(-sign(ray.direction) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz));
    distance = tN;
    return true;
  }

  if (tF >= nearValue && tF <= farValue)
  {
    normal = normalize(-sign(ray.direction) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz));
    distance = tF;
    return true;
  }

  return false;
}

bool intersectTriangle(RayValues ray, vec3 v0, vec3 v1, vec3 v2, out float distance, out vec3 normal)
{
  float nearValue = 0.001; // TODO: hardcoded
  float farValue = 100.0; // TODO: hardcoded

  vec3 v1v0 = v1 - v0;
  vec3 v2v0 = v2 - v0;
  vec3 rov0 = ray.origin - v0;

  vec3 n = cross(v1v0, v2v0);
  vec3 q = cross(rov0, ray.direction);
  float d = 1.0 / dot(ray.direction, n);
  float u = d * dot(-q, v2v0);
  float v = d * dot(q, v1v0);
  float t = d * dot(-n, rov0);

  if (u < 0.0 || v < 0.0 || (u + v) > 1.0 || t < nearValue || t > farValue)
    return false;

  normal = normalize(-n);
  distance = t;
  return true;
}

// float intersectPlane(RayValues ray, vec3 normal, float offset)
// {
//     return -(dot(ray.origin, normal) + offset) / dot(ray.direction, normal);
// }

// float intersectPlane2(RayValues ray, vec3 normal, float offset)
// {
//     float nearValue = 0.001; // TODO: hardcoded
//     float farValue = 1000.0; // TODO: hardcoded

//     float a = dot(ray.direction, normal);
//     float d = -(dot(ray.origin, normal) + offset) / a;

//     if (a > 0.0 || d < nearValue || d > farValue)
//         return -1.0;

//     return d;
// }

// float diskIntersect(RayValues ray, vec3 center, vec3 normal, float radius)
// {
//     vec3  o = ray.origin - center;
//     float t = -dot(normal, o) / dot(ray.direction, normal);
//     vec3  q = o + ray.direction * t;
//     return (dot(q, q) < radius * radius) ? t : -1.0;
// }

//
//
//
//
//

bool intersectScene(RayValues ray, out RayResult result, bool shadowMode)
{
  float bestDistance = -1.0;

  result.hasHit = false;

  if (u_sceneTextureSize <= 0)
    return false;

  RayValues tmpRay;
  vec3 normal;

  for (int index = u_spheresStart; index < u_spheresStop; index += 11)
  {
    bool shadowEnabled = (getSceneDataByIndex(index + 8) != 0.0);

    if (shadowMode && !shadowEnabled)
      continue;

    tmpRay.origin = ray.origin;
    tmpRay.direction = ray.direction;

    vec3 center = getSceneVec3ByIndex(index + 0);

    tmpRay.origin -= center;

    float radius = getSceneDataByIndex(index + 3);

    float currDistance = 0.0;
    if (!intersectSphere(tmpRay, radius, currDistance, normal) || (bestDistance > 0.0 && currDistance > bestDistance))
      continue;

    bestDistance = currDistance;

    result.hasHit = true;
    result.depth = bestDistance;
    result.position = ray.origin + bestDistance * ray.direction;
    result.normal = normal;

    bool chessboardMaterial = (getSceneDataByIndex(index + 10) != 0.0);

    if (chessboardMaterial)
    {
      // vec3 txPos = (txx * vec4(result.position - center, 1.0)).xyz;
      vec3 txPos = (vec4(result.position - center, 1.0)).xyz;
      // chessboard color effect
      if (fract(txPos.x * 0.2) > 0.5 == fract(txPos.z * 0.2) > 0.5 == fract(txPos.y * 0.2) > 0.5)
      {
        result.color = vec4(1.0);
        result.reflection = 0.3;
      }
      else
      {
        result.color = vec4(0.0, 0.4, 0.45, 1.0);
        result.reflection = 0.0;
      }
    }
    else
    {
      vec3 color = getSceneVec3ByIndex(index + 4);

      float reflection = getSceneDataByIndex(index + 7);

      result.color = vec4(color, 0.5);
      result.reflection = reflection;
    }

    bool lightEnabled = (getSceneDataByIndex(index + 9) != 0.0);
    result.lightEnabled = lightEnabled;

    // if (shadowMode)
    //     return true;
  }

  for (int index = u_boxesStart; index < u_boxesStop; index += 26)
  {
    bool shadowEnabled = (getSceneDataByIndex(index + 23) != 0.0);

    if (shadowMode && !shadowEnabled)
      continue;

    tmpRay.origin = ray.origin;
    tmpRay.direction = ray.direction;

    mat4 normalTransformationMatrix = mat4(
      getSceneDataByIndex(index + 0),
      getSceneDataByIndex(index + 1),
      getSceneDataByIndex(index + 2),
      getSceneDataByIndex(index + 3),

      getSceneDataByIndex(index + 4),
      getSceneDataByIndex(index + 5),
      getSceneDataByIndex(index + 6),
      getSceneDataByIndex(index + 7),

      getSceneDataByIndex(index + 8),
      getSceneDataByIndex(index + 9),
      getSceneDataByIndex(index + 10),
      getSceneDataByIndex(index + 11),

      getSceneDataByIndex(index + 12),
      getSceneDataByIndex(index + 13),
      getSceneDataByIndex(index + 14),
      getSceneDataByIndex(index + 15)
    );

    vec3 boxSize = getSceneVec3ByIndex(index + 16);

    mat4 inversedTransformationMatrix = inverse(normalTransformationMatrix);

    // convert ray from world space to box space
    tmpRay.origin = (inversedTransformationMatrix * vec4(tmpRay.origin, 1.0)).xyz;
    tmpRay.direction = (inversedTransformationMatrix * vec4(tmpRay.direction, 0.0)).xyz;

    float currDistance = 0.0;
    if (!intersectBox(tmpRay, boxSize, currDistance, normal) || (bestDistance > 0.0 && currDistance > bestDistance))
      continue;

    bestDistance = currDistance;

    // convert normal from box space to world space
    normal = (normalTransformationMatrix * vec4(normal, 0.0)).xyz;

    result.hasHit = true;
    result.depth = bestDistance;
    result.position = ray.origin + bestDistance * ray.direction;
    result.normal = normal;

    bool chessboardMaterial = (getSceneDataByIndex(index + 25) != 0.0);

    if (chessboardMaterial)
    {
      vec3 txPos = (inversedTransformationMatrix * vec4(result.position, 1.0)).xyz;

      // chessboard color effect
      if (fract(txPos.x * 0.2) > 0.5 == fract(txPos.z * 0.2) > 0.5 == fract(txPos.y * 0.2) > 0.5)
      {
        result.color = vec4(1.0);
        result.reflection = 0.3;
      }
      else
      {
        result.color = vec4(0.0, 0.4, 0.45, 1.0);
        result.reflection = 0.0;
      }
    }
    else
    {
      vec3 color = getSceneVec3ByIndex(index + 19);

      float reflection = getSceneDataByIndex(index + 22);

      result.color = vec4(color, 1.0);
      result.reflection = reflection;
    }

    bool lightEnabled = (getSceneDataByIndex(index + 24) != 0.0);
    result.lightEnabled = lightEnabled;

    // if (shadowMode)
    //     return true;
  }

  for (int index = u_trianglesStart; index < u_trianglesStop; index += 15)
  {
    bool shadowEnabled = (getSceneDataByIndex(index + 13) != 0.0);

    if (shadowMode && !shadowEnabled)
      continue;

    tmpRay.origin = ray.origin;
    tmpRay.direction = ray.direction;

    vec3 v0 = getSceneVec3ByIndex(index + 0);
    vec3 v1 = getSceneVec3ByIndex(index + 3);
    vec3 v2 = getSceneVec3ByIndex(index + 6);

    float currDistance = 0.0;
    if (!intersectTriangle(tmpRay, v0, v1, v2, currDistance, normal) || (bestDistance > 0.0 && currDistance > bestDistance))
      continue;

    bestDistance = currDistance;

    result.hasHit = true;
    result.depth = bestDistance;
    result.position = ray.origin + bestDistance * ray.direction;
    result.normal = normal;

    vec3 color = getSceneVec3ByIndex(index + 9);

    float reflection = getSceneDataByIndex(index + 12);

    result.color = vec4(color, 1.0);
    result.reflection = reflection;

    bool lightEnabled = (getSceneDataByIndex(index + 14) != 0.0);
    result.lightEnabled = lightEnabled;

    // if (shadowMode)
    //     return true;
  }

  { // plane test

    // vec3 planeNormal = normalize(vec3(0.0, 0.0, 1.0));
    // float val = intersectPlane(tmpRay, planeNormal, 35.0/4.0*3.0);

    // vec3 planeNormal = normalize(vec3(0.0, 0.0, 1.0));
    // float val = intersectPlane(tmpRay, planeNormal, 0.0);

    // vec3 planeNormal = normalize(vec3(0.0, 0.0, 1.0));
    // float val = intersectPlane(tmpRay, planeNormal, 10.0);

    // if (val > 0.0 && (bestDistance <= 0.0 || val < bestDistance))
    // {
    //     result.hasHit = true;
    //     result.depth = val;
    //     result.position = ray.origin + val * ray.direction;
    //     result.normal = vec3(planeNormal);
    //     result.color = vec4(1.0, 1.0, 1.0, 1.0);
    //     result.reflection = 0.0;
    //     result.lightEnabled = true;
    // }

  } // plane test

  return result.hasHit;
}

float lightAt(vec3 impactPosition, vec3 impactNormal, vec3 viewer)
{
  float bestIntensity = 0.0;

  for (int index = u_sunLightsStart; index < u_sunLightsStop; index += 4)
  {
    if (!g_shadowsEnabled)
      continue;

    vec3 lightDir = getLightsVec3ByIndex(index + 0);
    float localIntensity = getLightsDataByIndex(index + 3);

    float coef = localIntensity;
    lightDir = normalize(lightDir);

    // is the light blocked by an object?
    RayResult result;
    if (intersectScene(RayValues(impactPosition, lightDir), result, true))
      continue; // an object is shadowing this light: ignore this light

    //
    //
    //

    float intensity = 0.0;
    vec3 reflection = reflect(-lightDir, impactNormal);
    intensity += 0.6 * pow(max(dot(reflection, viewer), 0.0), 30.0);
    intensity += 1.0 * dot(lightDir, impactNormal);

    intensity *= coef;

    if (bestIntensity < intensity)
      bestIntensity = intensity;
  }

  for (int index = u_spotLightsStart; index < u_spotLightsStop; index += 5)
  {
    vec3 lightDir = vec3(1.0);
    float coef = 1.0;

    // spot light

    vec3 lightPos = getLightsVec3ByIndex(index + 0);
    float lightRadius = getLightsDataByIndex(index + 3);

    vec3 lightToImpactVec3 = lightPos - impactPosition;

    // is too far?
    float lightToImpactDistance = length(lightToImpactVec3);
    if (lightToImpactDistance > lightRadius)
      continue; // too far

    lightDir.x = lightToImpactVec3.x / lightToImpactDistance; // normalize
    lightDir.y = lightToImpactVec3.y / lightToImpactDistance; // normalize
    lightDir.z = lightToImpactVec3.z / lightToImpactDistance; // normalize

    float localIntensity = getLightsDataByIndex(index + 4);

    coef = localIntensity * (1.0 - lightToImpactDistance / lightRadius);

    if (!g_shadowsEnabled)
      continue;

    // is the light blocked by an object?
    RayResult result;
    if (intersectScene(RayValues(impactPosition, lightDir), result, true))
    {
      // avoid "opposite shadows"
      if (result.depth < lightToImpactDistance)
        continue; // shadow
    }

    //
    //
    //

    float intensity = 0.0;
    vec3 reflection = reflect(-lightDir, impactNormal);
    intensity += 0.6 * pow(max(dot(reflection, viewer), 0.0), 30.0);
    intensity += 1.0 * dot(lightDir, impactNormal);

    intensity *= coef;

    if (bestIntensity < intensity)
      bestIntensity = intensity;
  }

  return max(g_ambiantLight, bestIntensity);
}

void main()
{
  //
  //
  // initial ray

  vec3 rayDir = normalize(v_position - u_cameraEye); // camera direction
  vec3 finalPixelColor = g_backgroundColor;

  RayValues currRay = RayValues(u_cameraEye, rayDir);
  RayResult result;

  result.position = u_cameraEye;
  result.reflection = 1.0;
  result.lightEnabled = true;

  float lastReflection = 1.0;

  const int maxIteration = g_reflectionMax;
  for (int iterationLeft = maxIteration; iterationLeft >= 0; --iterationLeft)
  {
    if (result.reflection <= 0.05)
      break;

    bool mustStop = false;

    currRay = RayValues(result.position, rayDir);

    result.hasHit = intersectScene(currRay, result, false);

    vec3 tmpColor = g_backgroundColor;

    if (result.hasHit)
    {
      float lightIntensity = 1.0;

      if (result.lightEnabled)
      {
        lightIntensity = lightAt(result.position, result.normal, -currRay.direction);

        if (lightIntensity <= 0.0)
        {
          // not lighted
          mustStop = true;
        }
      }

      tmpColor = result.color.xyz * lightIntensity;
    }

    finalPixelColor = finalPixelColor * (1.0 - lastReflection) + tmpColor * lastReflection;

    if (mustStop || !result.hasHit)
    {
      break;
    }

    lastReflection *= result.reflection;

    rayDir = reflect(rayDir, result.normal);
  }

  o_color = vec4(finalPixelColor, 1.0);
}

`.trim();var Y0={};r(Y0,{vertex:()=>{{return i8}},fragment:()=>{{return r8}}});var i8=`

#version 300 es

precision highp float;

in vec2 a_vertexPosition;
in vec2 a_vertexTextureCoord;

out vec2 v_textureCoord;

void main(void)
{
  v_textureCoord = a_vertexTextureCoord;

  gl_Position = vec4(a_vertexPosition, 1.0, 1.0);
}

`.trim(),r8=`

#version 300 es

precision highp float;

uniform sampler2D u_texture;
uniform vec2 u_step;

in vec2 v_textureCoord;

out vec4 o_color;

void main(void)
{
  // gl_FragColor = texture(u_texture, v_textureCoord);

  float total = 0.0;
  vec4 accumulated = vec4(0.0);

  //

  if (v_textureCoord.x - u_step.x > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x - u_step.x, v_textureCoord.y));
    total += 1.0;
  }

  if (v_textureCoord.x + u_step.x > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x + u_step.x, v_textureCoord.y));
    total += 1.0;
  }

  if (v_textureCoord.y - u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x, v_textureCoord.y - u_step.y));
    total += 1.0;
  }

  if (v_textureCoord.y + u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x, v_textureCoord.y + u_step.y));
    total += 1.0;
  }

  //

  if (v_textureCoord.x - u_step.x > 0.0 && v_textureCoord.y - u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x - u_step.x, v_textureCoord.y - u_step.y));
    total += 1.0;
  }

  if (v_textureCoord.x + u_step.x > 0.0 && v_textureCoord.y - u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x + u_step.x, v_textureCoord.y - u_step.y));
    total += 1.0;
  }

  if (v_textureCoord.x - u_step.x > 0.0 && v_textureCoord.y + u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x - u_step.x, v_textureCoord.y + u_step.y));
    total += 1.0;
  }

  if (v_textureCoord.x + u_step.x > 0.0 && v_textureCoord.y + u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x + u_step.x, v_textureCoord.y + u_step.y));
    total += 1.0;
  }

  //

  if (total > 0.0)
    o_color = accumulated / total;
  else
    o_color = vec4(1.0, 0.0, 0.0, 1.0); // warning
}

`.trim();var V0=(Q)=>Q*Math.PI/180;class w0{_cameraFovy;_canvasWidth;_canvasHeight;_renderWidth;_renderHeight;_resolutionCoef=1;_antiAliasing=!1;_rayTracerShaderProgram;_textureShaderProgram;_rayTracerGeometry;_screenGeometry;_finalTexture;_frameBuffer;_sceneDataTexture;_spheres=[];_boxes=[];_triangles=[];_lightsDataTexture;_sunLights=[];_spotLights=[];_camera;constructor(Q){this._cameraFovy=Q.fovy,this._renderWidth=this._canvasWidth=Q.canvasWidth,this._renderHeight=this._canvasHeight=Q.canvasHeight,this._rayTracerShaderProgram=new c("RayTracerRenderer-1",{vertexSrc:H0.vertex,fragmentSrc:H0.fragment,attributes:["a_vertexPosition","a_plotPosition"],uniforms:["u_cameraEye","u_sceneTextureData","u_sceneTextureSize","u_spheresStart","u_spheresStop","u_boxesStart","u_boxesStop","u_trianglesStart","u_trianglesStop","u_lightsTextureData","u_sunLightsStart","u_sunLightsStop","u_spotLightsStart","u_spotLightsStop"]}),this._textureShaderProgram=new c("RayTracerRenderer-1",{vertexSrc:Y0.vertex,fragmentSrc:Y0.fragment,attributes:["a_vertexPosition","a_vertexTextureCoord"],uniforms:["u_texture","u_step"]}),this._finalTexture=new a,this._finalTexture.allocate(this._renderWidth,this._renderHeight),this._frameBuffer=new I0,this._frameBuffer.attachTexture(this._finalTexture);const $=new C.GeometryBuilder;$.reset().setPrimitiveType("triangleStrip").addVbo().addVboAttribute("a_vertexPosition","vec2f").addVbo().setVboAsDynamic().addVboAttribute("a_plotPosition","vec3f"),this._rayTracerGeometry=new C.Geometry(this._rayTracerShaderProgram,$.getDef());const J=[];J.push(1,1),J.push(-1,1),J.push(1,-1),J.push(-1,-1),this._rayTracerGeometry.updateBuffer(0,J,J.length),this._rayTracerGeometry.setPrimitiveStart(0),this._rayTracerGeometry.setPrimitiveCount(4),$.reset().setPrimitiveType("triangleStrip").addVbo().addVboAttribute("a_vertexPosition","vec2f").addVboAttribute("a_vertexTextureCoord","vec2f"),this._screenGeometry=new C.Geometry(this._textureShaderProgram,$.getDef());const U=[];U.push(1,1,1,1),U.push(-1,1,0,1),U.push(1,-1,1,0),U.push(-1,-1,0,0),this._screenGeometry.updateBuffer(0,U,U.length),this._screenGeometry.setPrimitiveStart(0),this._screenGeometry.setPrimitiveCount(4),this._sceneDataTexture=new F0,this._sceneDataTexture.initialize(),this._lightsDataTexture=new F0,this._lightsDataTexture.initialize(),this._camera={position:M.fromValues(0,0,0),target:M.fromValues(1.5,1.5,1.5),up:M.fromValues(0,1,0)}}pushSphere({position:Q,radius:$,color:J,reflection:U,chessboard:Z,shadowEnabled:j,lightEnabled:N}){if($<=0)throw new Error("invalid sphere radius");if(U<0||U>1)throw new Error("invalid sphere reflection");this._spheres.push({position:[Q[0],Q[1],Q[2]],radius:$,color:[J[0],J[1],J[2]],reflection:U,chessboard:Z,shadowEnabled:j,lightEnabled:N})}pushBox({position:Q,angleX:$,angleY:J,angleZ:U,boxSize:Z,color:j,reflection:N,chessboard:H,shadowEnabled:Y,lightEnabled:O}){if(Z[0]<=0||Z[1]<=0||Z[2]<=0)throw new Error("invalid box size");if(N<0||N>1)throw new Error("invalid box reflection");const K=P.create();P.identity(K),P.translate(K,K,Q),P.rotateY(K,K,J),P.rotateZ(K,K,U),P.rotateX(K,K,$),this._boxes.push({matrix:K,boxSize:M.clone(Z),color:M.clone(j),reflection:N,chessboard:H,shadowEnabled:Y,lightEnabled:O})}pushTriangle({v0:Q,v1:$,v2:J,color:U,reflection:Z,shadowEnabled:j,lightEnabled:N}){if(Z<0||Z>1)throw new Error("invalid triangle reflection");this._triangles.push({v0:M.clone(Q),v1:M.clone($),v2:M.clone(J),color:M.clone(U),reflection:Z,shadowEnabled:j,lightEnabled:N})}pushSunLight({direction:Q,intensity:$}){if($<=0)throw new Error("intensity cannot be 0");if(M.length(Q)===0)throw new Error("direction cannot be 0");const J=M.normalize(M.clone(Q),Q);this._sunLights.push({direction:J,intensity:$})}pushSpotLight({position:Q,intensity:$,radius:J}){if($<=0)throw new Error("intensity cannot be 0");if(J<=0)throw new Error("radius cannot be <= 0");this._spotLights.push({position:M.clone(Q),intensity:$,radius:J})}lookAt(Q,$,J){M.copy(this._camera.position,Q);let U=M.sub(M.create(),$,Q);U=M.normalize(U,U),U=M.add(U,Q,U),M.copy(this._camera.target,U);const Z=M.normalize(M.create(),J);M.copy(this._camera.up,Z)}render(){const Q=D.getContext(),$=this._computeCameraFarCorners();this._rayTracerGeometry.updateBuffer(1,$,$.length);const J=Math.floor(this._renderWidth),U=Math.floor(this._renderHeight);this._frameBuffer.bind(),Q.viewport(0,0,J,U),Q.clear(Q.COLOR_BUFFER_BIT);{const Z=this._rayTracerShaderProgram;Z.bind(()=>{Z.setFloat3Uniform("u_cameraEye",this._camera.position[0],this._camera.position[1],this._camera.position[2]);{const j=[];{{Z.setInteger1Uniform("u_spheresStart",0);for(let N of this._spheres)j.push(N.position[0],N.position[1],N.position[2]),j.push(N.radius),j.push(N.color[0],N.color[1],N.color[2]),j.push(N.reflection),j.push(N.shadowEnabled?1:0),j.push(N.lightEnabled?1:0),j.push(N.chessboard?1:0);Z.setInteger1Uniform("u_spheresStop",j.length)}{Z.setInteger1Uniform("u_boxesStart",j.length);for(let N of this._boxes){for(let H=0;H<16;++H)j.push(N.matrix[H]);j.push(N.boxSize[0],N.boxSize[1],N.boxSize[2]),j.push(N.color[0],N.color[1],N.color[2]),j.push(N.reflection),j.push(N.shadowEnabled?1:0),j.push(N.lightEnabled?1:0),j.push(N.chessboard?1:0)}Z.setInteger1Uniform("u_boxesStop",j.length)}{Z.setInteger1Uniform("u_trianglesStart",j.length);for(let N of this._triangles)j.push(N.v0[0],N.v0[1],N.v0[2]),j.push(N.v1[0],N.v1[1],N.v1[2]),j.push(N.v2[0],N.v2[1],N.v2[2]),j.push(N.color[0],N.color[1],N.color[2]),j.push(N.reflection),j.push(N.shadowEnabled?1:0),j.push(N.lightEnabled?1:0);Z.setInteger1Uniform("u_trianglesStop",j.length)}}Q.activeTexture(Q.TEXTURE0+0),this._sceneDataTexture.bind(),this._sceneDataTexture.update(j),Z.setInteger1Uniform("u_sceneTextureData",0),Z.setInteger1Uniform("u_sceneTextureSize",j.length)}{const j=[];{Z.setInteger1Uniform("u_sunLightsStart",0);for(let N of this._sunLights)j.push(N.direction[0],N.direction[1],N.direction[2]),j.push(N.intensity);Z.setInteger1Uniform("u_sunLightsStop",j.length)}{Z.setInteger1Uniform("u_spotLightsStart",j.length);for(let N of this._spotLights)j.push(N.position[0],N.position[1],N.position[2]),j.push(N.radius),j.push(N.intensity);Z.setInteger1Uniform("u_spotLightsStop",j.length)}Q.activeTexture(Q.TEXTURE0+1),this._lightsDataTexture.bind(),this._lightsDataTexture.update(j),Z.setInteger1Uniform("u_lightsTextureData",1)}this._rayTracerGeometry.render()})}I0.unbind(),Q.viewport(0,0,this._canvasWidth,this._canvasHeight),Q.clear(Q.COLOR_BUFFER_BIT);{const Z=this._textureShaderProgram;Z.bind(()=>{if(Z.setTextureUniform("u_texture",this._finalTexture,0),this._antiAliasing){const j=(1-this._renderWidth/this._canvasWidth)*0.005,N=(1-this._renderHeight/this._canvasHeight)*0.005;Z.setFloat2Uniform("u_step",j,N)}else Z.setFloat2Uniform("u_step",0,0);this._screenGeometry.render(),a.unbind()})}}reset(){this._sunLights.length=0,this._spotLights.length=0,this._spheres.length=0,this._boxes.length=0,this._triangles.length=0}setResolutionCoef(Q){if(Q===this._resolutionCoef||Q<=0||Q>1)return;this._resolutionCoef=Q,this._renderWidth=Math.floor(this._canvasWidth*this._resolutionCoef),this._renderHeight=Math.floor(this._canvasHeight*this._resolutionCoef),this._finalTexture.resize(this._renderWidth,this._renderHeight)}getResolutionCoef(){return this._resolutionCoef}setAntiAliasing(Q){this._antiAliasing=Q}getAntiAliasing(){return this._antiAliasing}getCurrentSize(){return[this._renderWidth,this._renderHeight]}_computeCameraFarCorners(){const Q=M.sub(M.create(),this._camera.target,this._camera.position),$=M.cross(M.create(),Q,this._camera.up),J=M.cross(M.create(),$,Q),U=V0(this._cameraFovy*0.5),Z=Math.cos(U)*1/Math.sin(U),j=M.multiply(M.create(),Q,M.fromValues(Z,Z,Z)),N=M.add(M.create(),this._camera.position,j),H=this._canvasWidth/this._canvasHeight,Y=M.multiply(M.create(),$,M.fromValues(H,H,H)),O=M.add(M.create(),N,J),K=M.subtract(M.create(),N,J),I=M.subtract(M.create(),O,Y),F=M.subtract(M.create(),K,Y),q=M.add(M.create(),O,Y),R=M.add(M.create(),K,Y);return[q[0],q[1],q[2],I[0],I[1],I[2],R[0],R[1],R[2],F[0],F[1],F[2]]}get canvasWidth(){return this._canvasWidth}get canvasHeight(){return this._canvasHeight}get renderWidth(){return this._renderWidth}get renderHeight(){return this._renderHeight}get camera(){return this._camera}get spheres(){return this._spheres}get boxes(){return this._boxes}get triangles(){return this._triangles}get sunLights(){return this._sunLights}get spotLights(){return this._spotLights}}var O0={};r(O0,{vertex:()=>{{return u8}},fragment:()=>{{return e8}}});var u8=`
#version 300 es

precision highp float;

uniform mat4 u_composedMatrix;

in vec2 a_vertex_position;
in vec2 a_vertex_texCoord;
in vec3 a_offset_position;
in vec2 a_offset_texCoord;
in vec3 a_offset_color;
in float a_offset_scale;

out vec2 v_texCoord;
flat out vec3 v_color;

void main(void)
{
  vec3 position = vec3(a_vertex_position, 0.0) * a_offset_scale + a_offset_position;

  gl_Position = u_composedMatrix * vec4(position, 1.0);

  v_texCoord = a_vertex_texCoord + a_offset_texCoord;
  v_color = a_offset_color;
}
`.trim(),e8=`
#version 300 es

precision mediump float;

uniform sampler2D u_texture;

in vec2 v_texCoord;
flat in vec3 v_color;

out vec4 o_color;

void main(void)
{
  vec4 textureColor = texture(u_texture, v_texCoord);
  if (textureColor.a < 0.5)
  {
    discard;
  }
  else
  {
    o_color = vec4(v_color, textureColor.a);
  }
}

`.trim();var A0="7e7e28fd03fd07fe04fe0aff02ff7e4dfd0cfd03fd07fe04fe0aff02ff1afc0dfd10fc08fc0ffe55ff15fb0bfd03fd07fe04fe08f707fd04ff07fe02fe0cfd0ffd0cfd0aff03fe03ff0afe44fe15fb0bfd03fd04f204f607fd03fe07fe02fe0cfd0efd0efd0aff02fe02ff0bfe43fd15fb0cfe03fe05f204fe01ff02ff0afd02fd07fe02fe0bfd0efd10fd0afa0cfe42fd16fb1bfe04fe07fe01ff02ff0efd09fc1cfd12fd09fa0cfe41fd17fb1bfe04fe07f70bfd0afc04ff17fd12fd06f405f616f61cfd19fd1cfe04fe08f709fd0bfb02fe17fd12fd06f405f616f61bfd1afd1cfe04fe0aff02ff01fe08fd0bfe02fa17fd12fd09fa0cfe3efd37f207ff02ff01fe07fd02fd07fe03fc19fd10fd0afa0cfe3dfd38f204f607fe03fd07fe03fd1bfd0efd0aff02fe02ff0bfe0cfd1dfd0dfd1dfd1cfe04fe07f708ff04fd07fe02fb1bfd0cfd0aff03fe03ff0afe0cfd1dfd0cfd1efd1cfe04fe0aff02ff1afb02fe1bfc08fc0ffe1cfd1dfd0bfd1ffd1cfe04fe0aff02ff7afd7e7e7e7e7e7e0efd17fd10fc0af80bfe0bf909f90dfd08f609fb08f506f808f82cfd19fd0df807fd04fd0afe0afd03fd07fd03fd0bfc08fd0ffd0bfd05fd05fd04fd06fd04fd2afd1bfd0bfc02fc06fd03fc09fd0afd04fd06fd04fd09fb08fd0efd0cfd05fd05fd04fd06fd04fd09fd0cfd0efd1dfd0afe05fd06fd02fb06fa11fd0dfd08fe01fd08fd0dfd0dfd05fd05fd04fd06fd04fd09fd0cfd0dfd0af409fd10fd06fd02fb06fa10fd0dfd08fe02fd08fd0dfd15fd05fb02fd06fd04fd09fd0cfd0cfd0bf40afd0efd07fd01fe01fd09fd0ffd0bfb08fe03fd08f808f70efd08fa08f626fd23fd0cfd08fd01fe01fd09fd0efd0cfb08f606f707f60cfd09fa09f726fd23fd0bfd09fb02fd09fd0dfd10fd07f60cfc06fd04fd0bfd08fd02fb0dfd09fd0cfd0cfd0bf40afd0cfd09fb02fd09fd0cfd12fd0bfd0ffd06fd04fd0afd09fd04fd0dfd09fd0cfd0dfd0af409fd19fc03fd09fd0bfd03fd06fd04fd0bfd08fd04fd06fd04fd09fd0afd04fd0cfd0afd0cfd0efd1dfd1afd04fd09fd0afd04fd06fd03fd0cfd08fd03fd07fd04fd09fd0afd04fd0bfd19fd10fd1bfd0ffd0af807f707f607f90bf907f909f80afd0bf809fb2efd19fd10fd7e51fd17fd11fd7e7e7e7e13f87e78fd05fd08fc09f709f907f808f606f608f907fd03fd07f90df905fc03fd06fb0bfd05fd05fd05fd08fb08fd05fd07fa09fd03fd07fd03fd07fd02fd08fd04fe07fd04fe07fd03fd06fd03fd09fd11fd08fd03fd07fd0cfc03fc05fd05fd07fd01fd07fd05fd06fd02fd08fd03fd06fd04fd07fd03fd07fd05ff07fd05ff06fd04fd06fd03fd09fd11fd08fd02fd08fd0cfb01fb05fc04fd06fd03fd06fd05fd05fd04fd07fd03fd06fd0efd03fd07fd0dfd0cfd04fd06fd03fd09fd11fd08fd01fd09fd0cf505fb03fd05fd05fd05fd02fa05fd04fd07fd03fd06fd0efd03fd07fd03fe08fd03fe07fd0dfd03fd09fd11fd08fa0afd0cf505fa02fd05fd05fd05fd02fa05fd04fd07f807fd0efd03fd07f808f807fd0df709fd11fd08fb0bfd0cfd01fd01fd05fd01fd01fd05fd05fd05fd02fa05fd04fd07f807fd0efd03fd07f808f807fd0df709fd11fd08fb0bfd0cfd02ff02fd05fd02fa05fd05fd05fd02fa05f607fd03fd06fd0efd03fd07fd03fe08fd03fe07fd02fb06fd03fd09fd0bfd03fd08fa0afd0cfd05fd05fd03fb05fd05fd05fd0dfd04fd07fd03fd06fd0efd03fd07fd0dfd0cfd04fd06fd03fd09fd0bfd03fd08fd01fd09fd05ff06fd05fd05fd04fc05fd05fd05fd0dfd04fd07fd03fd06fd04fd07fd03fd07fd05ff07fd0cfd04fd06fd03fd09fd0bfd03fd08fd02fd08fd04fe06fd05fd05fd05fd06fd03fd06fd0dfd04fd07fd03fd07fd03fd07fd02fd08fd04fe07fd0dfd03fd06fd03fd09fd0bfd03fd08fd03fd07fd03fd06fd05fd05fd05fd07fd01fd07fd0dfd04fd06f709f907f808f606fb0df806fd03fd07f90af908fc03fd06f606fd05fd05fd05fd08fb0af87e7e7e7e7e7e7e68fe1af70afb08f708f807f505fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07f608f907ff11f90afc1afd03fd07fc01fc07fd03fd06fd04fd06fe02fd02fe05fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07fd04fd08fd0bfe14fd09fa19fd03fd07fd03fd07fd03fd06fd04fd06ff03fd03ff05fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07fe05fd08fd0bfd13fd08fd02fd18fd03fd06fd05fd06fd03fd06fd04fd0afd09fd03fd07fd03fd07fd05fd06fd01fd08fd03fd07ff05fd09fd0cfd12fd07fd04fd17fd03fd06fd05fd06fd03fd06fd11fd09fd03fd07fd03fd07fd05fd07fb09fd03fd0cfd0afd0dfd11fd28f807fd05fd06f808f90cfd09fd03fd07fd03fd07fd02ff02fd08fd0bfd01fd0cfd0bfd0efd10fd28f807fd05fd06f809f90bfd09fd03fd07fd03fd07fd02ff02fd08fd0cfb0cfd0cfd0ffd0ffd28fd0cfd03fb06fd02fd0efd0afd09fd03fd07fd03fd07fd02ff02fd07fb0cfd0cfd0dfd10fd0efd28fd0cfd02fa06fd03fd06fd04fd0afd09fd03fd07fd03fd08f707fd01fd0bfd0bfd05ff08fd11fd0dfd28fd0df707fd03fd06fd04fd0afd09fd03fd08fd01fd09fc01fc06fd03fd0afd0afd05fe08fd12fd0cfd28fd0df707fd03fd06fd04fd0afd09fd03fd09fb0bfd01fd07fd03fd0afd0afd04fd08fd13fd0bfd27fb12fd06fc03fd07f809f908f90bfd0cfd01fd07fd03fd08f908f608f910fd06f93cfa7e54f07e72f07e7e7e7e0bfd1dfc21fb19fb18fc10fd0ffd07fc0dfa39fd1efd22fd19fd01fd18fd10fd0ffd08fd10fd3bfd1cfd22fd19fd01fd18fd10fd0ffd08fd10fd3bfd1cfd22fd19fd1cfd2dfd10fd4af909f808f909f808f90afd0cfb02fe07fd01fc08fa0cfa08fd03fd0afd09f606f809f91efd08fd03fd06fd03fd07fd03fd07fd03fd07f808fd03fd08fc02fd0afd0ffd08fd02fd0bfd09fd02ff02fd05fd03fd07fd03fd1dfd08fd03fd06fd03fd07fd03fd07fd03fd07f808fd03fd08fc02fd0afd0ffd08fd01fd0cfd09fd02ff02fd05fd03fd07fd03fd18f808fd03fd06fd0dfd03fd07f709fd0bfd03fd08fd03fd0afd0ffd08fa0dfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd0dfd03fd07fd0ffd0bfd03fd08fd03fd0afd0ffd08fd01fd0cfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd03fd07fd03fd07fd03fd09fd0cf808fd03fd0afd0ffd08fd02fd0bfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd03fd07fd03fd07fd03fd09fd0df908fd03fd0afd0ffd08fd03fd0afd09fd02ff02fd05fd03fd07fd03fd18fb02fe06fe02fb08f909fb02fe07f908f90ffd07fc03fd07f706fd03fd07fc03fd07f706fd05fd05fd03fd08f978fd03fd27fd03fd7e4af92afa7e7e7e7e7e7e18fa09fc09fa1efe4eff6efd0dfc0dfd1cfc4cfe6efd0dfc0dfd1bfa4afd6efd0dfc0dfd1afd02fd07fe02fb07fb02fe07fc02fd08f908f707fd03fd07fd03fd07fd05fd05fd02fd09fd03fd06f80afd0efc0efd08fb03fd05fd04fd07fd03fd05fd03fd09f706fd04fe09fd0bfd03fd07fd03fd07fd05fd05fd02fd09fd03fd06fe03fd08fd24fd05fd01fd02fd05fe06fe07fd03fd05fd03fd09fc02fd06fd04fe09fd0bfd03fd07fd03fd07fd05fd06fa0afd03fd06ff03fd09fd24fd05fd02fd01fd05fe06fe07fd03fd05fd03fd09fd0dfb0cfd0bfd03fd07fd03fd07fd02ff02fd07fc0bfd03fd09fd0cfd0efc0efd07fd03fb06fe06fe07fd03fd05fd03fd09fd0ffb0afd0bfd03fd07fd03fd07fd02ff02fd07fc0bfd03fd08fd0efd0dfc0dfd19fe06fe07fd03fd05fd03fd09fd0cfe04fd09fd01fd07fd03fd08fd01fd09fc01fc07fa0bf908fd03ff0bfd0dfc0dfd19fe06fe07f807f809fd0cfe04fd09fd01fd07fd03fd09fb0bfd01fd07fd02fd0bfb08fd03fe0bfd0dfc0dfd19f607fd11fd08fb0cf90bfb09fb02fe09fd0cfd01fd07fd02fd0dfd08f80cfa09fc09fa1af607fd11fd7cfd69fb0ffb77fa";var RQ=[16,6],X=[1/RQ[0],1/RQ[1]],MQ=36864;class _0{_shader;_geometry;_texture=new a;_texCoordMap;_buffer=new Float32Array(MQ);_currentSize=0;_textScale=14;_textColor=[1,1,1];_horizontalTextAlign="left";_verticalTextAlign="top";constructor(){this._shader=new c("TextRenderer",{vertexSrc:O0.vertex,fragmentSrc:O0.fragment,attributes:["a_vertex_position","a_vertex_texCoord","a_offset_position","a_offset_texCoord","a_offset_color","a_offset_scale"],uniforms:["u_composedMatrix","u_texture"]});const Q=new C.GeometryBuilder;Q.reset().setPrimitiveType("triangles").addVbo().addVboAttribute("a_vertex_position","vec2f").addVboAttribute("a_vertex_texCoord","vec2f").setStride(16).addVbo().setVboAsDynamic().setVboAsInstanced().addVboAttribute("a_offset_position","vec3f").addVboAttribute("a_offset_texCoord","vec2f").addVboAttribute("a_offset_color","vec3f").addVboAttribute("a_offset_scale","float").setStride(36),this._geometry=new C.Geometry(this._shader,Q.getDef());const $=[{position:[0.5,-0.5],texCoord:[X[0]*1,X[1]*1]},{position:[-0.5,-0.5],texCoord:[X[0]*0,X[1]*1]},{position:[0.5,0.5],texCoord:[X[0]*1,X[1]*0]},{position:[-0.5,0.5],texCoord:[X[0]*0,X[1]*0]}],J=[1,0,2,1,2,3],U=[];for(let H of J){const Y=$[H];U.push(Y.position[0],Y.position[1],Y.texCoord[0],Y.texCoord[1])}this._geometry.updateBuffer(0,U,U.length),this._geometry.setPrimitiveCount(U.length/4),this._geometry.setFloatBufferSize(1,MQ),this._texCoordMap=new Map([[" ",[0*X[0],0*X[1]]],["!",[1*X[0],0*X[1]]],['"',[2*X[0],0*X[1]]],["#",[3*X[0],0*X[1]]],["$",[4*X[0],0*X[1]]],["%",[5*X[0],0*X[1]]],["&",[6*X[0],0*X[1]]],["'",[7*X[0],0*X[1]]],["(",[8*X[0],0*X[1]]],[")",[9*X[0],0*X[1]]],["*",[10*X[0],0*X[1]]],["+",[11*X[0],0*X[1]]],[",",[12*X[0],0*X[1]]],["-",[13*X[0],0*X[1]]],[".",[14*X[0],0*X[1]]],["/",[15*X[0],0*X[1]]],["0",[0*X[0],1*X[1]]],["1",[1*X[0],1*X[1]]],["2",[2*X[0],1*X[1]]],["3",[3*X[0],1*X[1]]],["4",[4*X[0],1*X[1]]],["5",[5*X[0],1*X[1]]],["6",[6*X[0],1*X[1]]],["7",[7*X[0],1*X[1]]],["8",[8*X[0],1*X[1]]],["9",[9*X[0],1*X[1]]],[":",[10*X[0],1*X[1]]],[";",[11*X[0],1*X[1]]],["<",[12*X[0],1*X[1]]],["=",[13*X[0],1*X[1]]],[">",[14*X[0],1*X[1]]],["?",[15*X[0],1*X[1]]],["@",[0*X[0],2*X[1]]],["A",[1*X[0],2*X[1]]],["B",[2*X[0],2*X[1]]],["C",[3*X[0],2*X[1]]],["D",[4*X[0],2*X[1]]],["E",[5*X[0],2*X[1]]],["F",[6*X[0],2*X[1]]],["G",[7*X[0],2*X[1]]],["H",[8*X[0],2*X[1]]],["I",[9*X[0],2*X[1]]],["J",[10*X[0],2*X[1]]],["K",[11*X[0],2*X[1]]],["L",[12*X[0],2*X[1]]],["M",[13*X[0],2*X[1]]],["N",[14*X[0],2*X[1]]],["O",[15*X[0],2*X[1]]],["P",[0*X[0],3*X[1]]],["Q",[1*X[0],3*X[1]]],["R",[2*X[0],3*X[1]]],["S",[3*X[0],3*X[1]]],["T",[4*X[0],3*X[1]]],["U",[5*X[0],3*X[1]]],["V",[6*X[0],3*X[1]]],["W",[7*X[0],3*X[1]]],["X",[8*X[0],3*X[1]]],["Y",[9*X[0],3*X[1]]],["Z",[10*X[0],3*X[1]]],["[",[11*X[0],3*X[1]]],["\\",[12*X[0],3*X[1]]],["]",[13*X[0],3*X[1]]],["^",[14*X[0],3*X[1]]],["_",[15*X[0],3*X[1]]],["`",[0*X[0],4*X[1]]],["a",[1*X[0],4*X[1]]],["b",[2*X[0],4*X[1]]],["c",[3*X[0],4*X[1]]],["d",[4*X[0],4*X[1]]],["e",[5*X[0],4*X[1]]],["f",[6*X[0],4*X[1]]],["g",[7*X[0],4*X[1]]],["h",[8*X[0],4*X[1]]],["i",[9*X[0],4*X[1]]],["j",[10*X[0],4*X[1]]],["k",[11*X[0],4*X[1]]],["l",[12*X[0],4*X[1]]],["m",[13*X[0],4*X[1]]],["n",[14*X[0],4*X[1]]],["o",[15*X[0],4*X[1]]],["p",[0*X[0],5*X[1]]],["q",[1*X[0],5*X[1]]],["r",[2*X[0],5*X[1]]],["s",[3*X[0],5*X[1]]],["t",[4*X[0],5*X[1]]],["u",[5*X[0],5*X[1]]],["v",[6*X[0],5*X[1]]],["w",[7*X[0],5*X[1]]],["x",[8*X[0],5*X[1]]],["y",[9*X[0],5*X[1]]],["z",[10*X[0],5*X[1]]],["{",[11*X[0],5*X[1]]],["|",[12*X[0],5*X[1]]],["}",[13*X[0],5*X[1]]],["~",[14*X[0],5*X[1]]]]);const Z=256,j=96,N=new Uint8Array(Z*j*4);{let H=0;for(let Y=0;Y<A0.length;Y+=2){let O=parseInt(`${A0.substring(Y,Y+2)}000000`,16)>>24,K=0;if(O<0)O=-O,K=255;for(let I=0;I<O;++I)N[H*4+0]=K,N[H*4+1]=K,N[H*4+2]=K,N[H*4+3]=K,++H}}this._texture.loadFromMemory(Z,j,N)}setTextAlign(Q,$){return this._horizontalTextAlign=Q,this._verticalTextAlign=$,this}setTextScale(Q){return this._textScale=Q,this}setTextColor(Q,$,J){return this._textColor[0]=Q,this._textColor[1]=$,this._textColor[2]=J,this}pushText(Q,$){if(Q.length===0)return this;if(this._textScale<=0)return this;const J=[0];for(let N=0;N<Q.length;++N)if(Q[N]=="\n")J.push(0);else J[J.length-1]+=1;if(J.length===0)return this;let U=0;const Z=[0,0],j=this._textScale*0.5;switch(this._horizontalTextAlign){case"left":Z[0]=$[0];break;case"centered":Z[0]=$[0]-J[U]*j+j;break;case"right":Z[0]=$[0]-J[U]*this._textScale+this._textScale;break}switch(this._verticalTextAlign){case"top":Z[1]=$[1];break;case"centered":Z[1]=$[1]+J.length*j-j;break;case"bottom":Z[1]=$[1]-(J.length-1)*this._textScale;break}for(let N=0;N<Q.length;++N){const H=Q[N];if(H=="\n"){switch(U+=1,this._horizontalTextAlign){case"left":Z[0]=$[0];break;case"centered":Z[0]=$[0]-J[U]*j+j;break;case"right":Z[0]=$[0]-J[U]*this._textScale+this._textScale;break}Z[1]-=this._textScale}else this._pushLetter(H,Z),Z[0]+=this._textScale}return this}_pushLetter(Q,$){if(this._currentSize+90>=this._buffer.length)return;const J=this._texCoordMap.get(Q);if(!J)throw new Error(`fail to find a letter, letter=${Q}`);for(let U=-1;U<=1;++U)for(let Z=-1;Z<=1;++Z)this._buffer[this._currentSize++]=$[0]+2*Z,this._buffer[this._currentSize++]=$[1]+2*U,this._buffer[this._currentSize++]=-0.1,this._buffer[this._currentSize++]=J[0],this._buffer[this._currentSize++]=J[1],this._buffer[this._currentSize++]=0,this._buffer[this._currentSize++]=0,this._buffer[this._currentSize++]=0,this._buffer[this._currentSize++]=this._textScale;this._buffer[this._currentSize++]=$[0],this._buffer[this._currentSize++]=$[1],this._buffer[this._currentSize++]=0,this._buffer[this._currentSize++]=J[0],this._buffer[this._currentSize++]=J[1],this._buffer[this._currentSize++]=this._textColor[0],this._buffer[this._currentSize++]=this._textColor[1],this._buffer[this._currentSize++]=this._textColor[2],this._buffer[this._currentSize++]=this._textScale}flush(Q){if(this._currentSize===0)return this;return this._shader.bind(()=>{this._shader.setMatrix4Uniform("u_composedMatrix",Q),this._shader.setTextureUniform("u_texture",this._texture,0),this._geometry.updateBuffer(1,this._buffer,this._currentSize),this._geometry.setInstancedCount(this._currentSize/9),this._geometry.render()}),a.unbind(),this.clear(),this}clear(){return this._currentSize=0,this}}var EQ=70;class v0{_def;_rayTracerRenderer;_textRenderer;_stackRenderers;_debugSceneCamera=new B0;_mainHudCamera=new B0;constructor(Q){this._def=Q,this.resize(this._def.canvasDomElement.width,this._def.canvasDomElement.height),D.initialize(this._def.canvasDomElement),this._rayTracerRenderer=new w0({canvasWidth:this._def.canvasDomElement.width,canvasHeight:this._def.canvasDomElement.height,fovy:EQ}),this._textRenderer=new _0,this._stackRenderers=new L0}initialize(){const Q=D.getContext();Q.pixelStorei(Q.UNPACK_ALIGNMENT,1),Q.disable(Q.DEPTH_TEST),Q.disable(Q.BLEND),Q.disable(Q.CULL_FACE),Q.depthFunc(Q.NEVER),Q.clearColor(0,0,0,1),Q.clearDepth(1)}resize(Q,$){this._debugSceneCamera.setViewportSize(Q,$),this._debugSceneCamera.setAsPerspective({fovy:V0(EQ),near:1,far:500}),this._mainHudCamera.setViewportSize(Q,$);const J=Q*0.5,U=$*0.5;this._mainHudCamera.setAsOrthogonal({left:-J,right:+J,top:-U,bottom:+U,near:-200,far:200}),this._mainHudCamera.setEye([J,U,1]),this._mainHudCamera.setTarget([J,U,0]),this._mainHudCamera.setUpAxis([0,1,0]),this._mainHudCamera.computeMatrices()}_pushWireFrameSphere(Q){const $=0.5257311121191336*Q.radius,J=0.8506508083520399*Q.radius,Z=[[-$,0,J],[$,0,J],[-$,0,-J],[$,0,-J],[0,J,$],[0,J,-$],[0,-J,$],[0,-J,-$],[J,$,0],[-J,$,0],[J,-$,0],[-J,-$,0]];for(let N=0;N<Z.length;++N)Z[N][0]+=Q.position[0],Z[N][1]+=Q.position[1],Z[N][2]+=Q.position[2];const j=[[0,4,1],[0,9,4],[9,5,4],[4,5,8],[4,8,1],[8,10,1],[8,3,10],[5,3,8],[5,2,3],[2,7,3],[7,10,3],[7,6,10],[7,11,6],[11,0,6],[0,1,6],[6,1,10],[9,0,11],[9,11,2],[9,2,5],[7,2,11]];for(let N of j){const H=Z[N[0]],Y=Z[N[1]],O=Z[N[2]];this._stackRenderers.pushLine(H,Y,Q.color),this._stackRenderers.pushLine(Y,O,Q.color),this._stackRenderers.pushLine(O,H,Q.color)}}_pushWireFrameBox(Q){const $=[M.fromValues(-Q.boxSize[0],-Q.boxSize[1],-Q.boxSize[2]),M.fromValues(+Q.boxSize[0],-Q.boxSize[1],-Q.boxSize[2]),M.fromValues(-Q.boxSize[0],+Q.boxSize[1],-Q.boxSize[2]),M.fromValues(+Q.boxSize[0],+Q.boxSize[1],-Q.boxSize[2]),M.fromValues(-Q.boxSize[0],-Q.boxSize[1],+Q.boxSize[2]),M.fromValues(+Q.boxSize[0],-Q.boxSize[1],+Q.boxSize[2]),M.fromValues(-Q.boxSize[0],+Q.boxSize[1],+Q.boxSize[2]),M.fromValues(+Q.boxSize[0],+Q.boxSize[1],+Q.boxSize[2])],J=[];$.forEach((Z)=>{const j=M.fromValues(0,0,0);M.transformMat4(j,Z,Q.matrix),J.push(j)}),[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[3,7],[2,6]].forEach((Z)=>{this._stackRenderers.pushLine(J[Z[0]],J[Z[1]],Q.color)})}_pushWireFrameTriangle(Q){this._stackRenderers.pushLine(Q.v0,Q.v1,Q.color),this._stackRenderers.pushLine(Q.v1,Q.v2,Q.color),this._stackRenderers.pushLine(Q.v2,Q.v0,Q.color)}safeSceneWireFrame(Q){this._debugSceneCamera.setEye(this._rayTracerRenderer.camera.position),this._debugSceneCamera.setTarget(this._rayTracerRenderer.camera.target),this._debugSceneCamera.setUpAxis(this._rayTracerRenderer.camera.up),this._debugSceneCamera.computeMatrices(),this._stackRenderers.safeRender(this._debugSceneCamera.getComposedMatrix(),Q)}flushHudWireFrame(){this._stackRenderers.flush(this._mainHudCamera.getComposedMatrix())}flushHudText(){this._textRenderer.flush(this._mainHudCamera.getComposedMatrix())}setupDebugRenderer(){this._rayTracerRenderer.spheres.forEach((Q)=>this._pushWireFrameSphere(Q)),this._rayTracerRenderer.boxes.forEach((Q)=>this._pushWireFrameBox(Q)),this._rayTracerRenderer.triangles.forEach((Q)=>this._pushWireFrameTriangle(Q))}get rayTracerRenderer(){return this._rayTracerRenderer}get stackRenderers(){return this._stackRenderers}get textRenderer(){return this._textRenderer}}var o=0,g=0,b=0,X0=1,d=[[-5,4,0],[5,4,0],[5,10,0],[-5,10,0]];class T0{reset(){o=0,g=0,b=0,X0=1}run(Q,$){if(g+=$*2,g>=Math.PI*2)g-=Math.PI*2;if(o+=$*0.75,o>1)o=0,b=(b+1)%d.length,X0=(b+1)%d.length;const J=[d[b][0]+(d[X0][0]-d[b][0])*o,d[b][1]+(d[X0][1]-d[b][1])*o,d[b][2]+(d[X0][2]-d[b][2])*o];Q.rayTracerRenderer.pushSpotLight({position:[0,10,10],intensity:2,radius:20}),Q.rayTracerRenderer.pushSphere({position:[0,10,10],radius:0.25,color:[1,1,1],reflection:0,chessboard:!1,lightEnabled:!1,shadowEnabled:!1}),Q.rayTracerRenderer.pushSpotLight({position:J,intensity:2,radius:10}),Q.rayTracerRenderer.pushSphere({position:J,radius:0.25,color:[1,1,1],reflection:0,chessboard:!1,lightEnabled:!1,shadowEnabled:!1}),[{pos:[-2,4,-1],size:[1,1,0.125]},{pos:[-2,4,1],size:[1,1,0.125]},{pos:[-2,3,0],size:[1,0.125,1]},{pos:[-2,5,0],size:[1,0.125,1]},{pos:[2,4,-1],size:[1,1,0.125]},{pos:[2,4,1],size:[1,1,0.125]},{pos:[2,3,0],size:[1,0.125,1]},{pos:[2,5,0],size:[1,0.125,1]},{pos:[0,8,-8],size:[8,8,0.125],reflection:0.2},{pos:[-8,8,0],size:[0.125,8,8],reflection:0.2},{pos:[8,8,0],size:[0.125,8,8],reflection:0.2},{pos:[0,-0,0],size:[8,0.125,8],reflection:0.2}].forEach(({pos:Z,size:j,reflection:N})=>{Q.rayTracerRenderer.pushBox({position:Z,angleX:0,angleY:0,angleZ:0,boxSize:j,color:[1,1,1],reflection:N??0,chessboard:!1,lightEnabled:!0,shadowEnabled:!0})}),[{pos:[5+1*Math.cos(g),6,0+1*Math.sin(g)],angleY:-g,size:[0.125,1,1]},{pos:[5-1*Math.cos(g),8,0-1*Math.sin(g)],angleY:-g,size:[0.125,1,1]},{pos:[5+1*Math.cos(g+Math.PI*0.5),7,0+1*Math.sin(g+Math.PI*0.5)],angleY:-g+Math.PI*0.5,size:[0.125,2,1]},{pos:[5+1*Math.cos(g-Math.PI*0.5),7,0+1*Math.sin(g-Math.PI*0.5)],angleY:-g-Math.PI*0.5,size:[0.125,2,1]}].forEach(({pos:j,angleY:N,size:H})=>{Q.rayTracerRenderer.pushBox({position:j,angleX:0,angleY:N,angleZ:0,boxSize:H,color:[0,1,0],reflection:0,chessboard:!1,lightEnabled:!0,shadowEnabled:!0})})}}var q0=60;class S0{_canvasElement;_def;_freeFlyController;_renderer;_running;_errorGraphicContext;_currFrameTime=Date.now();_frameProfiler=new M0;_continuousTime=0;_perfAutoScalingEnabled=!0;_framesUntilNextCheck=q0;_scene=new T0;constructor(Q){this._canvasElement=Q.canvasElement,this._def=Q,this._freeFlyController=new W0({coordinates:["Z","X","Y"],position:[-10,13,15],theta:Math.PI*0.85,phi:-Math.PI*0.15,mouseSensibility:0.1,keyboardSensibility:Math.PI*0.45,touchSensibility:0.3,movingSpeed:10}),p.activate(),e.activate(this._canvasElement),l.allowPointerLockedOnClickEvent(this._canvasElement),l.addOnLockChange(()=>{if(l.isPointerLocked(this._canvasElement))this._def.logger.log("The pointer lock status is now locked"),u.activate();else this._def.logger.log("The pointer lock status is now unlocked"),u.deactivate(),l.allowPointerLockedOnClickEvent(this._canvasElement)}),l.addOnLockError(($)=>{this._def.logger.log(`The pointer lock sent an error, event: "${JSON.stringify($)}"`)}),this._renderer=new v0({canvasDomElement:this._canvasElement}),this._renderer.initialize(),this._running=!1,this._errorGraphicContext=!1,this._def.resolution.addEventListener("input",($)=>{const J=this._def.resolution.value;this._setResolution(11-J)}),this._def.anti_aliasing_enabled.addEventListener("click",()=>{const $=this._def.anti_aliasing_enabled.checked===!0;this._renderer.rayTracerRenderer.setAntiAliasing($),this._def.logger.log(`Anti aliasing change: ${$===!0?"enabled":"disabled"}`)});{const $=this._def.resolution.value;this._setResolution(11-$)}this._def.logger.log("user interface initialized"),this._def.perfAutoScaling.addEventListener("input",()=>{this._framesUntilNextCheck=q0,this._perfAutoScalingEnabled=this._def.perfAutoScaling.checked===!0,this._def.logger.log(`Performance auto scaler change: ${this._perfAutoScalingEnabled===!0?"enabled":"disabled"}`)})}async init(){await this._renderer.initialize()}resize(Q,$,J){let U=Q,Z=$;if(J)this._canvasElement.style.position="absolute",U=window.innerWidth,Z=window.innerHeight;else this._canvasElement.style.position="relative";this._canvasElement.style.left="0px",this._canvasElement.style.top="0px",this._canvasElement.style.width=`${U}px`,this._canvasElement.style.height=`${Z}px`,this._canvasElement.width=U,this._canvasElement.height=Z,this._renderer.resize(U,Z)}start(){if(this.isRunning())return;this._running=!0,this._tick()}stop(){this._running=!1}isRunning(){return this._running&&!this._errorGraphicContext}_tick(){const Q=()=>{if(!this._running||this._errorGraphicContext)return;window.requestAnimationFrame(Q),this._mainLoop()};Q()}_mainLoop(){const Q=Date.now();let $=Q-this._currFrameTime;this._currFrameTime=Q,this._frameProfiler.pushDelta($),this._handlePerformanceAutoScaling($);const J=$/1000;this._continuousTime+=J,this._freeFlyController.update(J),u.resetDelta();{const j=D.getContext();j.disable(j.DEPTH_TEST)}if(this._continuousTime+=J,this._scene.run(this._renderer,J),this._renderer.rayTracerRenderer.lookAt(this._freeFlyController.getPosition(),this._freeFlyController.getTarget(),this._freeFlyController.getUpAxis()),this._renderer.rayTracerRenderer.render(),this._def.debug_mode_enabled.checked===!0)this._renderer.safeSceneWireFrame(()=>{this._renderer.setupDebugRenderer(),this._renderer.stackRenderers.pushLine([0,0,0],[100,0,0],[1,0,0]),this._renderer.stackRenderers.pushLine([0,0,0],[0,100,0],[0,1,0]),this._renderer.stackRenderers.pushLine([0,0,0],[0,0,100],[0,0,1])});const Z=D.getContext();Z.clear(Z.DEPTH_BUFFER_BIT),Z.enable(Z.DEPTH_TEST),Z.depthFunc(Z.LESS),IQ(this._canvasElement,this._renderer.stackRenderers,this._renderer.textRenderer),d0([10,this._canvasElement.height-60,0],[100,50],this._frameProfiler,this._renderer.stackRenderers,this._renderer.textRenderer,!0),this._renderer.flushHudWireFrame(),this._renderer.flushHudText(),this._renderer.rayTracerRenderer.reset()}_setResolution(Q){this._renderer.rayTracerRenderer.setResolutionCoef(1/Q);const $=this._renderer.rayTracerRenderer.getCurrentSize(),J=$[0]*$[1];this._def.logger.log(`resolution changed (1/${Q}) => ${$[0]}x${$[1]} (${J}px)`)}_handlePerformanceAutoScaling(Q){if(this._perfAutoScalingEnabled!==!0)return;if(Q<=20){this._framesUntilNextCheck=q0;return}if(--this._framesUntilNextCheck,this._framesUntilNextCheck>0)return;this._def.logger.log("performance auto scaling: slow framerate, scaling down resolution");const J=parseInt(this._def.resolution.value,10)-1;if(J>=1&&J<=10)this._setResolution(11-J),this._def.resolution.value=`${J}`;this._framesUntilNextCheck=q0}}var t8=async()=>{let Q,$=null;const J=async(O)=>{if(Q)Q.error(O.message);else console.error(O.message);if($)$.stop()};window.addEventListener("error",J),Q=new R0("loggerOutput"),Q.log("page loaded");const U=(O)=>{const K=document.querySelector(O);if(!K)throw new Error(`html element "${O}" not found`);return K},Z=U("#rendering-canvas"),j=U("#auto-scaling-enabled"),N=U("#resolution"),H=U("#anti-aliasing-enabled"),Y=U("#debug-mode-enabled");if(!x0())throw new Error("missing WebGL2 feature (unsupported)");$=new S0({canvasElement:Z,logger:Q,perfAutoScaling:j,resolution:N,anti_aliasing_enabled:H,debug_mode_enabled:Y}),Q.log("initializing"),await $.init(),Q.log("initialized"),$.start(),Q.log("running")};window.addEventListener("load",t8,!1);

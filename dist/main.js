var wQ=Object.defineProperty;var K0=(Q,J)=>{for(var $ in J)wQ(Q,$,{get:J[$],enumerable:!0,configurable:!0,set:(U)=>J[$]=()=>U})};var f0=["requestFullscreen","webkitRequestFullscreen","mozRequestFullScreen","msRequestFullscreen"],AQ=["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","msfullscreenchange"];class S0{_onFullScreenChangeCallbacks=[];_isInitialized=!1;_initialize(){if(this._isInitialized)return;this._isInitialized=!0;const Q=()=>{this._onFullScreenChangeCallbacks.forEach((J)=>J())};for(let J of AQ)document.addEventListener(J,Q,!1)}isCompatible(Q){for(let J of f0)if(J in Q)return!0;return!1}isFullScreen(Q){return document.fullscreenElement===Q}async requestFullScreen(Q){if(this.isFullScreen(Q))return{success:!1,message:"element already in full screen"};this._initialize();for(let J of f0)if(J in Q)return Q[J](),{success:!0,message:"request for full screen done"};return{success:!1,message:"unsupported request for full screen"}}addOnFullScreenChange(Q){this._onFullScreenChangeCallbacks.push(Q)}removeOnFullScreenChange(Q){const J=this._onFullScreenChangeCallbacks.indexOf(Q);if(J<0)return;this._onFullScreenChangeCallbacks.splice(J,1)}}var eJ=new S0;var H0={Num0:48,Num1:49,Num2:50,Num3:51,Num4:52,Num5:53,Num6:54,Num7:55,Num8:56,Num9:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,Semicolon:186,Equal:187,Comma:188,Minus:189,Period:190,BackQuote:192,BracketLeft:219,Backslash:220,BracketRight:221,Quote:222,Shift:16,Ctrl:17,Alt:18,CapsLock:20,Tab:9,Enter:13,Pause:19,Escape:27,Space:32,PageUp:33,PageDown:34,End:35,Home:36,ArrowLeft:37,ArrowUp:38,ArrowRight:39,ArrowDown:40,PrintScreen:44,Insert:45,Delete:46,ContextMenu:93,ScrollLock:145,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,F16:127,F17:128,F18:129,F19:130,F20:131,F21:132,F22:133,F23:134,F24:135,NumPad0:96,NumPad1:97,NumPad2:98,NumPad3:99,NumPad4:100,NumPad5:101,NumPad6:102,NumPad7:103,NumPad8:104,NumPad9:105,NumPadMultiply:106,NumPadAdd:107,NumPadSubtract:109,NumPadDecimal:110,NumPadDivide:111,NumLock:144,NumPadComma:194,NumPadEqual:12};class h0{_pressedKeysSet=new Set;_preventDefaultKeysSet=new Set;_activated=!1;_handleKeyDown;_handleKeyUp;constructor(){const Q=($)=>{const{keyCode:U}=$;if(this._preventDefaultKeysSet.has(U))$.preventDefault();this._pressedKeysSet.add(U)},J=($)=>{const{keyCode:U}=$;if(this._preventDefaultKeysSet.has(U))$.preventDefault();this._pressedKeysSet.delete(U)};this._activated=!1,this._handleKeyDown=Q.bind(this),this._handleKeyUp=J.bind(this)}isPressed(...Q){for(let J of Q)if(this._pressedKeysSet.has(H0[J]))return!0;return!1}preventDefault(Q){this._preventDefaultKeysSet.add(H0[Q])}enableDefault(Q){this._preventDefaultKeysSet.delete(H0[Q])}activate(){if(this._activated)return;this._pressedKeysSet.clear(),document.addEventListener("keydown",this._handleKeyDown),document.addEventListener("keyup",this._handleKeyUp),this._activated=!0}deactivate(){if(!this._activated)return;this._pressedKeysSet.clear(),document.removeEventListener("keydown",this._handleKeyDown),document.removeEventListener("keyup",this._handleKeyUp),this._activated=!1}}var P=new h0;var _Q={Left:0,Middle:1,Right:2};class P0{_pressedButtonsSet=new Set;_activated=!1;_handleMouseDown;_handleMouseUp;_handleMouseMove;_deltaX=0;_deltaY=0;constructor(){const Q=(U)=>{this._pressedButtonsSet.add(U.button)},J=(U)=>{this._pressedButtonsSet.delete(U.button)},$=(U)=>{this._deltaX+=U.movementX||U.mozMovementX||U.webkitMovementX||0,this._deltaY+=U.movementY||U.mozMovementY||U.webkitMovementY||0};this._activated=!1,this._handleMouseDown=Q.bind(this),this._handleMouseUp=J.bind(this),this._handleMouseMove=$.bind(this)}activate(){if(this._activated)return;this._pressedButtonsSet.clear(),document.addEventListener("mousedown",this._handleMouseDown),document.addEventListener("mouseup",this._handleMouseUp),document.addEventListener("mousemove",this._handleMouseMove),this._activated=!0}deactivate(){if(!this._activated)return;this._pressedButtonsSet.clear(),document.removeEventListener("mousedown",this._handleMouseDown),document.removeEventListener("mouseup",this._handleMouseUp),document.removeEventListener("mousemove",this._handleMouseMove),this._activated=!1}isButtonPressed(Q){return this._pressedButtonsSet.has(_Q[Q])}deltaX(){return this._deltaX}deltaY(){return this._deltaY}resetDelta(){this._deltaX=0,this._deltaY=0}}var r=new P0;var p0=["requestPointerLock","mozRequestPointerLock","webkitRequestPointerLock"],vQ=["exitPointerLock","mozExitPointerLock","webkitExitPointerLock"],TQ=["pointerLockElement","mozPointerLockElement","webkitPointerLockElement"],fQ=[{methodName:"onpointerlockchange",propertyName:"pointerlockchange"},{methodName:"onmozpointerlockchange",propertyName:"mozpointerlockchange"},{methodName:"onwebkitpointerlockchange",propertyName:"webkitpointerlockchange"}],SQ=[{methodName:"onpointerlockerror",propertyName:"pointerlockerror"},{methodName:"onmozpointerlockerror",propertyName:"mozpointerlockerror"},{methodName:"onwebkitpointerlockerror",propertyName:"webkitpointerlockerror"}];class z0{_onLockChangeCallbacks=[];_onLockErrorCallbacks=[];_timeSinceLastLockChange=0;_latestRequestHtmlElement;_isInitialized=!1;_initialize(){if(this._isInitialized)return;this._isInitialized=!0;const Q=()=>{this._timeSinceLastLockChange=Date.now(),this._onLockChangeCallbacks.forEach(($)=>$())},J=($)=>{this._timeSinceLastLockChange=Date.now(),this._onLockErrorCallbacks.forEach((U)=>U($))};for(let $ of fQ)if($.methodName in document){document.addEventListener($.propertyName,Q,!1);break}for(let $ of SQ)if($.methodName in document){document.addEventListener($.propertyName,J,!1);break}}canBePointerLocked(Q){for(let J of p0)if(J in Q)return!0;return!1}isPointerLocked(Q){for(let J of TQ)if(J in document)return document[J]===Q;return!1}async requestPointerLock(Q){if(this.isPointerLocked(Q))return{success:!1,message:"element already locked"};if(this._initialize(),this._timeSinceLastLockChange>0){const J=(Date.now()-this._timeSinceLastLockChange)/1000;if(J<1.1)return{success:!1,message:`request for lock was too early, time to wait: ${J.toFixed(2)}sec`}}this._timeSinceLastLockChange=Date.now();for(let J of p0)if(J in Q){const $={unadjustedMovement:!1};try{await Q[J]($)}catch(U){return{success:!1,message:`request for lock was too early, time to wait: ${((Date.now()-this._timeSinceLastLockChange)/1000).toFixed(2)}sec`}}return this._timeSinceLastLockChange=Date.now(),{success:!0,message:"request for lock done"}}return{success:!1,message:"unsupported request for lock"}}allowPointerLockedOnClickEvent(Q){if(Q===this._latestRequestHtmlElement)return;this._latestRequestHtmlElement=Q;const J=async()=>{Q.removeEventListener("click",J);const $=await this.requestPointerLock(Q);if(this._latestRequestHtmlElement=void 0,!$.success)this.allowPointerLockedOnClickEvent(Q)};Q.addEventListener("click",J)}exitPointerLock(){for(let Q of vQ)if(Q in document){document[Q]();break}}addOnLockChange(Q){this._onLockChangeCallbacks.push(Q)}removeOnLockChange(Q){const J=this._onLockChangeCallbacks.indexOf(Q);if(J<0)return;this._onLockChangeCallbacks.splice(J,1)}addOnLockError(Q){this._onLockErrorCallbacks.push(Q)}removeOnLockError(Q){const J=this._onLockErrorCallbacks.indexOf(Q);if(J<0)return;this._onLockErrorCallbacks.splice(J,1)}}var l=new z0;class k0{id;createdAt=Date.now();positionX;positionY;deltaX=0;deltaY=0;constructor(Q,J,$){this.id=Q,this.positionX=J,this.positionY=$}resetDelta(){this.deltaX=0,this.deltaY=0}}class y0{_activated=!1;_allTouchDataMap=new Map;_allCachedTouchDataArray=[];_handleTouchStart;_handleTouchEnd;_handleTouchMove;constructor(){const Q=(U)=>{U.preventDefault();for(let Z=0;Z<U.changedTouches.length;++Z){const{identifier:N,pageX:j,pageY:H}=U.changedTouches[Z],O=new k0(N,j,H);this._allTouchDataMap.set(`${N}`,O),this._allCachedTouchDataArray.length=0}},J=(U)=>{U.preventDefault();for(let Z=0;Z<U.changedTouches.length;++Z){const{identifier:N}=U.changedTouches[Z];this._allTouchDataMap.delete(`${N}`),this._allCachedTouchDataArray.length=0}},$=(U)=>{U.preventDefault();for(let Z=0;Z<U.changedTouches.length;++Z){const{identifier:N,pageX:j,pageY:H}=U.changedTouches[Z],O=this._allTouchDataMap.get(`${N}`);if(!O)continue;const Y=j-O.positionX,K=H-O.positionY;O.deltaX+=Y,O.deltaY+=K,O.positionX=j,O.positionY=H}};this._activated=!1,this._handleTouchStart=Q.bind(this),this._handleTouchEnd=J.bind(this),this._handleTouchMove=$.bind(this)}isSupported(Q){return"ontouchstart"in Q}activate(Q){if(!this.isSupported(Q))return;if(this._activated)return;this._allTouchDataMap.clear(),this._allCachedTouchDataArray.length=0,Q.addEventListener("touchstart",this._handleTouchStart),Q.addEventListener("touchend",this._handleTouchEnd),Q.addEventListener("touchcancel",this._handleTouchEnd),Q.addEventListener("touchmove",this._handleTouchMove,{passive:!1}),this._activated=!0}deactivate(Q){if(!this._activated)return;this._allTouchDataMap.clear(),this._allCachedTouchDataArray.length=0,Q.removeEventListener("touchstart",this._handleTouchStart),Q.removeEventListener("touchend",this._handleTouchEnd),Q.removeEventListener("touchcancel",this._handleTouchEnd),Q.removeEventListener("touchmove",this._handleTouchMove),this._activated=!1}_refreshCache(){if(this._allCachedTouchDataArray.length===0)this._allCachedTouchDataArray=[...this._allTouchDataMap.values()]}getTouchData(){return this._refreshCache(),this._allCachedTouchDataArray}resetDeltas(){this._refreshCache(),this._allCachedTouchDataArray.forEach((Q)=>Q.resetDelta())}}var u=new y0;class C0{_activated=!1;_onVisibilityChangeCallbacks=[];_handleVisibilityChange;constructor(){const Q=()=>{const J=this.isVisible();this._onVisibilityChangeCallbacks.forEach(($)=>$(J))};this._handleVisibilityChange=Q.bind(this)}activate(){if(console.log("this.isSupported()",this.isSupported()),console.log("this._activated",this._activated),this._activated)return;document.addEventListener("visibilitychange",this._handleVisibilityChange,!1),this._activated=!0}deactivate(){if(!this._activated)return;document.removeEventListener("visibilitychange",this._handleVisibilityChange,!1),this._activated=!1}isSupported(){return"onvisibilitychange"in document}isVisible(){return document.visibilityState==="visible"}addVisibilityChange(Q){this._onVisibilityChangeCallbacks.push(Q)}removeVisibilityChange(Q){const J=this._onVisibilityChangeCallbacks.indexOf(Q);if(J<0)return;this._onVisibilityChangeCallbacks.splice(J,1)}}var I0=new C0;var m0=()=>{return!!window.WebGL2RenderingContext};class D{static _gl=null;static _extensionLoseContext=null;static initialize(Q){const J={alpha:!1,antialias:!1,depth:!0,failIfMajorPerformanceCaveat:!1,powerPreference:"high-performance",premultipliedAlpha:!0,preserveDrawingBuffer:!0,stencil:!1};if(D._gl=Q.getContext("webgl2",J),!D._gl)throw new Error("could not create webgl context");D._extensionLoseContext=D._gl.getExtension("WEBGL_lose_context"),D._gl.getExtension("EXT_color_buffer_float"),D._gl.getExtension("EXT_float_blend")}static getContext(){if(!D._gl)throw new Error("webgl context not initialized");return D._gl}static getExtensionLoseContext(){return D._extensionLoseContext}static getExtensionLoseContextStrict(){if(!D._extensionLoseContext)throw new Error("lose context extension not available");return D._extensionLoseContext}}class $0{_texture=null;initialize(Q=[]){if(this._texture)throw new Error("data texture already initialized");const J=D.getContext();this._texture=J.createTexture(),J.bindTexture(J.TEXTURE_2D,this._texture),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MAG_FILTER,J.NEAREST),this.update(Q)}update(Q){if(!this._texture)throw new Error("data texture not initialized");const J=D.getContext();J.bindTexture(J.TEXTURE_2D,this._texture);const $=new Float32Array(Q),U=0,Z=J.R32F,N=Q.length,j=1,H=0,O=J.RED,Y=J.FLOAT;J.texImage2D(J.TEXTURE_2D,U,Z,N,j,H,O,Y,$)}rawBind(){if(!this._texture)throw new Error("data texture not initialized");const Q=D.getContext();Q.bindTexture(Q.TEXTURE_2D,this._texture)}preBind(Q){this.rawBind(),Q(this)}bind(Q){this.preBind(Q),$0.unbind()}static unbind(){const Q=D.getContext();Q.bindTexture(Q.TEXTURE_2D,null)}}class O0{_frameBuffer;constructor(){const J=D.getContext().createFramebuffer();if(J===null)throw new Error("null frame buffer object");this._frameBuffer=J}rawBind(){const Q=D.getContext();Q.bindFramebuffer(Q.FRAMEBUFFER,this._frameBuffer)}bind(Q){this.rawBind(),Q(this),O0.unbind()}static unbind(){const Q=D.getContext();Q.bindFramebuffer(Q.FRAMEBUFFER,null)}attachTexture(Q){const J=D.getContext();J.bindFramebuffer(J.FRAMEBUFFER,this._frameBuffer),Q.rawBind();const $=0;J.framebufferTexture2D(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,Q.getRawObject(),$)}getPixels(Q,J,$,U){const Z=D.getContext(),N=new Uint8Array($*U*4);return Z.readPixels(Q,J,$,U,Z.RGBA,Z.UNSIGNED_BYTE,N),N}}var C;(function(o){o.BytesPerPixel=4;let J;(function(I){I[I["float"]=0]="float";I[I["vec2f"]=1]="vec2f";I[I["vec3f"]=2]="vec3f";I[I["vec4f"]=3]="vec4f";I[I["mat3f"]=4]="mat3f";I[I["mat4f"]=5]="mat4f"})(J=o.AttributeType||(o.AttributeType={}));const $=(j)=>{switch(j){case J.float:return 1;case J.vec2f:return 2;case J.vec3f:return 3;case J.vec4f:return 4;case J.mat3f:return 9;case J.mat4f:return 16}};let U;(function(Y){Y[Y["lines"]=0]="lines";Y[Y["triangles"]=1]="triangles";Y[Y["triangleStrip"]=2]="triangleStrip"})(U=o.PrimitiveType||(o.PrimitiveType={}));class Z{_def;_vao;_vbos;_primitiveType;_primitiveStart=0;_primitiveCount=0;_instanceCount=0;_isInstanced=!1;constructor(j,H){const O=D.getContext();if(H.vbos.length===0)throw new Error("empty vbo definition");for(let K of H.vbos){if(K.attrs.length===0)throw new Error("empty vbo attribute definition");for(let q of K.attrs)if(!j.hasAttribute(q.name))throw new Error(`attribute not found, name="${q.name}"`)}switch(this._def=H,H.primitiveType){case U.lines:this._primitiveType=O.LINES;break;case U.triangles:this._primitiveType=O.TRIANGLES;break;case U.triangleStrip:this._primitiveType=O.TRIANGLE_STRIP;break;default:throw new Error("primitive type not found")}const Y=O.createVertexArray();if(!Y)throw new Error("fail o create a vao unit");this._vao=Y,O.bindVertexArray(this._vao),this._vbos=[];for(let K of this._def.vbos){const q=O.createBuffer();if(!q)throw new Error("fail o create a vbo unit");this._vbos.push({object:q,maxSize:0,dynamic:K.dynamic||!1}),O.bindBuffer(O.ARRAY_BUFFER,q);let I=K.stride||0;if(!I){for(let B of K.attrs)switch(B.type){case J.float:I+=1;break;case J.vec2f:I+=2;break;case J.vec3f:I+=3;break;case J.vec4f:I+=4;break;case J.mat3f:I+=9;break;case J.mat4f:I+=16;break}I*=4}for(let B of K.attrs){let R=1,E=1;switch(B.type){case J.float:R=1,E=1;break;case J.vec2f:R=2,E=1;break;case J.vec3f:R=3,E=1;break;case J.vec4f:R=4,E=1;break;case J.mat3f:R=3,E=3;break;case J.mat4f:R=4,E=4;break}const F=j.getAttribute(B.name);for(let W=0;W<E;++W){const A=F+W,L=(B.index+W*R)*4;if(O.enableVertexAttribArray(A),O.vertexAttribPointer(A,R,O.FLOAT,!1,I,L),K.instanced===!0)O.vertexAttribDivisor(A,1),this._isInstanced=!0}}}O.bindVertexArray(null)}dispose(){const j=D.getContext();for(let H of this._vbos)j.deleteBuffer(H.object);this._vbos.length=0,j.deleteVertexArray(this._vao)}setBufferSize(j,H){if(j<0||j>=this._vbos.length)throw new Error("no buffer available to that index");if(H<=0)return;const O=this._vbos[j];if(H<O.maxSize)return;O.maxSize=H;const Y=D.getContext(),K=O.dynamic?Y.DYNAMIC_DRAW:Y.STATIC_DRAW;Y.bindBuffer(Y.ARRAY_BUFFER,O.object),Y.bufferData(Y.ARRAY_BUFFER,H,K),Y.bindBuffer(Y.ARRAY_BUFFER,null)}setFloatBufferSize(j,H){this.setBufferSize(j,H*4)}updateBuffer(j,H,O){if(j<0||j>=this._vbos.length)throw new Error("no buffer available to that index");if(O<=0)return;const Y=D.getContext(),K=H instanceof Float32Array?H:new Float32Array(H),q=this._vbos[j];if(Y.bindBuffer(Y.ARRAY_BUFFER,q.object),O>q.maxSize){q.maxSize=O;const I=q.dynamic?Y.DYNAMIC_DRAW:Y.STATIC_DRAW;Y.bufferData(Y.ARRAY_BUFFER,K,I,0,O)}else Y.bufferSubData(Y.ARRAY_BUFFER,0,K,0,O);Y.bindBuffer(Y.ARRAY_BUFFER,null)}render(){if(this._primitiveCount==0)return;if(this._isInstanced&&this._instanceCount==0)return;const j=D.getContext();if(j.bindVertexArray(this._vao),this._isInstanced===!0)j.drawArraysInstanced(this._primitiveType,this._primitiveStart,this._primitiveCount,this._instanceCount);else j.drawArrays(this._primitiveType,this._primitiveStart,this._primitiveCount);j.bindVertexArray(null)}setPrimitiveStart(j){this._primitiveStart=j}setPrimitiveCount(j){this._primitiveCount=j}setInstancedCount(j){this._instanceCount=j}}o.Geometry=Z;class N{_def={vbos:[],primitiveType:U.lines};reset(){return this._def={vbos:[],primitiveType:U.lines},this}getDef(){return this._def}setPrimitiveType(j){return this._def.primitiveType=U[j],this}addVbo(){return this._def.vbos.push({attrs:[],instanced:!1}),this}setVboAsInstanced(){return this._getLastVbo().instanced=!0,this}setVboAsDynamic(){return this._getLastVbo().dynamic=!0,this}setStride(j){return this._getLastVbo().stride=j,this}addVboAttribute(j,H){const O=this._getLastVbo(),Y=O.attrs.length>0?O.attrs[O.attrs.length-1]:null;return O.attrs.push({name:j,type:J[H],index:Y?Y.index+$(Y.type):0}),this}_getLastVbo(){if(this._def.vbos.length===0)throw new Error("no VBO setup");return this._def.vbos[this._def.vbos.length-1]}}o.GeometryBuilder=N})(C||(C={}));class c{static _isBound=null;_name;_program;_attributes=new Map;_uniforms=new Map;constructor(Q,J){this._name=Q;const $=D.getContext(),U=this._getShader(J.vertexSrc,$.VERTEX_SHADER),Z=this._getShader(J.fragmentSrc,$.FRAGMENT_SHADER),N=$.createProgram();if(!N)throw new Error("could not create a shader program");if($.attachShader(N,U),$.attachShader(N,Z),$.linkProgram(N),$.deleteShader(U),$.deleteShader(Z),!$.getProgramParameter(N,$.LINK_STATUS)){const j=$.getProgramInfoLog(N);throw new Error("Failed to initialized shaders, Error linking:"+j)}this._program=N,this.bind(()=>{this._getAttributes(J.attributes),this._getUniforms(J.uniforms)})}bind(Q){if(c._isBound!==null)throw new Error(`Double shader binding (bound: ${c._isBound._name}, binding: ${this._name})`);c._isBound=this,D.getContext().useProgram(this._program),Q(this),c.unbind()}static unbind(){D.getContext().useProgram(null),c._isBound=null}isBound(){return c._isBound===this}hasAttribute(Q){return this._attributes.has(Q)}getAttribute(Q){const J=this._attributes.get(Q);if(J===void 0)throw new Error(`attribute not found: ${Q}`);return J}getUniform(Q){const J=this._uniforms.get(Q);if(J===void 0)throw new Error(`uniform not found: ${Q}`);return J}setTextureUniform(Q,J,$){const U=D.getContext();U.activeTexture(U.TEXTURE0+$),U.uniform1i(this.getUniform(Q),$),J.rawBind()}setInteger1Uniform(Q,J){D.getContext().uniform1i(this.getUniform(Q),J)}setInteger2Uniform(Q,J,$){D.getContext().uniform2i(this.getUniform(Q),J,$)}setInteger3Uniform(Q,J,$,U){D.getContext().uniform3i(this.getUniform(Q),J,$,U)}setFloat1Uniform(Q,J){D.getContext().uniform1f(this.getUniform(Q),J)}setFloat2Uniform(Q,J,$){D.getContext().uniform2f(this.getUniform(Q),J,$)}setFloat3Uniform(Q,J,$,U){D.getContext().uniform3f(this.getUniform(Q),J,$,U)}setMatrix4Uniform(Q,J){D.getContext().uniformMatrix4fv(this.getUniform(Q),!1,J)}_getAttributes(Q){const J=D.getContext();for(let $=0;$<Q.length;++$){const U=J.getAttribLocation(this._program,Q[$]);if(U<0)throw new Error(`attribute not found => ${Q[$]}`);this._attributes.set(Q[$],U)}}_getUniforms(Q){const J=D.getContext();for(let $=0;$<Q.length;++$){const U=J.getUniformLocation(this._program,Q[$]);if(U===null)throw new Error(`uniform not found => ${Q[$]}`);this._uniforms.set(Q[$],U)}}_getShader(Q,J){const $=D.getContext(),U=$.createShader(J);if(!U)throw new Error("could not create a shader");if($.shaderSource(U,Q),$.compileShader(U),!$.getShaderParameter(U,$.COMPILE_STATUS)){let Z=$.getShaderInfoLog(U);if(!Z)Z="failed to compile a shader";throw new Error(Z)}return U}}class e{_width=0;_height=0;_texture=null;initialize(){if(this._texture)throw new Error("texture: already initialized");const Q=D.getContext();this._texture=Q.createTexture()}rawBind(){if(!this._texture)throw new Error("texture: not initialized");const Q=D.getContext();Q.bindTexture(Q.TEXTURE_2D,this._texture)}preBind(Q){this.rawBind(),Q(this)}bind(Q){this.preBind(Q),e.unbind()}static unbind(){const Q=D.getContext();Q.bindTexture(Q.TEXTURE_2D,null)}load(Q){if(!this._texture)throw new Error("texture: not initialized");const J=D.getContext();this._width=Q.width,this._height=Q.height,J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MAG_FILTER,J.NEAREST);const $=0,U=J.RGBA,Z=J.RGBA,N=J.UNSIGNED_BYTE;J.texImage2D(J.TEXTURE_2D,$,U,Z,N,Q)}loadFromMemory(Q,J,$){this._allocate(Q,J,$)}allocate(Q,J){this._allocate(Q,J)}resize(Q,J){this._allocate(Q,J)}_allocate(Q,J,$=null){if(!this._texture)throw new Error("texture: not initialized");const U=D.getContext();this._width=Q,this._height=J,U.texParameteri(U.TEXTURE_2D,U.TEXTURE_WRAP_S,U.CLAMP_TO_EDGE),U.texParameteri(U.TEXTURE_2D,U.TEXTURE_WRAP_T,U.CLAMP_TO_EDGE),U.texParameteri(U.TEXTURE_2D,U.TEXTURE_MIN_FILTER,U.NEAREST),U.texParameteri(U.TEXTURE_2D,U.TEXTURE_MAG_FILTER,U.NEAREST);const Z=0,N=U.RGBA,j=0,H=U.RGBA,O=U.UNSIGNED_BYTE;U.texImage2D(U.TEXTURE_2D,Z,N,Q,J,j,H,O,$)}getWidth(){if(!this._texture)throw new Error("texture not initialized");return this._width}getHeight(){if(!this._texture)throw new Error("texture not initialized");return this._height}getRawObject(){if(!this._texture)throw new Error("texture not initialized");return this._texture}static getImageFromUrl(Q){return new Promise((J,$)=>{const U=new Image;U.onerror=$,U.onload=()=>{J(U)},U.src=Q})}}class q0{_textAreaElement;_lines=[];_maxLines=30;constructor(Q){if(this._textAreaElement=document.getElementById(Q),!this._textAreaElement)throw new Error(`DOM elements not found, id=${Q}`);this._textAreaElement.value=""}log(...Q){if(Q.length===0)return;const J=Array.prototype.slice.call(Q).join(" ");console.log(J),this._pushText(J)}error(...Q){if(Q.length===0)return;const J=Array.prototype.slice.call(Q).join(" ");console.error(J),this._pushText(`[ERR] - ${J}`)}_pushText(Q){if(this._lines.push(Q),this._lines.length>this._maxLines)this._lines.splice(0,this._lines.length-this._maxLines);this._textAreaElement.value=`${this._lines.join("\n")}\n`,this._textAreaElement.scrollTop=this._textAreaElement.scrollHeight}peekLast(){if(this._lines.length>0)return this._lines[this._lines.length-1];return}popLast(){if(this._lines.length>0)this._lines.splice(this._lines.length-1,1)}}class F0{_framesDelta=[];_averageDelta=0;_minDelta=0;_maxDelta=0;pushDelta(Q){if(this._framesDelta.length>=100)this._framesDelta.shift();this._framesDelta.push(Q),this._minDelta=999999999,this._maxDelta=-999999999,this._averageDelta=0;for(let J of this._framesDelta)this._minDelta=Math.min(this._minDelta,J),this._maxDelta=Math.max(this._maxDelta,J),this._averageDelta+=J;this._averageDelta/=this._framesDelta.length}get framesDelta(){return this._framesDelta}get averageDelta(){return this._averageDelta}get minDelta(){return this._minDelta}get maxDelta(){return this._maxDelta}}var g0=(Q,J,$,U,Z,N=!1)=>{const H=Math.ceil($.maxDelta/5)*5;{U.pushOriginBoundRectangle(Q,J,[0,0,0,0.5]);const O=[[Q[0]+J[0]*0,Q[1]+J[1]*0,0],[Q[0]+J[0]*1,Q[1]+J[1]*0,0],[Q[0]+J[0]*1,Q[1]+J[1]*1,0],[Q[0]+J[0]*0,Q[1]+J[1]*1,0]];U.pushLine(O[0],O[1],[1,1,1]),U.pushLine(O[1],O[2],[1,1,1]),U.pushLine(O[2],O[3],[1,1,1]),U.pushLine(O[3],O[0],[1,1,1])}for(let O=5;O<H;O+=5){const Y=O/H,K=[Q[0]+0,Q[1]+J[1]*Y,0],q=[Q[0]+J[0],Q[1]+J[1]*Y,0];U.pushLine(K,q,[0.5,0.5,0.5])}if($.framesDelta.length>=2){const O=J[0]/$.framesDelta.length;let Y=$.framesDelta[0],K=0,q=J[1]*Y/H;for(let I=1;I<$.framesDelta.length;++I){const B=$.framesDelta[I],R=I*O,E=J[1]*B/H,F=[Q[0]+K,Q[1]+q,0],W=[Q[0]+R,Q[1]+E,0];U.pushLine(F,W,[1,1,1]),Y=B,K=R,q=E}}{const{averageDelta:K,maxDelta:q,minDelta:I}=$;let B=`~${K.toFixed(0)}ms`,R=`<${q}ms`,E=`>${I}ms`;if(N===!0){const F=(W)=>W<999?W.toFixed(0):"???";B+=`\n~${F(1000/K)}fps`,R+=`\n<${F(1000/q)}fps`,E+=`\n>${F(1000/I)}fps`}Z.setTextScale(14).setTextAlign("left","top").setTextColor(1,1,0.75).pushText(B,[Q[0]+7,Q[1]-8]).setTextAlign("left","centered").setTextColor(1,0.75,0.75).pushText(R,[Q[0]+J[0]+7,Q[1]+J[1]-7]).setTextColor(0.75,1,0.75).pushText(E,[Q[0]+J[0]+7,Q[1]+7]).setTextColor(1,1,1)}};var v=0.000001,m=typeof Float32Array!=="undefined"?Float32Array:Array,U0=Math.random,C$=Math.PI/180;if(!Math.hypot)Math.hypot=function(){var Q=0,J=arguments.length;while(J--)Q+=arguments[J]*arguments[J];return Math.sqrt(Q)};var p={};K0(p,{transpose:()=>{{return CQ}},translate:()=>{{return xQ}},targetTo:()=>{{return I7}},subtract:()=>{{return n0}},sub:()=>{{return G7}},str:()=>{{return q7}},set:()=>{{return yQ}},scale:()=>{{return dQ}},rotateZ:()=>{{return nQ}},rotateY:()=>{{return lQ}},rotateX:()=>{{return bQ}},rotate:()=>{{return sQ}},perspectiveZO:()=>{{return H7}},perspectiveNO:()=>{{return b0}},perspectiveFromFieldOfView:()=>{{return O7}},perspective:()=>{{return j7}},orthoZO:()=>{{return X7}},orthoNO:()=>{{return l0}},ortho:()=>{{return Y7}},multiplyScalarAndAdd:()=>{{return M7}},multiplyScalar:()=>{{return R7}},multiply:()=>{{return x0}},mul:()=>{{return D7}},lookAt:()=>{{return K7}},invert:()=>{{return mQ}},identity:()=>{{return c0}},getTranslation:()=>{{return Q7}},getScaling:()=>{{return s0}},getRotation:()=>{{return J7}},frustum:()=>{{return N7}},fromZRotation:()=>{{return oQ}},fromYRotation:()=>{{return aQ}},fromXRotation:()=>{{return eQ}},fromValues:()=>{{return kQ}},fromTranslation:()=>{{return iQ}},fromScaling:()=>{{return rQ}},fromRotationTranslationScaleOrigin:()=>{{return U7}},fromRotationTranslationScale:()=>{{return $7}},fromRotationTranslation:()=>{{return d0}},fromRotation:()=>{{return uQ}},fromQuat2:()=>{{return tQ}},fromQuat:()=>{{return Z7}},frob:()=>{{return F7}},exactEquals:()=>{{return E7}},equals:()=>{{return W7}},determinant:()=>{{return cQ}},create:()=>{{return PQ}},copy:()=>{{return zQ}},clone:()=>{{return pQ}},adjoint:()=>{{return gQ}},add:()=>{{return B7}}});function PQ(){var Q=new m(16);if(m!=Float32Array)Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0;return Q[0]=1,Q[5]=1,Q[10]=1,Q[15]=1,Q}function pQ(Q){var J=new m(16);return J[0]=Q[0],J[1]=Q[1],J[2]=Q[2],J[3]=Q[3],J[4]=Q[4],J[5]=Q[5],J[6]=Q[6],J[7]=Q[7],J[8]=Q[8],J[9]=Q[9],J[10]=Q[10],J[11]=Q[11],J[12]=Q[12],J[13]=Q[13],J[14]=Q[14],J[15]=Q[15],J}function zQ(Q,J){return Q[0]=J[0],Q[1]=J[1],Q[2]=J[2],Q[3]=J[3],Q[4]=J[4],Q[5]=J[5],Q[6]=J[6],Q[7]=J[7],Q[8]=J[8],Q[9]=J[9],Q[10]=J[10],Q[11]=J[11],Q[12]=J[12],Q[13]=J[13],Q[14]=J[14],Q[15]=J[15],Q}function kQ(Q,J,$,U,Z,N,j,H,O,Y,K,q,I,B,R,E){var F=new m(16);return F[0]=Q,F[1]=J,F[2]=$,F[3]=U,F[4]=Z,F[5]=N,F[6]=j,F[7]=H,F[8]=O,F[9]=Y,F[10]=K,F[11]=q,F[12]=I,F[13]=B,F[14]=R,F[15]=E,F}function yQ(Q,J,$,U,Z,N,j,H,O,Y,K,q,I,B,R,E,F){return Q[0]=J,Q[1]=$,Q[2]=U,Q[3]=Z,Q[4]=N,Q[5]=j,Q[6]=H,Q[7]=O,Q[8]=Y,Q[9]=K,Q[10]=q,Q[11]=I,Q[12]=B,Q[13]=R,Q[14]=E,Q[15]=F,Q}function c0(Q){return Q[0]=1,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=1,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=1,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function CQ(Q,J){if(Q===J){var $=J[1],U=J[2],Z=J[3],N=J[6],j=J[7],H=J[11];Q[1]=J[4],Q[2]=J[8],Q[3]=J[12],Q[4]=$,Q[6]=J[9],Q[7]=J[13],Q[8]=U,Q[9]=N,Q[11]=J[14],Q[12]=Z,Q[13]=j,Q[14]=H}else Q[0]=J[0],Q[1]=J[4],Q[2]=J[8],Q[3]=J[12],Q[4]=J[1],Q[5]=J[5],Q[6]=J[9],Q[7]=J[13],Q[8]=J[2],Q[9]=J[6],Q[10]=J[10],Q[11]=J[14],Q[12]=J[3],Q[13]=J[7],Q[14]=J[11],Q[15]=J[15];return Q}function mQ(Q,J){var $=J[0],U=J[1],Z=J[2],N=J[3],j=J[4],H=J[5],O=J[6],Y=J[7],K=J[8],q=J[9],I=J[10],B=J[11],R=J[12],E=J[13],F=J[14],W=J[15],A=$*H-U*j,L=$*O-Z*j,w=$*Y-N*j,V=U*O-Z*H,G=U*Y-N*H,T=Z*Y-N*O,S=K*E-q*R,f=K*F-I*R,h=K*W-B*R,z=q*F-I*E,k=q*W-B*E,y=I*W-B*F,_=A*y-L*k+w*z+V*h-G*f+T*S;if(!_)return null;return _=1/_,Q[0]=(H*y-O*k+Y*z)*_,Q[1]=(Z*k-U*y-N*z)*_,Q[2]=(E*T-F*G+W*V)*_,Q[3]=(I*G-q*T-B*V)*_,Q[4]=(O*h-j*y-Y*f)*_,Q[5]=($*y-Z*h+N*f)*_,Q[6]=(F*w-R*T-W*L)*_,Q[7]=(K*T-I*w+B*L)*_,Q[8]=(j*k-H*h+Y*S)*_,Q[9]=(U*h-$*k-N*S)*_,Q[10]=(R*G-E*w+W*A)*_,Q[11]=(q*w-K*G-B*A)*_,Q[12]=(H*f-j*z-O*S)*_,Q[13]=($*z-U*f+Z*S)*_,Q[14]=(E*L-R*V-F*A)*_,Q[15]=(K*V-q*L+I*A)*_,Q}function gQ(Q,J){var $=J[0],U=J[1],Z=J[2],N=J[3],j=J[4],H=J[5],O=J[6],Y=J[7],K=J[8],q=J[9],I=J[10],B=J[11],R=J[12],E=J[13],F=J[14],W=J[15];return Q[0]=H*(I*W-B*F)-q*(O*W-Y*F)+E*(O*B-Y*I),Q[1]=-(U*(I*W-B*F)-q*(Z*W-N*F)+E*(Z*B-N*I)),Q[2]=U*(O*W-Y*F)-H*(Z*W-N*F)+E*(Z*Y-N*O),Q[3]=-(U*(O*B-Y*I)-H*(Z*B-N*I)+q*(Z*Y-N*O)),Q[4]=-(j*(I*W-B*F)-K*(O*W-Y*F)+R*(O*B-Y*I)),Q[5]=$*(I*W-B*F)-K*(Z*W-N*F)+R*(Z*B-N*I),Q[6]=-($*(O*W-Y*F)-j*(Z*W-N*F)+R*(Z*Y-N*O)),Q[7]=$*(O*B-Y*I)-j*(Z*B-N*I)+K*(Z*Y-N*O),Q[8]=j*(q*W-B*E)-K*(H*W-Y*E)+R*(H*B-Y*q),Q[9]=-($*(q*W-B*E)-K*(U*W-N*E)+R*(U*B-N*q)),Q[10]=$*(H*W-Y*E)-j*(U*W-N*E)+R*(U*Y-N*H),Q[11]=-($*(H*B-Y*q)-j*(U*B-N*q)+K*(U*Y-N*H)),Q[12]=-(j*(q*F-I*E)-K*(H*F-O*E)+R*(H*I-O*q)),Q[13]=$*(q*F-I*E)-K*(U*F-Z*E)+R*(U*I-Z*q),Q[14]=-($*(H*F-O*E)-j*(U*F-Z*E)+R*(U*O-Z*H)),Q[15]=$*(H*I-O*q)-j*(U*I-Z*q)+K*(U*O-Z*H),Q}function cQ(Q){var J=Q[0],$=Q[1],U=Q[2],Z=Q[3],N=Q[4],j=Q[5],H=Q[6],O=Q[7],Y=Q[8],K=Q[9],q=Q[10],I=Q[11],B=Q[12],R=Q[13],E=Q[14],F=Q[15],W=J*j-$*N,A=J*H-U*N,L=J*O-Z*N,w=$*H-U*j,V=$*O-Z*j,G=U*O-Z*H,T=Y*R-K*B,S=Y*E-q*B,f=Y*F-I*B,h=K*E-q*R,z=K*F-I*R,k=q*F-I*E;return W*k-A*z+L*h+w*f-V*S+G*T}function x0(Q,J,$){var U=J[0],Z=J[1],N=J[2],j=J[3],H=J[4],O=J[5],Y=J[6],K=J[7],q=J[8],I=J[9],B=J[10],R=J[11],E=J[12],F=J[13],W=J[14],A=J[15],L=$[0],w=$[1],V=$[2],G=$[3];return Q[0]=L*U+w*H+V*q+G*E,Q[1]=L*Z+w*O+V*I+G*F,Q[2]=L*N+w*Y+V*B+G*W,Q[3]=L*j+w*K+V*R+G*A,L=$[4],w=$[5],V=$[6],G=$[7],Q[4]=L*U+w*H+V*q+G*E,Q[5]=L*Z+w*O+V*I+G*F,Q[6]=L*N+w*Y+V*B+G*W,Q[7]=L*j+w*K+V*R+G*A,L=$[8],w=$[9],V=$[10],G=$[11],Q[8]=L*U+w*H+V*q+G*E,Q[9]=L*Z+w*O+V*I+G*F,Q[10]=L*N+w*Y+V*B+G*W,Q[11]=L*j+w*K+V*R+G*A,L=$[12],w=$[13],V=$[14],G=$[15],Q[12]=L*U+w*H+V*q+G*E,Q[13]=L*Z+w*O+V*I+G*F,Q[14]=L*N+w*Y+V*B+G*W,Q[15]=L*j+w*K+V*R+G*A,Q}function xQ(Q,J,$){var U=$[0],Z=$[1],N=$[2],j,H,O,Y,K,q,I,B,R,E,F,W;if(J===Q)Q[12]=J[0]*U+J[4]*Z+J[8]*N+J[12],Q[13]=J[1]*U+J[5]*Z+J[9]*N+J[13],Q[14]=J[2]*U+J[6]*Z+J[10]*N+J[14],Q[15]=J[3]*U+J[7]*Z+J[11]*N+J[15];else j=J[0],H=J[1],O=J[2],Y=J[3],K=J[4],q=J[5],I=J[6],B=J[7],R=J[8],E=J[9],F=J[10],W=J[11],Q[0]=j,Q[1]=H,Q[2]=O,Q[3]=Y,Q[4]=K,Q[5]=q,Q[6]=I,Q[7]=B,Q[8]=R,Q[9]=E,Q[10]=F,Q[11]=W,Q[12]=j*U+K*Z+R*N+J[12],Q[13]=H*U+q*Z+E*N+J[13],Q[14]=O*U+I*Z+F*N+J[14],Q[15]=Y*U+B*Z+W*N+J[15];return Q}function dQ(Q,J,$){var U=$[0],Z=$[1],N=$[2];return Q[0]=J[0]*U,Q[1]=J[1]*U,Q[2]=J[2]*U,Q[3]=J[3]*U,Q[4]=J[4]*Z,Q[5]=J[5]*Z,Q[6]=J[6]*Z,Q[7]=J[7]*Z,Q[8]=J[8]*N,Q[9]=J[9]*N,Q[10]=J[10]*N,Q[11]=J[11]*N,Q[12]=J[12],Q[13]=J[13],Q[14]=J[14],Q[15]=J[15],Q}function sQ(Q,J,$,U){var Z=U[0],N=U[1],j=U[2],H=Math.hypot(Z,N,j),O,Y,K,q,I,B,R,E,F,W,A,L,w,V,G,T,S,f,h,z,k,y,_,x;if(H<v)return null;if(H=1/H,Z*=H,N*=H,j*=H,O=Math.sin($),Y=Math.cos($),K=1-Y,q=J[0],I=J[1],B=J[2],R=J[3],E=J[4],F=J[5],W=J[6],A=J[7],L=J[8],w=J[9],V=J[10],G=J[11],T=Z*Z*K+Y,S=N*Z*K+j*O,f=j*Z*K-N*O,h=Z*N*K-j*O,z=N*N*K+Y,k=j*N*K+Z*O,y=Z*j*K+N*O,_=N*j*K-Z*O,x=j*j*K+Y,Q[0]=q*T+E*S+L*f,Q[1]=I*T+F*S+w*f,Q[2]=B*T+W*S+V*f,Q[3]=R*T+A*S+G*f,Q[4]=q*h+E*z+L*k,Q[5]=I*h+F*z+w*k,Q[6]=B*h+W*z+V*k,Q[7]=R*h+A*z+G*k,Q[8]=q*y+E*_+L*x,Q[9]=I*y+F*_+w*x,Q[10]=B*y+W*_+V*x,Q[11]=R*y+A*_+G*x,J!==Q)Q[12]=J[12],Q[13]=J[13],Q[14]=J[14],Q[15]=J[15];return Q}function bQ(Q,J,$){var U=Math.sin($),Z=Math.cos($),N=J[4],j=J[5],H=J[6],O=J[7],Y=J[8],K=J[9],q=J[10],I=J[11];if(J!==Q)Q[0]=J[0],Q[1]=J[1],Q[2]=J[2],Q[3]=J[3],Q[12]=J[12],Q[13]=J[13],Q[14]=J[14],Q[15]=J[15];return Q[4]=N*Z+Y*U,Q[5]=j*Z+K*U,Q[6]=H*Z+q*U,Q[7]=O*Z+I*U,Q[8]=Y*Z-N*U,Q[9]=K*Z-j*U,Q[10]=q*Z-H*U,Q[11]=I*Z-O*U,Q}function lQ(Q,J,$){var U=Math.sin($),Z=Math.cos($),N=J[0],j=J[1],H=J[2],O=J[3],Y=J[8],K=J[9],q=J[10],I=J[11];if(J!==Q)Q[4]=J[4],Q[5]=J[5],Q[6]=J[6],Q[7]=J[7],Q[12]=J[12],Q[13]=J[13],Q[14]=J[14],Q[15]=J[15];return Q[0]=N*Z-Y*U,Q[1]=j*Z-K*U,Q[2]=H*Z-q*U,Q[3]=O*Z-I*U,Q[8]=N*U+Y*Z,Q[9]=j*U+K*Z,Q[10]=H*U+q*Z,Q[11]=O*U+I*Z,Q}function nQ(Q,J,$){var U=Math.sin($),Z=Math.cos($),N=J[0],j=J[1],H=J[2],O=J[3],Y=J[4],K=J[5],q=J[6],I=J[7];if(J!==Q)Q[8]=J[8],Q[9]=J[9],Q[10]=J[10],Q[11]=J[11],Q[12]=J[12],Q[13]=J[13],Q[14]=J[14],Q[15]=J[15];return Q[0]=N*Z+Y*U,Q[1]=j*Z+K*U,Q[2]=H*Z+q*U,Q[3]=O*Z+I*U,Q[4]=Y*Z-N*U,Q[5]=K*Z-j*U,Q[6]=q*Z-H*U,Q[7]=I*Z-O*U,Q}function iQ(Q,J){return Q[0]=1,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=1,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=1,Q[11]=0,Q[12]=J[0],Q[13]=J[1],Q[14]=J[2],Q[15]=1,Q}function rQ(Q,J){return Q[0]=J[0],Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=J[1],Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=J[2],Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function uQ(Q,J,$){var U=$[0],Z=$[1],N=$[2],j=Math.hypot(U,Z,N),H,O,Y;if(j<v)return null;return j=1/j,U*=j,Z*=j,N*=j,H=Math.sin(J),O=Math.cos(J),Y=1-O,Q[0]=U*U*Y+O,Q[1]=Z*U*Y+N*H,Q[2]=N*U*Y-Z*H,Q[3]=0,Q[4]=U*Z*Y-N*H,Q[5]=Z*Z*Y+O,Q[6]=N*Z*Y+U*H,Q[7]=0,Q[8]=U*N*Y+Z*H,Q[9]=Z*N*Y-U*H,Q[10]=N*N*Y+O,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function eQ(Q,J){var $=Math.sin(J),U=Math.cos(J);return Q[0]=1,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=U,Q[6]=$,Q[7]=0,Q[8]=0,Q[9]=-$,Q[10]=U,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function aQ(Q,J){var $=Math.sin(J),U=Math.cos(J);return Q[0]=U,Q[1]=0,Q[2]=-$,Q[3]=0,Q[4]=0,Q[5]=1,Q[6]=0,Q[7]=0,Q[8]=$,Q[9]=0,Q[10]=U,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function oQ(Q,J){var $=Math.sin(J),U=Math.cos(J);return Q[0]=U,Q[1]=$,Q[2]=0,Q[3]=0,Q[4]=-$,Q[5]=U,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=1,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function d0(Q,J,$){var U=J[0],Z=J[1],N=J[2],j=J[3],H=U+U,O=Z+Z,Y=N+N,K=U*H,q=U*O,I=U*Y,B=Z*O,R=Z*Y,E=N*Y,F=j*H,W=j*O,A=j*Y;return Q[0]=1-(B+E),Q[1]=q+A,Q[2]=I-W,Q[3]=0,Q[4]=q-A,Q[5]=1-(K+E),Q[6]=R+F,Q[7]=0,Q[8]=I+W,Q[9]=R-F,Q[10]=1-(K+B),Q[11]=0,Q[12]=$[0],Q[13]=$[1],Q[14]=$[2],Q[15]=1,Q}function tQ(Q,J){var $=new m(3),U=-J[0],Z=-J[1],N=-J[2],j=J[3],H=J[4],O=J[5],Y=J[6],K=J[7],q=U*U+Z*Z+N*N+j*j;if(q>0)$[0]=(H*j+K*U+O*N-Y*Z)*2/q,$[1]=(O*j+K*Z+Y*U-H*N)*2/q,$[2]=(Y*j+K*N+H*Z-O*U)*2/q;else $[0]=(H*j+K*U+O*N-Y*Z)*2,$[1]=(O*j+K*Z+Y*U-H*N)*2,$[2]=(Y*j+K*N+H*Z-O*U)*2;return d0(Q,J,$),Q}function Q7(Q,J){return Q[0]=J[12],Q[1]=J[13],Q[2]=J[14],Q}function s0(Q,J){var $=J[0],U=J[1],Z=J[2],N=J[4],j=J[5],H=J[6],O=J[8],Y=J[9],K=J[10];return Q[0]=Math.hypot($,U,Z),Q[1]=Math.hypot(N,j,H),Q[2]=Math.hypot(O,Y,K),Q}function J7(Q,J){var $=new m(3);s0($,J);var U=1/$[0],Z=1/$[1],N=1/$[2],j=J[0]*U,H=J[1]*Z,O=J[2]*N,Y=J[4]*U,K=J[5]*Z,q=J[6]*N,I=J[8]*U,B=J[9]*Z,R=J[10]*N,E=j+K+R,F=0;if(E>0)F=Math.sqrt(E+1)*2,Q[3]=0.25*F,Q[0]=(q-B)/F,Q[1]=(I-O)/F,Q[2]=(H-Y)/F;else if(j>K&&j>R)F=Math.sqrt(1+j-K-R)*2,Q[3]=(q-B)/F,Q[0]=0.25*F,Q[1]=(H+Y)/F,Q[2]=(I+O)/F;else if(K>R)F=Math.sqrt(1+K-j-R)*2,Q[3]=(I-O)/F,Q[0]=(H+Y)/F,Q[1]=0.25*F,Q[2]=(q+B)/F;else F=Math.sqrt(1+R-j-K)*2,Q[3]=(H-Y)/F,Q[0]=(I+O)/F,Q[1]=(q+B)/F,Q[2]=0.25*F;return Q}function $7(Q,J,$,U){var Z=J[0],N=J[1],j=J[2],H=J[3],O=Z+Z,Y=N+N,K=j+j,q=Z*O,I=Z*Y,B=Z*K,R=N*Y,E=N*K,F=j*K,W=H*O,A=H*Y,L=H*K,w=U[0],V=U[1],G=U[2];return Q[0]=(1-(R+F))*w,Q[1]=(I+L)*w,Q[2]=(B-A)*w,Q[3]=0,Q[4]=(I-L)*V,Q[5]=(1-(q+F))*V,Q[6]=(E+W)*V,Q[7]=0,Q[8]=(B+A)*G,Q[9]=(E-W)*G,Q[10]=(1-(q+R))*G,Q[11]=0,Q[12]=$[0],Q[13]=$[1],Q[14]=$[2],Q[15]=1,Q}function U7(Q,J,$,U,Z){var N=J[0],j=J[1],H=J[2],O=J[3],Y=N+N,K=j+j,q=H+H,I=N*Y,B=N*K,R=N*q,E=j*K,F=j*q,W=H*q,A=O*Y,L=O*K,w=O*q,V=U[0],G=U[1],T=U[2],S=Z[0],f=Z[1],h=Z[2],z=(1-(E+W))*V,k=(B+w)*V,y=(R-L)*V,_=(B-w)*G,x=(1-(I+W))*G,Q0=(F+A)*G,J0=(R+L)*T,v0=(F-A)*T,T0=(1-(I+E))*T;return Q[0]=z,Q[1]=k,Q[2]=y,Q[3]=0,Q[4]=_,Q[5]=x,Q[6]=Q0,Q[7]=0,Q[8]=J0,Q[9]=v0,Q[10]=T0,Q[11]=0,Q[12]=$[0]+S-(z*S+_*f+J0*h),Q[13]=$[1]+f-(k*S+x*f+v0*h),Q[14]=$[2]+h-(y*S+Q0*f+T0*h),Q[15]=1,Q}function Z7(Q,J){var $=J[0],U=J[1],Z=J[2],N=J[3],j=$+$,H=U+U,O=Z+Z,Y=$*j,K=U*j,q=U*H,I=Z*j,B=Z*H,R=Z*O,E=N*j,F=N*H,W=N*O;return Q[0]=1-q-R,Q[1]=K+W,Q[2]=I-F,Q[3]=0,Q[4]=K-W,Q[5]=1-Y-R,Q[6]=B+E,Q[7]=0,Q[8]=I+F,Q[9]=B-E,Q[10]=1-Y-q,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,Q}function N7(Q,J,$,U,Z,N,j){var H=1/($-J),O=1/(Z-U),Y=1/(N-j);return Q[0]=N*2*H,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=N*2*O,Q[6]=0,Q[7]=0,Q[8]=($+J)*H,Q[9]=(Z+U)*O,Q[10]=(j+N)*Y,Q[11]=-1,Q[12]=0,Q[13]=0,Q[14]=j*N*2*Y,Q[15]=0,Q}function b0(Q,J,$,U,Z){var N=1/Math.tan(J/2),j;if(Q[0]=N/$,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=N,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[11]=-1,Q[12]=0,Q[13]=0,Q[15]=0,Z!=null&&Z!==Infinity)j=1/(U-Z),Q[10]=(Z+U)*j,Q[14]=2*Z*U*j;else Q[10]=-1,Q[14]=-2*U;return Q}function H7(Q,J,$,U,Z){var N=1/Math.tan(J/2),j;if(Q[0]=N/$,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=N,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[11]=-1,Q[12]=0,Q[13]=0,Q[15]=0,Z!=null&&Z!==Infinity)j=1/(U-Z),Q[10]=Z*j,Q[14]=Z*U*j;else Q[10]=-1,Q[14]=-U;return Q}function O7(Q,J,$,U){var Z=Math.tan(J.upDegrees*Math.PI/180),N=Math.tan(J.downDegrees*Math.PI/180),j=Math.tan(J.leftDegrees*Math.PI/180),H=Math.tan(J.rightDegrees*Math.PI/180),O=2/(j+H),Y=2/(Z+N);return Q[0]=O,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=Y,Q[6]=0,Q[7]=0,Q[8]=-((j-H)*O*0.5),Q[9]=(Z-N)*Y*0.5,Q[10]=U/($-U),Q[11]=-1,Q[12]=0,Q[13]=0,Q[14]=U*$/($-U),Q[15]=0,Q}function l0(Q,J,$,U,Z,N,j){var H=1/(J-$),O=1/(U-Z),Y=1/(N-j);return Q[0]=-2*H,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=-2*O,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=2*Y,Q[11]=0,Q[12]=(J+$)*H,Q[13]=(Z+U)*O,Q[14]=(j+N)*Y,Q[15]=1,Q}function X7(Q,J,$,U,Z,N,j){var H=1/(J-$),O=1/(U-Z),Y=1/(N-j);return Q[0]=-2*H,Q[1]=0,Q[2]=0,Q[3]=0,Q[4]=0,Q[5]=-2*O,Q[6]=0,Q[7]=0,Q[8]=0,Q[9]=0,Q[10]=Y,Q[11]=0,Q[12]=(J+$)*H,Q[13]=(Z+U)*O,Q[14]=N*Y,Q[15]=1,Q}function K7(Q,J,$,U){var Z,N,j,H,O,Y,K,q,I,B,R=J[0],E=J[1],F=J[2],W=U[0],A=U[1],L=U[2],w=$[0],V=$[1],G=$[2];if(Math.abs(R-w)<v&&Math.abs(E-V)<v&&Math.abs(F-G)<v)return c0(Q);if(K=R-w,q=E-V,I=F-G,B=1/Math.hypot(K,q,I),K*=B,q*=B,I*=B,Z=A*I-L*q,N=L*K-W*I,j=W*q-A*K,B=Math.hypot(Z,N,j),!B)Z=0,N=0,j=0;else B=1/B,Z*=B,N*=B,j*=B;if(H=q*j-I*N,O=I*Z-K*j,Y=K*N-q*Z,B=Math.hypot(H,O,Y),!B)H=0,O=0,Y=0;else B=1/B,H*=B,O*=B,Y*=B;return Q[0]=Z,Q[1]=H,Q[2]=K,Q[3]=0,Q[4]=N,Q[5]=O,Q[6]=q,Q[7]=0,Q[8]=j,Q[9]=Y,Q[10]=I,Q[11]=0,Q[12]=-(Z*R+N*E+j*F),Q[13]=-(H*R+O*E+Y*F),Q[14]=-(K*R+q*E+I*F),Q[15]=1,Q}function I7(Q,J,$,U){var Z=J[0],N=J[1],j=J[2],H=U[0],O=U[1],Y=U[2],K=Z-$[0],q=N-$[1],I=j-$[2],B=K*K+q*q+I*I;if(B>0)B=1/Math.sqrt(B),K*=B,q*=B,I*=B;var R=O*I-Y*q,E=Y*K-H*I,F=H*q-O*K;if(B=R*R+E*E+F*F,B>0)B=1/Math.sqrt(B),R*=B,E*=B,F*=B;return Q[0]=R,Q[1]=E,Q[2]=F,Q[3]=0,Q[4]=q*F-I*E,Q[5]=I*R-K*F,Q[6]=K*E-q*R,Q[7]=0,Q[8]=K,Q[9]=q,Q[10]=I,Q[11]=0,Q[12]=Z,Q[13]=N,Q[14]=j,Q[15]=1,Q}function q7(Q){return"mat4("+Q[0]+", "+Q[1]+", "+Q[2]+", "+Q[3]+", "+Q[4]+", "+Q[5]+", "+Q[6]+", "+Q[7]+", "+Q[8]+", "+Q[9]+", "+Q[10]+", "+Q[11]+", "+Q[12]+", "+Q[13]+", "+Q[14]+", "+Q[15]+")"}function F7(Q){return Math.hypot(Q[0],Q[1],Q[2],Q[3],Q[4],Q[5],Q[6],Q[7],Q[8],Q[9],Q[10],Q[11],Q[12],Q[13],Q[14],Q[15])}function B7(Q,J,$){return Q[0]=J[0]+$[0],Q[1]=J[1]+$[1],Q[2]=J[2]+$[2],Q[3]=J[3]+$[3],Q[4]=J[4]+$[4],Q[5]=J[5]+$[5],Q[6]=J[6]+$[6],Q[7]=J[7]+$[7],Q[8]=J[8]+$[8],Q[9]=J[9]+$[9],Q[10]=J[10]+$[10],Q[11]=J[11]+$[11],Q[12]=J[12]+$[12],Q[13]=J[13]+$[13],Q[14]=J[14]+$[14],Q[15]=J[15]+$[15],Q}function n0(Q,J,$){return Q[0]=J[0]-$[0],Q[1]=J[1]-$[1],Q[2]=J[2]-$[2],Q[3]=J[3]-$[3],Q[4]=J[4]-$[4],Q[5]=J[5]-$[5],Q[6]=J[6]-$[6],Q[7]=J[7]-$[7],Q[8]=J[8]-$[8],Q[9]=J[9]-$[9],Q[10]=J[10]-$[10],Q[11]=J[11]-$[11],Q[12]=J[12]-$[12],Q[13]=J[13]-$[13],Q[14]=J[14]-$[14],Q[15]=J[15]-$[15],Q}function R7(Q,J,$){return Q[0]=J[0]*$,Q[1]=J[1]*$,Q[2]=J[2]*$,Q[3]=J[3]*$,Q[4]=J[4]*$,Q[5]=J[5]*$,Q[6]=J[6]*$,Q[7]=J[7]*$,Q[8]=J[8]*$,Q[9]=J[9]*$,Q[10]=J[10]*$,Q[11]=J[11]*$,Q[12]=J[12]*$,Q[13]=J[13]*$,Q[14]=J[14]*$,Q[15]=J[15]*$,Q}function M7(Q,J,$,U){return Q[0]=J[0]+$[0]*U,Q[1]=J[1]+$[1]*U,Q[2]=J[2]+$[2]*U,Q[3]=J[3]+$[3]*U,Q[4]=J[4]+$[4]*U,Q[5]=J[5]+$[5]*U,Q[6]=J[6]+$[6]*U,Q[7]=J[7]+$[7]*U,Q[8]=J[8]+$[8]*U,Q[9]=J[9]+$[9]*U,Q[10]=J[10]+$[10]*U,Q[11]=J[11]+$[11]*U,Q[12]=J[12]+$[12]*U,Q[13]=J[13]+$[13]*U,Q[14]=J[14]+$[14]*U,Q[15]=J[15]+$[15]*U,Q}function E7(Q,J){return Q[0]===J[0]&&Q[1]===J[1]&&Q[2]===J[2]&&Q[3]===J[3]&&Q[4]===J[4]&&Q[5]===J[5]&&Q[6]===J[6]&&Q[7]===J[7]&&Q[8]===J[8]&&Q[9]===J[9]&&Q[10]===J[10]&&Q[11]===J[11]&&Q[12]===J[12]&&Q[13]===J[13]&&Q[14]===J[14]&&Q[15]===J[15]}function W7(Q,J){var $=Q[0],U=Q[1],Z=Q[2],N=Q[3],j=Q[4],H=Q[5],O=Q[6],Y=Q[7],K=Q[8],q=Q[9],I=Q[10],B=Q[11],R=Q[12],E=Q[13],F=Q[14],W=Q[15],A=J[0],L=J[1],w=J[2],V=J[3],G=J[4],T=J[5],S=J[6],f=J[7],h=J[8],z=J[9],k=J[10],y=J[11],_=J[12],x=J[13],Q0=J[14],J0=J[15];return Math.abs($-A)<=v*Math.max(1,Math.abs($),Math.abs(A))&&Math.abs(U-L)<=v*Math.max(1,Math.abs(U),Math.abs(L))&&Math.abs(Z-w)<=v*Math.max(1,Math.abs(Z),Math.abs(w))&&Math.abs(N-V)<=v*Math.max(1,Math.abs(N),Math.abs(V))&&Math.abs(j-G)<=v*Math.max(1,Math.abs(j),Math.abs(G))&&Math.abs(H-T)<=v*Math.max(1,Math.abs(H),Math.abs(T))&&Math.abs(O-S)<=v*Math.max(1,Math.abs(O),Math.abs(S))&&Math.abs(Y-f)<=v*Math.max(1,Math.abs(Y),Math.abs(f))&&Math.abs(K-h)<=v*Math.max(1,Math.abs(K),Math.abs(h))&&Math.abs(q-z)<=v*Math.max(1,Math.abs(q),Math.abs(z))&&Math.abs(I-k)<=v*Math.max(1,Math.abs(I),Math.abs(k))&&Math.abs(B-y)<=v*Math.max(1,Math.abs(B),Math.abs(y))&&Math.abs(R-_)<=v*Math.max(1,Math.abs(R),Math.abs(_))&&Math.abs(E-x)<=v*Math.max(1,Math.abs(E),Math.abs(x))&&Math.abs(F-Q0)<=v*Math.max(1,Math.abs(F),Math.abs(Q0))&&Math.abs(W-J0)<=v*Math.max(1,Math.abs(W),Math.abs(J0))}var j7=b0,Y7=l0,D7=x0,G7=n0;var M={};K0(M,{zero:()=>{{return u7}},transformQuat:()=>{{return b7}},transformMat4:()=>{{return d7}},transformMat3:()=>{{return s7}},subtract:()=>{{return u0}},sub:()=>{{return t7}},str:()=>{{return e7}},squaredLength:()=>{{return QQ}},squaredDistance:()=>{{return t0}},sqrLen:()=>{{return NJ}},sqrDist:()=>{{return UJ}},set:()=>{{return A7}},scaleAndAdd:()=>{{return p7}},scale:()=>{{return P7}},round:()=>{{return h7}},rotateZ:()=>{{return i7}},rotateY:()=>{{return n7}},rotateX:()=>{{return l7}},random:()=>{{return x7}},normalize:()=>{{return y7}},negate:()=>{{return z7}},multiply:()=>{{return e0}},mul:()=>{{return QJ}},min:()=>{{return f7}},max:()=>{{return S7}},lerp:()=>{{return m7}},length:()=>{{return r0}},len:()=>{{return ZJ}},inverse:()=>{{return k7}},hermite:()=>{{return g7}},fromValues:()=>{{return V7}},forEach:()=>{{return jJ}},floor:()=>{{return T7}},exactEquals:()=>{{return a7}},equals:()=>{{return o7}},dot:()=>{{return JQ}},divide:()=>{{return a0}},div:()=>{{return JJ}},distance:()=>{{return o0}},dist:()=>{{return $J}},cross:()=>{{return C7}},create:()=>{{return i0}},copy:()=>{{return w7}},clone:()=>{{return L7}},ceil:()=>{{return v7}},bezier:()=>{{return c7}},angle:()=>{{return r7}},add:()=>{{return _7}}});function i0(){var Q=new m(3);if(m!=Float32Array)Q[0]=0,Q[1]=0,Q[2]=0;return Q}function L7(Q){var J=new m(3);return J[0]=Q[0],J[1]=Q[1],J[2]=Q[2],J}function r0(Q){var J=Q[0],$=Q[1],U=Q[2];return Math.hypot(J,$,U)}function V7(Q,J,$){var U=new m(3);return U[0]=Q,U[1]=J,U[2]=$,U}function w7(Q,J){return Q[0]=J[0],Q[1]=J[1],Q[2]=J[2],Q}function A7(Q,J,$,U){return Q[0]=J,Q[1]=$,Q[2]=U,Q}function _7(Q,J,$){return Q[0]=J[0]+$[0],Q[1]=J[1]+$[1],Q[2]=J[2]+$[2],Q}function u0(Q,J,$){return Q[0]=J[0]-$[0],Q[1]=J[1]-$[1],Q[2]=J[2]-$[2],Q}function e0(Q,J,$){return Q[0]=J[0]*$[0],Q[1]=J[1]*$[1],Q[2]=J[2]*$[2],Q}function a0(Q,J,$){return Q[0]=J[0]/$[0],Q[1]=J[1]/$[1],Q[2]=J[2]/$[2],Q}function v7(Q,J){return Q[0]=Math.ceil(J[0]),Q[1]=Math.ceil(J[1]),Q[2]=Math.ceil(J[2]),Q}function T7(Q,J){return Q[0]=Math.floor(J[0]),Q[1]=Math.floor(J[1]),Q[2]=Math.floor(J[2]),Q}function f7(Q,J,$){return Q[0]=Math.min(J[0],$[0]),Q[1]=Math.min(J[1],$[1]),Q[2]=Math.min(J[2],$[2]),Q}function S7(Q,J,$){return Q[0]=Math.max(J[0],$[0]),Q[1]=Math.max(J[1],$[1]),Q[2]=Math.max(J[2],$[2]),Q}function h7(Q,J){return Q[0]=Math.round(J[0]),Q[1]=Math.round(J[1]),Q[2]=Math.round(J[2]),Q}function P7(Q,J,$){return Q[0]=J[0]*$,Q[1]=J[1]*$,Q[2]=J[2]*$,Q}function p7(Q,J,$,U){return Q[0]=J[0]+$[0]*U,Q[1]=J[1]+$[1]*U,Q[2]=J[2]+$[2]*U,Q}function o0(Q,J){var $=J[0]-Q[0],U=J[1]-Q[1],Z=J[2]-Q[2];return Math.hypot($,U,Z)}function t0(Q,J){var $=J[0]-Q[0],U=J[1]-Q[1],Z=J[2]-Q[2];return $*$+U*U+Z*Z}function QQ(Q){var J=Q[0],$=Q[1],U=Q[2];return J*J+$*$+U*U}function z7(Q,J){return Q[0]=-J[0],Q[1]=-J[1],Q[2]=-J[2],Q}function k7(Q,J){return Q[0]=1/J[0],Q[1]=1/J[1],Q[2]=1/J[2],Q}function y7(Q,J){var $=J[0],U=J[1],Z=J[2],N=$*$+U*U+Z*Z;if(N>0)N=1/Math.sqrt(N);return Q[0]=J[0]*N,Q[1]=J[1]*N,Q[2]=J[2]*N,Q}function JQ(Q,J){return Q[0]*J[0]+Q[1]*J[1]+Q[2]*J[2]}function C7(Q,J,$){var U=J[0],Z=J[1],N=J[2],j=$[0],H=$[1],O=$[2];return Q[0]=Z*O-N*H,Q[1]=N*j-U*O,Q[2]=U*H-Z*j,Q}function m7(Q,J,$,U){var Z=J[0],N=J[1],j=J[2];return Q[0]=Z+U*($[0]-Z),Q[1]=N+U*($[1]-N),Q[2]=j+U*($[2]-j),Q}function g7(Q,J,$,U,Z,N){var j=N*N,H=j*(2*N-3)+1,O=j*(N-2)+N,Y=j*(N-1),K=j*(3-2*N);return Q[0]=J[0]*H+$[0]*O+U[0]*Y+Z[0]*K,Q[1]=J[1]*H+$[1]*O+U[1]*Y+Z[1]*K,Q[2]=J[2]*H+$[2]*O+U[2]*Y+Z[2]*K,Q}function c7(Q,J,$,U,Z,N){var j=1-N,H=j*j,O=N*N,Y=H*j,K=3*N*H,q=3*O*j,I=O*N;return Q[0]=J[0]*Y+$[0]*K+U[0]*q+Z[0]*I,Q[1]=J[1]*Y+$[1]*K+U[1]*q+Z[1]*I,Q[2]=J[2]*Y+$[2]*K+U[2]*q+Z[2]*I,Q}function x7(Q,J){J=J||1;var $=U0()*2*Math.PI,U=U0()*2-1,Z=Math.sqrt(1-U*U)*J;return Q[0]=Math.cos($)*Z,Q[1]=Math.sin($)*Z,Q[2]=U*J,Q}function d7(Q,J,$){var U=J[0],Z=J[1],N=J[2],j=$[3]*U+$[7]*Z+$[11]*N+$[15];return j=j||1,Q[0]=($[0]*U+$[4]*Z+$[8]*N+$[12])/j,Q[1]=($[1]*U+$[5]*Z+$[9]*N+$[13])/j,Q[2]=($[2]*U+$[6]*Z+$[10]*N+$[14])/j,Q}function s7(Q,J,$){var U=J[0],Z=J[1],N=J[2];return Q[0]=U*$[0]+Z*$[3]+N*$[6],Q[1]=U*$[1]+Z*$[4]+N*$[7],Q[2]=U*$[2]+Z*$[5]+N*$[8],Q}function b7(Q,J,$){var U=$[0],Z=$[1],N=$[2],j=$[3],H=J[0],O=J[1],Y=J[2],K=Z*Y-N*O,q=N*H-U*Y,I=U*O-Z*H,B=Z*I-N*q,R=N*K-U*I,E=U*q-Z*K,F=j*2;return K*=F,q*=F,I*=F,B*=2,R*=2,E*=2,Q[0]=H+K+B,Q[1]=O+q+R,Q[2]=Y+I+E,Q}function l7(Q,J,$,U){var Z=[],N=[];return Z[0]=J[0]-$[0],Z[1]=J[1]-$[1],Z[2]=J[2]-$[2],N[0]=Z[0],N[1]=Z[1]*Math.cos(U)-Z[2]*Math.sin(U),N[2]=Z[1]*Math.sin(U)+Z[2]*Math.cos(U),Q[0]=N[0]+$[0],Q[1]=N[1]+$[1],Q[2]=N[2]+$[2],Q}function n7(Q,J,$,U){var Z=[],N=[];return Z[0]=J[0]-$[0],Z[1]=J[1]-$[1],Z[2]=J[2]-$[2],N[0]=Z[2]*Math.sin(U)+Z[0]*Math.cos(U),N[1]=Z[1],N[2]=Z[2]*Math.cos(U)-Z[0]*Math.sin(U),Q[0]=N[0]+$[0],Q[1]=N[1]+$[1],Q[2]=N[2]+$[2],Q}function i7(Q,J,$,U){var Z=[],N=[];return Z[0]=J[0]-$[0],Z[1]=J[1]-$[1],Z[2]=J[2]-$[2],N[0]=Z[0]*Math.cos(U)-Z[1]*Math.sin(U),N[1]=Z[0]*Math.sin(U)+Z[1]*Math.cos(U),N[2]=Z[2],Q[0]=N[0]+$[0],Q[1]=N[1]+$[1],Q[2]=N[2]+$[2],Q}function r7(Q,J){var $=Q[0],U=Q[1],Z=Q[2],N=J[0],j=J[1],H=J[2],O=Math.sqrt($*$+U*U+Z*Z),Y=Math.sqrt(N*N+j*j+H*H),K=O*Y,q=K&&JQ(Q,J)/K;return Math.acos(Math.min(Math.max(q,-1),1))}function u7(Q){return Q[0]=0,Q[1]=0,Q[2]=0,Q}function e7(Q){return"vec3("+Q[0]+", "+Q[1]+", "+Q[2]+")"}function a7(Q,J){return Q[0]===J[0]&&Q[1]===J[1]&&Q[2]===J[2]}function o7(Q,J){var $=Q[0],U=Q[1],Z=Q[2],N=J[0],j=J[1],H=J[2];return Math.abs($-N)<=v*Math.max(1,Math.abs($),Math.abs(N))&&Math.abs(U-j)<=v*Math.max(1,Math.abs(U),Math.abs(j))&&Math.abs(Z-H)<=v*Math.max(1,Math.abs(Z),Math.abs(H))}var t7=u0,QJ=e0,JJ=a0,$J=o0,UJ=t0,ZJ=r0,NJ=QQ,jJ=function(){var Q=i0();return function(J,$,U,Z,N,j){var H,O;if(!$)$=3;if(!U)U=0;if(Z)O=Math.min(Z*$+U,J.length);else O=J.length;for(H=U;H<O;H+=$)Q[0]=J[H],Q[1]=J[H+1],Q[2]=J[H+2],N(Q,Q,j),J[H]=Q[0],J[H+1]=Q[1],J[H+2]=Q[2];return J}}();var Z0={};K0(Z0,{zero:()=>{{return PJ}},transformMat4:()=>{{return fJ}},transformMat3:()=>{{return TJ}},transformMat2d:()=>{{return vJ}},transformMat2:()=>{{return _J}},subtract:()=>{{return UQ}},sub:()=>{{return CJ}},str:()=>{{return pJ}},squaredLength:()=>{{return YQ}},squaredDistance:()=>{{return HQ}},sqrLen:()=>{{return dJ}},sqrDist:()=>{{return xJ}},set:()=>{{return XJ}},scaleAndAdd:()=>{{return EJ}},scale:()=>{{return MJ}},round:()=>{{return RJ}},rotate:()=>{{return SJ}},random:()=>{{return AJ}},normalize:()=>{{return GJ}},negate:()=>{{return WJ}},multiply:()=>{{return ZQ}},mul:()=>{{return mJ}},min:()=>{{return FJ}},max:()=>{{return BJ}},lerp:()=>{{return wJ}},length:()=>{{return OQ}},len:()=>{{return yJ}},inverse:()=>{{return DJ}},fromValues:()=>{{return OJ}},forEach:()=>{{return sJ}},floor:()=>{{return qJ}},exactEquals:()=>{{return zJ}},equals:()=>{{return kJ}},dot:()=>{{return LJ}},divide:()=>{{return NQ}},div:()=>{{return gJ}},distance:()=>{{return jQ}},dist:()=>{{return cJ}},cross:()=>{{return VJ}},create:()=>{{return $Q}},copy:()=>{{return YJ}},clone:()=>{{return HJ}},ceil:()=>{{return IJ}},angle:()=>{{return hJ}},add:()=>{{return KJ}}});function $Q(){var Q=new m(2);if(m!=Float32Array)Q[0]=0,Q[1]=0;return Q}function HJ(Q){var J=new m(2);return J[0]=Q[0],J[1]=Q[1],J}function OJ(Q,J){var $=new m(2);return $[0]=Q,$[1]=J,$}function YJ(Q,J){return Q[0]=J[0],Q[1]=J[1],Q}function XJ(Q,J,$){return Q[0]=J,Q[1]=$,Q}function KJ(Q,J,$){return Q[0]=J[0]+$[0],Q[1]=J[1]+$[1],Q}function UQ(Q,J,$){return Q[0]=J[0]-$[0],Q[1]=J[1]-$[1],Q}function ZQ(Q,J,$){return Q[0]=J[0]*$[0],Q[1]=J[1]*$[1],Q}function NQ(Q,J,$){return Q[0]=J[0]/$[0],Q[1]=J[1]/$[1],Q}function IJ(Q,J){return Q[0]=Math.ceil(J[0]),Q[1]=Math.ceil(J[1]),Q}function qJ(Q,J){return Q[0]=Math.floor(J[0]),Q[1]=Math.floor(J[1]),Q}function FJ(Q,J,$){return Q[0]=Math.min(J[0],$[0]),Q[1]=Math.min(J[1],$[1]),Q}function BJ(Q,J,$){return Q[0]=Math.max(J[0],$[0]),Q[1]=Math.max(J[1],$[1]),Q}function RJ(Q,J){return Q[0]=Math.round(J[0]),Q[1]=Math.round(J[1]),Q}function MJ(Q,J,$){return Q[0]=J[0]*$,Q[1]=J[1]*$,Q}function EJ(Q,J,$,U){return Q[0]=J[0]+$[0]*U,Q[1]=J[1]+$[1]*U,Q}function jQ(Q,J){var $=J[0]-Q[0],U=J[1]-Q[1];return Math.hypot($,U)}function HQ(Q,J){var $=J[0]-Q[0],U=J[1]-Q[1];return $*$+U*U}function OQ(Q){var J=Q[0],$=Q[1];return Math.hypot(J,$)}function YQ(Q){var J=Q[0],$=Q[1];return J*J+$*$}function WJ(Q,J){return Q[0]=-J[0],Q[1]=-J[1],Q}function DJ(Q,J){return Q[0]=1/J[0],Q[1]=1/J[1],Q}function GJ(Q,J){var $=J[0],U=J[1],Z=$*$+U*U;if(Z>0)Z=1/Math.sqrt(Z);return Q[0]=J[0]*Z,Q[1]=J[1]*Z,Q}function LJ(Q,J){return Q[0]*J[0]+Q[1]*J[1]}function VJ(Q,J,$){var U=J[0]*$[1]-J[1]*$[0];return Q[0]=Q[1]=0,Q[2]=U,Q}function wJ(Q,J,$,U){var Z=J[0],N=J[1];return Q[0]=Z+U*($[0]-Z),Q[1]=N+U*($[1]-N),Q}function AJ(Q,J){J=J||1;var $=U0()*2*Math.PI;return Q[0]=Math.cos($)*J,Q[1]=Math.sin($)*J,Q}function _J(Q,J,$){var U=J[0],Z=J[1];return Q[0]=$[0]*U+$[2]*Z,Q[1]=$[1]*U+$[3]*Z,Q}function vJ(Q,J,$){var U=J[0],Z=J[1];return Q[0]=$[0]*U+$[2]*Z+$[4],Q[1]=$[1]*U+$[3]*Z+$[5],Q}function TJ(Q,J,$){var U=J[0],Z=J[1];return Q[0]=$[0]*U+$[3]*Z+$[6],Q[1]=$[1]*U+$[4]*Z+$[7],Q}function fJ(Q,J,$){var U=J[0],Z=J[1];return Q[0]=$[0]*U+$[4]*Z+$[12],Q[1]=$[1]*U+$[5]*Z+$[13],Q}function SJ(Q,J,$,U){var Z=J[0]-$[0],N=J[1]-$[1],j=Math.sin(U),H=Math.cos(U);return Q[0]=Z*H-N*j+$[0],Q[1]=Z*j+N*H+$[1],Q}function hJ(Q,J){var $=Q[0],U=Q[1],Z=J[0],N=J[1],j=Math.sqrt($*$+U*U)*Math.sqrt(Z*Z+N*N),H=j&&($*Z+U*N)/j;return Math.acos(Math.min(Math.max(H,-1),1))}function PJ(Q){return Q[0]=0,Q[1]=0,Q}function pJ(Q){return"vec2("+Q[0]+", "+Q[1]+")"}function zJ(Q,J){return Q[0]===J[0]&&Q[1]===J[1]}function kJ(Q,J){var $=Q[0],U=Q[1],Z=J[0],N=J[1];return Math.abs($-Z)<=v*Math.max(1,Math.abs($),Math.abs(Z))&&Math.abs(U-N)<=v*Math.max(1,Math.abs(U),Math.abs(N))}var yJ=OQ,CJ=UQ,mJ=ZQ,gJ=NQ,cJ=jQ,xJ=HQ,dJ=YQ,sJ=function(){var Q=$Q();return function(J,$,U,Z,N,j){var H,O;if(!$)$=2;if(!U)U=0;if(Z)O=Math.min(Z*$+U,J.length);else O=J.length;for(H=U;H<O;H+=$)Q[0]=J[H],Q[1]=J[H+1],N(Q,Q,j),J[H]=Q[0],J[H+1]=Q[1];return J}}();var n=[0.2,0.2,0.2],i=[0.2,0.6,0.2],bJ=(Q,J)=>{Q.push({center:[J[0],J[1]],size:[40,40],text:"A\nQ",color:P.isPressed("A","Q")?i:n}),Q.push({center:[J[0]+45,J[1]],size:[40,40],text:"S",color:P.isPressed("S")?i:n}),Q.push({center:[J[0]+45,J[1]+45],size:[40,40],text:"W\nZ",color:P.isPressed("W","Z")?i:n}),Q.push({center:[J[0]+90,J[1]],size:[40,40],text:"D",color:P.isPressed("D")?i:n})},lJ=(Q,J)=>{Q.push({center:[J[0],J[1]],size:[40,40],lines:[{a:[15,0],b:[-8,0],thickness:6,color:[1,1,1]},{a:[0,10],b:[-12,-2],thickness:6,color:[1,1,1]},{a:[0,-10],b:[-12,2],thickness:6,color:[1,1,1]}],color:P.isPressed("ArrowLeft")?i:n}),Q.push({center:[J[0]+45,J[1]],size:[40,40],lines:[{a:[0,15],b:[0,-8],thickness:6,color:[1,1,1]},{a:[10,0],b:[-2,-12],thickness:6,color:[1,1,1]},{a:[-10,0],b:[2,-12],thickness:6,color:[1,1,1]}],color:P.isPressed("ArrowDown")?i:n}),Q.push({center:[J[0]+45,J[1]+45],size:[40,40],lines:[{a:[0,-15],b:[0,8],thickness:6,color:[1,1,1]},{a:[10,0],b:[-2,12],thickness:6,color:[1,1,1]},{a:[-10,0],b:[2,12],thickness:6,color:[1,1,1]}],color:P.isPressed("ArrowUp")?i:n}),Q.push({center:[J[0]+90,J[1]],size:[40,40],lines:[{a:[-15,0],b:[8,0],thickness:6,color:[1,1,1]},{a:[0,10],b:[12,-2],thickness:6,color:[1,1,1]},{a:[0,-10],b:[12,2],thickness:6,color:[1,1,1]}],color:P.isPressed("ArrowRight")?i:n})},nJ=(Q,J,$)=>{if(u.isSupported(J))Q.push({center:[$[0]+115,$[1]],size:[230,60],text:"Touch Events\nSupported\n(double tap)",color:[0,0.5,0]});else Q.push({center:[$[0]+115,$[1]],size:[230,60],text:"Touch Events\nNot Supported",color:[0.5,0,0]});if(l.canBePointerLocked(J))Q.push({center:[$[0]+105,$[1]+70],size:[210,60],text:"Mouse\nSupported",color:[0,0.5,0]});else Q.push({center:[$[0]+105,$[1]+70],size:[210,60],text:"Mouse Events\nNot Supported",color:[0.5,0,0]})},XQ=(Q,J,$)=>{const U=[],Z=[27,165],N=[27,260],j=[7,35];bJ(U,Z),lJ(U,N),nJ(U,Q,j),U.forEach((H)=>{const{center:O}=H;if(J.pushCenteredRectangle(M.fromValues(O[0],O[1],-0.3),H.size,[0,0,0]),J.pushCenteredRectangle(M.fromValues(O[0],O[1],-0.2),[H.size[0]-2,H.size[1]-2],H.color),H.text)$.setTextScale(16).setTextAlign("centered","centered").pushText(H.text,O).setTextAlign("left","top");if(H.lines)H.lines.forEach((Y)=>{J.pushThickLine([O[0]+Y.a[0],O[1]+Y.a[1],0],[O[0]+Y.b[0],O[1]+Y.b[1],0],Y.thickness,Y.color)})})};var t={X:0,Y:1,Z:2};class R0{_isActivated=!1;_theta=0;_phi=0;_mouseSensibility;_keyboardSensibility;_touchSensibility;_movingSpeed;_touchWasActive=!1;_touchStartTime=0;_touchMoveForward=!1;_axisIndices;_position=M.fromValues(0,0,0);_target=M.fromValues(0,0,0);_forwardAxis=M.fromValues(1,0,0);_leftAxis=M.fromValues(0,0,1);_upAxis=M.fromValues(0,1,0);constructor(Q){this._mouseSensibility=Q.mouseSensibility,this._keyboardSensibility=Q.keyboardSensibility,this._touchSensibility=Q.touchSensibility,this._movingSpeed=Q.movingSpeed,M.copy(this._position,Q.position),this._axisIndices=[Q.coordinates?t[Q.coordinates[0]]:t.X,Q.coordinates?t[Q.coordinates[1]]:t.Y,Q.coordinates?t[Q.coordinates[2]]:t.Z],this._theta=Q.theta,this._phi=Q.phi}isActivated(){return this._isActivated}update(Q){let J=!1,$=!1,U=!1,Z=!1,N=0,j=0;const H=Math.PI/180;{const G=r.deltaX()*this._mouseSensibility,T=r.deltaY()*this._mouseSensibility;N-=G*H,j-=T*H}const O=u.getTouchData().length>0;if(O){if(!this._touchWasActive){const f=Date.now();if((f-this._touchStartTime)/1000<0.25)this._touchMoveForward=!0;else this._touchStartTime=f}const G=u.getTouchData()[0],T=G.deltaX*this._touchSensibility,S=G.deltaY*this._touchSensibility;N-=T*H,j-=S*H}else this._touchMoveForward=!1;if(this._touchWasActive=O,this._touchMoveForward)J=!0;const Y=this._movingSpeed*Q,K=M.fromValues(0,0,0);M.scale(K,this._forwardAxis,Y);const q=M.fromValues(0,0,0);if(M.scale(q,this._leftAxis,Y),P.isPressed("Z","W"))J=!0;if(P.isPressed("S"))$=!0;if(P.isPressed("A","Q"))U=!0;if(P.isPressed("D"))Z=!0;const I=this._keyboardSensibility*Q;if(P.isPressed("ArrowUp"))j+=I;else if(P.isPressed("ArrowDown"))j-=I;if(P.isPressed("ArrowLeft"))N+=I;else if(P.isPressed("ArrowRight"))N-=I;this._theta+=N,this._phi+=j;const B=Math.PI*0.5,R=B*0.95;this._phi=Math.min(Math.max(this._phi,-R),+R);const E=Math.cos(this._theta),F=Math.sin(this._theta),[W,A,L]=this._axisIndices,w=Math.cos(this._phi+B);this._upAxis[W]=w*E,this._upAxis[A]=w*F,this._upAxis[L]=Math.sin(this._phi+B);const V=Math.cos(this._phi);if(this._forwardAxis[W]=V*E,this._forwardAxis[A]=V*F,this._forwardAxis[L]=Math.sin(this._phi),M.cross(this._leftAxis,this._upAxis,this._forwardAxis),J)M.add(this._position,this._position,K);else if($)M.sub(this._position,this._position,K);if(U)M.add(this._position,this._position,q);else if(Z)M.sub(this._position,this._position,q);M.add(this._target,this._position,this._forwardAxis)}getPosition(){return this._position}setPosition(Q){M.copy(this._position,Q)}getTarget(){return this._target}getForwardAxis(){return this._forwardAxis}getLeftAxis(){return this._leftAxis}getUpAxis(){return this._upAxis}getTheta(){return this._theta}getPhi(){return this._phi}getTouchMoveForward(){return this._touchMoveForward}}var s;(function($){$[$["perspective"]=0]="perspective";$[$["orthogonal"]=1]="orthogonal"})(s||(s={}));class Y0{_projectionType=s.perspective;_perspectiveData;_orthogonalData;_viewportPos=Z0.fromValues(0,0);_viewportSize=Z0.fromValues(0,0);_projectionMatrix=p.create();_viewMatrix=p.create();_composedMatrix=p.create();_eye=M.fromValues(0,0,0);_target=M.fromValues(0,0,0);_upAxis=M.fromValues(0,0,0);setAsPerspective(Q){this._projectionType=s.perspective;let J=Q.aspectRatio;if(J===void 0)J=this._viewportSize[0]/this._viewportSize[1];this._perspectiveData={fovy:Q.fovy,aspectRatio:J,near:Q.near,far:Q.far}}setAsOrthogonal(Q){this._projectionType=s.orthogonal,this._orthogonalData={...Q}}setViewportPos(Q,J){this._viewportPos[0]=Q,this._viewportPos[1]=J}getViewportPos(){return this._viewportPos}setViewportSize(Q,J){if(this._viewportSize[0]=Q,this._viewportSize[1]=J,this._projectionType!==s.perspective&&this._perspectiveData)this._perspectiveData.aspectRatio=this._viewportSize[0]/this._viewportSize[1]}getViewportSize(){return this._viewportSize}lookAt(Q,J,$){M.copy(this._eye,Q),M.copy(this._target,J),M.copy(this._upAxis,$)}setEye(Q){M.copy(this._eye,Q)}setTarget(Q){M.copy(this._target,Q)}setUpAxis(Q){M.copy(this._upAxis,Q)}getEye(){return this._eye}getTarget(){return this._target}getUpAxis(){return this._upAxis}addOffset(Q){M.add(this._eye,this._eye,Q),M.add(this._target,this._target,Q)}subOffset(Q){M.subtract(this._eye,this._eye,Q),M.subtract(this._target,this._target,Q)}computeMatrices(){if(this._projectionType===s.perspective){const{fovy:Q,aspectRatio:J,near:$,far:U}=this._perspectiveData;p.perspective(this._projectionMatrix,Q,J,$,U)}else if(this._projectionType===s.orthogonal){const{left:Q,right:J,top:$,bottom:U,near:Z,far:N}=this._orthogonalData;p.ortho(this._projectionMatrix,Q,J,$,U,Z,N)}p.lookAt(this._viewMatrix,this._eye,this._target,this._upAxis),this.computeComposedMatrix()}computeComposedMatrix(){p.multiply(this._composedMatrix,this._projectionMatrix,this._viewMatrix)}setProjectionMatrix(Q){p.copy(this._projectionMatrix,Q)}setViewMatrix(Q){p.copy(this._viewMatrix,Q)}setComposedMatrix(Q){p.copy(this._composedMatrix,Q)}getProjectionMatrix(){return this._projectionMatrix}getViewMatrix(){return this._viewMatrix}getComposedMatrix(){return this._composedMatrix}getPerspectiveData(){if(this._projectionType!==s.perspective)throw new Error("not a perspective projection");return this._perspectiveData}getOrthogonalData(){if(this._projectionType!==s.orthogonal)throw new Error("not an orthogonal projection");return this._orthogonalData}}var KQ=`
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
`.trim();var IQ=`
#version 300 es

precision lowp float;

flat in vec4 v_color;

out vec4 o_color;

void main(void)
{
  o_color = v_color;
}
`.trim();var qQ=14336;class M0{_shader;_geometry;_buffer=new Float32Array(qQ);_currentSize=0;constructor(Q,J){this._shader=Q;const $={...J,primitiveType:C.PrimitiveType.lines};this._geometry=new C.Geometry(Q,$),this._geometry.setFloatBufferSize(0,qQ)}pushLine(Q,J,$){if(this._currentSize+14>=this._buffer.length)if(this._shader.isBound())this.flush();else return;const U=$[3]??1;this._buffer[this._currentSize+0]=Q[0],this._buffer[this._currentSize+1]=Q[1],this._buffer[this._currentSize+2]=Q[2],this._buffer[this._currentSize+3]=$[0],this._buffer[this._currentSize+4]=$[1],this._buffer[this._currentSize+5]=$[2],this._buffer[this._currentSize+6]=U,this._currentSize+=7,this._buffer[this._currentSize+0]=J[0],this._buffer[this._currentSize+1]=J[1],this._buffer[this._currentSize+2]=J[2],this._buffer[this._currentSize+3]=$[0],this._buffer[this._currentSize+4]=$[1],this._buffer[this._currentSize+5]=$[2],this._buffer[this._currentSize+6]=U,this._currentSize+=7}canRender(){return this._currentSize>0}flush(){if(!this.canRender())return;this._geometry.updateBuffer(0,this._buffer,this._currentSize),this._geometry.setPrimitiveCount(this._currentSize/7),this._geometry.render(),this.clear()}clear(){this._currentSize=0}}var FQ=7168;class E0{_shader;_geometry;_buffer=new Float32Array(FQ);_currentSize=0;constructor(Q,J){this._shader=Q;const $={...J,primitiveType:C.PrimitiveType.triangles};this._geometry=new C.Geometry(Q,$),this._geometry.setFloatBufferSize(0,FQ)}pushTriangle(Q,J,$,U){if(this._currentSize+42>=this._buffer.length)if(this._shader.isBound())this.flush();else return;const Z=U[3]??1;this._buffer[this._currentSize+0]=Q[0],this._buffer[this._currentSize+1]=Q[1],this._buffer[this._currentSize+2]=Q[2],this._buffer[this._currentSize+3]=U[0],this._buffer[this._currentSize+4]=U[1],this._buffer[this._currentSize+5]=U[2],this._buffer[this._currentSize+6]=Z,this._currentSize+=7,this._buffer[this._currentSize+0]=J[0],this._buffer[this._currentSize+1]=J[1],this._buffer[this._currentSize+2]=J[2],this._buffer[this._currentSize+3]=U[0],this._buffer[this._currentSize+4]=U[1],this._buffer[this._currentSize+5]=U[2],this._buffer[this._currentSize+6]=Z,this._currentSize+=7,this._buffer[this._currentSize+0]=$[0],this._buffer[this._currentSize+1]=$[1],this._buffer[this._currentSize+2]=$[2],this._buffer[this._currentSize+3]=U[0],this._buffer[this._currentSize+4]=U[1],this._buffer[this._currentSize+5]=U[2],this._buffer[this._currentSize+6]=Z,this._currentSize+=7}pushLine(Q,J,$,U){if(this._currentSize+42>=this._buffer.length)return;const Z=J[0]-Q[0],N=J[1]-Q[1],j=Math.atan2(N,Z)+Math.PI*0.5,H=Math.cos(j)*$*0.5,O=Math.sin(j)*$*0.5;this.pushTriangle([Q[0]-H,Q[1]-O,Q[2]],[J[0]-H,J[1]-O,J[2]],[J[0]+H,J[1]+O,J[2]],U),this.pushTriangle([Q[0]-H,Q[1]-O,Q[2]],[J[0]+H,J[1]+O,J[2]],[Q[0]+H,Q[1]+O,Q[2]],U)}pushRotatedLine(Q,J,$,U,Z){this.pushLine([Q[0]-$*Math.cos(J),Q[1]-$*Math.sin(J),Q[2]],[Q[0]+$*Math.cos(J),Q[1]+$*Math.sin(J),Q[2]],U,Z)}pushOriginBoundRectangle(Q,J,$){if(this._currentSize+42>=this._buffer.length)return;const U=[Q[0]+J[0],Q[1]+J[1]];this.pushTriangle([Q[0],Q[1],Q[2]],[U[0],U[1],Q[2]],[Q[0],U[1],Q[2]],$),this.pushTriangle([Q[0],Q[1],Q[2]],[U[0],Q[1],Q[2]],[U[0],U[1],Q[2]],$)}pushCenteredRectangle(Q,J,$){const U=[Q[0]-J[0]*0.5,Q[1]-J[1]*0.5,Q[2]];this.pushOriginBoundRectangle(U,J,$)}canRender(){return this._currentSize>0}flush(){if(!this.canRender())return;this._geometry.updateBuffer(0,this._buffer,this._currentSize),this._geometry.setPrimitiveCount(this._currentSize/7),this._geometry.render(),this.clear()}clear(){this._currentSize=0}}class W0{_shader;_wireFramesStackRenderer;_trianglesStackRenderer;constructor(){this._shader=new c("StackRenderers",{vertexSrc:KQ,fragmentSrc:IQ,attributes:["a_vertex_position","a_vertex_color"],uniforms:["u_composedMatrix"]});const Q=new C.GeometryBuilder;Q.reset().setPrimitiveType("lines").addVbo().setVboAsDynamic().addVboAttribute("a_vertex_position","vec3f").addVboAttribute("a_vertex_color","vec4f"),this._wireFramesStackRenderer=new M0(this._shader,Q.getDef()),this._trianglesStackRenderer=new E0(this._shader,Q.getDef())}pushLine(Q,J,$){this._wireFramesStackRenderer.pushLine(Q,J,$)}pushCross(Q,J,$){const U=[[Q[0]-J,Q[1],Q[2]],[Q[0]+J,Q[1],Q[2]],[Q[0],Q[1]-J,Q[2]],[Q[0],Q[1]+J,Q[2]],[Q[0],Q[1],Q[2]-J],[Q[0],Q[1],Q[2]+J]],Z=[0,1,2,3,4,5];for(let N=0;N<Z.length;N+=2){const j=U[N+0],H=U[N+1];this._wireFramesStackRenderer.pushLine(j,H,$)}}pushThickLine(Q,J,$,U){this._trianglesStackRenderer.pushLine(Q,J,$,U)}pushRotatedLine(Q,J,$,U,Z){this._trianglesStackRenderer.pushRotatedLine(Q,J,$,U,Z)}pushOriginBoundRectangle(Q,J,$){this._trianglesStackRenderer.pushOriginBoundRectangle(Q,J,$)}pushCenteredRectangle(Q,J,$){this._trianglesStackRenderer.pushCenteredRectangle(Q,J,$)}pushTriangle(Q,J,$,U){this._trianglesStackRenderer.pushTriangle(Q,J,$,U)}flush(Q){if(!this._wireFramesStackRenderer.canRender()&&!this._trianglesStackRenderer.canRender())return;this._shader.bind((J)=>{J.setMatrix4Uniform("u_composedMatrix",Q),this._wireFramesStackRenderer.flush(),this._trianglesStackRenderer.flush()})}safeRender(Q,J){this._shader.bind(($)=>{$.setMatrix4Uniform("u_composedMatrix",Q),J(),this._wireFramesStackRenderer.flush(),this._trianglesStackRenderer.flush()})}clear(){this._wireFramesStackRenderer.clear(),this._trianglesStackRenderer.clear()}}var BQ=`
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
`.trim();var RQ=`
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
`.trim();var MQ=`
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
`.trim();var EQ=`
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
`.trim();var D0=(Q)=>Q*Math.PI/180;class G0{_cameraFovy;_canvasWidth;_canvasHeight;_renderWidth;_renderHeight;_resolutionCoef=1;_antiAliasing=!1;_rayTracerShaderProgram;_textureShaderProgram;_rayTracerGeometry;_screenGeometry;_finalTexture;_frameBuffer;_sceneDataTexture;_spheres=[];_boxes=[];_triangles=[];_lightsDataTexture;_sunLights=[];_spotLights=[];_camera;constructor(Q){this._cameraFovy=Q.fovy,this._renderWidth=this._canvasWidth=Q.canvasWidth,this._renderHeight=this._canvasHeight=Q.canvasHeight,this._rayTracerShaderProgram=new c("RayTracerRenderer-1",{vertexSrc:BQ,fragmentSrc:RQ,attributes:["a_vertexPosition","a_plotPosition"],uniforms:["u_cameraEye","u_sceneTextureData","u_sceneTextureSize","u_spheresStart","u_spheresStop","u_boxesStart","u_boxesStop","u_trianglesStart","u_trianglesStop","u_lightsTextureData","u_sunLightsStart","u_sunLightsStop","u_spotLightsStart","u_spotLightsStop"]}),this._textureShaderProgram=new c("RayTracerRenderer-1",{vertexSrc:MQ,fragmentSrc:EQ,attributes:["a_vertexPosition","a_vertexTextureCoord"],uniforms:["u_texture","u_step"]}),this._finalTexture=new e,this._finalTexture.initialize(),this._finalTexture.preBind((Z)=>{Z.allocate(this._renderWidth,this._renderHeight)}),this._frameBuffer=new O0,this._frameBuffer.bind((Z)=>{Z.attachTexture(this._finalTexture)});const J=new C.GeometryBuilder;J.reset().setPrimitiveType("triangleStrip").addVbo().addVboAttribute("a_vertexPosition","vec2f").addVbo().setVboAsDynamic().addVboAttribute("a_plotPosition","vec3f"),this._rayTracerGeometry=new C.Geometry(this._rayTracerShaderProgram,J.getDef());const $=[];$.push(1,1),$.push(-1,1),$.push(1,-1),$.push(-1,-1),this._rayTracerGeometry.updateBuffer(0,$,$.length),this._rayTracerGeometry.setPrimitiveStart(0),this._rayTracerGeometry.setPrimitiveCount(4),J.reset().setPrimitiveType("triangleStrip").addVbo().addVboAttribute("a_vertexPosition","vec2f").addVboAttribute("a_vertexTextureCoord","vec2f"),this._screenGeometry=new C.Geometry(this._textureShaderProgram,J.getDef());const U=[];U.push(1,1,1,1),U.push(-1,1,0,1),U.push(1,-1,1,0),U.push(-1,-1,0,0),this._screenGeometry.updateBuffer(0,U,U.length),this._screenGeometry.setPrimitiveStart(0),this._screenGeometry.setPrimitiveCount(4),this._sceneDataTexture=new $0,this._sceneDataTexture.initialize(),this._lightsDataTexture=new $0,this._lightsDataTexture.initialize(),this._camera={position:M.fromValues(0,0,0),target:M.fromValues(1.5,1.5,1.5),up:M.fromValues(0,1,0)}}pushSphere({position:Q,radius:J,color:$,reflection:U,chessboard:Z,shadowEnabled:N,lightEnabled:j}){if(J<=0)throw new Error("invalid sphere radius");if(U<0||U>1)throw new Error("invalid sphere reflection");this._spheres.push({position:[Q[0],Q[1],Q[2]],radius:J,color:[$[0],$[1],$[2]],reflection:U,chessboard:Z,shadowEnabled:N,lightEnabled:j})}pushBox({position:Q,angleX:J,angleY:$,angleZ:U,boxSize:Z,color:N,reflection:j,chessboard:H,shadowEnabled:O,lightEnabled:Y}){if(Z[0]<=0||Z[1]<=0||Z[2]<=0)throw new Error("invalid box size");if(j<0||j>1)throw new Error("invalid box reflection");const K=p.create();p.identity(K),p.translate(K,K,Q),p.rotateY(K,K,$),p.rotateZ(K,K,U),p.rotateX(K,K,J),this._boxes.push({matrix:K,boxSize:M.clone(Z),color:M.clone(N),reflection:j,chessboard:H,shadowEnabled:O,lightEnabled:Y})}pushTriangle({v0:Q,v1:J,v2:$,color:U,reflection:Z,shadowEnabled:N,lightEnabled:j}){if(Z<0||Z>1)throw new Error("invalid triangle reflection");this._triangles.push({v0:M.clone(Q),v1:M.clone(J),v2:M.clone($),color:M.clone(U),reflection:Z,shadowEnabled:N,lightEnabled:j})}pushSunLight({direction:Q,intensity:J}){if(J<=0)throw new Error("intensity cannot be 0");if(M.length(Q)===0)throw new Error("direction cannot be 0");const $=M.normalize(M.clone(Q),Q);this._sunLights.push({direction:$,intensity:J})}pushSpotLight({position:Q,intensity:J,radius:$}){if(J<=0)throw new Error("intensity cannot be 0");if($<=0)throw new Error("radius cannot be <= 0");this._spotLights.push({position:M.clone(Q),intensity:J,radius:$})}lookAt(Q,J,$){M.copy(this._camera.position,Q);let U=M.sub(M.create(),J,Q);U=M.normalize(U,U),U=M.add(U,Q,U),M.copy(this._camera.target,U);const Z=M.normalize(M.create(),$);M.copy(this._camera.up,Z)}render(){const Q=D.getContext(),J=this._computeCameraFarCorners();this._rayTracerGeometry.updateBuffer(1,J,J.length);const $=Math.floor(this._renderWidth),U=Math.floor(this._renderHeight);this._frameBuffer.bind(()=>{Q.viewport(0,0,$,U),Q.clear(Q.COLOR_BUFFER_BIT),this._rayTracerShaderProgram.bind((N)=>{N.setFloat3Uniform("u_cameraEye",this._camera.position[0],this._camera.position[1],this._camera.position[2]);{const j=[];{{N.setInteger1Uniform("u_spheresStart",0);for(let H of this._spheres)j.push(H.position[0],H.position[1],H.position[2]),j.push(H.radius),j.push(H.color[0],H.color[1],H.color[2]),j.push(H.reflection),j.push(H.shadowEnabled?1:0),j.push(H.lightEnabled?1:0),j.push(H.chessboard?1:0);N.setInteger1Uniform("u_spheresStop",j.length)}{N.setInteger1Uniform("u_boxesStart",j.length);for(let H of this._boxes){for(let O=0;O<16;++O)j.push(H.matrix[O]);j.push(H.boxSize[0],H.boxSize[1],H.boxSize[2]),j.push(H.color[0],H.color[1],H.color[2]),j.push(H.reflection),j.push(H.shadowEnabled?1:0),j.push(H.lightEnabled?1:0),j.push(H.chessboard?1:0)}N.setInteger1Uniform("u_boxesStop",j.length)}{N.setInteger1Uniform("u_trianglesStart",j.length);for(let H of this._triangles)j.push(H.v0[0],H.v0[1],H.v0[2]),j.push(H.v1[0],H.v1[1],H.v1[2]),j.push(H.v2[0],H.v2[1],H.v2[2]),j.push(H.color[0],H.color[1],H.color[2]),j.push(H.reflection),j.push(H.shadowEnabled?1:0),j.push(H.lightEnabled?1:0);N.setInteger1Uniform("u_trianglesStop",j.length)}}Q.activeTexture(Q.TEXTURE0+0),this._sceneDataTexture.preBind((H)=>{H.update(j)}),N.setInteger1Uniform("u_sceneTextureData",0),N.setInteger1Uniform("u_sceneTextureSize",j.length)}{const j=[];{N.setInteger1Uniform("u_sunLightsStart",0);for(let H of this._sunLights)j.push(H.direction[0],H.direction[1],H.direction[2]),j.push(H.intensity);N.setInteger1Uniform("u_sunLightsStop",j.length)}{N.setInteger1Uniform("u_spotLightsStart",j.length);for(let H of this._spotLights)j.push(H.position[0],H.position[1],H.position[2]),j.push(H.radius),j.push(H.intensity);N.setInteger1Uniform("u_spotLightsStop",j.length)}Q.activeTexture(Q.TEXTURE0+1),this._lightsDataTexture.preBind((H)=>{H.update(j)}),N.setInteger1Uniform("u_lightsTextureData",1)}this._rayTracerGeometry.render()})}),Q.viewport(0,0,this._canvasWidth,this._canvasHeight),Q.clear(Q.COLOR_BUFFER_BIT),this._textureShaderProgram.bind((N)=>{if(N.setTextureUniform("u_texture",this._finalTexture,0),this._antiAliasing){const j=(1-this._renderWidth/this._canvasWidth)*0.005,H=(1-this._renderHeight/this._canvasHeight)*0.005;N.setFloat2Uniform("u_step",j,H)}else N.setFloat2Uniform("u_step",0,0);this._screenGeometry.render()})}reset(){this._sunLights.length=0,this._spotLights.length=0,this._spheres.length=0,this._boxes.length=0,this._triangles.length=0}setResolutionCoef(Q){if(Q===this._resolutionCoef||Q<=0||Q>1)return;this._resolutionCoef=Q,this._renderWidth=Math.floor(this._canvasWidth*this._resolutionCoef),this._renderHeight=Math.floor(this._canvasHeight*this._resolutionCoef),this._finalTexture.preBind((J)=>{J.resize(this._renderWidth,this._renderHeight)})}getResolutionCoef(){return this._resolutionCoef}setAntiAliasing(Q){this._antiAliasing=Q}getAntiAliasing(){return this._antiAliasing}getCurrentSize(){return[this._renderWidth,this._renderHeight]}_computeCameraFarCorners(){const Q=M.sub(M.create(),this._camera.target,this._camera.position),J=M.cross(M.create(),Q,this._camera.up),$=M.cross(M.create(),J,Q),U=D0(this._cameraFovy*0.5),Z=Math.cos(U)*1/Math.sin(U),N=M.multiply(M.create(),Q,M.fromValues(Z,Z,Z)),j=M.add(M.create(),this._camera.position,N),H=this._canvasWidth/this._canvasHeight,O=M.multiply(M.create(),J,M.fromValues(H,H,H)),Y=M.add(M.create(),j,$),K=M.subtract(M.create(),j,$),q=M.subtract(M.create(),Y,O),I=M.subtract(M.create(),K,O),B=M.add(M.create(),Y,O),R=M.add(M.create(),K,O);return[B[0],B[1],B[2],q[0],q[1],q[2],R[0],R[1],R[2],I[0],I[1],I[2]]}get canvasWidth(){return this._canvasWidth}get canvasHeight(){return this._canvasHeight}get renderWidth(){return this._renderWidth}get renderHeight(){return this._renderHeight}get camera(){return this._camera}get spheres(){return this._spheres}get boxes(){return this._boxes}get triangles(){return this._triangles}get sunLights(){return this._sunLights}get spotLights(){return this._spotLights}}var WQ=`
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
`.trim();var DQ=`
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
`.trim();var L0="7e7e28fd03fd07fe04fe0aff02ff7e4dfd0cfd03fd07fe04fe0aff02ff1afc0dfd10fc08fc0ffe55ff15fb0bfd03fd07fe04fe08f707fd04ff07fe02fe0cfd0ffd0cfd0aff03fe03ff0afe44fe15fb0bfd03fd04f204f607fd03fe07fe02fe0cfd0efd0efd0aff02fe02ff0bfe43fd15fb0cfe03fe05f204fe01ff02ff0afd02fd07fe02fe0bfd0efd10fd0afa0cfe42fd16fb1bfe04fe07fe01ff02ff0efd09fc1cfd12fd09fa0cfe41fd17fb1bfe04fe07f70bfd0afc04ff17fd12fd06f405f616f61cfd19fd1cfe04fe08f709fd0bfb02fe17fd12fd06f405f616f61bfd1afd1cfe04fe0aff02ff01fe08fd0bfe02fa17fd12fd09fa0cfe3efd37f207ff02ff01fe07fd02fd07fe03fc19fd10fd0afa0cfe3dfd38f204f607fe03fd07fe03fd1bfd0efd0aff02fe02ff0bfe0cfd1dfd0dfd1dfd1cfe04fe07f708ff04fd07fe02fb1bfd0cfd0aff03fe03ff0afe0cfd1dfd0cfd1efd1cfe04fe0aff02ff1afb02fe1bfc08fc0ffe1cfd1dfd0bfd1ffd1cfe04fe0aff02ff7afd7e7e7e7e7e7e0efd17fd10fc0af80bfe0bf909f90dfd08f609fb08f506f808f82cfd19fd0df807fd04fd0afe0afd03fd07fd03fd0bfc08fd0ffd0bfd05fd05fd04fd06fd04fd2afd1bfd0bfc02fc06fd03fc09fd0afd04fd06fd04fd09fb08fd0efd0cfd05fd05fd04fd06fd04fd09fd0cfd0efd1dfd0afe05fd06fd02fb06fa11fd0dfd08fe01fd08fd0dfd0dfd05fd05fd04fd06fd04fd09fd0cfd0dfd0af409fd10fd06fd02fb06fa10fd0dfd08fe02fd08fd0dfd15fd05fb02fd06fd04fd09fd0cfd0cfd0bf40afd0efd07fd01fe01fd09fd0ffd0bfb08fe03fd08f808f70efd08fa08f626fd23fd0cfd08fd01fe01fd09fd0efd0cfb08f606f707f60cfd09fa09f726fd23fd0bfd09fb02fd09fd0dfd10fd07f60cfc06fd04fd0bfd08fd02fb0dfd09fd0cfd0cfd0bf40afd0cfd09fb02fd09fd0cfd12fd0bfd0ffd06fd04fd0afd09fd04fd0dfd09fd0cfd0dfd0af409fd19fc03fd09fd0bfd03fd06fd04fd0bfd08fd04fd06fd04fd09fd0afd04fd0cfd0afd0cfd0efd1dfd1afd04fd09fd0afd04fd06fd03fd0cfd08fd03fd07fd04fd09fd0afd04fd0bfd19fd10fd1bfd0ffd0af807f707f607f90bf907f909f80afd0bf809fb2efd19fd10fd7e51fd17fd11fd7e7e7e7e13f87e78fd05fd08fc09f709f907f808f606f608f907fd03fd07f90df905fc03fd06fb0bfd05fd05fd05fd08fb08fd05fd07fa09fd03fd07fd03fd07fd02fd08fd04fe07fd04fe07fd03fd06fd03fd09fd11fd08fd03fd07fd0cfc03fc05fd05fd07fd01fd07fd05fd06fd02fd08fd03fd06fd04fd07fd03fd07fd05ff07fd05ff06fd04fd06fd03fd09fd11fd08fd02fd08fd0cfb01fb05fc04fd06fd03fd06fd05fd05fd04fd07fd03fd06fd0efd03fd07fd0dfd0cfd04fd06fd03fd09fd11fd08fd01fd09fd0cf505fb03fd05fd05fd05fd02fa05fd04fd07fd03fd06fd0efd03fd07fd03fe08fd03fe07fd0dfd03fd09fd11fd08fa0afd0cf505fa02fd05fd05fd05fd02fa05fd04fd07f807fd0efd03fd07f808f807fd0df709fd11fd08fb0bfd0cfd01fd01fd05fd01fd01fd05fd05fd05fd02fa05fd04fd07f807fd0efd03fd07f808f807fd0df709fd11fd08fb0bfd0cfd02ff02fd05fd02fa05fd05fd05fd02fa05f607fd03fd06fd0efd03fd07fd03fe08fd03fe07fd02fb06fd03fd09fd0bfd03fd08fa0afd0cfd05fd05fd03fb05fd05fd05fd0dfd04fd07fd03fd06fd0efd03fd07fd0dfd0cfd04fd06fd03fd09fd0bfd03fd08fd01fd09fd05ff06fd05fd05fd04fc05fd05fd05fd0dfd04fd07fd03fd06fd04fd07fd03fd07fd05ff07fd0cfd04fd06fd03fd09fd0bfd03fd08fd02fd08fd04fe06fd05fd05fd05fd06fd03fd06fd0dfd04fd07fd03fd07fd03fd07fd02fd08fd04fe07fd0dfd03fd06fd03fd09fd0bfd03fd08fd03fd07fd03fd06fd05fd05fd05fd07fd01fd07fd0dfd04fd06f709f907f808f606fb0df806fd03fd07f90af908fc03fd06f606fd05fd05fd05fd08fb0af87e7e7e7e7e7e7e68fe1af70afb08f708f807f505fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07f608f907ff11f90afc1afd03fd07fc01fc07fd03fd06fd04fd06fe02fd02fe05fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07fd04fd08fd0bfe14fd09fa19fd03fd07fd03fd07fd03fd06fd04fd06ff03fd03ff05fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07fe05fd08fd0bfd13fd08fd02fd18fd03fd06fd05fd06fd03fd06fd04fd0afd09fd03fd07fd03fd07fd05fd06fd01fd08fd03fd07ff05fd09fd0cfd12fd07fd04fd17fd03fd06fd05fd06fd03fd06fd11fd09fd03fd07fd03fd07fd05fd07fb09fd03fd0cfd0afd0dfd11fd28f807fd05fd06f808f90cfd09fd03fd07fd03fd07fd02ff02fd08fd0bfd01fd0cfd0bfd0efd10fd28f807fd05fd06f809f90bfd09fd03fd07fd03fd07fd02ff02fd08fd0cfb0cfd0cfd0ffd0ffd28fd0cfd03fb06fd02fd0efd0afd09fd03fd07fd03fd07fd02ff02fd07fb0cfd0cfd0dfd10fd0efd28fd0cfd02fa06fd03fd06fd04fd0afd09fd03fd07fd03fd08f707fd01fd0bfd0bfd05ff08fd11fd0dfd28fd0df707fd03fd06fd04fd0afd09fd03fd08fd01fd09fc01fc06fd03fd0afd0afd05fe08fd12fd0cfd28fd0df707fd03fd06fd04fd0afd09fd03fd09fb0bfd01fd07fd03fd0afd0afd04fd08fd13fd0bfd27fb12fd06fc03fd07f809f908f90bfd0cfd01fd07fd03fd08f908f608f910fd06f93cfa7e54f07e72f07e7e7e7e0bfd1dfc21fb19fb18fc10fd0ffd07fc0dfa39fd1efd22fd19fd01fd18fd10fd0ffd08fd10fd3bfd1cfd22fd19fd01fd18fd10fd0ffd08fd10fd3bfd1cfd22fd19fd1cfd2dfd10fd4af909f808f909f808f90afd0cfb02fe07fd01fc08fa0cfa08fd03fd0afd09f606f809f91efd08fd03fd06fd03fd07fd03fd07fd03fd07f808fd03fd08fc02fd0afd0ffd08fd02fd0bfd09fd02ff02fd05fd03fd07fd03fd1dfd08fd03fd06fd03fd07fd03fd07fd03fd07f808fd03fd08fc02fd0afd0ffd08fd01fd0cfd09fd02ff02fd05fd03fd07fd03fd18f808fd03fd06fd0dfd03fd07f709fd0bfd03fd08fd03fd0afd0ffd08fa0dfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd0dfd03fd07fd0ffd0bfd03fd08fd03fd0afd0ffd08fd01fd0cfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd03fd07fd03fd07fd03fd09fd0cf808fd03fd0afd0ffd08fd02fd0bfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd03fd07fd03fd07fd03fd09fd0df908fd03fd0afd0ffd08fd03fd0afd09fd02ff02fd05fd03fd07fd03fd18fb02fe06fe02fb08f909fb02fe07f908f90ffd07fc03fd07f706fd03fd07fc03fd07f706fd05fd05fd03fd08f978fd03fd27fd03fd7e4af92afa7e7e7e7e7e7e18fa09fc09fa1efe4eff6efd0dfc0dfd1cfc4cfe6efd0dfc0dfd1bfa4afd6efd0dfc0dfd1afd02fd07fe02fb07fb02fe07fc02fd08f908f707fd03fd07fd03fd07fd05fd05fd02fd09fd03fd06f80afd0efc0efd08fb03fd05fd04fd07fd03fd05fd03fd09f706fd04fe09fd0bfd03fd07fd03fd07fd05fd05fd02fd09fd03fd06fe03fd08fd24fd05fd01fd02fd05fe06fe07fd03fd05fd03fd09fc02fd06fd04fe09fd0bfd03fd07fd03fd07fd05fd06fa0afd03fd06ff03fd09fd24fd05fd02fd01fd05fe06fe07fd03fd05fd03fd09fd0dfb0cfd0bfd03fd07fd03fd07fd02ff02fd07fc0bfd03fd09fd0cfd0efc0efd07fd03fb06fe06fe07fd03fd05fd03fd09fd0ffb0afd0bfd03fd07fd03fd07fd02ff02fd07fc0bfd03fd08fd0efd0dfc0dfd19fe06fe07fd03fd05fd03fd09fd0cfe04fd09fd01fd07fd03fd08fd01fd09fc01fc07fa0bf908fd03ff0bfd0dfc0dfd19fe06fe07f807f809fd0cfe04fd09fd01fd07fd03fd09fb0bfd01fd07fd02fd0bfb08fd03fe0bfd0dfc0dfd19f607fd11fd08fb0cf90bfb09fb02fe09fd0cfd01fd07fd02fd0dfd08f80cfa09fc09fa1af607fd11fd7cfd69fb0ffb77fa";var GQ=[16,6],X=[1/GQ[0],1/GQ[1]],LQ=36864;class V0{_shader;_geometry;_texture=new e;_texCoordMap;_buffer=new Float32Array(LQ);_currentSize=0;_textScale=14;_textColor=[1,1,1];_horizontalTextAlign="left";_verticalTextAlign="top";constructor(){this._shader=new c("TextRenderer",{vertexSrc:WQ,fragmentSrc:DQ,attributes:["a_vertex_position","a_vertex_texCoord","a_offset_position","a_offset_texCoord","a_offset_color","a_offset_scale"],uniforms:["u_composedMatrix","u_texture"]});const Q=new C.GeometryBuilder;Q.reset().setPrimitiveType("triangles").addVbo().addVboAttribute("a_vertex_position","vec2f").addVboAttribute("a_vertex_texCoord","vec2f").setStride(16).addVbo().setVboAsDynamic().setVboAsInstanced().addVboAttribute("a_offset_position","vec3f").addVboAttribute("a_offset_texCoord","vec2f").addVboAttribute("a_offset_color","vec3f").addVboAttribute("a_offset_scale","float").setStride(36),this._geometry=new C.Geometry(this._shader,Q.getDef());const J=[{position:[0.5,-0.5],texCoord:[X[0]*1,X[1]*1]},{position:[-0.5,-0.5],texCoord:[X[0]*0,X[1]*1]},{position:[0.5,0.5],texCoord:[X[0]*1,X[1]*0]},{position:[-0.5,0.5],texCoord:[X[0]*0,X[1]*0]}],$=[1,0,2,1,2,3],U=[];for(let H of $){const O=J[H];U.push(O.position[0],O.position[1],O.texCoord[0],O.texCoord[1])}this._geometry.updateBuffer(0,U,U.length),this._geometry.setPrimitiveCount(U.length/4),this._geometry.setFloatBufferSize(1,LQ),this._texCoordMap=new Map([[" ",[0*X[0],0*X[1]]],["!",[1*X[0],0*X[1]]],['"',[2*X[0],0*X[1]]],["#",[3*X[0],0*X[1]]],["$",[4*X[0],0*X[1]]],["%",[5*X[0],0*X[1]]],["&",[6*X[0],0*X[1]]],["'",[7*X[0],0*X[1]]],["(",[8*X[0],0*X[1]]],[")",[9*X[0],0*X[1]]],["*",[10*X[0],0*X[1]]],["+",[11*X[0],0*X[1]]],[",",[12*X[0],0*X[1]]],["-",[13*X[0],0*X[1]]],[".",[14*X[0],0*X[1]]],["/",[15*X[0],0*X[1]]],["0",[0*X[0],1*X[1]]],["1",[1*X[0],1*X[1]]],["2",[2*X[0],1*X[1]]],["3",[3*X[0],1*X[1]]],["4",[4*X[0],1*X[1]]],["5",[5*X[0],1*X[1]]],["6",[6*X[0],1*X[1]]],["7",[7*X[0],1*X[1]]],["8",[8*X[0],1*X[1]]],["9",[9*X[0],1*X[1]]],[":",[10*X[0],1*X[1]]],[";",[11*X[0],1*X[1]]],["<",[12*X[0],1*X[1]]],["=",[13*X[0],1*X[1]]],[">",[14*X[0],1*X[1]]],["?",[15*X[0],1*X[1]]],["@",[0*X[0],2*X[1]]],["A",[1*X[0],2*X[1]]],["B",[2*X[0],2*X[1]]],["C",[3*X[0],2*X[1]]],["D",[4*X[0],2*X[1]]],["E",[5*X[0],2*X[1]]],["F",[6*X[0],2*X[1]]],["G",[7*X[0],2*X[1]]],["H",[8*X[0],2*X[1]]],["I",[9*X[0],2*X[1]]],["J",[10*X[0],2*X[1]]],["K",[11*X[0],2*X[1]]],["L",[12*X[0],2*X[1]]],["M",[13*X[0],2*X[1]]],["N",[14*X[0],2*X[1]]],["O",[15*X[0],2*X[1]]],["P",[0*X[0],3*X[1]]],["Q",[1*X[0],3*X[1]]],["R",[2*X[0],3*X[1]]],["S",[3*X[0],3*X[1]]],["T",[4*X[0],3*X[1]]],["U",[5*X[0],3*X[1]]],["V",[6*X[0],3*X[1]]],["W",[7*X[0],3*X[1]]],["X",[8*X[0],3*X[1]]],["Y",[9*X[0],3*X[1]]],["Z",[10*X[0],3*X[1]]],["[",[11*X[0],3*X[1]]],["\\",[12*X[0],3*X[1]]],["]",[13*X[0],3*X[1]]],["^",[14*X[0],3*X[1]]],["_",[15*X[0],3*X[1]]],["`",[0*X[0],4*X[1]]],["a",[1*X[0],4*X[1]]],["b",[2*X[0],4*X[1]]],["c",[3*X[0],4*X[1]]],["d",[4*X[0],4*X[1]]],["e",[5*X[0],4*X[1]]],["f",[6*X[0],4*X[1]]],["g",[7*X[0],4*X[1]]],["h",[8*X[0],4*X[1]]],["i",[9*X[0],4*X[1]]],["j",[10*X[0],4*X[1]]],["k",[11*X[0],4*X[1]]],["l",[12*X[0],4*X[1]]],["m",[13*X[0],4*X[1]]],["n",[14*X[0],4*X[1]]],["o",[15*X[0],4*X[1]]],["p",[0*X[0],5*X[1]]],["q",[1*X[0],5*X[1]]],["r",[2*X[0],5*X[1]]],["s",[3*X[0],5*X[1]]],["t",[4*X[0],5*X[1]]],["u",[5*X[0],5*X[1]]],["v",[6*X[0],5*X[1]]],["w",[7*X[0],5*X[1]]],["x",[8*X[0],5*X[1]]],["y",[9*X[0],5*X[1]]],["z",[10*X[0],5*X[1]]],["{",[11*X[0],5*X[1]]],["|",[12*X[0],5*X[1]]],["}",[13*X[0],5*X[1]]],["~",[14*X[0],5*X[1]]]]);const Z=256,N=96,j=new Uint8Array(Z*N*4);{let H=0;for(let O=0;O<L0.length;O+=2){let Y=parseInt(`${L0.substring(O,O+2)}000000`,16)>>24,K=0;if(Y<0)Y=-Y,K=255;for(let q=0;q<Y;++q)j[H*4+0]=K,j[H*4+1]=K,j[H*4+2]=K,j[H*4+3]=K,++H}}this._texture.initialize(),this._texture.bind((H)=>{H.loadFromMemory(Z,N,j)})}setTextAlign(Q,J){return this._horizontalTextAlign=Q,this._verticalTextAlign=J,this}setTextScale(Q){return this._textScale=Q,this}setTextColor(Q,J,$){return this._textColor[0]=Q,this._textColor[1]=J,this._textColor[2]=$,this}pushText(Q,J){if(Q.length===0)return this;if(this._textScale<=0)return this;const $=[0];for(let j=0;j<Q.length;++j)if(Q[j]=="\n")$.push(0);else $[$.length-1]+=1;if($.length===0)return this;let U=0;const Z=[0,0],N=this._textScale*0.5;switch(this._horizontalTextAlign){case"left":Z[0]=J[0];break;case"centered":Z[0]=J[0]-$[U]*N+N;break;case"right":Z[0]=J[0]-$[U]*this._textScale+this._textScale;break}switch(this._verticalTextAlign){case"top":Z[1]=J[1];break;case"centered":Z[1]=J[1]+$.length*N-N;break;case"bottom":Z[1]=J[1]-($.length-1)*this._textScale;break}for(let j=0;j<Q.length;++j){const H=Q[j];if(H=="\n"){switch(U+=1,this._horizontalTextAlign){case"left":Z[0]=J[0];break;case"centered":Z[0]=J[0]-$[U]*N+N;break;case"right":Z[0]=J[0]-$[U]*this._textScale+this._textScale;break}Z[1]-=this._textScale}else this._pushLetter(H,Z),Z[0]+=this._textScale}return this}_pushLetter(Q,J){if(this._currentSize+90>=this._buffer.length)return;const $=this._texCoordMap.get(Q);if(!$)throw new Error(`fail to find a letter, letter=${Q}`);for(let U=-1;U<=1;++U)for(let Z=-1;Z<=1;++Z)this._buffer[this._currentSize++]=J[0]+2*Z,this._buffer[this._currentSize++]=J[1]+2*U,this._buffer[this._currentSize++]=-0.1,this._buffer[this._currentSize++]=$[0],this._buffer[this._currentSize++]=$[1],this._buffer[this._currentSize++]=0,this._buffer[this._currentSize++]=0,this._buffer[this._currentSize++]=0,this._buffer[this._currentSize++]=this._textScale;this._buffer[this._currentSize++]=J[0],this._buffer[this._currentSize++]=J[1],this._buffer[this._currentSize++]=0,this._buffer[this._currentSize++]=$[0],this._buffer[this._currentSize++]=$[1],this._buffer[this._currentSize++]=this._textColor[0],this._buffer[this._currentSize++]=this._textColor[1],this._buffer[this._currentSize++]=this._textColor[2],this._buffer[this._currentSize++]=this._textScale}flush(Q){if(this._currentSize===0)return this;return this._shader.bind((J)=>{J.setMatrix4Uniform("u_composedMatrix",Q),J.setTextureUniform("u_texture",this._texture,0),this._geometry.updateBuffer(1,this._buffer,this._currentSize),this._geometry.setInstancedCount(this._currentSize/9),this._geometry.render()}),e.unbind(),this.clear(),this}clear(){return this._currentSize=0,this}}var VQ=70;class w0{_def;_rayTracerRenderer;_textRenderer;_stackRenderers;_debugSceneCamera=new Y0;_mainHudCamera=new Y0;constructor(Q){this._def=Q,this.resize(this._def.canvasDomElement.width,this._def.canvasDomElement.height),D.initialize(this._def.canvasDomElement),this._rayTracerRenderer=new G0({canvasWidth:this._def.canvasDomElement.width,canvasHeight:this._def.canvasDomElement.height,fovy:VQ}),this._textRenderer=new V0,this._stackRenderers=new W0}initialize(){const Q=D.getContext();Q.pixelStorei(Q.UNPACK_ALIGNMENT,1),Q.disable(Q.DEPTH_TEST),Q.disable(Q.BLEND),Q.disable(Q.CULL_FACE),Q.depthFunc(Q.NEVER),Q.clearColor(0,0,0,1),Q.clearDepth(1)}resize(Q,J){this._debugSceneCamera.setViewportSize(Q,J),this._debugSceneCamera.setAsPerspective({fovy:D0(VQ),near:1,far:500}),this._mainHudCamera.setViewportSize(Q,J);const $=Q*0.5,U=J*0.5;this._mainHudCamera.setAsOrthogonal({left:-$,right:+$,top:-U,bottom:+U,near:-200,far:200}),this._mainHudCamera.setEye([$,U,1]),this._mainHudCamera.setTarget([$,U,0]),this._mainHudCamera.setUpAxis([0,1,0]),this._mainHudCamera.computeMatrices()}_pushWireFrameSphere(Q){const J=0.5257311121191336*Q.radius,$=0.8506508083520399*Q.radius,Z=[[-J,0,$],[J,0,$],[-J,0,-$],[J,0,-$],[0,$,J],[0,$,-J],[0,-$,J],[0,-$,-J],[$,J,0],[-$,J,0],[$,-J,0],[-$,-J,0]];for(let j=0;j<Z.length;++j)Z[j][0]+=Q.position[0],Z[j][1]+=Q.position[1],Z[j][2]+=Q.position[2];const N=[[0,4,1],[0,9,4],[9,5,4],[4,5,8],[4,8,1],[8,10,1],[8,3,10],[5,3,8],[5,2,3],[2,7,3],[7,10,3],[7,6,10],[7,11,6],[11,0,6],[0,1,6],[6,1,10],[9,0,11],[9,11,2],[9,2,5],[7,2,11]];for(let j of N){const H=Z[j[0]],O=Z[j[1]],Y=Z[j[2]];this._stackRenderers.pushLine(H,O,Q.color),this._stackRenderers.pushLine(O,Y,Q.color),this._stackRenderers.pushLine(Y,H,Q.color)}}_pushWireFrameBox(Q){const J=[M.fromValues(-Q.boxSize[0],-Q.boxSize[1],-Q.boxSize[2]),M.fromValues(+Q.boxSize[0],-Q.boxSize[1],-Q.boxSize[2]),M.fromValues(-Q.boxSize[0],+Q.boxSize[1],-Q.boxSize[2]),M.fromValues(+Q.boxSize[0],+Q.boxSize[1],-Q.boxSize[2]),M.fromValues(-Q.boxSize[0],-Q.boxSize[1],+Q.boxSize[2]),M.fromValues(+Q.boxSize[0],-Q.boxSize[1],+Q.boxSize[2]),M.fromValues(-Q.boxSize[0],+Q.boxSize[1],+Q.boxSize[2]),M.fromValues(+Q.boxSize[0],+Q.boxSize[1],+Q.boxSize[2])],$=[];J.forEach((Z)=>{const N=M.fromValues(0,0,0);M.transformMat4(N,Z,Q.matrix),$.push(N)}),[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[3,7],[2,6]].forEach((Z)=>{this._stackRenderers.pushLine($[Z[0]],$[Z[1]],Q.color)})}_pushWireFrameTriangle(Q){this._stackRenderers.pushLine(Q.v0,Q.v1,Q.color),this._stackRenderers.pushLine(Q.v1,Q.v2,Q.color),this._stackRenderers.pushLine(Q.v2,Q.v0,Q.color)}safeSceneWireFrame(Q){this._debugSceneCamera.setEye(this._rayTracerRenderer.camera.position),this._debugSceneCamera.setTarget(this._rayTracerRenderer.camera.target),this._debugSceneCamera.setUpAxis(this._rayTracerRenderer.camera.up),this._debugSceneCamera.computeMatrices(),this._stackRenderers.safeRender(this._debugSceneCamera.getComposedMatrix(),Q)}flushHudWireFrame(){this._stackRenderers.flush(this._mainHudCamera.getComposedMatrix())}flushHudText(){this._textRenderer.flush(this._mainHudCamera.getComposedMatrix())}setupDebugRenderer(){this._rayTracerRenderer.spheres.forEach((Q)=>this._pushWireFrameSphere(Q)),this._rayTracerRenderer.boxes.forEach((Q)=>this._pushWireFrameBox(Q)),this._rayTracerRenderer.triangles.forEach((Q)=>this._pushWireFrameTriangle(Q))}get rayTracerRenderer(){return this._rayTracerRenderer}get stackRenderers(){return this._stackRenderers}get textRenderer(){return this._textRenderer}}var a=0,g=0,b=0,j0=1,d=[[-5,4,0],[5,4,0],[5,10,0],[-5,10,0]];class A0{reset(){a=0,g=0,b=0,j0=1}run(Q,J){if(g+=J*2,g>=Math.PI*2)g-=Math.PI*2;if(a+=J*0.75,a>1)a=0,b=(b+1)%d.length,j0=(b+1)%d.length;const $=[d[b][0]+(d[j0][0]-d[b][0])*a,d[b][1]+(d[j0][1]-d[b][1])*a,d[b][2]+(d[j0][2]-d[b][2])*a];Q.rayTracerRenderer.pushSpotLight({position:[0,10,10],intensity:2,radius:20}),Q.rayTracerRenderer.pushSphere({position:[0,10,10],radius:0.25,color:[1,1,1],reflection:0,chessboard:!1,lightEnabled:!1,shadowEnabled:!1}),Q.rayTracerRenderer.pushSpotLight({position:$,intensity:2,radius:10}),Q.rayTracerRenderer.pushSphere({position:$,radius:0.25,color:[1,1,1],reflection:0,chessboard:!1,lightEnabled:!1,shadowEnabled:!1}),[{pos:[-2,4,-1],size:[1,1,0.125]},{pos:[-2,4,1],size:[1,1,0.125]},{pos:[-2,3,0],size:[1,0.125,1]},{pos:[-2,5,0],size:[1,0.125,1]},{pos:[2,4,-1],size:[1,1,0.125]},{pos:[2,4,1],size:[1,1,0.125]},{pos:[2,3,0],size:[1,0.125,1]},{pos:[2,5,0],size:[1,0.125,1]},{pos:[0,8,-8],size:[8,8,0.125],color:[0.5,0.5,1]},{pos:[-8,8,0],size:[0.125,8,8],color:[0.5,0.5,1]},{pos:[8,8,0],size:[0.125,8,8],color:[0.5,0.5,1]},{pos:[0,-0,0],size:[8,0.125,8],reflection:0.3}].forEach(({pos:Z,size:N,color:j,reflection:H})=>{Q.rayTracerRenderer.pushBox({position:Z,angleX:0,angleY:0,angleZ:0,boxSize:N,color:j??[1,1,1],reflection:H??0,chessboard:!1,lightEnabled:!0,shadowEnabled:!0})}),[{pos:[5+1*Math.cos(g),6,0+1*Math.sin(g)],angleY:-g,size:[0.125,1,1]},{pos:[5-1*Math.cos(g),8,0-1*Math.sin(g)],angleY:-g,size:[0.125,1,1]},{pos:[5+1*Math.cos(g+Math.PI*0.5),7,0+1*Math.sin(g+Math.PI*0.5)],angleY:-g+Math.PI*0.5,size:[0.125,2,1]},{pos:[5+1*Math.cos(g-Math.PI*0.5),7,0+1*Math.sin(g-Math.PI*0.5)],angleY:-g-Math.PI*0.5,size:[0.125,2,1]}].forEach(({pos:N,angleY:j,size:H})=>{Q.rayTracerRenderer.pushBox({position:N,angleX:0,angleY:j,angleZ:0,boxSize:H,color:[0,1,0],reflection:0,chessboard:!1,lightEnabled:!0,shadowEnabled:!0})})}}var X0=60;class _0{_canvasElement;_animationFrameHandle=0;_def;_freeFlyController;_renderer;_running;_errorGraphicContext;_currFrameTime=Date.now();_frameProfiler=new F0;_continuousTime=0;_perfAutoScalingEnabled=!0;_framesUntilNextCheck=X0;_scene=new A0;constructor(Q){this._canvasElement=Q.canvasElement,this._def=Q,this._freeFlyController=new R0({coordinates:["Z","X","Y"],position:[-10,13,15],theta:Math.PI*0.85,phi:-Math.PI*0.15,mouseSensibility:0.1,keyboardSensibility:Math.PI*0.45,touchSensibility:0.3,movingSpeed:10}),P.activate(),u.activate(this._canvasElement),I0.activate(),I0.addVisibilityChange((J)=>{if(J===!1)this._def.logger.log("document visibility changed: hidden"),this.stop();else this._def.logger.log("document visibility changed: visible"),this.start()}),l.allowPointerLockedOnClickEvent(this._canvasElement),l.addOnLockChange(()=>{if(l.isPointerLocked(this._canvasElement))this._def.logger.log("The pointer lock status is now locked"),r.activate();else this._def.logger.log("The pointer lock status is now unlocked"),r.deactivate(),l.allowPointerLockedOnClickEvent(this._canvasElement)}),l.addOnLockError((J)=>{this._def.logger.log(`The pointer lock sent an error, event: "${JSON.stringify(J)}"`)}),this._renderer=new w0({canvasDomElement:this._canvasElement}),this._renderer.initialize(),this._running=!1,this._errorGraphicContext=!1,this._def.resolution.addEventListener("input",(J)=>{const $=this._def.resolution.value;this._setResolution(11-$)}),this._def.anti_aliasing_enabled.addEventListener("click",()=>{const J=this._def.anti_aliasing_enabled.checked===!0;this._renderer.rayTracerRenderer.setAntiAliasing(J),this._def.logger.log(`Anti aliasing change: ${J===!0?"enabled":"disabled"}`)});{const J=this._def.resolution.value;this._setResolution(11-J)}this._def.logger.log("user interface initialized"),this._def.perfAutoScaling.addEventListener("input",()=>{this._framesUntilNextCheck=X0,this._perfAutoScalingEnabled=this._def.perfAutoScaling.checked===!0,this._def.logger.log(`Performance auto scaler change: ${this._perfAutoScalingEnabled===!0?"enabled":"disabled"}`)})}async init(){await this._renderer.initialize()}resize(Q,J,$){let U=Q,Z=J;if($)this._canvasElement.style.position="absolute",U=window.innerWidth,Z=window.innerHeight;else this._canvasElement.style.position="relative";this._canvasElement.style.left="0px",this._canvasElement.style.top="0px",this._canvasElement.style.width=`${U}px`,this._canvasElement.style.height=`${Z}px`,this._canvasElement.width=U,this._canvasElement.height=Z,this._renderer.resize(U,Z)}start(){if(this.isRunning())return;this._running=!0,this._tick()}stop(){if(!this.isRunning())return;this._running=!1,window.cancelAnimationFrame(this._animationFrameHandle)}isRunning(){return this._running&&!this._errorGraphicContext}_tick(){const Q=()=>{if(!this._running||this._errorGraphicContext)return;this._animationFrameHandle=window.requestAnimationFrame(Q),this._mainLoop()};Q()}_mainLoop(){const Q=Date.now();let J=Q-this._currFrameTime;this._currFrameTime=Q,this._frameProfiler.pushDelta(J),this._handlePerformanceAutoScaling(J);const $=J/1000;this._continuousTime+=$,this._freeFlyController.update($),r.resetDelta();{const N=D.getContext();N.disable(N.DEPTH_TEST)}if(this._continuousTime+=$,this._scene.run(this._renderer,$),this._renderer.rayTracerRenderer.lookAt(this._freeFlyController.getPosition(),this._freeFlyController.getTarget(),this._freeFlyController.getUpAxis()),this._renderer.rayTracerRenderer.render(),this._def.debug_mode_enabled.checked===!0)this._renderer.safeSceneWireFrame(()=>{this._renderer.setupDebugRenderer(),this._renderer.stackRenderers.pushLine([0,0,0],[100,0,0],[1,0,0]),this._renderer.stackRenderers.pushLine([0,0,0],[0,100,0],[0,1,0]),this._renderer.stackRenderers.pushLine([0,0,0],[0,0,100],[0,0,1])});const Z=D.getContext();Z.clear(Z.DEPTH_BUFFER_BIT),Z.enable(Z.DEPTH_TEST),Z.depthFunc(Z.LESS),XQ(this._canvasElement,this._renderer.stackRenderers,this._renderer.textRenderer),g0([10,this._canvasElement.height-60,0],[100,50],this._frameProfiler,this._renderer.stackRenderers,this._renderer.textRenderer,!0),this._renderer.flushHudWireFrame(),this._renderer.flushHudText(),this._renderer.rayTracerRenderer.reset()}_setResolution(Q){this._renderer.rayTracerRenderer.setResolutionCoef(1/Q);const J=this._renderer.rayTracerRenderer.getCurrentSize(),$=J[0]*J[1];this._def.logger.log(`resolution changed (1/${Q}) => ${J[0]}x${J[1]} (${$}px)`)}_handlePerformanceAutoScaling(Q){if(this._perfAutoScalingEnabled!==!0)return;if(Q<=20){this._framesUntilNextCheck=X0;return}if(--this._framesUntilNextCheck,this._framesUntilNextCheck>0)return;this._def.logger.log("performance auto scaling: slow framerate, scaling down resolution");const $=parseInt(this._def.resolution.value,10)-1;if($>=1&&$<=10)this._setResolution(11-$),this._def.resolution.value=`${$}`;this._framesUntilNextCheck=X0}}var rJ=async()=>{let Q,J=null;const $=async(Y)=>{if(Q)Q.error(Y.message);else console.error(Y.message);if(J)J.stop()};window.addEventListener("error",$),Q=new q0("loggerOutput"),Q.log("page loaded");const U=(Y)=>{const K=document.querySelector(Y);if(!K)throw new Error(`html element "${Y}" not found`);return K},Z=U("#rendering-canvas"),N=U("#auto-scaling-enabled"),j=U("#resolution"),H=U("#anti-aliasing-enabled"),O=U("#debug-mode-enabled");if(!m0())throw new Error("missing WebGL2 feature (unsupported)");J=new _0({canvasElement:Z,logger:Q,perfAutoScaling:N,resolution:j,anti_aliasing_enabled:H,debug_mode_enabled:O}),Q.log("initializing"),await J.init(),Q.log("initialized"),J.start(),Q.log("running")};window.addEventListener("load",rJ,!1);

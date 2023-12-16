var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// srcjects/webgl-ray-tracer/src/experiment
var exports_system = {};
__export(exports_system, {
  metrics: () => {
    {
      return exports_metrics;
    }
  },
  math: () => {
    {
      return exports_math;
    }
  },
  controllers: () => {
    {
      return exports_controllers;
    }
  },
  browser: () => {
    {
      return exports_browser;
    }
  }
});

// srcjects/webgl-ray-tracer/src/experiment/graphic
var exports_browser = {};
__export(exports_browser, {
  isWebWorkerSupported: () => {
    {
      return isWebWorkerSupported;
    }
  },
  isWebGL2Supported: () => {
    {
      return isWebGL2Supported;
    }
  },
  isNumber: () => {
    {
      return isNumber;
    }
  },
  isLetter: () => {
    {
      return isLetter;
    }
  },
  isAlphanumeric: () => {
    {
      return isAlphanumeric;
    }
  },
  GlobalVisibilityManager: () => {
    {
      return GlobalVisibilityManager;
    }
  },
  GlobalTouchManager: () => {
    {
      return GlobalTouchManager;
    }
  },
  GlobalPointerLockManager: () => {
    {
      return GlobalPointerLockManager;
    }
  },
  GlobalMouseManager: () => {
    {
      return GlobalMouseManager;
    }
  },
  GlobalKeyboardManager: () => {
    {
      return GlobalKeyboardManager;
    }
  },
  GlobalFullScreenManager: () => {
    {
      return GlobalFullScreenManager;
    }
  },
  AllKeyCodes: () => {
    {
      return AllKeyCodes;
    }
  }
});

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/
var allRequestEvents = [
  "requestFullscreen",
  "webkitRequestFullscreen",
  "mozRequestFullScreen",
  "msRequestFullscreen"
];
var allChangeEvents = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "mozfullscreenchange",
  "msfullscreenchange"
];

class FullScreenManager {
  _onFullScreenChangeCallbacks = [];
  _isInitialized = false;
  _initialize() {
    if (this._isInitialized) {
      return;
    }
    this._isInitialized = true;
    const onLockChange = () => {
      this._onFullScreenChangeCallbacks.forEach((callback) => callback());
    };
    for (const currEvent of allChangeEvents)
      document.addEventListener(currEvent, onLockChange, false);
  }
  isCompatible(inTargetElement) {
    for (const currEvent of allRequestEvents) {
      if (currEvent in inTargetElement) {
        return true;
      }
    }
    return false;
  }
  isFullScreen(inTargetElement) {
    return document.fullscreenElement === inTargetElement;
  }
  async requestFullScreen(inTargetElement) {
    if (this.isFullScreen(inTargetElement)) {
      return { success: false, message: "element already in full screen" };
    }
    this._initialize();
    for (const currEvent of allRequestEvents) {
      if (currEvent in inTargetElement) {
        inTargetElement[currEvent]();
        return { success: true, message: "request for full screen done" };
      }
    }
    return { success: false, message: "unsupported request for full screen" };
  }
  addOnFullScreenChange(inCallback) {
    this._onFullScreenChangeCallbacks.push(inCallback);
  }
  removeOnFullScreenChange(inCallback) {
    const index = this._onFullScreenChangeCallbacks.indexOf(inCallback);
    if (index < 0) {
      return;
    }
    this._onFullScreenChangeCallbacks.splice(index, 1);
  }
  removeAllCallbacks() {
    this._onFullScreenChangeCallbacks.length = 0;
  }
}
var GlobalFullScreenManager = new FullScreenManager;
// srcjects/webgl-ray-tracer/src/experiment/graphics/r
var AllKeyCodes = {
  Num0: 48,
  Num1: 49,
  Num2: 50,
  Num3: 51,
  Num4: 52,
  Num5: 53,
  Num6: 54,
  Num7: 55,
  Num8: 56,
  Num9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  Semicolon: 186,
  Equal: 187,
  Comma: 188,
  Minus: 189,
  Period: 190,
  BackQuote: 192,
  BracketLeft: 219,
  Backslash: 220,
  BracketRight: 221,
  Quote: 222,
  Shift: 16,
  Ctrl: 17,
  Alt: 18,
  CapsLock: 20,
  Tab: 9,
  Enter: 13,
  Pause: 19,
  Escape: 27,
  Space: 32,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
  PrintScreen: 44,
  Insert: 45,
  Delete: 46,
  ContextMenu: 93,
  ScrollLock: 145,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  F13: 124,
  F14: 125,
  F15: 126,
  F16: 127,
  F17: 128,
  F18: 129,
  F19: 130,
  F20: 131,
  F21: 132,
  F22: 133,
  F23: 134,
  F24: 135,
  NumPad0: 96,
  NumPad1: 97,
  NumPad2: 98,
  NumPad3: 99,
  NumPad4: 100,
  NumPad5: 101,
  NumPad6: 102,
  NumPad7: 103,
  NumPad8: 104,
  NumPad9: 105,
  NumPadMultiply: 106,
  NumPadAdd: 107,
  NumPadSubtract: 109,
  NumPadDecimal: 110,
  NumPadDivide: 111,
  NumLock: 144,
  NumPadComma: 194,
  NumPadEqual: 12
};
var isLetter = (key) => {
  return key >= AllKeyCodes.A && key <= AllKeyCodes.Z;
};
var isNumber = (key) => {
  return key >= AllKeyCodes.Num0 && key <= AllKeyCodes.Num9 || key >= AllKeyCodes.NumPad0 && key <= AllKeyCodes.NumPad9;
};
var isAlphanumeric = (key) => {
  return isNumber(key) || isLetter(key);
};

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderer
class KeyboardManager {
  _pressedKeysSet = new Set;
  _preventDefaultKeysSet = new Set;
  _activated = false;
  _handleKeyDown;
  _handleKeyUp;
  constructor() {
    const handleKeyDown = (event) => {
      const { keyCode } = event;
      if (this._preventDefaultKeysSet.has(keyCode))
        event.preventDefault();
      this._pressedKeysSet.add(keyCode);
    };
    const handleKeyUp = (event) => {
      const { keyCode } = event;
      if (this._preventDefaultKeysSet.has(keyCode))
        event.preventDefault();
      this._pressedKeysSet.delete(keyCode);
    };
    this._activated = false;
    this._handleKeyDown = handleKeyDown.bind(this);
    this._handleKeyUp = handleKeyUp.bind(this);
  }
  isPressed(...inKeys) {
    for (const key of inKeys) {
      if (this._pressedKeysSet.has(AllKeyCodes[key])) {
        return true;
      }
    }
    return false;
  }
  preventDefault(inKey) {
    this._preventDefaultKeysSet.add(AllKeyCodes[inKey]);
  }
  enableDefault(inKey) {
    this._preventDefaultKeysSet.delete(AllKeyCodes[inKey]);
  }
  activate() {
    if (this._activated) {
      return;
    }
    this._pressedKeysSet.clear();
    document.addEventListener("keydown", this._handleKeyDown);
    document.addEventListener("keyup", this._handleKeyUp);
    this._activated = true;
  }
  deactivate() {
    if (!this._activated) {
      return;
    }
    this._pressedKeysSet.clear();
    document.removeEventListener("keydown", this._handleKeyDown);
    document.removeEventListener("keyup", this._handleKeyUp);
    this._activated = false;
  }
}
var GlobalKeyboardManager = new KeyboardManager;
// srcjects/webgl-ray-tracer/src/experiment/graphics/rende
var AllMouseButtons = {
  Left: 0,
  Middle: 1,
  Right: 2
};

class MouseManager {
  _pressedButtonsSet = new Set;
  _activated = false;
  _handleMouseDown;
  _handleMouseUp;
  _handleMouseMove;
  _deltaX = 0;
  _deltaY = 0;
  constructor() {
    const handleMouseDown = (event) => {
      this._pressedButtonsSet.add(event.button);
    };
    const handleMouseUp = (event) => {
      this._pressedButtonsSet.delete(event.button);
    };
    const handleMouseMove = (event) => {
      this._deltaX += event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      this._deltaY += event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    };
    this._activated = false;
    this._handleMouseDown = handleMouseDown.bind(this);
    this._handleMouseUp = handleMouseUp.bind(this);
    this._handleMouseMove = handleMouseMove.bind(this);
  }
  activate() {
    if (this._activated) {
      return;
    }
    this._pressedButtonsSet.clear();
    document.addEventListener("mousedown", this._handleMouseDown);
    document.addEventListener("mouseup", this._handleMouseUp);
    document.addEventListener("mousemove", this._handleMouseMove);
    this._activated = true;
  }
  deactivate() {
    if (!this._activated) {
      return;
    }
    this._pressedButtonsSet.clear();
    document.removeEventListener("mousedown", this._handleMouseDown);
    document.removeEventListener("mouseup", this._handleMouseUp);
    document.removeEventListener("mousemove", this._handleMouseMove);
    this._activated = false;
  }
  isButtonPressed(inKey) {
    return this._pressedButtonsSet.has(AllMouseButtons[inKey]);
  }
  deltaX() {
    return this._deltaX;
  }
  deltaY() {
    return this._deltaY;
  }
  resetDeltas() {
    this._deltaX = 0;
    this._deltaY = 0;
  }
}
var GlobalMouseManager = new MouseManager;
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/r
var allRequestEvents2 = [
  "requestPointerLock",
  "mozRequestPointerLock",
  "webkitRequestPointerLock"
];
var allExitEvents = [
  "exitPointerLock",
  "mozExitPointerLock",
  "webkitExitPointerLock"
];
var allStateEvents = [
  "pointerLockElement",
  "mozPointerLockElement",
  "webkitPointerLockElement"
];
var allChangeEvents2 = [
  { methodName: "onpointerlockchange", propertyName: "pointerlockchange" },
  {
    methodName: "onmozpointerlockchange",
    propertyName: "mozpointerlockchange"
  },
  {
    methodName: "onwebkitpointerlockchange",
    propertyName: "webkitpointerlockchange"
  }
];
var allErrorEvents = [
  { methodName: "onpointerlockerror", propertyName: "pointerlockerror" },
  { methodName: "onmozpointerlockerror", propertyName: "mozpointerlockerror" },
  {
    methodName: "onwebkitpointerlockerror",
    propertyName: "webkitpointerlockerror"
  }
];

class PointerLockManager {
  _onLockChangeCallbacks = [];
  _onLockErrorCallbacks = [];
  _timeSinceLastLockChange = 0;
  _latestRequestHtmlElement;
  _isInitialized = false;
  _initialize() {
    if (this._isInitialized) {
      return;
    }
    this._isInitialized = true;
    const onLockChange = () => {
      this._timeSinceLastLockChange = Date.now();
      this._onLockChangeCallbacks.forEach((callback) => callback());
    };
    const onLockError = (event) => {
      this._timeSinceLastLockChange = Date.now();
      this._onLockErrorCallbacks.forEach((callback) => callback(event));
    };
    for (const currEvent of allChangeEvents2) {
      if (currEvent.methodName in document) {
        document.addEventListener(currEvent.propertyName, onLockChange, false);
        break;
      }
    }
    for (const currEvent of allErrorEvents) {
      if (currEvent.methodName in document) {
        document.addEventListener(currEvent.propertyName, onLockError, false);
        break;
      }
    }
  }
  canBePointerLocked(inTargetElement) {
    for (const currEvent of allRequestEvents2) {
      if (currEvent in inTargetElement) {
        return true;
      }
    }
    return false;
  }
  isPointerLocked(inTargetElement) {
    for (const currEvent of allStateEvents) {
      if (currEvent in document) {
        return document[currEvent] === inTargetElement;
      }
    }
    return false;
  }
  async requestPointerLock(inTargetElement) {
    if (this.isPointerLocked(inTargetElement)) {
      return { success: false, message: "element already locked" };
    }
    this._initialize();
    if (this._timeSinceLastLockChange > 0) {
      const elapsedSecTime = (Date.now() - this._timeSinceLastLockChange) / 1000;
      if (elapsedSecTime < 1.1) {
        return {
          success: false,
          message: `request for lock was too early, time to wait: ${elapsedSecTime.toFixed(2)}sec`
        };
      }
    }
    this._timeSinceLastLockChange = Date.now();
    for (const currEvent of allRequestEvents2) {
      if (currEvent in inTargetElement) {
        const options = {
          unadjustedMovement: false
        };
        try {
          await inTargetElement[currEvent](options);
        } catch (err) {
          const elapsedSecTime = (Date.now() - this._timeSinceLastLockChange) / 1000;
          return {
            success: false,
            message: `request for lock was too early, time to wait: ${elapsedSecTime.toFixed(2)}sec`
          };
        }
        this._timeSinceLastLockChange = Date.now();
        return { success: true, message: "request for lock done" };
      }
    }
    return { success: false, message: "unsupported request for lock" };
  }
  allowPointerLockedOnClickEvent(inTargetElement) {
    if (inTargetElement === this._latestRequestHtmlElement) {
      return;
    }
    this._latestRequestHtmlElement = inTargetElement;
    const onClick = async () => {
      inTargetElement.removeEventListener("click", onClick);
      const result = await this.requestPointerLock(inTargetElement);
      this._latestRequestHtmlElement = undefined;
      if (!result.success) {
        this.allowPointerLockedOnClickEvent(inTargetElement);
      }
    };
    inTargetElement.addEventListener("click", onClick);
  }
  exitPointerLock() {
    for (const currEvent of allExitEvents) {
      if (currEvent in document) {
        document[currEvent]();
        break;
      }
    }
  }
  addOnLockChange(inCallback) {
    this._onLockChangeCallbacks.push(inCallback);
  }
  removeOnLockChange(inCallback) {
    const index = this._onLockChangeCallbacks.indexOf(inCallback);
    if (index < 0) {
      return;
    }
    this._onLockChangeCallbacks.splice(index, 1);
  }
  addOnLockError(inCallback) {
    this._onLockErrorCallbacks.push(inCallback);
  }
  removeOnLockError(inCallback) {
    const index = this._onLockErrorCallbacks.indexOf(inCallback);
    if (index < 0) {
      return;
    }
    this._onLockErrorCallbacks.splice(index, 1);
  }
  removeAllCallbacks() {
    this._onLockChangeCallbacks.length = 0;
    this._onLockErrorCallbacks.length = 0;
  }
}
var GlobalPointerLockManager = new PointerLockManager;
// srcjects/webgl-ray-tracer/src/experiment/graphics/rende
class TouchData {
  id;
  createdAt = Date.now();
  positionX;
  positionY;
  deltaX = 0;
  deltaY = 0;
  constructor(id, positionX, positionY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
  }
  resetDelta() {
    this.deltaX = 0;
    this.deltaY = 0;
  }
}

class TouchManager {
  _activated = false;
  _allTouchDataMap = new Map;
  _allCachedTouchDataArray = [];
  _handleTouchStart;
  _handleTouchEnd;
  _handleTouchMove;
  constructor() {
    const handleTouchStart = (event) => {
      event.preventDefault();
      for (let ii = 0;ii < event.changedTouches.length; ++ii) {
        const { identifier, pageX, pageY } = event.changedTouches[ii];
        const newData = new TouchData(identifier, pageX, pageY);
        this._allTouchDataMap.set(`${identifier}`, newData);
        this._allCachedTouchDataArray.length = 0;
      }
    };
    const handleTouchEnd = (event) => {
      event.preventDefault();
      for (let ii = 0;ii < event.changedTouches.length; ++ii) {
        const { identifier } = event.changedTouches[ii];
        this._allTouchDataMap.delete(`${identifier}`);
        this._allCachedTouchDataArray.length = 0;
      }
    };
    const handleTouchMove = (event) => {
      event.preventDefault();
      for (let ii = 0;ii < event.changedTouches.length; ++ii) {
        const { identifier, pageX, pageY } = event.changedTouches[ii];
        const currData = this._allTouchDataMap.get(`${identifier}`);
        if (!currData) {
          continue;
        }
        const deltaX = pageX - currData.positionX;
        const deltaY = pageY - currData.positionY;
        currData.deltaX += deltaX;
        currData.deltaY += deltaY;
        currData.positionX = pageX;
        currData.positionY = pageY;
      }
    };
    this._activated = false;
    this._handleTouchStart = handleTouchStart.bind(this);
    this._handleTouchEnd = handleTouchEnd.bind(this);
    this._handleTouchMove = handleTouchMove.bind(this);
  }
  isSupported(inTargetElement) {
    return "ontouchstart" in inTargetElement;
  }
  activate(inTargetElement) {
    if (!this.isSupported(inTargetElement)) {
      return;
    }
    if (this._activated) {
      return;
    }
    this._allTouchDataMap.clear();
    this._allCachedTouchDataArray.length = 0;
    inTargetElement.addEventListener("touchstart", this._handleTouchStart);
    inTargetElement.addEventListener("touchend", this._handleTouchEnd);
    inTargetElement.addEventListener("touchcancel", this._handleTouchEnd);
    inTargetElement.addEventListener("touchmove", this._handleTouchMove, {
      passive: false
    });
    this._activated = true;
  }
  deactivate(inTargetElement) {
    if (!this._activated) {
      return;
    }
    this._allTouchDataMap.clear();
    this._allCachedTouchDataArray.length = 0;
    inTargetElement.removeEventListener("touchstart", this._handleTouchStart);
    inTargetElement.removeEventListener("touchend", this._handleTouchEnd);
    inTargetElement.removeEventListener("touchcancel", this._handleTouchEnd);
    inTargetElement.removeEventListener("touchmove", this._handleTouchMove);
    this._activated = false;
  }
  _refreshCache() {
    if (this._allCachedTouchDataArray.length === 0) {
      this._allCachedTouchDataArray = [...this._allTouchDataMap.values()];
    }
  }
  getTouchData() {
    this._refreshCache();
    return this._allCachedTouchDataArray;
  }
  resetDeltas() {
    this._refreshCache();
    this._allCachedTouchDataArray.forEach((item) => item.resetDelta());
  }
}
var GlobalTouchManager = new TouchManager;
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/
class VisibilityManager {
  _activated = false;
  _onVisibilityChangeCallbacks = [];
  _handleVisibilityChange;
  constructor() {
    const handleVisibilityChange = () => {
      const isVisible = this.isVisible();
      this._onVisibilityChangeCallbacks.forEach((callback) => callback(isVisible));
    };
    this._handleVisibilityChange = handleVisibilityChange.bind(this);
  }
  activate() {
    if (!this.isSupported()) {
      return;
    }
    if (this._activated) {
      return;
    }
    document.addEventListener("visibilitychange", this._handleVisibilityChange, false);
    this._activated = true;
  }
  deactivate() {
    if (!this._activated) {
      return;
    }
    document.removeEventListener("visibilitychange", this._handleVisibilityChange, false);
    this._activated = false;
  }
  isSupported() {
    return "onvisibilitychange" in document;
  }
  isVisible() {
    return document.visibilityState === "visible";
  }
  addVisibilityChange(inCallback) {
    this._onVisibilityChangeCallbacks.push(inCallback);
  }
  removeVisibilityChange(inCallback) {
    const index = this._onVisibilityChangeCallbacks.indexOf(inCallback);
    if (index < 0) {
      return;
    }
    this._onVisibilityChangeCallbacks.splice(index, 1);
  }
  removeAllCallbacks() {
    this._onVisibilityChangeCallbacks.length = 0;
  }
}
var GlobalVisibilityManager = new VisibilityManager;
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray
var isWebWorkerSupported = () => {
  return !!window.Worker;
};
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/
var isWebGL2Supported = () => {
  return !!window.WebGL2RenderingContext;
};
// srcjects/webgl-ray-tracer/src/experiment/graphic
var exports_metrics = {};
__export(exports_metrics, {
  FrameProfiler: () => {
    {
      return FrameProfiler;
    }
  }
});

// srcjects/webgl-ray-tracer/src/experiment/graphics/render
class FrameProfiler {
  _framesDelta = [];
  _averageDelta = 0;
  _minDelta = 0;
  _maxDelta = 0;
  pushDelta(inDelta) {
    if (this._framesDelta.length >= 100) {
      this._framesDelta.shift();
    }
    this._framesDelta.push(inDelta);
    this._minDelta = 999999999;
    this._maxDelta = -999999999;
    this._averageDelta = 0;
    for (const currDelta of this._framesDelta) {
      this._minDelta = Math.min(this._minDelta, currDelta);
      this._maxDelta = Math.max(this._maxDelta, currDelta);
      this._averageDelta += currDelta;
    }
    this._averageDelta /= this._framesDelta.length;
  }
  get framesDelta() {
    return this._framesDelta;
  }
  get averageDelta() {
    return this._averageDelta;
  }
  get minDelta() {
    return this._minDelta;
  }
  get maxDelta() {
    return this._maxDelta;
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/re
var exports_controllers = {};
__export(exports_controllers, {
  FreeFlyController: () => {
    {
      return FreeFlyController;
    }
  }
});

// srcjects/webgl-ray-tracer/src/experi
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var RANDOM = Math.random;
var degree = Math.PI / 180;
if (!Math.hypot)
  Math.hypot = function() {
    var y = 0, i = arguments.length;
    while (i--) {
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };

// srcjects/webgl-ray-tracer/src/expe
var exports_mat3 = {};
__export(exports_mat3, {
  transpose: () => {
    {
      return transpose;
    }
  },
  translate: () => {
    {
      return translate;
    }
  },
  subtract: () => {
    {
      return subtract;
    }
  },
  sub: () => {
    {
      return sub;
    }
  },
  str: () => {
    {
      return str;
    }
  },
  set: () => {
    {
      return set;
    }
  },
  scale: () => {
    {
      return scale;
    }
  },
  rotate: () => {
    {
      return rotate;
    }
  },
  projection: () => {
    {
      return projection;
    }
  },
  normalFromMat4: () => {
    {
      return normalFromMat4;
    }
  },
  multiplyScalarAndAdd: () => {
    {
      return multiplyScalarAndAdd;
    }
  },
  multiplyScalar: () => {
    {
      return multiplyScalar;
    }
  },
  multiply: () => {
    {
      return multiply;
    }
  },
  mul: () => {
    {
      return mul;
    }
  },
  invert: () => {
    {
      return invert;
    }
  },
  identity: () => {
    {
      return identity;
    }
  },
  fromValues: () => {
    {
      return fromValues;
    }
  },
  fromTranslation: () => {
    {
      return fromTranslation;
    }
  },
  fromScaling: () => {
    {
      return fromScaling;
    }
  },
  fromRotation: () => {
    {
      return fromRotation;
    }
  },
  fromQuat: () => {
    {
      return fromQuat;
    }
  },
  fromMat4: () => {
    {
      return fromMat4;
    }
  },
  fromMat2d: () => {
    {
      return fromMat2d;
    }
  },
  frob: () => {
    {
      return frob;
    }
  },
  exactEquals: () => {
    {
      return exactEquals;
    }
  },
  equals: () => {
    {
      return equals;
    }
  },
  determinant: () => {
    {
      return determinant;
    }
  },
  create: () => {
    {
      return create;
    }
  },
  copy: () => {
    {
      return copy;
    }
  },
  clone: () => {
    {
      return clone;
    }
  },
  adjoint: () => {
    {
      return adjoint;
    }
  },
  add: () => {
    {
      return add;
    }
  }
});
function create() {
  var out = new ARRAY_TYPE(9);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
function clone(a) {
  var out = new ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function transpose(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }
  return out;
}
function invert(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;
  var det = a00 * b01 + a01 * b11 + a02 * b21;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
function adjoint(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
function determinant(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
function multiply(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b00 = b[0], b01 = b[1], b02 = b[2];
  var b10 = b[3], b11 = b[4], b12 = b[5];
  var b20 = b[6], b21 = b[7], b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
function translate(out, a, v) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
function rotate(out, a, rad) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
function scale(out, a, v) {
  var x = v[0], y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
function fromRotation(out, rad) {
  var s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
function fromQuat(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
function normalFromMat4(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
function str(a) {
  return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}
function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
function multiplyScalarAndAdd(out, a, b, scale2) {
  out[0] = a[0] + b[0] * scale2;
  out[1] = a[1] + b[1] * scale2;
  out[2] = a[2] + b[2] * scale2;
  out[3] = a[3] + b[3] * scale2;
  out[4] = a[4] + b[4] * scale2;
  out[5] = a[5] + b[5] * scale2;
  out[6] = a[6] + b[6] * scale2;
  out[7] = a[7] + b[7] * scale2;
  out[8] = a[8] + b[8] * scale2;
  return out;
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
function equals(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
}
var mul = multiply;
var sub = subtract;

// srcjects/webgl-ray-tracer/src/expe
var exports_mat4 = {};
__export(exports_mat4, {
  transpose: () => {
    {
      return transpose2;
    }
  },
  translate: () => {
    {
      return translate2;
    }
  },
  targetTo: () => {
    {
      return targetTo;
    }
  },
  subtract: () => {
    {
      return subtract2;
    }
  },
  sub: () => {
    {
      return sub2;
    }
  },
  str: () => {
    {
      return str2;
    }
  },
  set: () => {
    {
      return set2;
    }
  },
  scale: () => {
    {
      return scale2;
    }
  },
  rotateZ: () => {
    {
      return rotateZ;
    }
  },
  rotateY: () => {
    {
      return rotateY;
    }
  },
  rotateX: () => {
    {
      return rotateX;
    }
  },
  rotate: () => {
    {
      return rotate2;
    }
  },
  perspectiveZO: () => {
    {
      return perspectiveZO;
    }
  },
  perspectiveNO: () => {
    {
      return perspectiveNO;
    }
  },
  perspectiveFromFieldOfView: () => {
    {
      return perspectiveFromFieldOfView;
    }
  },
  perspective: () => {
    {
      return perspective;
    }
  },
  orthoZO: () => {
    {
      return orthoZO;
    }
  },
  orthoNO: () => {
    {
      return orthoNO;
    }
  },
  ortho: () => {
    {
      return ortho;
    }
  },
  multiplyScalarAndAdd: () => {
    {
      return multiplyScalarAndAdd2;
    }
  },
  multiplyScalar: () => {
    {
      return multiplyScalar2;
    }
  },
  multiply: () => {
    {
      return multiply2;
    }
  },
  mul: () => {
    {
      return mul2;
    }
  },
  lookAt: () => {
    {
      return lookAt;
    }
  },
  invert: () => {
    {
      return invert2;
    }
  },
  identity: () => {
    {
      return identity2;
    }
  },
  getTranslation: () => {
    {
      return getTranslation;
    }
  },
  getScaling: () => {
    {
      return getScaling;
    }
  },
  getRotation: () => {
    {
      return getRotation;
    }
  },
  frustum: () => {
    {
      return frustum;
    }
  },
  fromZRotation: () => {
    {
      return fromZRotation;
    }
  },
  fromYRotation: () => {
    {
      return fromYRotation;
    }
  },
  fromXRotation: () => {
    {
      return fromXRotation;
    }
  },
  fromValues: () => {
    {
      return fromValues2;
    }
  },
  fromTranslation: () => {
    {
      return fromTranslation2;
    }
  },
  fromScaling: () => {
    {
      return fromScaling2;
    }
  },
  fromRotationTranslationScaleOrigin: () => {
    {
      return fromRotationTranslationScaleOrigin;
    }
  },
  fromRotationTranslationScale: () => {
    {
      return fromRotationTranslationScale;
    }
  },
  fromRotationTranslation: () => {
    {
      return fromRotationTranslation;
    }
  },
  fromRotation: () => {
    {
      return fromRotation2;
    }
  },
  fromQuat2: () => {
    {
      return fromQuat2;
    }
  },
  fromQuat: () => {
    {
      return fromQuat3;
    }
  },
  frob: () => {
    {
      return frob2;
    }
  },
  exactEquals: () => {
    {
      return exactEquals2;
    }
  },
  equals: () => {
    {
      return equals2;
    }
  },
  determinant: () => {
    {
      return determinant2;
    }
  },
  create: () => {
    {
      return create2;
    }
  },
  copy: () => {
    {
      return copy2;
    }
  },
  clone: () => {
    {
      return clone2;
    }
  },
  adjoint: () => {
    {
      return adjoint2;
    }
  },
  add: () => {
    {
      return add2;
    }
  }
});
function create2() {
  var out = new ARRAY_TYPE(16);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
function clone2(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function copy2(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function fromValues2(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function set2(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function identity2(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function transpose2(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a03 = a[3];
    var a12 = a[6], a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }
  return out;
}
function invert2(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
function adjoint2(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
function determinant2(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
function multiply2(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
function translate2(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }
  return out;
}
function scale2(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function rotate2(out, a, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;
  if (len < EPSILON) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  if (a !== out) {
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}
function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  if (a !== out) {
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
function fromTranslation2(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromScaling2(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotation2(out, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  if (len < EPSILON) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotationTranslation(out, q, v) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromQuat2(out, a) {
  var translation = new ARRAY_TYPE(3);
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw;
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation(out, a, translation);
  return out;
}
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }
  return out;
}
function fromRotationTranslationScale(out, q, v, s) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
function fromQuat3(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
function perspectiveNO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}
function perspectiveZO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -near;
  }
  return out;
}
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
  var xScale = 2 / (leftTan + rightTan);
  var yScale = 2 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = yScale;
  out[6] = 0;
  out[7] = 0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near / (near - far);
  out[15] = 0;
  return out;
}
function orthoNO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
function orthoZO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = near * nf;
  out[15] = 1;
  return out;
}
function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];
  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity2(out);
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }
  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
function targetTo(out, eye, target, up) {
  var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
  var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }
  var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
function str2(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob2(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
function add2(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
function subtract2(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
function multiplyScalar2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
function multiplyScalarAndAdd2(out, a, b, scale3) {
  out[0] = a[0] + b[0] * scale3;
  out[1] = a[1] + b[1] * scale3;
  out[2] = a[2] + b[2] * scale3;
  out[3] = a[3] + b[3] * scale3;
  out[4] = a[4] + b[4] * scale3;
  out[5] = a[5] + b[5] * scale3;
  out[6] = a[6] + b[6] * scale3;
  out[7] = a[7] + b[7] * scale3;
  out[8] = a[8] + b[8] * scale3;
  out[9] = a[9] + b[9] * scale3;
  out[10] = a[10] + b[10] * scale3;
  out[11] = a[11] + b[11] * scale3;
  out[12] = a[12] + b[12] * scale3;
  out[13] = a[13] + b[13] * scale3;
  out[14] = a[14] + b[14] * scale3;
  out[15] = a[15] + b[15] * scale3;
  return out;
}
function exactEquals2(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
function equals2(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
  var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
  var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
  var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
  var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
}
var perspective = perspectiveNO;
var ortho = orthoNO;
var mul2 = multiply2;
var sub2 = subtract2;

// srcjects/webgl-ray-tracer/src/expe
var exports_vec3 = {};
__export(exports_vec3, {
  zero: () => {
    {
      return zero;
    }
  },
  transformQuat: () => {
    {
      return transformQuat;
    }
  },
  transformMat4: () => {
    {
      return transformMat4;
    }
  },
  transformMat3: () => {
    {
      return transformMat3;
    }
  },
  subtract: () => {
    {
      return subtract3;
    }
  },
  sub: () => {
    {
      return sub3;
    }
  },
  str: () => {
    {
      return str3;
    }
  },
  squaredLength: () => {
    {
      return squaredLength;
    }
  },
  squaredDistance: () => {
    {
      return squaredDistance;
    }
  },
  sqrLen: () => {
    {
      return sqrLen;
    }
  },
  sqrDist: () => {
    {
      return sqrDist;
    }
  },
  set: () => {
    {
      return set3;
    }
  },
  scaleAndAdd: () => {
    {
      return scaleAndAdd;
    }
  },
  scale: () => {
    {
      return scale3;
    }
  },
  round: () => {
    {
      return round;
    }
  },
  rotateZ: () => {
    {
      return rotateZ2;
    }
  },
  rotateY: () => {
    {
      return rotateY2;
    }
  },
  rotateX: () => {
    {
      return rotateX2;
    }
  },
  random: () => {
    {
      return random;
    }
  },
  normalize: () => {
    {
      return normalize;
    }
  },
  negate: () => {
    {
      return negate;
    }
  },
  multiply: () => {
    {
      return multiply3;
    }
  },
  mul: () => {
    {
      return mul3;
    }
  },
  min: () => {
    {
      return min;
    }
  },
  max: () => {
    {
      return max;
    }
  },
  lerp: () => {
    {
      return lerp;
    }
  },
  length: () => {
    {
      return length;
    }
  },
  len: () => {
    {
      return len;
    }
  },
  inverse: () => {
    {
      return inverse;
    }
  },
  hermite: () => {
    {
      return hermite;
    }
  },
  fromValues: () => {
    {
      return fromValues3;
    }
  },
  forEach: () => {
    {
      return forEach;
    }
  },
  floor: () => {
    {
      return floor;
    }
  },
  exactEquals: () => {
    {
      return exactEquals3;
    }
  },
  equals: () => {
    {
      return equals3;
    }
  },
  dot: () => {
    {
      return dot;
    }
  },
  divide: () => {
    {
      return divide;
    }
  },
  div: () => {
    {
      return div;
    }
  },
  distance: () => {
    {
      return distance;
    }
  },
  dist: () => {
    {
      return dist;
    }
  },
  cross: () => {
    {
      return cross;
    }
  },
  create: () => {
    {
      return create3;
    }
  },
  copy: () => {
    {
      return copy3;
    }
  },
  clone: () => {
    {
      return clone3;
    }
  },
  ceil: () => {
    {
      return ceil;
    }
  },
  bezier: () => {
    {
      return bezier;
    }
  },
  angle: () => {
    {
      return angle;
    }
  },
  add: () => {
    {
      return add3;
    }
  }
});
function create3() {
  var out = new ARRAY_TYPE(3);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}
function clone3(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
function fromValues3(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function copy3(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function set3(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function add3(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
function subtract3(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
function multiply3(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
function scale3(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
function scaleAndAdd(out, a, b, scale4) {
  out[0] = a[0] + b[0] * scale4;
  out[1] = a[1] + b[1] * scale4;
  out[2] = a[2] + b[2] * scale4;
  return out;
}
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
function inverse(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  return out;
}
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2];
  var bx = b[0], by = b[1], bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function random(out, scale4) {
  scale4 = scale4 || 1;
  var r = RANDOM() * 2 * Math.PI;
  var z = RANDOM() * 2 - 1;
  var zScale = Math.sqrt(1 - z * z) * scale4;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale4;
  return out;
}
function transformMat4(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
function transformMat3(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
function transformQuat(out, a, q) {
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var x = a[0], y = a[1], z = a[2];
  var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
  var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
function rotateX2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateY2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateZ2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2];
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function angle(a, b) {
  var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}
function str3(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
function exactEquals3(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
function equals3(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2];
  var b0 = b[0], b1 = b[1], b2 = b[2];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
}
var sub3 = subtract3;
var mul3 = multiply3;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var len = length;
var sqrLen = squaredLength;
var forEach = function() {
  var vec = create3();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 3;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset;i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }
    return a;
  };
}();

// srcjects/webgl-ray-tracer/src/expe
var exports_vec4 = {};
__export(exports_vec4, {
  zero: () => {
    {
      return zero2;
    }
  },
  transformQuat: () => {
    {
      return transformQuat2;
    }
  },
  transformMat4: () => {
    {
      return transformMat42;
    }
  },
  subtract: () => {
    {
      return subtract4;
    }
  },
  sub: () => {
    {
      return sub4;
    }
  },
  str: () => {
    {
      return str4;
    }
  },
  squaredLength: () => {
    {
      return squaredLength2;
    }
  },
  squaredDistance: () => {
    {
      return squaredDistance2;
    }
  },
  sqrLen: () => {
    {
      return sqrLen2;
    }
  },
  sqrDist: () => {
    {
      return sqrDist2;
    }
  },
  set: () => {
    {
      return set4;
    }
  },
  scaleAndAdd: () => {
    {
      return scaleAndAdd2;
    }
  },
  scale: () => {
    {
      return scale4;
    }
  },
  round: () => {
    {
      return round2;
    }
  },
  random: () => {
    {
      return random2;
    }
  },
  normalize: () => {
    {
      return normalize2;
    }
  },
  negate: () => {
    {
      return negate2;
    }
  },
  multiply: () => {
    {
      return multiply4;
    }
  },
  mul: () => {
    {
      return mul4;
    }
  },
  min: () => {
    {
      return min2;
    }
  },
  max: () => {
    {
      return max2;
    }
  },
  lerp: () => {
    {
      return lerp2;
    }
  },
  length: () => {
    {
      return length2;
    }
  },
  len: () => {
    {
      return len2;
    }
  },
  inverse: () => {
    {
      return inverse2;
    }
  },
  fromValues: () => {
    {
      return fromValues4;
    }
  },
  forEach: () => {
    {
      return forEach2;
    }
  },
  floor: () => {
    {
      return floor2;
    }
  },
  exactEquals: () => {
    {
      return exactEquals4;
    }
  },
  equals: () => {
    {
      return equals4;
    }
  },
  dot: () => {
    {
      return dot2;
    }
  },
  divide: () => {
    {
      return divide2;
    }
  },
  div: () => {
    {
      return div2;
    }
  },
  distance: () => {
    {
      return distance2;
    }
  },
  dist: () => {
    {
      return dist2;
    }
  },
  cross: () => {
    {
      return cross2;
    }
  },
  create: () => {
    {
      return create4;
    }
  },
  copy: () => {
    {
      return copy4;
    }
  },
  clone: () => {
    {
      return clone4;
    }
  },
  ceil: () => {
    {
      return ceil2;
    }
  },
  add: () => {
    {
      return add4;
    }
  }
});
function create4() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }
  return out;
}
function clone4(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function fromValues4(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function copy4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function set4(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function add4(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
function subtract4(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
function multiply4(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
function divide2(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
function ceil2(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
function floor2(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
function min2(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
function max2(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
function round2(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
function scale4(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
function scaleAndAdd2(out, a, b, scale5) {
  out[0] = a[0] + b[0] * scale5;
  out[1] = a[1] + b[1] * scale5;
  out[2] = a[2] + b[2] * scale5;
  out[3] = a[3] + b[3] * scale5;
  return out;
}
function distance2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
function squaredDistance2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
function length2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
function squaredLength2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
function negate2(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
function inverse2(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  out[3] = 1 / a[3];
  return out;
}
function normalize2(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len2 = x * x + y * y + z * z + w * w;
  if (len2 > 0) {
    len2 = 1 / Math.sqrt(len2);
  }
  out[0] = x * len2;
  out[1] = y * len2;
  out[2] = z * len2;
  out[3] = w * len2;
  return out;
}
function dot2(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
function cross2(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0], B = v[0] * w[2] - v[2] * w[0], C = v[0] * w[3] - v[3] * w[0], D = v[1] * w[2] - v[2] * w[1], E = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
function lerp2(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
function random2(out, scale5) {
  scale5 = scale5 || 1;
  var v1, v2, v3, v4;
  var s1, s2;
  do {
    v1 = RANDOM() * 2 - 1;
    v2 = RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);
  do {
    v3 = RANDOM() * 2 - 1;
    v4 = RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);
  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale5 * v1;
  out[1] = scale5 * v2;
  out[2] = scale5 * v3 * d;
  out[3] = scale5 * v4 * d;
  return out;
}
function transformMat42(out, a, m) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
function transformQuat2(out, a, q) {
  var x = a[0], y = a[1], z = a[2];
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
function zero2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  return out;
}
function str4(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function exactEquals4(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals4(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
}
var sub4 = subtract4;
var mul4 = multiply4;
var div2 = divide2;
var dist2 = distance2;
var sqrDist2 = squaredDistance2;
var len2 = length2;
var sqrLen2 = squaredLength2;
var forEach2 = function() {
  var vec = create4();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 4;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset;i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }
    return a;
  };
}();

// srcjects/webgl-ray-tracer/src/expe
var exports_vec2 = {};
__export(exports_vec2, {
  zero: () => {
    {
      return zero3;
    }
  },
  transformMat4: () => {
    {
      return transformMat43;
    }
  },
  transformMat3: () => {
    {
      return transformMat32;
    }
  },
  transformMat2d: () => {
    {
      return transformMat2d;
    }
  },
  transformMat2: () => {
    {
      return transformMat2;
    }
  },
  subtract: () => {
    {
      return subtract5;
    }
  },
  sub: () => {
    {
      return sub5;
    }
  },
  str: () => {
    {
      return str5;
    }
  },
  squaredLength: () => {
    {
      return squaredLength3;
    }
  },
  squaredDistance: () => {
    {
      return squaredDistance3;
    }
  },
  sqrLen: () => {
    {
      return sqrLen3;
    }
  },
  sqrDist: () => {
    {
      return sqrDist3;
    }
  },
  set: () => {
    {
      return set5;
    }
  },
  scaleAndAdd: () => {
    {
      return scaleAndAdd3;
    }
  },
  scale: () => {
    {
      return scale5;
    }
  },
  round: () => {
    {
      return round3;
    }
  },
  rotate: () => {
    {
      return rotate3;
    }
  },
  random: () => {
    {
      return random3;
    }
  },
  normalize: () => {
    {
      return normalize3;
    }
  },
  negate: () => {
    {
      return negate3;
    }
  },
  multiply: () => {
    {
      return multiply5;
    }
  },
  mul: () => {
    {
      return mul5;
    }
  },
  min: () => {
    {
      return min3;
    }
  },
  max: () => {
    {
      return max3;
    }
  },
  lerp: () => {
    {
      return lerp3;
    }
  },
  length: () => {
    {
      return length3;
    }
  },
  len: () => {
    {
      return len3;
    }
  },
  inverse: () => {
    {
      return inverse3;
    }
  },
  fromValues: () => {
    {
      return fromValues5;
    }
  },
  forEach: () => {
    {
      return forEach3;
    }
  },
  floor: () => {
    {
      return floor3;
    }
  },
  exactEquals: () => {
    {
      return exactEquals5;
    }
  },
  equals: () => {
    {
      return equals5;
    }
  },
  dot: () => {
    {
      return dot3;
    }
  },
  divide: () => {
    {
      return divide3;
    }
  },
  div: () => {
    {
      return div3;
    }
  },
  distance: () => {
    {
      return distance3;
    }
  },
  dist: () => {
    {
      return dist3;
    }
  },
  cross: () => {
    {
      return cross3;
    }
  },
  create: () => {
    {
      return create5;
    }
  },
  copy: () => {
    {
      return copy5;
    }
  },
  clone: () => {
    {
      return clone5;
    }
  },
  ceil: () => {
    {
      return ceil3;
    }
  },
  angle: () => {
    {
      return angle2;
    }
  },
  add: () => {
    {
      return add5;
    }
  }
});
function create5() {
  var out = new ARRAY_TYPE(2);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}
function clone5(a) {
  var out = new ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function fromValues5(x, y) {
  var out = new ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
function copy5(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function set5(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
function add5(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
function subtract5(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
function multiply5(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
function divide3(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
function ceil3(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
function floor3(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
function min3(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
function max3(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
function round3(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
function scale5(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
function scaleAndAdd3(out, a, b, scale6) {
  out[0] = a[0] + b[0] * scale6;
  out[1] = a[1] + b[1] * scale6;
  return out;
}
function distance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return Math.hypot(x, y);
}
function squaredDistance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return x * x + y * y;
}
function length3(a) {
  var x = a[0], y = a[1];
  return Math.hypot(x, y);
}
function squaredLength3(a) {
  var x = a[0], y = a[1];
  return x * x + y * y;
}
function negate3(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
function inverse3(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  return out;
}
function normalize3(out, a) {
  var x = a[0], y = a[1];
  var len3 = x * x + y * y;
  if (len3 > 0) {
    len3 = 1 / Math.sqrt(len3);
  }
  out[0] = a[0] * len3;
  out[1] = a[1] * len3;
  return out;
}
function dot3(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
function cross3(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
function lerp3(out, a, b, t) {
  var ax = a[0], ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
function random3(out, scale6) {
  scale6 = scale6 || 1;
  var r = RANDOM() * 2 * Math.PI;
  out[0] = Math.cos(r) * scale6;
  out[1] = Math.sin(r) * scale6;
  return out;
}
function transformMat2(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
function transformMat2d(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
function transformMat32(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
function transformMat43(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
function rotate3(out, a, b, rad) {
  var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad);
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
function angle2(a, b) {
  var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2), cosine = mag && (x1 * x2 + y1 * y2) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero3(out) {
  out[0] = 0;
  out[1] = 0;
  return out;
}
function str5(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
function exactEquals5(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
function equals5(a, b) {
  var a0 = a[0], a1 = a[1];
  var b0 = b[0], b1 = b[1];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
}
var len3 = length3;
var sub5 = subtract5;
var mul5 = multiply5;
var div3 = divide3;
var dist3 = distance3;
var sqrDist3 = squaredDistance3;
var sqrLen3 = squaredLength3;
var forEach3 = function() {
  var vec = create5();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 2;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset;i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }
    return a;
  };
}();

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-
var AllAxises = {
  X: 0,
  Y: 1,
  Z: 2
};

class FreeFlyController {
  _isActivated = false;
  _theta = 0;
  _phi = 0;
  _mouseSensibility;
  _keyboardSensibility;
  _touchSensibility;
  _movingSpeed;
  _touchWasActive = false;
  _touchStartTime = 0;
  _touchMoveForward = false;
  _axisIndices;
  _position = exports_vec3.fromValues(0, 0, 0);
  _target = exports_vec3.fromValues(0, 0, 0);
  _forwardAxis = exports_vec3.fromValues(1, 0, 0);
  _leftAxis = exports_vec3.fromValues(0, 0, 1);
  _upAxis = exports_vec3.fromValues(0, 1, 0);
  constructor(def) {
    this._mouseSensibility = def.mouseSensibility;
    this._keyboardSensibility = def.keyboardSensibility;
    this._touchSensibility = def.touchSensibility;
    this._movingSpeed = def.movingSpeed;
    exports_vec3.copy(this._position, def.position);
    this._axisIndices = [
      def.coordinates ? AllAxises[def.coordinates[0]] : AllAxises.X,
      def.coordinates ? AllAxises[def.coordinates[1]] : AllAxises.Y,
      def.coordinates ? AllAxises[def.coordinates[2]] : AllAxises.Z
    ];
    this._theta = def.theta;
    this._phi = def.phi;
  }
  isActivated() {
    return this._isActivated;
  }
  update(deltaMsTime) {
    let moveForward = false;
    let moveBackward = false;
    let strafeLeft = false;
    let strafeRight = false;
    let isRunning = false;
    let isDiving = false;
    let isRising = false;
    let lookDeltaX = 0;
    let lookDeltaY = 0;
    const toRadians = Math.PI / 180;
    {
      const deltaX = GlobalMouseManager.deltaX() * this._mouseSensibility;
      const deltaY = GlobalMouseManager.deltaY() * this._mouseSensibility;
      lookDeltaX -= deltaX * toRadians * deltaMsTime;
      lookDeltaY -= deltaY * toRadians * deltaMsTime;
    }
    const isTouched = GlobalTouchManager.getTouchData().length > 0;
    if (isTouched) {
      if (!this._touchWasActive) {
        const currTime = Date.now();
        const elapsed = (currTime - this._touchStartTime) / 1000;
        if (elapsed < 0.25) {
          this._touchMoveForward = true;
        } else {
          this._touchStartTime = currTime;
        }
      }
      const firstTouch = GlobalTouchManager.getTouchData()[0];
      const deltaX = firstTouch.deltaX * this._touchSensibility;
      const deltaY = firstTouch.deltaY * this._touchSensibility;
      lookDeltaX -= deltaX * toRadians * deltaMsTime;
      lookDeltaY -= deltaY * toRadians * deltaMsTime;
    } else {
      this._touchMoveForward = false;
    }
    this._touchWasActive = isTouched;
    if (this._touchMoveForward) {
      moveForward = true;
    }
    if (GlobalKeyboardManager.isPressed("Z", "W")) {
      moveForward = true;
    }
    if (GlobalKeyboardManager.isPressed("S")) {
      moveBackward = true;
    }
    if (GlobalKeyboardManager.isPressed("A", "Q")) {
      strafeLeft = true;
    }
    if (GlobalKeyboardManager.isPressed("D")) {
      strafeRight = true;
    }
    if (GlobalKeyboardManager.isPressed("Shift")) {
      isRunning = true;
    }
    if (GlobalKeyboardManager.isPressed("C")) {
      isDiving = true;
    }
    if (GlobalKeyboardManager.isPressed("Space")) {
      isRising = true;
    }
    const currentLinearSpeed = this._movingSpeed * (isRunning ? 4 : 1) * deltaMsTime;
    const scaledForward = exports_vec3.fromValues(0, 0, 0);
    exports_vec3.scale(scaledForward, this._forwardAxis, currentLinearSpeed);
    const scaledLeft = exports_vec3.fromValues(0, 0, 0);
    exports_vec3.scale(scaledLeft, this._leftAxis, currentLinearSpeed);
    const scaledUp = exports_vec3.fromValues(0, 0, 0);
    exports_vec3.scale(scaledUp, this._upAxis, currentLinearSpeed);
    const currentAngularSpeed = this._keyboardSensibility * deltaMsTime;
    if (GlobalKeyboardManager.isPressed("ArrowUp")) {
      lookDeltaY += currentAngularSpeed;
    } else if (GlobalKeyboardManager.isPressed("ArrowDown")) {
      lookDeltaY -= currentAngularSpeed;
    }
    if (GlobalKeyboardManager.isPressed("ArrowLeft")) {
      lookDeltaX += currentAngularSpeed;
    } else if (GlobalKeyboardManager.isPressed("ArrowRight")) {
      lookDeltaX -= currentAngularSpeed;
    }
    this._theta += lookDeltaX;
    this._phi += lookDeltaY;
    const hPi = Math.PI * 0.5;
    const verticalLimit = hPi * 0.95;
    this._phi = Math.min(Math.max(this._phi, -verticalLimit), +verticalLimit);
    const cosTheta = Math.cos(this._theta);
    const sinTheta = Math.sin(this._theta);
    const [axisX, axisY, axisZ] = this._axisIndices;
    const upRadius = Math.cos(this._phi + hPi);
    this._upAxis[axisX] = upRadius * cosTheta;
    this._upAxis[axisY] = upRadius * sinTheta;
    this._upAxis[axisZ] = Math.sin(this._phi + hPi);
    const forwardRadius = Math.cos(this._phi);
    this._forwardAxis[axisX] = forwardRadius * cosTheta;
    this._forwardAxis[axisY] = forwardRadius * sinTheta;
    this._forwardAxis[axisZ] = Math.sin(this._phi);
    exports_vec3.cross(this._leftAxis, this._upAxis, this._forwardAxis);
    if (moveForward) {
      exports_vec3.add(this._position, this._position, scaledForward);
    } else if (moveBackward) {
      exports_vec3.sub(this._position, this._position, scaledForward);
    }
    if (strafeLeft) {
      exports_vec3.add(this._position, this._position, scaledLeft);
    } else if (strafeRight) {
      exports_vec3.sub(this._position, this._position, scaledLeft);
    }
    if (isRising) {
      exports_vec3.add(this._position, this._position, scaledUp);
    } else if (isDiving) {
      exports_vec3.sub(this._position, this._position, scaledUp);
    }
    exports_vec3.add(this._target, this._position, this._forwardAxis);
  }
  getPosition() {
    return this._position;
  }
  setPosition(inPos) {
    exports_vec3.copy(this._position, inPos);
  }
  getTarget() {
    return this._target;
  }
  getUpAxis() {
    return this._upAxis;
  }
  getTheta() {
    return this._theta;
  }
  getPhi() {
    return this._phi;
  }
  getTouchMoveForward() {
    return this._touchMoveForward;
  }
}
// srcjects/webgl-ray-tracer/src/experiment/grap
var exports_math = {};
__export(exports_math, {
  ik: () => {
    {
      return exports_inverse_kinematic;
    }
  },
  clamp: () => {
    {
      return clamp;
    }
  }
});

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray
var exports_inverse_kinematic = {};
__export(exports_inverse_kinematic, {
  circleCircleIntersectionPoints: () => {
    {
      return circleCircleIntersectionPoints;
    }
  },
  LimbData: () => {
    {
      return LimbData;
    }
  }
});

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/
var EPS = 0.0000001;
var _safeAcos = (x) => {
  if (x >= 1)
    return 0;
  if (x <= -1)
    return Math.PI;
  return Math.acos(x);
};
var _rotatePoint = (fp, pt, a) => {
  const x = pt[0] - fp[0];
  const y = pt[1] - fp[1];
  const xRot = x * Math.cos(a) + y * Math.sin(a);
  const yRot = y * Math.cos(a) - x * Math.sin(a);
  return exports_vec2.fromValues(fp[0] + xRot, fp[1] + yRot);
};
var circleCircleIntersectionPoints = (c1, c2) => {
  let r1, R2, d, dx, dy, c1x, c1y, C2x, C2y;
  if (c1.radius < c2.radius) {
    r1 = c1.radius;
    R2 = c2.radius;
    c1x = c1.center[0];
    c1y = c1.center[1];
    C2x = c2.center[0];
    C2y = c2.center[1];
  } else {
    r1 = c2.radius;
    R2 = c1.radius;
    C2x = c1.center[0];
    C2y = c1.center[1];
    c1x = c2.center[0];
    c1y = c2.center[1];
  }
  dx = c1x - C2x;
  dy = c1y - C2y;
  d = Math.sqrt(dx * dx + dy * dy);
  if (d < EPS && Math.abs(R2 - r1) < EPS)
    return;
  if (d < EPS)
    return;
  const x = dx / d * R2 + C2x;
  const y = dy / d * R2 + C2y;
  const P = exports_vec2.fromValues(x, y);
  if (Math.abs(R2 + r1 - d) < EPS || Math.abs(R2 - (r1 + d)) < EPS) {
    return [P];
  }
  if (d + r1 < R2 || R2 + r1 < d)
    return;
  const C = exports_vec2.fromValues(C2x, C2y);
  const angle3 = _safeAcos((r1 * r1 - d * d - R2 * R2) / (-2 * d * R2));
  const pt1 = _rotatePoint(C, P, +angle3);
  const pt2 = _rotatePoint(C, P, -angle3);
  return [pt1, pt2];
};
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-
class LimbData {
  rootMat4;
  primaryLength;
  secondaryLength;
  constructor(rootMat4, primaryLength, secondaryLength) {
    this.rootMat4 = rootMat4;
    this.primaryLength = primaryLength;
    this.secondaryLength = secondaryLength;
  }
  computeIk_fixedYaw(inWorldTarget, inWorldForward) {
    const invRootMat4 = exports_mat4.invert(exports_mat4.create(), this.rootMat4);
    const rawLocalTarget = exports_vec3.transformMat4(exports_vec3.create(), inWorldTarget, invRootMat4);
    const rawLocalForward = exports_vec3.transformMat4(exports_vec3.create(), inWorldForward, invRootMat4);
    const primaryYaw = Math.atan2(rawLocalForward[1], rawLocalForward[0]);
    const tmpYawAlignedMat4 = exports_mat4.identity(exports_mat4.create());
    exports_mat4.rotate(tmpYawAlignedMat4, tmpYawAlignedMat4, primaryYaw, [0, 0, 1]);
    const tmpRollTarget = exports_vec3.transformMat4(exports_vec3.create(), rawLocalTarget, exports_mat4.invert(tmpYawAlignedMat4, tmpYawAlignedMat4));
    const primaryRoll = Math.atan2(tmpRollTarget[1], -tmpRollTarget[2]);
    const result = {
      success: false,
      baseMat4: exports_mat4.identity(exports_mat4.create()),
      primaryQuatAxises: [
        { axis: [0, 0, 1], angle: primaryYaw },
        { axis: [1, 0, 0], angle: primaryRoll }
      ],
      jointA: {
        localPos: exports_vec3.create(),
        primaryPitch: 0,
        secondaryPitch: 0,
        primaryQuatAxis: { axis: [0, 1, 0], angle: 0 },
        secondaryQuatAxis: { axis: [0, 1, 0], angle: 0 }
      },
      jointB: {
        localPos: exports_vec3.create(),
        primaryPitch: 0,
        secondaryPitch: 0,
        primaryQuatAxis: { axis: [0, 1, 0], angle: 0 },
        secondaryQuatAxis: { axis: [0, 1, 0], angle: 0 }
      },
      localTarget: exports_vec3.create()
    };
    exports_mat4.rotate(result.baseMat4, result.baseMat4, primaryYaw, [0, 0, 1]);
    exports_mat4.rotate(result.baseMat4, result.baseMat4, primaryRoll, [1, 0, 0]);
    exports_vec3.transformMat4(result.localTarget, rawLocalTarget, exports_mat4.invert(exports_mat4.create(), result.baseMat4));
    if (this._computeIk_joints(result)) {
      return result;
    }
  }
  computeIk_fixedRoll(inWorldTarget, inWorldRoll) {
    const invRootMat4 = exports_mat4.invert(exports_mat4.create(), this.rootMat4);
    const rawLocalTarget = exports_vec3.transformMat4(exports_vec3.create(), inWorldTarget, invRootMat4);
    const rawLocalRoll = exports_vec3.transformMat3(exports_vec3.create(), inWorldRoll, exports_mat3.fromMat4(exports_mat3.create(), invRootMat4));
    const primaryRoll = Math.atan2(rawLocalRoll[1], rawLocalRoll[0]);
    const tmpRollAlignedMat4 = exports_mat4.identity(exports_mat4.create());
    exports_mat4.rotate(tmpRollAlignedMat4, tmpRollAlignedMat4, primaryRoll, [1, 0, 0]);
    const tmpThetaTarget = exports_vec3.transformMat4(exports_vec3.create(), rawLocalTarget, exports_mat4.invert(tmpRollAlignedMat4, tmpRollAlignedMat4));
    const primaryYaw = Math.atan2(tmpThetaTarget[1], tmpThetaTarget[0]);
    const result = {
      success: false,
      baseMat4: exports_mat4.identity(exports_mat4.create()),
      primaryQuatAxises: [
        { axis: [1, 0, 0], angle: primaryRoll },
        { axis: [0, 0, 1], angle: primaryYaw }
      ],
      jointA: {
        localPos: exports_vec3.create(),
        primaryPitch: 0,
        secondaryPitch: 0,
        primaryQuatAxis: { axis: [0, 1, 0], angle: 0 },
        secondaryQuatAxis: { axis: [0, 1, 0], angle: 0 }
      },
      jointB: {
        localPos: exports_vec3.create(),
        primaryPitch: 0,
        secondaryPitch: 0,
        primaryQuatAxis: { axis: [0, 1, 0], angle: 0 },
        secondaryQuatAxis: { axis: [0, 1, 0], angle: 0 }
      },
      localTarget: exports_vec3.create()
    };
    exports_mat4.rotate(result.baseMat4, result.baseMat4, primaryRoll, [1, 0, 0]);
    exports_mat4.rotate(result.baseMat4, result.baseMat4, primaryYaw, [0, 0, 1]);
    exports_vec3.transformMat4(result.localTarget, rawLocalTarget, exports_mat4.invert(exports_mat4.create(), result.baseMat4));
    if (this._computeIk_joints(result)) {
      return result;
    }
  }
  _computeIk_joints(result) {
    const circleA = { center: [0, 0], radius: this.primaryLength };
    const circleB = { center: [result.localTarget[0], result.localTarget[2]], radius: this.secondaryLength };
    const subResult = circleCircleIntersectionPoints(circleA, circleB);
    if (!subResult) {
      result.success = false;
      return false;
    }
    result.jointA.localPos[0] = subResult[0][0];
    result.jointA.localPos[1] = 0;
    result.jointA.localPos[2] = subResult[0][1];
    result.jointA.primaryPitch = Math.atan2(-result.jointA.localPos[2], result.jointA.localPos[0]);
    result.jointA.primaryQuatAxis.angle = result.jointA.primaryPitch;
    const diffSecondaryA = exports_vec3.sub(exports_vec3.create(), result.localTarget, result.jointA.localPos);
    result.jointA.secondaryPitch = Math.atan2(diffSecondaryA[2], diffSecondaryA[0]);
    result.jointA.secondaryQuatAxis.angle = -result.jointA.secondaryPitch - result.jointA.primaryPitch;
    const tmpResult = subResult[1] || subResult[0];
    result.jointB.localPos[0] = tmpResult[0];
    result.jointB.localPos[1] = 0;
    result.jointB.localPos[2] = tmpResult[1];
    result.jointB.primaryPitch = Math.atan2(-result.jointB.localPos[2], result.jointB.localPos[0]);
    result.jointB.primaryQuatAxis.angle = result.jointB.primaryPitch;
    const diffSecondaryB = exports_vec3.sub(exports_vec3.create(), result.localTarget, result.jointB.localPos);
    result.jointB.secondaryPitch = Math.atan2(diffSecondaryB[2], diffSecondaryB[0]);
    result.jointB.secondaryQuatAxis.angle = -result.jointB.secondaryPitch - result.jointB.primaryPitch;
    result.success = true;
    return true;
  }
  extractBaseTransform(result, outMat4) {
    exports_mat4.multiply(outMat4, this.rootMat4, result.baseMat4);
  }
  extractPrimaryTransform(result, joint, outMat4) {
    this.extractBaseTransform(result, outMat4);
    exports_mat4.rotate(outMat4, outMat4, joint.primaryPitch, [0, 1, 0]);
  }
  extractSecondaryTransform(result, joint, outMat4) {
    this.extractPrimaryTransform(result, joint, outMat4);
    exports_mat4.translate(outMat4, outMat4, [this.primaryLength, 0, 0]);
    exports_mat4.rotate(outMat4, outMat4, -joint.secondaryPitch - joint.primaryPitch, [0, 1, 0]);
  }
  extractTransforms(result, joint, baseMat4, primaryMat4, secondaryMat4) {
    this.extractBaseTransform(result, baseMat4);
    primaryMat4 = exports_mat4.rotate(primaryMat4, baseMat4, joint.primaryPitch, [0, 1, 0]);
    exports_mat4.translate(secondaryMat4, primaryMat4, [this.primaryLength, 0, 0]);
    exports_mat4.rotate(secondaryMat4, secondaryMat4, -joint.secondaryPitch - joint.primaryPitch, [0, 1, 0]);
  }
}
// srcjects/webgl-ray-tracer/src/experiment/grap
var clamp = (val, minVal, maxVal) => {
  return Math.min(Math.max(val, minVal), maxVal);
};
// srcjects/webgl-ray-tracer/src/experiment/g
var exports_graphics = {};
__export(exports_graphics, {
  webgl2: () => {
    {
      return exports_webgl2;
    }
  },
  renderers: () => {
    {
      return exports_renderers;
    }
  },
  geometries: () => {
    {
      return exports_build_geometries;
    }
  },
  camera: () => {
    {
      return exports_camera;
    }
  }
});

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers
var exports_build_geometries = {};
__export(exports_build_geometries, {
  generateWireFrameFrustumVertices: () => {
    {
      return generateWireFrameFrustumVertices;
    }
  },
  generateSphereVertices: () => {
    {
      return generateSphereVertices;
    }
  },
  generateSphereTriangles: () => {
    {
      return generateSphereTriangles;
    }
  },
  generateBoxVertices: () => {
    {
      return generateBoxVertices;
    }
  }
});

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-re
var generateBoxVertices = (inSize) => {
  const hSizeX = inSize[0] * 0.5;
  const hSizeY = inSize[1] * 0.5;
  const hSizeZ = inSize[2] * 0.5;
  const k_normals = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1]
  ];
  const k_vertices = [
    [-hSizeX, -hSizeY, -hSizeZ],
    [+hSizeX, -hSizeY, -hSizeZ],
    [-hSizeX, +hSizeY, -hSizeZ],
    [+hSizeX, +hSizeY, -hSizeZ],
    [-hSizeX, -hSizeY, +hSizeZ],
    [+hSizeX, -hSizeY, +hSizeZ],
    [-hSizeX, +hSizeY, +hSizeZ],
    [+hSizeX, +hSizeY, +hSizeZ]
  ];
  const k_indices = [
    [0, 2, 1, 4],
    [2, 3, 1, 4],
    [4, 5, 6, 5],
    [6, 5, 7, 5],
    [1, 3, 5, 1],
    [5, 3, 7, 1],
    [0, 4, 2, 0],
    [4, 6, 2, 0],
    [2, 6, 3, 3],
    [6, 7, 3, 3],
    [0, 1, 4, 2],
    [4, 1, 5, 2]
  ];
  const vertices = [];
  for (const index of k_indices) {
    const vertex1 = k_vertices[index[0]];
    const vertex2 = k_vertices[index[1]];
    const vertex3 = k_vertices[index[2]];
    const normal = k_normals[index[3]];
    vertices.push(vertex1[0], vertex1[1], vertex1[2], normal[0], normal[1], normal[2], vertex2[0], vertex2[1], vertex2[2], normal[0], normal[1], normal[2], vertex3[0], vertex3[1], vertex3[2], normal[0], normal[1], normal[2]);
  }
  return vertices;
};
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tra
var computeNormal = (inPosA, inPosB, inPosC) => {
  const normal = exports_vec3.cross(exports_vec3.create(), exports_vec3.sub(exports_vec3.create(), inPosA, inPosB), exports_vec3.sub(exports_vec3.create(), inPosA, inPosC));
  const magnitude = exports_vec3.length(normal);
  if (magnitude > 0) {
    normal[0] /= magnitude;
    normal[1] /= magnitude;
    normal[2] /= magnitude;
  }
  return normal;
};

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-rendere
var convertToPerFacesNormals = (vertices) => {
  for (let index = 0;index < vertices.length; index += 18) {
    const indexA = index + 0;
    const indexB = index + 6;
    const indexC = index + 12;
    const posA = [vertices[indexA + 0], vertices[indexA + 1], vertices[indexA + 2]];
    const posB = [vertices[indexB + 0], vertices[indexB + 1], vertices[indexB + 2]];
    const posC = [vertices[indexC + 0], vertices[indexC + 1], vertices[indexC + 2]];
    const normal = computeNormal(posA, posB, posC);
    vertices[indexA + 3] = normal[0];
    vertices[indexA + 4] = normal[1];
    vertices[indexA + 5] = normal[2];
    vertices[indexB + 3] = normal[0];
    vertices[indexB + 4] = normal[1];
    vertices[indexB + 5] = normal[2];
    vertices[indexC + 3] = normal[0];
    vertices[indexC + 4] = normal[1];
    vertices[indexC + 5] = normal[2];
  }
};

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-render
var _exploreSpherePatch = (quality, v01, v02, v03, onTriangle) => {
  if (quality <= 0) {
    onTriangle(v02, v01, v03);
  } else {
    const v12 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v01, v02, 0.5));
    const v23 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v02, v03, 0.5));
    const v31 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v03, v01, 0.5));
    quality -= 1;
    _exploreSpherePatch(quality, v01, v12, v31, onTriangle);
    _exploreSpherePatch(quality, v12, v02, v23, onTriangle);
    _exploreSpherePatch(quality, v31, v23, v03, onTriangle);
    _exploreSpherePatch(quality, v12, v23, v31, onTriangle);
  }
};
var generateSphereTriangles = (quality, onTriangle) => {
  const k_icx = 0.5257311121191336;
  const k_icz = 0.8506508083520399;
  const tmpVertices = [
    [-k_icx, 0, +k_icz],
    [+k_icx, 0, +k_icz],
    [-k_icx, 0, -k_icz],
    [+k_icx, 0, -k_icz],
    [0, +k_icz, +k_icx],
    [0, +k_icz, -k_icx],
    [0, -k_icz, +k_icx],
    [0, -k_icz, -k_icx],
    [+k_icz, +k_icx, 0],
    [-k_icz, +k_icx, 0],
    [+k_icz, -k_icx, 0],
    [-k_icz, -k_icx, 0]
  ];
  const tmpIndices = [
    [0, 4, 1],
    [0, 9, 4],
    [9, 5, 4],
    [4, 5, 8],
    [4, 8, 1],
    [8, 10, 1],
    [8, 3, 10],
    [5, 3, 8],
    [5, 2, 3],
    [2, 7, 3],
    [7, 10, 3],
    [7, 6, 10],
    [7, 11, 6],
    [11, 0, 6],
    [0, 1, 6],
    [6, 1, 10],
    [9, 0, 11],
    [9, 11, 2],
    [9, 2, 5],
    [7, 2, 11]
  ];
  for (const index of tmpIndices) {
    _exploreSpherePatch(quality, tmpVertices[index[0]], tmpVertices[index[1]], tmpVertices[index[2]], onTriangle);
  }
};
var generateSphereVertices = (quality, radius, modelMat4, perFaceNormals = false) => {
  const vertices = [];
  const tmpVec3A = exports_vec3.create();
  const tmpVec3B = exports_vec3.create();
  generateSphereTriangles(quality, (normal1, normal2, normal3) => {
    tmpVec3A[0] = tmpVec3A[1] = tmpVec3A[2] = 0;
    exports_vec3.transformMat4(tmpVec3A, normal1, modelMat4);
    exports_vec3.scale(tmpVec3B, tmpVec3A, radius), vertices.push(tmpVec3B[0], tmpVec3B[1], tmpVec3B[2], tmpVec3A[0], tmpVec3A[1], tmpVec3A[2]);
    tmpVec3A[0] = tmpVec3A[1] = tmpVec3A[2] = 0;
    exports_vec3.transformMat4(tmpVec3A, normal2, modelMat4);
    exports_vec3.scale(tmpVec3B, tmpVec3A, radius), vertices.push(tmpVec3B[0], tmpVec3B[1], tmpVec3B[2], tmpVec3A[0], tmpVec3A[1], tmpVec3A[2]);
    tmpVec3A[0] = tmpVec3A[1] = tmpVec3A[2] = 0;
    exports_vec3.transformMat4(tmpVec3A, normal3, modelMat4);
    exports_vec3.scale(tmpVec3B, tmpVec3A, radius), vertices.push(tmpVec3B[0], tmpVec3B[1], tmpVec3B[2], tmpVec3A[0], tmpVec3A[1], tmpVec3A[2]);
  });
  if (perFaceNormals) {
    convertToPerFacesNormals(vertices);
  }
  return vertices;
};
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shader
var generateWireFrameFrustumVertices = (fovY, aspect, zNear, zFar) => {
  const fH = Math.tan(fovY / 360 * Math.PI) * zNear;
  const fW = fH * aspect;
  const left = -fW;
  const right = +fW;
  const top = +fH;
  const bottom = -fH;
  const half_z = zFar * Math.sin(fovY * Math.PI / 180);
  const half_y = half_z * aspect;
  const tmpVertices = [];
  tmpVertices.push([zNear, left, top]);
  tmpVertices.push([zNear, right, top]);
  tmpVertices.push([zNear, left, bottom]);
  tmpVertices.push([zNear, right, bottom]);
  tmpVertices.push([zFar, -half_y, +half_z]);
  tmpVertices.push([zFar, +half_y, +half_z]);
  tmpVertices.push([zFar, -half_y, -half_z]);
  tmpVertices.push([zFar, +half_y, -half_z]);
  tmpVertices.push([zFar, -half_y * 1.66, -half_z]);
  tmpVertices.push([zFar, -half_y * 1.66, +half_z]);
  const indices = [];
  indices.push(0, 1, 1, 3, 3, 2, 2, 0);
  indices.push(0, 4, 1, 5, 2, 6, 3, 7);
  indices.push(4, 5, 5, 7, 7, 6, 6, 4);
  indices.push(8, 9);
  indices.push(7, 8);
  indices.push(5, 9);
  const vertices = [];
  for (let ii = 0;ii < indices.length; ++ii) {
    vertices.push(tmpVertices[indices[ii]]);
  }
  return vertices;
};
// srcjects/webgl-ray-tracer/src/experiment/graphics
var exports_camera = {};
__export(exports_camera, {
  FrustumCulling: () => {
    {
      return FrustumCulling;
    }
  },
  Camera: () => {
    {
      return Camera;
    }
  }
});

// srcjects/webgl-ray-tracer/src/experiment/graphics/
var _degreeToRad = (angle3) => angle3 * Math.PI / 180;
var ProjectionType;
(function(ProjectionType2) {
  ProjectionType2[ProjectionType2["perspective"] = 0] = "perspective";
  ProjectionType2[ProjectionType2["orthogonal"] = 1] = "orthogonal";
})(ProjectionType || (ProjectionType = {}));

class Camera {
  _projectionType = ProjectionType.perspective;
  _perspectiveData;
  _orthogonalData;
  _viewportPos = exports_vec2.fromValues(0, 0);
  _viewportSize = exports_vec2.fromValues(0, 0);
  _projectionMatrix = exports_mat4.create();
  _viewMatrix = exports_mat4.create();
  _composedMatrix = exports_mat4.create();
  _eye = exports_vec3.fromValues(0, 0, 0);
  _target = exports_vec3.fromValues(0, 0, 0);
  _upAxis = exports_vec3.fromValues(0, 0, 0);
  setAsPerspective(inData) {
    this._projectionType = ProjectionType.perspective;
    let aspectRatio = inData.aspectRatio;
    if (aspectRatio === undefined) {
      aspectRatio = this._viewportSize[0] / this._viewportSize[1];
    }
    this._perspectiveData = {
      fovy: inData.fovy,
      aspectRatio,
      near: inData.near,
      far: inData.far
    };
  }
  setAsOrthogonal(inData) {
    this._projectionType = ProjectionType.orthogonal;
    this._orthogonalData = { ...inData };
  }
  setViewportPos(width, height) {
    this._viewportPos[0] = width;
    this._viewportPos[1] = height;
  }
  getViewportPos() {
    return this._viewportPos;
  }
  setViewportSize(width, height) {
    this._viewportSize[0] = width;
    this._viewportSize[1] = height;
    if (this._projectionType !== ProjectionType.perspective && this._perspectiveData) {
      this._perspectiveData.aspectRatio = this._viewportSize[0] / this._viewportSize[1];
    }
  }
  getViewportSize() {
    return this._viewportSize;
  }
  lookAt(inEye, inTarget, inUpAxis) {
    this.setEye(inEye);
    this.setTarget(inTarget);
    this.setUpAxis(inUpAxis);
  }
  setEye(inEye) {
    exports_vec3.copy(this._eye, inEye);
  }
  setTarget(inTarget) {
    exports_vec3.copy(this._target, inTarget);
  }
  setUpAxis(inUpAxis) {
    exports_vec3.copy(this._upAxis, inUpAxis);
  }
  getEye() {
    return this._eye;
  }
  getTarget() {
    return this._target;
  }
  getUpAxis() {
    return this._upAxis;
  }
  computeMatrices() {
    if (this._projectionType === ProjectionType.perspective) {
      const { fovy, aspectRatio, near, far } = this._perspectiveData;
      exports_mat4.perspective(this._projectionMatrix, _degreeToRad(fovy), aspectRatio, near, far);
    } else if (this._projectionType === ProjectionType.orthogonal) {
      const { left, right, top, bottom, near, far } = this._orthogonalData;
      exports_mat4.ortho(this._projectionMatrix, left, right, top, bottom, near, far);
    }
    exports_mat4.lookAt(this._viewMatrix, this._eye, this._target, this._upAxis);
    this.computeComposedMatrix();
  }
  computeComposedMatrix() {
    exports_mat4.multiply(this._composedMatrix, this._projectionMatrix, this._viewMatrix);
  }
  setProjectionMatrix(inMat4) {
    exports_mat4.copy(this._projectionMatrix, inMat4);
  }
  setViewMatrix(inMat4) {
    exports_mat4.copy(this._viewMatrix, inMat4);
  }
  setComposedMatrix(inMat4) {
    exports_mat4.copy(this._composedMatrix, inMat4);
  }
  getProjectionMatrix() {
    return this._projectionMatrix;
  }
  getViewMatrix() {
    return this._viewMatrix;
  }
  getComposedMatrix() {
    return this._composedMatrix;
  }
  getPerspectiveData() {
    if (this._projectionType !== ProjectionType.perspective) {
      throw new Error("not a perspective projection");
    }
    return this._perspectiveData;
  }
  getOrthogonalData() {
    if (this._projectionType !== ProjectionType.orthogonal) {
      throw new Error("not an orthogonal projection");
    }
    return this._orthogonalData;
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderer
var FrustumSide;
(function(FrustumSide2) {
  FrustumSide2[FrustumSide2["Right"] = 0] = "Right";
  FrustumSide2[FrustumSide2["Left"] = 1] = "Left";
  FrustumSide2[FrustumSide2["Bottom"] = 2] = "Bottom";
  FrustumSide2[FrustumSide2["Top"] = 3] = "Top";
  FrustumSide2[FrustumSide2["Back"] = 4] = "Back";
  FrustumSide2[FrustumSide2["Front"] = 5] = "Front";
})(FrustumSide || (FrustumSide = {}));

class FrustumCulling {
  _frustum = new Float32Array(24);
  _setPlane(side, left, right, coef) {
    const index = side * 4;
    this._frustum[index + 0] = left[0] + right[0] * coef;
    this._frustum[index + 1] = left[1] + right[1] * coef;
    this._frustum[index + 2] = left[2] + right[2] * coef;
    this._frustum[index + 3] = left[3] + right[3] * coef;
    const magnitude = Math.sqrt(this._frustum[index + 0] * this._frustum[index + 0] + this._frustum[index + 1] * this._frustum[index + 1] + this._frustum[index + 2] * this._frustum[index + 2]);
    if (magnitude === 0)
      return;
    this._frustum[index + 0] /= magnitude;
    this._frustum[index + 1] /= magnitude;
    this._frustum[index + 2] /= magnitude;
    this._frustum[index + 3] /= magnitude;
  }
  calculateFrustum(proj, view) {
    const clip = exports_mat4.multiply(exports_mat4.create(), proj, view);
    const row0 = exports_vec4.fromValues(clip[0], clip[4], clip[8], clip[12]);
    const row1 = exports_vec4.fromValues(clip[1], clip[5], clip[9], clip[13]);
    const row2 = exports_vec4.fromValues(clip[2], clip[6], clip[10], clip[14]);
    const row3 = exports_vec4.fromValues(clip[3], clip[7], clip[11], clip[15]);
    this._setPlane(FrustumSide.Right, row3, row0, -1);
    this._setPlane(FrustumSide.Left, row3, row0, 1);
    this._setPlane(FrustumSide.Bottom, row3, row1, 1);
    this._setPlane(FrustumSide.Top, row3, row1, -1);
    this._setPlane(FrustumSide.Back, row3, row2, -1);
    this._setPlane(FrustumSide.Front, row3, row2, 1);
  }
  sphereInFrustum(x, y, z, radius) {
    for (let ii = 0;ii < 6; ++ii) {
      const index = ii * 4;
      if (this._frustum[index + 0] * x + this._frustum[index + 1] * y + this._frustum[index + 2] * z + this._frustum[index + 3] <= -radius) {
        return false;
      }
    }
    return true;
  }
  pointInFrustum(x, y, z) {
    return this.sphereInFrustum(x, y, z, 0);
  }
  cubeInFrustumVec3(center, inSize) {
    return this.cubeInFrustum(center[0], center[1], center[2], inSize);
  }
  cubeInFrustum(inX, inY, inZ, inSize) {
    const hSize = inSize * 0.5;
    const minX = inX - hSize;
    const minY = inY - hSize;
    const minZ = inZ - hSize;
    const maxX = inX + hSize;
    const maxY = inY + hSize;
    const maxZ = inZ + hSize;
    for (let ii = 0;ii < 6; ++ii) {
      const index = ii * 4;
      const planA = this._frustum[index + 0];
      const planB = this._frustum[index + 1];
      const planC = this._frustum[index + 2];
      const planD = this._frustum[index + 3];
      if (planA * minX + planB * minY + planC * minZ + planD > 0 || planA * maxX + planB * minY + planC * minZ + planD > 0 || planA * minX + planB * maxY + planC * minZ + planD > 0 || planA * maxX + planB * maxY + planC * minZ + planD > 0 || planA * minX + planB * minY + planC * maxZ + planD > 0 || planA * maxX + planB * minY + planC * maxZ + planD > 0 || planA * minX + planB * maxY + planC * maxZ + planD > 0 || planA * maxX + planB * maxY + planC * maxZ + planD > 0) {
        continue;
      }
      return false;
    }
    return true;
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/re
var exports_renderers = {};
__export(exports_renderers, {
  renderFpsMeter: () => {
    {
      return renderFpsMeter;
    }
  },
  addKeysTouchesWidgets: () => {
    {
      return addKeysTouchesWidgets;
    }
  },
  addKeyStrokesWidgets: () => {
    {
      return addKeyStrokesWidgets;
    }
  },
  addArrowStrokesWidgets: () => {
    {
      return addArrowStrokesWidgets;
    }
  },
  TextRenderer: () => {
    {
      return TextRenderer;
    }
  },
  StackRenderers: () => {
    {
      return StackRenderers;
    }
  },
  GeometryStackRenderer: () => {
    {
      return GeometryStackRenderer;
    }
  }
});

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/texture.glsl.fragragg
var geometry_stack_renderer_glsl_default = `#version 300 es

precision highp float;

uniform mat4 u_composedMatrix;
uniform vec3 u_lightPos;

in vec3 a_vertexPosition;
in vec3 a_vertexNormal;

in vec3 a_offsetPosition;
in vec4 a_offsetOrientation; // quaternion
in vec3 a_offsetScale;
in vec3 a_offsetColor;

out vec3 v_color;

// #include "./assets/graphics/shaders/_common/_common-quat-rotations.glsl.vert"

vec4 quat_from_axis_angle(vec3 axis, float angle)
{
  vec4 qr;
  // float half_angle = (angle * 0.5) * 3.14159 / 180.0;
  float half_angle = (angle * 0.5);
  qr.x = axis.x * sin(half_angle);
  qr.y = axis.y * sin(half_angle);
  qr.z = axis.z * sin(half_angle);
  qr.w = cos(half_angle);
  return qr;
}

vec3 apply_quat_to_vec3(vec3 position, vec4 q)
{
  vec3 v = position.xyz;
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

// #include "./assets/graphics/shaders/_common/_common-apply-lighting.glsl.frag"

float getDiffuseLightingRatio(vec3 lightDir, vec3 normal)
{
  normal = normalize(normal);
  lightDir = normalize(lightDir);

  return max(dot(lightDir, normal), 0.0);
}

void main(void)
{
	vec3 worldSpacePosition = a_offsetPosition + apply_quat_to_vec3(a_vertexPosition * a_offsetScale, a_offsetOrientation);
	vec3 worldSpaceNormal = apply_quat_to_vec3(a_vertexNormal, a_offsetOrientation);

	gl_Position = u_composedMatrix * vec4(worldSpacePosition, 1.0);

	float diffuseRatio = getDiffuseLightingRatio(u_lightPos - worldSpacePosition, worldSpaceNormal);

	v_color = a_offsetColor * (0.3 + diffuseRatio);
}
`.trim();

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/texture.glsl.fragragg
var geometry_stack_renderer_glsl_default2 = `#version 300 es

precision lowp float;

in vec3 v_color;

out vec4 out_color;

//
//
//

void main(void)
{
	out_color = vec4(v_color, 1.0);
}
`.trim();

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/text
class GeometryStackRenderer {
  _shader;
  _geoDef;
  _aliasedGeometriesMap = new Map;
  constructor() {
    this._shader = new exports_graphics.webgl2.ShaderProgram("GeometryStackRenderer", {
      vertexSrc: geometry_stack_renderer_glsl_default,
      fragmentSrc: geometry_stack_renderer_glsl_default2,
      attributes: [
        "a_vertexPosition",
        "a_vertexNormal",
        "a_offsetPosition",
        "a_offsetOrientation",
        "a_offsetScale",
        "a_offsetColor"
      ],
      uniforms: ["u_composedMatrix", "u_lightPos"]
    });
    const geoBuilder = new exports_graphics.webgl2.GeometryWrapper.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("triangles").addVbo().addVboAttribute("a_vertexPosition", "vec3f").addVboAttribute("a_vertexNormal", "vec3f").addVbo().setVboAsDynamic().setVboAsInstanced().addVboAttribute("a_offsetPosition", "vec3f").addVboAttribute("a_offsetOrientation", "vec4f").addVboAttribute("a_offsetScale", "vec3f").addVboAttribute("a_offsetColor", "vec3f");
    this._geoDef = geoBuilder.getDef();
  }
  createAlias(alias, bufferSize, vertices) {
    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (aliasGeometry) {
      throw new Error("alias already exist, alias: " + alias);
    }
    const newAlias = {
      geometry: new exports_graphics.webgl2.GeometryWrapper.Geometry(this._shader, this._geoDef),
      buffer: new Float32Array(bufferSize * 13),
      currentSize: 0
    };
    newAlias.geometry.updateBuffer(0, vertices, vertices.length);
    newAlias.geometry.setPrimitiveCount(vertices.length / 6);
    this._aliasedGeometriesMap.set(alias, newAlias);
  }
  deleteAlias(alias) {
    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (!aliasGeometry) {
      throw new Error("alias not found, alias: " + alias);
    }
    this._aliasedGeometriesMap.delete(alias);
  }
  clearAlias(alias) {
    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (!aliasGeometry) {
      throw new Error("alias not found, alias: " + alias);
    }
    aliasGeometry.currentSize = 0;
  }
  pushAlias(alias, position, orientation, scale6, color) {
    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (!aliasGeometry) {
      throw new Error("alias not found, alias: " + alias);
    }
    aliasGeometry.buffer[aliasGeometry.currentSize++] = position[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = position[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = position[2];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[2];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[3];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = scale6[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = scale6[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = scale6[2];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = color[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = color[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = color[2];
  }
  flush(composedMatrix, lightPos, clearStack = true) {
    let canRender = false;
    [...this._aliasedGeometriesMap.values()].forEach((val) => {
      if (val.currentSize > 0) {
        canRender = true;
      }
    });
    if (!canRender) {
      return;
    }
    this._shader.bind((boundShader) => {
      boundShader.setMatrix4Uniform("u_composedMatrix", composedMatrix);
      boundShader.setFloat3Uniform("u_lightPos", lightPos[0], lightPos[1], lightPos[2]);
      [...this._aliasedGeometriesMap.values()].forEach((val) => {
        if (val.currentSize === 0) {
          return;
        }
        val.geometry.updateBuffer(1, val.buffer, val.currentSize);
        val.geometry.setInstancedCount(val.currentSize / 13);
        val.geometry.render();
        if (clearStack === true) {
          val.currentSize = 0;
        }
      });
    });
  }
  clear() {
    [...this._aliasedGeometriesMap.values()].forEach((val) => {
      val.currentSize = 0;
    });
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/text
var stack_renderer_glsl_default = `
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
`.trim();

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/text
var stack_renderer_glsl_default2 = `
#version 300 es

precision lowp float;

flat in vec4 v_color;

out vec4 o_color;

void main(void)
{
  o_color = v_color;
}
`.trim();

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/texture.
var k_bufferSize = 14336;

class WireFramesStackRenderer {
  _shader;
  _geometry;
  _buffer = new Float32Array(k_bufferSize);
  _currentSize = 0;
  constructor(inShader, inGeometryDef) {
    this._shader = inShader;
    const geometryDef = {
      ...inGeometryDef,
      primitiveType: exports_graphics.webgl2.GeometryWrapper.PrimitiveType.lines
    };
    this._geometry = new exports_graphics.webgl2.GeometryWrapper.Geometry(inShader, geometryDef);
    this._geometry.setFloatBufferSize(0, k_bufferSize);
  }
  pushLine(inPointA, inPointB, inColor) {
    if (this._currentSize + 14 >= this._buffer.length) {
      if (this._shader.isBound()) {
        this.flush();
      } else {
        return;
      }
    }
    const alphaValue = inColor[3] ?? 1;
    this._buffer[this._currentSize + 0] = inPointA[0];
    this._buffer[this._currentSize + 1] = inPointA[1];
    this._buffer[this._currentSize + 2] = inPointA[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;
    this._buffer[this._currentSize + 0] = inPointB[0];
    this._buffer[this._currentSize + 1] = inPointB[1];
    this._buffer[this._currentSize + 2] = inPointB[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;
  }
  canRender() {
    return this._currentSize > 0;
  }
  flush() {
    if (!this.canRender())
      return;
    this._geometry.updateBuffer(0, this._buffer, this._currentSize);
    this._geometry.setPrimitiveCount(this._currentSize / 7);
    this._geometry.render();
    this.clear();
  }
  clear() {
    this._currentSize = 0;
  }
}

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/texture
var k_bufferSize2 = 7168;

class TrianglesStackRenderer {
  _shader;
  _geometry;
  _buffer = new Float32Array(k_bufferSize2);
  _currentSize = 0;
  constructor(inShader, inGeometryDef) {
    this._shader = inShader;
    const geometryDef = {
      ...inGeometryDef,
      primitiveType: exports_graphics.webgl2.GeometryWrapper.PrimitiveType.triangles
    };
    this._geometry = new exports_graphics.webgl2.GeometryWrapper.Geometry(inShader, geometryDef);
    this._geometry.setFloatBufferSize(0, k_bufferSize2);
  }
  pushTriangle(inPointA, inPointB, inPointC, inColor) {
    if (this._currentSize + 42 >= this._buffer.length) {
      if (this._shader.isBound()) {
        this.flush();
      } else {
        return;
      }
    }
    const alphaValue = inColor[3] ?? 1;
    this._buffer[this._currentSize + 0] = inPointA[0];
    this._buffer[this._currentSize + 1] = inPointA[1];
    this._buffer[this._currentSize + 2] = inPointA[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;
    this._buffer[this._currentSize + 0] = inPointB[0];
    this._buffer[this._currentSize + 1] = inPointB[1];
    this._buffer[this._currentSize + 2] = inPointB[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;
    this._buffer[this._currentSize + 0] = inPointC[0];
    this._buffer[this._currentSize + 1] = inPointC[1];
    this._buffer[this._currentSize + 2] = inPointC[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;
  }
  pushLine(inPointA, inPointB, thickness, inColor) {
    if (this._currentSize + 42 >= this._buffer.length) {
      return;
    }
    const diffX = inPointB[0] - inPointA[0];
    const diffY = inPointB[1] - inPointA[1];
    const angle3 = Math.atan2(diffY, diffX) + Math.PI * 0.5;
    const stepX = Math.cos(angle3) * thickness * 0.5;
    const stepY = Math.sin(angle3) * thickness * 0.5;
    this.pushTriangle([inPointA[0] - stepX, inPointA[1] - stepY, inPointA[2]], [inPointB[0] - stepX, inPointB[1] - stepY, inPointB[2]], [inPointB[0] + stepX, inPointB[1] + stepY, inPointB[2]], inColor);
    this.pushTriangle([inPointA[0] - stepX, inPointA[1] - stepY, inPointA[2]], [inPointB[0] + stepX, inPointB[1] + stepY, inPointB[2]], [inPointA[0] + stepX, inPointA[1] + stepY, inPointA[2]], inColor);
  }
  pushRotatedLine(center, angle3, length4, thickness, color) {
    this.pushLine([
      center[0] - length4 * Math.cos(angle3),
      center[1] - length4 * Math.sin(angle3),
      center[2]
    ], [
      center[0] + length4 * Math.cos(angle3),
      center[1] + length4 * Math.sin(angle3),
      center[2]
    ], thickness, color);
  }
  pushOriginBoundRectangle(inOrigin, inSize, inColor) {
    if (this._currentSize + 42 >= this._buffer.length) {
      return;
    }
    const maxCoord = [
      inOrigin[0] + inSize[0],
      inOrigin[1] + inSize[1]
    ];
    this.pushTriangle([inOrigin[0], inOrigin[1], inOrigin[2]], [maxCoord[0], maxCoord[1], inOrigin[2]], [inOrigin[0], maxCoord[1], inOrigin[2]], inColor);
    this.pushTriangle([inOrigin[0], inOrigin[1], inOrigin[2]], [maxCoord[0], inOrigin[1], inOrigin[2]], [maxCoord[0], maxCoord[1], inOrigin[2]], inColor);
  }
  pushCenteredRectangle(inCenter, inSize, inColor) {
    const origin = [
      inCenter[0] - inSize[0] * 0.5,
      inCenter[1] - inSize[1] * 0.5,
      inCenter[2]
    ];
    this.pushOriginBoundRectangle(origin, inSize, inColor);
  }
  canRender() {
    return this._currentSize > 0;
  }
  flush() {
    if (!this.canRender()) {
      return;
    }
    this._geometry.updateBuffer(0, this._buffer, this._currentSize);
    this._geometry.setPrimitiveCount(this._currentSize / 7);
    this._geometry.render();
    this.clear();
  }
  clear() {
    this._currentSize = 0;
  }
}

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-render
class StackRenderers {
  _shader;
  _wireFramesStackRenderer;
  _trianglesStackRenderer;
  constructor() {
    this._shader = new exports_graphics.webgl2.ShaderProgram("StackRenderers", {
      vertexSrc: stack_renderer_glsl_default,
      fragmentSrc: stack_renderer_glsl_default2,
      attributes: ["a_vertex_position", "a_vertex_color"],
      uniforms: ["u_composedMatrix"]
    });
    const geoBuilder = new exports_graphics.webgl2.GeometryWrapper.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("lines").addVbo().setVboAsDynamic().addVboAttribute("a_vertex_position", "vec3f").addVboAttribute("a_vertex_color", "vec4f");
    this._wireFramesStackRenderer = new WireFramesStackRenderer(this._shader, geoBuilder.getDef());
    this._trianglesStackRenderer = new TrianglesStackRenderer(this._shader, geoBuilder.getDef());
  }
  pushLine(inPointA, inPointB, inColor) {
    this._wireFramesStackRenderer.pushLine(inPointA, inPointB, inColor);
  }
  pushCross(inCenter, inSize, inColor) {
    const crossVertices = [
      [inCenter[0] - inSize, inCenter[1], inCenter[2]],
      [inCenter[0] + inSize, inCenter[1], inCenter[2]],
      [inCenter[0], inCenter[1] - inSize, inCenter[2]],
      [inCenter[0], inCenter[1] + inSize, inCenter[2]],
      [inCenter[0], inCenter[1], inCenter[2] - inSize],
      [inCenter[0], inCenter[1], inCenter[2] + inSize]
    ];
    const crossIndices = [0, 1, 2, 3, 4, 5];
    for (let ii = 0;ii < crossIndices.length; ii += 2) {
      const vertexA = crossVertices[ii + 0];
      const vertexB = crossVertices[ii + 1];
      this._wireFramesStackRenderer.pushLine(vertexA, vertexB, inColor);
    }
  }
  pushThickLine(inPointA, inPointB, thickness, inColor) {
    this._trianglesStackRenderer.pushLine(inPointA, inPointB, thickness, inColor);
  }
  pushRotatedLine(center, angle3, length4, thickness, color) {
    this._trianglesStackRenderer.pushRotatedLine(center, angle3, length4, thickness, color);
  }
  pushOriginBoundRectangle(inOrigin, inSize, inColor) {
    this._trianglesStackRenderer.pushOriginBoundRectangle(inOrigin, inSize, inColor);
  }
  pushCenteredRectangle(inCenter, inSize, inColor) {
    this._trianglesStackRenderer.pushCenteredRectangle(inCenter, inSize, inColor);
  }
  pushTriangle(inPosA, inPosB, inPosC, inColor) {
    this._trianglesStackRenderer.pushTriangle(inPosA, inPosB, inPosC, inColor);
  }
  pushQuad(inPos, inSize, inColor) {
    this.pushTriangle([inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 0, inPos[2]], [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 1, inPos[2]], [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 0, inPos[2]], inColor);
    this.pushTriangle([inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 0, inPos[2]], [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 1, inPos[2]], [inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 1, inPos[2]], inColor);
  }
  flush(inComposedMatrix) {
    if (!this._wireFramesStackRenderer.canRender() && !this._trianglesStackRenderer.canRender()) {
      return;
    }
    this._shader.bind((bound) => {
      bound.setMatrix4Uniform("u_composedMatrix", inComposedMatrix);
      this._wireFramesStackRenderer.flush();
      this._trianglesStackRenderer.flush();
    });
  }
  safeRender(inComposedMatrix, inCallback) {
    this._shader.bind((bound) => {
      bound.setMatrix4Uniform("u_composedMatrix", inComposedMatrix);
      inCallback();
      this._wireFramesStackRenderer.flush();
      this._trianglesStackRenderer.flush();
    });
  }
  clear() {
    this._wireFramesStackRenderer.clear();
    this._trianglesStackRenderer.clear();
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/t
var text_renderer_glsl_default = `
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
`.trim();

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/t
var text_renderer_glsl_default2 = `
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
`.trim();

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shader
var asciiTextureHex = "7e7e28fd03fd07fe04fe0aff02ff7e4dfd0cfd03fd07fe04fe0aff02ff1afc0dfd10fc08fc0ffe55ff15fb0bfd03fd07fe04fe08f707fd04ff07fe02fe0cfd0ffd0cfd0aff03fe03ff0afe44fe15fb0bfd03fd04f204f607fd03fe07fe02fe0cfd0efd0efd0aff02fe02ff0bfe43fd15fb0cfe03fe05f204fe01ff02ff0afd02fd07fe02fe0bfd0efd10fd0afa0cfe42fd16fb1bfe04fe07fe01ff02ff0efd09fc1cfd12fd09fa0cfe41fd17fb1bfe04fe07f70bfd0afc04ff17fd12fd06f405f616f61cfd19fd1cfe04fe08f709fd0bfb02fe17fd12fd06f405f616f61bfd1afd1cfe04fe0aff02ff01fe08fd0bfe02fa17fd12fd09fa0cfe3efd37f207ff02ff01fe07fd02fd07fe03fc19fd10fd0afa0cfe3dfd38f204f607fe03fd07fe03fd1bfd0efd0aff02fe02ff0bfe0cfd1dfd0dfd1dfd1cfe04fe07f708ff04fd07fe02fb1bfd0cfd0aff03fe03ff0afe0cfd1dfd0cfd1efd1cfe04fe0aff02ff1afb02fe1bfc08fc0ffe1cfd1dfd0bfd1ffd1cfe04fe0aff02ff7afd7e7e7e7e7e7e0efd17fd10fc0af80bfe0bf909f90dfd08f609fb08f506f808f82cfd19fd0df807fd04fd0afe0afd03fd07fd03fd0bfc08fd0ffd0bfd05fd05fd04fd06fd04fd2afd1bfd0bfc02fc06fd03fc09fd0afd04fd06fd04fd09fb08fd0efd0cfd05fd05fd04fd06fd04fd09fd0cfd0efd1dfd0afe05fd06fd02fb06fa11fd0dfd08fe01fd08fd0dfd0dfd05fd05fd04fd06fd04fd09fd0cfd0dfd0af409fd10fd06fd02fb06fa10fd0dfd08fe02fd08fd0dfd15fd05fb02fd06fd04fd09fd0cfd0cfd0bf40afd0efd07fd01fe01fd09fd0ffd0bfb08fe03fd08f808f70efd08fa08f626fd23fd0cfd08fd01fe01fd09fd0efd0cfb08f606f707f60cfd09fa09f726fd23fd0bfd09fb02fd09fd0dfd10fd07f60cfc06fd04fd0bfd08fd02fb0dfd09fd0cfd0cfd0bf40afd0cfd09fb02fd09fd0cfd12fd0bfd0ffd06fd04fd0afd09fd04fd0dfd09fd0cfd0dfd0af409fd19fc03fd09fd0bfd03fd06fd04fd0bfd08fd04fd06fd04fd09fd0afd04fd0cfd0afd0cfd0efd1dfd1afd04fd09fd0afd04fd06fd03fd0cfd08fd03fd07fd04fd09fd0afd04fd0bfd19fd10fd1bfd0ffd0af807f707f607f90bf907f909f80afd0bf809fb2efd19fd10fd7e51fd17fd11fd7e7e7e7e13f87e78fd05fd08fc09f709f907f808f606f608f907fd03fd07f90df905fc03fd06fb0bfd05fd05fd05fd08fb08fd05fd07fa09fd03fd07fd03fd07fd02fd08fd04fe07fd04fe07fd03fd06fd03fd09fd11fd08fd03fd07fd0cfc03fc05fd05fd07fd01fd07fd05fd06fd02fd08fd03fd06fd04fd07fd03fd07fd05ff07fd05ff06fd04fd06fd03fd09fd11fd08fd02fd08fd0cfb01fb05fc04fd06fd03fd06fd05fd05fd04fd07fd03fd06fd0efd03fd07fd0dfd0cfd04fd06fd03fd09fd11fd08fd01fd09fd0cf505fb03fd05fd05fd05fd02fa05fd04fd07fd03fd06fd0efd03fd07fd03fe08fd03fe07fd0dfd03fd09fd11fd08fa0afd0cf505fa02fd05fd05fd05fd02fa05fd04fd07f807fd0efd03fd07f808f807fd0df709fd11fd08fb0bfd0cfd01fd01fd05fd01fd01fd05fd05fd05fd02fa05fd04fd07f807fd0efd03fd07f808f807fd0df709fd11fd08fb0bfd0cfd02ff02fd05fd02fa05fd05fd05fd02fa05f607fd03fd06fd0efd03fd07fd03fe08fd03fe07fd02fb06fd03fd09fd0bfd03fd08fa0afd0cfd05fd05fd03fb05fd05fd05fd0dfd04fd07fd03fd06fd0efd03fd07fd0dfd0cfd04fd06fd03fd09fd0bfd03fd08fd01fd09fd05ff06fd05fd05fd04fc05fd05fd05fd0dfd04fd07fd03fd06fd04fd07fd03fd07fd05ff07fd0cfd04fd06fd03fd09fd0bfd03fd08fd02fd08fd04fe06fd05fd05fd05fd06fd03fd06fd0dfd04fd07fd03fd07fd03fd07fd02fd08fd04fe07fd0dfd03fd06fd03fd09fd0bfd03fd08fd03fd07fd03fd06fd05fd05fd05fd07fd01fd07fd0dfd04fd06f709f907f808f606fb0df806fd03fd07f90af908fc03fd06f606fd05fd05fd05fd08fb0af87e7e7e7e7e7e7e68fe1af70afb08f708f807f505fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07f608f907ff11f90afc1afd03fd07fc01fc07fd03fd06fd04fd06fe02fd02fe05fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07fd04fd08fd0bfe14fd09fa19fd03fd07fd03fd07fd03fd06fd04fd06ff03fd03ff05fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07fe05fd08fd0bfd13fd08fd02fd18fd03fd06fd05fd06fd03fd06fd04fd0afd09fd03fd07fd03fd07fd05fd06fd01fd08fd03fd07ff05fd09fd0cfd12fd07fd04fd17fd03fd06fd05fd06fd03fd06fd11fd09fd03fd07fd03fd07fd05fd07fb09fd03fd0cfd0afd0dfd11fd28f807fd05fd06f808f90cfd09fd03fd07fd03fd07fd02ff02fd08fd0bfd01fd0cfd0bfd0efd10fd28f807fd05fd06f809f90bfd09fd03fd07fd03fd07fd02ff02fd08fd0cfb0cfd0cfd0ffd0ffd28fd0cfd03fb06fd02fd0efd0afd09fd03fd07fd03fd07fd02ff02fd07fb0cfd0cfd0dfd10fd0efd28fd0cfd02fa06fd03fd06fd04fd0afd09fd03fd07fd03fd08f707fd01fd0bfd0bfd05ff08fd11fd0dfd28fd0df707fd03fd06fd04fd0afd09fd03fd08fd01fd09fc01fc06fd03fd0afd0afd05fe08fd12fd0cfd28fd0df707fd03fd06fd04fd0afd09fd03fd09fb0bfd01fd07fd03fd0afd0afd04fd08fd13fd0bfd27fb12fd06fc03fd07f809f908f90bfd0cfd01fd07fd03fd08f908f608f910fd06f93cfa7e54f07e72f07e7e7e7e0bfd1dfc21fb19fb18fc10fd0ffd07fc0dfa39fd1efd22fd19fd01fd18fd10fd0ffd08fd10fd3bfd1cfd22fd19fd01fd18fd10fd0ffd08fd10fd3bfd1cfd22fd19fd1cfd2dfd10fd4af909f808f909f808f90afd0cfb02fe07fd01fc08fa0cfa08fd03fd0afd09f606f809f91efd08fd03fd06fd03fd07fd03fd07fd03fd07f808fd03fd08fc02fd0afd0ffd08fd02fd0bfd09fd02ff02fd05fd03fd07fd03fd1dfd08fd03fd06fd03fd07fd03fd07fd03fd07f808fd03fd08fc02fd0afd0ffd08fd01fd0cfd09fd02ff02fd05fd03fd07fd03fd18f808fd03fd06fd0dfd03fd07f709fd0bfd03fd08fd03fd0afd0ffd08fa0dfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd0dfd03fd07fd0ffd0bfd03fd08fd03fd0afd0ffd08fd01fd0cfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd03fd07fd03fd07fd03fd09fd0cf808fd03fd0afd0ffd08fd02fd0bfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd03fd07fd03fd07fd03fd09fd0df908fd03fd0afd0ffd08fd03fd0afd09fd02ff02fd05fd03fd07fd03fd18fb02fe06fe02fb08f909fb02fe07f908f90ffd07fc03fd07f706fd03fd07fc03fd07f706fd05fd05fd03fd08f978fd03fd27fd03fd7e4af92afa7e7e7e7e7e7e18fa09fc09fa1efe4eff6efd0dfc0dfd1cfc4cfe6efd0dfc0dfd1bfa4afd6efd0dfc0dfd1afd02fd07fe02fb07fb02fe07fc02fd08f908f707fd03fd07fd03fd07fd05fd05fd02fd09fd03fd06f80afd0efc0efd08fb03fd05fd04fd07fd03fd05fd03fd09f706fd04fe09fd0bfd03fd07fd03fd07fd05fd05fd02fd09fd03fd06fe03fd08fd24fd05fd01fd02fd05fe06fe07fd03fd05fd03fd09fc02fd06fd04fe09fd0bfd03fd07fd03fd07fd05fd06fa0afd03fd06ff03fd09fd24fd05fd02fd01fd05fe06fe07fd03fd05fd03fd09fd0dfb0cfd0bfd03fd07fd03fd07fd02ff02fd07fc0bfd03fd09fd0cfd0efc0efd07fd03fb06fe06fe07fd03fd05fd03fd09fd0ffb0afd0bfd03fd07fd03fd07fd02ff02fd07fc0bfd03fd08fd0efd0dfc0dfd19fe06fe07fd03fd05fd03fd09fd0cfe04fd09fd01fd07fd03fd08fd01fd09fc01fc07fa0bf908fd03ff0bfd0dfc0dfd19fe06fe07f807f809fd0cfe04fd09fd01fd07fd03fd09fb0bfd01fd07fd02fd0bfb08fd03fe0bfd0dfc0dfd19f607fd11fd08fb0cf90bfb09fb02fe09fd0cfd01fd07fd02fd0dfd08f80cfa09fc09fa1af607fd11fd7cfd69fb0ffb77fa";

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-re
var k_gridSize = [16, 6];
var k_texCoord = [1 / k_gridSize[0], 1 / k_gridSize[1]];
var k_bufferSize3 = 36864;

class TextRenderer {
  _shader;
  _geometry;
  _texture = new exports_graphics.webgl2.Texture;
  _texCoordMap;
  _buffer = new Float32Array(k_bufferSize3);
  _currentSize = 0;
  _textScale = 14;
  _textColor = [1, 1, 1];
  _horizontalTextAlign = "left";
  _verticalTextAlign = "top";
  constructor() {
    this._shader = new exports_graphics.webgl2.ShaderProgram("TextRenderer", {
      vertexSrc: text_renderer_glsl_default,
      fragmentSrc: text_renderer_glsl_default2,
      attributes: [
        "a_vertex_position",
        "a_vertex_texCoord",
        "a_offset_position",
        "a_offset_texCoord",
        "a_offset_color",
        "a_offset_scale"
      ],
      uniforms: ["u_composedMatrix", "u_texture"]
    });
    const geoBuilder = new exports_graphics.webgl2.GeometryWrapper.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("triangles").addVbo().addVboAttribute("a_vertex_position", "vec2f").addVboAttribute("a_vertex_texCoord", "vec2f").setStride(16).addVbo().setVboAsDynamic().setVboAsInstanced().addVboAttribute("a_offset_position", "vec3f").addVboAttribute("a_offset_texCoord", "vec2f").addVboAttribute("a_offset_color", "vec3f").addVboAttribute("a_offset_scale", "float").setStride(36);
    this._geometry = new exports_graphics.webgl2.GeometryWrapper.Geometry(this._shader, geoBuilder.getDef());
    const vertices = [
      {
        position: [0.5, -0.5],
        texCoord: [k_texCoord[0] * 1, k_texCoord[1] * 1]
      },
      {
        position: [-0.5, -0.5],
        texCoord: [k_texCoord[0] * 0, k_texCoord[1] * 1]
      },
      {
        position: [0.5, 0.5],
        texCoord: [k_texCoord[0] * 1, k_texCoord[1] * 0]
      },
      {
        position: [-0.5, 0.5],
        texCoord: [k_texCoord[0] * 0, k_texCoord[1] * 0]
      }
    ];
    const indices = [1, 0, 2, 1, 2, 3];
    const letterVertices = [];
    for (const index of indices) {
      const vertex = vertices[index];
      letterVertices.push(vertex.position[0], vertex.position[1], vertex.texCoord[0], vertex.texCoord[1]);
    }
    this._geometry.updateBuffer(0, letterVertices, letterVertices.length);
    this._geometry.setPrimitiveCount(letterVertices.length / 4);
    this._geometry.setFloatBufferSize(1, k_bufferSize3);
    this._texCoordMap = new Map([
      [" ", [0 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["!", [1 * k_texCoord[0], 0 * k_texCoord[1]]],
      ['"', [2 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["#", [3 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["$", [4 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["%", [5 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["&", [6 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["'", [7 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["(", [8 * k_texCoord[0], 0 * k_texCoord[1]]],
      [")", [9 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["*", [10 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["+", [11 * k_texCoord[0], 0 * k_texCoord[1]]],
      [",", [12 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["-", [13 * k_texCoord[0], 0 * k_texCoord[1]]],
      [".", [14 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["/", [15 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["0", [0 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["1", [1 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["2", [2 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["3", [3 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["4", [4 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["5", [5 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["6", [6 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["7", [7 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["8", [8 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["9", [9 * k_texCoord[0], 1 * k_texCoord[1]]],
      [":", [10 * k_texCoord[0], 1 * k_texCoord[1]]],
      [";", [11 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["<", [12 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["=", [13 * k_texCoord[0], 1 * k_texCoord[1]]],
      [">", [14 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["?", [15 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["@", [0 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["A", [1 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["B", [2 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["C", [3 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["D", [4 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["E", [5 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["F", [6 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["G", [7 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["H", [8 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["I", [9 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["J", [10 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["K", [11 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["L", [12 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["M", [13 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["N", [14 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["O", [15 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["P", [0 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["Q", [1 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["R", [2 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["S", [3 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["T", [4 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["U", [5 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["V", [6 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["W", [7 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["X", [8 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["Y", [9 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["Z", [10 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["[", [11 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["\\", [12 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["]", [13 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["^", [14 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["_", [15 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["`", [0 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["a", [1 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["b", [2 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["c", [3 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["d", [4 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["e", [5 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["f", [6 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["g", [7 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["h", [8 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["i", [9 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["j", [10 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["k", [11 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["l", [12 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["m", [13 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["n", [14 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["o", [15 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["p", [0 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["q", [1 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["r", [2 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["s", [3 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["t", [4 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["u", [5 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["v", [6 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["w", [7 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["x", [8 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["y", [9 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["z", [10 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["{", [11 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["|", [12 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["}", [13 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["~", [14 * k_texCoord[0], 5 * k_texCoord[1]]]
    ]);
    const width = 256;
    const height = 96;
    const imagePixels = new Uint8Array(width * height * 4);
    {
      let index = 0;
      for (let ii = 0;ii < asciiTextureHex.length; ii += 2) {
        let currSize = parseInt(`${asciiTextureHex.substring(ii, ii + 2)}000000`, 16) >> 24;
        let currVal = 0;
        if (currSize < 0) {
          currSize = -currSize;
          currVal = 255;
        }
        for (let ii2 = 0;ii2 < currSize; ++ii2) {
          imagePixels[index * 4 + 0] = currVal;
          imagePixels[index * 4 + 1] = currVal;
          imagePixels[index * 4 + 2] = currVal;
          imagePixels[index * 4 + 3] = currVal;
          ++index;
        }
      }
    }
    this._texture.initialize();
    this._texture.bind((boundTexture) => {
      boundTexture.loadFromMemory(width, height, imagePixels);
    });
  }
  setTextAlign(inHorizontalTextAlign, inVerticalTextAlign) {
    this._horizontalTextAlign = inHorizontalTextAlign;
    this._verticalTextAlign = inVerticalTextAlign;
    return this;
  }
  setTextScale(inScale) {
    this._textScale = inScale;
    return this;
  }
  setTextColor(inRed, inGreen, inBlue) {
    this._textColor[0] = inRed;
    this._textColor[1] = inGreen;
    this._textColor[2] = inBlue;
    return this;
  }
  pushText(inMessage, inPosition) {
    if (inMessage.length === 0) {
      return this;
    }
    if (this._textScale <= 0) {
      return this;
    }
    const allLineWidth = [0];
    for (let ii = 0;ii < inMessage.length; ++ii) {
      if (inMessage[ii] == "\n") {
        allLineWidth.push(0);
      } else {
        allLineWidth[allLineWidth.length - 1] += 1;
      }
    }
    if (allLineWidth.length === 0) {
      return this;
    }
    let lineIndex = 0;
    const currPos = [0, 0];
    const hScale = this._textScale * 0.5;
    switch (this._horizontalTextAlign) {
      case "left":
        currPos[0] = inPosition[0];
        break;
      case "centered":
        currPos[0] = inPosition[0] - allLineWidth[lineIndex] * hScale + hScale;
        break;
      case "right":
        currPos[0] = inPosition[0] - allLineWidth[lineIndex] * this._textScale + this._textScale;
        break;
    }
    switch (this._verticalTextAlign) {
      case "top":
        currPos[1] = inPosition[1];
        break;
      case "centered":
        currPos[1] = inPosition[1] + allLineWidth.length * hScale - hScale;
        break;
      case "bottom":
        currPos[1] = inPosition[1] - (allLineWidth.length - 1) * this._textScale;
        break;
    }
    for (let ii = 0;ii < inMessage.length; ++ii) {
      const letter = inMessage[ii];
      if (letter == "\n") {
        lineIndex += 1;
        switch (this._horizontalTextAlign) {
          case "left":
            currPos[0] = inPosition[0];
            break;
          case "centered":
            currPos[0] = inPosition[0] - allLineWidth[lineIndex] * hScale + hScale;
            break;
          case "right":
            currPos[0] = inPosition[0] - allLineWidth[lineIndex] * this._textScale + this._textScale;
            break;
        }
        currPos[1] -= this._textScale;
      } else {
        this._pushLetter(letter, currPos);
        currPos[0] += this._textScale;
      }
    }
    return this;
  }
  _pushLetter(inCharacter, inPosition) {
    if (this._currentSize + 90 >= this._buffer.length) {
      return;
    }
    const texCoord = this._texCoordMap.get(inCharacter);
    if (!texCoord)
      throw new Error(`fail to find a letter, letter=${inCharacter}`);
    for (let yy = -1;yy <= 1; ++yy) {
      for (let xx = -1;xx <= 1; ++xx) {
        this._buffer[this._currentSize++] = inPosition[0] + 2 * xx;
        this._buffer[this._currentSize++] = inPosition[1] + 2 * yy;
        this._buffer[this._currentSize++] = -0.1;
        this._buffer[this._currentSize++] = texCoord[0];
        this._buffer[this._currentSize++] = texCoord[1];
        this._buffer[this._currentSize++] = 0;
        this._buffer[this._currentSize++] = 0;
        this._buffer[this._currentSize++] = 0;
        this._buffer[this._currentSize++] = this._textScale;
      }
    }
    this._buffer[this._currentSize++] = inPosition[0];
    this._buffer[this._currentSize++] = inPosition[1];
    this._buffer[this._currentSize++] = 0;
    this._buffer[this._currentSize++] = texCoord[0];
    this._buffer[this._currentSize++] = texCoord[1];
    this._buffer[this._currentSize++] = this._textColor[0];
    this._buffer[this._currentSize++] = this._textColor[1];
    this._buffer[this._currentSize++] = this._textColor[2];
    this._buffer[this._currentSize++] = this._textScale;
  }
  flush(composedMatrix) {
    if (this._currentSize === 0) {
      return this;
    }
    this._shader.bind((boundShader) => {
      boundShader.setMatrix4Uniform("u_composedMatrix", composedMatrix);
      boundShader.setTextureUniform("u_texture", this._texture, 0);
      this._geometry.updateBuffer(1, this._buffer, this._currentSize);
      this._geometry.setInstancedCount(this._currentSize / 9);
      this._geometry.render();
    });
    exports_graphics.webgl2.Texture.unbind();
    this.clear();
    return this;
  }
  clear() {
    this._currentSize = 0;
    return this;
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-trace
var defaultColor = [0.2, 0.2, 0.2];
var activatedColor = [0.2, 0.6, 0.2];
var _renderIndicator = (currIndicator, stackRenderers, textRenderer) => {
  const { center } = currIndicator;
  stackRenderers.pushCenteredRectangle(exports_vec3.fromValues(center[0], center[1], -0.3), currIndicator.size, [0, 0, 0]);
  stackRenderers.pushCenteredRectangle(exports_vec3.fromValues(center[0], center[1], -0.2), [currIndicator.size[0] - 2, currIndicator.size[1] - 2], currIndicator.color);
  if (currIndicator.text) {
    textRenderer.setTextScale(16).setTextAlign("centered", "centered").pushText(currIndicator.text, center).setTextAlign("left", "top");
  }
  if (currIndicator.lines) {
    currIndicator.lines.forEach((currLine) => {
      stackRenderers.pushThickLine([center[0] + currLine.a[0], center[1] + currLine.a[1], 0], [center[0] + currLine.b[0], center[1] + currLine.b[1], 0], currLine.thickness, currLine.color);
    });
  }
};
var addKeyStrokesWidgets = (inPos, stackRenderers, textRenderer) => {
  _renderIndicator({
    center: [inPos[0], inPos[1]],
    size: [40, 40],
    text: "A\nQ",
    color: exports_system.browser.GlobalKeyboardManager.isPressed("A", "Q") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45, inPos[1]],
    size: [40, 40],
    text: "S",
    color: exports_system.browser.GlobalKeyboardManager.isPressed("S") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45, inPos[1] + 45],
    size: [40, 40],
    text: "W\nZ",
    color: exports_system.browser.GlobalKeyboardManager.isPressed("W", "Z") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 90, inPos[1]],
    size: [40, 40],
    text: "D",
    color: exports_system.browser.GlobalKeyboardManager.isPressed("D") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
};
var addArrowStrokesWidgets = (inPos, stackRenderers, textRenderer) => {
  _renderIndicator({
    center: [inPos[0], inPos[1]],
    size: [40, 40],
    lines: [
      { a: [15, 0], b: [-8, 0], thickness: 6, color: [1, 1, 1] },
      { a: [0, 10], b: [-12, -2], thickness: 6, color: [1, 1, 1] },
      { a: [0, -10], b: [-12, 2], thickness: 6, color: [1, 1, 1] }
    ],
    color: exports_system.browser.GlobalKeyboardManager.isPressed("ArrowLeft") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45, inPos[1]],
    size: [40, 40],
    lines: [
      { a: [0, 15], b: [0, -8], thickness: 6, color: [1, 1, 1] },
      { a: [10, 0], b: [-2, -12], thickness: 6, color: [1, 1, 1] },
      { a: [-10, 0], b: [2, -12], thickness: 6, color: [1, 1, 1] }
    ],
    color: exports_system.browser.GlobalKeyboardManager.isPressed("ArrowDown") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45, inPos[1] + 45],
    size: [40, 40],
    lines: [
      { a: [0, -15], b: [0, 8], thickness: 6, color: [1, 1, 1] },
      { a: [10, 0], b: [-2, 12], thickness: 6, color: [1, 1, 1] },
      { a: [-10, 0], b: [2, 12], thickness: 6, color: [1, 1, 1] }
    ],
    color: exports_system.browser.GlobalKeyboardManager.isPressed("ArrowUp") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 90, inPos[1]],
    size: [40, 40],
    lines: [
      { a: [-15, 0], b: [8, 0], thickness: 6, color: [1, 1, 1] },
      { a: [0, 10], b: [12, -2], thickness: 6, color: [1, 1, 1] },
      { a: [0, -10], b: [12, 2], thickness: 6, color: [1, 1, 1] }
    ],
    color: exports_system.browser.GlobalKeyboardManager.isPressed("ArrowRight") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
};
var addKeysTouchesWidgets = (inCanvasElement, inPos, stackRenderers, textRenderer) => {
  if (exports_system.browser.GlobalTouchManager.isSupported(inCanvasElement)) {
    _renderIndicator({
      center: [inPos[0] + 115, inPos[1]],
      size: [230, 60],
      text: "Touch Events\nSupported\n(double tap)",
      color: [0, 0.5, 0]
    }, stackRenderers, textRenderer);
  } else {
    _renderIndicator({
      center: [inPos[0] + 115, inPos[1]],
      size: [230, 60],
      text: "Touch Events\nNot Supported",
      color: [0.5, 0, 0]
    }, stackRenderers, textRenderer);
  }
  if (exports_system.browser.GlobalPointerLockManager.canBePointerLocked(inCanvasElement)) {
    _renderIndicator({
      center: [inPos[0] + 105, inPos[1] + 70],
      size: [210, 60],
      text: "Mouse\nSupported",
      color: [0, 0.5, 0]
    }, stackRenderers, textRenderer);
  } else {
    _renderIndicator({
      center: [inPos[0] + 105, inPos[1] + 70],
      size: [210, 60],
      text: "Mouse Events\nNot Supported",
      color: [0.5, 0, 0]
    }, stackRenderers, textRenderer);
  }
};
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-trace
var renderFpsMeter = (inPos, inSize, inFrameProfiler, inStackRenderers, inTextRenderer, inShowFps = false) => {
  const k_divider = 5;
  const k_verticalSize = Math.ceil(inFrameProfiler.maxDelta / k_divider) * k_divider;
  {
    inStackRenderers.pushOriginBoundRectangle(inPos, inSize, [0, 0, 0, 0.5]);
    const allVertices = [
      [inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 0, 0],
      [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 0, 0],
      [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 1, 0],
      [inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 1, 0]
    ];
    inStackRenderers.pushLine(allVertices[0], allVertices[1], [1, 1, 1]);
    inStackRenderers.pushLine(allVertices[1], allVertices[2], [1, 1, 1]);
    inStackRenderers.pushLine(allVertices[2], allVertices[3], [1, 1, 1]);
    inStackRenderers.pushLine(allVertices[3], allVertices[0], [1, 1, 1]);
  }
  {
    for (let currDivider = k_divider;currDivider < k_verticalSize; currDivider += k_divider) {
      const ratio = currDivider / k_verticalSize;
      const pointA = [
        inPos[0] + 0,
        inPos[1] + inSize[1] * ratio,
        0
      ];
      const pointB = [
        inPos[0] + inSize[0],
        inPos[1] + inSize[1] * ratio,
        0
      ];
      inStackRenderers.pushLine(pointA, pointB, [0.5, 0.5, 0.5]);
    }
  }
  {
    if (inFrameProfiler.framesDelta.length >= 2) {
      const widthStep = inSize[0] / inFrameProfiler.framesDelta.length;
      let prevDelta = inFrameProfiler.framesDelta[0];
      let prevCoordX = 0;
      let prevCoordY = inSize[1] * prevDelta / k_verticalSize;
      for (let ii = 1;ii < inFrameProfiler.framesDelta.length; ++ii) {
        const currDelta = inFrameProfiler.framesDelta[ii];
        const currCoordX = ii * widthStep;
        const currCoordY = inSize[1] * currDelta / k_verticalSize;
        const pointA = [
          inPos[0] + prevCoordX,
          inPos[1] + prevCoordY,
          0
        ];
        const pointB = [
          inPos[0] + currCoordX,
          inPos[1] + currCoordY,
          0
        ];
        inStackRenderers.pushLine(pointA, pointB, [1, 1, 1]);
        prevDelta = currDelta;
        prevCoordX = currCoordX;
        prevCoordY = currCoordY;
      }
    }
  }
  {
    const k_textScale = 14;
    const k_textHScale = k_textScale * 0.5;
    const averageValue = inFrameProfiler.averageDelta;
    const maxValue = inFrameProfiler.maxDelta;
    const minValue = inFrameProfiler.minDelta;
    let averageStr = `~${averageValue.toFixed(0)}ms`;
    let maxStr = `<${maxValue}ms`;
    let minStr = `>${minValue}ms`;
    if (inShowFps === true) {
      const _getFpsStr = (inVal) => inVal < 999 ? inVal.toFixed(0) : "???";
      averageStr += `\n~${_getFpsStr(1000 / averageValue)}fps`;
      maxStr += `\n<${_getFpsStr(1000 / maxValue)}fps`;
      minStr += `\n>${_getFpsStr(1000 / minValue)}fps`;
    }
    inTextRenderer.setTextScale(k_textScale).setTextAlign("left", "top").setTextColor(1, 1, 0.75).pushText(averageStr, [inPos[0] + 7, inPos[1] - 8]).setTextAlign("left", "centered").setTextColor(1, 0.75, 0.75).pushText(maxStr, [
      inPos[0] + inSize[0] + k_textHScale,
      inPos[1] + inSize[1] - k_textHScale * 1
    ]).setTextColor(0.75, 1, 0.75).pushText(minStr, [
      inPos[0] + inSize[0] + k_textHScale,
      inPos[1] + k_textHScale * 1
    ]).setTextColor(1, 1, 1);
  }
};
// srcjects/webgl-ray-tracer/src/experiment/graphics
var exports_webgl2 = {};
__export(exports_webgl2, {
  getCubeMapType: () => {
    {
      return getCubeMapType;
    }
  },
  WebGLContext: () => {
    {
      return WebGLContext;
    }
  },
  Texture: () => {
    {
      return Texture;
    }
  },
  ShaderProgram: () => {
    {
      return ShaderProgram;
    }
  },
  GeometryWrapper: () => {
    {
      return GeometryWrapper;
    }
  },
  FrameBuffer: () => {
    {
      return FrameBuffer;
    }
  },
  DataTexture: () => {
    {
      return DataTexture;
    }
  },
  CubeMapType: () => {
    {
      return CubeMapType;
    }
  },
  CubeMap: () => {
    {
      return CubeMap;
    }
  }
});

// srcjects/webgl-ray-tracer/src/experiment/graphics/render
class WebGLContext {
  static _gl = null;
  static _extensionLoseContext = null;
  static initialize(canvas) {
    const renderingContextAttribs = {
      alpha: false,
      antialias: false,
      depth: true,
      failIfMajorPerformanceCaveat: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
      preserveDrawingBuffer: true,
      stencil: false
    };
    WebGLContext._gl = canvas.getContext("webgl2", renderingContextAttribs);
    if (!WebGLContext._gl)
      throw new Error("could not create webgl context");
    WebGLContext._extensionLoseContext = WebGLContext._gl.getExtension("WEBGL_lose_context");
    WebGLContext._gl.getExtension("EXT_color_buffer_float");
    WebGLContext._gl.getExtension("EXT_float_blend");
  }
  static getContext() {
    if (!WebGLContext._gl)
      throw new Error("webgl context not initialized");
    return WebGLContext._gl;
  }
  static getExtensionLoseContext() {
    return WebGLContext._extensionLoseContext;
  }
  static getExtensionLoseContextStrict() {
    if (!WebGLContext._extensionLoseContext)
      throw new Error("lose context extension not available");
    return WebGLContext._extensionLoseContext;
  }
}

// srcjects/webgl-ray-tracer/src/experiment/graphics/r
var CubeMapType;
(function(CubeMapType2) {
  CubeMapType2[CubeMapType2["positiveX"] = 0] = "positiveX";
  CubeMapType2[CubeMapType2["negativeX"] = 1] = "negativeX";
  CubeMapType2[CubeMapType2["positiveY"] = 2] = "positiveY";
  CubeMapType2[CubeMapType2["negativeY"] = 3] = "negativeY";
  CubeMapType2[CubeMapType2["positiveZ"] = 4] = "positiveZ";
  CubeMapType2[CubeMapType2["negativeZ"] = 5] = "negativeZ";
})(CubeMapType || (CubeMapType = {}));
var getCubeMapType = (inType) => {
  const gl = WebGLContext.getContext();
  switch (inType) {
    case CubeMapType.positiveX:
      return gl.TEXTURE_CUBE_MAP_POSITIVE_X;
    case CubeMapType.negativeX:
      return gl.TEXTURE_CUBE_MAP_NEGATIVE_X;
    case CubeMapType.positiveY:
      return gl.TEXTURE_CUBE_MAP_POSITIVE_Y;
    case CubeMapType.negativeY:
      return gl.TEXTURE_CUBE_MAP_NEGATIVE_Y;
    case CubeMapType.positiveZ:
      return gl.TEXTURE_CUBE_MAP_POSITIVE_Z;
    case CubeMapType.negativeZ:
      return gl.TEXTURE_CUBE_MAP_NEGATIVE_Z;
  }
};

class CubeMap {
  _width = 0;
  _height = 0;
  _minBufferSize = 0;
  _texture = null;
  initialize(width, height) {
    if (width < 1)
      throw new Error(`cube map: width is < 1, input: ${width}`);
    if (height < 1)
      throw new Error(`cube map: height is < 1, input: ${height}`);
    const gl = WebGLContext.getContext();
    this._texture = gl.createTexture();
    this._width = width;
    this._height = height;
    this._minBufferSize = this._width * this._height * 4;
  }
  rawBind() {
    if (!this._texture)
      throw new Error("cube map: not initialized");
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
  }
  bind(inCallback) {
    this.rawBind();
    inCallback(this);
    CubeMap.unbind();
  }
  static unbind() {
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
  }
  loadFromMemory(inType, inPixels) {
    if (!this._texture)
      throw new Error("cube map: not initialized");
    if (inPixels.length < this._minBufferSize)
      throw new Error(`cube map: miss-matching pixels buffer size, input: ${inPixels.length}`);
    const gl = WebGLContext.getContext();
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.texImage2D(getCubeMapType(inType), level, internalFormat, this._width, this._height, border, srcFormat, srcType, inPixels);
  }
  allocate() {
    const gl = WebGLContext.getContext();
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixels = new Uint8Array(this._width * this._height * 4);
    [
      CubeMapType.negativeX,
      CubeMapType.negativeY,
      CubeMapType.negativeZ,
      CubeMapType.positiveX,
      CubeMapType.positiveY,
      CubeMapType.positiveZ
    ].forEach((type) => {
      gl.texImage2D(getCubeMapType(type), level, internalFormat, this._width, this._height, border, srcFormat, srcType, pixels);
    });
  }
  complete() {
    const gl = WebGLContext.getContext();
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  }
  getWidth() {
    if (!this._texture)
      throw new Error("cube map: not initialized");
    return this._width;
  }
  getHeight() {
    if (!this._texture)
      throw new Error("cube map: not initialized");
    return this._height;
  }
  getRawObject() {
    if (!this._texture)
      throw new Error("texture not initialized");
    return this._texture;
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/rende
class DataTexture {
  _texture = null;
  initialize(data = []) {
    if (this._texture)
      throw new Error("data texture already initialized");
    const gl = WebGLContext.getContext();
    this._texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    this.update(data);
  }
  update(data) {
    if (!this._texture)
      throw new Error("data texture not initialized");
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    const expandedData = new Float32Array(data);
    const level = 0;
    const internalFormat = gl.R32F;
    const width = data.length;
    const height = 1;
    const border = 0;
    const format = gl.RED;
    const type = gl.FLOAT;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, expandedData);
  }
  rawBind() {
    if (!this._texture)
      throw new Error("data texture not initialized");
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
  }
  preBind(inCallback) {
    this.rawBind();
    inCallback(this);
  }
  bind(inCallback) {
    this.preBind(inCallback);
    DataTexture.unbind();
  }
  static unbind() {
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/rende
class FrameBuffer {
  _frameBuffer;
  constructor() {
    const gl = WebGLContext.getContext();
    const tmpFbo = gl.createFramebuffer();
    if (tmpFbo === null)
      throw new Error("null frame buffer object");
    this._frameBuffer = tmpFbo;
  }
  rawBind() {
    const gl = WebGLContext.getContext();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
  }
  bind(inCallback) {
    this.rawBind();
    inCallback(this);
    FrameBuffer.unbind();
  }
  static unbind() {
    const gl = WebGLContext.getContext();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
  attachTexture(texture) {
    const gl = WebGLContext.getContext();
    const mipmapLevel = 0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture.getRawObject(), mipmapLevel);
  }
  attachCubeMap(texture, type) {
    const gl = WebGLContext.getContext();
    const mipmapLevel = 0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, getCubeMapType(type), texture.getRawObject(), mipmapLevel);
  }
  getPixels(x, y, width, height, outDst) {
    const gl = WebGLContext.getContext();
    gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, outDst);
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/re
var GeometryWrapper;
(function(GeometryWrapper) {
  GeometryWrapper.BytesPerPixel = 4;
  let AttributeType;
  (function(AttributeType2) {
    AttributeType2[AttributeType2["float"] = 0] = "float";
    AttributeType2[AttributeType2["vec2f"] = 1] = "vec2f";
    AttributeType2[AttributeType2["vec3f"] = 2] = "vec3f";
    AttributeType2[AttributeType2["vec4f"] = 3] = "vec4f";
    AttributeType2[AttributeType2["mat3f"] = 4] = "mat3f";
    AttributeType2[AttributeType2["mat4f"] = 5] = "mat4f";
  })(AttributeType = GeometryWrapper.AttributeType || (GeometryWrapper.AttributeType = {}));
  const getAttrTypeSize = (inType) => {
    switch (inType) {
      case AttributeType.float:
        return 1;
      case AttributeType.vec2f:
        return 2;
      case AttributeType.vec3f:
        return 3;
      case AttributeType.vec4f:
        return 4;
      case AttributeType.mat3f:
        return 9;
      case AttributeType.mat4f:
        return 16;
    }
  };
  let PrimitiveType;
  (function(PrimitiveType2) {
    PrimitiveType2[PrimitiveType2["lines"] = 0] = "lines";
    PrimitiveType2[PrimitiveType2["triangles"] = 1] = "triangles";
    PrimitiveType2[PrimitiveType2["triangleStrip"] = 2] = "triangleStrip";
  })(PrimitiveType = GeometryWrapper.PrimitiveType || (GeometryWrapper.PrimitiveType = {}));

  class Geometry {
    _def;
    _vao;
    _vbos;
    _primitiveType;
    _primitiveStart = 0;
    _primitiveCount = 0;
    _instanceCount = 0;
    _isInstanced = false;
    constructor(shader, def) {
      const gl = WebGLContext.getContext();
      if (def.vbos.length === 0) {
        throw new Error("empty vbo definition");
      }
      for (const vbo of def.vbos) {
        if (vbo.attrs.length === 0) {
          throw new Error("empty vbo attribute definition");
        }
        for (const attr of vbo.attrs) {
          if (!shader.hasAttribute(attr.name)) {
            throw new Error(`attribute not found, name="${attr.name}"`);
          }
        }
      }
      this._def = def;
      switch (def.primitiveType) {
        case PrimitiveType.lines:
          this._primitiveType = gl.LINES;
          break;
        case PrimitiveType.triangles:
          this._primitiveType = gl.TRIANGLES;
          break;
        case PrimitiveType.triangleStrip:
          this._primitiveType = gl.TRIANGLE_STRIP;
          break;
        default:
          throw new Error("primitive type not found");
      }
      const newVao = gl.createVertexArray();
      if (!newVao) {
        throw new Error("fail o create a vao unit");
      }
      this._vao = newVao;
      gl.bindVertexArray(this._vao);
      this._vbos = [];
      for (const vboDef of this._def.vbos) {
        const newVbo = gl.createBuffer();
        if (!newVbo) {
          throw new Error("fail o create a vbo unit");
        }
        this._vbos.push({
          object: newVbo,
          maxSize: 0,
          dynamic: vboDef.dynamic || false
        });
        gl.bindBuffer(gl.ARRAY_BUFFER, newVbo);
        let stride = vboDef.stride || 0;
        if (!stride) {
          for (const attr of vboDef.attrs) {
            switch (attr.type) {
              case AttributeType.float:
                stride += 1;
                break;
              case AttributeType.vec2f:
                stride += 2;
                break;
              case AttributeType.vec3f:
                stride += 3;
                break;
              case AttributeType.vec4f:
                stride += 4;
                break;
              case AttributeType.mat3f:
                stride += 9;
                break;
              case AttributeType.mat4f:
                stride += 16;
                break;
            }
          }
          stride *= GeometryWrapper.BytesPerPixel;
        }
        for (const attr of vboDef.attrs) {
          let rowSize = 1;
          let totalRows = 1;
          switch (attr.type) {
            case AttributeType.float:
              rowSize = 1;
              totalRows = 1;
              break;
            case AttributeType.vec2f:
              rowSize = 2;
              totalRows = 1;
              break;
            case AttributeType.vec3f:
              rowSize = 3;
              totalRows = 1;
              break;
            case AttributeType.vec4f:
              rowSize = 4;
              totalRows = 1;
              break;
            case AttributeType.mat3f:
              rowSize = 3;
              totalRows = 3;
              break;
            case AttributeType.mat4f:
              rowSize = 4;
              totalRows = 4;
              break;
          }
          const attrLocation = shader.getAttribute(attr.name);
          for (let ii = 0;ii < totalRows; ++ii) {
            const attrId = attrLocation + ii;
            const rowIndex = (attr.index + ii * rowSize) * GeometryWrapper.BytesPerPixel;
            gl.enableVertexAttribArray(attrId);
            gl.vertexAttribPointer(attrId, rowSize, gl.FLOAT, false, stride, rowIndex);
            if (vboDef.instanced === true) {
              gl.vertexAttribDivisor(attrId, 1);
              this._isInstanced = true;
            }
          }
        }
      }
      gl.bindVertexArray(null);
    }
    dispose() {
      const gl = WebGLContext.getContext();
      for (const vbo of this._vbos)
        gl.deleteBuffer(vbo.object);
      this._vbos.length = 0;
      gl.deleteVertexArray(this._vao);
    }
    setBufferSize(index, inSize) {
      if (index < 0 || index >= this._vbos.length) {
        throw new Error("no buffer available to that index");
      }
      if (inSize <= 0) {
        return;
      }
      const currVbo = this._vbos[index];
      if (inSize < currVbo.maxSize) {
        return;
      }
      currVbo.maxSize = inSize;
      const gl = WebGLContext.getContext();
      const usage = currVbo.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
      gl.bindBuffer(gl.ARRAY_BUFFER, currVbo.object);
      gl.bufferData(gl.ARRAY_BUFFER, inSize, usage);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    setFloatBufferSize(index, inSize) {
      this.setBufferSize(index, inSize * 4);
    }
    updateBuffer(index, vertices, inSize) {
      if (index < 0 || index >= this._vbos.length) {
        throw new Error("no buffer available to that index");
      }
      if (inSize <= 0) {
        return;
      }
      const gl = WebGLContext.getContext();
      const buffer = vertices instanceof Float32Array ? vertices : new Float32Array(vertices);
      const currVbo = this._vbos[index];
      gl.bindBuffer(gl.ARRAY_BUFFER, currVbo.object);
      if (inSize > currVbo.maxSize) {
        currVbo.maxSize = inSize;
        const usage = currVbo.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
        gl.bufferData(gl.ARRAY_BUFFER, buffer, usage, 0, inSize);
      } else {
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, buffer, 0, inSize);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    render() {
      if (this._primitiveCount == 0) {
        return;
      }
      if (this._isInstanced && this._instanceCount == 0) {
        return;
      }
      const gl = WebGLContext.getContext();
      gl.bindVertexArray(this._vao);
      if (this._isInstanced === true) {
        gl.drawArraysInstanced(this._primitiveType, this._primitiveStart, this._primitiveCount, this._instanceCount);
      } else {
        gl.drawArrays(this._primitiveType, this._primitiveStart, this._primitiveCount);
      }
      gl.bindVertexArray(null);
    }
    setPrimitiveStart(start) {
      this._primitiveStart = start;
    }
    setPrimitiveCount(count) {
      this._primitiveCount = count;
    }
    setInstancedCount(count) {
      this._instanceCount = count;
    }
  }
  GeometryWrapper.Geometry = Geometry;

  class GeometryBuilder {
    _def = {
      vbos: [],
      primitiveType: PrimitiveType.lines
    };
    reset() {
      this._def = {
        vbos: [],
        primitiveType: PrimitiveType.lines
      };
      return this;
    }
    getDef() {
      return this._def;
    }
    setPrimitiveType(inPrimitive) {
      this._def.primitiveType = PrimitiveType[inPrimitive];
      return this;
    }
    addVbo() {
      this._def.vbos.push({
        attrs: [],
        instanced: false
      });
      return this;
    }
    setVboAsInstanced() {
      this._getLastVbo().instanced = true;
      return this;
    }
    setVboAsDynamic() {
      this._getLastVbo().dynamic = true;
      return this;
    }
    setStride(inStride) {
      this._getLastVbo().stride = inStride;
      return this;
    }
    addVboAttribute(inName, inType) {
      const currVbo = this._getLastVbo();
      const lastAttr = currVbo.attrs.length > 0 ? currVbo.attrs[currVbo.attrs.length - 1] : null;
      currVbo.attrs.push({
        name: inName,
        type: AttributeType[inType],
        index: lastAttr ? lastAttr.index + getAttrTypeSize(lastAttr.type) : 0
      });
      return this;
    }
    _getLastVbo() {
      if (this._def.vbos.length === 0) {
        throw new Error("no VBO setup");
      }
      return this._def.vbos[this._def.vbos.length - 1];
    }
  }
  GeometryWrapper.GeometryBuilder = GeometryBuilder;
})(GeometryWrapper || (GeometryWrapper = {}));
// srcjects/webgl-ray-tracer/src/experiment/graphics/rendere
class ShaderProgram {
  static _isBound = null;
  _name;
  _program;
  _attributes = new Map;
  _uniforms = new Map;
  constructor(inName, opt) {
    this._name = inName;
    const gl = WebGLContext.getContext();
    const vertexShader = this._getShader(opt.vertexSrc, gl.VERTEX_SHADER);
    const fragmentShader = this._getShader(opt.fragmentSrc, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!program)
      throw new Error("could not create a shader program");
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const lastError = gl.getProgramInfoLog(program);
      throw new Error("Failed to initialized shaders, Error linking:" + lastError);
    }
    this._program = program;
    this.bind(() => {
      this._getAttributes(opt.attributes);
      this._getUniforms(opt.uniforms);
    });
  }
  bind(inCallback) {
    if (ShaderProgram._isBound !== null) {
      throw new Error(`Double shader binding (bound: ${ShaderProgram._isBound._name}, binding: ${this._name})`);
    }
    ShaderProgram._isBound = this;
    const gl = WebGLContext.getContext();
    gl.useProgram(this._program);
    inCallback(this);
    ShaderProgram.unbind();
  }
  static unbind() {
    const gl = WebGLContext.getContext();
    gl.useProgram(null);
    ShaderProgram._isBound = null;
  }
  isBound() {
    return ShaderProgram._isBound === this;
  }
  hasAttribute(name) {
    return this._attributes.has(name);
  }
  getAttribute(name) {
    const attribute = this._attributes.get(name);
    if (attribute === undefined)
      throw new Error(`attribute not found: ${name}`);
    return attribute;
  }
  getUniform(name) {
    const uniform = this._uniforms.get(name);
    if (uniform === undefined)
      throw new Error(`uniform not found: ${name}`);
    return uniform;
  }
  setTextureUniform(inName, inTexture, inIndex) {
    const gl = WebGLContext.getContext();
    gl.activeTexture(gl.TEXTURE0 + inIndex);
    gl.uniform1i(this.getUniform(inName), inIndex);
    inTexture.rawBind();
  }
  setInteger1Uniform(inName, inValue) {
    const gl = WebGLContext.getContext();
    gl.uniform1i(this.getUniform(inName), inValue);
  }
  setInteger2Uniform(inName, inValueX, inValueY) {
    const gl = WebGLContext.getContext();
    gl.uniform2i(this.getUniform(inName), inValueX, inValueY);
  }
  setInteger3Uniform(inName, inValueX, inValueY, inValueZ) {
    const gl = WebGLContext.getContext();
    gl.uniform3i(this.getUniform(inName), inValueX, inValueY, inValueZ);
  }
  setFloat1Uniform(inName, inValue) {
    const gl = WebGLContext.getContext();
    gl.uniform1f(this.getUniform(inName), inValue);
  }
  setFloat2Uniform(inName, inValueX, inValueY) {
    const gl = WebGLContext.getContext();
    gl.uniform2f(this.getUniform(inName), inValueX, inValueY);
  }
  setFloat3Uniform(inName, inValueX, inValueY, inValueZ) {
    const gl = WebGLContext.getContext();
    gl.uniform3f(this.getUniform(inName), inValueX, inValueY, inValueZ);
  }
  setMatrix4Uniform(inName, inMatrix) {
    const gl = WebGLContext.getContext();
    gl.uniformMatrix4fv(this.getUniform(inName), false, inMatrix);
  }
  _getAttributes(attributes) {
    const gl = WebGLContext.getContext();
    for (let ii = 0;ii < attributes.length; ++ii) {
      const value = gl.getAttribLocation(this._program, attributes[ii]);
      if (value < 0)
        throw new Error(`attribute not found => ${attributes[ii]}`);
      this._attributes.set(attributes[ii], value);
    }
  }
  _getUniforms(uniforms) {
    const gl = WebGLContext.getContext();
    for (let ii = 0;ii < uniforms.length; ++ii) {
      const value = gl.getUniformLocation(this._program, uniforms[ii]);
      if (value === null)
        throw new Error(`uniform not found => ${uniforms[ii]}`);
      this._uniforms.set(uniforms[ii], value);
    }
  }
  _getShader(src, type) {
    const gl = WebGLContext.getContext();
    const shader = gl.createShader(type);
    if (!shader)
      throw new Error("could not create a shader");
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      let error_str = gl.getShaderInfoLog(shader);
      if (!error_str)
        error_str = "failed to compile a shader";
      throw new Error(error_str);
    }
    return shader;
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/r
class Texture {
  _width = 0;
  _height = 0;
  _texture = null;
  initialize() {
    if (this._texture)
      throw new Error("texture: already initialized");
    const gl = WebGLContext.getContext();
    this._texture = gl.createTexture();
  }
  rawBind() {
    if (!this._texture)
      throw new Error("texture: not initialized");
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
  }
  preBind(inCallback) {
    this.rawBind();
    inCallback(this);
  }
  bind(inCallback) {
    this.preBind(inCallback);
    Texture.unbind();
  }
  static unbind() {
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
  load(inImage) {
    if (!this._texture)
      throw new Error("texture: not initialized");
    const gl = WebGLContext.getContext();
    this._width = inImage.width;
    this._height = inImage.height;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, inImage);
  }
  loadFromMemory(inWidth, inHeight, inPixels) {
    this._allocate(inWidth, inHeight, inPixels);
  }
  allocate(inWidth, inHeight) {
    this._allocate(inWidth, inHeight);
  }
  resize(inWidth, inHeight) {
    this._allocate(inWidth, inHeight);
  }
  _allocate(inWidth, inHeight, inPixels = null) {
    if (!this._texture)
      throw new Error("texture: not initialized");
    const gl = WebGLContext.getContext();
    this._width = inWidth;
    this._height = inHeight;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, inWidth, inHeight, border, srcFormat, srcType, inPixels);
  }
  getWidth() {
    if (!this._texture)
      throw new Error("texture not initialized");
    return this._width;
  }
  getHeight() {
    if (!this._texture)
      throw new Error("texture not initialized");
    return this._height;
  }
  getRawObject() {
    if (!this._texture)
      throw new Error("texture not initialized");
    return this._texture;
  }
  static getImageFromUrl(url) {
    return new Promise((resolve, reject) => {
      const image = new Image;
      image.onerror = reject;
      image.onload = () => {
        resolve(image);
      };
      image.src = url;
    });
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/
class Logger {
  _textAreaElement;
  _lines = [];
  _maxLines = 30;
  constructor(textAreaElementId) {
    this._textAreaElement = document.getElementById(textAreaElementId);
    if (!this._textAreaElement)
      throw new Error(`DOM elements not found, id=${textAreaElementId}`);
    this._textAreaElement.value = "";
  }
  log(...args) {
    if (args.length === 0)
      return;
    const text = Array.prototype.slice.call(args).join(" ");
    console.log(text);
    this._pushText(text);
  }
  error(...args) {
    if (args.length === 0)
      return;
    const text = Array.prototype.slice.call(args).join(" ");
    console.error(text);
    this._pushText(`[ERR] - ${text}`);
  }
  _pushText(text) {
    this._lines.push(text);
    if (this._lines.length > this._maxLines)
      this._lines.splice(0, this._lines.length - this._maxLines);
    this._textAreaElement.value = `${this._lines.join("\n")}\n`;
    this._textAreaElement.scrollTop = this._textAreaElement.scrollHeight;
  }
  peekLast() {
    if (this._lines.length > 0)
      return this._lines[this._lines.length - 1];
    return;
  }
  popLast() {
    if (this._lines.length > 0)
      this._lines.splice(this._lines.length - 1, 1);
  }
}

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tra
class FrameProfiler3 {
  _framesDelta = [];
  _averageDelta = 0;
  _minDelta = 0;
  _maxDelta = 0;
  pushDelta(inDelta) {
    if (this._framesDelta.length >= 100) {
      this._framesDelta.shift();
    }
    this._framesDelta.push(inDelta);
    this._minDelta = 999999999;
    this._maxDelta = -999999999;
    this._averageDelta = 0;
    for (const currDelta of this._framesDelta) {
      this._minDelta = Math.min(this._minDelta, currDelta);
      this._maxDelta = Math.max(this._maxDelta, currDelta);
      this._averageDelta += currDelta;
    }
    this._averageDelta /= this._framesDelta.length;
  }
  get framesDelta() {
    return this._framesDelta;
  }
  get averageDelta() {
    return this._averageDelta;
  }
  get minDelta() {
    return this._minDelta;
  }
  get maxDelta() {
    return this._maxDelta;
  }
}

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shade
var renderFpsMeter3 = (inPos, inSize, inFrameProfiler, inStackRenderers, inTextRenderer, inShowFps = false) => {
  const k_divider = 5;
  const k_verticalSize = Math.ceil(inFrameProfiler.maxDelta / k_divider) * k_divider;
  {
    inStackRenderers.pushOriginBoundRectangle(inPos, inSize, [0, 0, 0, 0.5]);
    const allVertices = [
      [inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 0, 0],
      [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 0, 0],
      [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 1, 0],
      [inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 1, 0]
    ];
    inStackRenderers.pushLine(allVertices[0], allVertices[1], [1, 1, 1]);
    inStackRenderers.pushLine(allVertices[1], allVertices[2], [1, 1, 1]);
    inStackRenderers.pushLine(allVertices[2], allVertices[3], [1, 1, 1]);
    inStackRenderers.pushLine(allVertices[3], allVertices[0], [1, 1, 1]);
  }
  {
    for (let currDivider = k_divider;currDivider < k_verticalSize; currDivider += k_divider) {
      const ratio = currDivider / k_verticalSize;
      const pointA = [
        inPos[0] + 0,
        inPos[1] + inSize[1] * ratio,
        0
      ];
      const pointB = [
        inPos[0] + inSize[0],
        inPos[1] + inSize[1] * ratio,
        0
      ];
      inStackRenderers.pushLine(pointA, pointB, [0.5, 0.5, 0.5]);
    }
  }
  {
    if (inFrameProfiler.framesDelta.length >= 2) {
      const widthStep = inSize[0] / inFrameProfiler.framesDelta.length;
      let prevDelta = inFrameProfiler.framesDelta[0];
      let prevCoordX = 0;
      let prevCoordY = inSize[1] * prevDelta / k_verticalSize;
      for (let ii = 1;ii < inFrameProfiler.framesDelta.length; ++ii) {
        const currDelta = inFrameProfiler.framesDelta[ii];
        const currCoordX = ii * widthStep;
        const currCoordY = inSize[1] * currDelta / k_verticalSize;
        const pointA = [
          inPos[0] + prevCoordX,
          inPos[1] + prevCoordY,
          0
        ];
        const pointB = [
          inPos[0] + currCoordX,
          inPos[1] + currCoordY,
          0
        ];
        inStackRenderers.pushLine(pointA, pointB, [1, 1, 1]);
        prevDelta = currDelta;
        prevCoordX = currCoordX;
        prevCoordY = currCoordY;
      }
    }
  }
  {
    const k_textScale = 14;
    const k_textHScale = k_textScale * 0.5;
    const averageValue = inFrameProfiler.averageDelta;
    const maxValue = inFrameProfiler.maxDelta;
    const minValue = inFrameProfiler.minDelta;
    let averageStr = `~${averageValue.toFixed(0)}ms`;
    let maxStr = `<${maxValue}ms`;
    let minStr = `>${minValue}ms`;
    if (inShowFps === true) {
      const _getFpsStr = (inVal) => inVal < 999 ? inVal.toFixed(0) : "???";
      averageStr += `\n~${_getFpsStr(1000 / averageValue)}fps`;
      maxStr += `\n<${_getFpsStr(1000 / maxValue)}fps`;
      minStr += `\n>${_getFpsStr(1000 / minValue)}fps`;
    }
    inTextRenderer.setTextScale(k_textScale).setTextAlign("left", "top").setTextColor(1, 1, 0.75).pushText(averageStr, [inPos[0] + 7, inPos[1] - 8]).setTextAlign("left", "centered").setTextColor(1, 0.75, 0.75).pushText(maxStr, [
      inPos[0] + inSize[0] + k_textHScale,
      inPos[1] + inSize[1] - k_textHScale * 1
    ]).setTextColor(0.75, 1, 0.75).pushText(minStr, [
      inPos[0] + inSize[0] + k_textHScale,
      inPos[1] + k_textHScale * 1
    ]).setTextColor(1, 1, 1);
  }
};

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shade
var {
  GlobalKeyboardManager: GlobalKeyboardManager2,
  GlobalTouchManager: GlobalTouchManager2,
  GlobalPointerLockManager: GlobalPointerLockManager2
} = exports_system.browser;
var defaultColor2 = [0.2, 0.2, 0.2];
var activatedColor2 = [0.2, 0.6, 0.2];
var _addKeyStrokesWidgets = (inAllIndicator, inPos) => {
  inAllIndicator.push({
    center: [inPos[0], inPos[1]],
    size: [40, 40],
    text: "A\nQ",
    color: GlobalKeyboardManager2.isPressed("A", "Q") ? activatedColor2 : defaultColor2
  });
  inAllIndicator.push({
    center: [inPos[0] + 45, inPos[1]],
    size: [40, 40],
    text: "S",
    color: GlobalKeyboardManager2.isPressed("S") ? activatedColor2 : defaultColor2
  });
  inAllIndicator.push({
    center: [inPos[0] + 45, inPos[1] + 45],
    size: [40, 40],
    text: "W\nZ",
    color: GlobalKeyboardManager2.isPressed("W", "Z") ? activatedColor2 : defaultColor2
  });
  inAllIndicator.push({
    center: [inPos[0] + 90, inPos[1]],
    size: [40, 40],
    text: "D",
    color: GlobalKeyboardManager2.isPressed("D") ? activatedColor2 : defaultColor2
  });
};
var _addArrowStrokesWidgets = (inAllIndicator, inPos) => {
  inAllIndicator.push({
    center: [inPos[0], inPos[1]],
    size: [40, 40],
    lines: [
      { a: [15, 0], b: [-8, 0], thickness: 6, color: [1, 1, 1] },
      { a: [0, 10], b: [-12, -2], thickness: 6, color: [1, 1, 1] },
      { a: [0, -10], b: [-12, 2], thickness: 6, color: [1, 1, 1] }
    ],
    color: GlobalKeyboardManager2.isPressed("ArrowLeft") ? activatedColor2 : defaultColor2
  });
  inAllIndicator.push({
    center: [inPos[0] + 45, inPos[1]],
    size: [40, 40],
    lines: [
      { a: [0, 15], b: [0, -8], thickness: 6, color: [1, 1, 1] },
      { a: [10, 0], b: [-2, -12], thickness: 6, color: [1, 1, 1] },
      { a: [-10, 0], b: [2, -12], thickness: 6, color: [1, 1, 1] }
    ],
    color: GlobalKeyboardManager2.isPressed("ArrowDown") ? activatedColor2 : defaultColor2
  });
  inAllIndicator.push({
    center: [inPos[0] + 45, inPos[1] + 45],
    size: [40, 40],
    lines: [
      { a: [0, -15], b: [0, 8], thickness: 6, color: [1, 1, 1] },
      { a: [10, 0], b: [-2, 12], thickness: 6, color: [1, 1, 1] },
      { a: [-10, 0], b: [2, 12], thickness: 6, color: [1, 1, 1] }
    ],
    color: GlobalKeyboardManager2.isPressed("ArrowUp") ? activatedColor2 : defaultColor2
  });
  inAllIndicator.push({
    center: [inPos[0] + 90, inPos[1]],
    size: [40, 40],
    lines: [
      { a: [-15, 0], b: [8, 0], thickness: 6, color: [1, 1, 1] },
      { a: [0, 10], b: [12, -2], thickness: 6, color: [1, 1, 1] },
      { a: [0, -10], b: [12, 2], thickness: 6, color: [1, 1, 1] }
    ],
    color: GlobalKeyboardManager2.isPressed("ArrowRight") ? activatedColor2 : defaultColor2
  });
};
var _addKeysTouchesWidgets = (inAllIndicator, inCanvasElement, inPos) => {
  if (GlobalTouchManager2.isSupported(inCanvasElement)) {
    inAllIndicator.push({
      center: [inPos[0] + 115, inPos[1]],
      size: [230, 60],
      text: "Touch Events\nSupported\n(double tap)",
      color: [0, 0.5, 0]
    });
  } else {
    inAllIndicator.push({
      center: [inPos[0] + 115, inPos[1]],
      size: [230, 60],
      text: "Touch Events\nNot Supported",
      color: [0.5, 0, 0]
    });
  }
  if (GlobalPointerLockManager2.canBePointerLocked(inCanvasElement)) {
    inAllIndicator.push({
      center: [inPos[0] + 105, inPos[1] + 70],
      size: [210, 60],
      text: "Mouse\nSupported",
      color: [0, 0.5, 0]
    });
  } else {
    inAllIndicator.push({
      center: [inPos[0] + 105, inPos[1] + 70],
      size: [210, 60],
      text: "Mouse Events\nNot Supported",
      color: [0.5, 0, 0]
    });
  }
};
var renderControls2 = (inCanvasElement, stackRenderers, textRenderer) => {
  const allIndicator = [];
  const keyEventsPos = [27, 165];
  const touchEventsPos = [27, 260];
  const boardPos = [7, 35];
  _addKeyStrokesWidgets(allIndicator, keyEventsPos);
  _addArrowStrokesWidgets(allIndicator, touchEventsPos);
  _addKeysTouchesWidgets(allIndicator, inCanvasElement, boardPos);
  allIndicator.forEach((currIndicator) => {
    const { center } = currIndicator;
    stackRenderers.pushCenteredRectangle(exports_vec3.fromValues(center[0], center[1], -0.3), currIndicator.size, [0, 0, 0]);
    stackRenderers.pushCenteredRectangle(exports_vec3.fromValues(center[0], center[1], -0.2), [currIndicator.size[0] - 2, currIndicator.size[1] - 2], currIndicator.color);
    if (currIndicator.text) {
      textRenderer.setTextScale(16).setTextAlign("centered", "centered").pushText(currIndicator.text, center).setTextAlign("left", "top");
    }
    if (currIndicator.lines) {
      currIndicator.lines.forEach((currLine) => {
        stackRenderers.pushThickLine([center[0] + currLine.a[0], center[1] + currLine.a[1], 0], [center[0] + currLine.b[0], center[1] + currLine.b[1], 0], currLine.thickness, currLine.color);
      });
    }
  });
};

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/texture.glsl.fragrag
var ray_tracer_glsl_default = `
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
`.trim();

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/texture.glsl.fragrag
var ray_tracer_glsl_default2 = `
#version 300 es

precision highp float;

//
//
//


// Indices of refraction
const float Air = 1.0;
const float Glass = 1.51714;

// Air to glass ratio of the indices of refraction (Eta)
const float Eta = Air / Glass;

// see http://en.wikipedia.org/wiki/Refractive_index Reflectivity
const float R0 = ((Air - Glass) * (Air - Glass)) / ((Air + Glass) * (Air + Glass));


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
  if (h < 0.0) {
    return false;
  }

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

  if (tN > tF || tF <= 0.0) {
    return false;
  }

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

  if (u < 0.0 || v < 0.0 || (u + v) > 1.0 || t < nearValue || t > farValue) {
    return false;
  }

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

  if (u_sceneTextureSize <= 0) {
    return false;
  }

  RayValues tmpRay;
  vec3 normal;

  for (int index = u_spheresStart; index < u_spheresStop; index += 11)
  {
    bool shadowEnabled = (getSceneDataByIndex(index + 8) != 0.0);

    if (shadowMode && !shadowEnabled) {
      continue;
    }

    tmpRay.origin = ray.origin;
    tmpRay.direction = ray.direction;

    vec3 center = getSceneVec3ByIndex(index + 0);

    tmpRay.origin -= center;

    float radius = getSceneDataByIndex(index + 3);

    float currDistance = 0.0;
    if (
      !intersectSphere(tmpRay, radius, currDistance, normal) ||
      (bestDistance > 0.0 && currDistance > bestDistance)
    ) {
      continue;
    }

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

    if (shadowMode && !shadowEnabled) {
      continue;
    }

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
    if (
      !intersectBox(tmpRay, boxSize, currDistance, normal) ||
      (bestDistance > 0.0 && currDistance > bestDistance)
    ) {
      continue;
    }

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

    if (shadowMode && !shadowEnabled) {
      continue;
    }

    tmpRay.origin = ray.origin;
    tmpRay.direction = ray.direction;

    vec3 v0 = getSceneVec3ByIndex(index + 0);
    vec3 v1 = getSceneVec3ByIndex(index + 3);
    vec3 v2 = getSceneVec3ByIndex(index + 6);

    float currDistance = 0.0;
    if (
      !intersectTriangle(tmpRay, v0, v1, v2, currDistance, normal) ||
      (bestDistance > 0.0 && currDistance > bestDistance)
    ) {
      continue;
    }

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
    if (!g_shadowsEnabled) {
      continue;
    }

    vec3 lightDir = getLightsVec3ByIndex(index + 0);
    float localIntensity = getLightsDataByIndex(index + 3);

    float coef = localIntensity;
    lightDir = normalize(lightDir);

    // is the light blocked by an object?
    RayResult result;
    if (intersectScene(RayValues(impactPosition, lightDir), result, true)) {
      continue; // an object is shadowing this light: ignore this light
    }

    //
    //
    //

    float intensity = 0.0;
    vec3 reflection = reflect(-lightDir, impactNormal);
    intensity += 0.6 * pow(max(dot(reflection, viewer), 0.0), 30.0);
    intensity += 1.0 * dot(lightDir, impactNormal);

    intensity *= coef;

    if (bestIntensity < intensity) {
      bestIntensity = intensity;
    }
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
    if (lightToImpactDistance > lightRadius) {
      continue; // too far
    }

    lightDir.x = lightToImpactVec3.x / lightToImpactDistance; // normalize
    lightDir.y = lightToImpactVec3.y / lightToImpactDistance; // normalize
    lightDir.z = lightToImpactVec3.z / lightToImpactDistance; // normalize

    float localIntensity = getLightsDataByIndex(index + 4);

    coef = localIntensity * (1.0 - lightToImpactDistance / lightRadius);

    if (!g_shadowsEnabled) {
      continue;
    }

    RayResult result;
    if (
      // is the light blocked by an object?
      intersectScene(RayValues(impactPosition, lightDir), result, true) &&
      // avoid "opposite shadows"
      result.depth < lightToImpactDistance
    ) {
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

    if (bestIntensity < intensity) {
      bestIntensity = intensity;
    }
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
    if (result.reflection <= 0.05) {
      break;
    }

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
          // not lit
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

    // rayDir = reflect(rayDir, result.normal);
    rayDir = refract(rayDir, result.normal, Eta);
  }

  o_color = vec4(finalPixelColor, 1.0);
}
`.trim();

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/texture.glsl.frag
var texture_glsl_default = `
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
`.trim();

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/texture.glsl.frag
var texture_glsl_default2 = `
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
`.trim();

// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/ray-tracer-renderer/shaders/texture.glsl
var {
  WebGLContext: WebGLContext9,
  DataTexture: DataTexture3,
  Texture: Texture3,
  FrameBuffer: FrameBuffer3,
  ShaderProgram: ShaderProgram3,
  GeometryWrapper: GeometryWrapper2
} = exports_graphics.webgl2;
var _degreeToRad2 = (angle3) => angle3 * Math.PI / 180;

class RayTracerRenderer {
  _cameraFovy;
  _canvasWidth;
  _canvasHeight;
  _renderWidth;
  _renderHeight;
  _resolutionCoef = 1;
  _antiAliasing = false;
  _rayTracerShaderProgram;
  _textureShaderProgram;
  _rayTracerGeometry;
  _screenGeometry;
  _finalTexture;
  _frameBuffer;
  _sceneDataTexture;
  _spheres = [];
  _boxes = [];
  _triangles = [];
  _lightsDataTexture;
  _sunLights = [];
  _spotLights = [];
  _camera;
  constructor(inDef) {
    this._cameraFovy = inDef.fovy;
    this._renderWidth = this._canvasWidth = inDef.canvasWidth;
    this._renderHeight = this._canvasHeight = inDef.canvasHeight;
    this._rayTracerShaderProgram = new ShaderProgram3("RayTracerRenderer-1", {
      vertexSrc: ray_tracer_glsl_default,
      fragmentSrc: ray_tracer_glsl_default2,
      attributes: ["a_vertexPosition", "a_plotPosition"],
      uniforms: [
        "u_cameraEye",
        "u_sceneTextureData",
        "u_sceneTextureSize",
        "u_spheresStart",
        "u_spheresStop",
        "u_boxesStart",
        "u_boxesStop",
        "u_trianglesStart",
        "u_trianglesStop",
        "u_lightsTextureData",
        "u_sunLightsStart",
        "u_sunLightsStop",
        "u_spotLightsStart",
        "u_spotLightsStop"
      ]
    });
    this._textureShaderProgram = new ShaderProgram3("RayTracerRenderer-1", {
      vertexSrc: texture_glsl_default,
      fragmentSrc: texture_glsl_default2,
      attributes: ["a_vertexPosition", "a_vertexTextureCoord"],
      uniforms: ["u_texture", "u_step"]
    });
    this._finalTexture = new Texture3;
    this._frameBuffer = new FrameBuffer3;
    this._finalTexture.initialize();
    this._finalTexture.preBind((boundTexture) => {
      boundTexture.allocate(this._renderWidth, this._renderHeight);
      this._frameBuffer.bind((boundFrameBuffer) => {
        boundFrameBuffer.attachTexture(boundTexture);
      });
    });
    const geoBuilder = new GeometryWrapper2.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("triangleStrip").addVbo().addVboAttribute("a_vertexPosition", "vec2f").addVbo().setVboAsDynamic().addVboAttribute("a_plotPosition", "vec3f");
    this._rayTracerGeometry = new GeometryWrapper2.Geometry(this._rayTracerShaderProgram, geoBuilder.getDef());
    const rayTracerVertices = [];
    rayTracerVertices.push(1, 1);
    rayTracerVertices.push(-1, 1);
    rayTracerVertices.push(1, -1);
    rayTracerVertices.push(-1, -1);
    this._rayTracerGeometry.updateBuffer(0, rayTracerVertices, rayTracerVertices.length);
    this._rayTracerGeometry.setPrimitiveStart(0);
    this._rayTracerGeometry.setPrimitiveCount(4);
    geoBuilder.reset().setPrimitiveType("triangleStrip").addVbo().addVboAttribute("a_vertexPosition", "vec2f").addVboAttribute("a_vertexTextureCoord", "vec2f");
    this._screenGeometry = new GeometryWrapper2.Geometry(this._textureShaderProgram, geoBuilder.getDef());
    const screenVertices = [];
    screenVertices.push(1, 1, 1, 1);
    screenVertices.push(-1, 1, 0, 1);
    screenVertices.push(1, -1, 1, 0);
    screenVertices.push(-1, -1, 0, 0);
    this._screenGeometry.updateBuffer(0, screenVertices, screenVertices.length);
    this._screenGeometry.setPrimitiveStart(0);
    this._screenGeometry.setPrimitiveCount(4);
    this._sceneDataTexture = new DataTexture3;
    this._sceneDataTexture.initialize();
    this._lightsDataTexture = new DataTexture3;
    this._lightsDataTexture.initialize();
    this._camera = {
      position: exports_vec3.fromValues(0, 0, 0),
      target: exports_vec3.fromValues(1.5, 1.5, 1.5),
      up: exports_vec3.fromValues(0, 1, 0)
    };
  }
  pushSphere({
    position,
    radius,
    color,
    reflection,
    chessboard,
    shadowEnabled,
    lightEnabled
  }) {
    if (radius <= 0)
      throw new Error("invalid sphere radius");
    if (reflection < 0 || reflection > 1)
      throw new Error("invalid sphere reflection");
    this._spheres.push({
      position: [position[0], position[1], position[2]],
      radius,
      color: [color[0], color[1], color[2]],
      reflection,
      chessboard,
      shadowEnabled,
      lightEnabled
    });
  }
  pushBox({
    position,
    angleX,
    angleY,
    angleZ,
    boxSize,
    color,
    reflection,
    chessboard,
    shadowEnabled,
    lightEnabled
  }) {
    if (boxSize[0] <= 0 || boxSize[1] <= 0 || boxSize[2] <= 0)
      throw new Error("invalid box size");
    if (reflection < 0 || reflection > 1)
      throw new Error("invalid box reflection");
    const mat4 = exports_mat4.create();
    exports_mat4.identity(mat4);
    exports_mat4.translate(mat4, mat4, position);
    exports_mat4.rotateY(mat4, mat4, angleY);
    exports_mat4.rotateZ(mat4, mat4, angleZ);
    exports_mat4.rotateX(mat4, mat4, angleX);
    this._boxes.push({
      matrix: mat4,
      boxSize: exports_vec3.clone(boxSize),
      color: exports_vec3.clone(color),
      reflection,
      chessboard,
      shadowEnabled,
      lightEnabled
    });
  }
  pushTriangle({
    v0,
    v1,
    v2,
    color,
    reflection,
    shadowEnabled,
    lightEnabled
  }) {
    if (reflection < 0 || reflection > 1)
      throw new Error("invalid triangle reflection");
    this._triangles.push({
      v0: exports_vec3.clone(v0),
      v1: exports_vec3.clone(v1),
      v2: exports_vec3.clone(v2),
      color: exports_vec3.clone(color),
      reflection,
      shadowEnabled,
      lightEnabled
    });
  }
  pushSunLight({ direction, intensity }) {
    if (intensity <= 0)
      throw new Error("intensity cannot be 0");
    if (exports_vec3.length(direction) === 0)
      throw new Error("direction cannot be 0");
    const dir = exports_vec3.normalize(exports_vec3.clone(direction), direction);
    this._sunLights.push({ direction: dir, intensity });
  }
  pushSpotLight({ position, intensity, radius }) {
    if (intensity <= 0)
      throw new Error("intensity cannot be 0");
    if (radius <= 0)
      throw new Error("radius cannot be <= 0");
    this._spotLights.push({
      position: exports_vec3.clone(position),
      intensity,
      radius
    });
  }
  lookAt(eye, target, up) {
    exports_vec3.copy(this._camera.position, eye);
    let forwardDir = exports_vec3.sub(exports_vec3.create(), target, eye);
    forwardDir = exports_vec3.normalize(forwardDir, forwardDir);
    forwardDir = exports_vec3.add(forwardDir, eye, forwardDir);
    exports_vec3.copy(this._camera.target, forwardDir);
    const upDir = exports_vec3.normalize(exports_vec3.create(), up);
    exports_vec3.copy(this._camera.up, upDir);
  }
  render() {
    const gl = WebGLContext9.getContext();
    const farCorners = this._computeCameraFarCorners();
    this._rayTracerGeometry.updateBuffer(1, farCorners, farCorners.length);
    const scaledWidth = Math.floor(this._renderWidth);
    const scaledHeight = Math.floor(this._renderHeight);
    this._frameBuffer.bind(() => {
      gl.viewport(0, 0, scaledWidth, scaledHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);
      {
        const shader = this._rayTracerShaderProgram;
        shader.bind((boundShader) => {
          boundShader.setFloat3Uniform("u_cameraEye", this._camera.position[0], this._camera.position[1], this._camera.position[2]);
          {
            const sceneDataValues = [];
            {
              {
                boundShader.setInteger1Uniform("u_spheresStart", 0);
                for (const sphere of this._spheres) {
                  sceneDataValues.push(sphere.position[0], sphere.position[1], sphere.position[2]);
                  sceneDataValues.push(sphere.radius);
                  sceneDataValues.push(sphere.color[0], sphere.color[1], sphere.color[2]);
                  sceneDataValues.push(sphere.reflection);
                  sceneDataValues.push(sphere.shadowEnabled ? 1 : 0);
                  sceneDataValues.push(sphere.lightEnabled ? 1 : 0);
                  sceneDataValues.push(sphere.chessboard ? 1 : 0);
                }
                boundShader.setInteger1Uniform("u_spheresStop", sceneDataValues.length);
              }
              {
                boundShader.setInteger1Uniform("u_boxesStart", sceneDataValues.length);
                for (const box of this._boxes) {
                  for (let ii = 0;ii < 16; ++ii)
                    sceneDataValues.push(box.matrix[ii]);
                  sceneDataValues.push(box.boxSize[0], box.boxSize[1], box.boxSize[2]);
                  sceneDataValues.push(box.color[0], box.color[1], box.color[2]);
                  sceneDataValues.push(box.reflection);
                  sceneDataValues.push(box.shadowEnabled ? 1 : 0);
                  sceneDataValues.push(box.lightEnabled ? 1 : 0);
                  sceneDataValues.push(box.chessboard ? 1 : 0);
                }
                boundShader.setInteger1Uniform("u_boxesStop", sceneDataValues.length);
              }
              {
                boundShader.setInteger1Uniform("u_trianglesStart", sceneDataValues.length);
                for (const triangle of this._triangles) {
                  sceneDataValues.push(triangle.v0[0], triangle.v0[1], triangle.v0[2]);
                  sceneDataValues.push(triangle.v1[0], triangle.v1[1], triangle.v1[2]);
                  sceneDataValues.push(triangle.v2[0], triangle.v2[1], triangle.v2[2]);
                  sceneDataValues.push(triangle.color[0], triangle.color[1], triangle.color[2]);
                  sceneDataValues.push(triangle.reflection);
                  sceneDataValues.push(triangle.shadowEnabled ? 1 : 0);
                  sceneDataValues.push(triangle.lightEnabled ? 1 : 0);
                }
                boundShader.setInteger1Uniform("u_trianglesStop", sceneDataValues.length);
              }
            }
            gl.activeTexture(gl.TEXTURE0 + 0);
            this._sceneDataTexture.preBind((boundDataTexture) => {
              boundDataTexture.update(sceneDataValues);
            });
            boundShader.setInteger1Uniform("u_sceneTextureData", 0);
            boundShader.setInteger1Uniform("u_sceneTextureSize", sceneDataValues.length);
          }
          {
            const lightsDataValues = [];
            {
              boundShader.setInteger1Uniform("u_sunLightsStart", 0);
              for (const sunLight of this._sunLights) {
                lightsDataValues.push(sunLight.direction[0], sunLight.direction[1], sunLight.direction[2]);
                lightsDataValues.push(sunLight.intensity);
              }
              boundShader.setInteger1Uniform("u_sunLightsStop", lightsDataValues.length);
            }
            {
              boundShader.setInteger1Uniform("u_spotLightsStart", lightsDataValues.length);
              for (const spotLight of this._spotLights) {
                lightsDataValues.push(spotLight.position[0], spotLight.position[1], spotLight.position[2]);
                lightsDataValues.push(spotLight.radius);
                lightsDataValues.push(spotLight.intensity);
              }
              boundShader.setInteger1Uniform("u_spotLightsStop", lightsDataValues.length);
            }
            gl.activeTexture(gl.TEXTURE0 + 1);
            this._lightsDataTexture.preBind((boundDataTexture) => {
              boundDataTexture.update(lightsDataValues);
            });
            boundShader.setInteger1Uniform("u_lightsTextureData", 1);
          }
          this._rayTracerGeometry.render();
        });
      }
    });
    gl.viewport(0, 0, this._canvasWidth, this._canvasHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
    {
      const shader = this._textureShaderProgram;
      shader.bind((boundShader) => {
        boundShader.setTextureUniform("u_texture", this._finalTexture, 0);
        if (this._antiAliasing) {
          const stepX = (1 - this._renderWidth / this._canvasWidth) * 0.005;
          const stepY = (1 - this._renderHeight / this._canvasHeight) * 0.005;
          boundShader.setFloat2Uniform("u_step", stepX, stepY);
        } else {
          boundShader.setFloat2Uniform("u_step", 0, 0);
        }
        this._screenGeometry.render();
      });
    }
  }
  reset() {
    this._sunLights.length = 0;
    this._spotLights.length = 0;
    this._spheres.length = 0;
    this._boxes.length = 0;
    this._triangles.length = 0;
  }
  setResolutionCoef(inResolutionCoef) {
    if (inResolutionCoef === this._resolutionCoef || inResolutionCoef <= 0 || inResolutionCoef > 1) {
      return;
    }
    this._resolutionCoef = inResolutionCoef;
    this._renderWidth = Math.floor(this._canvasWidth * this._resolutionCoef);
    this._renderHeight = Math.floor(this._canvasHeight * this._resolutionCoef);
    this._finalTexture.preBind((boundTexture) => {
      boundTexture.resize(this._renderWidth, this._renderHeight);
    });
  }
  getResolutionCoef() {
    return this._resolutionCoef;
  }
  setAntiAliasing(enabled) {
    this._antiAliasing = enabled;
  }
  getAntiAliasing() {
    return this._antiAliasing;
  }
  getCurrentSize() {
    return [this._renderWidth, this._renderHeight];
  }
  _computeCameraFarCorners() {
    const forwardDir = exports_vec3.sub(exports_vec3.create(), this._camera.target, this._camera.position);
    const leftDir = exports_vec3.cross(exports_vec3.create(), forwardDir, this._camera.up);
    const upDir = exports_vec3.cross(exports_vec3.create(), leftDir, forwardDir);
    const radHFovy = _degreeToRad2(this._cameraFovy * 0.5);
    const xLength = Math.cos(radHFovy) * 1 / Math.sin(radHFovy);
    const scaledForwardDir = exports_vec3.multiply(exports_vec3.create(), forwardDir, exports_vec3.fromValues(xLength, xLength, xLength));
    const farCenter = exports_vec3.add(exports_vec3.create(), this._camera.position, scaledForwardDir);
    const aspectRatio = this._canvasWidth / this._canvasHeight;
    const farHalfWidth = exports_vec3.multiply(exports_vec3.create(), leftDir, exports_vec3.fromValues(aspectRatio, aspectRatio, aspectRatio));
    const farUp = exports_vec3.add(exports_vec3.create(), farCenter, upDir);
    const farBottom = exports_vec3.subtract(exports_vec3.create(), farCenter, upDir);
    const farTopLeft = exports_vec3.subtract(exports_vec3.create(), farUp, farHalfWidth);
    const farBottomLeft = exports_vec3.subtract(exports_vec3.create(), farBottom, farHalfWidth);
    const farTopRight = exports_vec3.add(exports_vec3.create(), farUp, farHalfWidth);
    const farBottomRight = exports_vec3.add(exports_vec3.create(), farBottom, farHalfWidth);
    return [
      farTopRight[0],
      farTopRight[1],
      farTopRight[2],
      farTopLeft[0],
      farTopLeft[1],
      farTopLeft[2],
      farBottomRight[0],
      farBottomRight[1],
      farBottomRight[2],
      farBottomLeft[0],
      farBottomLeft[1],
      farBottomLeft[2]
    ];
  }
  get canvasWidth() {
    return this._canvasWidth;
  }
  get canvasHeight() {
    return this._canvasHeight;
  }
  get renderWidth() {
    return this._renderWidth;
  }
  get renderHeight() {
    return this._renderHeight;
  }
  get camera() {
    return this._camera;
  }
  get spheres() {
    return this._spheres;
  }
  get boxes() {
    return this._boxes;
  }
  get triangles() {
    return this._triangles;
  }
  get sunLights() {
    return this._sunLights;
  }
  get spotLights() {
    return this._spotLights;
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/r
var {
  WebGLContext: WebGLContext10
} = exports_graphics.webgl2;
var {
  Camera: Camera3
} = exports_graphics.camera;
var {
  TextRenderer: TextRenderer3,
  StackRenderers: StackRenderers3
} = exports_graphics.renderers;
var k_fovy = 70;

class Renderer {
  _def;
  _rayTracerRenderer;
  _textRenderer;
  _stackRenderers;
  _debugSceneCamera = new Camera3;
  _mainHudCamera = new Camera3;
  constructor(def) {
    this._def = def;
    this.resize(this._def.canvasDomElement.width, this._def.canvasDomElement.height);
    WebGLContext10.initialize(this._def.canvasDomElement);
    this._rayTracerRenderer = new RayTracerRenderer({
      canvasWidth: this._def.canvasDomElement.width,
      canvasHeight: this._def.canvasDomElement.height,
      fovy: k_fovy
    });
    this._textRenderer = new TextRenderer3;
    this._stackRenderers = new StackRenderers3;
  }
  initialize() {
    const gl = WebGLContext10.getContext();
    const alignment = 1;
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.disable(gl.CULL_FACE);
    gl.depthFunc(gl.NEVER);
    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1);
  }
  resize(width, height) {
    this._debugSceneCamera.setViewportSize(width, height);
    this._debugSceneCamera.setAsPerspective({
      fovy: k_fovy,
      near: 1,
      far: 500
    });
    this._mainHudCamera.setViewportSize(width, height);
    const hWidth = width * 0.5;
    const hHeight = height * 0.5;
    this._mainHudCamera.setAsOrthogonal({
      left: -hWidth,
      right: +hWidth,
      top: -hHeight,
      bottom: +hHeight,
      near: -200,
      far: 200
    });
    this._mainHudCamera.setEye([hWidth, hHeight, 1]);
    this._mainHudCamera.setTarget([hWidth, hHeight, 0]);
    this._mainHudCamera.setUpAxis([0, 1, 0]);
    this._mainHudCamera.computeMatrices();
  }
  _pushWireFrameSphere(sphere) {
    const X = 0.5257311121191336 * sphere.radius;
    const Z = 0.8506508083520399 * sphere.radius;
    const N = 0;
    const positions = [
      [-X, N, Z],
      [X, N, Z],
      [-X, N, -Z],
      [X, N, -Z],
      [N, Z, X],
      [N, Z, -X],
      [N, -Z, X],
      [N, -Z, -X],
      [Z, X, N],
      [-Z, X, N],
      [Z, -X, N],
      [-Z, -X, N]
    ];
    for (let ii = 0;ii < positions.length; ++ii) {
      positions[ii][0] += sphere.position[0];
      positions[ii][1] += sphere.position[1];
      positions[ii][2] += sphere.position[2];
    }
    const indices = [
      [0, 4, 1],
      [0, 9, 4],
      [9, 5, 4],
      [4, 5, 8],
      [4, 8, 1],
      [8, 10, 1],
      [8, 3, 10],
      [5, 3, 8],
      [5, 2, 3],
      [2, 7, 3],
      [7, 10, 3],
      [7, 6, 10],
      [7, 11, 6],
      [11, 0, 6],
      [0, 1, 6],
      [6, 1, 10],
      [9, 0, 11],
      [9, 11, 2],
      [9, 2, 5],
      [7, 2, 11]
    ];
    for (const index of indices) {
      const v1 = positions[index[0]];
      const v2 = positions[index[1]];
      const v3 = positions[index[2]];
      this._stackRenderers.pushLine(v1, v2, sphere.color);
      this._stackRenderers.pushLine(v2, v3, sphere.color);
      this._stackRenderers.pushLine(v3, v1, sphere.color);
    }
  }
  _pushWireFrameBox(box) {
    const vertices = [
      exports_vec3.fromValues(-box.boxSize[0], -box.boxSize[1], -box.boxSize[2]),
      exports_vec3.fromValues(+box.boxSize[0], -box.boxSize[1], -box.boxSize[2]),
      exports_vec3.fromValues(-box.boxSize[0], +box.boxSize[1], -box.boxSize[2]),
      exports_vec3.fromValues(+box.boxSize[0], +box.boxSize[1], -box.boxSize[2]),
      exports_vec3.fromValues(-box.boxSize[0], -box.boxSize[1], +box.boxSize[2]),
      exports_vec3.fromValues(+box.boxSize[0], -box.boxSize[1], +box.boxSize[2]),
      exports_vec3.fromValues(-box.boxSize[0], +box.boxSize[1], +box.boxSize[2]),
      exports_vec3.fromValues(+box.boxSize[0], +box.boxSize[1], +box.boxSize[2])
    ];
    const vertices2 = [];
    vertices.forEach((vertex) => {
      const pos = exports_vec3.fromValues(0, 0, 0);
      exports_vec3.transformMat4(pos, vertex, box.matrix);
      vertices2.push(pos);
    });
    const indicesGroup = [
      [0, 1],
      [1, 3],
      [3, 2],
      [2, 0],
      [4, 5],
      [5, 7],
      [7, 6],
      [6, 4],
      [0, 4],
      [1, 5],
      [3, 7],
      [2, 6]
    ];
    indicesGroup.forEach((index) => {
      this._stackRenderers.pushLine(vertices2[index[0]], vertices2[index[1]], box.color);
    });
  }
  _pushWireFrameTriangle(triangle) {
    this._stackRenderers.pushLine(triangle.v0, triangle.v1, triangle.color);
    this._stackRenderers.pushLine(triangle.v1, triangle.v2, triangle.color);
    this._stackRenderers.pushLine(triangle.v2, triangle.v0, triangle.color);
  }
  safeSceneWireFrame(inCallback) {
    this._debugSceneCamera.setEye(this._rayTracerRenderer.camera.position);
    this._debugSceneCamera.setTarget(this._rayTracerRenderer.camera.target);
    this._debugSceneCamera.setUpAxis(this._rayTracerRenderer.camera.up);
    this._debugSceneCamera.computeMatrices();
    this._stackRenderers.safeRender(this._debugSceneCamera.getComposedMatrix(), inCallback);
  }
  flushHudWireFrame() {
    this._stackRenderers.flush(this._mainHudCamera.getComposedMatrix());
  }
  flushHudText() {
    this._textRenderer.flush(this._mainHudCamera.getComposedMatrix());
  }
  setupDebugRenderer() {
    this._rayTracerRenderer.spheres.forEach((sphere) => this._pushWireFrameSphere(sphere));
    this._rayTracerRenderer.boxes.forEach((box) => this._pushWireFrameBox(box));
    this._rayTracerRenderer.triangles.forEach((triangle) => this._pushWireFrameTriangle(triangle));
  }
  get rayTracerRenderer() {
    return this._rayTracerRenderer;
  }
  get stackRenderers() {
    return this._stackRenderers;
  }
  get textRenderer() {
    return this._textRenderer;
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/renderers/r
var continuousTime = 0;
var continuousAngle = 0;
var currStep = 0;
var nextStep = 1;
var allSteps = [
  [-5, 4, 0],
  [5, 4, 0],
  [5, 10, 0],
  [-5, 10, 0]
];

class TestScene2 {
  reset() {
    continuousTime = 0;
    continuousAngle = 0;
    currStep = 0;
    nextStep = 1;
  }
  run(renderer, elapsedTime) {
    continuousAngle += elapsedTime * 2;
    if (continuousAngle >= Math.PI * 2) {
      continuousAngle -= Math.PI * 2;
    }
    continuousTime += elapsedTime * 0.75;
    if (continuousTime > 1) {
      continuousTime = 0;
      currStep = (currStep + 1) % allSteps.length;
      nextStep = (currStep + 1) % allSteps.length;
    }
    const lightPos = [
      allSteps[currStep][0] + (allSteps[nextStep][0] - allSteps[currStep][0]) * continuousTime,
      allSteps[currStep][1] + (allSteps[nextStep][1] - allSteps[currStep][1]) * continuousTime,
      allSteps[currStep][2] + (allSteps[nextStep][2] - allSteps[currStep][2]) * continuousTime
    ];
    {
      renderer.rayTracerRenderer.pushSpotLight({
        position: [0, 10, 10],
        intensity: 2,
        radius: 20
      });
      renderer.rayTracerRenderer.pushSphere({
        position: [0, 10, 10],
        radius: 0.25,
        color: [1, 1, 1],
        reflection: 0,
        chessboard: false,
        lightEnabled: false,
        shadowEnabled: false
      });
      renderer.rayTracerRenderer.pushSpotLight({
        position: lightPos,
        intensity: 2,
        radius: 10
      });
      renderer.rayTracerRenderer.pushSphere({
        position: lightPos,
        radius: 0.25,
        color: [1, 1, 1],
        reflection: 0,
        chessboard: false,
        lightEnabled: false,
        shadowEnabled: false
      });
      renderer.rayTracerRenderer.pushSphere({
        position: [0, 7, 1],
        radius: 1,
        color: [1, 1, 1],
        reflection: 1,
        chessboard: false,
        lightEnabled: false,
        shadowEnabled: true
      });
      const allBoxes = [
        { pos: [-2, 4, -1], size: [1, 1, 0.125] },
        { pos: [-2, 4, 1], size: [1, 1, 0.125] },
        { pos: [-2, 3, 0], size: [1, 0.125, 1] },
        { pos: [-2, 5, 0], size: [1, 0.125, 1] },
        { pos: [2, 4, -1], size: [1, 1, 0.125] },
        { pos: [2, 4, 1], size: [1, 1, 0.125] },
        { pos: [2, 3, 0], size: [1, 0.125, 1] },
        { pos: [2, 5, 0], size: [1, 0.125, 1] },
        { pos: [0, 8, -8], size: [8, 8, 0.125], color: [1, 0.5, 0.5] },
        { pos: [-8, 8, 0], size: [0.125, 8, 8], color: [0.5, 1, 0.5] },
        { pos: [8, 8, 0], size: [0.125, 8, 8], color: [0.5, 0.5, 1] },
        { pos: [0, -0, 0], size: [8, 0.125, 8], reflection: 0.3 }
      ];
      allBoxes.forEach(({ pos, size, color, reflection }) => {
        renderer.rayTracerRenderer.pushBox({
          position: pos,
          angleX: 0,
          angleY: 0,
          angleZ: 0,
          boxSize: size,
          color: color ?? [1, 1, 1],
          reflection: reflection ?? 0,
          chessboard: false,
          lightEnabled: true,
          shadowEnabled: true
        });
      });
      {
        const allRotatedBoxes = [
          {
            pos: [
              5 + 1 * Math.cos(continuousAngle),
              6,
              0 + 1 * Math.sin(continuousAngle)
            ],
            angleY: -continuousAngle,
            size: [0.125, 1, 1]
          },
          {
            pos: [
              5 - 1 * Math.cos(continuousAngle),
              8,
              0 - 1 * Math.sin(continuousAngle)
            ],
            angleY: -continuousAngle,
            size: [0.125, 1, 1]
          },
          {
            pos: [
              5 + 1 * Math.cos(continuousAngle + Math.PI * 0.5),
              7,
              0 + 1 * Math.sin(continuousAngle + Math.PI * 0.5)
            ],
            angleY: -continuousAngle + Math.PI * 0.5,
            size: [0.125, 2, 1]
          },
          {
            pos: [
              5 + 1 * Math.cos(continuousAngle - Math.PI * 0.5),
              7,
              0 + 1 * Math.sin(continuousAngle - Math.PI * 0.5)
            ],
            angleY: -continuousAngle - Math.PI * 0.5,
            size: [0.125, 2, 1]
          }
        ];
        allRotatedBoxes.forEach(({ pos, angleY, size }) => {
          renderer.rayTracerRenderer.pushBox({
            position: pos,
            angleX: 0,
            angleY,
            angleZ: 0,
            boxSize: size,
            color: [0, 1, 0],
            reflection: 0,
            chessboard: false,
            lightEnabled: true,
            shadowEnabled: true
          });
        });
      }
    }
  }
}
// srcjects/webgl-ray-tracer/src/experiment/graphics/rend
var {
  GlobalMouseManager: GlobalMouseManager2,
  GlobalKeyboardManager: GlobalKeyboardManager3,
  GlobalTouchManager: GlobalTouchManager3,
  GlobalVisibilityManager: GlobalVisibilityManager2,
  GlobalPointerLockManager: GlobalPointerLockManager3
} = exports_system.browser;
var { WebGLContext: WebGLContext11 } = exports_graphics.webgl2;
var { FreeFlyController: FreeFlyController3 } = exports_system.controllers;
var _clamp = (inValue, inMin, inMax) => Math.min(Math.max(inValue, inMin), inMax);
var k_maxFramesUntilNextCheck = 60;

class Experiment {
  _canvasElement;
  _animationFrameHandle = 0;
  _def;
  _freeFlyController;
  _renderer;
  _running;
  _errorGraphicContext;
  _currFrameMsecTime = Date.now();
  _frameProfiler = new FrameProfiler3;
  _continuousSecTime = 0;
  _perfAutoScalingEnabled = true;
  _framesUntilNextCheck = k_maxFramesUntilNextCheck;
  _scene = new TestScene2;
  constructor(inDef) {
    this._canvasElement = inDef.canvasElement;
    this._def = inDef;
    this._freeFlyController = new FreeFlyController3({
      coordinates: ["Z", "X", "Y"],
      position: [-10, 13, 15],
      theta: Math.PI * 0.85,
      phi: -Math.PI * 0.15,
      mouseSensibility: 0.1,
      keyboardSensibility: Math.PI * 0.45,
      touchSensibility: 0.3,
      movingSpeed: 10
    });
    {
      GlobalKeyboardManager3.activate();
      GlobalTouchManager3.activate(this._canvasElement);
      GlobalVisibilityManager2.activate();
      GlobalVisibilityManager2.addVisibilityChange((isVisible) => {
        if (isVisible === false) {
          this._def.logger.log("document visibility changed: hidden");
          this.stop();
        } else {
          this._def.logger.log("document visibility changed: visible");
          this.start();
        }
      });
      GlobalPointerLockManager3.allowPointerLockedOnClickEvent(this._canvasElement);
      GlobalPointerLockManager3.addOnLockChange(() => {
        const isLocked = GlobalPointerLockManager3.isPointerLocked(this._canvasElement);
        if (isLocked) {
          this._def.logger.log("The pointer lock status is now locked");
          GlobalMouseManager2.activate();
        } else {
          this._def.logger.log("The pointer lock status is now unlocked");
          GlobalMouseManager2.deactivate();
          GlobalPointerLockManager3.allowPointerLockedOnClickEvent(this._canvasElement);
        }
      });
      GlobalPointerLockManager3.addOnLockError((event) => {
        this._def.logger.log(`The pointer lock sent an error, event: "${JSON.stringify(event)}"`);
      });
      this._renderer = new Renderer({ canvasDomElement: this._canvasElement });
      this._renderer.initialize();
    }
    this._running = false;
    this._errorGraphicContext = false;
    this._def.resolution.addEventListener("input", (event) => {
      const newValue = this._def.resolution.value;
      this._setResolution(newValue);
      this._logResolution();
    });
    this._def.anti_aliasing_enabled.addEventListener("click", () => {
      const newValue = this._def.anti_aliasing_enabled.checked === true;
      this._renderer.rayTracerRenderer.setAntiAliasing(newValue);
      this._def.logger.log(`Anti aliasing change: ${newValue === true ? "enabled" : "disabled"}`);
    });
    this._setResolution(this._def.resolution.value);
    this._def.perfAutoScaling.addEventListener("input", () => {
      this._framesUntilNextCheck = k_maxFramesUntilNextCheck;
      this._perfAutoScalingEnabled = this._def.perfAutoScaling.checked === true;
      this._def.logger.log(`Performance auto scaler change: ${this._perfAutoScalingEnabled === true ? "enabled" : "disabled"}`);
    });
  }
  async init() {
    await this._renderer.initialize();
  }
  resize(inWidth, inHeight, inIsFullScreen) {
    let currentWidth = inWidth;
    let currentHeight = inHeight;
    if (inIsFullScreen) {
      this._canvasElement.style.position = "absolute";
      currentWidth = window.innerWidth;
      currentHeight = window.innerHeight;
    } else {
      this._canvasElement.style.position = "relative";
    }
    this._canvasElement.style.left = "0px";
    this._canvasElement.style.top = "0px";
    this._canvasElement.style.width = `${currentWidth}px`;
    this._canvasElement.style.height = `${currentHeight}px`;
    this._canvasElement.width = currentWidth;
    this._canvasElement.height = currentHeight;
    this._renderer.resize(currentWidth, currentHeight);
  }
  start() {
    if (this.isRunning())
      return;
    this._running = true;
    this._tick();
  }
  stop() {
    if (!this.isRunning())
      return;
    this._running = false;
    window.cancelAnimationFrame(this._animationFrameHandle);
  }
  isRunning() {
    return this._running && !this._errorGraphicContext;
  }
  _tick() {
    const tick = () => {
      if (!this._running || this._errorGraphicContext)
        return;
      this._animationFrameHandle = window.requestAnimationFrame(tick);
      this._mainLoop();
    };
    tick();
  }
  _mainLoop() {
    const currentMsecTime = Date.now();
    const deltaMsecTime = currentMsecTime - this._currFrameMsecTime;
    this._currFrameMsecTime = currentMsecTime;
    this._frameProfiler.pushDelta(deltaMsecTime);
    this._handlePerformanceAutoScaling(deltaMsecTime);
    const elapsedSecTime = deltaMsecTime / 1000;
    this._continuousSecTime += elapsedSecTime;
    this._freeFlyController.update(elapsedSecTime);
    GlobalMouseManager2.resetDeltas();
    {
      const gl2 = WebGLContext11.getContext();
      gl2.disable(gl2.DEPTH_TEST);
    }
    this._continuousSecTime += elapsedSecTime;
    this._scene.run(this._renderer, elapsedSecTime);
    this._renderer.rayTracerRenderer.lookAt(this._freeFlyController.getPosition(), this._freeFlyController.getTarget(), this._freeFlyController.getUpAxis());
    this._renderer.rayTracerRenderer.render();
    const showDebug = this._def.debug_mode_enabled.checked === true;
    if (showDebug) {
      this._renderer.safeSceneWireFrame(() => {
        this._renderer.setupDebugRenderer();
        const axisOrigin = [0, 0, 0];
        const axisX = [100, 0, 0];
        const axisY = [0, 100, 0];
        const axisZ = [0, 0, 100];
        this._renderer.stackRenderers.pushLine(axisOrigin, axisX, [1, 0, 0]);
        this._renderer.stackRenderers.pushLine(axisOrigin, axisY, [0, 1, 0]);
        this._renderer.stackRenderers.pushLine(axisOrigin, axisZ, [0, 0, 1]);
      });
    }
    const gl = WebGLContext11.getContext();
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    renderControls2(this._canvasElement, this._renderer.stackRenderers, this._renderer.textRenderer);
    renderFpsMeter3([10, this._canvasElement.height - 60, 0], [100, 50], this._frameProfiler, this._renderer.stackRenderers, this._renderer.textRenderer, true);
    this._renderer.flushHudWireFrame();
    this._renderer.flushHudText();
    this._renderer.rayTracerRenderer.reset();
  }
  _setResolution(inValue) {
    const safeValue = _clamp(inValue, 0, 9);
    const newValue = 10 - safeValue;
    const newCoef = 1 / newValue;
    this._renderer.rayTracerRenderer.setResolutionCoef(newCoef);
  }
  _logResolution() {
    const rayTracerRenderer = this._renderer.rayTracerRenderer;
    const newCoef = rayTracerRenderer.getResolutionCoef();
    const newSize = rayTracerRenderer.getCurrentSize();
    const totalPixels = newSize[0] * newSize[1];
    this._def.logger.log(`resolution changed (1/${Math.ceil(1 / newCoef)}) => ${newSize[0]}x${newSize[1]} (${totalPixels}px)`);
  }
  _handlePerformanceAutoScaling(inDeltaMsecTime) {
    if (this._perfAutoScalingEnabled !== true) {
      return;
    }
    if (inDeltaMsecTime <= 20) {
      this._framesUntilNextCheck = k_maxFramesUntilNextCheck;
      return;
    }
    --this._framesUntilNextCheck;
    if (this._framesUntilNextCheck > 0) {
      return;
    }
    this._def.logger.log(`performance auto scaling: slow framerate, scaling down resolution`);
    const currValue = this._def.resolution.value;
    const newValue = currValue - 1;
    if (newValue >= 0 && newValue <= 9) {
      this._setResolution(newValue);
      this._logResolution();
      this._def.resolution.value = newValue;
    }
    this._framesUntilNextCheck = k_maxFramesUntilNextCheck;
  }
}

// srcjects/webgl-ray-tracer/src/experim
var logger = undefined;
var mainDemo = undefined;
var _queryHtmlElement = (inName) => {
  const newElement = document.querySelector(inName);
  if (!newElement) {
    throw new Error(`html element "${inName}" not found`);
  }
  return newElement;
};
var _queryCanvas = (inName) => _queryHtmlElement(inName);
var _queryProgress = (inName) => _queryHtmlElement(inName);
var _queryInput = (inName) => _queryHtmlElement(inName);
var onPageError = async (err) => {
  if (logger) {
    logger.error(err.message);
  } else {
    console.error(err.message);
  }
  if (mainDemo) {
    mainDemo.stop();
  }
};
window.addEventListener("error", onPageError);
var onPageLoad = async () => {
  logger = new Logger("loggerOutput");
  logger.log("[SETUP] page loaded");
  try {
    const canvasElement = _queryCanvas("#rendering-canvas");
    const perfAutoScaling = _queryInput("#auto-scaling-enabled");
    const resolution = _queryProgress("#resolution");
    const anti_aliasing_enabled = _queryInput("#anti-aliasing-enabled");
    const debug_mode_enabled = _queryInput("#debug-mode-enabled");
    if (!exports_system.browser.isWebGL2Supported()) {
      throw new Error("missing WebGL2 feature (unsupported)");
    }
    mainDemo = new Experiment({
      canvasElement,
      logger,
      perfAutoScaling,
      resolution,
      anti_aliasing_enabled,
      debug_mode_enabled
    });
    logger.log("[SETUP] Demo: initializing");
    await mainDemo.init();
    logger.log("[SETUP] Demo: initialized");
    mainDemo.start();
    logger.log("[SETUP] Demo: running");
  } catch (err) {
    logger.error(`Error: "${err?.message}"`);
    throw err;
  }
};
window.addEventListener("load", onPageLoad, false);

//# debugId=421CDCB51469412364756e2164756e21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcHJvamVjdHMvbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9icm93c2VyL0Z1bGxTY3JlZW5NYW5hZ2VyLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vYnJvd3Nlci9LZXlDb2Rlcy50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvc3lzdGVtL2Jyb3dzZXIvS2V5Ym9hcmRNYW5hZ2VyLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vYnJvd3Nlci9Nb3VzZU1hbmFnZXIudHMiLCAiLi4vcHJvamVjdHMvbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9icm93c2VyL1BvaW50ZXJMb2NrTWFuYWdlci50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvc3lzdGVtL2Jyb3dzZXIvVG91Y2hNYW5hZ2VyLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vYnJvd3Nlci9WaXNpYmlsaXR5TWFuYWdlci50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvc3lzdGVtL2Jyb3dzZXIvaXNXZWJXb3JrZXJTdXBwb3J0ZWQudHMiLCAiLi4vcHJvamVjdHMvbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9icm93c2VyL2lzV2ViR0wyU3VwcG9ydGVkLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vbWV0cmljcy9GcmFtZVByb2ZpbGVyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL2NvbW1vbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L2VzbS9tYXQzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL21hdDQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9lc20vdmVjMy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L2VzbS92ZWM0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL3ZlYzIuanMiLCAiLi4vcHJvamVjdHMvbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9jb250cm9sbGVycy9GcmVlRmx5Q29udHJvbGxlci50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvc3lzdGVtL21hdGgvaW52ZXJzZS1raW5lbWF0aWMvY2lyY2xlQ2lyY2xlSW50ZXJzZWN0aW9uUG9pbnRzLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vbWF0aC9pbnZlcnNlLWtpbmVtYXRpYy9saW1iLWFuaW1hdG9yLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vbWF0aC9jbGFtcC50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvYnVpbGQtZ2VvbWV0cmllcy9nZW5lcmF0ZUJveFZlcnRpY2VzLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9idWlsZC1nZW9tZXRyaWVzL2NvbXB1dGVOb3JtYWwudHMiLCAiLi4vcHJvamVjdHMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL2J1aWxkLWdlb21ldHJpZXMvY29udmVydFRvUGVyRmFjZXNOb3JtYWxzLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9idWlsZC1nZW9tZXRyaWVzL2dlbmVyYXRlU3BoZXJlVHJpYW5nbGVzLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9idWlsZC1nZW9tZXRyaWVzL2dlbmVyYXRlV2lyZUZyYW1lRnJ1c3R1bVZlcnRpY2VzLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9jYW1lcmEvQ2FtZXJhLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9jYW1lcmEvRnJ1c3R1bUN1bGxpbmcudHMiLCAiLi4vcHJvamVjdHMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy9nZW9tZXRyeS1zdGFjay1yZW5kZXJlci9zaGFkZXJzL2dlb21ldHJ5LXN0YWNrLXJlbmRlcmVyLmdsc2wudmVydCIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL2dlb21ldHJ5LXN0YWNrLXJlbmRlcmVyL3NoYWRlcnMvZ2VvbWV0cnktc3RhY2stcmVuZGVyZXIuZ2xzbC5mcmFnIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9yZW5kZXJlcnMvZ2VvbWV0cnktc3RhY2stcmVuZGVyZXIvR2VvbWV0cnlTdGFja1JlbmRlcmVyLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9yZW5kZXJlcnMvc3RhY2stcmVuZGVyZXJzL3NoYWRlcnMvc3RhY2stcmVuZGVyZXIuZ2xzbC52ZXJ0IiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9yZW5kZXJlcnMvc3RhY2stcmVuZGVyZXJzL3NoYWRlcnMvc3RhY2stcmVuZGVyZXIuZ2xzbC5mcmFnIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9yZW5kZXJlcnMvc3RhY2stcmVuZGVyZXJzL2ludGVybmFscy9XaXJlRnJhbWVzU3RhY2tSZW5kZXJlci50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3N0YWNrLXJlbmRlcmVycy9pbnRlcm5hbHMvVHJpYW5nbGVzU3RhY2tSZW5kZXJlci50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3N0YWNrLXJlbmRlcmVycy9TdGFja1JlbmRlcmVycy50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3RleHQtcmVuZGVyZXIvc2hhZGVycy90ZXh0LXJlbmRlcmVyLmdsc2wudmVydCIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3RleHQtcmVuZGVyZXIvc2hhZGVycy90ZXh0LXJlbmRlcmVyLmdsc2wuZnJhZyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3RleHQtcmVuZGVyZXIvaW50ZXJuYWxzL2FzY2lpVGV4dHVyZUhleC50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3RleHQtcmVuZGVyZXIvVGV4dFJlbmRlcmVyLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9yZW5kZXJlcnMvd2lkZ2V0cy9yZW5kZXJDb250cm9scy50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3dpZGdldHMvcmVuZGVyRnBzTWV0ZXIudHMiLCAiLi4vcHJvamVjdHMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9XZWJHTENvbnRleHQudHMiLCAiLi4vcHJvamVjdHMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9DdWJlTWFwLnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy93ZWJnbDIvRGF0YVRleHR1cmUudHMiLCAiLi4vcHJvamVjdHMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9GcmFtZUJ1ZmZlci50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3Mvd2ViZ2wyL0dlb21ldHJ5LnRzIiwgIi4uL3Byb2plY3RzL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy93ZWJnbDIvU2hhZGVyUHJvZ3JhbS50cyIsICIuLi9wcm9qZWN0cy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3Mvd2ViZ2wyL1RleHR1cmUudHMiLCAiLi4vcHJvamVjdHMvd2ViZ2wtcmF5LXRyYWNlci9zcmMvZXhwZXJpbWVudC91dGlsaXRpZXMvTG9nZ2VyLnRzIiwgIi4uL3Byb2plY3RzL3dlYmdsLXJheS10cmFjZXIvc3JjL2V4cGVyaW1lbnQvdXRpbGl0aWVzL0ZyYW1lUHJvZmlsZXIudHMiLCAiLi4vcHJvamVjdHMvd2ViZ2wtcmF5LXRyYWNlci9zcmMvZXhwZXJpbWVudC9ncmFwaGljcy9yZW5kZXJlcnMvd2lkZ2V0cy9yZW5kZXJGcHNNZXRlci50cyIsICIuLi9wcm9qZWN0cy93ZWJnbC1yYXktdHJhY2VyL3NyYy9leHBlcmltZW50L2dyYXBoaWNzL3JlbmRlcmVycy93aWRnZXRzL3JlbmRlckNvbnRyb2xzLnRzIiwgIi4uL3Byb2plY3RzL3dlYmdsLXJheS10cmFjZXIvc3JjL2V4cGVyaW1lbnQvZ3JhcGhpY3MvcmVuZGVyZXJzL3JheS10cmFjZXItcmVuZGVyZXIvc2hhZGVycy9yYXktdHJhY2VyLmdsc2wudmVydCIsICIuLi9wcm9qZWN0cy93ZWJnbC1yYXktdHJhY2VyL3NyYy9leHBlcmltZW50L2dyYXBoaWNzL3JlbmRlcmVycy9yYXktdHJhY2VyLXJlbmRlcmVyL3NoYWRlcnMvcmF5LXRyYWNlci5nbHNsLmZyYWciLCAiLi4vcHJvamVjdHMvd2ViZ2wtcmF5LXRyYWNlci9zcmMvZXhwZXJpbWVudC9ncmFwaGljcy9yZW5kZXJlcnMvcmF5LXRyYWNlci1yZW5kZXJlci9zaGFkZXJzL3RleHR1cmUuZ2xzbC52ZXJ0IiwgIi4uL3Byb2plY3RzL3dlYmdsLXJheS10cmFjZXIvc3JjL2V4cGVyaW1lbnQvZ3JhcGhpY3MvcmVuZGVyZXJzL3JheS10cmFjZXItcmVuZGVyZXIvc2hhZGVycy90ZXh0dXJlLmdsc2wuZnJhZyIsICIuLi9wcm9qZWN0cy93ZWJnbC1yYXktdHJhY2VyL3NyYy9leHBlcmltZW50L2dyYXBoaWNzL3JlbmRlcmVycy9yYXktdHJhY2VyLXJlbmRlcmVyL1JheVRyYWNlclJlbmRlcmVyLnRzIiwgIi4uL3Byb2plY3RzL3dlYmdsLXJheS10cmFjZXIvc3JjL2V4cGVyaW1lbnQvZ3JhcGhpY3MvUmVuZGVyZXIudHMiLCAiLi4vcHJvamVjdHMvd2ViZ2wtcmF5LXRyYWNlci9zcmMvZXhwZXJpbWVudC9zY2VuZXMvVGVzdFNjZW5lMi50cyIsICIuLi9wcm9qZWN0cy93ZWJnbC1yYXktdHJhY2VyL3NyYy9leHBlcmltZW50L0V4cGVyaW1lbnQudHMiLCAiLi4vcHJvamVjdHMvd2ViZ2wtcmF5LXRyYWNlci9zcmMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsKICAgICJjb25zdCBhbGxSZXF1ZXN0RXZlbnRzOiBzdHJpbmdbXSA9IFtcbiAgJ3JlcXVlc3RGdWxsc2NyZWVuJyxcbiAgJ3dlYmtpdFJlcXVlc3RGdWxsc2NyZWVuJyxcbiAgJ21velJlcXVlc3RGdWxsU2NyZWVuJyxcbiAgJ21zUmVxdWVzdEZ1bGxzY3JlZW4nXG5dO1xuXG5jb25zdCBhbGxDaGFuZ2VFdmVudHM6IHN0cmluZ1tdID0gW1xuICAnZnVsbHNjcmVlbmNoYW5nZScsXG4gICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJyxcbiAgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAnbXNmdWxsc2NyZWVuY2hhbmdlJ1xuXTtcblxudHlwZSBPbkNoYW5nZUNhbGxiYWNrID0gKCkgPT4gdm9pZDtcblxuaW50ZXJmYWNlIElSZXN1bHQge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmNsYXNzIEZ1bGxTY3JlZW5NYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfb25GdWxsU2NyZWVuQ2hhbmdlQ2FsbGJhY2tzOiBPbkNoYW5nZUNhbGxiYWNrW10gPSBbXTtcblxuICBwcml2YXRlIF9pc0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZSgpIHtcbiAgICBpZiAodGhpcy5faXNJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IG9uTG9ja0NoYW5nZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX29uRnVsbFNjcmVlbkNoYW5nZUNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soKSk7XG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgY3VyckV2ZW50IG9mIGFsbENoYW5nZUV2ZW50cylcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoY3VyckV2ZW50LCBvbkxvY2tDaGFuZ2UsIGZhbHNlKTtcbiAgfVxuXG4gIC8vXG5cbiAgaXNDb21wYXRpYmxlKGluVGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBmb3IgKGNvbnN0IGN1cnJFdmVudCBvZiBhbGxSZXF1ZXN0RXZlbnRzKSB7XG4gICAgICBpZiAoY3VyckV2ZW50IGluIGluVGFyZ2V0RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy9cblxuICBpc0Z1bGxTY3JlZW4oaW5UYXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCA9PT0gaW5UYXJnZXRFbGVtZW50O1xuICB9XG5cbiAgLy9cblxuICBhc3luYyByZXF1ZXN0RnVsbFNjcmVlbihpblRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogUHJvbWlzZTxJUmVzdWx0PiB7XG4gICAgaWYgKHRoaXMuaXNGdWxsU2NyZWVuKGluVGFyZ2V0RWxlbWVudCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnZWxlbWVudCBhbHJlYWR5IGluIGZ1bGwgc2NyZWVuJyB9O1xuICAgIH1cblxuICAgIHRoaXMuX2luaXRpYWxpemUoKTtcblxuICAgIGZvciAoY29uc3QgY3VyckV2ZW50IG9mIGFsbFJlcXVlc3RFdmVudHMpIHtcbiAgICAgIGlmIChjdXJyRXZlbnQgaW4gaW5UYXJnZXRFbGVtZW50KSB7XG4gICAgICAgIChpblRhcmdldEVsZW1lbnQgYXMgYW55KVtjdXJyRXZlbnRdKCk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ3JlcXVlc3QgZm9yIGZ1bGwgc2NyZWVuIGRvbmUnIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICd1bnN1cHBvcnRlZCByZXF1ZXN0IGZvciBmdWxsIHNjcmVlbicgfTtcbiAgfVxuXG4gIC8vXG5cbiAgYWRkT25GdWxsU2NyZWVuQ2hhbmdlKGluQ2FsbGJhY2s6IE9uQ2hhbmdlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9vbkZ1bGxTY3JlZW5DaGFuZ2VDYWxsYmFja3MucHVzaChpbkNhbGxiYWNrKTtcbiAgfVxuICByZW1vdmVPbkZ1bGxTY3JlZW5DaGFuZ2UoaW5DYWxsYmFjazogT25DaGFuZ2VDYWxsYmFjaykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fb25GdWxsU2NyZWVuQ2hhbmdlQ2FsbGJhY2tzLmluZGV4T2YoaW5DYWxsYmFjayk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vbkZ1bGxTY3JlZW5DaGFuZ2VDYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuICByZW1vdmVBbGxDYWxsYmFja3MoKSB7XG4gICAgdGhpcy5fb25GdWxsU2NyZWVuQ2hhbmdlQ2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gIH1cbn1cblxuY29uc3QgR2xvYmFsRnVsbFNjcmVlbk1hbmFnZXIgPSBuZXcgRnVsbFNjcmVlbk1hbmFnZXIoKTtcblxuZXhwb3J0IHsgR2xvYmFsRnVsbFNjcmVlbk1hbmFnZXIgfTtcbiIsCiAgImV4cG9ydCBjb25zdCBBbGxLZXlDb2RlcyA9IHtcbiAgLy8gTnVtYmVycyBhbmQgbGV0dGVyc1xuICBOdW0wOiA0OCxcbiAgTnVtMTogNDksXG4gIE51bTI6IDUwLFxuICBOdW0zOiA1MSxcbiAgTnVtNDogNTIsXG4gIE51bTU6IDUzLFxuICBOdW02OiA1NCxcbiAgTnVtNzogNTUsXG4gIE51bTg6IDU2LFxuICBOdW05OiA1NyxcbiAgQTogNjUsXG4gIEI6IDY2LFxuICBDOiA2NyxcbiAgRDogNjgsXG4gIEU6IDY5LFxuICBGOiA3MCxcbiAgRzogNzEsXG4gIEg6IDcyLFxuICBJOiA3MyxcbiAgSjogNzQsXG4gIEs6IDc1LFxuICBMOiA3NixcbiAgTTogNzcsXG4gIE46IDc4LFxuICBPOiA3OSxcbiAgUDogODAsXG4gIFE6IDgxLFxuICBSOiA4MixcbiAgUzogODMsXG4gIFQ6IDg0LFxuICBVOiA4NSxcbiAgVjogODYsXG4gIFc6IDg3LFxuICBYOiA4OCxcbiAgWTogODksXG4gIFo6IDkwLFxuXG4gIC8vIFB1bmN0dWF0aW9ucyBrZXlzIGluIFVTIGxheW91dFxuICBTZW1pY29sb246IDE4NixcbiAgRXF1YWw6IDE4NyxcbiAgQ29tbWE6IDE4OCxcbiAgTWludXM6IDE4OSxcbiAgUGVyaW9kOiAxOTAsXG4gIEJhY2tRdW90ZTogMTkyLFxuICBCcmFja2V0TGVmdDogMjE5LFxuICBCYWNrc2xhc2g6IDIyMCxcbiAgQnJhY2tldFJpZ2h0OiAyMjEsXG4gIFF1b3RlOiAyMjIsXG5cbiAgLy8gTW9kaWZpZXIga2V5c1xuICBTaGlmdDogMTYsXG4gIEN0cmw6IDE3LFxuICBBbHQ6IDE4LFxuICBDYXBzTG9jazogMjAsXG5cbiAgLy8gQ29udHJvbCBrZXlzXG4gIFRhYjogOSxcbiAgRW50ZXI6IDEzLFxuICBQYXVzZTogMTksXG4gIEVzY2FwZTogMjcsXG4gIFNwYWNlOiAzMixcbiAgUGFnZVVwOiAzMyxcbiAgUGFnZURvd246IDM0LFxuICBFbmQ6IDM1LFxuICBIb21lOiAzNixcbiAgQXJyb3dMZWZ0OiAzNyxcbiAgQXJyb3dVcDogMzgsXG4gIEFycm93UmlnaHQ6IDM5LFxuICBBcnJvd0Rvd246IDQwLFxuICBQcmludFNjcmVlbjogNDQsXG4gIEluc2VydDogNDUsXG4gIERlbGV0ZTogNDYsXG4gIENvbnRleHRNZW51OiA5MyxcbiAgU2Nyb2xsTG9jazogMTQ1LFxuXG4gIC8vIEZ1bmN0aW9uIGtleXNcbiAgRjE6IDExMixcbiAgRjI6IDExMyxcbiAgRjM6IDExNCxcbiAgRjQ6IDExNSxcbiAgRjU6IDExNixcbiAgRjY6IDExNyxcbiAgRjc6IDExOCxcbiAgRjg6IDExOSxcbiAgRjk6IDEyMCxcbiAgRjEwOiAxMjEsXG4gIEYxMTogMTIyLFxuICBGMTI6IDEyMyxcbiAgRjEzOiAxMjQsXG4gIEYxNDogMTI1LFxuICBGMTU6IDEyNixcbiAgRjE2OiAxMjcsXG4gIEYxNzogMTI4LFxuICBGMTg6IDEyOSxcbiAgRjE5OiAxMzAsXG4gIEYyMDogMTMxLFxuICBGMjE6IDEzMixcbiAgRjIyOiAxMzMsXG4gIEYyMzogMTM0LFxuICBGMjQ6IDEzNSxcblxuICAvLyBOdW1wYWQga2V5c1xuICBOdW1QYWQwOiA5NixcbiAgTnVtUGFkMTogOTcsXG4gIE51bVBhZDI6IDk4LFxuICBOdW1QYWQzOiA5OSxcbiAgTnVtUGFkNDogMTAwLFxuICBOdW1QYWQ1OiAxMDEsXG4gIE51bVBhZDY6IDEwMixcbiAgTnVtUGFkNzogMTAzLFxuICBOdW1QYWQ4OiAxMDQsXG4gIE51bVBhZDk6IDEwNSxcbiAgTnVtUGFkTXVsdGlwbHk6IDEwNixcbiAgTnVtUGFkQWRkOiAxMDcsXG4gIE51bVBhZFN1YnRyYWN0OiAxMDksXG4gIE51bVBhZERlY2ltYWw6IDExMCxcbiAgTnVtUGFkRGl2aWRlOiAxMTEsXG4gIE51bUxvY2s6IDE0NCxcbiAgTnVtUGFkQ29tbWE6IDE5NCxcbiAgTnVtUGFkRXF1YWw6IDEyXG59O1xuXG5leHBvcnQgY29uc3QgaXNMZXR0ZXIgPSAoa2V5OiBudW1iZXIpID0+IHtcbiAgcmV0dXJuIGtleSA+PSBBbGxLZXlDb2Rlcy5BICYmIGtleSA8PSBBbGxLZXlDb2Rlcy5aO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTnVtYmVyID0gKGtleTogbnVtYmVyKSA9PiB7XG4gIHJldHVybiAoXG4gICAgKGtleSA+PSBBbGxLZXlDb2Rlcy5OdW0wICYmIGtleSA8PSBBbGxLZXlDb2Rlcy5OdW05KSB8fFxuICAgIChrZXkgPj0gQWxsS2V5Q29kZXMuTnVtUGFkMCAmJiBrZXkgPD0gQWxsS2V5Q29kZXMuTnVtUGFkOSlcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0FscGhhbnVtZXJpYyA9IChrZXk6IG51bWJlcikgPT4ge1xuICByZXR1cm4gaXNOdW1iZXIoa2V5KSB8fCBpc0xldHRlcihrZXkpO1xufTtcbiIsCiAgImltcG9ydCB7IEFsbEtleUNvZGVzIH0gZnJvbSAnLi9LZXlDb2Rlcyc7XG5cbmNsYXNzIEtleWJvYXJkTWFuYWdlciB7XG4gIHByaXZhdGUgX3ByZXNzZWRLZXlzU2V0ID0gbmV3IFNldDxudW1iZXI+KCk7XG4gIHByaXZhdGUgX3ByZXZlbnREZWZhdWx0S2V5c1NldCA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICBwcml2YXRlIF9hY3RpdmF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFuZGxlS2V5RG93bjogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuICBwcml2YXRlIF9oYW5kbGVLZXlVcDogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHsga2V5Q29kZSB9ID0gZXZlbnQ7XG5cbiAgICAgIGlmICh0aGlzLl9wcmV2ZW50RGVmYXVsdEtleXNTZXQuaGFzKGtleUNvZGUpKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB0aGlzLl9wcmVzc2VkS2V5c1NldC5hZGQoa2V5Q29kZSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVLZXlVcCA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgY29uc3QgeyBrZXlDb2RlIH0gPSBldmVudDtcblxuICAgICAgaWYgKHRoaXMuX3ByZXZlbnREZWZhdWx0S2V5c1NldC5oYXMoa2V5Q29kZSkpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuX3ByZXNzZWRLZXlzU2V0LmRlbGV0ZShrZXlDb2RlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fYWN0aXZhdGVkID0gZmFsc2U7XG4gICAgdGhpcy5faGFuZGxlS2V5RG93biA9IGhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVLZXlVcCA9IGhhbmRsZUtleVVwLmJpbmQodGhpcyk7XG4gIH1cblxuICBpc1ByZXNzZWQoLi4uaW5LZXlzOiAoa2V5b2YgdHlwZW9mIEFsbEtleUNvZGVzKVtdKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgaW5LZXlzKSB7XG4gICAgICBpZiAodGhpcy5fcHJlc3NlZEtleXNTZXQuaGFzKEFsbEtleUNvZGVzW2tleV0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcmV2ZW50RGVmYXVsdChpbktleToga2V5b2YgdHlwZW9mIEFsbEtleUNvZGVzKSB7XG4gICAgdGhpcy5fcHJldmVudERlZmF1bHRLZXlzU2V0LmFkZChBbGxLZXlDb2Rlc1tpbktleV0pO1xuICB9XG5cbiAgZW5hYmxlRGVmYXVsdChpbktleToga2V5b2YgdHlwZW9mIEFsbEtleUNvZGVzKSB7XG4gICAgdGhpcy5fcHJldmVudERlZmF1bHRLZXlzU2V0LmRlbGV0ZShBbGxLZXlDb2Rlc1tpbktleV0pO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3ByZXNzZWRLZXlzU2V0LmNsZWFyKCk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlS2V5RG93bik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9oYW5kbGVLZXlVcCk7XG5cbiAgICB0aGlzLl9hY3RpdmF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3ByZXNzZWRLZXlzU2V0LmNsZWFyKCk7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlS2V5RG93bik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9oYW5kbGVLZXlVcCk7XG5cbiAgICB0aGlzLl9hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgfVxufVxuXG4vL1xuLy9cbi8vXG5cbmNvbnN0IEdsb2JhbEtleWJvYXJkTWFuYWdlciA9IG5ldyBLZXlib2FyZE1hbmFnZXIoKTtcblxuZXhwb3J0IHsgR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyIH07XG4iLAogICJpbXBvcnQgeyBBbGxLZXlDb2RlcyB9IGZyb20gJy4vS2V5Q29kZXMnO1xuXG5jb25zdCBBbGxNb3VzZUJ1dHRvbnMgPSB7XG4gIExlZnQ6IDAsXG4gIE1pZGRsZTogMSxcbiAgUmlnaHQ6IDJcbn07XG5cbmNsYXNzIE1vdXNlTWFuYWdlciB7XG4gIHByaXZhdGUgX3ByZXNzZWRCdXR0b25zU2V0ID0gbmV3IFNldDxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2FjdGl2YXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9oYW5kbGVNb3VzZURvd246IChldmVudDogTW91c2VFdmVudCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfaGFuZGxlTW91c2VVcDogKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB2b2lkO1xuICBwcml2YXRlIF9oYW5kbGVNb3VzZU1vdmU6IChldmVudDogTW91c2VFdmVudCkgPT4gdm9pZDtcblxuICAvLyBwcml2YXRlIF9wb3NpdGlvblggPSAwO1xuICAvLyBwcml2YXRlIF9wb3NpdGlvblkgPSAwO1xuICBwcml2YXRlIF9kZWx0YVggPSAwO1xuICBwcml2YXRlIF9kZWx0YVkgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgdGhpcy5fcHJlc3NlZEJ1dHRvbnNTZXQuYWRkKGV2ZW50LmJ1dHRvbik7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZVVwID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICB0aGlzLl9wcmVzc2VkQnV0dG9uc1NldC5kZWxldGUoZXZlbnQuYnV0dG9uKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgdGhpcy5fZGVsdGFYICs9XG4gICAgICAgIGV2ZW50Lm1vdmVtZW50WCB8fFxuICAgICAgICAoZXZlbnQgYXMgYW55KS5tb3pNb3ZlbWVudFggfHxcbiAgICAgICAgKGV2ZW50IGFzIGFueSkud2Via2l0TW92ZW1lbnRYIHx8XG4gICAgICAgIDA7XG5cbiAgICAgIHRoaXMuX2RlbHRhWSArPVxuICAgICAgICBldmVudC5tb3ZlbWVudFkgfHxcbiAgICAgICAgKGV2ZW50IGFzIGFueSkubW96TW92ZW1lbnRZIHx8XG4gICAgICAgIChldmVudCBhcyBhbnkpLndlYmtpdE1vdmVtZW50WSB8fFxuICAgICAgICAwO1xuICAgIH07XG5cbiAgICB0aGlzLl9hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9oYW5kbGVNb3VzZURvd24gPSBoYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVNb3VzZVVwID0gaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSA9IGhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3ByZXNzZWRCdXR0b25zU2V0LmNsZWFyKCk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9oYW5kbGVNb3VzZURvd24pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9oYW5kbGVNb3VzZVVwKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9oYW5kbGVNb3VzZU1vdmUpO1xuXG4gICAgdGhpcy5fYWN0aXZhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgaWYgKCF0aGlzLl9hY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9wcmVzc2VkQnV0dG9uc1NldC5jbGVhcigpO1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlTW91c2VEb3duKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlTW91c2VVcCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5faGFuZGxlTW91c2VNb3ZlKTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgaXNCdXR0b25QcmVzc2VkKGluS2V5OiBrZXlvZiB0eXBlb2YgQWxsTW91c2VCdXR0b25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZXNzZWRCdXR0b25zU2V0LmhhcyhBbGxNb3VzZUJ1dHRvbnNbaW5LZXldKTtcbiAgfVxuXG4gIGRlbHRhWCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZWx0YVg7XG4gIH1cbiAgZGVsdGFZKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbHRhWTtcbiAgfVxuICByZXNldERlbHRhcygpIHtcbiAgICB0aGlzLl9kZWx0YVggPSAwO1xuICAgIHRoaXMuX2RlbHRhWSA9IDA7XG4gIH1cbn1cblxuLy9cbi8vXG4vL1xuXG5jb25zdCBHbG9iYWxNb3VzZU1hbmFnZXIgPSBuZXcgTW91c2VNYW5hZ2VyKCk7XG5cbmV4cG9ydCB7IEdsb2JhbE1vdXNlTWFuYWdlciB9O1xuIiwKICAiY29uc3QgYWxsUmVxdWVzdEV2ZW50czogc3RyaW5nW10gPSBbXG4gICdyZXF1ZXN0UG9pbnRlckxvY2snLFxuICAnbW96UmVxdWVzdFBvaW50ZXJMb2NrJyxcbiAgJ3dlYmtpdFJlcXVlc3RQb2ludGVyTG9jaydcbl07XG5cbmNvbnN0IGFsbEV4aXRFdmVudHM6IHN0cmluZ1tdID0gW1xuICAnZXhpdFBvaW50ZXJMb2NrJyxcbiAgJ21vekV4aXRQb2ludGVyTG9jaycsXG4gICd3ZWJraXRFeGl0UG9pbnRlckxvY2snXG5dO1xuXG5jb25zdCBhbGxTdGF0ZUV2ZW50czogc3RyaW5nW10gPSBbXG4gICdwb2ludGVyTG9ja0VsZW1lbnQnLFxuICAnbW96UG9pbnRlckxvY2tFbGVtZW50JyxcbiAgJ3dlYmtpdFBvaW50ZXJMb2NrRWxlbWVudCdcbl07XG5cbmNvbnN0IGFsbENoYW5nZUV2ZW50czogeyBtZXRob2ROYW1lOiBzdHJpbmc7IHByb3BlcnR5TmFtZTogc3RyaW5nIH1bXSA9IFtcbiAgeyBtZXRob2ROYW1lOiAnb25wb2ludGVybG9ja2NoYW5nZScsIHByb3BlcnR5TmFtZTogJ3BvaW50ZXJsb2NrY2hhbmdlJyB9LFxuICB7XG4gICAgbWV0aG9kTmFtZTogJ29ubW96cG9pbnRlcmxvY2tjaGFuZ2UnLFxuICAgIHByb3BlcnR5TmFtZTogJ21venBvaW50ZXJsb2NrY2hhbmdlJ1xuICB9LFxuICB7XG4gICAgbWV0aG9kTmFtZTogJ29ud2Via2l0cG9pbnRlcmxvY2tjaGFuZ2UnLFxuICAgIHByb3BlcnR5TmFtZTogJ3dlYmtpdHBvaW50ZXJsb2NrY2hhbmdlJ1xuICB9XG5dO1xuXG5jb25zdCBhbGxFcnJvckV2ZW50czogeyBtZXRob2ROYW1lOiBzdHJpbmc7IHByb3BlcnR5TmFtZTogc3RyaW5nIH1bXSA9IFtcbiAgeyBtZXRob2ROYW1lOiAnb25wb2ludGVybG9ja2Vycm9yJywgcHJvcGVydHlOYW1lOiAncG9pbnRlcmxvY2tlcnJvcicgfSxcbiAgeyBtZXRob2ROYW1lOiAnb25tb3pwb2ludGVybG9ja2Vycm9yJywgcHJvcGVydHlOYW1lOiAnbW96cG9pbnRlcmxvY2tlcnJvcicgfSxcbiAge1xuICAgIG1ldGhvZE5hbWU6ICdvbndlYmtpdHBvaW50ZXJsb2NrZXJyb3InLFxuICAgIHByb3BlcnR5TmFtZTogJ3dlYmtpdHBvaW50ZXJsb2NrZXJyb3InXG4gIH1cbl07XG5cbnR5cGUgT25DaGFuZ2VDYWxsYmFjayA9ICgpID0+IHZvaWQ7XG50eXBlIE9uRXJyb3JDYWxsYmFjayA9IChldmVudDogRXZlbnQpID0+IHZvaWQ7XG5cbmludGVyZmFjZSBJUmVzdWx0IHtcbiAgc3VjY2VzczogYm9vbGVhbjtcbiAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5jbGFzcyBQb2ludGVyTG9ja01hbmFnZXIge1xuICBwcml2YXRlIF9vbkxvY2tDaGFuZ2VDYWxsYmFja3M6IE9uQ2hhbmdlQ2FsbGJhY2tbXSA9IFtdO1xuICBwcml2YXRlIF9vbkxvY2tFcnJvckNhbGxiYWNrczogT25FcnJvckNhbGxiYWNrW10gPSBbXTtcbiAgcHJpdmF0ZSBfdGltZVNpbmNlTGFzdExvY2tDaGFuZ2UgPSAwO1xuXG4gIHByaXZhdGUgX2xhdGVzdFJlcXVlc3RIdG1sRWxlbWVudDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIGNvbnN0cnVjdG9yKCkge31cblxuICBwcml2YXRlIF9pbml0aWFsaXplKCkge1xuICAgIGlmICh0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qgb25Mb2NrQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgdGhpcy5fdGltZVNpbmNlTGFzdExvY2tDaGFuZ2UgPSBEYXRlLm5vdygpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJ0aW1lciByZXNldFwiKTtcblxuICAgICAgdGhpcy5fb25Mb2NrQ2hhbmdlQ2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Mb2NrRXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICB0aGlzLl90aW1lU2luY2VMYXN0TG9ja0NoYW5nZSA9IERhdGUubm93KCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInRpbWVyIHJlc2V0XCIpO1xuXG4gICAgICB0aGlzLl9vbkxvY2tFcnJvckNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soZXZlbnQpKTtcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBjdXJyRXZlbnQgb2YgYWxsQ2hhbmdlRXZlbnRzKSB7XG4gICAgICBpZiAoY3VyckV2ZW50Lm1ldGhvZE5hbWUgaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihjdXJyRXZlbnQucHJvcGVydHlOYW1lLCBvbkxvY2tDaGFuZ2UsIGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjdXJyRXZlbnQgb2YgYWxsRXJyb3JFdmVudHMpIHtcbiAgICAgIGlmIChjdXJyRXZlbnQubWV0aG9kTmFtZSBpbiBkb2N1bWVudCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGN1cnJFdmVudC5wcm9wZXJ0eU5hbWUsIG9uTG9ja0Vycm9yLCBmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vXG5cbiAgY2FuQmVQb2ludGVyTG9ja2VkKGluVGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBmb3IgKGNvbnN0IGN1cnJFdmVudCBvZiBhbGxSZXF1ZXN0RXZlbnRzKSB7XG4gICAgICBpZiAoY3VyckV2ZW50IGluIGluVGFyZ2V0RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy9cblxuICBpc1BvaW50ZXJMb2NrZWQoaW5UYXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGZvciAoY29uc3QgY3VyckV2ZW50IG9mIGFsbFN0YXRlRXZlbnRzKSB7XG4gICAgICBpZiAoY3VyckV2ZW50IGluIGRvY3VtZW50KSB7XG4gICAgICAgIHJldHVybiAoZG9jdW1lbnQgYXMgYW55KVtjdXJyRXZlbnRdID09PSBpblRhcmdldEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vXG5cbiAgYXN5bmMgcmVxdWVzdFBvaW50ZXJMb2NrKGluVGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiBQcm9taXNlPElSZXN1bHQ+IHtcbiAgICBpZiAodGhpcy5pc1BvaW50ZXJMb2NrZWQoaW5UYXJnZXRFbGVtZW50KSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdlbGVtZW50IGFscmVhZHkgbG9ja2VkJyB9O1xuICAgIH1cblxuICAgIHRoaXMuX2luaXRpYWxpemUoKTtcblxuICAgIGlmICh0aGlzLl90aW1lU2luY2VMYXN0TG9ja0NoYW5nZSA+IDApIHtcbiAgICAgIGNvbnN0IGVsYXBzZWRTZWNUaW1lID1cbiAgICAgICAgKERhdGUubm93KCkgLSB0aGlzLl90aW1lU2luY2VMYXN0TG9ja0NoYW5nZSkgLyAxMDAwO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhcImVsYXBzZWRTZWNUaW1lIDFcIiwgZWxhcHNlZFNlY1RpbWUpO1xuXG4gICAgICBpZiAoZWxhcHNlZFNlY1RpbWUgPCAxLjEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlOiBgcmVxdWVzdCBmb3IgbG9jayB3YXMgdG9vIGVhcmx5LCB0aW1lIHRvIHdhaXQ6ICR7ZWxhcHNlZFNlY1RpbWUudG9GaXhlZChcbiAgICAgICAgICAgIDJcbiAgICAgICAgICApfXNlY2BcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdGltZVNpbmNlTGFzdExvY2tDaGFuZ2UgPSBEYXRlLm5vdygpO1xuXG4gICAgZm9yIChjb25zdCBjdXJyRXZlbnQgb2YgYWxsUmVxdWVzdEV2ZW50cykge1xuICAgICAgaWYgKGN1cnJFdmVudCBpbiBpblRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAvLyBtb3JlIGFjY3VyYXRlIGJ5IGRpc2FibGluZyBPUy1sZXZlbCBhZGp1c3RlZCBtb3VzZSBtb3ZlbWVudHNcbiAgICAgICAgICB1bmFkanVzdGVkTW92ZW1lbnQ6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFjdHVhbCByZXF1ZXN0XCIpO1xuXG4gICAgICAgICAgYXdhaXQgKGluVGFyZ2V0RWxlbWVudCBhcyBhbnkpW2N1cnJFdmVudF0ob3B0aW9ucyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRVJSXCIsIGVycik7XG5cbiAgICAgICAgICBjb25zdCBlbGFwc2VkU2VjVGltZSA9XG4gICAgICAgICAgICAoRGF0ZS5ub3coKSAtIHRoaXMuX3RpbWVTaW5jZUxhc3RMb2NrQ2hhbmdlKSAvIDEwMDA7XG5cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImVsYXBzZWRTZWNUaW1lIDJcIiwgZWxhcHNlZFNlY1RpbWUpO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogYHJlcXVlc3QgZm9yIGxvY2sgd2FzIHRvbyBlYXJseSwgdGltZSB0byB3YWl0OiAke2VsYXBzZWRTZWNUaW1lLnRvRml4ZWQoXG4gICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICl9c2VjYFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90aW1lU2luY2VMYXN0TG9ja0NoYW5nZSA9IERhdGUubm93KCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGltZXIgcmVzZXRcIik7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ3JlcXVlc3QgZm9yIGxvY2sgZG9uZScgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ3Vuc3VwcG9ydGVkIHJlcXVlc3QgZm9yIGxvY2snIH07XG4gIH1cblxuICAvL1xuXG4gIGFsbG93UG9pbnRlckxvY2tlZE9uQ2xpY2tFdmVudChpblRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKGluVGFyZ2V0RWxlbWVudCA9PT0gdGhpcy5fbGF0ZXN0UmVxdWVzdEh0bWxFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbGF0ZXN0UmVxdWVzdEh0bWxFbGVtZW50ID0gaW5UYXJnZXRFbGVtZW50O1xuXG4gICAgY29uc3Qgb25DbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgIGluVGFyZ2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnJlcXVlc3RQb2ludGVyTG9jayhpblRhcmdldEVsZW1lbnQpO1xuXG4gICAgICB0aGlzLl9sYXRlc3RSZXF1ZXN0SHRtbEVsZW1lbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgdGhpcy5hbGxvd1BvaW50ZXJMb2NrZWRPbkNsaWNrRXZlbnQoaW5UYXJnZXRFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaW5UYXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XG4gIH1cblxuICAvL1xuXG4gIGV4aXRQb2ludGVyTG9jaygpIHtcbiAgICBmb3IgKGNvbnN0IGN1cnJFdmVudCBvZiBhbGxFeGl0RXZlbnRzKSB7XG4gICAgICBpZiAoY3VyckV2ZW50IGluIGRvY3VtZW50KSB7XG4gICAgICAgIChkb2N1bWVudCBhcyBhbnkpW2N1cnJFdmVudF0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9cblxuICBhZGRPbkxvY2tDaGFuZ2UoaW5DYWxsYmFjazogT25DaGFuZ2VDYWxsYmFjaykge1xuICAgIHRoaXMuX29uTG9ja0NoYW5nZUNhbGxiYWNrcy5wdXNoKGluQ2FsbGJhY2spO1xuICB9XG4gIHJlbW92ZU9uTG9ja0NoYW5nZShpbkNhbGxiYWNrOiBPbkNoYW5nZUNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9vbkxvY2tDaGFuZ2VDYWxsYmFja3MuaW5kZXhPZihpbkNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29uTG9ja0NoYW5nZUNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLy9cblxuICBhZGRPbkxvY2tFcnJvcihpbkNhbGxiYWNrOiBPbkVycm9yQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9vbkxvY2tFcnJvckNhbGxiYWNrcy5wdXNoKGluQ2FsbGJhY2spO1xuICB9XG4gIHJlbW92ZU9uTG9ja0Vycm9yKGluQ2FsbGJhY2s6IE9uRXJyb3JDYWxsYmFjaykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fb25Mb2NrRXJyb3JDYWxsYmFja3MuaW5kZXhPZihpbkNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29uTG9ja0Vycm9yQ2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICAvL1xuXG4gIHJlbW92ZUFsbENhbGxiYWNrcygpIHtcbiAgICB0aGlzLl9vbkxvY2tDaGFuZ2VDYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9vbkxvY2tFcnJvckNhbGxiYWNrcy5sZW5ndGggPSAwO1xuICB9XG59XG5cbmNvbnN0IEdsb2JhbFBvaW50ZXJMb2NrTWFuYWdlciA9IG5ldyBQb2ludGVyTG9ja01hbmFnZXIoKTtcblxuZXhwb3J0IHsgR2xvYmFsUG9pbnRlckxvY2tNYW5hZ2VyIH07XG4iLAogICJjbGFzcyBUb3VjaERhdGEge1xuICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgcHVibGljIGNyZWF0ZWRBdCA9IERhdGUubm93KCk7XG4gIHB1YmxpYyBwb3NpdGlvblg6IG51bWJlcjtcbiAgcHVibGljIHBvc2l0aW9uWTogbnVtYmVyO1xuICBwdWJsaWMgZGVsdGFYOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgZGVsdGFZOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsIHBvc2l0aW9uWDogbnVtYmVyLCBwb3NpdGlvblk6IG51bWJlcikge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnBvc2l0aW9uWCA9IHBvc2l0aW9uWDtcbiAgICB0aGlzLnBvc2l0aW9uWSA9IHBvc2l0aW9uWTtcbiAgfVxuXG4gIHJlc2V0RGVsdGEoKSB7XG4gICAgdGhpcy5kZWx0YVggPSAwO1xuICAgIHRoaXMuZGVsdGFZID0gMDtcbiAgfVxufVxuXG5jbGFzcyBUb3VjaE1hbmFnZXIge1xuICBwcml2YXRlIF9hY3RpdmF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYWxsVG91Y2hEYXRhTWFwID0gbmV3IE1hcDxzdHJpbmcsIFRvdWNoRGF0YT4oKTtcbiAgcHJpdmF0ZSBfYWxsQ2FjaGVkVG91Y2hEYXRhQXJyYXk6IFRvdWNoRGF0YVtdID0gW107XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVG91Y2hTdGFydDogKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB2b2lkO1xuICBwcml2YXRlIF9oYW5kbGVUb3VjaEVuZDogKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB2b2lkO1xuICBwcml2YXRlIF9oYW5kbGVUb3VjaE1vdmU6IChldmVudDogVG91Y2hFdmVudCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0ID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyArK2lpKSB7XG4gICAgICAgIGNvbnN0IHsgaWRlbnRpZmllciwgcGFnZVgsIHBhZ2VZIH0gPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpaV07XG4gICAgICAgIGNvbnN0IG5ld0RhdGEgPSBuZXcgVG91Y2hEYXRhKGlkZW50aWZpZXIsIHBhZ2VYLCBwYWdlWSk7XG5cbiAgICAgICAgdGhpcy5fYWxsVG91Y2hEYXRhTWFwLnNldChgJHtpZGVudGlmaWVyfWAsIG5ld0RhdGEpO1xuICAgICAgICB0aGlzLl9hbGxDYWNoZWRUb3VjaERhdGFBcnJheS5sZW5ndGggPSAwO1xuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlVG91Y2hFbmQgPSAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7ICsraWkpIHtcbiAgICAgICAgY29uc3QgeyBpZGVudGlmaWVyIH0gPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpaV07XG5cbiAgICAgICAgdGhpcy5fYWxsVG91Y2hEYXRhTWFwLmRlbGV0ZShgJHtpZGVudGlmaWVyfWApO1xuICAgICAgICB0aGlzLl9hbGxDYWNoZWRUb3VjaERhdGFBcnJheS5sZW5ndGggPSAwO1xuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyArK2lpKSB7XG4gICAgICAgIGNvbnN0IHsgaWRlbnRpZmllciwgcGFnZVgsIHBhZ2VZIH0gPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpaV07XG5cbiAgICAgICAgY29uc3QgY3VyckRhdGEgPSB0aGlzLl9hbGxUb3VjaERhdGFNYXAuZ2V0KGAke2lkZW50aWZpZXJ9YCk7XG4gICAgICAgIGlmICghY3VyckRhdGEpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IHBhZ2VYIC0gY3VyckRhdGEucG9zaXRpb25YO1xuICAgICAgICBjb25zdCBkZWx0YVkgPSBwYWdlWSAtIGN1cnJEYXRhLnBvc2l0aW9uWTtcblxuICAgICAgICBjdXJyRGF0YS5kZWx0YVggKz0gZGVsdGFYO1xuICAgICAgICBjdXJyRGF0YS5kZWx0YVkgKz0gZGVsdGFZO1xuICAgICAgICBjdXJyRGF0YS5wb3NpdGlvblggPSBwYWdlWDtcbiAgICAgICAgY3VyckRhdGEucG9zaXRpb25ZID0gcGFnZVk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2hhbmRsZVRvdWNoU3RhcnQgPSBoYW5kbGVUb3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlVG91Y2hFbmQgPSBoYW5kbGVUb3VjaEVuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZVRvdWNoTW92ZSA9IGhhbmRsZVRvdWNoTW92ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaXNTdXBwb3J0ZWQoaW5UYXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiBpblRhcmdldEVsZW1lbnQ7XG4gIH1cblxuICBhY3RpdmF0ZShpblRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKGluVGFyZ2V0RWxlbWVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2FsbFRvdWNoRGF0YU1hcC5jbGVhcigpO1xuICAgIHRoaXMuX2FsbENhY2hlZFRvdWNoRGF0YUFycmF5Lmxlbmd0aCA9IDA7XG5cbiAgICBpblRhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX2hhbmRsZVRvdWNoU3RhcnQpO1xuICAgIGluVGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX2hhbmRsZVRvdWNoRW5kKTtcbiAgICBpblRhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLl9oYW5kbGVUb3VjaEVuZCk7XG4gICAgaW5UYXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZVRvdWNoTW92ZSwge1xuICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICB9KTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IHRydWU7XG4gIH1cblxuICBkZWFjdGl2YXRlKGluVGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2FsbFRvdWNoRGF0YU1hcC5jbGVhcigpO1xuICAgIHRoaXMuX2FsbENhY2hlZFRvdWNoRGF0YUFycmF5Lmxlbmd0aCA9IDA7XG5cbiAgICBpblRhcmdldEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX2hhbmRsZVRvdWNoU3RhcnQpO1xuICAgIGluVGFyZ2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX2hhbmRsZVRvdWNoRW5kKTtcbiAgICBpblRhcmdldEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLl9oYW5kbGVUb3VjaEVuZCk7XG4gICAgaW5UYXJnZXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICB0aGlzLl9hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZnJlc2hDYWNoZSgpIHtcbiAgICBpZiAodGhpcy5fYWxsQ2FjaGVkVG91Y2hEYXRhQXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9hbGxDYWNoZWRUb3VjaERhdGFBcnJheSA9IFsuLi50aGlzLl9hbGxUb3VjaERhdGFNYXAudmFsdWVzKCldO1xuICAgIH1cbiAgfVxuXG4gIGdldFRvdWNoRGF0YSgpOiBSZWFkb25seUFycmF5PFRvdWNoRGF0YT4ge1xuICAgIHRoaXMuX3JlZnJlc2hDYWNoZSgpO1xuICAgIHJldHVybiB0aGlzLl9hbGxDYWNoZWRUb3VjaERhdGFBcnJheTtcbiAgfVxuXG4gIHJlc2V0RGVsdGFzKCkge1xuICAgIHRoaXMuX3JlZnJlc2hDYWNoZSgpO1xuICAgIHRoaXMuX2FsbENhY2hlZFRvdWNoRGF0YUFycmF5LmZvckVhY2goKGl0ZW0pID0+IGl0ZW0ucmVzZXREZWx0YSgpKTtcbiAgfVxufVxuXG4vL1xuLy9cbi8vXG5cbmNvbnN0IEdsb2JhbFRvdWNoTWFuYWdlciA9IG5ldyBUb3VjaE1hbmFnZXIoKTtcblxuZXhwb3J0IHsgR2xvYmFsVG91Y2hNYW5hZ2VyIH07XG4iLAogICJ0eXBlIE9uQ2hhbmdlQ2FsbGJhY2sgPSAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuXG5jbGFzcyBWaXNpYmlsaXR5TWFuYWdlciB7XG4gIHByaXZhdGUgX2FjdGl2YXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9vblZpc2liaWxpdHlDaGFuZ2VDYWxsYmFja3M6IE9uQ2hhbmdlQ2FsbGJhY2tbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2U6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGlzVmlzaWJsZSA9IHRoaXMuaXNWaXNpYmxlKCk7XG4gICAgICB0aGlzLl9vblZpc2liaWxpdHlDaGFuZ2VDYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+XG4gICAgICAgIGNhbGxiYWNrKGlzVmlzaWJsZSlcbiAgICAgICk7XG4gICAgfTtcblxuICAgIHRoaXMuX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UgPSBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlLmJpbmQodGhpcyk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICd2aXNpYmlsaXR5Y2hhbmdlJyxcbiAgICAgIHRoaXMuX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UsXG4gICAgICBmYWxzZVxuICAgICk7XG5cbiAgICB0aGlzLl9hY3RpdmF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAndmlzaWJpbGl0eWNoYW5nZScsXG4gICAgICB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlLFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgdGhpcy5fYWN0aXZhdGVkID0gZmFsc2U7XG4gIH1cblxuICAvL1xuXG4gIGlzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiAnb252aXNpYmlsaXR5Y2hhbmdlJyBpbiBkb2N1bWVudDtcbiAgfVxuXG4gIC8vXG5cbiAgaXNWaXNpYmxlKCkge1xuICAgIHJldHVybiBkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09ICd2aXNpYmxlJztcbiAgfVxuXG4gIC8vXG5cbiAgYWRkVmlzaWJpbGl0eUNoYW5nZShpbkNhbGxiYWNrOiBPbkNoYW5nZUNhbGxiYWNrKSB7XG4gICAgdGhpcy5fb25WaXNpYmlsaXR5Q2hhbmdlQ2FsbGJhY2tzLnB1c2goaW5DYWxsYmFjayk7XG4gIH1cbiAgcmVtb3ZlVmlzaWJpbGl0eUNoYW5nZShpbkNhbGxiYWNrOiBPbkNoYW5nZUNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9vblZpc2liaWxpdHlDaGFuZ2VDYWxsYmFja3MuaW5kZXhPZihpbkNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29uVmlzaWJpbGl0eUNoYW5nZUNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLy9cblxuICByZW1vdmVBbGxDYWxsYmFja3MoKSB7XG4gICAgdGhpcy5fb25WaXNpYmlsaXR5Q2hhbmdlQ2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gIH1cbn1cblxuY29uc3QgR2xvYmFsVmlzaWJpbGl0eU1hbmFnZXIgPSBuZXcgVmlzaWJpbGl0eU1hbmFnZXIoKTtcblxuZXhwb3J0IHsgR2xvYmFsVmlzaWJpbGl0eU1hbmFnZXIgfTtcbiIsCiAgImV4cG9ydCBjb25zdCBpc1dlYldvcmtlclN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuICEhd2luZG93Lldvcmtlcjtcbn07XG4iLAogICJleHBvcnQgY29uc3QgaXNXZWJHTDJTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAhIXdpbmRvdy5XZWJHTDJSZW5kZXJpbmdDb250ZXh0O1xufTtcbiIsCiAgImV4cG9ydCBpbnRlcmZhY2UgSUZyYW1lUHJvZmlsZXIge1xuICBmcmFtZXNEZWx0YTogUmVhZG9ubHlBcnJheTxudW1iZXI+O1xuICBhdmVyYWdlRGVsdGE6IG51bWJlcjtcbiAgbWluRGVsdGE6IG51bWJlcjtcbiAgbWF4RGVsdGE6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEZyYW1lUHJvZmlsZXIgaW1wbGVtZW50cyBJRnJhbWVQcm9maWxlciB7XG4gIHByaXZhdGUgX2ZyYW1lc0RlbHRhOiBudW1iZXJbXSA9IFtdO1xuICBwcml2YXRlIF9hdmVyYWdlRGVsdGE6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX21pbkRlbHRhOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9tYXhEZWx0YTogbnVtYmVyID0gMDtcblxuICBwdXNoRGVsdGEoaW5EZWx0YTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2ZyYW1lc0RlbHRhLmxlbmd0aCA+PSAxMDApIHtcbiAgICAgIHRoaXMuX2ZyYW1lc0RlbHRhLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZnJhbWVzRGVsdGEucHVzaChpbkRlbHRhKTtcblxuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuXG4gICAgdGhpcy5fbWluRGVsdGEgPSArOTk5OTk5OTk5O1xuICAgIHRoaXMuX21heERlbHRhID0gLTk5OTk5OTk5OTtcbiAgICB0aGlzLl9hdmVyYWdlRGVsdGEgPSAwO1xuXG4gICAgZm9yIChjb25zdCBjdXJyRGVsdGEgb2YgdGhpcy5fZnJhbWVzRGVsdGEpIHtcbiAgICAgIHRoaXMuX21pbkRlbHRhID0gTWF0aC5taW4odGhpcy5fbWluRGVsdGEsIGN1cnJEZWx0YSk7XG4gICAgICB0aGlzLl9tYXhEZWx0YSA9IE1hdGgubWF4KHRoaXMuX21heERlbHRhLCBjdXJyRGVsdGEpO1xuICAgICAgdGhpcy5fYXZlcmFnZURlbHRhICs9IGN1cnJEZWx0YTtcbiAgICB9XG4gICAgdGhpcy5fYXZlcmFnZURlbHRhIC89IHRoaXMuX2ZyYW1lc0RlbHRhLmxlbmd0aDtcbiAgfVxuXG4gIGdldCBmcmFtZXNEZWx0YSgpOiBSZWFkb25seUFycmF5PG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9mcmFtZXNEZWx0YTtcbiAgfVxuICBnZXQgYXZlcmFnZURlbHRhKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2F2ZXJhZ2VEZWx0YTtcbiAgfVxuICBnZXQgbWluRGVsdGEoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGVsdGE7XG4gIH1cbiAgZ2V0IG1heERlbHRhKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21heERlbHRhO1xuICB9XG59XG4iLAogICIvKipcbiAqIENvbW1vbiB1dGlsaXRpZXNcbiAqIEBtb2R1bGUgZ2xNYXRyaXhcbiAqL1xuLy8gQ29uZmlndXJhdGlvbiBDb25zdGFudHNcbmV4cG9ydCB2YXIgRVBTSUxPTiA9IDAuMDAwMDAxO1xuZXhwb3J0IHZhciBBUlJBWV9UWVBFID0gdHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBGbG9hdDMyQXJyYXkgOiBBcnJheTtcbmV4cG9ydCB2YXIgUkFORE9NID0gTWF0aC5yYW5kb207XG4vKipcbiAqIFNldHMgdGhlIHR5cGUgb2YgYXJyYXkgdXNlZCB3aGVuIGNyZWF0aW5nIG5ldyB2ZWN0b3JzIGFuZCBtYXRyaWNlc1xuICpcbiAqIEBwYXJhbSB7RmxvYXQzMkFycmF5Q29uc3RydWN0b3IgfCBBcnJheUNvbnN0cnVjdG9yfSB0eXBlIEFycmF5IHR5cGUsIHN1Y2ggYXMgRmxvYXQzMkFycmF5IG9yIEFycmF5XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldE1hdHJpeEFycmF5VHlwZSh0eXBlKSB7XG4gIEFSUkFZX1RZUEUgPSB0eXBlO1xufVxudmFyIGRlZ3JlZSA9IE1hdGguUEkgLyAxODA7XG4vKipcbiAqIENvbnZlcnQgRGVncmVlIFRvIFJhZGlhblxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIEFuZ2xlIGluIERlZ3JlZXNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdG9SYWRpYW4oYSkge1xuICByZXR1cm4gYSAqIGRlZ3JlZTtcbn1cbi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgdGhlIGFyZ3VtZW50cyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgdmFsdWUsIHdpdGhpbiBhbiBhYnNvbHV0ZVxuICogb3IgcmVsYXRpdmUgdG9sZXJhbmNlIG9mIGdsTWF0cml4LkVQU0lMT04gKGFuIGFic29sdXRlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciB2YWx1ZXMgbGVzc1xuICogdGhhbiBvciBlcXVhbCB0byAxLjAsIGFuZCBhIHJlbGF0aXZlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciBsYXJnZXIgdmFsdWVzKVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIFRoZSBmaXJzdCBudW1iZXIgdG8gdGVzdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBzZWNvbmQgbnVtYmVyIHRvIHRlc3QuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbnVtYmVycyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEpLCBNYXRoLmFicyhiKSk7XG59XG5pZiAoIU1hdGguaHlwb3QpIE1hdGguaHlwb3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB5ID0gMCxcbiAgICAgIGkgPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICB5ICs9IGFyZ3VtZW50c1tpXSAqIGFyZ3VtZW50c1tpXTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLnNxcnQoeSk7XG59OyIsCiAgImltcG9ydCAqIGFzIGdsTWF0cml4IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuLyoqXG4gKiAzeDMgTWF0cml4XG4gKiBAbW9kdWxlIG1hdDNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0M1xuICpcbiAqIEByZXR1cm5zIHttYXQzfSBhIG5ldyAzeDMgbWF0cml4XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDkpO1xuXG4gIGlmIChnbE1hdHJpeC5BUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs1XSA9IDA7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICB9XG5cbiAgb3V0WzBdID0gMTtcbiAgb3V0WzRdID0gMTtcbiAgb3V0WzhdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ29waWVzIHRoZSB1cHBlci1sZWZ0IDN4MyB2YWx1ZXMgaW50byB0aGUgZ2l2ZW4gbWF0My5cbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIDN4MyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhICAgdGhlIHNvdXJjZSA0eDQgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21NYXQ0KG91dCwgYSkge1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICBvdXRbM10gPSBhWzRdO1xuICBvdXRbNF0gPSBhWzVdO1xuICBvdXRbNV0gPSBhWzZdO1xuICBvdXRbNl0gPSBhWzhdO1xuICBvdXRbN10gPSBhWzldO1xuICBvdXRbOF0gPSBhWzEwXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBtYXQzIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gKlxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0M30gYSBuZXcgM3gzIG1hdHJpeFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg5KTtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgb3V0WzNdID0gYVszXTtcbiAgb3V0WzRdID0gYVs0XTtcbiAgb3V0WzVdID0gYVs1XTtcbiAgb3V0WzZdID0gYVs2XTtcbiAgb3V0WzddID0gYVs3XTtcbiAgb3V0WzhdID0gYVs4XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDMgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICBvdXRbM10gPSBhWzNdO1xuICBvdXRbNF0gPSBhWzRdO1xuICBvdXRbNV0gPSBhWzVdO1xuICBvdXRbNl0gPSBhWzZdO1xuICBvdXRbN10gPSBhWzddO1xuICBvdXRbOF0gPSBhWzhdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgbWF0MyB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcmV0dXJucyB7bWF0M30gQSBuZXcgbWF0M1xuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVmFsdWVzKG0wMCwgbTAxLCBtMDIsIG0xMCwgbTExLCBtMTIsIG0yMCwgbTIxLCBtMjIpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDkpO1xuICBvdXRbMF0gPSBtMDA7XG4gIG91dFsxXSA9IG0wMTtcbiAgb3V0WzJdID0gbTAyO1xuICBvdXRbM10gPSBtMTA7XG4gIG91dFs0XSA9IG0xMTtcbiAgb3V0WzVdID0gbTEyO1xuICBvdXRbNl0gPSBtMjA7XG4gIG91dFs3XSA9IG0yMTtcbiAgb3V0WzhdID0gbTIyO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBtYXQzIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtOdW1iZXJ9IG0wMCBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAwKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0wMSBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAxIHBvc2l0aW9uIChpbmRleCAxKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0wMiBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAyKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0xMCBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAzKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0xMSBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA0KVxuICogQHBhcmFtIHtOdW1iZXJ9IG0xMiBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAyIHBvc2l0aW9uIChpbmRleCA1KVxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMCBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA2KVxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMSBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA3KVxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMiBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAyIHBvc2l0aW9uIChpbmRleCA4KVxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCBtMDAsIG0wMSwgbTAyLCBtMTAsIG0xMSwgbTEyLCBtMjAsIG0yMSwgbTIyKSB7XG4gIG91dFswXSA9IG0wMDtcbiAgb3V0WzFdID0gbTAxO1xuICBvdXRbMl0gPSBtMDI7XG4gIG91dFszXSA9IG0xMDtcbiAgb3V0WzRdID0gbTExO1xuICBvdXRbNV0gPSBtMTI7XG4gIG91dFs2XSA9IG0yMDtcbiAgb3V0WzddID0gbTIxO1xuICBvdXRbOF0gPSBtMjI7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNldCBhIG1hdDMgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KG91dCkge1xuICBvdXRbMF0gPSAxO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAxO1xuICBvdXRbNV0gPSAwO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNwb3NlKG91dCwgYSkge1xuICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gIGlmIChvdXQgPT09IGEpIHtcbiAgICB2YXIgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTEyID0gYVs1XTtcbiAgICBvdXRbMV0gPSBhWzNdO1xuICAgIG91dFsyXSA9IGFbNl07XG4gICAgb3V0WzNdID0gYTAxO1xuICAgIG91dFs1XSA9IGFbN107XG4gICAgb3V0WzZdID0gYTAyO1xuICAgIG91dFs3XSA9IGExMjtcbiAgfSBlbHNlIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbM107XG4gICAgb3V0WzJdID0gYVs2XTtcbiAgICBvdXRbM10gPSBhWzFdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs3XTtcbiAgICBvdXRbNl0gPSBhWzJdO1xuICAgIG91dFs3XSA9IGFbNV07XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEludmVydHMgYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVydChvdXQsIGEpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXTtcbiAgdmFyIGExMCA9IGFbM10sXG4gICAgICBhMTEgPSBhWzRdLFxuICAgICAgYTEyID0gYVs1XTtcbiAgdmFyIGEyMCA9IGFbNl0sXG4gICAgICBhMjEgPSBhWzddLFxuICAgICAgYTIyID0gYVs4XTtcbiAgdmFyIGIwMSA9IGEyMiAqIGExMSAtIGExMiAqIGEyMTtcbiAgdmFyIGIxMSA9IC1hMjIgKiBhMTAgKyBhMTIgKiBhMjA7XG4gIHZhciBiMjEgPSBhMjEgKiBhMTAgLSBhMTEgKiBhMjA7IC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcblxuICB2YXIgZGV0ID0gYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxO1xuXG4gIGlmICghZGV0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBkZXQgPSAxLjAgLyBkZXQ7XG4gIG91dFswXSA9IGIwMSAqIGRldDtcbiAgb3V0WzFdID0gKC1hMjIgKiBhMDEgKyBhMDIgKiBhMjEpICogZGV0O1xuICBvdXRbMl0gPSAoYTEyICogYTAxIC0gYTAyICogYTExKSAqIGRldDtcbiAgb3V0WzNdID0gYjExICogZGV0O1xuICBvdXRbNF0gPSAoYTIyICogYTAwIC0gYTAyICogYTIwKSAqIGRldDtcbiAgb3V0WzVdID0gKC1hMTIgKiBhMDAgKyBhMDIgKiBhMTApICogZGV0O1xuICBvdXRbNl0gPSBiMjEgKiBkZXQ7XG4gIG91dFs3XSA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGRldDtcbiAgb3V0WzhdID0gKGExMSAqIGEwMCAtIGEwMSAqIGExMCkgKiBkZXQ7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGpvaW50KG91dCwgYSkge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdO1xuICB2YXIgYTEwID0gYVszXSxcbiAgICAgIGExMSA9IGFbNF0sXG4gICAgICBhMTIgPSBhWzVdO1xuICB2YXIgYTIwID0gYVs2XSxcbiAgICAgIGEyMSA9IGFbN10sXG4gICAgICBhMjIgPSBhWzhdO1xuICBvdXRbMF0gPSBhMTEgKiBhMjIgLSBhMTIgKiBhMjE7XG4gIG91dFsxXSA9IGEwMiAqIGEyMSAtIGEwMSAqIGEyMjtcbiAgb3V0WzJdID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICBvdXRbM10gPSBhMTIgKiBhMjAgLSBhMTAgKiBhMjI7XG4gIG91dFs0XSA9IGEwMCAqIGEyMiAtIGEwMiAqIGEyMDtcbiAgb3V0WzVdID0gYTAyICogYTEwIC0gYTAwICogYTEyO1xuICBvdXRbNl0gPSBhMTAgKiBhMjEgLSBhMTEgKiBhMjA7XG4gIG91dFs3XSA9IGEwMSAqIGEyMCAtIGEwMCAqIGEyMTtcbiAgb3V0WzhdID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlcm1pbmFudChhKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl07XG4gIHZhciBhMTAgPSBhWzNdLFxuICAgICAgYTExID0gYVs0XSxcbiAgICAgIGExMiA9IGFbNV07XG4gIHZhciBhMjAgPSBhWzZdLFxuICAgICAgYTIxID0gYVs3XSxcbiAgICAgIGEyMiA9IGFbOF07XG4gIHJldHVybiBhMDAgKiAoYTIyICogYTExIC0gYTEyICogYTIxKSArIGEwMSAqICgtYTIyICogYTEwICsgYTEyICogYTIwKSArIGEwMiAqIChhMjEgKiBhMTAgLSBhMTEgKiBhMjApO1xufVxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQzJ3NcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXTtcbiAgdmFyIGExMCA9IGFbM10sXG4gICAgICBhMTEgPSBhWzRdLFxuICAgICAgYTEyID0gYVs1XTtcbiAgdmFyIGEyMCA9IGFbNl0sXG4gICAgICBhMjEgPSBhWzddLFxuICAgICAgYTIyID0gYVs4XTtcbiAgdmFyIGIwMCA9IGJbMF0sXG4gICAgICBiMDEgPSBiWzFdLFxuICAgICAgYjAyID0gYlsyXTtcbiAgdmFyIGIxMCA9IGJbM10sXG4gICAgICBiMTEgPSBiWzRdLFxuICAgICAgYjEyID0gYls1XTtcbiAgdmFyIGIyMCA9IGJbNl0sXG4gICAgICBiMjEgPSBiWzddLFxuICAgICAgYjIyID0gYls4XTtcbiAgb3V0WzBdID0gYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwO1xuICBvdXRbMV0gPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTEgKyBiMDIgKiBhMjE7XG4gIG91dFsyXSA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcbiAgb3V0WzNdID0gYjEwICogYTAwICsgYjExICogYTEwICsgYjEyICogYTIwO1xuICBvdXRbNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XG4gIG91dFs1XSA9IGIxMCAqIGEwMiArIGIxMSAqIGExMiArIGIxMiAqIGEyMjtcbiAgb3V0WzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwO1xuICBvdXRbN10gPSBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBiMjIgKiBhMjE7XG4gIG91dFs4XSA9IGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogVHJhbnNsYXRlIGEgbWF0MyBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShvdXQsIGEsIHYpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXSxcbiAgICAgIGExMCA9IGFbM10sXG4gICAgICBhMTEgPSBhWzRdLFxuICAgICAgYTEyID0gYVs1XSxcbiAgICAgIGEyMCA9IGFbNl0sXG4gICAgICBhMjEgPSBhWzddLFxuICAgICAgYTIyID0gYVs4XSxcbiAgICAgIHggPSB2WzBdLFxuICAgICAgeSA9IHZbMV07XG4gIG91dFswXSA9IGEwMDtcbiAgb3V0WzFdID0gYTAxO1xuICBvdXRbMl0gPSBhMDI7XG4gIG91dFszXSA9IGExMDtcbiAgb3V0WzRdID0gYTExO1xuICBvdXRbNV0gPSBhMTI7XG4gIG91dFs2XSA9IHggKiBhMDAgKyB5ICogYTEwICsgYTIwO1xuICBvdXRbN10gPSB4ICogYTAxICsgeSAqIGExMSArIGEyMTtcbiAgb3V0WzhdID0geCAqIGEwMiArIHkgKiBhMTIgKyBhMjI7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQzIGJ5IHRoZSBnaXZlbiBhbmdsZVxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlKG91dCwgYSwgcmFkKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl0sXG4gICAgICBhMTAgPSBhWzNdLFxuICAgICAgYTExID0gYVs0XSxcbiAgICAgIGExMiA9IGFbNV0sXG4gICAgICBhMjAgPSBhWzZdLFxuICAgICAgYTIxID0gYVs3XSxcbiAgICAgIGEyMiA9IGFbOF0sXG4gICAgICBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICBvdXRbMF0gPSBjICogYTAwICsgcyAqIGExMDtcbiAgb3V0WzFdID0gYyAqIGEwMSArIHMgKiBhMTE7XG4gIG91dFsyXSA9IGMgKiBhMDIgKyBzICogYTEyO1xuICBvdXRbM10gPSBjICogYTEwIC0gcyAqIGEwMDtcbiAgb3V0WzRdID0gYyAqIGExMSAtIHMgKiBhMDE7XG4gIG91dFs1XSA9IGMgKiBhMTIgLSBzICogYTAyO1xuICBvdXRbNl0gPSBhMjA7XG4gIG91dFs3XSA9IGEyMTtcbiAgb3V0WzhdID0gYTIyO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDMgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzJcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgdikge1xuICB2YXIgeCA9IHZbMF0sXG4gICAgICB5ID0gdlsxXTtcbiAgb3V0WzBdID0geCAqIGFbMF07XG4gIG91dFsxXSA9IHggKiBhWzFdO1xuICBvdXRbMl0gPSB4ICogYVsyXTtcbiAgb3V0WzNdID0geSAqIGFbM107XG4gIG91dFs0XSA9IHkgKiBhWzRdO1xuICBvdXRbNV0gPSB5ICogYVs1XTtcbiAgb3V0WzZdID0gYVs2XTtcbiAgb3V0WzddID0gYVs3XTtcbiAgb3V0WzhdID0gYVs4XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHRyYW5zbGF0aW9uXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0My5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQzLnRyYW5zbGF0ZShkZXN0LCBkZXN0LCB2ZWMpO1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVHJhbnNsYXRpb24ob3V0LCB2KSB7XG4gIG91dFswXSA9IDE7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDE7XG4gIG91dFs1XSA9IDA7XG4gIG91dFs2XSA9IHZbMF07XG4gIG91dFs3XSA9IHZbMV07XG4gIG91dFs4XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIGdpdmVuIGFuZ2xlXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0My5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQzLnJvdGF0ZShkZXN0LCBkZXN0LCByYWQpO1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvbihvdXQsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgb3V0WzBdID0gYztcbiAgb3V0WzFdID0gcztcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gLXM7XG4gIG91dFs0XSA9IGM7XG4gIG91dFs1XSA9IDA7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHZlY3RvciBzY2FsaW5nXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0My5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQzLnNjYWxlKGRlc3QsIGRlc3QsIHZlYyk7XG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IHYgU2NhbGluZyB2ZWN0b3JcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVNjYWxpbmcob3V0LCB2KSB7XG4gIG91dFswXSA9IHZbMF07XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHZbMV07XG4gIG91dFs1XSA9IDA7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIGZyb20gYSBtYXQyZCBpbnRvIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgdGhlIG1hdHJpeCB0byBjb3B5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKiovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tTWF0MmQob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IGFbMl07XG4gIG91dFs0XSA9IGFbM107XG4gIG91dFs1XSA9IDA7XG4gIG91dFs2XSA9IGFbNF07XG4gIG91dFs3XSA9IGFbNV07XG4gIG91dFs4XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgYSAzeDMgbWF0cml4IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBRdWF0ZXJuaW9uIHRvIGNyZWF0ZSBtYXRyaXggZnJvbVxuICpcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVF1YXQob3V0LCBxKSB7XG4gIHZhciB4ID0gcVswXSxcbiAgICAgIHkgPSBxWzFdLFxuICAgICAgeiA9IHFbMl0sXG4gICAgICB3ID0gcVszXTtcbiAgdmFyIHgyID0geCArIHg7XG4gIHZhciB5MiA9IHkgKyB5O1xuICB2YXIgejIgPSB6ICsgejtcbiAgdmFyIHh4ID0geCAqIHgyO1xuICB2YXIgeXggPSB5ICogeDI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHp4ID0geiAqIHgyO1xuICB2YXIgenkgPSB6ICogeTI7XG4gIHZhciB6eiA9IHogKiB6MjtcbiAgdmFyIHd4ID0gdyAqIHgyO1xuICB2YXIgd3kgPSB3ICogeTI7XG4gIHZhciB3eiA9IHcgKiB6MjtcbiAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gIG91dFszXSA9IHl4IC0gd3o7XG4gIG91dFs2XSA9IHp4ICsgd3k7XG4gIG91dFsxXSA9IHl4ICsgd3o7XG4gIG91dFs0XSA9IDEgLSB4eCAtIHp6O1xuICBvdXRbN10gPSB6eSAtIHd4O1xuICBvdXRbMl0gPSB6eCAtIHd5O1xuICBvdXRbNV0gPSB6eSArIHd4O1xuICBvdXRbOF0gPSAxIC0geHggLSB5eTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyBhIDN4MyBub3JtYWwgbWF0cml4ICh0cmFuc3Bvc2UgaW52ZXJzZSkgZnJvbSB0aGUgNHg0IG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIE1hdDQgdG8gZGVyaXZlIHRoZSBub3JtYWwgbWF0cml4IGZyb21cbiAqXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbEZyb21NYXQ0KG91dCwgYSkge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdLFxuICAgICAgYTAzID0gYVszXTtcbiAgdmFyIGExMCA9IGFbNF0sXG4gICAgICBhMTEgPSBhWzVdLFxuICAgICAgYTEyID0gYVs2XSxcbiAgICAgIGExMyA9IGFbN107XG4gIHZhciBhMjAgPSBhWzhdLFxuICAgICAgYTIxID0gYVs5XSxcbiAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgYTIzID0gYVsxMV07XG4gIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgYTMyID0gYVsxNF0sXG4gICAgICBhMzMgPSBhWzE1XTtcbiAgdmFyIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgdmFyIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcbiAgdmFyIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgdmFyIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgdmFyIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcbiAgdmFyIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgdmFyIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcbiAgdmFyIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcbiAgdmFyIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgdmFyIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgdmFyIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcbiAgdmFyIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjsgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuXG4gIHZhciBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG5cbiAgaWYgKCFkZXQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGRldCA9IDEuMCAvIGRldDtcbiAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gIG91dFsxXSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICBvdXRbMl0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcbiAgb3V0WzNdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gIG91dFs0XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICBvdXRbNV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgb3V0WzZdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gIG91dFs3XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICBvdXRbOF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogR2VuZXJhdGVzIGEgMkQgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHlvdXIgZ2wgY29udGV4dFxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCBIZWlnaHQgb2YgZ2wgY29udGV4dFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0aW9uKG91dCwgd2lkdGgsIGhlaWdodCkge1xuICBvdXRbMF0gPSAyIC8gd2lkdGg7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IC0yIC8gaGVpZ2h0O1xuICBvdXRbNV0gPSAwO1xuICBvdXRbNl0gPSAtMTtcbiAgb3V0WzddID0gMTtcbiAgb3V0WzhdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHIoYSkge1xuICByZXR1cm4gXCJtYXQzKFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIsIFwiICsgYVszXSArIFwiLCBcIiArIGFbNF0gKyBcIiwgXCIgKyBhWzVdICsgXCIsIFwiICsgYVs2XSArIFwiLCBcIiArIGFbN10gKyBcIiwgXCIgKyBhWzhdICsgXCIpXCI7XG59XG4vKipcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQzXG4gKlxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb2IoYSkge1xuICByZXR1cm4gTWF0aC5oeXBvdChhWzBdLCBhWzFdLCBhWzJdLCBhWzNdLCBhWzRdLCBhWzVdLCBhWzZdLCBhWzddLCBhWzhdKTtcbn1cbi8qKlxuICogQWRkcyB0d28gbWF0MydzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgb3V0WzRdID0gYVs0XSArIGJbNF07XG4gIG91dFs1XSA9IGFbNV0gKyBiWzVdO1xuICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgb3V0WzddID0gYVs3XSArIGJbN107XG4gIG91dFs4XSA9IGFbOF0gKyBiWzhdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgb3V0WzRdID0gYVs0XSAtIGJbNF07XG4gIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICBvdXRbNl0gPSBhWzZdIC0gYls2XTtcbiAgb3V0WzddID0gYVs3XSAtIGJbN107XG4gIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNdWx0aXBseSBlYWNoIGVsZW1lbnQgb2YgdGhlIG1hdHJpeCBieSBhIHNjYWxhci5cbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSBtYXRyaXgncyBlbGVtZW50cyBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseVNjYWxhcihvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGI7XG4gIG91dFsxXSA9IGFbMV0gKiBiO1xuICBvdXRbMl0gPSBhWzJdICogYjtcbiAgb3V0WzNdID0gYVszXSAqIGI7XG4gIG91dFs0XSA9IGFbNF0gKiBiO1xuICBvdXRbNV0gPSBhWzVdICogYjtcbiAgb3V0WzZdID0gYVs2XSAqIGI7XG4gIG91dFs3XSA9IGFbN10gKiBiO1xuICBvdXRbOF0gPSBhWzhdICogYjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQWRkcyB0d28gbWF0MydzIGFmdGVyIG11bHRpcGx5aW5nIGVhY2ggZWxlbWVudCBvZiB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWUuXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIncyBlbGVtZW50cyBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgb3V0WzNdID0gYVszXSArIGJbM10gKiBzY2FsZTtcbiAgb3V0WzRdID0gYVs0XSArIGJbNF0gKiBzY2FsZTtcbiAgb3V0WzVdID0gYVs1XSArIGJbNV0gKiBzY2FsZTtcbiAgb3V0WzZdID0gYVs2XSArIGJbNl0gKiBzY2FsZTtcbiAgb3V0WzddID0gYVs3XSArIGJbN10gKiBzY2FsZTtcbiAgb3V0WzhdID0gYVs4XSArIGJbOF0gKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXhhY3RFcXVhbHMoYSwgYikge1xuICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXSAmJiBhWzRdID09PSBiWzRdICYmIGFbNV0gPT09IGJbNV0gJiYgYVs2XSA9PT0gYls2XSAmJiBhWzddID09PSBiWzddICYmIGFbOF0gPT09IGJbOF07XG59XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIG1hdHJpY2VzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSBUaGUgZmlyc3QgbWF0cml4LlxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGIgVGhlIHNlY29uZCBtYXRyaXguXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHZhciBhMCA9IGFbMF0sXG4gICAgICBhMSA9IGFbMV0sXG4gICAgICBhMiA9IGFbMl0sXG4gICAgICBhMyA9IGFbM10sXG4gICAgICBhNCA9IGFbNF0sXG4gICAgICBhNSA9IGFbNV0sXG4gICAgICBhNiA9IGFbNl0sXG4gICAgICBhNyA9IGFbN10sXG4gICAgICBhOCA9IGFbOF07XG4gIHZhciBiMCA9IGJbMF0sXG4gICAgICBiMSA9IGJbMV0sXG4gICAgICBiMiA9IGJbMl0sXG4gICAgICBiMyA9IGJbM10sXG4gICAgICBiNCA9IGJbNF0sXG4gICAgICBiNSA9IGJbNV0sXG4gICAgICBiNiA9IGJbNl0sXG4gICAgICBiNyA9IGJbN10sXG4gICAgICBiOCA9IGJbOF07XG4gIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJiBNYXRoLmFicyhhMyAtIGIzKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSkgJiYgTWF0aC5hYnMoYTQgLSBiNCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTQpLCBNYXRoLmFicyhiNCkpICYmIE1hdGguYWJzKGE1IC0gYjUpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE1KSwgTWF0aC5hYnMoYjUpKSAmJiBNYXRoLmFicyhhNiAtIGI2KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNiksIE1hdGguYWJzKGI2KSkgJiYgTWF0aC5hYnMoYTcgLSBiNykgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTcpLCBNYXRoLmFicyhiNykpICYmIE1hdGguYWJzKGE4IC0gYjgpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE4KSwgTWF0aC5hYnMoYjgpKTtcbn1cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQzLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBtdWwgPSBtdWx0aXBseTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQzLnN1YnRyYWN0fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzdWIgPSBzdWJ0cmFjdDsiLAogICJpbXBvcnQgKiBhcyBnbE1hdHJpeCBmcm9tIFwiLi9jb21tb24uanNcIjtcbi8qKlxuICogNHg0IE1hdHJpeDxicj5Gb3JtYXQ6IGNvbHVtbi1tYWpvciwgd2hlbiB0eXBlZCBvdXQgaXQgbG9va3MgbGlrZSByb3ctbWFqb3I8YnI+VGhlIG1hdHJpY2VzIGFyZSBiZWluZyBwb3N0IG11bHRpcGxpZWQuXG4gKiBAbW9kdWxlIG1hdDRcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0NFxuICpcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDE2KTtcblxuICBpZiAoZ2xNYXRyaXguQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gIH1cblxuICBvdXRbMF0gPSAxO1xuICBvdXRbNV0gPSAxO1xuICBvdXRbMTBdID0gMTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbWF0NCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIG1hdHJpeCB0byBjbG9uZVxuICogQHJldHVybnMge21hdDR9IGEgbmV3IDR4NCBtYXRyaXhcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUoYSkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMTYpO1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICBvdXRbM10gPSBhWzNdO1xuICBvdXRbNF0gPSBhWzRdO1xuICBvdXRbNV0gPSBhWzVdO1xuICBvdXRbNl0gPSBhWzZdO1xuICBvdXRbN10gPSBhWzddO1xuICBvdXRbOF0gPSBhWzhdO1xuICBvdXRbOV0gPSBhWzldO1xuICBvdXRbMTBdID0gYVsxMF07XG4gIG91dFsxMV0gPSBhWzExXTtcbiAgb3V0WzEyXSA9IGFbMTJdO1xuICBvdXRbMTNdID0gYVsxM107XG4gIG91dFsxNF0gPSBhWzE0XTtcbiAgb3V0WzE1XSA9IGFbMTVdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0NCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IGFbMl07XG4gIG91dFszXSA9IGFbM107XG4gIG91dFs0XSA9IGFbNF07XG4gIG91dFs1XSA9IGFbNV07XG4gIG91dFs2XSA9IGFbNl07XG4gIG91dFs3XSA9IGFbN107XG4gIG91dFs4XSA9IGFbOF07XG4gIG91dFs5XSA9IGFbOV07XG4gIG91dFsxMF0gPSBhWzEwXTtcbiAgb3V0WzExXSA9IGFbMTFdO1xuICBvdXRbMTJdID0gYVsxMl07XG4gIG91dFsxM10gPSBhWzEzXTtcbiAgb3V0WzE0XSA9IGFbMTRdO1xuICBvdXRbMTVdID0gYVsxNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZSBhIG5ldyBtYXQ0IHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDAgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDIgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDMgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMylcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTEgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggNSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTIgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggNilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTMgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggNylcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjAgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggOClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjEgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggOSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTApXG4gKiBAcGFyYW0ge051bWJlcn0gbTIzIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDMgcG9zaXRpb24gKGluZGV4IDExKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMCBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAxMilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzEgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMTMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTMyIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDIgcG9zaXRpb24gKGluZGV4IDE0KVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMyBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxNSlcbiAqIEByZXR1cm5zIHttYXQ0fSBBIG5ldyBtYXQ0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21WYWx1ZXMobTAwLCBtMDEsIG0wMiwgbTAzLCBtMTAsIG0xMSwgbTEyLCBtMTMsIG0yMCwgbTIxLCBtMjIsIG0yMywgbTMwLCBtMzEsIG0zMiwgbTMzKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG4gIG91dFswXSA9IG0wMDtcbiAgb3V0WzFdID0gbTAxO1xuICBvdXRbMl0gPSBtMDI7XG4gIG91dFszXSA9IG0wMztcbiAgb3V0WzRdID0gbTEwO1xuICBvdXRbNV0gPSBtMTE7XG4gIG91dFs2XSA9IG0xMjtcbiAgb3V0WzddID0gbTEzO1xuICBvdXRbOF0gPSBtMjA7XG4gIG91dFs5XSA9IG0yMTtcbiAgb3V0WzEwXSA9IG0yMjtcbiAgb3V0WzExXSA9IG0yMztcbiAgb3V0WzEyXSA9IG0zMDtcbiAgb3V0WzEzXSA9IG0zMTtcbiAgb3V0WzE0XSA9IG0zMjtcbiAgb3V0WzE1XSA9IG0zMztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgbWF0NCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDAgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDIgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDMgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMylcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTEgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggNSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTIgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggNilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTMgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggNylcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjAgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggOClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjEgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggOSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTApXG4gKiBAcGFyYW0ge051bWJlcn0gbTIzIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDMgcG9zaXRpb24gKGluZGV4IDExKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMCBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAxMilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzEgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMTMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTMyIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDIgcG9zaXRpb24gKGluZGV4IDE0KVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMyBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxNSlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0KG91dCwgbTAwLCBtMDEsIG0wMiwgbTAzLCBtMTAsIG0xMSwgbTEyLCBtMTMsIG0yMCwgbTIxLCBtMjIsIG0yMywgbTMwLCBtMzEsIG0zMiwgbTMzKSB7XG4gIG91dFswXSA9IG0wMDtcbiAgb3V0WzFdID0gbTAxO1xuICBvdXRbMl0gPSBtMDI7XG4gIG91dFszXSA9IG0wMztcbiAgb3V0WzRdID0gbTEwO1xuICBvdXRbNV0gPSBtMTE7XG4gIG91dFs2XSA9IG0xMjtcbiAgb3V0WzddID0gbTEzO1xuICBvdXRbOF0gPSBtMjA7XG4gIG91dFs5XSA9IG0yMTtcbiAgb3V0WzEwXSA9IG0yMjtcbiAgb3V0WzExXSA9IG0yMztcbiAgb3V0WzEyXSA9IG0zMDtcbiAgb3V0WzEzXSA9IG0zMTtcbiAgb3V0WzE0XSA9IG0zMjtcbiAgb3V0WzE1XSA9IG0zMztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU2V0IGEgbWF0NCB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpdHkob3V0KSB7XG4gIG91dFswXSA9IDE7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IDE7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMF0gPSAxO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc3Bvc2Uob3V0LCBhKSB7XG4gIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgaWYgKG91dCA9PT0gYSkge1xuICAgIHZhciBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMDMgPSBhWzNdO1xuICAgIHZhciBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddO1xuICAgIHZhciBhMjMgPSBhWzExXTtcbiAgICBvdXRbMV0gPSBhWzRdO1xuICAgIG91dFsyXSA9IGFbOF07XG4gICAgb3V0WzNdID0gYVsxMl07XG4gICAgb3V0WzRdID0gYTAxO1xuICAgIG91dFs2XSA9IGFbOV07XG4gICAgb3V0WzddID0gYVsxM107XG4gICAgb3V0WzhdID0gYTAyO1xuICAgIG91dFs5XSA9IGExMjtcbiAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgb3V0WzEyXSA9IGEwMztcbiAgICBvdXRbMTNdID0gYTEzO1xuICAgIG91dFsxNF0gPSBhMjM7XG4gIH0gZWxzZSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzRdO1xuICAgIG91dFsyXSA9IGFbOF07XG4gICAgb3V0WzNdID0gYVsxMl07XG4gICAgb3V0WzRdID0gYVsxXTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbOV07XG4gICAgb3V0WzddID0gYVsxM107XG4gICAgb3V0WzhdID0gYVsyXTtcbiAgICBvdXRbOV0gPSBhWzZdO1xuICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgb3V0WzEyXSA9IGFbM107XG4gICAgb3V0WzEzXSA9IGFbN107XG4gICAgb3V0WzE0XSA9IGFbMTFdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEludmVydHMgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVydChvdXQsIGEpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXSxcbiAgICAgIGEwMyA9IGFbM107XG4gIHZhciBhMTAgPSBhWzRdLFxuICAgICAgYTExID0gYVs1XSxcbiAgICAgIGExMiA9IGFbNl0sXG4gICAgICBhMTMgPSBhWzddO1xuICB2YXIgYTIwID0gYVs4XSxcbiAgICAgIGEyMSA9IGFbOV0sXG4gICAgICBhMjIgPSBhWzEwXSxcbiAgICAgIGEyMyA9IGFbMTFdO1xuICB2YXIgYTMwID0gYVsxMl0sXG4gICAgICBhMzEgPSBhWzEzXSxcbiAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgYTMzID0gYVsxNV07XG4gIHZhciBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gIHZhciBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gIHZhciBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gIHZhciBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gIHZhciBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gIHZhciBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gIHZhciBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gIHZhciBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gIHZhciBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gIHZhciBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gIHZhciBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gIHZhciBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7IC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcblxuICB2YXIgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gIGlmICghZGV0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBkZXQgPSAxLjAgLyBkZXQ7XG4gIG91dFswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICBvdXRbMV0gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgb3V0WzJdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gIG91dFszXSA9IChhMjIgKiBiMDQgLSBhMjEgKiBiMDUgLSBhMjMgKiBiMDMpICogZGV0O1xuICBvdXRbNF0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgb3V0WzVdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gIG91dFs2XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICBvdXRbN10gPSAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAqIGRldDtcbiAgb3V0WzhdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gIG91dFs5XSA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xuICBvdXRbMTBdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gIG91dFsxMV0gPSAoYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwKSAqIGRldDtcbiAgb3V0WzEyXSA9IChhMTEgKiBiMDcgLSBhMTAgKiBiMDkgLSBhMTIgKiBiMDYpICogZGV0O1xuICBvdXRbMTNdID0gKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQ7XG4gIG91dFsxNF0gPSAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldDtcbiAgb3V0WzE1XSA9IChhMjAgKiBiMDMgLSBhMjEgKiBiMDEgKyBhMjIgKiBiMDApICogZGV0O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRqb2ludChvdXQsIGEpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXSxcbiAgICAgIGEwMyA9IGFbM107XG4gIHZhciBhMTAgPSBhWzRdLFxuICAgICAgYTExID0gYVs1XSxcbiAgICAgIGExMiA9IGFbNl0sXG4gICAgICBhMTMgPSBhWzddO1xuICB2YXIgYTIwID0gYVs4XSxcbiAgICAgIGEyMSA9IGFbOV0sXG4gICAgICBhMjIgPSBhWzEwXSxcbiAgICAgIGEyMyA9IGFbMTFdO1xuICB2YXIgYTMwID0gYVsxMl0sXG4gICAgICBhMzEgPSBhWzEzXSxcbiAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgYTMzID0gYVsxNV07XG4gIG91dFswXSA9IGExMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKTtcbiAgb3V0WzFdID0gLShhMDEgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikpO1xuICBvdXRbMl0gPSBhMDEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMik7XG4gIG91dFszXSA9IC0oYTAxICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTEgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMSAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgb3V0WzRdID0gLShhMTAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpICsgYTMwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikpO1xuICBvdXRbNV0gPSBhMDAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMik7XG4gIG91dFs2XSA9IC0oYTAwICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgLSBhMTAgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgb3V0WzddID0gYTAwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpO1xuICBvdXRbOF0gPSBhMTAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSk7XG4gIG91dFs5XSA9IC0oYTAwICogKGEyMSAqIGEzMyAtIGEyMyAqIGEzMSkgLSBhMjAgKiAoYTAxICogYTMzIC0gYTAzICogYTMxKSArIGEzMCAqIChhMDEgKiBhMjMgLSBhMDMgKiBhMjEpKTtcbiAgb3V0WzEwXSA9IGEwMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpIC0gYTEwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTEzIC0gYTAzICogYTExKTtcbiAgb3V0WzExXSA9IC0oYTAwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkgLSBhMTAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSArIGEyMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgb3V0WzEyXSA9IC0oYTEwICogKGEyMSAqIGEzMiAtIGEyMiAqIGEzMSkgLSBhMjAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSArIGEzMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpKTtcbiAgb3V0WzEzXSA9IGEwMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMiAtIGEwMiAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIyIC0gYTAyICogYTIxKTtcbiAgb3V0WzE0XSA9IC0oYTAwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTIgLSBhMDIgKiBhMTEpKTtcbiAgb3V0WzE1XSA9IGEwMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZXJtaW5hbnQoYSkge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdLFxuICAgICAgYTAzID0gYVszXTtcbiAgdmFyIGExMCA9IGFbNF0sXG4gICAgICBhMTEgPSBhWzVdLFxuICAgICAgYTEyID0gYVs2XSxcbiAgICAgIGExMyA9IGFbN107XG4gIHZhciBhMjAgPSBhWzhdLFxuICAgICAgYTIxID0gYVs5XSxcbiAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgYTIzID0gYVsxMV07XG4gIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgYTMyID0gYVsxNF0sXG4gICAgICBhMzMgPSBhWzE1XTtcbiAgdmFyIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgdmFyIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcbiAgdmFyIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgdmFyIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgdmFyIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcbiAgdmFyIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgdmFyIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcbiAgdmFyIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcbiAgdmFyIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgdmFyIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgdmFyIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcbiAgdmFyIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjsgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuXG4gIHJldHVybiBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG59XG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl0sXG4gICAgICBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XSxcbiAgICAgIGExMSA9IGFbNV0sXG4gICAgICBhMTIgPSBhWzZdLFxuICAgICAgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICBhMjEgPSBhWzldLFxuICAgICAgYTIyID0gYVsxMF0sXG4gICAgICBhMjMgPSBhWzExXTtcbiAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgYTMxID0gYVsxM10sXG4gICAgICBhMzIgPSBhWzE0XSxcbiAgICAgIGEzMyA9IGFbMTVdOyAvLyBDYWNoZSBvbmx5IHRoZSBjdXJyZW50IGxpbmUgb2YgdGhlIHNlY29uZCBtYXRyaXhcblxuICB2YXIgYjAgPSBiWzBdLFxuICAgICAgYjEgPSBiWzFdLFxuICAgICAgYjIgPSBiWzJdLFxuICAgICAgYjMgPSBiWzNdO1xuICBvdXRbMF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgb3V0WzFdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gIG91dFsyXSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICBvdXRbM10gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgYjAgPSBiWzRdO1xuICBiMSA9IGJbNV07XG4gIGIyID0gYls2XTtcbiAgYjMgPSBiWzddO1xuICBvdXRbNF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgb3V0WzVdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gIG91dFs2XSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICBvdXRbN10gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgYjAgPSBiWzhdO1xuICBiMSA9IGJbOV07XG4gIGIyID0gYlsxMF07XG4gIGIzID0gYlsxMV07XG4gIG91dFs4XSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICBvdXRbOV0gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgb3V0WzEwXSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICBvdXRbMTFdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gIGIwID0gYlsxMl07XG4gIGIxID0gYlsxM107XG4gIGIyID0gYlsxNF07XG4gIGIzID0gYlsxNV07XG4gIG91dFsxMl0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgb3V0WzEzXSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICBvdXRbMTRdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gIG91dFsxNV0gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogVHJhbnNsYXRlIGEgbWF0NCBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShvdXQsIGEsIHYpIHtcbiAgdmFyIHggPSB2WzBdLFxuICAgICAgeSA9IHZbMV0sXG4gICAgICB6ID0gdlsyXTtcbiAgdmFyIGEwMCwgYTAxLCBhMDIsIGEwMztcbiAgdmFyIGExMCwgYTExLCBhMTIsIGExMztcbiAgdmFyIGEyMCwgYTIxLCBhMjIsIGEyMztcblxuICBpZiAoYSA9PT0gb3V0KSB7XG4gICAgb3V0WzEyXSA9IGFbMF0gKiB4ICsgYVs0XSAqIHkgKyBhWzhdICogeiArIGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzFdICogeCArIGFbNV0gKiB5ICsgYVs5XSAqIHogKyBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsyXSAqIHggKyBhWzZdICogeSArIGFbMTBdICogeiArIGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzNdICogeCArIGFbN10gKiB5ICsgYVsxMV0gKiB6ICsgYVsxNV07XG4gIH0gZWxzZSB7XG4gICAgYTAwID0gYVswXTtcbiAgICBhMDEgPSBhWzFdO1xuICAgIGEwMiA9IGFbMl07XG4gICAgYTAzID0gYVszXTtcbiAgICBhMTAgPSBhWzRdO1xuICAgIGExMSA9IGFbNV07XG4gICAgYTEyID0gYVs2XTtcbiAgICBhMTMgPSBhWzddO1xuICAgIGEyMCA9IGFbOF07XG4gICAgYTIxID0gYVs5XTtcbiAgICBhMjIgPSBhWzEwXTtcbiAgICBhMjMgPSBhWzExXTtcbiAgICBvdXRbMF0gPSBhMDA7XG4gICAgb3V0WzFdID0gYTAxO1xuICAgIG91dFsyXSA9IGEwMjtcbiAgICBvdXRbM10gPSBhMDM7XG4gICAgb3V0WzRdID0gYTEwO1xuICAgIG91dFs1XSA9IGExMTtcbiAgICBvdXRbNl0gPSBhMTI7XG4gICAgb3V0WzddID0gYTEzO1xuICAgIG91dFs4XSA9IGEyMDtcbiAgICBvdXRbOV0gPSBhMjE7XG4gICAgb3V0WzEwXSA9IGEyMjtcbiAgICBvdXRbMTFdID0gYTIzO1xuICAgIG91dFsxMl0gPSBhMDAgKiB4ICsgYTEwICogeSArIGEyMCAqIHogKyBhWzEyXTtcbiAgICBvdXRbMTNdID0gYTAxICogeCArIGExMSAqIHkgKyBhMjEgKiB6ICsgYVsxM107XG4gICAgb3V0WzE0XSA9IGEwMiAqIHggKyBhMTIgKiB5ICsgYTIyICogeiArIGFbMTRdO1xuICAgIG91dFsxNV0gPSBhMDMgKiB4ICsgYTEzICogeSArIGEyMyAqIHogKyBhWzE1XTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNjYWxlcyB0aGUgbWF0NCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMyBub3QgdXNpbmcgdmVjdG9yaXphdGlvblxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKiovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZShvdXQsIGEsIHYpIHtcbiAgdmFyIHggPSB2WzBdLFxuICAgICAgeSA9IHZbMV0sXG4gICAgICB6ID0gdlsyXTtcbiAgb3V0WzBdID0gYVswXSAqIHg7XG4gIG91dFsxXSA9IGFbMV0gKiB4O1xuICBvdXRbMl0gPSBhWzJdICogeDtcbiAgb3V0WzNdID0gYVszXSAqIHg7XG4gIG91dFs0XSA9IGFbNF0gKiB5O1xuICBvdXRbNV0gPSBhWzVdICogeTtcbiAgb3V0WzZdID0gYVs2XSAqIHk7XG4gIG91dFs3XSA9IGFbN10gKiB5O1xuICBvdXRbOF0gPSBhWzhdICogejtcbiAgb3V0WzldID0gYVs5XSAqIHo7XG4gIG91dFsxMF0gPSBhWzEwXSAqIHo7XG4gIG91dFsxMV0gPSBhWzExXSAqIHo7XG4gIG91dFsxMl0gPSBhWzEyXTtcbiAgb3V0WzEzXSA9IGFbMTNdO1xuICBvdXRbMTRdID0gYVsxNF07XG4gIG91dFsxNV0gPSBhWzE1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUm90YXRlcyBhIG1hdDQgYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgZ2l2ZW4gYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBheGlzIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlKG91dCwgYSwgcmFkLCBheGlzKSB7XG4gIHZhciB4ID0gYXhpc1swXSxcbiAgICAgIHkgPSBheGlzWzFdLFxuICAgICAgeiA9IGF4aXNbMl07XG4gIHZhciBsZW4gPSBNYXRoLmh5cG90KHgsIHksIHopO1xuICB2YXIgcywgYywgdDtcbiAgdmFyIGEwMCwgYTAxLCBhMDIsIGEwMztcbiAgdmFyIGExMCwgYTExLCBhMTIsIGExMztcbiAgdmFyIGEyMCwgYTIxLCBhMjIsIGEyMztcbiAgdmFyIGIwMCwgYjAxLCBiMDI7XG4gIHZhciBiMTAsIGIxMSwgYjEyO1xuICB2YXIgYjIwLCBiMjEsIGIyMjtcblxuICBpZiAobGVuIDwgZ2xNYXRyaXguRVBTSUxPTikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGVuID0gMSAvIGxlbjtcbiAgeCAqPSBsZW47XG4gIHkgKj0gbGVuO1xuICB6ICo9IGxlbjtcbiAgcyA9IE1hdGguc2luKHJhZCk7XG4gIGMgPSBNYXRoLmNvcyhyYWQpO1xuICB0ID0gMSAtIGM7XG4gIGEwMCA9IGFbMF07XG4gIGEwMSA9IGFbMV07XG4gIGEwMiA9IGFbMl07XG4gIGEwMyA9IGFbM107XG4gIGExMCA9IGFbNF07XG4gIGExMSA9IGFbNV07XG4gIGExMiA9IGFbNl07XG4gIGExMyA9IGFbN107XG4gIGEyMCA9IGFbOF07XG4gIGEyMSA9IGFbOV07XG4gIGEyMiA9IGFbMTBdO1xuICBhMjMgPSBhWzExXTsgLy8gQ29uc3RydWN0IHRoZSBlbGVtZW50cyBvZiB0aGUgcm90YXRpb24gbWF0cml4XG5cbiAgYjAwID0geCAqIHggKiB0ICsgYztcbiAgYjAxID0geSAqIHggKiB0ICsgeiAqIHM7XG4gIGIwMiA9IHogKiB4ICogdCAtIHkgKiBzO1xuICBiMTAgPSB4ICogeSAqIHQgLSB6ICogcztcbiAgYjExID0geSAqIHkgKiB0ICsgYztcbiAgYjEyID0geiAqIHkgKiB0ICsgeCAqIHM7XG4gIGIyMCA9IHggKiB6ICogdCArIHkgKiBzO1xuICBiMjEgPSB5ICogeiAqIHQgLSB4ICogcztcbiAgYjIyID0geiAqIHogKiB0ICsgYzsgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICBvdXRbMF0gPSBhMDAgKiBiMDAgKyBhMTAgKiBiMDEgKyBhMjAgKiBiMDI7XG4gIG91dFsxXSA9IGEwMSAqIGIwMCArIGExMSAqIGIwMSArIGEyMSAqIGIwMjtcbiAgb3V0WzJdID0gYTAyICogYjAwICsgYTEyICogYjAxICsgYTIyICogYjAyO1xuICBvdXRbM10gPSBhMDMgKiBiMDAgKyBhMTMgKiBiMDEgKyBhMjMgKiBiMDI7XG4gIG91dFs0XSA9IGEwMCAqIGIxMCArIGExMCAqIGIxMSArIGEyMCAqIGIxMjtcbiAgb3V0WzVdID0gYTAxICogYjEwICsgYTExICogYjExICsgYTIxICogYjEyO1xuICBvdXRbNl0gPSBhMDIgKiBiMTAgKyBhMTIgKiBiMTEgKyBhMjIgKiBiMTI7XG4gIG91dFs3XSA9IGEwMyAqIGIxMCArIGExMyAqIGIxMSArIGEyMyAqIGIxMjtcbiAgb3V0WzhdID0gYTAwICogYjIwICsgYTEwICogYjIxICsgYTIwICogYjIyO1xuICBvdXRbOV0gPSBhMDEgKiBiMjAgKyBhMTEgKiBiMjEgKyBhMjEgKiBiMjI7XG4gIG91dFsxMF0gPSBhMDIgKiBiMjAgKyBhMTIgKiBiMjEgKyBhMjIgKiBiMjI7XG4gIG91dFsxMV0gPSBhMDMgKiBiMjAgKyBhMTMgKiBiMjEgKyBhMjMgKiBiMjI7XG5cbiAgaWYgKGEgIT09IG91dCkge1xuICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBYIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVgob3V0LCBhLCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7XG4gIHZhciBhMTAgPSBhWzRdO1xuICB2YXIgYTExID0gYVs1XTtcbiAgdmFyIGExMiA9IGFbNl07XG4gIHZhciBhMTMgPSBhWzddO1xuICB2YXIgYTIwID0gYVs4XTtcbiAgdmFyIGEyMSA9IGFbOV07XG4gIHZhciBhMjIgPSBhWzEwXTtcbiAgdmFyIGEyMyA9IGFbMTFdO1xuXG4gIGlmIChhICE9PSBvdXQpIHtcbiAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gIH0gLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG5cbiAgb3V0WzRdID0gYTEwICogYyArIGEyMCAqIHM7XG4gIG91dFs1XSA9IGExMSAqIGMgKyBhMjEgKiBzO1xuICBvdXRbNl0gPSBhMTIgKiBjICsgYTIyICogcztcbiAgb3V0WzddID0gYTEzICogYyArIGEyMyAqIHM7XG4gIG91dFs4XSA9IGEyMCAqIGMgLSBhMTAgKiBzO1xuICBvdXRbOV0gPSBhMjEgKiBjIC0gYTExICogcztcbiAgb3V0WzEwXSA9IGEyMiAqIGMgLSBhMTIgKiBzO1xuICBvdXRbMTFdID0gYTIzICogYyAtIGExMyAqIHM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWSBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVZKG91dCwgYSwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICB2YXIgYTAwID0gYVswXTtcbiAgdmFyIGEwMSA9IGFbMV07XG4gIHZhciBhMDIgPSBhWzJdO1xuICB2YXIgYTAzID0gYVszXTtcbiAgdmFyIGEyMCA9IGFbOF07XG4gIHZhciBhMjEgPSBhWzldO1xuICB2YXIgYTIyID0gYVsxMF07XG4gIHZhciBhMjMgPSBhWzExXTtcblxuICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICB9IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuXG4gIG91dFswXSA9IGEwMCAqIGMgLSBhMjAgKiBzO1xuICBvdXRbMV0gPSBhMDEgKiBjIC0gYTIxICogcztcbiAgb3V0WzJdID0gYTAyICogYyAtIGEyMiAqIHM7XG4gIG91dFszXSA9IGEwMyAqIGMgLSBhMjMgKiBzO1xuICBvdXRbOF0gPSBhMDAgKiBzICsgYTIwICogYztcbiAgb3V0WzldID0gYTAxICogcyArIGEyMSAqIGM7XG4gIG91dFsxMF0gPSBhMDIgKiBzICsgYTIyICogYztcbiAgb3V0WzExXSA9IGEwMyAqIHMgKyBhMjMgKiBjO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFogYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgdmFyIGEwMCA9IGFbMF07XG4gIHZhciBhMDEgPSBhWzFdO1xuICB2YXIgYTAyID0gYVsyXTtcbiAgdmFyIGEwMyA9IGFbM107XG4gIHZhciBhMTAgPSBhWzRdO1xuICB2YXIgYTExID0gYVs1XTtcbiAgdmFyIGExMiA9IGFbNl07XG4gIHZhciBhMTMgPSBhWzddO1xuXG4gIGlmIChhICE9PSBvdXQpIHtcbiAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgfSAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cblxuICBvdXRbMF0gPSBhMDAgKiBjICsgYTEwICogcztcbiAgb3V0WzFdID0gYTAxICogYyArIGExMSAqIHM7XG4gIG91dFsyXSA9IGEwMiAqIGMgKyBhMTIgKiBzO1xuICBvdXRbM10gPSBhMDMgKiBjICsgYTEzICogcztcbiAgb3V0WzRdID0gYTEwICogYyAtIGEwMCAqIHM7XG4gIG91dFs1XSA9IGExMSAqIGMgLSBhMDEgKiBzO1xuICBvdXRbNl0gPSBhMTIgKiBjIC0gYTAyICogcztcbiAgb3V0WzddID0gYTEzICogYyAtIGEwMyAqIHM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHZlY3RvciB0cmFuc2xhdGlvblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVRyYW5zbGF0aW9uKG91dCwgdikge1xuICBvdXRbMF0gPSAxO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSAxO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gMTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSB2WzBdO1xuICBvdXRbMTNdID0gdlsxXTtcbiAgb3V0WzE0XSA9IHZbMl07XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3Igc2NhbGluZ1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC5zY2FsZShkZXN0LCBkZXN0LCB2ZWMpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFNjYWxpbmcgdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21TY2FsaW5nKG91dCwgdikge1xuICBvdXRbMF0gPSB2WzBdO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSB2WzFdO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gdlsyXTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBnaXZlbiBhbmdsZSBhcm91bmQgYSBnaXZlbiBheGlzXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQ0LnJvdGF0ZShkZXN0LCBkZXN0LCByYWQsIGF4aXMpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvbihvdXQsIHJhZCwgYXhpcykge1xuICB2YXIgeCA9IGF4aXNbMF0sXG4gICAgICB5ID0gYXhpc1sxXSxcbiAgICAgIHogPSBheGlzWzJdO1xuICB2YXIgbGVuID0gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbiAgdmFyIHMsIGMsIHQ7XG5cbiAgaWYgKGxlbiA8IGdsTWF0cml4LkVQU0lMT04pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxlbiA9IDEgLyBsZW47XG4gIHggKj0gbGVuO1xuICB5ICo9IGxlbjtcbiAgeiAqPSBsZW47XG4gIHMgPSBNYXRoLnNpbihyYWQpO1xuICBjID0gTWF0aC5jb3MocmFkKTtcbiAgdCA9IDEgLSBjOyAvLyBQZXJmb3JtIHJvdGF0aW9uLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gIG91dFswXSA9IHggKiB4ICogdCArIGM7XG4gIG91dFsxXSA9IHkgKiB4ICogdCArIHogKiBzO1xuICBvdXRbMl0gPSB6ICogeCAqIHQgLSB5ICogcztcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0geCAqIHkgKiB0IC0geiAqIHM7XG4gIG91dFs1XSA9IHkgKiB5ICogdCArIGM7XG4gIG91dFs2XSA9IHogKiB5ICogdCArIHggKiBzO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB4ICogeiAqIHQgKyB5ICogcztcbiAgb3V0WzldID0geSAqIHogKiB0IC0geCAqIHM7XG4gIG91dFsxMF0gPSB6ICogeiAqIHQgKyBjO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBYIGF4aXNcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQucm90YXRlWChkZXN0LCBkZXN0LCByYWQpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21YUm90YXRpb24ob3V0LCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICBvdXRbMF0gPSAxO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSBjO1xuICBvdXRbNl0gPSBzO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAtcztcbiAgb3V0WzEwXSA9IGM7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpc1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC5yb3RhdGVZKGRlc3QsIGRlc3QsIHJhZCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVlSb3RhdGlvbihvdXQsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTsgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gIG91dFswXSA9IGM7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IC1zO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSAxO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSBzO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gYztcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWiBheGlzXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQ0LnJvdGF0ZVooZGVzdCwgZGVzdCwgcmFkKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tWlJvdGF0aW9uKG91dCwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpOyAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgb3V0WzBdID0gYztcbiAgb3V0WzFdID0gcztcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gLXM7XG4gIG91dFs1XSA9IGM7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMF0gPSAxO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24gYW5kIHZlY3RvciB0cmFuc2xhdGlvblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAqICAgICBsZXQgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24ob3V0LCBxLCB2KSB7XG4gIC8vIFF1YXRlcm5pb24gbWF0aFxuICB2YXIgeCA9IHFbMF0sXG4gICAgICB5ID0gcVsxXSxcbiAgICAgIHogPSBxWzJdLFxuICAgICAgdyA9IHFbM107XG4gIHZhciB4MiA9IHggKyB4O1xuICB2YXIgeTIgPSB5ICsgeTtcbiAgdmFyIHoyID0geiArIHo7XG4gIHZhciB4eCA9IHggKiB4MjtcbiAgdmFyIHh5ID0geCAqIHkyO1xuICB2YXIgeHogPSB4ICogejI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHl6ID0geSAqIHoyO1xuICB2YXIgenogPSB6ICogejI7XG4gIHZhciB3eCA9IHcgKiB4MjtcbiAgdmFyIHd5ID0gdyAqIHkyO1xuICB2YXIgd3ogPSB3ICogejI7XG4gIG91dFswXSA9IDEgLSAoeXkgKyB6eik7XG4gIG91dFsxXSA9IHh5ICsgd3o7XG4gIG91dFsyXSA9IHh6IC0gd3k7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHh5IC0gd3o7XG4gIG91dFs1XSA9IDEgLSAoeHggKyB6eik7XG4gIG91dFs2XSA9IHl6ICsgd3g7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IHh6ICsgd3k7XG4gIG91dFs5XSA9IHl6IC0gd3g7XG4gIG91dFsxMF0gPSAxIC0gKHh4ICsgeXkpO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IHZbMF07XG4gIG91dFsxM10gPSB2WzFdO1xuICBvdXRbMTRdID0gdlsyXTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbWF0NCBmcm9tIGEgZHVhbCBxdWF0LlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IE1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIER1YWwgUXVhdGVybmlvblxuICogQHJldHVybnMge21hdDR9IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVF1YXQyKG91dCwgYSkge1xuICB2YXIgdHJhbnNsYXRpb24gPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgdmFyIGJ4ID0gLWFbMF0sXG4gICAgICBieSA9IC1hWzFdLFxuICAgICAgYnogPSAtYVsyXSxcbiAgICAgIGJ3ID0gYVszXSxcbiAgICAgIGF4ID0gYVs0XSxcbiAgICAgIGF5ID0gYVs1XSxcbiAgICAgIGF6ID0gYVs2XSxcbiAgICAgIGF3ID0gYVs3XTtcbiAgdmFyIG1hZ25pdHVkZSA9IGJ4ICogYnggKyBieSAqIGJ5ICsgYnogKiBieiArIGJ3ICogYnc7IC8vT25seSBzY2FsZSBpZiBpdCBtYWtlcyBzZW5zZVxuXG4gIGlmIChtYWduaXR1ZGUgPiAwKSB7XG4gICAgdHJhbnNsYXRpb25bMF0gPSAoYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieSkgKiAyIC8gbWFnbml0dWRlO1xuICAgIHRyYW5zbGF0aW9uWzFdID0gKGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYnopICogMiAvIG1hZ25pdHVkZTtcbiAgICB0cmFuc2xhdGlvblsyXSA9IChheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4KSAqIDIgLyBtYWduaXR1ZGU7XG4gIH0gZWxzZSB7XG4gICAgdHJhbnNsYXRpb25bMF0gPSAoYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieSkgKiAyO1xuICAgIHRyYW5zbGF0aW9uWzFdID0gKGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYnopICogMjtcbiAgICB0cmFuc2xhdGlvblsyXSA9IChheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4KSAqIDI7XG4gIH1cblxuICBmcm9tUm90YXRpb25UcmFuc2xhdGlvbihvdXQsIGEsIHRyYW5zbGF0aW9uKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgdHJhbnNsYXRpb24gdmVjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uXG4gKiAgbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uLFxuICogIHRoZSByZXR1cm5lZCB2ZWN0b3Igd2lsbCBiZSB0aGUgc2FtZSBhcyB0aGUgdHJhbnNsYXRpb24gdmVjdG9yXG4gKiAgb3JpZ2luYWxseSBzdXBwbGllZC5cbiAqIEBwYXJhbSAge3ZlYzN9IG91dCBWZWN0b3IgdG8gcmVjZWl2ZSB0cmFuc2xhdGlvbiBjb21wb25lbnRcbiAqIEBwYXJhbSAge1JlYWRvbmx5TWF0NH0gbWF0IE1hdHJpeCB0byBiZSBkZWNvbXBvc2VkIChpbnB1dClcbiAqIEByZXR1cm4ge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGlvbihvdXQsIG1hdCkge1xuICBvdXRbMF0gPSBtYXRbMTJdO1xuICBvdXRbMV0gPSBtYXRbMTNdO1xuICBvdXRbMl0gPSBtYXRbMTRdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzY2FsaW5nIGZhY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvblxuICogIG1hdHJpeC4gSWYgYSBtYXRyaXggaXMgYnVpbHQgd2l0aCBmcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlXG4gKiAgd2l0aCBhIG5vcm1hbGl6ZWQgUXVhdGVybmlvbiBwYXJhbXRlciwgdGhlIHJldHVybmVkIHZlY3RvciB3aWxsIGJlXG4gKiAgdGhlIHNhbWUgYXMgdGhlIHNjYWxpbmcgdmVjdG9yXG4gKiAgb3JpZ2luYWxseSBzdXBwbGllZC5cbiAqIEBwYXJhbSAge3ZlYzN9IG91dCBWZWN0b3IgdG8gcmVjZWl2ZSBzY2FsaW5nIGZhY3RvciBjb21wb25lbnRcbiAqIEBwYXJhbSAge1JlYWRvbmx5TWF0NH0gbWF0IE1hdHJpeCB0byBiZSBkZWNvbXBvc2VkIChpbnB1dClcbiAqIEByZXR1cm4ge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsaW5nKG91dCwgbWF0KSB7XG4gIHZhciBtMTEgPSBtYXRbMF07XG4gIHZhciBtMTIgPSBtYXRbMV07XG4gIHZhciBtMTMgPSBtYXRbMl07XG4gIHZhciBtMjEgPSBtYXRbNF07XG4gIHZhciBtMjIgPSBtYXRbNV07XG4gIHZhciBtMjMgPSBtYXRbNl07XG4gIHZhciBtMzEgPSBtYXRbOF07XG4gIHZhciBtMzIgPSBtYXRbOV07XG4gIHZhciBtMzMgPSBtYXRbMTBdO1xuICBvdXRbMF0gPSBNYXRoLmh5cG90KG0xMSwgbTEyLCBtMTMpO1xuICBvdXRbMV0gPSBNYXRoLmh5cG90KG0yMSwgbTIyLCBtMjMpO1xuICBvdXRbMl0gPSBNYXRoLmh5cG90KG0zMSwgbTMyLCBtMzMpO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgcXVhdGVybmlvbiByZXByZXNlbnRpbmcgdGhlIHJvdGF0aW9uYWwgY29tcG9uZW50XG4gKiAgb2YgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguIElmIGEgbWF0cml4IGlzIGJ1aWx0IHdpdGhcbiAqICBmcm9tUm90YXRpb25UcmFuc2xhdGlvbiwgdGhlIHJldHVybmVkIHF1YXRlcm5pb24gd2lsbCBiZSB0aGVcbiAqICBzYW1lIGFzIHRoZSBxdWF0ZXJuaW9uIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge3F1YXR9IG91dCBRdWF0ZXJuaW9uIHRvIHJlY2VpdmUgdGhlIHJvdGF0aW9uIGNvbXBvbmVudFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXG4gKiBAcmV0dXJuIHtxdWF0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um90YXRpb24ob3V0LCBtYXQpIHtcbiAgdmFyIHNjYWxpbmcgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgZ2V0U2NhbGluZyhzY2FsaW5nLCBtYXQpO1xuICB2YXIgaXMxID0gMSAvIHNjYWxpbmdbMF07XG4gIHZhciBpczIgPSAxIC8gc2NhbGluZ1sxXTtcbiAgdmFyIGlzMyA9IDEgLyBzY2FsaW5nWzJdO1xuICB2YXIgc20xMSA9IG1hdFswXSAqIGlzMTtcbiAgdmFyIHNtMTIgPSBtYXRbMV0gKiBpczI7XG4gIHZhciBzbTEzID0gbWF0WzJdICogaXMzO1xuICB2YXIgc20yMSA9IG1hdFs0XSAqIGlzMTtcbiAgdmFyIHNtMjIgPSBtYXRbNV0gKiBpczI7XG4gIHZhciBzbTIzID0gbWF0WzZdICogaXMzO1xuICB2YXIgc20zMSA9IG1hdFs4XSAqIGlzMTtcbiAgdmFyIHNtMzIgPSBtYXRbOV0gKiBpczI7XG4gIHZhciBzbTMzID0gbWF0WzEwXSAqIGlzMztcbiAgdmFyIHRyYWNlID0gc20xMSArIHNtMjIgKyBzbTMzO1xuICB2YXIgUyA9IDA7XG5cbiAgaWYgKHRyYWNlID4gMCkge1xuICAgIFMgPSBNYXRoLnNxcnQodHJhY2UgKyAxLjApICogMjtcbiAgICBvdXRbM10gPSAwLjI1ICogUztcbiAgICBvdXRbMF0gPSAoc20yMyAtIHNtMzIpIC8gUztcbiAgICBvdXRbMV0gPSAoc20zMSAtIHNtMTMpIC8gUztcbiAgICBvdXRbMl0gPSAoc20xMiAtIHNtMjEpIC8gUztcbiAgfSBlbHNlIGlmIChzbTExID4gc20yMiAmJiBzbTExID4gc20zMykge1xuICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20xMSAtIHNtMjIgLSBzbTMzKSAqIDI7XG4gICAgb3V0WzNdID0gKHNtMjMgLSBzbTMyKSAvIFM7XG4gICAgb3V0WzBdID0gMC4yNSAqIFM7XG4gICAgb3V0WzFdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgb3V0WzJdID0gKHNtMzEgKyBzbTEzKSAvIFM7XG4gIH0gZWxzZSBpZiAoc20yMiA+IHNtMzMpIHtcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMjIgLSBzbTExIC0gc20zMykgKiAyO1xuICAgIG91dFszXSA9IChzbTMxIC0gc20xMykgLyBTO1xuICAgIG91dFswXSA9IChzbTEyICsgc20yMSkgLyBTO1xuICAgIG91dFsxXSA9IDAuMjUgKiBTO1xuICAgIG91dFsyXSA9IChzbTIzICsgc20zMikgLyBTO1xuICB9IGVsc2Uge1xuICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20zMyAtIHNtMTEgLSBzbTIyKSAqIDI7XG4gICAgb3V0WzNdID0gKHNtMTIgLSBzbTIxKSAvIFM7XG4gICAgb3V0WzBdID0gKHNtMzEgKyBzbTEzKSAvIFM7XG4gICAgb3V0WzFdID0gKHNtMjMgKyBzbTMyKSAvIFM7XG4gICAgb3V0WzJdID0gMC4yNSAqIFM7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLCB2ZWN0b3IgdHJhbnNsYXRpb24gYW5kIHZlY3RvciBzY2FsZVxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAqICAgICBsZXQgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gKiAgICAgbWF0NC5zY2FsZShkZXN0LCBzY2FsZSlcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHMgU2NhbGluZyB2ZWN0b3JcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZShvdXQsIHEsIHYsIHMpIHtcbiAgLy8gUXVhdGVybmlvbiBtYXRoXG4gIHZhciB4ID0gcVswXSxcbiAgICAgIHkgPSBxWzFdLFxuICAgICAgeiA9IHFbMl0sXG4gICAgICB3ID0gcVszXTtcbiAgdmFyIHgyID0geCArIHg7XG4gIHZhciB5MiA9IHkgKyB5O1xuICB2YXIgejIgPSB6ICsgejtcbiAgdmFyIHh4ID0geCAqIHgyO1xuICB2YXIgeHkgPSB4ICogeTI7XG4gIHZhciB4eiA9IHggKiB6MjtcbiAgdmFyIHl5ID0geSAqIHkyO1xuICB2YXIgeXogPSB5ICogejI7XG4gIHZhciB6eiA9IHogKiB6MjtcbiAgdmFyIHd4ID0gdyAqIHgyO1xuICB2YXIgd3kgPSB3ICogeTI7XG4gIHZhciB3eiA9IHcgKiB6MjtcbiAgdmFyIHN4ID0gc1swXTtcbiAgdmFyIHN5ID0gc1sxXTtcbiAgdmFyIHN6ID0gc1syXTtcbiAgb3V0WzBdID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gIG91dFsxXSA9ICh4eSArIHd6KSAqIHN4O1xuICBvdXRbMl0gPSAoeHogLSB3eSkgKiBzeDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gKHh5IC0gd3opICogc3k7XG4gIG91dFs1XSA9ICgxIC0gKHh4ICsgenopKSAqIHN5O1xuICBvdXRbNl0gPSAoeXogKyB3eCkgKiBzeTtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gKHh6ICsgd3kpICogc3o7XG4gIG91dFs5XSA9ICh5eiAtIHd4KSAqIHN6O1xuICBvdXRbMTBdID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gdlswXTtcbiAgb3V0WzEzXSA9IHZbMV07XG4gIG91dFsxNF0gPSB2WzJdO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbiwgdmVjdG9yIHRyYW5zbGF0aW9uIGFuZCB2ZWN0b3Igc2NhbGUsIHJvdGF0aW5nIGFuZCBzY2FsaW5nIGFyb3VuZCB0aGUgZ2l2ZW4gb3JpZ2luXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCB2ZWMpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIG9yaWdpbik7XG4gKiAgICAgbGV0IHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICogICAgIG1hdDQuc2NhbGUoZGVzdCwgc2NhbGUpXG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgbmVnYXRpdmVPcmlnaW4pO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gcyBTY2FsaW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IG8gVGhlIG9yaWdpbiB2ZWN0b3IgYXJvdW5kIHdoaWNoIHRvIHNjYWxlIGFuZCByb3RhdGVcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZU9yaWdpbihvdXQsIHEsIHYsIHMsIG8pIHtcbiAgLy8gUXVhdGVybmlvbiBtYXRoXG4gIHZhciB4ID0gcVswXSxcbiAgICAgIHkgPSBxWzFdLFxuICAgICAgeiA9IHFbMl0sXG4gICAgICB3ID0gcVszXTtcbiAgdmFyIHgyID0geCArIHg7XG4gIHZhciB5MiA9IHkgKyB5O1xuICB2YXIgejIgPSB6ICsgejtcbiAgdmFyIHh4ID0geCAqIHgyO1xuICB2YXIgeHkgPSB4ICogeTI7XG4gIHZhciB4eiA9IHggKiB6MjtcbiAgdmFyIHl5ID0geSAqIHkyO1xuICB2YXIgeXogPSB5ICogejI7XG4gIHZhciB6eiA9IHogKiB6MjtcbiAgdmFyIHd4ID0gdyAqIHgyO1xuICB2YXIgd3kgPSB3ICogeTI7XG4gIHZhciB3eiA9IHcgKiB6MjtcbiAgdmFyIHN4ID0gc1swXTtcbiAgdmFyIHN5ID0gc1sxXTtcbiAgdmFyIHN6ID0gc1syXTtcbiAgdmFyIG94ID0gb1swXTtcbiAgdmFyIG95ID0gb1sxXTtcbiAgdmFyIG96ID0gb1syXTtcbiAgdmFyIG91dDAgPSAoMSAtICh5eSArIHp6KSkgKiBzeDtcbiAgdmFyIG91dDEgPSAoeHkgKyB3eikgKiBzeDtcbiAgdmFyIG91dDIgPSAoeHogLSB3eSkgKiBzeDtcbiAgdmFyIG91dDQgPSAoeHkgLSB3eikgKiBzeTtcbiAgdmFyIG91dDUgPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcbiAgdmFyIG91dDYgPSAoeXogKyB3eCkgKiBzeTtcbiAgdmFyIG91dDggPSAoeHogKyB3eSkgKiBzejtcbiAgdmFyIG91dDkgPSAoeXogLSB3eCkgKiBzejtcbiAgdmFyIG91dDEwID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gIG91dFswXSA9IG91dDA7XG4gIG91dFsxXSA9IG91dDE7XG4gIG91dFsyXSA9IG91dDI7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IG91dDQ7XG4gIG91dFs1XSA9IG91dDU7XG4gIG91dFs2XSA9IG91dDY7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IG91dDg7XG4gIG91dFs5XSA9IG91dDk7XG4gIG91dFsxMF0gPSBvdXQxMDtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSB2WzBdICsgb3ggLSAob3V0MCAqIG94ICsgb3V0NCAqIG95ICsgb3V0OCAqIG96KTtcbiAgb3V0WzEzXSA9IHZbMV0gKyBveSAtIChvdXQxICogb3ggKyBvdXQ1ICogb3kgKyBvdXQ5ICogb3opO1xuICBvdXRbMTRdID0gdlsyXSArIG96IC0gKG91dDIgKiBveCArIG91dDYgKiBveSArIG91dDEwICogb3opO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyBhIDR4NCBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gcXVhdGVybmlvblxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIFF1YXRlcm5pb24gdG8gY3JlYXRlIG1hdHJpeCBmcm9tXG4gKlxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUXVhdChvdXQsIHEpIHtcbiAgdmFyIHggPSBxWzBdLFxuICAgICAgeSA9IHFbMV0sXG4gICAgICB6ID0gcVsyXSxcbiAgICAgIHcgPSBxWzNdO1xuICB2YXIgeDIgPSB4ICsgeDtcbiAgdmFyIHkyID0geSArIHk7XG4gIHZhciB6MiA9IHogKyB6O1xuICB2YXIgeHggPSB4ICogeDI7XG4gIHZhciB5eCA9IHkgKiB4MjtcbiAgdmFyIHl5ID0geSAqIHkyO1xuICB2YXIgenggPSB6ICogeDI7XG4gIHZhciB6eSA9IHogKiB5MjtcbiAgdmFyIHp6ID0geiAqIHoyO1xuICB2YXIgd3ggPSB3ICogeDI7XG4gIHZhciB3eSA9IHcgKiB5MjtcbiAgdmFyIHd6ID0gdyAqIHoyO1xuICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgb3V0WzFdID0geXggKyB3ejtcbiAgb3V0WzJdID0genggLSB3eTtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0geXggLSB3ejtcbiAgb3V0WzVdID0gMSAtIHh4IC0geno7XG4gIG91dFs2XSA9IHp5ICsgd3g7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IHp4ICsgd3k7XG4gIG91dFs5XSA9IHp5IC0gd3g7XG4gIG91dFsxMF0gPSAxIC0geHggLSB5eTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBmcnVzdHVtIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge051bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJ1c3R1bShvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gIHZhciBybCA9IDEgLyAocmlnaHQgLSBsZWZ0KTtcbiAgdmFyIHRiID0gMSAvICh0b3AgLSBib3R0b20pO1xuICB2YXIgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICBvdXRbMF0gPSBuZWFyICogMiAqIHJsO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSBuZWFyICogMiAqIHRiO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAocmlnaHQgKyBsZWZ0KSAqIHJsO1xuICBvdXRbOV0gPSAodG9wICsgYm90dG9tKSAqIHRiO1xuICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gIG91dFsxMV0gPSAtMTtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gZmFyICogbmVhciAqIDIgKiBuZjtcbiAgb3V0WzE1XSA9IDA7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kcy5cbiAqIFRoZSBuZWFyL2ZhciBjbGlwIHBsYW5lcyBjb3JyZXNwb25kIHRvIGEgbm9ybWFsaXplZCBkZXZpY2UgY29vcmRpbmF0ZSBaIHJhbmdlIG9mIFstMSwgMV0sXG4gKiB3aGljaCBtYXRjaGVzIFdlYkdML09wZW5HTCdzIGNsaXAgdm9sdW1lLlxuICogUGFzc2luZyBudWxsL3VuZGVmaW5lZC9ubyB2YWx1ZSBmb3IgZmFyIHdpbGwgZ2VuZXJhdGUgaW5maW5pdGUgcHJvamVjdGlvbiBtYXRyaXguXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtudW1iZXJ9IGZvdnkgVmVydGljYWwgZmllbGQgb2YgdmlldyBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gYXNwZWN0IEFzcGVjdCByYXRpby4gdHlwaWNhbGx5IHZpZXdwb3J0IHdpZHRoL2hlaWdodFxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW0sIGNhbiBiZSBudWxsIG9yIEluZmluaXR5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHBlcnNwZWN0aXZlTk8ob3V0LCBmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcikge1xuICB2YXIgZiA9IDEuMCAvIE1hdGgudGFuKGZvdnkgLyAyKSxcbiAgICAgIG5mO1xuICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSBmO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTFdID0gLTE7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE1XSA9IDA7XG5cbiAgaWYgKGZhciAhPSBudWxsICYmIGZhciAhPT0gSW5maW5pdHkpIHtcbiAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgIG91dFsxNF0gPSAyICogZmFyICogbmVhciAqIG5mO1xuICB9IGVsc2Uge1xuICAgIG91dFsxMF0gPSAtMTtcbiAgICBvdXRbMTRdID0gLTIgKiBuZWFyO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQ0LnBlcnNwZWN0aXZlTk99XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmVOTztcbi8qKlxuICogR2VuZXJhdGVzIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggc3VpdGFibGUgZm9yIFdlYkdQVSB3aXRoIHRoZSBnaXZlbiBib3VuZHMuXG4gKiBUaGUgbmVhci9mYXIgY2xpcCBwbGFuZXMgY29ycmVzcG9uZCB0byBhIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGUgWiByYW5nZSBvZiBbMCwgMV0sXG4gKiB3aGljaCBtYXRjaGVzIFdlYkdQVS9WdWxrYW4vRGlyZWN0WC9NZXRhbCdzIGNsaXAgdm9sdW1lLlxuICogUGFzc2luZyBudWxsL3VuZGVmaW5lZC9ubyB2YWx1ZSBmb3IgZmFyIHdpbGwgZ2VuZXJhdGUgaW5maW5pdGUgcHJvamVjdGlvbiBtYXRyaXguXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtudW1iZXJ9IGZvdnkgVmVydGljYWwgZmllbGQgb2YgdmlldyBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gYXNwZWN0IEFzcGVjdCByYXRpby4gdHlwaWNhbGx5IHZpZXdwb3J0IHdpZHRoL2hlaWdodFxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW0sIGNhbiBiZSBudWxsIG9yIEluZmluaXR5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHBlcnNwZWN0aXZlWk8ob3V0LCBmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcikge1xuICB2YXIgZiA9IDEuMCAvIE1hdGgudGFuKGZvdnkgLyAyKSxcbiAgICAgIG5mO1xuICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSBmO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTFdID0gLTE7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE1XSA9IDA7XG5cbiAgaWYgKGZhciAhPSBudWxsICYmIGZhciAhPT0gSW5maW5pdHkpIHtcbiAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzEwXSA9IGZhciAqIG5mO1xuICAgIG91dFsxNF0gPSBmYXIgKiBuZWFyICogbmY7XG4gIH0gZWxzZSB7XG4gICAgb3V0WzEwXSA9IC0xO1xuICAgIG91dFsxNF0gPSAtbmVhcjtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGZpZWxkIG9mIHZpZXcuXG4gKiBUaGlzIGlzIHByaW1hcmlseSB1c2VmdWwgZm9yIGdlbmVyYXRpbmcgcHJvamVjdGlvbiBtYXRyaWNlcyB0byBiZSB1c2VkXG4gKiB3aXRoIHRoZSBzdGlsbCBleHBlcmllbWVudGFsIFdlYlZSIEFQSS5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge09iamVjdH0gZm92IE9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgdmFsdWVzOiB1cERlZ3JlZXMsIGRvd25EZWdyZWVzLCBsZWZ0RGVncmVlcywgcmlnaHREZWdyZWVzXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldyhvdXQsIGZvdiwgbmVhciwgZmFyKSB7XG4gIHZhciB1cFRhbiA9IE1hdGgudGFuKGZvdi51cERlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICB2YXIgZG93blRhbiA9IE1hdGgudGFuKGZvdi5kb3duRGVncmVlcyAqIE1hdGguUEkgLyAxODAuMCk7XG4gIHZhciBsZWZ0VGFuID0gTWF0aC50YW4oZm92LmxlZnREZWdyZWVzICogTWF0aC5QSSAvIDE4MC4wKTtcbiAgdmFyIHJpZ2h0VGFuID0gTWF0aC50YW4oZm92LnJpZ2h0RGVncmVlcyAqIE1hdGguUEkgLyAxODAuMCk7XG4gIHZhciB4U2NhbGUgPSAyLjAgLyAobGVmdFRhbiArIHJpZ2h0VGFuKTtcbiAgdmFyIHlTY2FsZSA9IDIuMCAvICh1cFRhbiArIGRvd25UYW4pO1xuICBvdXRbMF0gPSB4U2NhbGU7XG4gIG91dFsxXSA9IDAuMDtcbiAgb3V0WzJdID0gMC4wO1xuICBvdXRbM10gPSAwLjA7XG4gIG91dFs0XSA9IDAuMDtcbiAgb3V0WzVdID0geVNjYWxlO1xuICBvdXRbNl0gPSAwLjA7XG4gIG91dFs3XSA9IDAuMDtcbiAgb3V0WzhdID0gLSgobGVmdFRhbiAtIHJpZ2h0VGFuKSAqIHhTY2FsZSAqIDAuNSk7XG4gIG91dFs5XSA9ICh1cFRhbiAtIGRvd25UYW4pICogeVNjYWxlICogMC41O1xuICBvdXRbMTBdID0gZmFyIC8gKG5lYXIgLSBmYXIpO1xuICBvdXRbMTFdID0gLTEuMDtcbiAgb3V0WzEyXSA9IDAuMDtcbiAgb3V0WzEzXSA9IDAuMDtcbiAgb3V0WzE0XSA9IGZhciAqIG5lYXIgLyAobmVhciAtIGZhcik7XG4gIG91dFsxNV0gPSAwLjA7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdlbmVyYXRlcyBhIG9ydGhvZ29uYWwgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzLlxuICogVGhlIG5lYXIvZmFyIGNsaXAgcGxhbmVzIGNvcnJlc3BvbmQgdG8gYSBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlIFogcmFuZ2Ugb2YgWy0xLCAxXSxcbiAqIHdoaWNoIG1hdGNoZXMgV2ViR0wvT3BlbkdMJ3MgY2xpcCB2b2x1bWUuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtudW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gYm90dG9tIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG9ydGhvTk8ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICB2YXIgbHIgPSAxIC8gKGxlZnQgLSByaWdodCk7XG4gIHZhciBidCA9IDEgLyAoYm90dG9tIC0gdG9wKTtcbiAgdmFyIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgb3V0WzBdID0gLTIgKiBscjtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gLTIgKiBidDtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IDIgKiBuZjtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAobGVmdCArIHJpZ2h0KSAqIGxyO1xuICBvdXRbMTNdID0gKHRvcCArIGJvdHRvbSkgKiBidDtcbiAgb3V0WzE0XSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQ0Lm9ydGhvTk99XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIG9ydGhvID0gb3J0aG9OTztcbi8qKlxuICogR2VuZXJhdGVzIGEgb3J0aG9nb25hbCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHMuXG4gKiBUaGUgbmVhci9mYXIgY2xpcCBwbGFuZXMgY29ycmVzcG9uZCB0byBhIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGUgWiByYW5nZSBvZiBbMCwgMV0sXG4gKiB3aGljaCBtYXRjaGVzIFdlYkdQVS9WdWxrYW4vRGlyZWN0WC9NZXRhbCdzIGNsaXAgdm9sdW1lLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBvcnRob1pPKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgdmFyIGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpO1xuICB2YXIgYnQgPSAxIC8gKGJvdHRvbSAtIHRvcCk7XG4gIHZhciBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gIG91dFswXSA9IC0yICogbHI7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IC0yICogYnQ7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMF0gPSBuZjtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAobGVmdCArIHJpZ2h0KSAqIGxyO1xuICBvdXRbMTNdID0gKHRvcCArIGJvdHRvbSkgKiBidDtcbiAgb3V0WzE0XSA9IG5lYXIgKiBuZjtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdlbmVyYXRlcyBhIGxvb2stYXQgbWF0cml4IHdpdGggdGhlIGdpdmVuIGV5ZSBwb3NpdGlvbiwgZm9jYWwgcG9pbnQsIGFuZCB1cCBheGlzLlxuICogSWYgeW91IHdhbnQgYSBtYXRyaXggdGhhdCBhY3R1YWxseSBtYWtlcyBhbiBvYmplY3QgbG9vayBhdCBhbm90aGVyIG9iamVjdCwgeW91IHNob3VsZCB1c2UgdGFyZ2V0VG8gaW5zdGVhZC5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gZXllIFBvc2l0aW9uIG9mIHRoZSB2aWV3ZXJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBjZW50ZXIgUG9pbnQgdGhlIHZpZXdlciBpcyBsb29raW5nIGF0XG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdXAgdmVjMyBwb2ludGluZyB1cFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsb29rQXQob3V0LCBleWUsIGNlbnRlciwgdXApIHtcbiAgdmFyIHgwLCB4MSwgeDIsIHkwLCB5MSwgeTIsIHowLCB6MSwgejIsIGxlbjtcbiAgdmFyIGV5ZXggPSBleWVbMF07XG4gIHZhciBleWV5ID0gZXllWzFdO1xuICB2YXIgZXlleiA9IGV5ZVsyXTtcbiAgdmFyIHVweCA9IHVwWzBdO1xuICB2YXIgdXB5ID0gdXBbMV07XG4gIHZhciB1cHogPSB1cFsyXTtcbiAgdmFyIGNlbnRlcnggPSBjZW50ZXJbMF07XG4gIHZhciBjZW50ZXJ5ID0gY2VudGVyWzFdO1xuICB2YXIgY2VudGVyeiA9IGNlbnRlclsyXTtcblxuICBpZiAoTWF0aC5hYnMoZXlleCAtIGNlbnRlcngpIDwgZ2xNYXRyaXguRVBTSUxPTiAmJiBNYXRoLmFicyhleWV5IC0gY2VudGVyeSkgPCBnbE1hdHJpeC5FUFNJTE9OICYmIE1hdGguYWJzKGV5ZXogLSBjZW50ZXJ6KSA8IGdsTWF0cml4LkVQU0lMT04pIHtcbiAgICByZXR1cm4gaWRlbnRpdHkob3V0KTtcbiAgfVxuXG4gIHowID0gZXlleCAtIGNlbnRlcng7XG4gIHoxID0gZXlleSAtIGNlbnRlcnk7XG4gIHoyID0gZXlleiAtIGNlbnRlcno7XG4gIGxlbiA9IDEgLyBNYXRoLmh5cG90KHowLCB6MSwgejIpO1xuICB6MCAqPSBsZW47XG4gIHoxICo9IGxlbjtcbiAgejIgKj0gbGVuO1xuICB4MCA9IHVweSAqIHoyIC0gdXB6ICogejE7XG4gIHgxID0gdXB6ICogejAgLSB1cHggKiB6MjtcbiAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICBsZW4gPSBNYXRoLmh5cG90KHgwLCB4MSwgeDIpO1xuXG4gIGlmICghbGVuKSB7XG4gICAgeDAgPSAwO1xuICAgIHgxID0gMDtcbiAgICB4MiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgbGVuID0gMSAvIGxlbjtcbiAgICB4MCAqPSBsZW47XG4gICAgeDEgKj0gbGVuO1xuICAgIHgyICo9IGxlbjtcbiAgfVxuXG4gIHkwID0gejEgKiB4MiAtIHoyICogeDE7XG4gIHkxID0gejIgKiB4MCAtIHowICogeDI7XG4gIHkyID0gejAgKiB4MSAtIHoxICogeDA7XG4gIGxlbiA9IE1hdGguaHlwb3QoeTAsIHkxLCB5Mik7XG5cbiAgaWYgKCFsZW4pIHtcbiAgICB5MCA9IDA7XG4gICAgeTEgPSAwO1xuICAgIHkyID0gMDtcbiAgfSBlbHNlIHtcbiAgICBsZW4gPSAxIC8gbGVuO1xuICAgIHkwICo9IGxlbjtcbiAgICB5MSAqPSBsZW47XG4gICAgeTIgKj0gbGVuO1xuICB9XG5cbiAgb3V0WzBdID0geDA7XG4gIG91dFsxXSA9IHkwO1xuICBvdXRbMl0gPSB6MDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0geDE7XG4gIG91dFs1XSA9IHkxO1xuICBvdXRbNl0gPSB6MTtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0geDI7XG4gIG91dFs5XSA9IHkyO1xuICBvdXRbMTBdID0gejI7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gLSh4MCAqIGV5ZXggKyB4MSAqIGV5ZXkgKyB4MiAqIGV5ZXopO1xuICBvdXRbMTNdID0gLSh5MCAqIGV5ZXggKyB5MSAqIGV5ZXkgKyB5MiAqIGV5ZXopO1xuICBvdXRbMTRdID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogR2VuZXJhdGVzIGEgbWF0cml4IHRoYXQgbWFrZXMgc29tZXRoaW5nIGxvb2sgYXQgc29tZXRoaW5nIGVsc2UuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGV5ZSBQb3NpdGlvbiBvZiB0aGUgdmlld2VyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gY2VudGVyIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdGFyZ2V0VG8ob3V0LCBleWUsIHRhcmdldCwgdXApIHtcbiAgdmFyIGV5ZXggPSBleWVbMF0sXG4gICAgICBleWV5ID0gZXllWzFdLFxuICAgICAgZXlleiA9IGV5ZVsyXSxcbiAgICAgIHVweCA9IHVwWzBdLFxuICAgICAgdXB5ID0gdXBbMV0sXG4gICAgICB1cHogPSB1cFsyXTtcbiAgdmFyIHowID0gZXlleCAtIHRhcmdldFswXSxcbiAgICAgIHoxID0gZXlleSAtIHRhcmdldFsxXSxcbiAgICAgIHoyID0gZXlleiAtIHRhcmdldFsyXTtcbiAgdmFyIGxlbiA9IHowICogejAgKyB6MSAqIHoxICsgejIgKiB6MjtcblxuICBpZiAobGVuID4gMCkge1xuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICB6MCAqPSBsZW47XG4gICAgejEgKj0gbGVuO1xuICAgIHoyICo9IGxlbjtcbiAgfVxuXG4gIHZhciB4MCA9IHVweSAqIHoyIC0gdXB6ICogejEsXG4gICAgICB4MSA9IHVweiAqIHowIC0gdXB4ICogejIsXG4gICAgICB4MiA9IHVweCAqIHoxIC0gdXB5ICogejA7XG4gIGxlbiA9IHgwICogeDAgKyB4MSAqIHgxICsgeDIgKiB4MjtcblxuICBpZiAobGVuID4gMCkge1xuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICB4MCAqPSBsZW47XG4gICAgeDEgKj0gbGVuO1xuICAgIHgyICo9IGxlbjtcbiAgfVxuXG4gIG91dFswXSA9IHgwO1xuICBvdXRbMV0gPSB4MTtcbiAgb3V0WzJdID0geDI7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHoxICogeDIgLSB6MiAqIHgxO1xuICBvdXRbNV0gPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgb3V0WzZdID0gejAgKiB4MSAtIHoxICogeDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IHowO1xuICBvdXRbOV0gPSB6MTtcbiAgb3V0WzEwXSA9IHoyO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IGV5ZXg7XG4gIG91dFsxM10gPSBleWV5O1xuICBvdXRbMTRdID0gZXllejtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyKGEpIHtcbiAgcmV0dXJuIFwibWF0NChcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiLCBcIiArIGFbM10gKyBcIiwgXCIgKyBhWzRdICsgXCIsIFwiICsgYVs1XSArIFwiLCBcIiArIGFbNl0gKyBcIiwgXCIgKyBhWzddICsgXCIsIFwiICsgYVs4XSArIFwiLCBcIiArIGFbOV0gKyBcIiwgXCIgKyBhWzEwXSArIFwiLCBcIiArIGFbMTFdICsgXCIsIFwiICsgYVsxMl0gKyBcIiwgXCIgKyBhWzEzXSArIFwiLCBcIiArIGFbMTRdICsgXCIsIFwiICsgYVsxNV0gKyBcIilcIjtcbn1cbi8qKlxuICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvYihhKSB7XG4gIHJldHVybiBNYXRoLmh5cG90KGFbMF0sIGFbMV0sIGFbMl0sIGFbM10sIGFbNF0sIGFbNV0sIGFbNl0sIGFbN10sIGFbOF0sIGFbOV0sIGFbMTBdLCBhWzExXSwgYVsxMl0sIGFbMTNdLCBhWzE0XSwgYVsxNV0pO1xufVxuLyoqXG4gKiBBZGRzIHR3byBtYXQ0J3NcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gIG91dFszXSA9IGFbM10gKyBiWzNdO1xuICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgb3V0WzVdID0gYVs1XSArIGJbNV07XG4gIG91dFs2XSA9IGFbNl0gKyBiWzZdO1xuICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgb3V0WzhdID0gYVs4XSArIGJbOF07XG4gIG91dFs5XSA9IGFbOV0gKyBiWzldO1xuICBvdXRbMTBdID0gYVsxMF0gKyBiWzEwXTtcbiAgb3V0WzExXSA9IGFbMTFdICsgYlsxMV07XG4gIG91dFsxMl0gPSBhWzEyXSArIGJbMTJdO1xuICBvdXRbMTNdID0gYVsxM10gKyBiWzEzXTtcbiAgb3V0WzE0XSA9IGFbMTRdICsgYlsxNF07XG4gIG91dFsxNV0gPSBhWzE1XSArIGJbMTVdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgb3V0WzRdID0gYVs0XSAtIGJbNF07XG4gIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICBvdXRbNl0gPSBhWzZdIC0gYls2XTtcbiAgb3V0WzddID0gYVs3XSAtIGJbN107XG4gIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICBvdXRbOV0gPSBhWzldIC0gYls5XTtcbiAgb3V0WzEwXSA9IGFbMTBdIC0gYlsxMF07XG4gIG91dFsxMV0gPSBhWzExXSAtIGJbMTFdO1xuICBvdXRbMTJdID0gYVsxMl0gLSBiWzEyXTtcbiAgb3V0WzEzXSA9IGFbMTNdIC0gYlsxM107XG4gIG91dFsxNF0gPSBhWzE0XSAtIGJbMTRdO1xuICBvdXRbMTVdID0gYVsxNV0gLSBiWzE1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgbWF0cml4J3MgZWxlbWVudHMgYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHlTY2FsYXIob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiO1xuICBvdXRbMV0gPSBhWzFdICogYjtcbiAgb3V0WzJdID0gYVsyXSAqIGI7XG4gIG91dFszXSA9IGFbM10gKiBiO1xuICBvdXRbNF0gPSBhWzRdICogYjtcbiAgb3V0WzVdID0gYVs1XSAqIGI7XG4gIG91dFs2XSA9IGFbNl0gKiBiO1xuICBvdXRbN10gPSBhWzddICogYjtcbiAgb3V0WzhdID0gYVs4XSAqIGI7XG4gIG91dFs5XSA9IGFbOV0gKiBiO1xuICBvdXRbMTBdID0gYVsxMF0gKiBiO1xuICBvdXRbMTFdID0gYVsxMV0gKiBiO1xuICBvdXRbMTJdID0gYVsxMl0gKiBiO1xuICBvdXRbMTNdID0gYVsxM10gKiBiO1xuICBvdXRbMTRdID0gYVsxNF0gKiBiO1xuICBvdXRbMTVdID0gYVsxNV0gKiBiO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBBZGRzIHR3byBtYXQ0J3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYidzIGVsZW1lbnRzIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHlTY2FsYXJBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICBvdXRbM10gPSBhWzNdICsgYlszXSAqIHNjYWxlO1xuICBvdXRbNF0gPSBhWzRdICsgYls0XSAqIHNjYWxlO1xuICBvdXRbNV0gPSBhWzVdICsgYls1XSAqIHNjYWxlO1xuICBvdXRbNl0gPSBhWzZdICsgYls2XSAqIHNjYWxlO1xuICBvdXRbN10gPSBhWzddICsgYls3XSAqIHNjYWxlO1xuICBvdXRbOF0gPSBhWzhdICsgYls4XSAqIHNjYWxlO1xuICBvdXRbOV0gPSBhWzldICsgYls5XSAqIHNjYWxlO1xuICBvdXRbMTBdID0gYVsxMF0gKyBiWzEwXSAqIHNjYWxlO1xuICBvdXRbMTFdID0gYVsxMV0gKyBiWzExXSAqIHNjYWxlO1xuICBvdXRbMTJdID0gYVsxMl0gKyBiWzEyXSAqIHNjYWxlO1xuICBvdXRbMTNdID0gYVsxM10gKyBiWzEzXSAqIHNjYWxlO1xuICBvdXRbMTRdID0gYVsxNF0gKyBiWzE0XSAqIHNjYWxlO1xuICBvdXRbMTVdID0gYVsxNV0gKyBiWzE1XSAqIHNjYWxlO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gKlxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgVGhlIGZpcnN0IG1hdHJpeC5cbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleGFjdEVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdICYmIGFbNF0gPT09IGJbNF0gJiYgYVs1XSA9PT0gYls1XSAmJiBhWzZdID09PSBiWzZdICYmIGFbN10gPT09IGJbN10gJiYgYVs4XSA9PT0gYls4XSAmJiBhWzldID09PSBiWzldICYmIGFbMTBdID09PSBiWzEwXSAmJiBhWzExXSA9PT0gYlsxMV0gJiYgYVsxMl0gPT09IGJbMTJdICYmIGFbMTNdID09PSBiWzEzXSAmJiBhWzE0XSA9PT0gYlsxNF0gJiYgYVsxNV0gPT09IGJbMTVdO1xufVxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgVGhlIGZpcnN0IG1hdHJpeC5cbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICB2YXIgYTAgPSBhWzBdLFxuICAgICAgYTEgPSBhWzFdLFxuICAgICAgYTIgPSBhWzJdLFxuICAgICAgYTMgPSBhWzNdO1xuICB2YXIgYTQgPSBhWzRdLFxuICAgICAgYTUgPSBhWzVdLFxuICAgICAgYTYgPSBhWzZdLFxuICAgICAgYTcgPSBhWzddO1xuICB2YXIgYTggPSBhWzhdLFxuICAgICAgYTkgPSBhWzldLFxuICAgICAgYTEwID0gYVsxMF0sXG4gICAgICBhMTEgPSBhWzExXTtcbiAgdmFyIGExMiA9IGFbMTJdLFxuICAgICAgYTEzID0gYVsxM10sXG4gICAgICBhMTQgPSBhWzE0XSxcbiAgICAgIGExNSA9IGFbMTVdO1xuICB2YXIgYjAgPSBiWzBdLFxuICAgICAgYjEgPSBiWzFdLFxuICAgICAgYjIgPSBiWzJdLFxuICAgICAgYjMgPSBiWzNdO1xuICB2YXIgYjQgPSBiWzRdLFxuICAgICAgYjUgPSBiWzVdLFxuICAgICAgYjYgPSBiWzZdLFxuICAgICAgYjcgPSBiWzddO1xuICB2YXIgYjggPSBiWzhdLFxuICAgICAgYjkgPSBiWzldLFxuICAgICAgYjEwID0gYlsxMF0sXG4gICAgICBiMTEgPSBiWzExXTtcbiAgdmFyIGIxMiA9IGJbMTJdLFxuICAgICAgYjEzID0gYlsxM10sXG4gICAgICBiMTQgPSBiWzE0XSxcbiAgICAgIGIxNSA9IGJbMTVdO1xuICByZXR1cm4gTWF0aC5hYnMoYTAgLSBiMCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmIE1hdGguYWJzKGExIC0gYjEpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJiBNYXRoLmFicyhhMiAtIGIyKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiYgTWF0aC5hYnMoYTMgLSBiMykgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTMpLCBNYXRoLmFicyhiMykpICYmIE1hdGguYWJzKGE0IC0gYjQpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE0KSwgTWF0aC5hYnMoYjQpKSAmJiBNYXRoLmFicyhhNSAtIGI1KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNSksIE1hdGguYWJzKGI1KSkgJiYgTWF0aC5hYnMoYTYgLSBiNikgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTYpLCBNYXRoLmFicyhiNikpICYmIE1hdGguYWJzKGE3IC0gYjcpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE3KSwgTWF0aC5hYnMoYjcpKSAmJiBNYXRoLmFicyhhOCAtIGI4KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhOCksIE1hdGguYWJzKGI4KSkgJiYgTWF0aC5hYnMoYTkgLSBiOSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTkpLCBNYXRoLmFicyhiOSkpICYmIE1hdGguYWJzKGExMCAtIGIxMCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEwKSwgTWF0aC5hYnMoYjEwKSkgJiYgTWF0aC5hYnMoYTExIC0gYjExKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTEpLCBNYXRoLmFicyhiMTEpKSAmJiBNYXRoLmFicyhhMTIgLSBiMTIpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMiksIE1hdGguYWJzKGIxMikpICYmIE1hdGguYWJzKGExMyAtIGIxMykgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEzKSwgTWF0aC5hYnMoYjEzKSkgJiYgTWF0aC5hYnMoYTE0IC0gYjE0KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTQpLCBNYXRoLmFicyhiMTQpKSAmJiBNYXRoLmFicyhhMTUgLSBiMTUpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExNSksIE1hdGguYWJzKGIxNSkpO1xufVxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDQubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIG11bCA9IG11bHRpcGx5O1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDQuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHN1YiA9IHN1YnRyYWN0OyIsCiAgImltcG9ydCAqIGFzIGdsTWF0cml4IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuLyoqXG4gKiAzIERpbWVuc2lvbmFsIFZlY3RvclxuICogQG1vZHVsZSB2ZWMzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMzXG4gKlxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcblxuICBpZiAoZ2xNYXRyaXguQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMzIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVZhbHVlcyh4LCB5LCB6KSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgb3V0WzBdID0geDtcbiAgb3V0WzFdID0geTtcbiAgb3V0WzJdID0gejtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzMgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCB4LCB5LCB6KSB7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIG91dFsyXSA9IHo7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEFkZHMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAqIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRpdmlkZShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICBvdXRbMl0gPSBhWzJdIC8gYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTWF0aC5jZWlsIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2VpbFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjZWlsKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmNlaWwoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5jZWlsKGFbMl0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gZmxvb3JcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZmxvb3Iob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGguZmxvb3IoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguZmxvb3IoYVsxXSk7XG4gIG91dFsyXSA9IE1hdGguZmxvb3IoYVsyXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbihvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbWF4KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gcm91bmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gIG91dFsxXSA9IE1hdGgucm91bmQoYVsxXSk7XG4gIG91dFsyXSA9IE1hdGgucm91bmQoYVsyXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNjYWxlcyBhIHZlYzMgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYjtcbiAgb3V0WzFdID0gYVsxXSAqIGI7XG4gIG91dFsyXSA9IGFbMl0gKiBiO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBBZGRzIHR3byB2ZWMzJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF07XG4gIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gIHZhciB6ID0gYlsyXSAtIGFbMl07XG4gIHJldHVybiBNYXRoLmh5cG90KHgsIHksIHopO1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICB2YXIgeSA9IGJbMV0gLSBhWzFdO1xuICB2YXIgeiA9IGJbMl0gLSBhWzJdO1xuICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWRMZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xufVxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ2F0ZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gLWFbMF07XG4gIG91dFsxXSA9IC1hWzFdO1xuICBvdXRbMl0gPSAtYVsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGludmVydFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKG91dCwgYSkge1xuICBvdXRbMF0gPSAxLjAgLyBhWzBdO1xuICBvdXRbMV0gPSAxLjAgLyBhWzFdO1xuICBvdXRbMl0gPSAxLjAgLyBhWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKG91dCwgYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICB2YXIgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6O1xuXG4gIGlmIChsZW4gPiAwKSB7XG4gICAgLy9UT0RPOiBldmFsdWF0ZSB1c2Ugb2YgZ2xtX2ludnNxcnQgaGVyZT9cbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gIH1cblxuICBvdXRbMF0gPSBhWzBdICogbGVuO1xuICBvdXRbMV0gPSBhWzFdICogbGVuO1xuICBvdXRbMl0gPSBhWzJdICogbGVuO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkb3QoYSwgYikge1xuICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdO1xufVxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3Jvc3Mob3V0LCBhLCBiKSB7XG4gIHZhciBheCA9IGFbMF0sXG4gICAgICBheSA9IGFbMV0sXG4gICAgICBheiA9IGFbMl07XG4gIHZhciBieCA9IGJbMF0sXG4gICAgICBieSA9IGJbMV0sXG4gICAgICBieiA9IGJbMl07XG4gIG91dFswXSA9IGF5ICogYnogLSBheiAqIGJ5O1xuICBvdXRbMV0gPSBheiAqIGJ4IC0gYXggKiBiejtcbiAgb3V0WzJdID0gYXggKiBieSAtIGF5ICogYng7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVycChvdXQsIGEsIGIsIHQpIHtcbiAgdmFyIGF4ID0gYVswXTtcbiAgdmFyIGF5ID0gYVsxXTtcbiAgdmFyIGF6ID0gYVsyXTtcbiAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICBvdXRbMl0gPSBheiArIHQgKiAoYlsyXSAtIGF6KTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUGVyZm9ybXMgYSBoZXJtaXRlIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGMgdGhlIHRoaXJkIG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBkIHRoZSBmb3VydGggb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBoZXJtaXRlKG91dCwgYSwgYiwgYywgZCwgdCkge1xuICB2YXIgZmFjdG9yVGltZXMyID0gdCAqIHQ7XG4gIHZhciBmYWN0b3IxID0gZmFjdG9yVGltZXMyICogKDIgKiB0IC0gMykgKyAxO1xuICB2YXIgZmFjdG9yMiA9IGZhY3RvclRpbWVzMiAqICh0IC0gMikgKyB0O1xuICB2YXIgZmFjdG9yMyA9IGZhY3RvclRpbWVzMiAqICh0IC0gMSk7XG4gIHZhciBmYWN0b3I0ID0gZmFjdG9yVGltZXMyICogKDMgLSAyICogdCk7XG4gIG91dFswXSA9IGFbMF0gKiBmYWN0b3IxICsgYlswXSAqIGZhY3RvcjIgKyBjWzBdICogZmFjdG9yMyArIGRbMF0gKiBmYWN0b3I0O1xuICBvdXRbMV0gPSBhWzFdICogZmFjdG9yMSArIGJbMV0gKiBmYWN0b3IyICsgY1sxXSAqIGZhY3RvcjMgKyBkWzFdICogZmFjdG9yNDtcbiAgb3V0WzJdID0gYVsyXSAqIGZhY3RvcjEgKyBiWzJdICogZmFjdG9yMiArIGNbMl0gKiBmYWN0b3IzICsgZFsyXSAqIGZhY3RvcjQ7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFBlcmZvcm1zIGEgYmV6aWVyIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGMgdGhlIHRoaXJkIG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBkIHRoZSBmb3VydGggb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBiZXppZXIob3V0LCBhLCBiLCBjLCBkLCB0KSB7XG4gIHZhciBpbnZlcnNlRmFjdG9yID0gMSAtIHQ7XG4gIHZhciBpbnZlcnNlRmFjdG9yVGltZXNUd28gPSBpbnZlcnNlRmFjdG9yICogaW52ZXJzZUZhY3RvcjtcbiAgdmFyIGZhY3RvclRpbWVzMiA9IHQgKiB0O1xuICB2YXIgZmFjdG9yMSA9IGludmVyc2VGYWN0b3JUaW1lc1R3byAqIGludmVyc2VGYWN0b3I7XG4gIHZhciBmYWN0b3IyID0gMyAqIHQgKiBpbnZlcnNlRmFjdG9yVGltZXNUd287XG4gIHZhciBmYWN0b3IzID0gMyAqIGZhY3RvclRpbWVzMiAqIGludmVyc2VGYWN0b3I7XG4gIHZhciBmYWN0b3I0ID0gZmFjdG9yVGltZXMyICogdDtcbiAgb3V0WzBdID0gYVswXSAqIGZhY3RvcjEgKyBiWzBdICogZmFjdG9yMiArIGNbMF0gKiBmYWN0b3IzICsgZFswXSAqIGZhY3RvcjQ7XG4gIG91dFsxXSA9IGFbMV0gKiBmYWN0b3IxICsgYlsxXSAqIGZhY3RvcjIgKyBjWzFdICogZmFjdG9yMyArIGRbMV0gKiBmYWN0b3I0O1xuICBvdXRbMl0gPSBhWzJdICogZmFjdG9yMSArIGJbMl0gKiBmYWN0b3IyICsgY1syXSAqIGZhY3RvcjMgKyBkWzJdICogZmFjdG9yNDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tKG91dCwgc2NhbGUpIHtcbiAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XG4gIHZhciByID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyLjAgKiBNYXRoLlBJO1xuICB2YXIgeiA9IGdsTWF0cml4LlJBTkRPTSgpICogMi4wIC0gMS4wO1xuICB2YXIgelNjYWxlID0gTWF0aC5zcXJ0KDEuMCAtIHogKiB6KSAqIHNjYWxlO1xuICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHpTY2FsZTtcbiAgb3V0WzFdID0gTWF0aC5zaW4ocikgKiB6U2NhbGU7XG4gIG91dFsyXSA9IHogKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0NC5cbiAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXTtcbiAgdmFyIHcgPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV07XG4gIHcgPSB3IHx8IDEuMDtcbiAgb3V0WzBdID0gKG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdKSAvIHc7XG4gIG91dFsxXSA9IChtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSkgLyB3O1xuICBvdXRbMl0gPSAobVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdKSAvIHc7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDMuXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gbSB0aGUgM3gzIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQzKG91dCwgYSwgbSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXSxcbiAgICAgIHogPSBhWzJdO1xuICBvdXRbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgeiAqIG1bNl07XG4gIG91dFsxXSA9IHggKiBtWzFdICsgeSAqIG1bNF0gKyB6ICogbVs3XTtcbiAgb3V0WzJdID0geCAqIG1bMl0gKyB5ICogbVs1XSArIHogKiBtWzhdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBxdWF0XG4gKiBDYW4gYWxzbyBiZSB1c2VkIGZvciBkdWFsIHF1YXRlcm5pb25zLiAoTXVsdGlwbHkgaXQgd2l0aCB0aGUgcmVhbCBwYXJ0KVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1RdWF0KG91dCwgYSwgcSkge1xuICAvLyBiZW5jaG1hcmtzOiBodHRwczovL2pzcGVyZi5jb20vcXVhdGVybmlvbi10cmFuc2Zvcm0tdmVjMy1pbXBsZW1lbnRhdGlvbnMtZml4ZWRcbiAgdmFyIHF4ID0gcVswXSxcbiAgICAgIHF5ID0gcVsxXSxcbiAgICAgIHF6ID0gcVsyXSxcbiAgICAgIHF3ID0gcVszXTtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXTsgLy8gdmFyIHF2ZWMgPSBbcXgsIHF5LCBxel07XG4gIC8vIHZhciB1diA9IHZlYzMuY3Jvc3MoW10sIHF2ZWMsIGEpO1xuXG4gIHZhciB1dnggPSBxeSAqIHogLSBxeiAqIHksXG4gICAgICB1dnkgPSBxeiAqIHggLSBxeCAqIHosXG4gICAgICB1dnogPSBxeCAqIHkgLSBxeSAqIHg7IC8vIHZhciB1dXYgPSB2ZWMzLmNyb3NzKFtdLCBxdmVjLCB1dik7XG5cbiAgdmFyIHV1dnggPSBxeSAqIHV2eiAtIHF6ICogdXZ5LFxuICAgICAgdXV2eSA9IHF6ICogdXZ4IC0gcXggKiB1dnosXG4gICAgICB1dXZ6ID0gcXggKiB1dnkgLSBxeSAqIHV2eDsgLy8gdmVjMy5zY2FsZSh1diwgdXYsIDIgKiB3KTtcblxuICB2YXIgdzIgPSBxdyAqIDI7XG4gIHV2eCAqPSB3MjtcbiAgdXZ5ICo9IHcyO1xuICB1dnogKj0gdzI7IC8vIHZlYzMuc2NhbGUodXV2LCB1dXYsIDIpO1xuXG4gIHV1dnggKj0gMjtcbiAgdXV2eSAqPSAyO1xuICB1dXZ6ICo9IDI7IC8vIHJldHVybiB2ZWMzLmFkZChvdXQsIGEsIHZlYzMuYWRkKG91dCwgdXYsIHV1dikpO1xuXG4gIG91dFswXSA9IHggKyB1dnggKyB1dXZ4O1xuICBvdXRbMV0gPSB5ICsgdXZ5ICsgdXV2eTtcbiAgb3V0WzJdID0geiArIHV2eiArIHV1dno7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHgtYXhpc1xuICogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIFRoZSBhbmdsZSBvZiByb3RhdGlvbiBpbiByYWRpYW5zXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVgob3V0LCBhLCBiLCByYWQpIHtcbiAgdmFyIHAgPSBbXSxcbiAgICAgIHIgPSBbXTsgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuXG4gIHBbMF0gPSBhWzBdIC0gYlswXTtcbiAgcFsxXSA9IGFbMV0gLSBiWzFdO1xuICBwWzJdID0gYVsyXSAtIGJbMl07IC8vcGVyZm9ybSByb3RhdGlvblxuXG4gIHJbMF0gPSBwWzBdO1xuICByWzFdID0gcFsxXSAqIE1hdGguY29zKHJhZCkgLSBwWzJdICogTWF0aC5zaW4ocmFkKTtcbiAgclsyXSA9IHBbMV0gKiBNYXRoLnNpbihyYWQpICsgcFsyXSAqIE1hdGguY29zKHJhZCk7IC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblxuICBvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgb3V0WzFdID0gclsxXSArIGJbMV07XG4gIG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB5LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCBUaGUgYW5nbGUgb2Ygcm90YXRpb24gaW4gcmFkaWFuc1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVZKG91dCwgYSwgYiwgcmFkKSB7XG4gIHZhciBwID0gW10sXG4gICAgICByID0gW107IC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cblxuICBwWzBdID0gYVswXSAtIGJbMF07XG4gIHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgcFsyXSA9IGFbMl0gLSBiWzJdOyAvL3BlcmZvcm0gcm90YXRpb25cblxuICByWzBdID0gcFsyXSAqIE1hdGguc2luKHJhZCkgKyBwWzBdICogTWF0aC5jb3MocmFkKTtcbiAgclsxXSA9IHBbMV07XG4gIHJbMl0gPSBwWzJdICogTWF0aC5jb3MocmFkKSAtIHBbMF0gKiBNYXRoLnNpbihyYWQpOyAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cbiAgb3V0WzBdID0gclswXSArIGJbMF07XG4gIG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgei1heGlzXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIGIsIHJhZCkge1xuICB2YXIgcCA9IFtdLFxuICAgICAgciA9IFtdOyAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG5cbiAgcFswXSA9IGFbMF0gLSBiWzBdO1xuICBwWzFdID0gYVsxXSAtIGJbMV07XG4gIHBbMl0gPSBhWzJdIC0gYlsyXTsgLy9wZXJmb3JtIHJvdGF0aW9uXG5cbiAgclswXSA9IHBbMF0gKiBNYXRoLmNvcyhyYWQpIC0gcFsxXSAqIE1hdGguc2luKHJhZCk7XG4gIHJbMV0gPSBwWzBdICogTWF0aC5zaW4ocmFkKSArIHBbMV0gKiBNYXRoLmNvcyhyYWQpO1xuICByWzJdID0gcFsyXTsgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuXG4gIG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gclsyXSArIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdldCB0aGUgYW5nbGUgYmV0d2VlbiB0d28gM0QgdmVjdG9yc1xuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYW5nbGUoYSwgYikge1xuICB2YXIgYXggPSBhWzBdLFxuICAgICAgYXkgPSBhWzFdLFxuICAgICAgYXogPSBhWzJdLFxuICAgICAgYnggPSBiWzBdLFxuICAgICAgYnkgPSBiWzFdLFxuICAgICAgYnogPSBiWzJdLFxuICAgICAgbWFnMSA9IE1hdGguc3FydChheCAqIGF4ICsgYXkgKiBheSArIGF6ICogYXopLFxuICAgICAgbWFnMiA9IE1hdGguc3FydChieCAqIGJ4ICsgYnkgKiBieSArIGJ6ICogYnopLFxuICAgICAgbWFnID0gbWFnMSAqIG1hZzIsXG4gICAgICBjb3NpbmUgPSBtYWcgJiYgZG90KGEsIGIpIC8gbWFnO1xuICByZXR1cm4gTWF0aC5hY29zKE1hdGgubWluKE1hdGgubWF4KGNvc2luZSwgLTEpLCAxKSk7XG59XG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzMgdG8gemVyb1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8ob3V0KSB7XG4gIG91dFswXSA9IDAuMDtcbiAgb3V0WzFdID0gMC4wO1xuICBvdXRbMl0gPSAwLjA7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHIoYSkge1xuICByZXR1cm4gXCJ2ZWMzKFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIpXCI7XG59XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleGFjdEVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXTtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHZhciBhMCA9IGFbMF0sXG4gICAgICBhMSA9IGFbMV0sXG4gICAgICBhMiA9IGFbMl07XG4gIHZhciBiMCA9IGJbMF0sXG4gICAgICBiMSA9IGJbMV0sXG4gICAgICBiMiA9IGJbMl07XG4gIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKTtcbn1cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnN1YnRyYWN0fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzdWIgPSBzdWJ0cmFjdDtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBtdWwgPSBtdWx0aXBseTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmRpdmlkZX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgZGl2ID0gZGl2aWRlO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuZGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGRpc3QgPSBkaXN0YW5jZTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgc3FyRGlzdCA9IHNxdWFyZWREaXN0YW5jZTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgbGVuID0gbGVuZ3RoO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgc3FyTGVuID0gc3F1YXJlZExlbmd0aDtcbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzNzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzMuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMzcyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGZvckVhY2ggPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB2ZWMgPSBjcmVhdGUoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICB2YXIgaSwgbDtcblxuICAgIGlmICghc3RyaWRlKSB7XG4gICAgICBzdHJpZGUgPSAzO1xuICAgIH1cblxuICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIGlmIChjb3VudCkge1xuICAgICAgbCA9IE1hdGgubWluKGNvdW50ICogc3RyaWRlICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgdmVjWzBdID0gYVtpXTtcbiAgICAgIHZlY1sxXSA9IGFbaSArIDFdO1xuICAgICAgdmVjWzJdID0gYVtpICsgMl07XG4gICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgIGFbaV0gPSB2ZWNbMF07XG4gICAgICBhW2kgKyAxXSA9IHZlY1sxXTtcbiAgICAgIGFbaSArIDJdID0gdmVjWzJdO1xuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9O1xufSgpOyIsCiAgImltcG9ydCAqIGFzIGdsTWF0cml4IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuLyoqXG4gKiA0IERpbWVuc2lvbmFsIFZlY3RvclxuICogQG1vZHVsZSB2ZWM0XG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWM0XG4gKlxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg0KTtcblxuICBpZiAoZ2xNYXRyaXguQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWM0IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDQpO1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICBvdXRbM10gPSBhWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVZhbHVlcyh4LCB5LCB6LCB3KSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg0KTtcbiAgb3V0WzBdID0geDtcbiAgb3V0WzFdID0geTtcbiAgb3V0WzJdID0gejtcbiAgb3V0WzNdID0gdztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzQgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICBvdXRbM10gPSBhWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0IHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0KG91dCwgeCwgeSwgeiwgdykge1xuICBvdXRbMF0gPSB4O1xuICBvdXRbMV0gPSB5O1xuICBvdXRbMl0gPSB6O1xuICBvdXRbM10gPSB3O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gIG91dFszXSA9IGFbM10gKyBiWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAqIGJbMl07XG4gIG91dFszXSA9IGFbM10gKiBiWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXZpZGUob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAvIGJbMl07XG4gIG91dFszXSA9IGFbM10gLyBiWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNYXRoLmNlaWwgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBjZWlsXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNlaWwob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGguY2VpbChhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5jZWlsKGFbMV0pO1xuICBvdXRbMl0gPSBNYXRoLmNlaWwoYVsyXSk7XG4gIG91dFszXSA9IE1hdGguY2VpbChhWzNdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTWF0aC5mbG9vciB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGZsb29yXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZsb29yKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmZsb29yKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICBvdXRbMl0gPSBNYXRoLmZsb29yKGFbMl0pO1xuICBvdXRbM10gPSBNYXRoLmZsb29yKGFbM10pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtaW4ob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gIG91dFszXSA9IE1hdGgubWluKGFbM10sIGJbM10pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtYXgob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5tYXgoYVsyXSwgYlsyXSk7XG4gIG91dFszXSA9IE1hdGgubWF4KGFbM10sIGJbM10pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gcm91bmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gIG91dFsxXSA9IE1hdGgucm91bmQoYVsxXSk7XG4gIG91dFsyXSA9IE1hdGgucm91bmQoYVsyXSk7XG4gIG91dFszXSA9IE1hdGgucm91bmQoYVszXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNjYWxlcyBhIHZlYzQgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYjtcbiAgb3V0WzFdID0gYVsxXSAqIGI7XG4gIG91dFsyXSA9IGFbMl0gKiBiO1xuICBvdXRbM10gPSBhWzNdICogYjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQWRkcyB0d28gdmVjNCdzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZUFuZEFkZChvdXQsIGEsIGIsIHNjYWxlKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdICogc2NhbGU7XG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdICogc2NhbGU7XG4gIG91dFszXSA9IGFbM10gKyBiWzNdICogc2NhbGU7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzdGFuY2UoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICB2YXIgeSA9IGJbMV0gLSBhWzFdO1xuICB2YXIgeiA9IGJbMl0gLSBhWzJdO1xuICB2YXIgdyA9IGJbM10gLSBhWzNdO1xuICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5LCB6LCB3KTtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlZERpc3RhbmNlKGEsIGIpIHtcbiAgdmFyIHggPSBiWzBdIC0gYVswXTtcbiAgdmFyIHkgPSBiWzFdIC0gYVsxXTtcbiAgdmFyIHogPSBiWzJdIC0gYVsyXTtcbiAgdmFyIHcgPSBiWzNdIC0gYVszXTtcbiAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGxlbmd0aChhKSB7XG4gIHZhciB4ID0gYVswXTtcbiAgdmFyIHkgPSBhWzFdO1xuICB2YXIgeiA9IGFbMl07XG4gIHZhciB3ID0gYVszXTtcbiAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSwgeiwgdyk7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlZExlbmd0aChhKSB7XG4gIHZhciB4ID0gYVswXTtcbiAgdmFyIHkgPSBhWzFdO1xuICB2YXIgeiA9IGFbMl07XG4gIHZhciB3ID0gYVszXTtcbiAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xufVxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ2F0ZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gLWFbMF07XG4gIG91dFsxXSA9IC1hWzFdO1xuICBvdXRbMl0gPSAtYVsyXTtcbiAgb3V0WzNdID0gLWFbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBpbnZlcnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgb3V0WzJdID0gMS4wIC8gYVsyXTtcbiAgb3V0WzNdID0gMS4wIC8gYVszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShvdXQsIGEpIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIHZhciB6ID0gYVsyXTtcbiAgdmFyIHcgPSBhWzNdO1xuICB2YXIgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XG5cbiAgaWYgKGxlbiA+IDApIHtcbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gIH1cblxuICBvdXRbMF0gPSB4ICogbGVuO1xuICBvdXRbMV0gPSB5ICogbGVuO1xuICBvdXRbMl0gPSB6ICogbGVuO1xuICBvdXRbM10gPSB3ICogbGVuO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkb3QoYSwgYikge1xuICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdICsgYVszXSAqIGJbM107XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGNyb3NzLXByb2R1Y3Qgb2YgdGhyZWUgdmVjdG9ycyBpbiBhIDQtZGltZW5zaW9uYWwgc3BhY2VcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gcmVzdWx0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gVSB0aGUgZmlyc3QgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gViB0aGUgc2Vjb25kIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IFcgdGhlIHRoaXJkIHZlY3RvclxuICogQHJldHVybnMge3ZlYzR9IHJlc3VsdFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcm9zcyhvdXQsIHUsIHYsIHcpIHtcbiAgdmFyIEEgPSB2WzBdICogd1sxXSAtIHZbMV0gKiB3WzBdLFxuICAgICAgQiA9IHZbMF0gKiB3WzJdIC0gdlsyXSAqIHdbMF0sXG4gICAgICBDID0gdlswXSAqIHdbM10gLSB2WzNdICogd1swXSxcbiAgICAgIEQgPSB2WzFdICogd1syXSAtIHZbMl0gKiB3WzFdLFxuICAgICAgRSA9IHZbMV0gKiB3WzNdIC0gdlszXSAqIHdbMV0sXG4gICAgICBGID0gdlsyXSAqIHdbM10gLSB2WzNdICogd1syXTtcbiAgdmFyIEcgPSB1WzBdO1xuICB2YXIgSCA9IHVbMV07XG4gIHZhciBJID0gdVsyXTtcbiAgdmFyIEogPSB1WzNdO1xuICBvdXRbMF0gPSBIICogRiAtIEkgKiBFICsgSiAqIEQ7XG4gIG91dFsxXSA9IC0oRyAqIEYpICsgSSAqIEMgLSBKICogQjtcbiAgb3V0WzJdID0gRyAqIEUgLSBIICogQyArIEogKiBBO1xuICBvdXRbM10gPSAtKEcgKiBEKSArIEggKiBCIC0gSSAqIEE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVycChvdXQsIGEsIGIsIHQpIHtcbiAgdmFyIGF4ID0gYVswXTtcbiAgdmFyIGF5ID0gYVsxXTtcbiAgdmFyIGF6ID0gYVsyXTtcbiAgdmFyIGF3ID0gYVszXTtcbiAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICBvdXRbMl0gPSBheiArIHQgKiAoYlsyXSAtIGF6KTtcbiAgb3V0WzNdID0gYXcgKyB0ICogKGJbM10gLSBhdyk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbShvdXQsIHNjYWxlKSB7XG4gIHNjYWxlID0gc2NhbGUgfHwgMS4wOyAvLyBNYXJzYWdsaWEsIEdlb3JnZS4gQ2hvb3NpbmcgYSBQb2ludCBmcm9tIHRoZSBTdXJmYWNlIG9mIGFcbiAgLy8gU3BoZXJlLiBBbm4uIE1hdGguIFN0YXRpc3QuIDQzICgxOTcyKSwgbm8uIDIsIDY0NS0tNjQ2LlxuICAvLyBodHRwOi8vcHJvamVjdGV1Y2xpZC5vcmcvZXVjbGlkLmFvbXMvMTE3NzY5MjY0NDtcblxuICB2YXIgdjEsIHYyLCB2MywgdjQ7XG4gIHZhciBzMSwgczI7XG5cbiAgZG8ge1xuICAgIHYxID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyIC0gMTtcbiAgICB2MiA9IGdsTWF0cml4LlJBTkRPTSgpICogMiAtIDE7XG4gICAgczEgPSB2MSAqIHYxICsgdjIgKiB2MjtcbiAgfSB3aGlsZSAoczEgPj0gMSk7XG5cbiAgZG8ge1xuICAgIHYzID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyIC0gMTtcbiAgICB2NCA9IGdsTWF0cml4LlJBTkRPTSgpICogMiAtIDE7XG4gICAgczIgPSB2MyAqIHYzICsgdjQgKiB2NDtcbiAgfSB3aGlsZSAoczIgPj0gMSk7XG5cbiAgdmFyIGQgPSBNYXRoLnNxcnQoKDEgLSBzMSkgLyBzMik7XG4gIG91dFswXSA9IHNjYWxlICogdjE7XG4gIG91dFsxXSA9IHNjYWxlICogdjI7XG4gIG91dFsyXSA9IHNjYWxlICogdjMgKiBkO1xuICBvdXRbM10gPSBzY2FsZSAqIHY0ICogZDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjNCB3aXRoIGEgbWF0NC5cbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQ0KG91dCwgYSwgbSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXSxcbiAgICAgIHogPSBhWzJdLFxuICAgICAgdyA9IGFbM107XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdICogdztcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6ICsgbVsxM10gKiB3O1xuICBvdXRbMl0gPSBtWzJdICogeCArIG1bNl0gKiB5ICsgbVsxMF0gKiB6ICsgbVsxNF0gKiB3O1xuICBvdXRbM10gPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV0gKiB3O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBxdWF0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBxdWF0ZXJuaW9uIHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVF1YXQob3V0LCBhLCBxKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdLFxuICAgICAgeiA9IGFbMl07XG4gIHZhciBxeCA9IHFbMF0sXG4gICAgICBxeSA9IHFbMV0sXG4gICAgICBxeiA9IHFbMl0sXG4gICAgICBxdyA9IHFbM107IC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG5cbiAgdmFyIGl4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5O1xuICB2YXIgaXkgPSBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHo7XG4gIHZhciBpeiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeDtcbiAgdmFyIGl3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogejsgLy8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxuXG4gIG91dFswXSA9IGl4ICogcXcgKyBpdyAqIC1xeCArIGl5ICogLXF6IC0gaXogKiAtcXk7XG4gIG91dFsxXSA9IGl5ICogcXcgKyBpdyAqIC1xeSArIGl6ICogLXF4IC0gaXggKiAtcXo7XG4gIG91dFsyXSA9IGl6ICogcXcgKyBpdyAqIC1xeiArIGl4ICogLXF5IC0gaXkgKiAtcXg7XG4gIG91dFszXSA9IGFbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzQgdG8gemVyb1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8ob3V0KSB7XG4gIG91dFswXSA9IDAuMDtcbiAgb3V0WzFdID0gMC4wO1xuICBvdXRbMl0gPSAwLjA7XG4gIG91dFszXSA9IDAuMDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cihhKSB7XG4gIHJldHVybiBcInZlYzQoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiLCBcIiArIGFbMl0gKyBcIiwgXCIgKyBhWzNdICsgXCIpXCI7XG59XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleGFjdEVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdO1xufVxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgdmFyIGEwID0gYVswXSxcbiAgICAgIGExID0gYVsxXSxcbiAgICAgIGEyID0gYVsyXSxcbiAgICAgIGEzID0gYVszXTtcbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXSxcbiAgICAgIGIyID0gYlsyXSxcbiAgICAgIGIzID0gYlszXTtcbiAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmIE1hdGguYWJzKGEzIC0gYjMpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKTtcbn1cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnN1YnRyYWN0fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzdWIgPSBzdWJ0cmFjdDtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0Lm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBtdWwgPSBtdWx0aXBseTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LmRpdmlkZX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgZGl2ID0gZGl2aWRlO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuZGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGRpc3QgPSBkaXN0YW5jZTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgc3FyRGlzdCA9IHNxdWFyZWREaXN0YW5jZTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0Lmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgbGVuID0gbGVuZ3RoO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgc3FyTGVuID0gc3F1YXJlZExlbmd0aDtcbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzRzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzQuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWM0cyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGZvckVhY2ggPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB2ZWMgPSBjcmVhdGUoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICB2YXIgaSwgbDtcblxuICAgIGlmICghc3RyaWRlKSB7XG4gICAgICBzdHJpZGUgPSA0O1xuICAgIH1cblxuICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIGlmIChjb3VudCkge1xuICAgICAgbCA9IE1hdGgubWluKGNvdW50ICogc3RyaWRlICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgdmVjWzBdID0gYVtpXTtcbiAgICAgIHZlY1sxXSA9IGFbaSArIDFdO1xuICAgICAgdmVjWzJdID0gYVtpICsgMl07XG4gICAgICB2ZWNbM10gPSBhW2kgKyAzXTtcbiAgICAgIGZuKHZlYywgdmVjLCBhcmcpO1xuICAgICAgYVtpXSA9IHZlY1swXTtcbiAgICAgIGFbaSArIDFdID0gdmVjWzFdO1xuICAgICAgYVtpICsgMl0gPSB2ZWNbMl07XG4gICAgICBhW2kgKyAzXSA9IHZlY1szXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfTtcbn0oKTsiLAogICJpbXBvcnQgKiBhcyBnbE1hdHJpeCBmcm9tIFwiLi9jb21tb24uanNcIjtcbi8qKlxuICogMiBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBtb2R1bGUgdmVjMlxuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjMlxuICpcbiAqIEByZXR1cm5zIHt2ZWMyfSBhIG5ldyAyRCB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKCkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMik7XG5cbiAgaWYgKGdsTWF0cml4LkFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMyIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDIpO1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21WYWx1ZXMoeCwgeSkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMik7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWMyIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY29weShvdXQsIGEpIHtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMiB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCB4LCB5KSB7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEFkZHMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRpdmlkZShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNYXRoLmNlaWwgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBjZWlsXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNlaWwob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGguY2VpbChhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5jZWlsKGFbMV0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gZmxvb3JcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZmxvb3Iob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGguZmxvb3IoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguZmxvb3IoYVsxXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbihvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtYXgob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTWF0aC5yb3VuZCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIHJvdW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLnJvdW5kKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLnJvdW5kKGFbMV0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTY2FsZXMgYSB2ZWMyIGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGI7XG4gIG91dFsxXSA9IGFbMV0gKiBiO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBBZGRzIHR3byB2ZWMyJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICB5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiBNYXRoLmh5cG90KHgsIHkpO1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgeSA9IGJbMV0gLSBhWzFdO1xuICByZXR1cm4geCAqIHggKyB5ICogeTtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXTtcbiAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSk7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlZExlbmd0aChhKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdO1xuICByZXR1cm4geCAqIHggKyB5ICogeTtcbn1cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBuZWdhdGUob3V0LCBhKSB7XG4gIG91dFswXSA9IC1hWzBdO1xuICBvdXRbMV0gPSAtYVsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGludmVydFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKG91dCwgYSkge1xuICBvdXRbMF0gPSAxLjAgLyBhWzBdO1xuICBvdXRbMV0gPSAxLjAgLyBhWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKG91dCwgYSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXTtcbiAgdmFyIGxlbiA9IHggKiB4ICsgeSAqIHk7XG5cbiAgaWYgKGxlbiA+IDApIHtcbiAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgfVxuXG4gIG91dFswXSA9IGFbMF0gKiBsZW47XG4gIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRvdChhLCBiKSB7XG4gIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdO1xufVxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gKiBOb3RlIHRoYXQgdGhlIGNyb3NzIHByb2R1Y3QgbXVzdCBieSBkZWZpbml0aW9uIHByb2R1Y2UgYSAzRCB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcm9zcyhvdXQsIGEsIGIpIHtcbiAgdmFyIHogPSBhWzBdICogYlsxXSAtIGFbMV0gKiBiWzBdO1xuICBvdXRbMF0gPSBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSB6O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGxlcnAob3V0LCBhLCBiLCB0KSB7XG4gIHZhciBheCA9IGFbMF0sXG4gICAgICBheSA9IGFbMV07XG4gIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tKG91dCwgc2NhbGUpIHtcbiAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XG4gIHZhciByID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyLjAgKiBNYXRoLlBJO1xuICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHNjYWxlO1xuICBvdXRbMV0gPSBNYXRoLnNpbihyKSAqIHNjYWxlO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MihvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVsyXSAqIHk7XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDJkXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDJkKG91dCwgYSwgbSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXTtcbiAgb3V0WzBdID0gbVswXSAqIHggKyBtWzJdICogeSArIG1bNF07XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHkgKyBtWzVdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQzXG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDMob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdO1xuICBvdXRbMF0gPSBtWzBdICogeCArIG1bM10gKiB5ICsgbVs2XTtcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzRdICogeSArIG1bN107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDRcbiAqIDNyZCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzAnXG4gKiA0dGggdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDQob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXTtcbiAgdmFyIHkgPSBhWzFdO1xuICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVsxMl07XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzEzXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUm90YXRlIGEgMkQgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIFRoZSB2ZWMyIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlKG91dCwgYSwgYiwgcmFkKSB7XG4gIC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgdmFyIHAwID0gYVswXSAtIGJbMF0sXG4gICAgICBwMSA9IGFbMV0gLSBiWzFdLFxuICAgICAgc2luQyA9IE1hdGguc2luKHJhZCksXG4gICAgICBjb3NDID0gTWF0aC5jb3MocmFkKTsgLy9wZXJmb3JtIHJvdGF0aW9uIGFuZCB0cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuXG4gIG91dFswXSA9IHAwICogY29zQyAtIHAxICogc2luQyArIGJbMF07XG4gIG91dFsxXSA9IHAwICogc2luQyArIHAxICogY29zQyArIGJbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdldCB0aGUgYW5nbGUgYmV0d2VlbiB0d28gMkQgdmVjdG9yc1xuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgVGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIFRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYW5nbGUoYSwgYikge1xuICB2YXIgeDEgPSBhWzBdLFxuICAgICAgeTEgPSBhWzFdLFxuICAgICAgeDIgPSBiWzBdLFxuICAgICAgeTIgPSBiWzFdLFxuICAgICAgLy8gbWFnIGlzIHRoZSBwcm9kdWN0IG9mIHRoZSBtYWduaXR1ZGVzIG9mIGEgYW5kIGJcbiAgbWFnID0gTWF0aC5zcXJ0KHgxICogeDEgKyB5MSAqIHkxKSAqIE1hdGguc3FydCh4MiAqIHgyICsgeTIgKiB5MiksXG4gICAgICAvLyBtYWcgJiYuLiBzaG9ydCBjaXJjdWl0cyBpZiBtYWcgPT0gMFxuICBjb3NpbmUgPSBtYWcgJiYgKHgxICogeDIgKyB5MSAqIHkyKSAvIG1hZzsgLy8gTWF0aC5taW4oTWF0aC5tYXgoY29zaW5lLCAtMSksIDEpIGNsYW1wcyB0aGUgY29zaW5lIGJldHdlZW4gLTEgYW5kIDFcblxuICByZXR1cm4gTWF0aC5hY29zKE1hdGgubWluKE1hdGgubWF4KGNvc2luZSwgLTEpLCAxKSk7XG59XG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzIgdG8gemVyb1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8ob3V0KSB7XG4gIG91dFswXSA9IDAuMDtcbiAgb3V0WzFdID0gMC4wO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyKGEpIHtcbiAgcmV0dXJuIFwidmVjMihcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIpXCI7XG59XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgZXhhY3RseSBoYXZlIHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleGFjdEVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV07XG59XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICB2YXIgYTAgPSBhWzBdLFxuICAgICAgYTEgPSBhWzFdO1xuICB2YXIgYjAgPSBiWzBdLFxuICAgICAgYjEgPSBiWzFdO1xuICByZXR1cm4gTWF0aC5hYnMoYTAgLSBiMCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmIE1hdGguYWJzKGExIC0gYjEpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKTtcbn1cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgbGVuID0gbGVuZ3RoO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHN1YiA9IHN1YnRyYWN0O1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIG11bCA9IG11bHRpcGx5O1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuZGl2aWRlfVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBkaXYgPSBkaXZpZGU7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5kaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgZGlzdCA9IGRpc3RhbmNlO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuc3F1YXJlZERpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzcXJEaXN0ID0gc3F1YXJlZERpc3RhbmNlO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgc3FyTGVuID0gc3F1YXJlZExlbmd0aDtcbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzJzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzIuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMycyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGZvckVhY2ggPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB2ZWMgPSBjcmVhdGUoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICB2YXIgaSwgbDtcblxuICAgIGlmICghc3RyaWRlKSB7XG4gICAgICBzdHJpZGUgPSAyO1xuICAgIH1cblxuICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIGlmIChjb3VudCkge1xuICAgICAgbCA9IE1hdGgubWluKGNvdW50ICogc3RyaWRlICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgdmVjWzBdID0gYVtpXTtcbiAgICAgIHZlY1sxXSA9IGFbaSArIDFdO1xuICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICBhW2ldID0gdmVjWzBdO1xuICAgICAgYVtpICsgMV0gPSB2ZWNbMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH07XG59KCk7IiwKICAiaW1wb3J0IHtcbiAgR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLFxuICBHbG9iYWxNb3VzZU1hbmFnZXIsXG4gIEdsb2JhbFRvdWNoTWFuYWdlclxufSBmcm9tICcuLi9icm93c2VyJztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmNvbnN0IEFsbEF4aXNlcyA9IHtcbiAgWDogMCxcbiAgWTogMSxcbiAgWjogMlxufTtcbnR5cGUgQXhpc1R5cGUgPSBrZXlvZiB0eXBlb2YgQWxsQXhpc2VzO1xudHlwZSBDb29yZGluYXRlcyA9IFtBeGlzVHlwZSwgQXhpc1R5cGUsIEF4aXNUeXBlXTtcblxuaW50ZXJmYWNlIElGcmVlRmx5Q29udHJvbGxlckRlZiB7XG4gIHBvc2l0aW9uOiBnbG0udmVjMztcbiAgY29vcmRpbmF0ZXM/OiBDb29yZGluYXRlcztcbiAgdGhldGE6IG51bWJlcjtcbiAgcGhpOiBudW1iZXI7XG4gIG1vdXNlU2Vuc2liaWxpdHk6IG51bWJlcjtcbiAga2V5Ym9hcmRTZW5zaWJpbGl0eTogbnVtYmVyO1xuICB0b3VjaFNlbnNpYmlsaXR5OiBudW1iZXI7XG4gIG1vdmluZ1NwZWVkOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBGcmVlRmx5Q29udHJvbGxlciB7XG4gIHByaXZhdGUgX2lzQWN0aXZhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3RoZXRhOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9waGk6IG51bWJlciA9IDA7XG5cbiAgcHJpdmF0ZSBfbW91c2VTZW5zaWJpbGl0eTogbnVtYmVyO1xuICBwcml2YXRlIF9rZXlib2FyZFNlbnNpYmlsaXR5OiBudW1iZXI7XG4gIHByaXZhdGUgX3RvdWNoU2Vuc2liaWxpdHk6IG51bWJlcjtcbiAgcHJpdmF0ZSBfbW92aW5nU3BlZWQ6IG51bWJlcjtcblxuICBwcml2YXRlIF90b3VjaFdhc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF90b3VjaFN0YXJ0VGltZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfdG91Y2hNb3ZlRm9yd2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2F4aXNJbmRpY2VzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbiAgcHJpdmF0ZSBfcG9zaXRpb24gPSBnbG0udmVjMy5mcm9tVmFsdWVzKDAsIDAsIDApO1xuICBwcml2YXRlIF90YXJnZXQgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDAsIDAsIDApO1xuICBwcml2YXRlIF9mb3J3YXJkQXhpcyA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMSwgMCwgMCk7XG4gIHByaXZhdGUgX2xlZnRBeGlzID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAxKTtcbiAgcHJpdmF0ZSBfdXBBeGlzID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAxLCAwKTtcblxuICBjb25zdHJ1Y3RvcihkZWY6IElGcmVlRmx5Q29udHJvbGxlckRlZikge1xuICAgIHRoaXMuX21vdXNlU2Vuc2liaWxpdHkgPSBkZWYubW91c2VTZW5zaWJpbGl0eTtcbiAgICB0aGlzLl9rZXlib2FyZFNlbnNpYmlsaXR5ID0gZGVmLmtleWJvYXJkU2Vuc2liaWxpdHk7XG4gICAgdGhpcy5fdG91Y2hTZW5zaWJpbGl0eSA9IGRlZi50b3VjaFNlbnNpYmlsaXR5O1xuICAgIHRoaXMuX21vdmluZ1NwZWVkID0gZGVmLm1vdmluZ1NwZWVkO1xuICAgIGdsbS52ZWMzLmNvcHkodGhpcy5fcG9zaXRpb24sIGRlZi5wb3NpdGlvbik7XG5cbiAgICB0aGlzLl9heGlzSW5kaWNlcyA9IFtcbiAgICAgIGRlZi5jb29yZGluYXRlcyA/IEFsbEF4aXNlc1tkZWYuY29vcmRpbmF0ZXNbMF1dIDogQWxsQXhpc2VzLlgsXG4gICAgICBkZWYuY29vcmRpbmF0ZXMgPyBBbGxBeGlzZXNbZGVmLmNvb3JkaW5hdGVzWzFdXSA6IEFsbEF4aXNlcy5ZLFxuICAgICAgZGVmLmNvb3JkaW5hdGVzID8gQWxsQXhpc2VzW2RlZi5jb29yZGluYXRlc1syXV0gOiBBbGxBeGlzZXMuWlxuICAgIF07XG5cbiAgICB0aGlzLl90aGV0YSA9IGRlZi50aGV0YTtcbiAgICB0aGlzLl9waGkgPSBkZWYucGhpO1xuICB9XG5cbiAgaXNBY3RpdmF0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzQWN0aXZhdGVkO1xuICB9XG5cbiAgdXBkYXRlKGRlbHRhTXNUaW1lOiBudW1iZXIpIHtcbiAgICBsZXQgbW92ZUZvcndhcmQgPSBmYWxzZTtcbiAgICBsZXQgbW92ZUJhY2t3YXJkID0gZmFsc2U7XG4gICAgbGV0IHN0cmFmZUxlZnQgPSBmYWxzZTtcbiAgICBsZXQgc3RyYWZlUmlnaHQgPSBmYWxzZTtcbiAgICBsZXQgaXNSdW5uaW5nID0gZmFsc2U7XG4gICAgbGV0IGlzRGl2aW5nID0gZmFsc2U7XG4gICAgbGV0IGlzUmlzaW5nID0gZmFsc2U7XG4gICAgbGV0IGxvb2tEZWx0YVggPSAwO1xuICAgIGxldCBsb29rRGVsdGFZID0gMDtcblxuICAgIC8vXG4gICAgLy8gbW91c2VcbiAgICAvL1xuXG4gICAgY29uc3QgdG9SYWRpYW5zID0gTWF0aC5QSSAvIDE4MDtcblxuICAgIHtcbiAgICAgIGNvbnN0IGRlbHRhWCA9IEdsb2JhbE1vdXNlTWFuYWdlci5kZWx0YVgoKSAqIHRoaXMuX21vdXNlU2Vuc2liaWxpdHk7XG4gICAgICBjb25zdCBkZWx0YVkgPSBHbG9iYWxNb3VzZU1hbmFnZXIuZGVsdGFZKCkgKiB0aGlzLl9tb3VzZVNlbnNpYmlsaXR5O1xuXG4gICAgICBsb29rRGVsdGFYIC09IGRlbHRhWCAqIHRvUmFkaWFucyAqIGRlbHRhTXNUaW1lO1xuICAgICAgbG9va0RlbHRhWSAtPSBkZWx0YVkgKiB0b1JhZGlhbnMgKiBkZWx0YU1zVGltZTtcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIG1vdXNlXG4gICAgLy9cblxuICAgIC8vXG4gICAgLy8gdG91Y2hcbiAgICAvL1xuXG4gICAgY29uc3QgaXNUb3VjaGVkID0gR2xvYmFsVG91Y2hNYW5hZ2VyLmdldFRvdWNoRGF0YSgpLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoaXNUb3VjaGVkKSB7XG4gICAgICBpZiAoIXRoaXMuX3RvdWNoV2FzQWN0aXZlKSB7XG4gICAgICAgIGNvbnN0IGN1cnJUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IChjdXJyVGltZSAtIHRoaXMuX3RvdWNoU3RhcnRUaW1lKSAvIDEwMDA7XG4gICAgICAgIGlmIChlbGFwc2VkIDwgMC4yNSkge1xuICAgICAgICAgIHRoaXMuX3RvdWNoTW92ZUZvcndhcmQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3RvdWNoU3RhcnRUaW1lID0gY3VyclRpbWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlyc3RUb3VjaCA9IEdsb2JhbFRvdWNoTWFuYWdlci5nZXRUb3VjaERhdGEoKVswXTtcblxuICAgICAgY29uc3QgZGVsdGFYID0gZmlyc3RUb3VjaC5kZWx0YVggKiB0aGlzLl90b3VjaFNlbnNpYmlsaXR5O1xuICAgICAgY29uc3QgZGVsdGFZID0gZmlyc3RUb3VjaC5kZWx0YVkgKiB0aGlzLl90b3VjaFNlbnNpYmlsaXR5O1xuXG4gICAgICBsb29rRGVsdGFYIC09IGRlbHRhWCAqIHRvUmFkaWFucyAqIGRlbHRhTXNUaW1lO1xuICAgICAgbG9va0RlbHRhWSAtPSBkZWx0YVkgKiB0b1JhZGlhbnMgKiBkZWx0YU1zVGltZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdG91Y2hNb3ZlRm9yd2FyZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuX3RvdWNoV2FzQWN0aXZlID0gaXNUb3VjaGVkO1xuXG4gICAgaWYgKHRoaXMuX3RvdWNoTW92ZUZvcndhcmQpIHtcbiAgICAgIG1vdmVGb3J3YXJkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIHRvdWNoXG4gICAgLy9cblxuICAgIC8vXG4gICAgLy8ga2V5Ym9hcmRcbiAgICAvL1xuXG4gICAgLy8gZm9yd2FyZFxuICAgIGlmIChHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdaJywgJ1cnKSkge1xuICAgICAgbW92ZUZvcndhcmQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGJhY2t3YXJkXG4gICAgaWYgKEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ1MnKSkge1xuICAgICAgbW92ZUJhY2t3YXJkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBzdHJhZmUgbGVmdFxuICAgIGlmIChHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBJywgJ1EnKSkge1xuICAgICAgc3RyYWZlTGVmdCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gc3RyYWZlIHJpZ2h0XG4gICAgaWYgKEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0QnKSkge1xuICAgICAgc3RyYWZlUmlnaHQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHJ1blxuICAgIGlmIChHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdTaGlmdCcpKSB7XG4gICAgICBpc1J1bm5pbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGRpdmVcbiAgICBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQycpKSB7XG4gICAgICBpc0RpdmluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gcmlzZVxuICAgIGlmIChHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdTcGFjZScpKSB7XG4gICAgICBpc1Jpc2luZyA9IHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudExpbmVhclNwZWVkID0gKHRoaXMuX21vdmluZ1NwZWVkICogKGlzUnVubmluZyA/IDQgOiAxKSkgKiBkZWx0YU1zVGltZTtcblxuICAgIGNvbnN0IHNjYWxlZEZvcndhcmQgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDAsIDAsIDApO1xuICAgIGdsbS52ZWMzLnNjYWxlKHNjYWxlZEZvcndhcmQsIHRoaXMuX2ZvcndhcmRBeGlzLCBjdXJyZW50TGluZWFyU3BlZWQpO1xuICAgIGNvbnN0IHNjYWxlZExlZnQgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDAsIDAsIDApO1xuICAgIGdsbS52ZWMzLnNjYWxlKHNjYWxlZExlZnQsIHRoaXMuX2xlZnRBeGlzLCBjdXJyZW50TGluZWFyU3BlZWQpO1xuICAgIGNvbnN0IHNjYWxlZFVwID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcbiAgICBnbG0udmVjMy5zY2FsZShzY2FsZWRVcCwgdGhpcy5fdXBBeGlzLCBjdXJyZW50TGluZWFyU3BlZWQpO1xuXG5cbiAgICAvL1xuICAgIC8vXG5cbiAgICBjb25zdCBjdXJyZW50QW5ndWxhclNwZWVkID0gdGhpcy5fa2V5Ym9hcmRTZW5zaWJpbGl0eSAqIGRlbHRhTXNUaW1lO1xuXG4gICAgaWYgKEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0Fycm93VXAnKSkge1xuICAgICAgbG9va0RlbHRhWSArPSBjdXJyZW50QW5ndWxhclNwZWVkO1xuICAgIH0gZWxzZSBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQXJyb3dEb3duJykpIHtcbiAgICAgIGxvb2tEZWx0YVkgLT0gY3VycmVudEFuZ3VsYXJTcGVlZDtcbiAgICB9XG5cbiAgICBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQXJyb3dMZWZ0JykpIHtcbiAgICAgIGxvb2tEZWx0YVggKz0gY3VycmVudEFuZ3VsYXJTcGVlZDtcbiAgICB9IGVsc2UgaWYgKEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0Fycm93UmlnaHQnKSkge1xuICAgICAgbG9va0RlbHRhWCAtPSBjdXJyZW50QW5ndWxhclNwZWVkO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8ga2V5Ym9hcmRcbiAgICAvL1xuXG4gICAgLy9cbiAgICAvLyBpbnRlcm5hbHNcbiAgICAvL1xuXG4gICAgdGhpcy5fdGhldGEgKz0gbG9va0RlbHRhWDtcbiAgICB0aGlzLl9waGkgKz0gbG9va0RlbHRhWTtcblxuICAgIGNvbnN0IGhQaSA9IE1hdGguUEkgKiAwLjU7XG4gICAgY29uc3QgdmVydGljYWxMaW1pdCA9IGhQaSAqIDAuOTU7XG5cbiAgICB0aGlzLl9waGkgPSBNYXRoLm1pbihNYXRoLm1heCh0aGlzLl9waGksIC12ZXJ0aWNhbExpbWl0KSwgK3ZlcnRpY2FsTGltaXQpO1xuXG4gICAgY29uc3QgY29zVGhldGEgPSBNYXRoLmNvcyh0aGlzLl90aGV0YSk7XG4gICAgY29uc3Qgc2luVGhldGEgPSBNYXRoLnNpbih0aGlzLl90aGV0YSk7XG5cbiAgICBjb25zdCBbYXhpc1gsIGF4aXNZLCBheGlzWl0gPSB0aGlzLl9heGlzSW5kaWNlcztcblxuICAgIGNvbnN0IHVwUmFkaXVzID0gTWF0aC5jb3ModGhpcy5fcGhpICsgaFBpKTtcbiAgICB0aGlzLl91cEF4aXNbYXhpc1hdID0gdXBSYWRpdXMgKiBjb3NUaGV0YTtcbiAgICB0aGlzLl91cEF4aXNbYXhpc1ldID0gdXBSYWRpdXMgKiBzaW5UaGV0YTtcbiAgICB0aGlzLl91cEF4aXNbYXhpc1pdID0gTWF0aC5zaW4odGhpcy5fcGhpICsgaFBpKTtcblxuICAgIGNvbnN0IGZvcndhcmRSYWRpdXMgPSBNYXRoLmNvcyh0aGlzLl9waGkpO1xuICAgIHRoaXMuX2ZvcndhcmRBeGlzW2F4aXNYXSA9IGZvcndhcmRSYWRpdXMgKiBjb3NUaGV0YTtcbiAgICB0aGlzLl9mb3J3YXJkQXhpc1theGlzWV0gPSBmb3J3YXJkUmFkaXVzICogc2luVGhldGE7XG4gICAgdGhpcy5fZm9yd2FyZEF4aXNbYXhpc1pdID0gTWF0aC5zaW4odGhpcy5fcGhpKTtcblxuICAgIGdsbS52ZWMzLmNyb3NzKHRoaXMuX2xlZnRBeGlzLCB0aGlzLl91cEF4aXMsIHRoaXMuX2ZvcndhcmRBeGlzKTtcblxuICAgIGlmIChtb3ZlRm9yd2FyZCkge1xuICAgICAgZ2xtLnZlYzMuYWRkKHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9wb3NpdGlvbiwgc2NhbGVkRm9yd2FyZCk7XG4gICAgfSBlbHNlIGlmIChtb3ZlQmFja3dhcmQpIHtcbiAgICAgIGdsbS52ZWMzLnN1Yih0aGlzLl9wb3NpdGlvbiwgdGhpcy5fcG9zaXRpb24sIHNjYWxlZEZvcndhcmQpO1xuICAgIH1cblxuICAgIGlmIChzdHJhZmVMZWZ0KSB7XG4gICAgICBnbG0udmVjMy5hZGQodGhpcy5fcG9zaXRpb24sIHRoaXMuX3Bvc2l0aW9uLCBzY2FsZWRMZWZ0KTtcbiAgICB9IGVsc2UgaWYgKHN0cmFmZVJpZ2h0KSB7XG4gICAgICBnbG0udmVjMy5zdWIodGhpcy5fcG9zaXRpb24sIHRoaXMuX3Bvc2l0aW9uLCBzY2FsZWRMZWZ0KTtcbiAgICB9XG5cbiAgICBpZiAoaXNSaXNpbmcpIHtcbiAgICAgIGdsbS52ZWMzLmFkZCh0aGlzLl9wb3NpdGlvbiwgdGhpcy5fcG9zaXRpb24sIHNjYWxlZFVwKTtcbiAgICB9IGVsc2UgaWYgKGlzRGl2aW5nKSB7XG4gICAgICBnbG0udmVjMy5zdWIodGhpcy5fcG9zaXRpb24sIHRoaXMuX3Bvc2l0aW9uLCBzY2FsZWRVcCk7XG4gICAgfVxuXG4gICAgZ2xtLnZlYzMuYWRkKHRoaXMuX3RhcmdldCwgdGhpcy5fcG9zaXRpb24sIHRoaXMuX2ZvcndhcmRBeGlzKTtcblxuICAgIC8vXG4gICAgLy8gaW50ZXJuYWxzXG4gICAgLy9cbiAgfVxuXG4gIGdldFBvc2l0aW9uKCk6IGdsbS5SZWFkb25seVZlYzMge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKGluUG9zOiBnbG0uUmVhZG9ubHlWZWMzKSB7XG4gICAgZ2xtLnZlYzMuY29weSh0aGlzLl9wb3NpdGlvbiwgaW5Qb3MpO1xuICB9XG5cbiAgZ2V0VGFyZ2V0KCk6IGdsbS5SZWFkb25seVZlYzMge1xuICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gIH1cblxuICBnZXRVcEF4aXMoKTogZ2xtLlJlYWRvbmx5VmVjMyB7XG4gICAgcmV0dXJuIHRoaXMuX3VwQXhpcztcbiAgfVxuXG4gIGdldFRoZXRhKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RoZXRhO1xuICB9XG5cbiAgZ2V0UGhpKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BoaTtcbiAgfVxuXG4gIGdldFRvdWNoTW92ZUZvcndhcmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdWNoTW92ZUZvcndhcmQ7XG4gIH1cbn1cbiIsCiAgIlxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbi8vIExldCBFUFMgKGVwc2lsb24pIGJlIGEgc21hbGwgdmFsdWVcbmNvbnN0IEVQUyA9IDAuMDAwMDAwMTtcblxuLy8gRHVlIHRvIGRvdWJsZSByb3VuZGluZyBwcmVjaXNpb24gdGhlIHZhbHVlIHBhc3NlZCBpbnRvIHRoZSBNYXRoLmFjb3Ncbi8vIGZ1bmN0aW9uIG1heSBiZSBvdXRzaWRlIGl0cyBkb21haW4gb2YgWy0xLCArMV0gd2hpY2ggd291bGQgcmV0dXJuXG4vLyB0aGUgdmFsdWUgTmFOIHdoaWNoIHdlIGRvIG5vdCB3YW50LlxuY29uc3QgX3NhZmVBY29zID0gKHg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIGlmICh4ID49ICsxLjApXG4gICAgcmV0dXJuIDAuMDtcbiAgaWYgKHggPD0gLTEuMClcbiAgICByZXR1cm4gTWF0aC5QSTtcbiAgcmV0dXJuIE1hdGguYWNvcyh4KTtcbn1cblxuLy8gUm90YXRlcyBhIHBvaW50IGFib3V0IGEgZml4ZWQgcG9pbnQgYXQgc29tZSBhbmdsZSAnYSdcbmNvbnN0IF9yb3RhdGVQb2ludCA9IChmcDogZ2xtLlJlYWRvbmx5VmVjMiwgcHQ6IGdsbS5SZWFkb25seVZlYzIsIGE6IG51bWJlcik6IGdsbS52ZWMyID0+IHtcbiAgY29uc3QgeCA9IHB0WzBdIC0gZnBbMF07XG4gIGNvbnN0IHkgPSBwdFsxXSAtIGZwWzFdO1xuICBjb25zdCB4Um90ID0geCAqIE1hdGguY29zKGEpICsgeSAqIE1hdGguc2luKGEpO1xuICBjb25zdCB5Um90ID0geSAqIE1hdGguY29zKGEpIC0geCAqIE1hdGguc2luKGEpO1xuICByZXR1cm4gZ2xtLnZlYzIuZnJvbVZhbHVlcyhmcFswXSArIHhSb3QsIGZwWzFdICsgeVJvdCk7XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJQ2lyY2xlIHtcbiAgY2VudGVyOiBnbG0uUmVhZG9ubHlWZWMyO1xuICByYWRpdXM6IG51bWJlcjtcbn07XG5cbi8vIEdpdmVuIHR3byBjaXJjbGVzIHRoaXMgbWV0aG9kIGZpbmRzIHRoZSBpbnRlcnNlY3Rpb25cbi8vIHBvaW50KHMpIG9mIHRoZSB0d28gY2lyY2xlcyAoaWYgYW55IGV4aXN0cylcbi8qKlxuICogICAgICAgICAgX19fX19cbiAqICAgICAgICAgLyAgICAgXFxcbiAqICAgICAgICAvICAgICAgIFxcXG4gKiAgICAgICAvICAgICAgICAgXFxcbiAqICAgICAgfCAgICAgIEMxICAgfFxuICogICAgICB8ICAgICAqICAgICB8XG4gKiAgICAgIHwgICBfX19fXyAgIHxcbiAqICAgICAgIFxcIC8gICAgIFxcIC9cbiAqIHB0MSAtPiB4ICAgICAgIHggPC0gcHQyXG4gKiAgICAgICAvIFxcX19fX18vIFxcXG4gKiAgICAgIHwgICAgICAgICAgIHxcbiAqICAgICAgfCAgICAgKiAgICAgfFxuICogICAgICB8ICAgICAgQzIgICB8XG4gKiAgICAgICBcXCAgICAgICAgIC9cbiAqICAgICAgICBcXCAgICAgICAvXG4gKiAgICAgICAgIFxcX19fX18vXG4gKlxuICovXG5leHBvcnQgY29uc3QgY2lyY2xlQ2lyY2xlSW50ZXJzZWN0aW9uUG9pbnRzID0gKGMxOiBSZWFkb25seTxJQ2lyY2xlPiwgYzI6IFJlYWRvbmx5PElDaXJjbGU+KTogW2dsbS52ZWMyLCBnbG0udmVjMl0gfCBbZ2xtLnZlYzJdIHwgdW5kZWZpbmVkID0+IHtcblxuICBsZXQgcjE6IG51bWJlciwgUjI6IG51bWJlciwgZDogbnVtYmVyLCBkeDogbnVtYmVyLCBkeTogbnVtYmVyLCBjMXg6IG51bWJlciwgYzF5OiBudW1iZXIsIEMyeDogbnVtYmVyLCBDMnk6IG51bWJlcjtcblxuICBpZiAoYzEucmFkaXVzIDwgYzIucmFkaXVzKSB7XG4gICAgcjEgPSBjMS5yYWRpdXM7XG4gICAgUjIgPSBjMi5yYWRpdXM7XG4gICAgYzF4ID0gYzEuY2VudGVyWzBdO1xuICAgIGMxeSA9IGMxLmNlbnRlclsxXTtcbiAgICBDMnggPSBjMi5jZW50ZXJbMF07XG4gICAgQzJ5ID0gYzIuY2VudGVyWzFdO1xuICB9IGVsc2Uge1xuICAgIHIxID0gYzIucmFkaXVzO1xuICAgIFIyID0gYzEucmFkaXVzO1xuICAgIEMyeCA9IGMxLmNlbnRlclswXTtcbiAgICBDMnkgPSBjMS5jZW50ZXJbMV07XG4gICAgYzF4ID0gYzIuY2VudGVyWzBdO1xuICAgIGMxeSA9IGMyLmNlbnRlclsxXTtcbiAgfVxuXG4gIC8vIENvbXB1dGUgdGhlIHZlY3RvciA8ZHgsIGR5PlxuICBkeCA9IGMxeCAtIEMyeDtcbiAgZHkgPSBjMXkgLSBDMnk7XG5cbiAgLy8gRmluZCB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzLlxuICBkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICAvLyBUaGVyZSBhcmUgYW4gaW5maW5pdGUgbnVtYmVyIG9mIHNvbHV0aW9uc1xuICAvLyBTZWVtcyBhcHByb3ByaWF0ZSB0byBhbHNvIHJldHVybiBudWxsXG4gIGlmIChkIDwgRVBTICYmIE1hdGguYWJzKFIyIC0gcjEpIDwgRVBTKVxuICAgIHJldHVybjtcblxuICAvLyBObyBpbnRlcnNlY3Rpb24gKGNpcmNsZXMgY2VudGVyZWQgYXQgdGhlXG4gIC8vIHNhbWUgcGxhY2Ugd2l0aCBkaWZmZXJlbnQgc2l6ZSlcbiAgaWYgKGQgPCBFUFMpXG4gICAgcmV0dXJuO1xuXG4gIGNvbnN0IHggPSAoZHggLyBkKSAqIFIyICsgQzJ4O1xuICBjb25zdCB5ID0gKGR5IC8gZCkgKiBSMiArIEMyeTtcbiAgY29uc3QgUCA9IGdsbS52ZWMyLmZyb21WYWx1ZXMoeCwgeSk7XG5cbiAgLy8gU2luZ2xlIGludGVyc2VjdGlvbiAoa2lzc2luZyBjaXJjbGVzKVxuICBpZiAoTWF0aC5hYnMoKFIyICsgcjEpIC0gZCkgPCBFUFMgfHwgTWF0aC5hYnMoUjIgLSAocjEgKyBkKSkgPCBFUFMpIHtcbiAgICByZXR1cm4gW1BdO1xuICB9XG5cbiAgLy8gTm8gaW50ZXJzZWN0aW9uLiBFaXRoZXIgdGhlIHNtYWxsIGNpcmNsZSBjb250YWluZWQgd2l0aGluXG4gIC8vIGJpZyBjaXJjbGUgb3IgY2lyY2xlcyBhcmUgc2ltcGx5IGRpc2pvaW50LlxuICBpZiAoKGQgKyByMSkgPCBSMiB8fCAoUjIgKyByMSA8IGQpKVxuICAgIHJldHVybjtcblxuICBjb25zdCBDID0gZ2xtLnZlYzIuZnJvbVZhbHVlcyhDMngsIEMyeSk7XG4gIGNvbnN0IGFuZ2xlID0gX3NhZmVBY29zKChyMSAqIHIxIC0gZCAqIGQgLSBSMiAqIFIyKSAvICgtMi4wICogZCAqIFIyKSk7XG4gIGNvbnN0IHB0MSA9IF9yb3RhdGVQb2ludChDLCBQLCArYW5nbGUpO1xuICBjb25zdCBwdDIgPSBfcm90YXRlUG9pbnQoQywgUCwgLWFuZ2xlKTtcblxuICByZXR1cm4gW3B0MSwgcHQyXTtcbn1cbiIsCiAgIlxuaW1wb3J0IHtJQ2lyY2xlLCBjaXJjbGVDaXJjbGVJbnRlcnNlY3Rpb25Qb2ludHN9IGZyb20gXCIuL2NpcmNsZUNpcmNsZUludGVyc2VjdGlvblBvaW50c1wiXG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5pbnRlcmZhY2UgUXVhdEF4aXMge1xuICBheGlzOiBnbG0uUmVhZG9ubHlWZWMzO1xuICBhbmdsZTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBMaW1iRGF0YVJlc3VsdEpvaW50IHtcbiAgbG9jYWxQb3M6IGdsbS52ZWMzO1xuICBwcmltYXJ5UGl0Y2g6IG51bWJlcjtcbiAgc2Vjb25kYXJ5UGl0Y2g6IG51bWJlcjtcbiAgcHJpbWFyeVF1YXRBeGlzOiBRdWF0QXhpcztcbiAgc2Vjb25kYXJ5UXVhdEF4aXM6IFF1YXRBeGlzO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJTGltYkRhdGFSZXN1bHQge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBiYXNlTWF0NDogZ2xtLm1hdDQ7XG4gIHByaW1hcnlRdWF0QXhpc2VzOiBbUXVhdEF4aXMsIFF1YXRBeGlzXTtcbiAgam9pbnRBOiBMaW1iRGF0YVJlc3VsdEpvaW50O1xuICBqb2ludEI6IExpbWJEYXRhUmVzdWx0Sm9pbnQ7XG4gIGxvY2FsVGFyZ2V0OiBnbG0udmVjMztcbn07XG5cbi8vIGNvbnN0IF9sZXJwRmxvYXQgPSAodmFsQTogbnVtYmVyLCB2YWxCOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpID0+IHZhbEEgKyAodmFsQiAtIHZhbEEpICogcmF0aW87XG4vLyBjb25zdCBfbGVycE1hdDQgPSAob3V0OiBnbG0ubWF0NCwgdmFsQTogZ2xtLlJlYWRvbmx5TWF0NCwgdmFsQjogZ2xtLlJlYWRvbmx5TWF0NCwgcmF0aW86IG51bWJlcikgPT4ge1xuLy8gICByZXR1cm4gZ2xtLm1hdDQuYWRkKG91dCwgdmFsQSwgZ2xtLm1hdDQubXVsdGlwbHlTY2FsYXIob3V0LCBnbG0ubWF0NC5zdWIob3V0LCB2YWxCLCB2YWxBKSwgcmF0aW8pKTtcbi8vIH1cblxuLy8gZXhwb3J0IGNvbnN0IGludGVycG9sYXRlTGltYkRhdGFSZXN1bHQgPSAob3V0UmVzOiBJTGltYkRhdGFSZXN1bHQsIHJlc0E6IFJlYWRvbmx5PElMaW1iRGF0YVJlc3VsdD4sIHJlc0I6IFJlYWRvbmx5PElMaW1iRGF0YVJlc3VsdD4sIHJhdGlvOiBudW1iZXIpOiB2b2lkID0+IHtcblxuLy8gICBvdXRSZXMuYmFzZU1hdDQgPSAgX2xlcnBNYXQ0KG91dFJlcy5iYXNlTWF0NCwgcmVzQS5iYXNlTWF0NCwgcmVzQi5iYXNlTWF0NCwgcmF0aW8pO1xuLy8gICBvdXRSZXMubG9jYWxUYXJnZXQgPSBnbG0udmVjMy5sZXJwKG91dFJlcy5sb2NhbFRhcmdldCwgcmVzQS5sb2NhbFRhcmdldCwgcmVzQi5sb2NhbFRhcmdldCwgcmF0aW8pO1xuXG4vLyAgIG91dFJlcy5qb2ludEEubG9jYWxQb3MgPSBnbG0udmVjMy5sZXJwKG91dFJlcy5sb2NhbFRhcmdldCwgcmVzQS5qb2ludEEubG9jYWxQb3MsIHJlc0Iuam9pbnRBLmxvY2FsUG9zLCByYXRpbyk7XG4vLyAgIG91dFJlcy5qb2ludEEucHJpbWFyeVBpdGNoID0gX2xlcnBGbG9hdChyZXNBLmpvaW50QS5wcmltYXJ5UGl0Y2gsIHJlc0Iuam9pbnRBLnByaW1hcnlQaXRjaCwgcmF0aW8pO1xuLy8gICBvdXRSZXMuam9pbnRBLnNlY29uZGFyeVBpdGNoID0gX2xlcnBGbG9hdChyZXNBLmpvaW50QS5zZWNvbmRhcnlQaXRjaCwgcmVzQi5qb2ludEEuc2Vjb25kYXJ5UGl0Y2gsIHJhdGlvKTtcblxuLy8gICBvdXRSZXMuam9pbnRCLmxvY2FsUG9zID0gZ2xtLnZlYzMubGVycChvdXRSZXMubG9jYWxUYXJnZXQsIHJlc0Euam9pbnRCLmxvY2FsUG9zLCByZXNCLmpvaW50Qi5sb2NhbFBvcywgcmF0aW8pO1xuLy8gICBvdXRSZXMuam9pbnRCLnByaW1hcnlQaXRjaCA9IF9sZXJwRmxvYXQocmVzQS5qb2ludEIucHJpbWFyeVBpdGNoLCByZXNCLmpvaW50Qi5wcmltYXJ5UGl0Y2gsIHJhdGlvKTtcbi8vICAgb3V0UmVzLmpvaW50Qi5zZWNvbmRhcnlQaXRjaCA9IF9sZXJwRmxvYXQocmVzQS5qb2ludEIuc2Vjb25kYXJ5UGl0Y2gsIHJlc0Iuam9pbnRCLnNlY29uZGFyeVBpdGNoLCByYXRpbyk7XG5cbi8vIH07XG5cbmV4cG9ydCBjbGFzcyBMaW1iRGF0YSB7XG5cbiAgcHVibGljIHJvb3RNYXQ0OiBnbG0ubWF0NDtcbiAgcHVibGljIHByaW1hcnlMZW5ndGg6IG51bWJlcjtcbiAgcHVibGljIHNlY29uZGFyeUxlbmd0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJvb3RNYXQ0OiBnbG0ubWF0NCxcbiAgICBwcmltYXJ5TGVuZ3RoOiBudW1iZXIsXG4gICAgc2Vjb25kYXJ5TGVuZ3RoOiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMucm9vdE1hdDQgPSByb290TWF0NDtcbiAgICB0aGlzLnByaW1hcnlMZW5ndGggPSBwcmltYXJ5TGVuZ3RoO1xuICAgIHRoaXMuc2Vjb25kYXJ5TGVuZ3RoID0gc2Vjb25kYXJ5TGVuZ3RoO1xuICB9XG5cbiAgY29tcHV0ZUlrX2ZpeGVkWWF3KFxuICAgIGluV29ybGRUYXJnZXQ6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Xb3JsZEZvcndhcmQ6IGdsbS5SZWFkb25seVZlYzMsXG4gICk6IElMaW1iRGF0YVJlc3VsdCB8IHVuZGVmaW5lZCB7XG5cbiAgICBjb25zdCBpbnZSb290TWF0NDogZ2xtLlJlYWRvbmx5TWF0NCA9IGdsbS5tYXQ0LmludmVydChnbG0ubWF0NC5jcmVhdGUoKSwgdGhpcy5yb290TWF0NCk7XG4gICAgY29uc3QgcmF3TG9jYWxUYXJnZXQ6IGdsbS5SZWFkb25seVZlYzMgPSBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KGdsbS52ZWMzLmNyZWF0ZSgpLCBpbldvcmxkVGFyZ2V0LCBpbnZSb290TWF0NCk7XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG5cbiAgICBjb25zdCByYXdMb2NhbEZvcndhcmQ6IGdsbS5SZWFkb25seVZlYzMgPSBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KGdsbS52ZWMzLmNyZWF0ZSgpLCBpbldvcmxkRm9yd2FyZCwgaW52Um9vdE1hdDQpO1xuICAgIC8vIGNvbnN0IHJhd0xvY2FsRm9yd2FyZDogZ2xtLlJlYWRvbmx5VmVjMyA9IGluV29ybGRGb3J3YXJkO1xuXG4gICAgY29uc3QgcHJpbWFyeVlhdyA9IE1hdGguYXRhbjIocmF3TG9jYWxGb3J3YXJkWzFdLCByYXdMb2NhbEZvcndhcmRbMF0pO1xuXG4gICAgY29uc3QgdG1wWWF3QWxpZ25lZE1hdDQgPSBnbG0ubWF0NC5pZGVudGl0eShnbG0ubWF0NC5jcmVhdGUoKSk7XG4gICAgZ2xtLm1hdDQucm90YXRlKHRtcFlhd0FsaWduZWRNYXQ0LCB0bXBZYXdBbGlnbmVkTWF0NCwgcHJpbWFyeVlhdywgWzAsMCwxXSk7XG4gICAgY29uc3QgdG1wUm9sbFRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyA9IGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQoZ2xtLnZlYzMuY3JlYXRlKCksIHJhd0xvY2FsVGFyZ2V0LCBnbG0ubWF0NC5pbnZlcnQodG1wWWF3QWxpZ25lZE1hdDQsIHRtcFlhd0FsaWduZWRNYXQ0KSk7XG5cbiAgICBjb25zdCBwcmltYXJ5Um9sbCA9IE1hdGguYXRhbjIodG1wUm9sbFRhcmdldFsxXSwgLXRtcFJvbGxUYXJnZXRbMl0pO1xuXG4gICAgY29uc3QgcmVzdWx0OiBJTGltYkRhdGFSZXN1bHQgPSB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGJhc2VNYXQ0OiBnbG0ubWF0NC5pZGVudGl0eShnbG0ubWF0NC5jcmVhdGUoKSksXG4gICAgICBwcmltYXJ5UXVhdEF4aXNlczogW1xuICAgICAgICB7YXhpczogWzAsMCwxXSwgYW5nbGU6IHByaW1hcnlZYXd9LFxuICAgICAgICB7YXhpczogWzEsMCwwXSwgYW5nbGU6IHByaW1hcnlSb2xsfSxcbiAgICAgIF0sXG4gICAgICBqb2ludEE6IHtcbiAgICAgICAgbG9jYWxQb3M6IGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgICBwcmltYXJ5UGl0Y2g6IDAsXG4gICAgICAgIHNlY29uZGFyeVBpdGNoOiAwLFxuICAgICAgICBwcmltYXJ5UXVhdEF4aXM6IHsgYXhpczogWzAsMSwwXSwgYW5nbGU6IDAgfSxcbiAgICAgICAgc2Vjb25kYXJ5UXVhdEF4aXM6IHsgYXhpczogWzAsMSwwXSwgYW5nbGU6IDAgfSxcbiAgICAgIH0sXG4gICAgICBqb2ludEI6IHtcbiAgICAgICAgbG9jYWxQb3M6IGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgICBwcmltYXJ5UGl0Y2g6IDAsXG4gICAgICAgIHNlY29uZGFyeVBpdGNoOiAwLFxuICAgICAgICBwcmltYXJ5UXVhdEF4aXM6IHsgYXhpczogWzAsMSwwXSwgYW5nbGU6IDAgfSxcbiAgICAgICAgc2Vjb25kYXJ5UXVhdEF4aXM6IHsgYXhpczogWzAsMSwwXSwgYW5nbGU6IDAgfSxcbiAgICAgIH0sXG4gICAgICBsb2NhbFRhcmdldDogZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgfTtcblxuICAgIGdsbS5tYXQ0LnJvdGF0ZShyZXN1bHQuYmFzZU1hdDQsIHJlc3VsdC5iYXNlTWF0NCwgcHJpbWFyeVlhdywgWzAsMCwxXSk7XG4gICAgZ2xtLm1hdDQucm90YXRlKHJlc3VsdC5iYXNlTWF0NCwgcmVzdWx0LmJhc2VNYXQ0LCBwcmltYXJ5Um9sbCwgWzEsMCwwXSk7XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG5cbiAgICBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KHJlc3VsdC5sb2NhbFRhcmdldCwgcmF3TG9jYWxUYXJnZXQsIGdsbS5tYXQ0LmludmVydChnbG0ubWF0NC5jcmVhdGUoKSwgcmVzdWx0LmJhc2VNYXQ0KSk7XG5cbiAgICBpZiAodGhpcy5fY29tcHV0ZUlrX2pvaW50cyhyZXN1bHQpKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIGNvbXB1dGVJa19maXhlZFJvbGwoXG4gICAgaW5Xb3JsZFRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbldvcmxkUm9sbDogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgKTogSUxpbWJEYXRhUmVzdWx0IHwgdW5kZWZpbmVkIHtcblxuICAgIGNvbnN0IGludlJvb3RNYXQ0OiBnbG0uUmVhZG9ubHlNYXQ0ID0gZ2xtLm1hdDQuaW52ZXJ0KGdsbS5tYXQ0LmNyZWF0ZSgpLCB0aGlzLnJvb3RNYXQ0KTtcbiAgICBjb25zdCByYXdMb2NhbFRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyA9IGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQoZ2xtLnZlYzMuY3JlYXRlKCksIGluV29ybGRUYXJnZXQsIGludlJvb3RNYXQ0KTtcblxuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG4gICAgLy9cblxuICAgIGNvbnN0IHJhd0xvY2FsUm9sbDogZ2xtLlJlYWRvbmx5VmVjMyA9IGdsbS52ZWMzLnRyYW5zZm9ybU1hdDMoZ2xtLnZlYzMuY3JlYXRlKCksIGluV29ybGRSb2xsLCBnbG0ubWF0My5mcm9tTWF0NChnbG0ubWF0My5jcmVhdGUoKSwgaW52Um9vdE1hdDQpKTtcbiAgICAvLyBjb25zdCByYXdMb2NhbFJvbGw6IGdsbS5SZWFkb25seVZlYzMgPSBpbldvcmxkUm9sbDtcblxuICAgIGNvbnN0IHByaW1hcnlSb2xsID0gTWF0aC5hdGFuMihyYXdMb2NhbFJvbGxbMV0sIHJhd0xvY2FsUm9sbFswXSk7XG4gICAgY29uc3QgdG1wUm9sbEFsaWduZWRNYXQ0ID0gZ2xtLm1hdDQuaWRlbnRpdHkoZ2xtLm1hdDQuY3JlYXRlKCkpO1xuICAgIGdsbS5tYXQ0LnJvdGF0ZSh0bXBSb2xsQWxpZ25lZE1hdDQsIHRtcFJvbGxBbGlnbmVkTWF0NCwgcHJpbWFyeVJvbGwsIFsxLDAsMF0pO1xuICAgIGNvbnN0IHRtcFRoZXRhVGFyZ2V0OiBnbG0uUmVhZG9ubHlWZWMzID0gZ2xtLnZlYzMudHJhbnNmb3JtTWF0NChnbG0udmVjMy5jcmVhdGUoKSwgcmF3TG9jYWxUYXJnZXQsIGdsbS5tYXQ0LmludmVydCh0bXBSb2xsQWxpZ25lZE1hdDQsIHRtcFJvbGxBbGlnbmVkTWF0NCkpO1xuICAgIGNvbnN0IHByaW1hcnlZYXcgPSBNYXRoLmF0YW4yKHRtcFRoZXRhVGFyZ2V0WzFdLCB0bXBUaGV0YVRhcmdldFswXSk7XG5cbiAgICBjb25zdCByZXN1bHQ6IElMaW1iRGF0YVJlc3VsdCA9IHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgYmFzZU1hdDQ6IGdsbS5tYXQ0LmlkZW50aXR5KGdsbS5tYXQ0LmNyZWF0ZSgpKSxcbiAgICAgIHByaW1hcnlRdWF0QXhpc2VzOiBbXG4gICAgICAgIHtheGlzOiBbMSwwLDBdLCBhbmdsZTogcHJpbWFyeVJvbGx9LFxuICAgICAgICB7YXhpczogWzAsMCwxXSwgYW5nbGU6IHByaW1hcnlZYXd9LFxuICAgICAgXSxcbiAgICAgIGpvaW50QToge1xuICAgICAgICBsb2NhbFBvczogZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICAgIHByaW1hcnlQaXRjaDogMCxcbiAgICAgICAgc2Vjb25kYXJ5UGl0Y2g6IDAsXG4gICAgICAgIHByaW1hcnlRdWF0QXhpczogeyBheGlzOiBbMCwxLDBdLCBhbmdsZTogMCB9LFxuICAgICAgICBzZWNvbmRhcnlRdWF0QXhpczogeyBheGlzOiBbMCwxLDBdLCBhbmdsZTogMCB9LFxuICAgICAgfSxcbiAgICAgIGpvaW50Qjoge1xuICAgICAgICBsb2NhbFBvczogZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICAgIHByaW1hcnlQaXRjaDogMCxcbiAgICAgICAgc2Vjb25kYXJ5UGl0Y2g6IDAsXG4gICAgICAgIHByaW1hcnlRdWF0QXhpczogeyBheGlzOiBbMCwxLDBdLCBhbmdsZTogMCB9LFxuICAgICAgICBzZWNvbmRhcnlRdWF0QXhpczogeyBheGlzOiBbMCwxLDBdLCBhbmdsZTogMCB9LFxuICAgICAgfSxcbiAgICAgIGxvY2FsVGFyZ2V0OiBnbG0udmVjMy5jcmVhdGUoKSxcbiAgICB9O1xuXG4gICAgZ2xtLm1hdDQucm90YXRlKHJlc3VsdC5iYXNlTWF0NCwgcmVzdWx0LmJhc2VNYXQ0LCBwcmltYXJ5Um9sbCwgWzEsMCwwXSk7XG4gICAgZ2xtLm1hdDQucm90YXRlKHJlc3VsdC5iYXNlTWF0NCwgcmVzdWx0LmJhc2VNYXQ0LCBwcmltYXJ5WWF3LCBbMCwwLDFdKTtcblxuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG4gICAgLy9cblxuICAgIGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQocmVzdWx0LmxvY2FsVGFyZ2V0LCByYXdMb2NhbFRhcmdldCwgZ2xtLm1hdDQuaW52ZXJ0KGdsbS5tYXQ0LmNyZWF0ZSgpLCByZXN1bHQuYmFzZU1hdDQpKTtcblxuICAgIGlmICh0aGlzLl9jb21wdXRlSWtfam9pbnRzKHJlc3VsdCkpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29tcHV0ZUlrX2pvaW50cyhyZXN1bHQ6IElMaW1iRGF0YVJlc3VsdCk6IGJvb2xlYW4ge1xuXG4gICAgY29uc3QgY2lyY2xlQTogSUNpcmNsZSA9IHsgY2VudGVyOiBbMCwwXSwgcmFkaXVzOiB0aGlzLnByaW1hcnlMZW5ndGggfTtcbiAgICBjb25zdCBjaXJjbGVCOiBJQ2lyY2xlID0geyBjZW50ZXI6IFtyZXN1bHQubG9jYWxUYXJnZXRbMF0sIHJlc3VsdC5sb2NhbFRhcmdldFsyXV0sIHJhZGl1czogdGhpcy5zZWNvbmRhcnlMZW5ndGggfTtcbiAgICBjb25zdCBzdWJSZXN1bHQgPSBjaXJjbGVDaXJjbGVJbnRlcnNlY3Rpb25Qb2ludHMoY2lyY2xlQSwgY2lyY2xlQik7XG4gICAgaWYgKCFzdWJSZXN1bHQpIHtcbiAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy9cblxuICAgIHJlc3VsdC5qb2ludEEubG9jYWxQb3NbMF0gPSBzdWJSZXN1bHRbMF1bMF07XG4gICAgcmVzdWx0LmpvaW50QS5sb2NhbFBvc1sxXSA9IDA7XG4gICAgcmVzdWx0LmpvaW50QS5sb2NhbFBvc1syXSA9IHN1YlJlc3VsdFswXVsxXTtcbiAgICByZXN1bHQuam9pbnRBLnByaW1hcnlQaXRjaCA9IE1hdGguYXRhbjIoLXJlc3VsdC5qb2ludEEubG9jYWxQb3NbMl0sIHJlc3VsdC5qb2ludEEubG9jYWxQb3NbMF0pO1xuICAgIHJlc3VsdC5qb2ludEEucHJpbWFyeVF1YXRBeGlzLmFuZ2xlID0gcmVzdWx0LmpvaW50QS5wcmltYXJ5UGl0Y2g7XG5cbiAgICBjb25zdCBkaWZmU2Vjb25kYXJ5QTogZ2xtLlJlYWRvbmx5VmVjMyA9IGdsbS52ZWMzLnN1YihnbG0udmVjMy5jcmVhdGUoKSwgcmVzdWx0LmxvY2FsVGFyZ2V0LCByZXN1bHQuam9pbnRBLmxvY2FsUG9zKTtcbiAgICByZXN1bHQuam9pbnRBLnNlY29uZGFyeVBpdGNoID0gTWF0aC5hdGFuMihkaWZmU2Vjb25kYXJ5QVsyXSwgZGlmZlNlY29uZGFyeUFbMF0pO1xuICAgIHJlc3VsdC5qb2ludEEuc2Vjb25kYXJ5UXVhdEF4aXMuYW5nbGUgPSAtcmVzdWx0LmpvaW50QS5zZWNvbmRhcnlQaXRjaCAtIHJlc3VsdC5qb2ludEEucHJpbWFyeVBpdGNoO1xuXG4gICAgLy9cblxuICAgIGNvbnN0IHRtcFJlc3VsdDogZ2xtLlJlYWRvbmx5VmVjMiA9IHN1YlJlc3VsdFsxXSB8fCBzdWJSZXN1bHRbMF07XG5cbiAgICByZXN1bHQuam9pbnRCLmxvY2FsUG9zWzBdID0gdG1wUmVzdWx0WzBdO1xuICAgIHJlc3VsdC5qb2ludEIubG9jYWxQb3NbMV0gPSAwO1xuICAgIHJlc3VsdC5qb2ludEIubG9jYWxQb3NbMl0gPSB0bXBSZXN1bHRbMV07XG4gICAgcmVzdWx0LmpvaW50Qi5wcmltYXJ5UGl0Y2ggPSBNYXRoLmF0YW4yKC1yZXN1bHQuam9pbnRCLmxvY2FsUG9zWzJdLCByZXN1bHQuam9pbnRCLmxvY2FsUG9zWzBdKTtcbiAgICByZXN1bHQuam9pbnRCLnByaW1hcnlRdWF0QXhpcy5hbmdsZSA9IHJlc3VsdC5qb2ludEIucHJpbWFyeVBpdGNoO1xuXG4gICAgY29uc3QgZGlmZlNlY29uZGFyeUI6IGdsbS5SZWFkb25seVZlYzMgPSBnbG0udmVjMy5zdWIoZ2xtLnZlYzMuY3JlYXRlKCksIHJlc3VsdC5sb2NhbFRhcmdldCwgcmVzdWx0LmpvaW50Qi5sb2NhbFBvcyk7XG4gICAgcmVzdWx0LmpvaW50Qi5zZWNvbmRhcnlQaXRjaCA9IE1hdGguYXRhbjIoZGlmZlNlY29uZGFyeUJbMl0sIGRpZmZTZWNvbmRhcnlCWzBdKTtcbiAgICByZXN1bHQuam9pbnRCLnNlY29uZGFyeVF1YXRBeGlzLmFuZ2xlID0gLXJlc3VsdC5qb2ludEIuc2Vjb25kYXJ5UGl0Y2ggLSByZXN1bHQuam9pbnRCLnByaW1hcnlQaXRjaDtcblxuICAgIC8vXG5cbiAgICByZXN1bHQuc3VjY2VzcyA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBleHRyYWN0QmFzZVRyYW5zZm9ybShyZXN1bHQ6IFJlYWRvbmx5PElMaW1iRGF0YVJlc3VsdD4sIG91dE1hdDQ6IGdsbS5tYXQ0KTogdm9pZCB7XG4gICAgZ2xtLm1hdDQubXVsdGlwbHkob3V0TWF0NCwgdGhpcy5yb290TWF0NCwgcmVzdWx0LmJhc2VNYXQ0KTtcbiAgfVxuICBleHRyYWN0UHJpbWFyeVRyYW5zZm9ybShyZXN1bHQ6IFJlYWRvbmx5PElMaW1iRGF0YVJlc3VsdD4sIGpvaW50OiBSZWFkb25seTxMaW1iRGF0YVJlc3VsdEpvaW50Piwgb3V0TWF0NDogZ2xtLm1hdDQpOiB2b2lkIHtcbiAgICB0aGlzLmV4dHJhY3RCYXNlVHJhbnNmb3JtKHJlc3VsdCwgb3V0TWF0NCk7XG4gICAgZ2xtLm1hdDQucm90YXRlKG91dE1hdDQsIG91dE1hdDQsIGpvaW50LnByaW1hcnlQaXRjaCwgWzAsMSwwXSk7XG4gIH1cbiAgZXh0cmFjdFNlY29uZGFyeVRyYW5zZm9ybShyZXN1bHQ6IFJlYWRvbmx5PElMaW1iRGF0YVJlc3VsdD4sIGpvaW50OiBSZWFkb25seTxMaW1iRGF0YVJlc3VsdEpvaW50Piwgb3V0TWF0NDogZ2xtLm1hdDQpOiB2b2lkIHtcbiAgICB0aGlzLmV4dHJhY3RQcmltYXJ5VHJhbnNmb3JtKHJlc3VsdCwgam9pbnQsIG91dE1hdDQpO1xuICAgIGdsbS5tYXQ0LnRyYW5zbGF0ZShvdXRNYXQ0LCBvdXRNYXQ0LCBbdGhpcy5wcmltYXJ5TGVuZ3RoLDAsMF0pO1xuICAgIGdsbS5tYXQ0LnJvdGF0ZShvdXRNYXQ0LCBvdXRNYXQ0LCAtam9pbnQuc2Vjb25kYXJ5UGl0Y2ggLSBqb2ludC5wcmltYXJ5UGl0Y2gsIFswLDEsMF0pO1xuICB9XG4gIGV4dHJhY3RUcmFuc2Zvcm1zKHJlc3VsdDogUmVhZG9ubHk8SUxpbWJEYXRhUmVzdWx0Piwgam9pbnQ6IFJlYWRvbmx5PExpbWJEYXRhUmVzdWx0Sm9pbnQ+LCBiYXNlTWF0NDogZ2xtLm1hdDQsIHByaW1hcnlNYXQ0OiBnbG0ubWF0NCwgc2Vjb25kYXJ5TWF0NDogZ2xtLm1hdDQpOiB2b2lkIHtcbiAgICB0aGlzLmV4dHJhY3RCYXNlVHJhbnNmb3JtKHJlc3VsdCwgYmFzZU1hdDQpO1xuICAgIHByaW1hcnlNYXQ0ID0gZ2xtLm1hdDQucm90YXRlKHByaW1hcnlNYXQ0LCBiYXNlTWF0NCwgam9pbnQucHJpbWFyeVBpdGNoLCBbMCwxLDBdKTtcbiAgICBnbG0ubWF0NC50cmFuc2xhdGUoc2Vjb25kYXJ5TWF0NCwgcHJpbWFyeU1hdDQsIFt0aGlzLnByaW1hcnlMZW5ndGgsMCwwXSk7XG4gICAgZ2xtLm1hdDQucm90YXRlKHNlY29uZGFyeU1hdDQsIHNlY29uZGFyeU1hdDQsIC1qb2ludC5zZWNvbmRhcnlQaXRjaCAtIGpvaW50LnByaW1hcnlQaXRjaCwgWzAsMSwwXSk7XG4gIH1cblxufTtcblxuIiwKICAiXG5leHBvcnQgY29uc3QgY2xhbXAgPSAodmFsOiBudW1iZXIsIG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlcikgPT4ge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsLCBtaW5WYWwpLCBtYXhWYWwpO1xufTtcbiIsCiAgIlxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUJveFZlcnRpY2VzID0gKGluU2l6ZTogZ2xtLlJlYWRvbmx5VmVjMyk6IG51bWJlcltdID0+IHtcblxuICBjb25zdCBoU2l6ZVggPSBpblNpemVbMF0gKiAwLjU7XG4gIGNvbnN0IGhTaXplWSA9IGluU2l6ZVsxXSAqIDAuNTtcbiAgY29uc3QgaFNpemVaID0gaW5TaXplWzJdICogMC41O1xuXG4gIGNvbnN0IGtfbm9ybWFsczogZ2xtLlJlYWRvbmx5VmVjM1tdID0gW1xuICAgIFstMSwgMCwgMF0sIC8vIDBcbiAgICBbKzEsIDAsIDBdLCAvLyAxXG4gICAgWzAsIC0xLCAwXSwgLy8gMlxuICAgIFswLCArMSwgMF0sIC8vIDNcbiAgICBbMCwgMCwgLTFdLCAvLyA0XG4gICAgWzAsIDAsICsxXSwgLy8gNVxuICBdO1xuXG4gIGNvbnN0IGtfdmVydGljZXM6IGdsbS5SZWFkb25seVZlYzNbXSA9IFtcbiAgICBbLWhTaXplWCwgLWhTaXplWSwgLWhTaXplWl0sIC8vIDBcbiAgICBbK2hTaXplWCwgLWhTaXplWSwgLWhTaXplWl0sIC8vIDFcbiAgICBbLWhTaXplWCwgK2hTaXplWSwgLWhTaXplWl0sIC8vIDJcbiAgICBbK2hTaXplWCwgK2hTaXplWSwgLWhTaXplWl0sIC8vIDNcbiAgICBbLWhTaXplWCwgLWhTaXplWSwgK2hTaXplWl0sIC8vIDRcbiAgICBbK2hTaXplWCwgLWhTaXplWSwgK2hTaXplWl0sIC8vIDVcbiAgICBbLWhTaXplWCwgK2hTaXplWSwgK2hTaXplWl0sIC8vIDZcbiAgICBbK2hTaXplWCwgK2hTaXplWSwgK2hTaXplWl0sIC8vIDdcbiAgXTtcblxuICBjb25zdCBrX2luZGljZXM6IGdsbS5SZWFkb25seVZlYzRbXSA9IFtcbiAgICAvLyAteiAwMTIzXG4gICAgWzAsIDIsIDEsIC8qbm9ybWFsID0+ICovIDRdLFxuICAgIFsyLCAzLCAxLCAvKm5vcm1hbCA9PiAqLyA0XSxcbiAgICAvLyAreiA0NTY3XG4gICAgWzQsIDUsIDYsIC8qbm9ybWFsID0+ICovIDVdLFxuICAgIFs2LCA1LCA3LCAvKm5vcm1hbCA9PiAqLyA1XSxcblxuICAgIC8vICt4IDEzNTdcbiAgICBbMSwgMywgNSwgLypub3JtYWwgPT4gKi8gMV0sXG4gICAgWzUsIDMsIDcsIC8qbm9ybWFsID0+ICovIDFdLFxuICAgIC8vIC14IDAyNDZcbiAgICBbMCwgNCwgMiwgLypub3JtYWwgPT4gKi8gMF0sXG4gICAgWzQsIDYsIDIsIC8qbm9ybWFsID0+ICovIDBdLFxuXG4gICAgLy8gK3kgMjM2N1xuICAgIFsyLCA2LCAzLCAvKm5vcm1hbCA9PiAqLyAzXSxcbiAgICBbNiwgNywgMywgLypub3JtYWwgPT4gKi8gM10sXG4gICAgLy8gLXkgMDE0NVxuICAgIFswLCAxLCA0LCAvKm5vcm1hbCA9PiAqLyAyXSxcbiAgICBbNCwgMSwgNSwgLypub3JtYWwgPT4gKi8gMl0sXG4gIF07XG5cbiAgY29uc3QgdmVydGljZXM6IG51bWJlcltdID0gW107XG5cbiAgZm9yIChjb25zdCBpbmRleCBvZiBrX2luZGljZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXgxID0ga192ZXJ0aWNlc1tpbmRleFswXV07XG4gICAgY29uc3QgdmVydGV4MiA9IGtfdmVydGljZXNbaW5kZXhbMV1dO1xuICAgIGNvbnN0IHZlcnRleDMgPSBrX3ZlcnRpY2VzW2luZGV4WzJdXTtcbiAgICBjb25zdCBub3JtYWwgPSBrX25vcm1hbHNbaW5kZXhbM11dO1xuICAgIHZlcnRpY2VzLnB1c2goXG4gICAgICB2ZXJ0ZXgxWzBdLFxuICAgICAgdmVydGV4MVsxXSxcbiAgICAgIHZlcnRleDFbMl0sXG4gICAgICBub3JtYWxbMF0sXG4gICAgICBub3JtYWxbMV0sXG4gICAgICBub3JtYWxbMl0sXG4gICAgICB2ZXJ0ZXgyWzBdLFxuICAgICAgdmVydGV4MlsxXSxcbiAgICAgIHZlcnRleDJbMl0sXG4gICAgICBub3JtYWxbMF0sXG4gICAgICBub3JtYWxbMV0sXG4gICAgICBub3JtYWxbMl0sXG4gICAgICB2ZXJ0ZXgzWzBdLFxuICAgICAgdmVydGV4M1sxXSxcbiAgICAgIHZlcnRleDNbMl0sXG4gICAgICBub3JtYWxbMF0sXG4gICAgICBub3JtYWxbMV0sXG4gICAgICBub3JtYWxbMl0sXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB2ZXJ0aWNlcztcbn07XG4iLAogICJcbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5leHBvcnQgY29uc3QgY29tcHV0ZU5vcm1hbCA9IChpblBvc0E6IGdsbS5SZWFkb25seVZlYzMsIGluUG9zQjogZ2xtLlJlYWRvbmx5VmVjMywgaW5Qb3NDOiBnbG0uUmVhZG9ubHlWZWMzKTogZ2xtLnZlYzMgPT4ge1xuICBjb25zdCBub3JtYWwgPSBnbG0udmVjMy5jcm9zcyhcbiAgICBnbG0udmVjMy5jcmVhdGUoKSxcbiAgICBnbG0udmVjMy5zdWIoZ2xtLnZlYzMuY3JlYXRlKCksIGluUG9zQSwgaW5Qb3NCKSxcbiAgICBnbG0udmVjMy5zdWIoZ2xtLnZlYzMuY3JlYXRlKCksIGluUG9zQSwgaW5Qb3NDKVxuICApO1xuICBjb25zdCBtYWduaXR1ZGUgPSBnbG0udmVjMy5sZW5ndGgobm9ybWFsKTtcbiAgaWYgKG1hZ25pdHVkZSA+IDApIHtcbiAgICBub3JtYWxbMF0gLz0gbWFnbml0dWRlO1xuICAgIG5vcm1hbFsxXSAvPSBtYWduaXR1ZGU7XG4gICAgbm9ybWFsWzJdIC89IG1hZ25pdHVkZTtcbiAgfVxuICByZXR1cm4gbm9ybWFsO1xufTtcbiIsCiAgIlxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmltcG9ydCB7Y29tcHV0ZU5vcm1hbH0gZnJvbSBcIi4vY29tcHV0ZU5vcm1hbFwiXG5cbmV4cG9ydCBjb25zdCBjb252ZXJ0VG9QZXJGYWNlc05vcm1hbHMgPSAodmVydGljZXM6IG51bWJlcltdKSA9PiB7XG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB2ZXJ0aWNlcy5sZW5ndGg7IGluZGV4ICs9IDYgKiAzKSB7XG5cbiAgICBjb25zdCBpbmRleEEgPSBpbmRleCArIDYgKiAwO1xuICAgIGNvbnN0IGluZGV4QiA9IGluZGV4ICsgNiAqIDE7XG4gICAgY29uc3QgaW5kZXhDID0gaW5kZXggKyA2ICogMjtcblxuICAgIGNvbnN0IHBvc0E6IGdsbS5SZWFkb25seVZlYzMgPSBbdmVydGljZXNbaW5kZXhBICsgMF0sIHZlcnRpY2VzW2luZGV4QSArIDFdLCB2ZXJ0aWNlc1tpbmRleEEgKyAyXV07XG4gICAgY29uc3QgcG9zQjogZ2xtLlJlYWRvbmx5VmVjMyA9IFt2ZXJ0aWNlc1tpbmRleEIgKyAwXSwgdmVydGljZXNbaW5kZXhCICsgMV0sIHZlcnRpY2VzW2luZGV4QiArIDJdXTtcbiAgICBjb25zdCBwb3NDOiBnbG0uUmVhZG9ubHlWZWMzID0gW3ZlcnRpY2VzW2luZGV4QyArIDBdLCB2ZXJ0aWNlc1tpbmRleEMgKyAxXSwgdmVydGljZXNbaW5kZXhDICsgMl1dO1xuXG4gICAgY29uc3Qgbm9ybWFsID0gY29tcHV0ZU5vcm1hbChwb3NBLCBwb3NCLCBwb3NDKTtcblxuICAgIHZlcnRpY2VzW2luZGV4QSArIDNdID0gbm9ybWFsWzBdO1xuICAgIHZlcnRpY2VzW2luZGV4QSArIDRdID0gbm9ybWFsWzFdO1xuICAgIHZlcnRpY2VzW2luZGV4QSArIDVdID0gbm9ybWFsWzJdO1xuICAgIHZlcnRpY2VzW2luZGV4QiArIDNdID0gbm9ybWFsWzBdO1xuICAgIHZlcnRpY2VzW2luZGV4QiArIDRdID0gbm9ybWFsWzFdO1xuICAgIHZlcnRpY2VzW2luZGV4QiArIDVdID0gbm9ybWFsWzJdO1xuICAgIHZlcnRpY2VzW2luZGV4QyArIDNdID0gbm9ybWFsWzBdO1xuICAgIHZlcnRpY2VzW2luZGV4QyArIDRdID0gbm9ybWFsWzFdO1xuICAgIHZlcnRpY2VzW2luZGV4QyArIDVdID0gbm9ybWFsWzJdO1xuICB9XG59O1xuXG4iLAogICJcbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5pbXBvcnQge2NvbnZlcnRUb1BlckZhY2VzTm9ybWFsc30gZnJvbSBcIi4vY29udmVydFRvUGVyRmFjZXNOb3JtYWxzXCJcblxuY29uc3QgX2V4cGxvcmVTcGhlcmVQYXRjaCA9IChcbiAgcXVhbGl0eTogbnVtYmVyLFxuICB2MDE6IGdsbS5SZWFkb25seVZlYzMsXG4gIHYwMjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgdjAzOiBnbG0uUmVhZG9ubHlWZWMzLFxuICBvblRyaWFuZ2xlOiAobm9ybWFsMTogZ2xtLlJlYWRvbmx5VmVjMywgbm9ybWFsMjogZ2xtLlJlYWRvbmx5VmVjMywgbm9ybWFsMzogZ2xtLlJlYWRvbmx5VmVjMykgPT4gdm9pZFxuKSA9PiB7XG4gIGlmIChxdWFsaXR5IDw9IDApIHtcbiAgICBvblRyaWFuZ2xlKHYwMiwgdjAxLCB2MDMpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHYxMiA9IGdsbS52ZWMzLm5vcm1hbGl6ZShcbiAgICAgIGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgZ2xtLnZlYzMubGVycChnbG0udmVjMy5jcmVhdGUoKSwgdjAxLCB2MDIsIDAuNSlcbiAgICApO1xuICAgIGNvbnN0IHYyMyA9IGdsbS52ZWMzLm5vcm1hbGl6ZShcbiAgICAgIGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgZ2xtLnZlYzMubGVycChnbG0udmVjMy5jcmVhdGUoKSwgdjAyLCB2MDMsIDAuNSlcbiAgICApO1xuICAgIGNvbnN0IHYzMSA9IGdsbS52ZWMzLm5vcm1hbGl6ZShcbiAgICAgIGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgZ2xtLnZlYzMubGVycChnbG0udmVjMy5jcmVhdGUoKSwgdjAzLCB2MDEsIDAuNSlcbiAgICApO1xuXG4gICAgcXVhbGl0eSAtPSAxO1xuXG4gICAgX2V4cGxvcmVTcGhlcmVQYXRjaChxdWFsaXR5LCB2MDEsIHYxMiwgdjMxLCBvblRyaWFuZ2xlKTtcbiAgICBfZXhwbG9yZVNwaGVyZVBhdGNoKHF1YWxpdHksIHYxMiwgdjAyLCB2MjMsIG9uVHJpYW5nbGUpO1xuICAgIF9leHBsb3JlU3BoZXJlUGF0Y2gocXVhbGl0eSwgdjMxLCB2MjMsIHYwMywgb25UcmlhbmdsZSk7XG4gICAgX2V4cGxvcmVTcGhlcmVQYXRjaChxdWFsaXR5LCB2MTIsIHYyMywgdjMxLCBvblRyaWFuZ2xlKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlU3BoZXJlVHJpYW5nbGVzID0gKFxuICBxdWFsaXR5OiBudW1iZXIsXG4gIG9uVHJpYW5nbGU6IChub3JtYWwxOiBnbG0uUmVhZG9ubHlWZWMzLCBub3JtYWwyOiBnbG0uUmVhZG9ubHlWZWMzLCBub3JtYWwzOiBnbG0uUmVhZG9ubHlWZWMzKSA9PiB2b2lkXG4pOiB2b2lkID0+IHtcbiAgY29uc3Qga19pY3ggPSAwLjUyNTczMTExMjExOTEzMzYwNjtcbiAgY29uc3Qga19pY3ogPSAwLjg1MDY1MDgwODM1MjAzOTkzMjtcblxuICBjb25zdCB0bXBWZXJ0aWNlczogZ2xtLlJlYWRvbmx5VmVjM1tdID0gW1xuICAgIFsta19pY3gsIDAuMCwgK2tfaWN6XSxcbiAgICBbK2tfaWN4LCAwLjAsICtrX2ljel0sXG4gICAgWy1rX2ljeCwgMC4wLCAta19pY3pdLFxuICAgIFsra19pY3gsIDAuMCwgLWtfaWN6XSxcbiAgICBbMC4wLCAra19pY3osICtrX2ljeF0sXG4gICAgWzAuMCwgK2tfaWN6LCAta19pY3hdLFxuICAgIFswLjAsIC1rX2ljeiwgK2tfaWN4XSxcbiAgICBbMC4wLCAta19pY3osIC1rX2ljeF0sXG4gICAgWytrX2ljeiwgK2tfaWN4LCAwLjBdLFxuICAgIFsta19pY3osICtrX2ljeCwgMC4wXSxcbiAgICBbK2tfaWN6LCAta19pY3gsIDAuMF0sXG4gICAgWy1rX2ljeiwgLWtfaWN4LCAwLjBdXG4gIF07XG5cbiAgY29uc3QgdG1wSW5kaWNlczogZ2xtLlJlYWRvbmx5VmVjM1tdID0gW1xuICAgIFswLCA0LCAxXSxcbiAgICBbMCwgOSwgNF0sXG4gICAgWzksIDUsIDRdLFxuICAgIFs0LCA1LCA4XSxcbiAgICBbNCwgOCwgMV0sXG4gICAgWzgsIDEwLCAxXSxcbiAgICBbOCwgMywgMTBdLFxuICAgIFs1LCAzLCA4XSxcbiAgICBbNSwgMiwgM10sXG4gICAgWzIsIDcsIDNdLFxuICAgIFs3LCAxMCwgM10sXG4gICAgWzcsIDYsIDEwXSxcbiAgICBbNywgMTEsIDZdLFxuICAgIFsxMSwgMCwgNl0sXG4gICAgWzAsIDEsIDZdLFxuICAgIFs2LCAxLCAxMF0sXG4gICAgWzksIDAsIDExXSxcbiAgICBbOSwgMTEsIDJdLFxuICAgIFs5LCAyLCA1XSxcbiAgICBbNywgMiwgMTFdXG4gIF07XG5cbiAgZm9yIChjb25zdCBpbmRleCBvZiB0bXBJbmRpY2VzKSB7XG4gICAgX2V4cGxvcmVTcGhlcmVQYXRjaChcbiAgICAgIHF1YWxpdHksXG4gICAgICB0bXBWZXJ0aWNlc1tpbmRleFswXV0sXG4gICAgICB0bXBWZXJ0aWNlc1tpbmRleFsxXV0sXG4gICAgICB0bXBWZXJ0aWNlc1tpbmRleFsyXV0sXG4gICAgICBvblRyaWFuZ2xlXG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlU3BoZXJlVmVydGljZXMgPSAoXG4gIHF1YWxpdHk6IG51bWJlcixcbiAgcmFkaXVzOiBudW1iZXIsXG4gIG1vZGVsTWF0NDogZ2xtLlJlYWRvbmx5TWF0NCxcbiAgcGVyRmFjZU5vcm1hbHM6IGJvb2xlYW4gPSBmYWxzZVxuKTogbnVtYmVyW10gPT4ge1xuXG4gIGNvbnN0IHZlcnRpY2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IHRtcFZlYzNBID0gZ2xtLnZlYzMuY3JlYXRlKCk7XG4gIGNvbnN0IHRtcFZlYzNCID0gZ2xtLnZlYzMuY3JlYXRlKCk7XG5cbiAgZ2VuZXJhdGVTcGhlcmVUcmlhbmdsZXMoXG4gICAgcXVhbGl0eSxcbiAgICAobm9ybWFsMTogZ2xtLlJlYWRvbmx5VmVjMywgbm9ybWFsMjogZ2xtLlJlYWRvbmx5VmVjMywgbm9ybWFsMzogZ2xtLlJlYWRvbmx5VmVjMykgPT4ge1xuXG4gICAgICB0bXBWZWMzQVswXSA9IHRtcFZlYzNBWzFdID0gdG1wVmVjM0FbMl0gPSAwO1xuICAgICAgZ2xtLnZlYzMudHJhbnNmb3JtTWF0NCh0bXBWZWMzQSwgbm9ybWFsMSwgbW9kZWxNYXQ0KTtcbiAgICAgIGdsbS52ZWMzLnNjYWxlKHRtcFZlYzNCLCB0bXBWZWMzQSwgcmFkaXVzKSxcbiAgICAgIHZlcnRpY2VzLnB1c2goXG4gICAgICAgIHRtcFZlYzNCWzBdLFxuICAgICAgICB0bXBWZWMzQlsxXSxcbiAgICAgICAgdG1wVmVjM0JbMl0sXG4gICAgICAgIHRtcFZlYzNBWzBdLFxuICAgICAgICB0bXBWZWMzQVsxXSxcbiAgICAgICAgdG1wVmVjM0FbMl0sXG4gICAgICApO1xuXG4gICAgICB0bXBWZWMzQVswXSA9IHRtcFZlYzNBWzFdID0gdG1wVmVjM0FbMl0gPSAwO1xuICAgICAgZ2xtLnZlYzMudHJhbnNmb3JtTWF0NCh0bXBWZWMzQSwgbm9ybWFsMiwgbW9kZWxNYXQ0KTtcbiAgICAgIGdsbS52ZWMzLnNjYWxlKHRtcFZlYzNCLCB0bXBWZWMzQSwgcmFkaXVzKSxcbiAgICAgIHZlcnRpY2VzLnB1c2goXG4gICAgICAgIHRtcFZlYzNCWzBdLFxuICAgICAgICB0bXBWZWMzQlsxXSxcbiAgICAgICAgdG1wVmVjM0JbMl0sXG4gICAgICAgIHRtcFZlYzNBWzBdLFxuICAgICAgICB0bXBWZWMzQVsxXSxcbiAgICAgICAgdG1wVmVjM0FbMl0sXG4gICAgICApO1xuXG4gICAgICB0bXBWZWMzQVswXSA9IHRtcFZlYzNBWzFdID0gdG1wVmVjM0FbMl0gPSAwO1xuICAgICAgZ2xtLnZlYzMudHJhbnNmb3JtTWF0NCh0bXBWZWMzQSwgbm9ybWFsMywgbW9kZWxNYXQ0KTtcbiAgICAgIGdsbS52ZWMzLnNjYWxlKHRtcFZlYzNCLCB0bXBWZWMzQSwgcmFkaXVzKSxcbiAgICAgIHZlcnRpY2VzLnB1c2goXG4gICAgICAgIHRtcFZlYzNCWzBdLFxuICAgICAgICB0bXBWZWMzQlsxXSxcbiAgICAgICAgdG1wVmVjM0JbMl0sXG4gICAgICAgIHRtcFZlYzNBWzBdLFxuICAgICAgICB0bXBWZWMzQVsxXSxcbiAgICAgICAgdG1wVmVjM0FbMl0sXG4gICAgICApO1xuXG4gICAgfSk7XG5cbiAgaWYgKHBlckZhY2VOb3JtYWxzKSB7XG4gICAgY29udmVydFRvUGVyRmFjZXNOb3JtYWxzKHZlcnRpY2VzKTtcbiAgfVxuXG4gIHJldHVybiB2ZXJ0aWNlcztcbn07XG4iLAogICJpbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlV2lyZUZyYW1lRnJ1c3R1bVZlcnRpY2VzID0gKFxuICBmb3ZZOiBudW1iZXIsXG4gIGFzcGVjdDogbnVtYmVyLFxuICB6TmVhcjogbnVtYmVyLFxuICB6RmFyOiBudW1iZXJcbik6IGdsbS5SZWFkb25seVZlYzNbXSA9PiB7XG4gIGNvbnN0IGZIID0gTWF0aC50YW4oKGZvdlkgLyAzNjAuMCkgKiBNYXRoLlBJKSAqIHpOZWFyO1xuICBjb25zdCBmVyA9IGZIICogYXNwZWN0O1xuXG4gIGNvbnN0IGxlZnQgPSAtZlc7XG4gIGNvbnN0IHJpZ2h0ID0gK2ZXO1xuXG4gIGNvbnN0IHRvcCA9ICtmSDtcbiAgY29uc3QgYm90dG9tID0gLWZIO1xuXG4gIGNvbnN0IGhhbGZfeiA9IHpGYXIgKiBNYXRoLnNpbigoZm92WSAqIE1hdGguUEkpIC8gMTgwLjApO1xuICBjb25zdCBoYWxmX3kgPSBoYWxmX3ogKiBhc3BlY3Q7XG5cbiAgY29uc3QgdG1wVmVydGljZXM6IGdsbS5SZWFkb25seVZlYzNbXSA9IFtdO1xuXG4gIHRtcFZlcnRpY2VzLnB1c2goW3pOZWFyLCBsZWZ0LCB0b3BdKTtcbiAgdG1wVmVydGljZXMucHVzaChbek5lYXIsIHJpZ2h0LCB0b3BdKTtcbiAgdG1wVmVydGljZXMucHVzaChbek5lYXIsIGxlZnQsIGJvdHRvbV0pO1xuICB0bXBWZXJ0aWNlcy5wdXNoKFt6TmVhciwgcmlnaHQsIGJvdHRvbV0pO1xuXG4gIHRtcFZlcnRpY2VzLnB1c2goW3pGYXIsIC1oYWxmX3ksICtoYWxmX3pdKTtcbiAgdG1wVmVydGljZXMucHVzaChbekZhciwgK2hhbGZfeSwgK2hhbGZfel0pO1xuICB0bXBWZXJ0aWNlcy5wdXNoKFt6RmFyLCAtaGFsZl95LCAtaGFsZl96XSk7XG4gIHRtcFZlcnRpY2VzLnB1c2goW3pGYXIsICtoYWxmX3ksIC1oYWxmX3pdKTtcblxuICB0bXBWZXJ0aWNlcy5wdXNoKFt6RmFyLCAtaGFsZl95ICogMS42NiwgLWhhbGZfel0pO1xuICB0bXBWZXJ0aWNlcy5wdXNoKFt6RmFyLCAtaGFsZl95ICogMS42NiwgK2hhbGZfel0pO1xuXG4gIC8vXG5cbiAgY29uc3QgaW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgaW5kaWNlcy5wdXNoKDAsIDEsIDEsIDMsIDMsIDIsIDIsIDApO1xuICBpbmRpY2VzLnB1c2goMCwgNCwgMSwgNSwgMiwgNiwgMywgNyk7XG4gIGluZGljZXMucHVzaCg0LCA1LCA1LCA3LCA3LCA2LCA2LCA0KTtcbiAgaW5kaWNlcy5wdXNoKDgsIDkpO1xuICBpbmRpY2VzLnB1c2goNywgOCk7XG4gIGluZGljZXMucHVzaCg1LCA5KTtcblxuICAvL1xuXG4gIGNvbnN0IHZlcnRpY2VzOiBnbG0uUmVhZG9ubHlWZWMzW10gPSBbXTtcblxuICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgaW5kaWNlcy5sZW5ndGg7ICsraWkpIHtcbiAgICB2ZXJ0aWNlcy5wdXNoKHRtcFZlcnRpY2VzW2luZGljZXNbaWldXSk7XG4gIH1cblxuICByZXR1cm4gdmVydGljZXM7XG59O1xuIiwKICAiaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmNvbnN0IF9kZWdyZWVUb1JhZCA9IChhbmdsZTogbnVtYmVyKSA9PiBhbmdsZSAqIE1hdGguUEkgLyAxODA7XG5cbmVudW0gUHJvamVjdGlvblR5cGUge1xuICBwZXJzcGVjdGl2ZSA9IDAsXG4gIG9ydGhvZ29uYWwgPSAxXG59XG5cbmludGVyZmFjZSBJUGVyc3BlY3RpdmVEYXRhT3B0cyB7XG4gIGZvdnk6IG51bWJlcjtcbiAgYXNwZWN0UmF0aW8/OiBudW1iZXI7XG4gIG5lYXI6IG51bWJlcjtcbiAgZmFyOiBudW1iZXI7XG59XG5cbnR5cGUgSVBlcnNwZWN0aXZlRGF0YSA9IFJlcXVpcmVkPElQZXJzcGVjdGl2ZURhdGFPcHRzPjtcblxuaW50ZXJmYWNlIElPcnRob2dvbmFsRGF0YSB7XG4gIGxlZnQ6IG51bWJlcjtcbiAgcmlnaHQ6IG51bWJlcjtcbiAgdG9wOiBudW1iZXI7XG4gIGJvdHRvbTogbnVtYmVyO1xuICBuZWFyOiBudW1iZXI7XG4gIGZhcjogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDYW1lcmEge1xuICBnZXRFeWUoKTogZ2xtLlJlYWRvbmx5VmVjMztcbiAgZ2V0VGFyZ2V0KCk6IGdsbS5SZWFkb25seVZlYzM7XG4gIGdldFVwQXhpcygpOiBnbG0uUmVhZG9ubHlWZWMzO1xuXG4gIGdldFByb2plY3Rpb25NYXRyaXgoKTogZ2xtLlJlYWRvbmx5TWF0NDtcbiAgZ2V0Vmlld01hdHJpeCgpOiBnbG0uUmVhZG9ubHlNYXQ0O1xuICBnZXRDb21wb3NlZE1hdHJpeCgpOiBnbG0uUmVhZG9ubHlNYXQ0O1xuXG4gIGdldFBlcnNwZWN0aXZlRGF0YSgpOiBSZWFkb25seTxJUGVyc3BlY3RpdmVEYXRhIHwgdW5kZWZpbmVkPjtcbiAgZ2V0T3J0aG9nb25hbERhdGEoKTogUmVhZG9ubHk8SU9ydGhvZ29uYWxEYXRhIHwgdW5kZWZpbmVkPjtcbn1cblxuZXhwb3J0IGNsYXNzIENhbWVyYSBpbXBsZW1lbnRzIElDYW1lcmEge1xuICBwcml2YXRlIF9wcm9qZWN0aW9uVHlwZSA9IFByb2plY3Rpb25UeXBlLnBlcnNwZWN0aXZlO1xuICBwcml2YXRlIF9wZXJzcGVjdGl2ZURhdGE/OiBJUGVyc3BlY3RpdmVEYXRhO1xuICBwcml2YXRlIF9vcnRob2dvbmFsRGF0YT86IElPcnRob2dvbmFsRGF0YTtcblxuICBwcml2YXRlIF92aWV3cG9ydFBvcyA9IGdsbS52ZWMyLmZyb21WYWx1ZXMoMCwgMCk7XG4gIHByaXZhdGUgX3ZpZXdwb3J0U2l6ZSA9IGdsbS52ZWMyLmZyb21WYWx1ZXMoMCwgMCk7XG5cbiAgcHJpdmF0ZSBfcHJvamVjdGlvbk1hdHJpeCA9IGdsbS5tYXQ0LmNyZWF0ZSgpO1xuICBwcml2YXRlIF92aWV3TWF0cml4ID0gZ2xtLm1hdDQuY3JlYXRlKCk7XG4gIHByaXZhdGUgX2NvbXBvc2VkTWF0cml4ID0gZ2xtLm1hdDQuY3JlYXRlKCk7XG5cbiAgcHJpdmF0ZSBfZXllID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcbiAgcHJpdmF0ZSBfdGFyZ2V0ID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcbiAgcHJpdmF0ZSBfdXBBeGlzID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcblxuICAvL1xuXG4gIHNldEFzUGVyc3BlY3RpdmUoaW5EYXRhOiBJUGVyc3BlY3RpdmVEYXRhT3B0cykge1xuICAgIHRoaXMuX3Byb2plY3Rpb25UeXBlID0gUHJvamVjdGlvblR5cGUucGVyc3BlY3RpdmU7XG5cbiAgICBsZXQgYXNwZWN0UmF0aW8gPSBpbkRhdGEuYXNwZWN0UmF0aW87XG4gICAgaWYgKGFzcGVjdFJhdGlvID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFzcGVjdFJhdGlvID0gdGhpcy5fdmlld3BvcnRTaXplWzBdIC8gdGhpcy5fdmlld3BvcnRTaXplWzFdO1xuICAgIH1cblxuICAgIHRoaXMuX3BlcnNwZWN0aXZlRGF0YSA9IHtcbiAgICAgIGZvdnk6IGluRGF0YS5mb3Z5LFxuICAgICAgYXNwZWN0UmF0aW8sXG4gICAgICBuZWFyOiBpbkRhdGEubmVhcixcbiAgICAgIGZhcjogaW5EYXRhLmZhclxuICAgIH07XG4gIH1cblxuICBzZXRBc09ydGhvZ29uYWwoaW5EYXRhOiBJT3J0aG9nb25hbERhdGEpIHtcbiAgICB0aGlzLl9wcm9qZWN0aW9uVHlwZSA9IFByb2plY3Rpb25UeXBlLm9ydGhvZ29uYWw7XG4gICAgdGhpcy5fb3J0aG9nb25hbERhdGEgPSB7IC4uLmluRGF0YSB9O1xuICB9XG5cbiAgLy9cblxuICBzZXRWaWV3cG9ydFBvcyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuX3ZpZXdwb3J0UG9zWzBdID0gd2lkdGg7XG4gICAgdGhpcy5fdmlld3BvcnRQb3NbMV0gPSBoZWlnaHQ7XG4gIH1cblxuICBnZXRWaWV3cG9ydFBvcygpOiBnbG0uUmVhZG9ubHlWZWMyIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld3BvcnRQb3M7XG4gIH1cblxuICAvL1xuXG4gIHNldFZpZXdwb3J0U2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuX3ZpZXdwb3J0U2l6ZVswXSA9IHdpZHRoO1xuICAgIHRoaXMuX3ZpZXdwb3J0U2l6ZVsxXSA9IGhlaWdodDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMuX3Byb2plY3Rpb25UeXBlICE9PSBQcm9qZWN0aW9uVHlwZS5wZXJzcGVjdGl2ZSAmJlxuICAgICAgdGhpcy5fcGVyc3BlY3RpdmVEYXRhXG4gICAgKSB7XG4gICAgICB0aGlzLl9wZXJzcGVjdGl2ZURhdGEuYXNwZWN0UmF0aW8gPVxuICAgICAgICB0aGlzLl92aWV3cG9ydFNpemVbMF0gLyB0aGlzLl92aWV3cG9ydFNpemVbMV07XG4gICAgfVxuICB9XG5cbiAgZ2V0Vmlld3BvcnRTaXplKCk6IGdsbS5SZWFkb25seVZlYzIge1xuICAgIHJldHVybiB0aGlzLl92aWV3cG9ydFNpemU7XG4gIH1cblxuICAvL1xuXG4gIGxvb2tBdChcbiAgICBpbkV5ZTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblVwQXhpczogZ2xtLlJlYWRvbmx5VmVjM1xuICApIHtcbiAgICB0aGlzLnNldEV5ZShpbkV5ZSk7XG4gICAgdGhpcy5zZXRUYXJnZXQoaW5UYXJnZXQpO1xuICAgIHRoaXMuc2V0VXBBeGlzKGluVXBBeGlzKTtcbiAgfVxuXG4gIC8vXG5cbiAgc2V0RXllKGluRXllOiBnbG0uUmVhZG9ubHlWZWMzKSB7XG4gICAgZ2xtLnZlYzMuY29weSh0aGlzLl9leWUsIGluRXllKTtcbiAgfVxuICBzZXRUYXJnZXQoaW5UYXJnZXQ6IGdsbS5SZWFkb25seVZlYzMpIHtcbiAgICBnbG0udmVjMy5jb3B5KHRoaXMuX3RhcmdldCwgaW5UYXJnZXQpO1xuICB9XG4gIHNldFVwQXhpcyhpblVwQXhpczogZ2xtLlJlYWRvbmx5VmVjMykge1xuICAgIGdsbS52ZWMzLmNvcHkodGhpcy5fdXBBeGlzLCBpblVwQXhpcyk7XG4gIH1cblxuICBnZXRFeWUoKTogZ2xtLlJlYWRvbmx5VmVjMyB7XG4gICAgcmV0dXJuIHRoaXMuX2V5ZTtcbiAgfVxuICBnZXRUYXJnZXQoKTogZ2xtLlJlYWRvbmx5VmVjMyB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgfVxuICBnZXRVcEF4aXMoKTogZ2xtLlJlYWRvbmx5VmVjMyB7XG4gICAgcmV0dXJuIHRoaXMuX3VwQXhpcztcbiAgfVxuXG4gIC8vXG5cbiAgY29tcHV0ZU1hdHJpY2VzKCkge1xuICAgIGlmICh0aGlzLl9wcm9qZWN0aW9uVHlwZSA9PT0gUHJvamVjdGlvblR5cGUucGVyc3BlY3RpdmUpIHtcbiAgICAgIGNvbnN0IHsgZm92eSwgYXNwZWN0UmF0aW8sIG5lYXIsIGZhciB9ID0gdGhpcy5fcGVyc3BlY3RpdmVEYXRhITtcbiAgICAgIGdsbS5tYXQ0LnBlcnNwZWN0aXZlKFxuICAgICAgICB0aGlzLl9wcm9qZWN0aW9uTWF0cml4LFxuICAgICAgICBfZGVncmVlVG9SYWQoZm92eSksXG4gICAgICAgIGFzcGVjdFJhdGlvISxcbiAgICAgICAgbmVhcixcbiAgICAgICAgZmFyXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcHJvamVjdGlvblR5cGUgPT09IFByb2plY3Rpb25UeXBlLm9ydGhvZ29uYWwpIHtcbiAgICAgIGNvbnN0IHsgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tLCBuZWFyLCBmYXIgfSA9IHRoaXMuX29ydGhvZ29uYWxEYXRhITtcbiAgICAgIGdsbS5tYXQ0Lm9ydGhvKFxuICAgICAgICB0aGlzLl9wcm9qZWN0aW9uTWF0cml4LFxuICAgICAgICBsZWZ0LFxuICAgICAgICByaWdodCxcbiAgICAgICAgdG9wLFxuICAgICAgICBib3R0b20sXG4gICAgICAgIG5lYXIsXG4gICAgICAgIGZhclxuICAgICAgKTtcbiAgICB9XG5cbiAgICBnbG0ubWF0NC5sb29rQXQodGhpcy5fdmlld01hdHJpeCwgdGhpcy5fZXllLCB0aGlzLl90YXJnZXQsIHRoaXMuX3VwQXhpcyk7XG5cbiAgICB0aGlzLmNvbXB1dGVDb21wb3NlZE1hdHJpeCgpO1xuICB9XG5cbiAgY29tcHV0ZUNvbXBvc2VkTWF0cml4KCkge1xuICAgIGdsbS5tYXQ0Lm11bHRpcGx5KFxuICAgICAgdGhpcy5fY29tcG9zZWRNYXRyaXgsXG4gICAgICB0aGlzLl9wcm9qZWN0aW9uTWF0cml4LFxuICAgICAgdGhpcy5fdmlld01hdHJpeFxuICAgICk7XG4gIH1cblxuICBzZXRQcm9qZWN0aW9uTWF0cml4KGluTWF0NDogZ2xtLlJlYWRvbmx5TWF0NCkge1xuICAgIGdsbS5tYXQ0LmNvcHkodGhpcy5fcHJvamVjdGlvbk1hdHJpeCwgaW5NYXQ0KTtcbiAgfVxuICBzZXRWaWV3TWF0cml4KGluTWF0NDogZ2xtLlJlYWRvbmx5TWF0NCkge1xuICAgIGdsbS5tYXQ0LmNvcHkodGhpcy5fdmlld01hdHJpeCwgaW5NYXQ0KTtcbiAgfVxuICBzZXRDb21wb3NlZE1hdHJpeChpbk1hdDQ6IGdsbS5SZWFkb25seU1hdDQpIHtcbiAgICBnbG0ubWF0NC5jb3B5KHRoaXMuX2NvbXBvc2VkTWF0cml4LCBpbk1hdDQpO1xuICB9XG5cbiAgZ2V0UHJvamVjdGlvbk1hdHJpeCgpOiBnbG0uUmVhZG9ubHlNYXQ0IHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdGlvbk1hdHJpeDtcbiAgfVxuICBnZXRWaWV3TWF0cml4KCk6IGdsbS5SZWFkb25seU1hdDQge1xuICAgIHJldHVybiB0aGlzLl92aWV3TWF0cml4O1xuICB9XG4gIGdldENvbXBvc2VkTWF0cml4KCk6IGdsbS5SZWFkb25seU1hdDQge1xuICAgIHJldHVybiB0aGlzLl9jb21wb3NlZE1hdHJpeDtcbiAgfVxuXG4gIC8vXG5cbiAgZ2V0UGVyc3BlY3RpdmVEYXRhKCk6IFJlYWRvbmx5PElQZXJzcGVjdGl2ZURhdGEgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAodGhpcy5fcHJvamVjdGlvblR5cGUgIT09IFByb2plY3Rpb25UeXBlLnBlcnNwZWN0aXZlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNwZWN0aXZlRGF0YTtcbiAgfVxuICBnZXRPcnRob2dvbmFsRGF0YSgpOiBSZWFkb25seTxJT3J0aG9nb25hbERhdGEgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAodGhpcy5fcHJvamVjdGlvblR5cGUgIT09IFByb2plY3Rpb25UeXBlLm9ydGhvZ29uYWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGFuIG9ydGhvZ29uYWwgcHJvamVjdGlvbicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fb3J0aG9nb25hbERhdGE7XG4gIH1cbn1cbiIsCiAgImltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5lbnVtIEZydXN0dW1TaWRlIHtcbiAgUmlnaHQgPSAwLFxuICBMZWZ0ID0gMSxcbiAgQm90dG9tID0gMixcbiAgVG9wID0gMyxcbiAgQmFjayA9IDQsXG4gIEZyb250ID0gNVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGcnVzdHVtQ3VsbGluZyB7XG4gIGNhbGN1bGF0ZUZydXN0dW0ocHJvajogZ2xtLlJlYWRvbmx5TWF0NCwgdmlldzogZ2xtLlJlYWRvbmx5TWF0NCk6IHZvaWQ7XG4gIHNwaGVyZUluRnJ1c3R1bSh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCByYWRpdXM6IG51bWJlcik6IGJvb2xlYW47XG4gIHBvaW50SW5GcnVzdHVtKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBib29sZWFuO1xuICBjdWJlSW5GcnVzdHVtKGluWDogbnVtYmVyLCBpblk6IG51bWJlciwgaW5aOiBudW1iZXIsIGluU2l6ZTogbnVtYmVyKTogYm9vbGVhbjtcbiAgY3ViZUluRnJ1c3R1bVZlYzMoY2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLCBpblNpemU6IG51bWJlcik6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBGcnVzdHVtQ3VsbGluZyBpbXBsZW1lbnRzIElGcnVzdHVtQ3VsbGluZyB7XG4gIHByaXZhdGUgX2ZydXN0dW0gPSBuZXcgRmxvYXQzMkFycmF5KDI0KTsgLy8gNiAqIDQgdmFsdWVzXG5cbiAgcHJpdmF0ZSBfc2V0UGxhbmUoXG4gICAgc2lkZTogRnJ1c3R1bVNpZGUsXG4gICAgbGVmdDogZ2xtLlJlYWRvbmx5VmVjNCxcbiAgICByaWdodDogZ2xtLlJlYWRvbmx5VmVjNCxcbiAgICBjb2VmOiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgaW5kZXggPSBzaWRlICogNDtcblxuICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAwXSA9IGxlZnRbMF0gKyByaWdodFswXSAqIGNvZWY7XG4gICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDFdID0gbGVmdFsxXSArIHJpZ2h0WzFdICogY29lZjtcbiAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMl0gPSBsZWZ0WzJdICsgcmlnaHRbMl0gKiBjb2VmO1xuICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAzXSA9IGxlZnRbM10gKyByaWdodFszXSAqIGNvZWY7XG5cbiAgICBjb25zdCBtYWduaXR1ZGUgPSBNYXRoLnNxcnQoXG4gICAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMF0gKiB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMF0gK1xuICAgICAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMV0gKiB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMV0gK1xuICAgICAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMl0gKiB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMl1cbiAgICApO1xuXG4gICAgaWYgKG1hZ25pdHVkZSA9PT0gMCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDBdIC89IG1hZ25pdHVkZTtcbiAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMV0gLz0gbWFnbml0dWRlO1xuICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAyXSAvPSBtYWduaXR1ZGU7XG4gICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDNdIC89IG1hZ25pdHVkZTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUZydXN0dW0ocHJvajogZ2xtLlJlYWRvbmx5TWF0NCwgdmlldzogZ2xtLlJlYWRvbmx5TWF0NCkge1xuICAgIGNvbnN0IGNsaXAgPSBnbG0ubWF0NC5tdWx0aXBseShnbG0ubWF0NC5jcmVhdGUoKSwgcHJvaiwgdmlldyk7XG5cbiAgICAvLy9cblxuICAgIGNvbnN0IHJvdzAgPSBnbG0udmVjNC5mcm9tVmFsdWVzKGNsaXBbMF0sIGNsaXBbNF0sIGNsaXBbOF0sIGNsaXBbMTJdKTtcbiAgICBjb25zdCByb3cxID0gZ2xtLnZlYzQuZnJvbVZhbHVlcyhjbGlwWzFdLCBjbGlwWzVdLCBjbGlwWzldLCBjbGlwWzEzXSk7XG4gICAgY29uc3Qgcm93MiA9IGdsbS52ZWM0LmZyb21WYWx1ZXMoY2xpcFsyXSwgY2xpcFs2XSwgY2xpcFsxMF0sIGNsaXBbMTRdKTtcbiAgICBjb25zdCByb3czID0gZ2xtLnZlYzQuZnJvbVZhbHVlcyhjbGlwWzNdLCBjbGlwWzddLCBjbGlwWzExXSwgY2xpcFsxNV0pO1xuXG4gICAgdGhpcy5fc2V0UGxhbmUoRnJ1c3R1bVNpZGUuUmlnaHQsIHJvdzMsIHJvdzAsIC0xKTtcbiAgICB0aGlzLl9zZXRQbGFuZShGcnVzdHVtU2lkZS5MZWZ0LCByb3czLCByb3cwLCArMSk7XG4gICAgdGhpcy5fc2V0UGxhbmUoRnJ1c3R1bVNpZGUuQm90dG9tLCByb3czLCByb3cxLCArMSk7XG4gICAgdGhpcy5fc2V0UGxhbmUoRnJ1c3R1bVNpZGUuVG9wLCByb3czLCByb3cxLCAtMSk7XG4gICAgdGhpcy5fc2V0UGxhbmUoRnJ1c3R1bVNpZGUuQmFjaywgcm93Mywgcm93MiwgLTEpO1xuICAgIHRoaXMuX3NldFBsYW5lKEZydXN0dW1TaWRlLkZyb250LCByb3czLCByb3cyLCArMSk7XG4gIH1cblxuICBzcGhlcmVJbkZydXN0dW0oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgcmFkaXVzOiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgNjsgKytpaSkge1xuICAgICAgY29uc3QgaW5kZXggPSBpaSAqIDQ7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAwXSAqIHggK1xuICAgICAgICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAxXSAqIHkgK1xuICAgICAgICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAyXSAqIHogK1xuICAgICAgICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAzXSA8PVxuICAgICAgICAtcmFkaXVzXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcG9pbnRJbkZydXN0dW0oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuICAgIC8vIHNwaGVyZSBvZiByYWRpdXMgMCA9PiBwb2ludFxuICAgIHJldHVybiB0aGlzLnNwaGVyZUluRnJ1c3R1bSh4LCB5LCB6LCAwKTtcbiAgfVxuXG4gIGN1YmVJbkZydXN0dW1WZWMzKGNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMywgaW5TaXplOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5jdWJlSW5GcnVzdHVtKGNlbnRlclswXSwgY2VudGVyWzFdLCBjZW50ZXJbMl0sIGluU2l6ZSk7XG4gIH1cblxuICBjdWJlSW5GcnVzdHVtKGluWDogbnVtYmVyLCBpblk6IG51bWJlciwgaW5aOiBudW1iZXIsIGluU2l6ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgaFNpemUgPSBpblNpemUgKiAwLjU7XG4gICAgY29uc3QgbWluWCA9IGluWCAtIGhTaXplO1xuICAgIGNvbnN0IG1pblkgPSBpblkgLSBoU2l6ZTtcbiAgICBjb25zdCBtaW5aID0gaW5aIC0gaFNpemU7XG4gICAgY29uc3QgbWF4WCA9IGluWCArIGhTaXplO1xuICAgIGNvbnN0IG1heFkgPSBpblkgKyBoU2l6ZTtcbiAgICBjb25zdCBtYXhaID0gaW5aICsgaFNpemU7XG5cbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgNjsgKytpaSkge1xuICAgICAgY29uc3QgaW5kZXggPSBpaSAqIDQ7XG4gICAgICBjb25zdCBwbGFuQSA9IHRoaXMuX2ZydXN0dW1baW5kZXggKyAwXTtcbiAgICAgIGNvbnN0IHBsYW5CID0gdGhpcy5fZnJ1c3R1bVtpbmRleCArIDFdO1xuICAgICAgY29uc3QgcGxhbkMgPSB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMl07XG4gICAgICBjb25zdCBwbGFuRCA9IHRoaXMuX2ZydXN0dW1baW5kZXggKyAzXTtcblxuICAgICAgaWYgKFxuICAgICAgICBwbGFuQSAqIG1pblggKyBwbGFuQiAqIG1pblkgKyBwbGFuQyAqIG1pblogKyBwbGFuRCA+IDAgfHxcbiAgICAgICAgcGxhbkEgKiBtYXhYICsgcGxhbkIgKiBtaW5ZICsgcGxhbkMgKiBtaW5aICsgcGxhbkQgPiAwIHx8XG4gICAgICAgIHBsYW5BICogbWluWCArIHBsYW5CICogbWF4WSArIHBsYW5DICogbWluWiArIHBsYW5EID4gMCB8fFxuICAgICAgICBwbGFuQSAqIG1heFggKyBwbGFuQiAqIG1heFkgKyBwbGFuQyAqIG1pblogKyBwbGFuRCA+IDAgfHxcbiAgICAgICAgcGxhbkEgKiBtaW5YICsgcGxhbkIgKiBtaW5ZICsgcGxhbkMgKiBtYXhaICsgcGxhbkQgPiAwIHx8XG4gICAgICAgIHBsYW5BICogbWF4WCArIHBsYW5CICogbWluWSArIHBsYW5DICogbWF4WiArIHBsYW5EID4gMCB8fFxuICAgICAgICBwbGFuQSAqIG1pblggKyBwbGFuQiAqIG1heFkgKyBwbGFuQyAqIG1heFogKyBwbGFuRCA+IDAgfHxcbiAgICAgICAgcGxhbkEgKiBtYXhYICsgcGxhbkIgKiBtYXhZICsgcGxhbkMgKiBtYXhaICsgcGxhbkQgPiAwXG4gICAgICApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwKICAiZXhwb3J0IGRlZmF1bHQgYCN2ZXJzaW9uIDMwMCBlc1xuXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG5cbnVuaWZvcm0gbWF0NCB1X2NvbXBvc2VkTWF0cml4O1xudW5pZm9ybSB2ZWMzIHVfbGlnaHRQb3M7XG5cbmluIHZlYzMgYV92ZXJ0ZXhQb3NpdGlvbjtcbmluIHZlYzMgYV92ZXJ0ZXhOb3JtYWw7XG5cbmluIHZlYzMgYV9vZmZzZXRQb3NpdGlvbjtcbmluIHZlYzQgYV9vZmZzZXRPcmllbnRhdGlvbjsgLy8gcXVhdGVybmlvblxuaW4gdmVjMyBhX29mZnNldFNjYWxlO1xuaW4gdmVjMyBhX29mZnNldENvbG9yO1xuXG5vdXQgdmVjMyB2X2NvbG9yO1xuXG4vLyAjaW5jbHVkZSBcIi4vYXNzZXRzL2dyYXBoaWNzL3NoYWRlcnMvX2NvbW1vbi9fY29tbW9uLXF1YXQtcm90YXRpb25zLmdsc2wudmVydFwiXG5cbnZlYzQgcXVhdF9mcm9tX2F4aXNfYW5nbGUodmVjMyBheGlzLCBmbG9hdCBhbmdsZSlcbntcbiAgdmVjNCBxcjtcbiAgLy8gZmxvYXQgaGFsZl9hbmdsZSA9IChhbmdsZSAqIDAuNSkgKiAzLjE0MTU5IC8gMTgwLjA7XG4gIGZsb2F0IGhhbGZfYW5nbGUgPSAoYW5nbGUgKiAwLjUpO1xuICBxci54ID0gYXhpcy54ICogc2luKGhhbGZfYW5nbGUpO1xuICBxci55ID0gYXhpcy55ICogc2luKGhhbGZfYW5nbGUpO1xuICBxci56ID0gYXhpcy56ICogc2luKGhhbGZfYW5nbGUpO1xuICBxci53ID0gY29zKGhhbGZfYW5nbGUpO1xuICByZXR1cm4gcXI7XG59XG5cbnZlYzMgYXBwbHlfcXVhdF90b192ZWMzKHZlYzMgcG9zaXRpb24sIHZlYzQgcSlcbntcbiAgdmVjMyB2ID0gcG9zaXRpb24ueHl6O1xuICByZXR1cm4gdiArIDIuMCAqIGNyb3NzKHEueHl6LCBjcm9zcyhxLnh5eiwgdikgKyBxLncgKiB2KTtcbn1cblxuLy8gI2luY2x1ZGUgXCIuL2Fzc2V0cy9ncmFwaGljcy9zaGFkZXJzL19jb21tb24vX2NvbW1vbi1hcHBseS1saWdodGluZy5nbHNsLmZyYWdcIlxuXG5mbG9hdCBnZXREaWZmdXNlTGlnaHRpbmdSYXRpbyh2ZWMzIGxpZ2h0RGlyLCB2ZWMzIG5vcm1hbClcbntcbiAgbm9ybWFsID0gbm9ybWFsaXplKG5vcm1hbCk7XG4gIGxpZ2h0RGlyID0gbm9ybWFsaXplKGxpZ2h0RGlyKTtcblxuICByZXR1cm4gbWF4KGRvdChsaWdodERpciwgbm9ybWFsKSwgMC4wKTtcbn1cblxudm9pZCBtYWluKHZvaWQpXG57XG5cdHZlYzMgd29ybGRTcGFjZVBvc2l0aW9uID0gYV9vZmZzZXRQb3NpdGlvbiArIGFwcGx5X3F1YXRfdG9fdmVjMyhhX3ZlcnRleFBvc2l0aW9uICogYV9vZmZzZXRTY2FsZSwgYV9vZmZzZXRPcmllbnRhdGlvbik7XG5cdHZlYzMgd29ybGRTcGFjZU5vcm1hbCA9IGFwcGx5X3F1YXRfdG9fdmVjMyhhX3ZlcnRleE5vcm1hbCwgYV9vZmZzZXRPcmllbnRhdGlvbik7XG5cblx0Z2xfUG9zaXRpb24gPSB1X2NvbXBvc2VkTWF0cml4ICogdmVjNCh3b3JsZFNwYWNlUG9zaXRpb24sIDEuMCk7XG5cblx0ZmxvYXQgZGlmZnVzZVJhdGlvID0gZ2V0RGlmZnVzZUxpZ2h0aW5nUmF0aW8odV9saWdodFBvcyAtIHdvcmxkU3BhY2VQb3NpdGlvbiwgd29ybGRTcGFjZU5vcm1hbCk7XG5cblx0dl9jb2xvciA9IGFfb2Zmc2V0Q29sb3IgKiAoMC4zICsgZGlmZnVzZVJhdGlvKTtcbn1cbmAudHJpbSgpOyIsCiAgImV4cG9ydCBkZWZhdWx0IGAjdmVyc2lvbiAzMDAgZXNcblxucHJlY2lzaW9uIGxvd3AgZmxvYXQ7XG5cbmluIHZlYzMgdl9jb2xvcjtcblxub3V0IHZlYzQgb3V0X2NvbG9yO1xuXG4vL1xuLy9cbi8vXG5cbnZvaWQgbWFpbih2b2lkKVxue1xuXHRvdXRfY29sb3IgPSB2ZWM0KHZfY29sb3IsIDEuMCk7XG59XG5gLnRyaW0oKTsiLAogICJpbXBvcnQgeyBncmFwaGljcyB9IGZyb20gJy4uLy4uLy4uJztcblxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuL3NoYWRlcnMvZ2VvbWV0cnktc3RhY2stcmVuZGVyZXIuZ2xzbC52ZXJ0Jztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tICcuL3NoYWRlcnMvZ2VvbWV0cnktc3RhY2stcmVuZGVyZXIuZ2xzbC5mcmFnJztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmludGVyZmFjZSBJQWxpYXNlZEdlb21ldHJ5IHtcbiAgZ2VvbWV0cnk6IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnk7XG4gIGJ1ZmZlcjogRmxvYXQzMkFycmF5O1xuICBjdXJyZW50U2l6ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgR2VvbWV0cnlTdGFja1JlbmRlcmVyIHtcbiAgcHJpdmF0ZSBfc2hhZGVyOiBncmFwaGljcy53ZWJnbDIuU2hhZGVyUHJvZ3JhbTtcbiAgcHJpdmF0ZSBfZ2VvRGVmOiBncmFwaGljcy53ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLkdlb21ldHJ5RGVmaW5pdGlvbjtcblxuICBwcml2YXRlIF9hbGlhc2VkR2VvbWV0cmllc01hcCA9IG5ldyBNYXA8bnVtYmVyLCBJQWxpYXNlZEdlb21ldHJ5PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3NoYWRlciA9IG5ldyBncmFwaGljcy53ZWJnbDIuU2hhZGVyUHJvZ3JhbSgnR2VvbWV0cnlTdGFja1JlbmRlcmVyJywge1xuICAgICAgdmVydGV4U3JjOiB2ZXJ0ZXhTaGFkZXIsXG4gICAgICBmcmFnbWVudFNyYzogZnJhZ21lbnRTaGFkZXIsXG4gICAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICdhX3ZlcnRleFBvc2l0aW9uJyxcbiAgICAgICAgJ2FfdmVydGV4Tm9ybWFsJyxcbiAgICAgICAgJ2Ffb2Zmc2V0UG9zaXRpb24nLFxuICAgICAgICAnYV9vZmZzZXRPcmllbnRhdGlvbicsXG4gICAgICAgICdhX29mZnNldFNjYWxlJyxcbiAgICAgICAgJ2Ffb2Zmc2V0Q29sb3InLFxuICAgICAgXSxcbiAgICAgIHVuaWZvcm1zOiBbJ3VfY29tcG9zZWRNYXRyaXgnLCAndV9saWdodFBvcyddXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZW9CdWlsZGVyID0gbmV3IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlCdWlsZGVyKCk7XG4gICAgZ2VvQnVpbGRlclxuICAgICAgLnJlc2V0KClcbiAgICAgIC5zZXRQcmltaXRpdmVUeXBlKCd0cmlhbmdsZXMnKVxuICAgICAgLmFkZFZibygpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleFBvc2l0aW9uJywgJ3ZlYzNmJylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2FfdmVydGV4Tm9ybWFsJywgJ3ZlYzNmJylcbiAgICAgIC5hZGRWYm8oKVxuICAgICAgLnNldFZib0FzRHluYW1pYygpXG4gICAgICAuc2V0VmJvQXNJbnN0YW5jZWQoKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV9vZmZzZXRQb3NpdGlvbicsICd2ZWMzZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldE9yaWVudGF0aW9uJywgJ3ZlYzRmJylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2Ffb2Zmc2V0U2NhbGUnLCAndmVjM2YnKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV9vZmZzZXRDb2xvcicsICd2ZWMzZicpO1xuXG4gICAgdGhpcy5fZ2VvRGVmID0gZ2VvQnVpbGRlci5nZXREZWYoKTtcblxuICAgIC8vIHRoaXMuX2dlb21ldHJ5ID0gbmV3IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnkoXG4gICAgLy8gICB0aGlzLl9zaGFkZXIsXG4gICAgLy8gICB0aGlzLl9nZW9EZWZcbiAgICAvLyApO1xuXG4gICAgLy8gY29uc3QgbW9kZWxNYXQ0ID0gZ2xtLm1hdDQuY3JlYXRlKCk7XG4gICAgLy8gZ2xtLm1hdDQuaWRlbnRpdHkobW9kZWxNYXQ0KTtcbiAgICAvLyBnbG0ubWF0NC5zY2FsZShtb2RlbE1hdDQsIG1vZGVsTWF0NCwgWzIsMSwxXSk7XG4gICAgLy8gY29uc3QgdmVydGljZXMgPSBnZW5lcmF0ZVNwaGVyZVZlcnRpY2VzKDAsIDAuNSwgbW9kZWxNYXQ0KTtcblxuICAgIC8vIGNvbnN0IHJhd0RhdGEgPSB2ZXJ0aWNlcy5tYXAodmVydGV4ID0+IFtcbiAgICAvLyAgIHZlcnRleC5wb3NpdGlvblswXSxcbiAgICAvLyAgIHZlcnRleC5wb3NpdGlvblsxXSxcbiAgICAvLyAgIHZlcnRleC5wb3NpdGlvblsyXSxcbiAgICAvLyAgIHZlcnRleC5ub3JtYWxbMF0sXG4gICAgLy8gICB2ZXJ0ZXgubm9ybWFsWzFdLFxuICAgIC8vICAgdmVydGV4Lm5vcm1hbFsyXV1cbiAgICAvLyApLmZsYXQoKTtcblxuICAgIC8vIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZUJ1ZmZlcigwLCByYXdEYXRhLCByYXdEYXRhLmxlbmd0aCk7XG4gICAgLy8gdGhpcy5fZ2VvbWV0cnkuc2V0UHJpbWl0aXZlQ291bnQocmF3RGF0YS5sZW5ndGggLyA2KTtcbiAgfVxuXG4gIGNyZWF0ZUFsaWFzKGFsaWFzOiBudW1iZXIsIGJ1ZmZlclNpemU6IG51bWJlciwgdmVydGljZXM6IG51bWJlcltdKTogdm9pZCB7XG4gICAgY29uc3QgYWxpYXNHZW9tZXRyeSA9IHRoaXMuX2FsaWFzZWRHZW9tZXRyaWVzTWFwLmdldChhbGlhcyk7XG4gICAgaWYgKGFsaWFzR2VvbWV0cnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImFsaWFzIGFscmVhZHkgZXhpc3QsIGFsaWFzOiBcIiArIGFsaWFzKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdBbGlhczogSUFsaWFzZWRHZW9tZXRyeSA9IHtcbiAgICAgIGdlb21ldHJ5OiBuZXcgZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeSh0aGlzLl9zaGFkZXIsIHRoaXMuX2dlb0RlZiksXG4gICAgICBidWZmZXI6IG5ldyBGbG9hdDMyQXJyYXkoYnVmZmVyU2l6ZSAqIDEzKSxcbiAgICAgIGN1cnJlbnRTaXplOiAwLFxuICAgIH07XG5cbiAgICBuZXdBbGlhcy5nZW9tZXRyeS51cGRhdGVCdWZmZXIoMCwgdmVydGljZXMsIHZlcnRpY2VzLmxlbmd0aCk7XG4gICAgbmV3QWxpYXMuZ2VvbWV0cnkuc2V0UHJpbWl0aXZlQ291bnQodmVydGljZXMubGVuZ3RoIC8gNik7XG4gICAgdGhpcy5fYWxpYXNlZEdlb21ldHJpZXNNYXAuc2V0KGFsaWFzLCBuZXdBbGlhcyk7XG4gIH1cbiAgZGVsZXRlQWxpYXMoYWxpYXM6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGFsaWFzR2VvbWV0cnkgPSB0aGlzLl9hbGlhc2VkR2VvbWV0cmllc01hcC5nZXQoYWxpYXMpO1xuICAgIGlmICghYWxpYXNHZW9tZXRyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWxpYXMgbm90IGZvdW5kLCBhbGlhczogXCIgKyBhbGlhcyk7XG4gICAgfVxuICAgIHRoaXMuX2FsaWFzZWRHZW9tZXRyaWVzTWFwLmRlbGV0ZShhbGlhcyk7XG4gIH1cbiAgY2xlYXJBbGlhcyhhbGlhczogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgYWxpYXNHZW9tZXRyeSA9IHRoaXMuX2FsaWFzZWRHZW9tZXRyaWVzTWFwLmdldChhbGlhcyk7XG4gICAgaWYgKCFhbGlhc0dlb21ldHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbGlhcyBub3QgZm91bmQsIGFsaWFzOiBcIiArIGFsaWFzKTtcbiAgICB9XG4gICAgYWxpYXNHZW9tZXRyeS5jdXJyZW50U2l6ZSA9IDA7XG4gIH1cbiAgcHVzaEFsaWFzKFxuICAgIGFsaWFzOiBudW1iZXIsXG4gICAgcG9zaXRpb246IGdsbS5SZWFkb25seVZlYzMsXG4gICAgb3JpZW50YXRpb246IGdsbS5SZWFkb25seVF1YXQsXG4gICAgc2NhbGU6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgY29sb3I6IGdsbS5SZWFkb25seVZlYzMsXG4gICk6IHZvaWQge1xuXG4gICAgY29uc3QgYWxpYXNHZW9tZXRyeSA9IHRoaXMuX2FsaWFzZWRHZW9tZXRyaWVzTWFwLmdldChhbGlhcyk7XG4gICAgaWYgKCFhbGlhc0dlb21ldHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbGlhcyBub3QgZm91bmQsIGFsaWFzOiBcIiArIGFsaWFzKTtcbiAgICB9XG5cbiAgICBhbGlhc0dlb21ldHJ5LmJ1ZmZlclthbGlhc0dlb21ldHJ5LmN1cnJlbnRTaXplKytdID0gcG9zaXRpb25bMF07XG4gICAgYWxpYXNHZW9tZXRyeS5idWZmZXJbYWxpYXNHZW9tZXRyeS5jdXJyZW50U2l6ZSsrXSA9IHBvc2l0aW9uWzFdO1xuICAgIGFsaWFzR2VvbWV0cnkuYnVmZmVyW2FsaWFzR2VvbWV0cnkuY3VycmVudFNpemUrK10gPSBwb3NpdGlvblsyXTtcbiAgICBhbGlhc0dlb21ldHJ5LmJ1ZmZlclthbGlhc0dlb21ldHJ5LmN1cnJlbnRTaXplKytdID0gb3JpZW50YXRpb25bMF07XG4gICAgYWxpYXNHZW9tZXRyeS5idWZmZXJbYWxpYXNHZW9tZXRyeS5jdXJyZW50U2l6ZSsrXSA9IG9yaWVudGF0aW9uWzFdO1xuICAgIGFsaWFzR2VvbWV0cnkuYnVmZmVyW2FsaWFzR2VvbWV0cnkuY3VycmVudFNpemUrK10gPSBvcmllbnRhdGlvblsyXTtcbiAgICBhbGlhc0dlb21ldHJ5LmJ1ZmZlclthbGlhc0dlb21ldHJ5LmN1cnJlbnRTaXplKytdID0gb3JpZW50YXRpb25bM107XG4gICAgYWxpYXNHZW9tZXRyeS5idWZmZXJbYWxpYXNHZW9tZXRyeS5jdXJyZW50U2l6ZSsrXSA9IHNjYWxlWzBdO1xuICAgIGFsaWFzR2VvbWV0cnkuYnVmZmVyW2FsaWFzR2VvbWV0cnkuY3VycmVudFNpemUrK10gPSBzY2FsZVsxXTtcbiAgICBhbGlhc0dlb21ldHJ5LmJ1ZmZlclthbGlhc0dlb21ldHJ5LmN1cnJlbnRTaXplKytdID0gc2NhbGVbMl07XG4gICAgYWxpYXNHZW9tZXRyeS5idWZmZXJbYWxpYXNHZW9tZXRyeS5jdXJyZW50U2l6ZSsrXSA9IGNvbG9yWzBdO1xuICAgIGFsaWFzR2VvbWV0cnkuYnVmZmVyW2FsaWFzR2VvbWV0cnkuY3VycmVudFNpemUrK10gPSBjb2xvclsxXTtcbiAgICBhbGlhc0dlb21ldHJ5LmJ1ZmZlclthbGlhc0dlb21ldHJ5LmN1cnJlbnRTaXplKytdID0gY29sb3JbMl07XG4gICAgLy8gYWxpYXNHZW9tZXRyeS5jdXJyZW50U2l6ZSArPSAxMztcblxuICB9XG5cbiAgZmx1c2goXG4gICAgY29tcG9zZWRNYXRyaXg6IGdsbS5SZWFkb25seU1hdDQsXG4gICAgbGlnaHRQb3M6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgY2xlYXJTdGFjazogYm9vbGVhbiA9IHRydWVcbiAgKSB7XG5cbiAgICBsZXQgY2FuUmVuZGVyID0gZmFsc2U7XG4gICAgWy4uLnRoaXMuX2FsaWFzZWRHZW9tZXRyaWVzTWFwLnZhbHVlcygpXS5mb3JFYWNoKHZhbCA9PiB7XG4gICAgICBpZiAodmFsLmN1cnJlbnRTaXplID4gMCkge1xuICAgICAgICBjYW5SZW5kZXIgPSB0cnVlXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIWNhblJlbmRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NoYWRlci5iaW5kKChib3VuZFNoYWRlcikgPT4ge1xuICAgICAgYm91bmRTaGFkZXIuc2V0TWF0cml4NFVuaWZvcm0oJ3VfY29tcG9zZWRNYXRyaXgnLCBjb21wb3NlZE1hdHJpeCk7XG4gICAgICBib3VuZFNoYWRlci5zZXRGbG9hdDNVbmlmb3JtKCd1X2xpZ2h0UG9zJywgbGlnaHRQb3NbMF0sIGxpZ2h0UG9zWzFdLCBsaWdodFBvc1syXSk7XG5cbiAgICAgIFsuLi50aGlzLl9hbGlhc2VkR2VvbWV0cmllc01hcC52YWx1ZXMoKV0uZm9yRWFjaCh2YWwgPT4ge1xuXG4gICAgICAgIGlmICh2YWwuY3VycmVudFNpemUgPT09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YWwuZ2VvbWV0cnkudXBkYXRlQnVmZmVyKDEsIHZhbC5idWZmZXIsIHZhbC5jdXJyZW50U2l6ZSk7XG4gICAgICAgIHZhbC5nZW9tZXRyeS5zZXRJbnN0YW5jZWRDb3VudCh2YWwuY3VycmVudFNpemUgLyAxMyk7XG4gICAgICAgIHZhbC5nZW9tZXRyeS5yZW5kZXIoKTtcblxuICAgICAgICBpZiAoY2xlYXJTdGFjayA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHZhbC5jdXJyZW50U2l6ZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgWy4uLnRoaXMuX2FsaWFzZWRHZW9tZXRyaWVzTWFwLnZhbHVlcygpXS5mb3JFYWNoKHZhbCA9PiB7XG4gICAgICB2YWwuY3VycmVudFNpemUgPSAwO1xuICAgIH0pO1xuICB9XG59XG4iLAogICJleHBvcnQgZGVmYXVsdCBgXG4jdmVyc2lvbiAzMDAgZXNcblxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuXG51bmlmb3JtIG1hdDQgdV9jb21wb3NlZE1hdHJpeDtcblxuaW4gdmVjMyBhX3ZlcnRleF9wb3NpdGlvbjtcbmluIHZlYzQgYV92ZXJ0ZXhfY29sb3I7XG5cbmZsYXQgb3V0IHZlYzQgdl9jb2xvcjtcblxudm9pZCBtYWluKHZvaWQpXG57XG4gIGdsX1Bvc2l0aW9uID0gdV9jb21wb3NlZE1hdHJpeCAqIHZlYzQoYV92ZXJ0ZXhfcG9zaXRpb24sIDEuMCk7XG5cbiAgdl9jb2xvciA9IGFfdmVydGV4X2NvbG9yO1xufVxuYC50cmltKCk7IiwKICAiZXhwb3J0IGRlZmF1bHQgYFxuI3ZlcnNpb24gMzAwIGVzXG5cbnByZWNpc2lvbiBsb3dwIGZsb2F0O1xuXG5mbGF0IGluIHZlYzQgdl9jb2xvcjtcblxub3V0IHZlYzQgb19jb2xvcjtcblxudm9pZCBtYWluKHZvaWQpXG57XG4gIG9fY29sb3IgPSB2X2NvbG9yO1xufVxuYC50cmltKCk7IiwKICAiaW1wb3J0IHsgZ3JhcGhpY3MgfSBmcm9tICcuLi8uLi8uLi8uLic7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5jb25zdCBrX2J1ZmZlclNpemUgPSAxNCAqIDEwMjQ7XG5cbmV4cG9ydCBjbGFzcyBXaXJlRnJhbWVzU3RhY2tSZW5kZXJlciB7XG4gIHByaXZhdGUgX3NoYWRlcjogZ3JhcGhpY3Mud2ViZ2wyLklVbmJvdW5kU2hhZGVyO1xuICBwcml2YXRlIF9nZW9tZXRyeTogZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeTtcblxuICBwcml2YXRlIF9idWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGtfYnVmZmVyU2l6ZSk7XG4gIHByaXZhdGUgX2N1cnJlbnRTaXplOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluU2hhZGVyOiBncmFwaGljcy53ZWJnbDIuSVVuYm91bmRTaGFkZXIsXG4gICAgaW5HZW9tZXRyeURlZjogZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeURlZmluaXRpb25cbiAgKSB7XG4gICAgdGhpcy5fc2hhZGVyID0gaW5TaGFkZXI7XG4gICAgY29uc3QgZ2VvbWV0cnlEZWY6IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlEZWZpbml0aW9uID0ge1xuICAgICAgLi4uaW5HZW9tZXRyeURlZixcbiAgICAgIHByaW1pdGl2ZVR5cGU6IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuUHJpbWl0aXZlVHlwZS5saW5lc1xuICAgIH07XG5cbiAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBncmFwaGljcy53ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLkdlb21ldHJ5KGluU2hhZGVyLCBnZW9tZXRyeURlZik7XG4gICAgdGhpcy5fZ2VvbWV0cnkuc2V0RmxvYXRCdWZmZXJTaXplKDAsIGtfYnVmZmVyU2l6ZSk7XG4gIH1cblxuICBwdXNoTGluZShcbiAgICBpblBvaW50QTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblBvaW50QjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzIHwgZ2xtLlJlYWRvbmx5VmVjNFxuICApIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFNpemUgKyA3ICogMiA+PSB0aGlzLl9idWZmZXIubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5fc2hhZGVyLmlzQm91bmQoKSkge1xuICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWxwaGFWYWx1ZSA9IGluQ29sb3JbM10gPz8gMTtcblxuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDBdID0gaW5Qb2ludEFbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMV0gPSBpblBvaW50QVsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAyXSA9IGluUG9pbnRBWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDNdID0gaW5Db2xvclswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA0XSA9IGluQ29sb3JbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNV0gPSBpbkNvbG9yWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDZdID0gYWxwaGFWYWx1ZTtcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSArPSA3O1xuXG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMF0gPSBpblBvaW50QlswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAxXSA9IGluUG9pbnRCWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDJdID0gaW5Qb2ludEJbMl07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgM10gPSBpbkNvbG9yWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDRdID0gaW5Db2xvclsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA1XSA9IGluQ29sb3JbMl07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNl0gPSBhbHBoYVZhbHVlO1xuICAgIHRoaXMuX2N1cnJlbnRTaXplICs9IDc7XG4gIH1cblxuICBjYW5SZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTaXplID4gMDtcbiAgfVxuXG4gIGZsdXNoKCkge1xuICAgIGlmICghdGhpcy5jYW5SZW5kZXIoKSkgcmV0dXJuO1xuXG4gICAgdGhpcy5fZ2VvbWV0cnkudXBkYXRlQnVmZmVyKDAsIHRoaXMuX2J1ZmZlciwgdGhpcy5fY3VycmVudFNpemUpO1xuICAgIHRoaXMuX2dlb21ldHJ5LnNldFByaW1pdGl2ZUNvdW50KHRoaXMuX2N1cnJlbnRTaXplIC8gNyk7XG5cbiAgICB0aGlzLl9nZW9tZXRyeS5yZW5kZXIoKTtcblxuICAgIHRoaXMuY2xlYXIoKTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIC8vIHJlc2V0IHZlcnRpY2VzXG4gICAgdGhpcy5fY3VycmVudFNpemUgPSAwO1xuICB9XG59XG4iLAogICJpbXBvcnQgeyBncmFwaGljcyB9IGZyb20gJy4uLy4uLy4uLy4uJztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmNvbnN0IGtfYnVmZmVyU2l6ZSA9IDcgKiAxMDI0O1xuXG5leHBvcnQgY2xhc3MgVHJpYW5nbGVzU3RhY2tSZW5kZXJlciB7XG4gIHByaXZhdGUgX3NoYWRlcjogZ3JhcGhpY3Mud2ViZ2wyLklVbmJvdW5kU2hhZGVyO1xuICBwcml2YXRlIF9nZW9tZXRyeTogZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeTtcblxuICBwcml2YXRlIF9idWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGtfYnVmZmVyU2l6ZSk7XG4gIHByaXZhdGUgX2N1cnJlbnRTaXplOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluU2hhZGVyOiBncmFwaGljcy53ZWJnbDIuSVVuYm91bmRTaGFkZXIsXG4gICAgaW5HZW9tZXRyeURlZjogZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeURlZmluaXRpb25cbiAgKSB7XG4gICAgdGhpcy5fc2hhZGVyID0gaW5TaGFkZXI7XG4gICAgY29uc3QgZ2VvbWV0cnlEZWY6IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlEZWZpbml0aW9uID0ge1xuICAgICAgLi4uaW5HZW9tZXRyeURlZixcbiAgICAgIHByaW1pdGl2ZVR5cGU6IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuUHJpbWl0aXZlVHlwZS50cmlhbmdsZXNcbiAgICB9O1xuXG4gICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeShpblNoYWRlciwgZ2VvbWV0cnlEZWYpO1xuICAgIHRoaXMuX2dlb21ldHJ5LnNldEZsb2F0QnVmZmVyU2l6ZSgwLCBrX2J1ZmZlclNpemUpO1xuICB9XG5cbiAgcHVzaFRyaWFuZ2xlKFxuICAgIGluUG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRDOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSArIDcgKiA2ID49IHRoaXMuX2J1ZmZlci5sZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLl9zaGFkZXIuaXNCb3VuZCgpKSB7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhbHBoYVZhbHVlID0gaW5Db2xvclszXSA/PyAxO1xuXG4gICAgLy8gMFxuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDBdID0gaW5Qb2ludEFbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMV0gPSBpblBvaW50QVsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAyXSA9IGluUG9pbnRBWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDNdID0gaW5Db2xvclswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA0XSA9IGluQ29sb3JbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNV0gPSBpbkNvbG9yWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDZdID0gYWxwaGFWYWx1ZTtcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSArPSA3O1xuXG4gICAgLy8gMlxuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDBdID0gaW5Qb2ludEJbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMV0gPSBpblBvaW50QlsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAyXSA9IGluUG9pbnRCWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDNdID0gaW5Db2xvclswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA0XSA9IGluQ29sb3JbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNV0gPSBpbkNvbG9yWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDZdID0gYWxwaGFWYWx1ZTtcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSArPSA3O1xuXG4gICAgLy8gM1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDBdID0gaW5Qb2ludENbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMV0gPSBpblBvaW50Q1sxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAyXSA9IGluUG9pbnRDWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDNdID0gaW5Db2xvclswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA0XSA9IGluQ29sb3JbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNV0gPSBpbkNvbG9yWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDZdID0gYWxwaGFWYWx1ZTtcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSArPSA3O1xuICB9XG5cbiAgcHVzaExpbmUoXG4gICAgaW5Qb2ludEE6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Qb2ludEI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgdGhpY2tuZXNzOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRTaXplICsgNyAqIDYgPj0gdGhpcy5fYnVmZmVyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRpZmZYID0gaW5Qb2ludEJbMF0gLSBpblBvaW50QVswXTtcbiAgICBjb25zdCBkaWZmWSA9IGluUG9pbnRCWzFdIC0gaW5Qb2ludEFbMV07XG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKGRpZmZZLCBkaWZmWCkgKyBNYXRoLlBJICogMC41O1xuXG4gICAgY29uc3Qgc3RlcFggPSBNYXRoLmNvcyhhbmdsZSkgKiB0aGlja25lc3MgKiAwLjU7XG4gICAgY29uc3Qgc3RlcFkgPSBNYXRoLnNpbihhbmdsZSkgKiB0aGlja25lc3MgKiAwLjU7XG5cbiAgICB0aGlzLnB1c2hUcmlhbmdsZShcbiAgICAgIFtpblBvaW50QVswXSAtIHN0ZXBYLCBpblBvaW50QVsxXSAtIHN0ZXBZLCBpblBvaW50QVsyXV0sXG4gICAgICBbaW5Qb2ludEJbMF0gLSBzdGVwWCwgaW5Qb2ludEJbMV0gLSBzdGVwWSwgaW5Qb2ludEJbMl1dLFxuICAgICAgW2luUG9pbnRCWzBdICsgc3RlcFgsIGluUG9pbnRCWzFdICsgc3RlcFksIGluUG9pbnRCWzJdXSxcbiAgICAgIGluQ29sb3JcbiAgICApO1xuICAgIHRoaXMucHVzaFRyaWFuZ2xlKFxuICAgICAgW2luUG9pbnRBWzBdIC0gc3RlcFgsIGluUG9pbnRBWzFdIC0gc3RlcFksIGluUG9pbnRBWzJdXSxcbiAgICAgIFtpblBvaW50QlswXSArIHN0ZXBYLCBpblBvaW50QlsxXSArIHN0ZXBZLCBpblBvaW50QlsyXV0sXG4gICAgICBbaW5Qb2ludEFbMF0gKyBzdGVwWCwgaW5Qb2ludEFbMV0gKyBzdGVwWSwgaW5Qb2ludEFbMl1dLFxuICAgICAgaW5Db2xvclxuICAgICk7XG4gIH1cblxuICBwdXNoUm90YXRlZExpbmUoXG4gICAgY2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGFuZ2xlOiBudW1iZXIsXG4gICAgbGVuZ3RoOiBudW1iZXIsXG4gICAgdGhpY2tuZXNzOiBudW1iZXIsXG4gICAgY29sb3I6IGdsbS5SZWFkb25seVZlYzNcbiAgKSB7XG4gICAgdGhpcy5wdXNoTGluZShcbiAgICAgIFtcbiAgICAgICAgY2VudGVyWzBdIC0gbGVuZ3RoICogTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICBjZW50ZXJbMV0gLSBsZW5ndGggKiBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgIGNlbnRlclsyXVxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgY2VudGVyWzBdICsgbGVuZ3RoICogTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICBjZW50ZXJbMV0gKyBsZW5ndGggKiBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgIGNlbnRlclsyXVxuICAgICAgXSxcbiAgICAgIHRoaWNrbmVzcyxcbiAgICAgIGNvbG9yXG4gICAgKTtcbiAgfVxuXG4gIHB1c2hPcmlnaW5Cb3VuZFJlY3RhbmdsZShcbiAgICBpbk9yaWdpbjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNpemU6IGdsbS5SZWFkb25seVZlYzIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRTaXplICsgNyAqIDYgPj0gdGhpcy5fYnVmZmVyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1heENvb3JkOiBnbG0uUmVhZG9ubHlWZWMyID0gW1xuICAgICAgaW5PcmlnaW5bMF0gKyBpblNpemVbMF0sXG4gICAgICBpbk9yaWdpblsxXSArIGluU2l6ZVsxXVxuICAgIF07XG5cbiAgICB0aGlzLnB1c2hUcmlhbmdsZShcbiAgICAgIFtpbk9yaWdpblswXSwgaW5PcmlnaW5bMV0sIGluT3JpZ2luWzJdXSxcbiAgICAgIFttYXhDb29yZFswXSwgbWF4Q29vcmRbMV0sIGluT3JpZ2luWzJdXSxcbiAgICAgIFtpbk9yaWdpblswXSwgbWF4Q29vcmRbMV0sIGluT3JpZ2luWzJdXSxcbiAgICAgIGluQ29sb3JcbiAgICApO1xuXG4gICAgdGhpcy5wdXNoVHJpYW5nbGUoXG4gICAgICBbaW5PcmlnaW5bMF0sIGluT3JpZ2luWzFdLCBpbk9yaWdpblsyXV0sXG4gICAgICBbbWF4Q29vcmRbMF0sIGluT3JpZ2luWzFdLCBpbk9yaWdpblsyXV0sXG4gICAgICBbbWF4Q29vcmRbMF0sIG1heENvb3JkWzFdLCBpbk9yaWdpblsyXV0sXG4gICAgICBpbkNvbG9yXG4gICAgKTtcbiAgfVxuXG4gIHB1c2hDZW50ZXJlZFJlY3RhbmdsZShcbiAgICBpbkNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNpemU6IGdsbS5SZWFkb25seVZlYzIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKSB7XG4gICAgY29uc3Qgb3JpZ2luOiBnbG0uUmVhZG9ubHlWZWMzID0gW1xuICAgICAgaW5DZW50ZXJbMF0gLSBpblNpemVbMF0gKiAwLjUsXG4gICAgICBpbkNlbnRlclsxXSAtIGluU2l6ZVsxXSAqIDAuNSxcbiAgICAgIGluQ2VudGVyWzJdXG4gICAgXTtcblxuICAgIHRoaXMucHVzaE9yaWdpbkJvdW5kUmVjdGFuZ2xlKG9yaWdpbiwgaW5TaXplLCBpbkNvbG9yKTtcbiAgfVxuXG4gIGNhblJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNpemUgPiAwO1xuICB9XG5cbiAgZmx1c2goKSB7XG4gICAgaWYgKCF0aGlzLmNhblJlbmRlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fZ2VvbWV0cnkudXBkYXRlQnVmZmVyKDAsIHRoaXMuX2J1ZmZlciwgdGhpcy5fY3VycmVudFNpemUpO1xuICAgIHRoaXMuX2dlb21ldHJ5LnNldFByaW1pdGl2ZUNvdW50KHRoaXMuX2N1cnJlbnRTaXplIC8gNyk7XG5cbiAgICB0aGlzLl9nZW9tZXRyeS5yZW5kZXIoKTtcblxuICAgIHRoaXMuY2xlYXIoKTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIC8vIHJlc2V0IHZlcnRpY2VzXG4gICAgdGhpcy5fY3VycmVudFNpemUgPSAwO1xuICB9XG59XG4iLAogICJpbXBvcnQge1xuICBncmFwaGljc1xufSBmcm9tICcuLi8uLi8uLic7XG5cbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBzdGFja1JlbmRlcmVyVmVydGV4IGZyb20gJy4vc2hhZGVycy9zdGFjay1yZW5kZXJlci5nbHNsLnZlcnQnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHN0YWNrUmVuZGVyZXJGcmFnbWVudCBmcm9tICcuL3NoYWRlcnMvc3RhY2stcmVuZGVyZXIuZ2xzbC5mcmFnJztcblxuaW1wb3J0IHsgV2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIgfSBmcm9tICcuL2ludGVybmFscy9XaXJlRnJhbWVzU3RhY2tSZW5kZXJlcic7XG5pbXBvcnQgeyBUcmlhbmdsZXNTdGFja1JlbmRlcmVyIH0gZnJvbSAnLi9pbnRlcm5hbHMvVHJpYW5nbGVzU3RhY2tSZW5kZXJlcic7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdGFja1JlbmRlcmVycyB7XG4gIHB1c2hUcmlhbmdsZShcbiAgICBpblBvc0E6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Qb3NCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9zQzogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzIHwgZ2xtLlJlYWRvbmx5VmVjNFxuICApOiB2b2lkO1xuXG4gIHB1c2hRdWFkKFxuICAgIGluUG9zOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluU2l6ZTogZ2xtLlJlYWRvbmx5VmVjMixcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzIHwgZ2xtLlJlYWRvbmx5VmVjNFxuICApOiB2b2lkO1xuXG4gIHB1c2hMaW5lKFxuICAgIGluUG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzNcbiAgKTogdm9pZDtcblxuICBwdXNoQ3Jvc3MoXG4gICAgaW5DZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApOiB2b2lkO1xuXG4gIHB1c2hUaGlja0xpbmUoXG4gICAgaW5Qb2ludEE6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Qb2ludEI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgdGhpY2tuZXNzOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApOiB2b2lkO1xuXG4gIHB1c2hSb3RhdGVkTGluZShcbiAgICBjZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgYW5nbGU6IG51bWJlcixcbiAgICBsZW5ndGg6IG51bWJlcixcbiAgICB0aGlja25lc3M6IG51bWJlcixcbiAgICBjb2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApOiB2b2lkO1xuXG4gIHB1c2hPcmlnaW5Cb3VuZFJlY3RhbmdsZShcbiAgICBpbk9yaWdpbjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNpemU6IGdsbS5SZWFkb25seVZlYzIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKTogdm9pZDtcblxuICBwdXNoQ2VudGVyZWRSZWN0YW5nbGUoXG4gICAgaW5DZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICk6IHZvaWQ7XG5cbiAgZmx1c2goY29tcG9zZWRNYXRyaXg6IGdsbS5SZWFkb25seU1hdDQpOiB2b2lkO1xuICBjbGVhcigpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgU3RhY2tSZW5kZXJlcnMgaW1wbGVtZW50cyBJU3RhY2tSZW5kZXJlcnMge1xuICBwcml2YXRlIF9zaGFkZXI6IGdyYXBoaWNzLndlYmdsMi5JVW5ib3VuZFNoYWRlcjtcblxuICBwcml2YXRlIF93aXJlRnJhbWVzU3RhY2tSZW5kZXJlcjogV2lyZUZyYW1lc1N0YWNrUmVuZGVyZXI7XG4gIHByaXZhdGUgX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXI6IFRyaWFuZ2xlc1N0YWNrUmVuZGVyZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fc2hhZGVyID0gbmV3IGdyYXBoaWNzLndlYmdsMi5TaGFkZXJQcm9ncmFtKCdTdGFja1JlbmRlcmVycycsIHtcbiAgICAgIHZlcnRleFNyYzogc3RhY2tSZW5kZXJlclZlcnRleCxcbiAgICAgIGZyYWdtZW50U3JjOiBzdGFja1JlbmRlcmVyRnJhZ21lbnQsXG4gICAgICBhdHRyaWJ1dGVzOiBbJ2FfdmVydGV4X3Bvc2l0aW9uJywgJ2FfdmVydGV4X2NvbG9yJ10sXG4gICAgICB1bmlmb3JtczogWyd1X2NvbXBvc2VkTWF0cml4J11cbiAgICB9KTtcblxuICAgIGNvbnN0IGdlb0J1aWxkZXIgPSBuZXcgZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeUJ1aWxkZXIoKTtcbiAgICBnZW9CdWlsZGVyXG4gICAgICAucmVzZXQoKVxuICAgICAgLnNldFByaW1pdGl2ZVR5cGUoJ2xpbmVzJylcbiAgICAgIC5hZGRWYm8oKVxuICAgICAgLnNldFZib0FzRHluYW1pYygpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF9wb3NpdGlvbicsICd2ZWMzZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF9jb2xvcicsICd2ZWM0ZicpO1xuXG4gICAgdGhpcy5fd2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIgPSBuZXcgV2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIoXG4gICAgICB0aGlzLl9zaGFkZXIsXG4gICAgICBnZW9CdWlsZGVyLmdldERlZigpXG4gICAgKTtcbiAgICB0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyID0gbmV3IFRyaWFuZ2xlc1N0YWNrUmVuZGVyZXIoXG4gICAgICB0aGlzLl9zaGFkZXIsXG4gICAgICBnZW9CdWlsZGVyLmdldERlZigpXG4gICAgKTtcbiAgfVxuXG4gIHB1c2hMaW5lKFxuICAgIGluUG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzNcbiAgKSB7XG4gICAgdGhpcy5fd2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIucHVzaExpbmUoaW5Qb2ludEEsIGluUG9pbnRCLCBpbkNvbG9yKTtcbiAgfVxuXG4gIHB1c2hDcm9zcyhcbiAgICBpbkNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNpemU6IG51bWJlcixcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzXG4gICkge1xuICAgIGNvbnN0IGNyb3NzVmVydGljZXM6IGdsbS5SZWFkb25seVZlYzNbXSA9IFtcbiAgICAgIFtpbkNlbnRlclswXSAtIGluU2l6ZSwgaW5DZW50ZXJbMV0sIGluQ2VudGVyWzJdXSxcbiAgICAgIFtpbkNlbnRlclswXSArIGluU2l6ZSwgaW5DZW50ZXJbMV0sIGluQ2VudGVyWzJdXSxcbiAgICAgIFtpbkNlbnRlclswXSwgaW5DZW50ZXJbMV0gLSBpblNpemUsIGluQ2VudGVyWzJdXSxcbiAgICAgIFtpbkNlbnRlclswXSwgaW5DZW50ZXJbMV0gKyBpblNpemUsIGluQ2VudGVyWzJdXSxcbiAgICAgIFtpbkNlbnRlclswXSwgaW5DZW50ZXJbMV0sIGluQ2VudGVyWzJdIC0gaW5TaXplXSxcbiAgICAgIFtpbkNlbnRlclswXSwgaW5DZW50ZXJbMV0sIGluQ2VudGVyWzJdICsgaW5TaXplXVxuICAgIF07XG4gICAgY29uc3QgY3Jvc3NJbmRpY2VzOiBudW1iZXJbXSA9IFswLCAxLCAyLCAzLCA0LCA1XTtcblxuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBjcm9zc0luZGljZXMubGVuZ3RoOyBpaSArPSAyKSB7XG4gICAgICBjb25zdCB2ZXJ0ZXhBID0gY3Jvc3NWZXJ0aWNlc1tpaSArIDBdO1xuICAgICAgY29uc3QgdmVydGV4QiA9IGNyb3NzVmVydGljZXNbaWkgKyAxXTtcbiAgICAgIHRoaXMuX3dpcmVGcmFtZXNTdGFja1JlbmRlcmVyLnB1c2hMaW5lKHZlcnRleEEsIHZlcnRleEIsIGluQ29sb3IpO1xuICAgIH1cbiAgfVxuXG4gIHB1c2hUaGlja0xpbmUoXG4gICAgaW5Qb2ludEE6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Qb2ludEI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgdGhpY2tuZXNzOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApIHtcbiAgICB0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyLnB1c2hMaW5lKFxuICAgICAgaW5Qb2ludEEsXG4gICAgICBpblBvaW50QixcbiAgICAgIHRoaWNrbmVzcyxcbiAgICAgIGluQ29sb3JcbiAgICApO1xuICB9XG5cbiAgcHVzaFJvdGF0ZWRMaW5lKFxuICAgIGNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBhbmdsZTogbnVtYmVyLFxuICAgIGxlbmd0aDogbnVtYmVyLFxuICAgIHRoaWNrbmVzczogbnVtYmVyLFxuICAgIGNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzXG4gICkge1xuICAgIHRoaXMuX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIucHVzaFJvdGF0ZWRMaW5lKFxuICAgICAgY2VudGVyLFxuICAgICAgYW5nbGUsXG4gICAgICBsZW5ndGgsXG4gICAgICB0aGlja25lc3MsXG4gICAgICBjb2xvclxuICAgICk7XG4gIH1cblxuICBwdXNoT3JpZ2luQm91bmRSZWN0YW5nbGUoXG4gICAgaW5PcmlnaW46IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIHRoaXMuX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIucHVzaE9yaWdpbkJvdW5kUmVjdGFuZ2xlKFxuICAgICAgaW5PcmlnaW4sXG4gICAgICBpblNpemUsXG4gICAgICBpbkNvbG9yXG4gICAgKTtcbiAgfVxuXG4gIHB1c2hDZW50ZXJlZFJlY3RhbmdsZShcbiAgICBpbkNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNpemU6IGdsbS5SZWFkb25seVZlYzIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKSB7XG4gICAgdGhpcy5fdHJpYW5nbGVzU3RhY2tSZW5kZXJlci5wdXNoQ2VudGVyZWRSZWN0YW5nbGUoXG4gICAgICBpbkNlbnRlcixcbiAgICAgIGluU2l6ZSxcbiAgICAgIGluQ29sb3JcbiAgICApO1xuICB9XG5cbiAgcHVzaFRyaWFuZ2xlKFxuICAgIGluUG9zQTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblBvc0I6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Qb3NDOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIHRoaXMuX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIucHVzaFRyaWFuZ2xlKGluUG9zQSwgaW5Qb3NCLCBpblBvc0MsIGluQ29sb3IpO1xuICB9XG5cbiAgcHVzaFF1YWQoXG4gICAgaW5Qb3M6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIHRoaXMucHVzaFRyaWFuZ2xlKFxuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMCwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAwLCBpblBvc1syXV0sXG4gICAgICBbaW5Qb3NbMF0gKyBpblNpemVbMF0gKiAxLCBpblBvc1sxXSArIGluU2l6ZVsxXSAqIDEsIGluUG9zWzJdXSxcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDEsIGluUG9zWzFdICsgaW5TaXplWzFdICogMCwgaW5Qb3NbMl1dLFxuICAgICAgaW5Db2xvclxuICAgICk7XG4gICAgdGhpcy5wdXNoVHJpYW5nbGUoXG4gICAgICBbaW5Qb3NbMF0gKyBpblNpemVbMF0gKiAwLCBpblBvc1sxXSArIGluU2l6ZVsxXSAqIDAsIGluUG9zWzJdXSxcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDEsIGluUG9zWzFdICsgaW5TaXplWzFdICogMSwgaW5Qb3NbMl1dLFxuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMCwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAxLCBpblBvc1syXV0sXG4gICAgICBpbkNvbG9yXG4gICAgKTtcbiAgfVxuXG4gIGZsdXNoKGluQ29tcG9zZWRNYXRyaXg6IGdsbS5SZWFkb25seU1hdDQpIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5fd2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIuY2FuUmVuZGVyKCkgJiZcbiAgICAgICF0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyLmNhblJlbmRlcigpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc2hhZGVyLmJpbmQoKGJvdW5kKSA9PiB7XG4gICAgICBib3VuZC5zZXRNYXRyaXg0VW5pZm9ybSgndV9jb21wb3NlZE1hdHJpeCcsIGluQ29tcG9zZWRNYXRyaXgpO1xuXG4gICAgICB0aGlzLl93aXJlRnJhbWVzU3RhY2tSZW5kZXJlci5mbHVzaCgpO1xuICAgICAgdGhpcy5fdHJpYW5nbGVzU3RhY2tSZW5kZXJlci5mbHVzaCgpO1xuICAgIH0pO1xuICB9XG5cbiAgc2FmZVJlbmRlcihpbkNvbXBvc2VkTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQ0LCBpbkNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fc2hhZGVyLmJpbmQoKGJvdW5kKSA9PiB7XG4gICAgICBib3VuZC5zZXRNYXRyaXg0VW5pZm9ybSgndV9jb21wb3NlZE1hdHJpeCcsIGluQ29tcG9zZWRNYXRyaXgpO1xuXG4gICAgICBpbkNhbGxiYWNrKCk7XG5cbiAgICAgIHRoaXMuX3dpcmVGcmFtZXNTdGFja1JlbmRlcmVyLmZsdXNoKCk7XG4gICAgICB0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyLmZsdXNoKCk7XG4gICAgfSk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl93aXJlRnJhbWVzU3RhY2tSZW5kZXJlci5jbGVhcigpO1xuICAgIHRoaXMuX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIuY2xlYXIoKTtcbiAgfVxufVxuIiwKICAiZXhwb3J0IGRlZmF1bHQgYFxuI3ZlcnNpb24gMzAwIGVzXG5cbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcblxudW5pZm9ybSBtYXQ0IHVfY29tcG9zZWRNYXRyaXg7XG5cbmluIHZlYzIgYV92ZXJ0ZXhfcG9zaXRpb247XG5pbiB2ZWMyIGFfdmVydGV4X3RleENvb3JkO1xuaW4gdmVjMyBhX29mZnNldF9wb3NpdGlvbjtcbmluIHZlYzIgYV9vZmZzZXRfdGV4Q29vcmQ7XG5pbiB2ZWMzIGFfb2Zmc2V0X2NvbG9yO1xuaW4gZmxvYXQgYV9vZmZzZXRfc2NhbGU7XG5cbm91dCB2ZWMyIHZfdGV4Q29vcmQ7XG5mbGF0IG91dCB2ZWMzIHZfY29sb3I7XG5cbnZvaWQgbWFpbih2b2lkKVxue1xuICB2ZWMzIHBvc2l0aW9uID0gdmVjMyhhX3ZlcnRleF9wb3NpdGlvbiwgMC4wKSAqIGFfb2Zmc2V0X3NjYWxlICsgYV9vZmZzZXRfcG9zaXRpb247XG5cbiAgZ2xfUG9zaXRpb24gPSB1X2NvbXBvc2VkTWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcblxuICB2X3RleENvb3JkID0gYV92ZXJ0ZXhfdGV4Q29vcmQgKyBhX29mZnNldF90ZXhDb29yZDtcbiAgdl9jb2xvciA9IGFfb2Zmc2V0X2NvbG9yO1xufVxuYC50cmltKCk7IiwKICAiZXhwb3J0IGRlZmF1bHQgYFxuI3ZlcnNpb24gMzAwIGVzXG5cbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuXG51bmlmb3JtIHNhbXBsZXIyRCB1X3RleHR1cmU7XG5cbmluIHZlYzIgdl90ZXhDb29yZDtcbmZsYXQgaW4gdmVjMyB2X2NvbG9yO1xuXG5vdXQgdmVjNCBvX2NvbG9yO1xuXG52b2lkIG1haW4odm9pZClcbntcbiAgdmVjNCB0ZXh0dXJlQ29sb3IgPSB0ZXh0dXJlKHVfdGV4dHVyZSwgdl90ZXhDb29yZCk7XG4gIGlmICh0ZXh0dXJlQ29sb3IuYSA8IDAuNSlcbiAge1xuICAgIGRpc2NhcmQ7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgb19jb2xvciA9IHZlYzQodl9jb2xvciwgdGV4dHVyZUNvbG9yLmEpO1xuICB9XG59XG5gLnRyaW0oKTsiLAogICJleHBvcnQgY29uc3QgYXNjaWlUZXh0dXJlSGV4ID1cbiAgJzdlN2UyOGZkMDNmZDA3ZmUwNGZlMGFmZjAyZmY3ZTRkZmQwY2ZkMDNmZDA3ZmUwNGZlMGFmZjAyZmYxYWZjMGRmZDEwZmMwOGZjMGZmZTU1ZmYxNWZiMGJmZDAzZmQwN2ZlMDRmZTA4ZjcwN2ZkMDRmZjA3ZmUwMmZlMGNmZDBmZmQwY2ZkMGFmZjAzZmUwM2ZmMGFmZTQ0ZmUxNWZiMGJmZDAzZmQwNGYyMDRmNjA3ZmQwM2ZlMDdmZTAyZmUwY2ZkMGVmZDBlZmQwYWZmMDJmZTAyZmYwYmZlNDNmZDE1ZmIwY2ZlMDNmZTA1ZjIwNGZlMDFmZjAyZmYwYWZkMDJmZDA3ZmUwMmZlMGJmZDBlZmQxMGZkMGFmYTBjZmU0MmZkMTZmYjFiZmUwNGZlMDdmZTAxZmYwMmZmMGVmZDA5ZmMxY2ZkMTJmZDA5ZmEwY2ZlNDFmZDE3ZmIxYmZlMDRmZTA3ZjcwYmZkMGFmYzA0ZmYxN2ZkMTJmZDA2ZjQwNWY2MTZmNjFjZmQxOWZkMWNmZTA0ZmUwOGY3MDlmZDBiZmIwMmZlMTdmZDEyZmQwNmY0MDVmNjE2ZjYxYmZkMWFmZDFjZmUwNGZlMGFmZjAyZmYwMWZlMDhmZDBiZmUwMmZhMTdmZDEyZmQwOWZhMGNmZTNlZmQzN2YyMDdmZjAyZmYwMWZlMDdmZDAyZmQwN2ZlMDNmYzE5ZmQxMGZkMGFmYTBjZmUzZGZkMzhmMjA0ZjYwN2ZlMDNmZDA3ZmUwM2ZkMWJmZDBlZmQwYWZmMDJmZTAyZmYwYmZlMGNmZDFkZmQwZGZkMWRmZDFjZmUwNGZlMDdmNzA4ZmYwNGZkMDdmZTAyZmIxYmZkMGNmZDBhZmYwM2ZlMDNmZjBhZmUwY2ZkMWRmZDBjZmQxZWZkMWNmZTA0ZmUwYWZmMDJmZjFhZmIwMmZlMWJmYzA4ZmMwZmZlMWNmZDFkZmQwYmZkMWZmZDFjZmUwNGZlMGFmZjAyZmY3YWZkN2U3ZTdlN2U3ZTdlMGVmZDE3ZmQxMGZjMGFmODBiZmUwYmY5MDlmOTBkZmQwOGY2MDlmYjA4ZjUwNmY4MDhmODJjZmQxOWZkMGRmODA3ZmQwNGZkMGFmZTBhZmQwM2ZkMDdmZDAzZmQwYmZjMDhmZDBmZmQwYmZkMDVmZDA1ZmQwNGZkMDZmZDA0ZmQyYWZkMWJmZDBiZmMwMmZjMDZmZDAzZmMwOWZkMGFmZDA0ZmQwNmZkMDRmZDA5ZmIwOGZkMGVmZDBjZmQwNWZkMDVmZDA0ZmQwNmZkMDRmZDA5ZmQwY2ZkMGVmZDFkZmQwYWZlMDVmZDA2ZmQwMmZiMDZmYTExZmQwZGZkMDhmZTAxZmQwOGZkMGRmZDBkZmQwNWZkMDVmZDA0ZmQwNmZkMDRmZDA5ZmQwY2ZkMGRmZDBhZjQwOWZkMTBmZDA2ZmQwMmZiMDZmYTEwZmQwZGZkMDhmZTAyZmQwOGZkMGRmZDE1ZmQwNWZiMDJmZDA2ZmQwNGZkMDlmZDBjZmQwY2ZkMGJmNDBhZmQwZWZkMDdmZDAxZmUwMWZkMDlmZDBmZmQwYmZiMDhmZTAzZmQwOGY4MDhmNzBlZmQwOGZhMDhmNjI2ZmQyM2ZkMGNmZDA4ZmQwMWZlMDFmZDA5ZmQwZWZkMGNmYjA4ZjYwNmY3MDdmNjBjZmQwOWZhMDlmNzI2ZmQyM2ZkMGJmZDA5ZmIwMmZkMDlmZDBkZmQxMGZkMDdmNjBjZmMwNmZkMDRmZDBiZmQwOGZkMDJmYjBkZmQwOWZkMGNmZDBjZmQwYmY0MGFmZDBjZmQwOWZiMDJmZDA5ZmQwY2ZkMTJmZDBiZmQwZmZkMDZmZDA0ZmQwYWZkMDlmZDA0ZmQwZGZkMDlmZDBjZmQwZGZkMGFmNDA5ZmQxOWZjMDNmZDA5ZmQwYmZkMDNmZDA2ZmQwNGZkMGJmZDA4ZmQwNGZkMDZmZDA0ZmQwOWZkMGFmZDA0ZmQwY2ZkMGFmZDBjZmQwZWZkMWRmZDFhZmQwNGZkMDlmZDBhZmQwNGZkMDZmZDAzZmQwY2ZkMDhmZDAzZmQwN2ZkMDRmZDA5ZmQwYWZkMDRmZDBiZmQxOWZkMTBmZDFiZmQwZmZkMGFmODA3ZjcwN2Y2MDdmOTBiZjkwN2Y5MDlmODBhZmQwYmY4MDlmYjJlZmQxOWZkMTBmZDdlNTFmZDE3ZmQxMWZkN2U3ZTdlN2UxM2Y4N2U3OGZkMDVmZDA4ZmMwOWY3MDlmOTA3ZjgwOGY2MDZmNjA4ZjkwN2ZkMDNmZDA3ZjkwZGY5MDVmYzAzZmQwNmZiMGJmZDA1ZmQwNWZkMDVmZDA4ZmIwOGZkMDVmZDA3ZmEwOWZkMDNmZDA3ZmQwM2ZkMDdmZDAyZmQwOGZkMDRmZTA3ZmQwNGZlMDdmZDAzZmQwNmZkMDNmZDA5ZmQxMWZkMDhmZDAzZmQwN2ZkMGNmYzAzZmMwNWZkMDVmZDA3ZmQwMWZkMDdmZDA1ZmQwNmZkMDJmZDA4ZmQwM2ZkMDZmZDA0ZmQwN2ZkMDNmZDA3ZmQwNWZmMDdmZDA1ZmYwNmZkMDRmZDA2ZmQwM2ZkMDlmZDExZmQwOGZkMDJmZDA4ZmQwY2ZiMDFmYjA1ZmMwNGZkMDZmZDAzZmQwNmZkMDVmZDA1ZmQwNGZkMDdmZDAzZmQwNmZkMGVmZDAzZmQwN2ZkMGRmZDBjZmQwNGZkMDZmZDAzZmQwOWZkMTFmZDA4ZmQwMWZkMDlmZDBjZjUwNWZiMDNmZDA1ZmQwNWZkMDVmZDAyZmEwNWZkMDRmZDA3ZmQwM2ZkMDZmZDBlZmQwM2ZkMDdmZDAzZmUwOGZkMDNmZTA3ZmQwZGZkMDNmZDA5ZmQxMWZkMDhmYTBhZmQwY2Y1MDVmYTAyZmQwNWZkMDVmZDA1ZmQwMmZhMDVmZDA0ZmQwN2Y4MDdmZDBlZmQwM2ZkMDdmODA4ZjgwN2ZkMGRmNzA5ZmQxMWZkMDhmYjBiZmQwY2ZkMDFmZDAxZmQwNWZkMDFmZDAxZmQwNWZkMDVmZDA1ZmQwMmZhMDVmZDA0ZmQwN2Y4MDdmZDBlZmQwM2ZkMDdmODA4ZjgwN2ZkMGRmNzA5ZmQxMWZkMDhmYjBiZmQwY2ZkMDJmZjAyZmQwNWZkMDJmYTA1ZmQwNWZkMDVmZDAyZmEwNWY2MDdmZDAzZmQwNmZkMGVmZDAzZmQwN2ZkMDNmZTA4ZmQwM2ZlMDdmZDAyZmIwNmZkMDNmZDA5ZmQwYmZkMDNmZDA4ZmEwYWZkMGNmZDA1ZmQwNWZkMDNmYjA1ZmQwNWZkMDVmZDBkZmQwNGZkMDdmZDAzZmQwNmZkMGVmZDAzZmQwN2ZkMGRmZDBjZmQwNGZkMDZmZDAzZmQwOWZkMGJmZDAzZmQwOGZkMDFmZDA5ZmQwNWZmMDZmZDA1ZmQwNWZkMDRmYzA1ZmQwNWZkMDVmZDBkZmQwNGZkMDdmZDAzZmQwNmZkMDRmZDA3ZmQwM2ZkMDdmZDA1ZmYwN2ZkMGNmZDA0ZmQwNmZkMDNmZDA5ZmQwYmZkMDNmZDA4ZmQwMmZkMDhmZDA0ZmUwNmZkMDVmZDA1ZmQwNWZkMDZmZDAzZmQwNmZkMGRmZDA0ZmQwN2ZkMDNmZDA3ZmQwM2ZkMDdmZDAyZmQwOGZkMDRmZTA3ZmQwZGZkMDNmZDA2ZmQwM2ZkMDlmZDBiZmQwM2ZkMDhmZDAzZmQwN2ZkMDNmZDA2ZmQwNWZkMDVmZDA1ZmQwN2ZkMDFmZDA3ZmQwZGZkMDRmZDA2ZjcwOWY5MDdmODA4ZjYwNmZiMGRmODA2ZmQwM2ZkMDdmOTBhZjkwOGZjMDNmZDA2ZjYwNmZkMDVmZDA1ZmQwNWZkMDhmYjBhZjg3ZTdlN2U3ZTdlN2U3ZTY4ZmUxYWY3MGFmYjA4ZjcwOGY4MDdmNTA1ZmQwM2ZkMDdmZDAzZmQwN2ZkMDVmZDA1ZmQwM2ZkMDdmZDAzZmQwN2Y2MDhmOTA3ZmYxMWY5MGFmYzFhZmQwM2ZkMDdmYzAxZmMwN2ZkMDNmZDA2ZmQwNGZkMDZmZTAyZmQwMmZlMDVmZDAzZmQwN2ZkMDNmZDA3ZmQwNWZkMDVmZDAzZmQwN2ZkMDNmZDA3ZmQwNGZkMDhmZDBiZmUxNGZkMDlmYTE5ZmQwM2ZkMDdmZDAzZmQwN2ZkMDNmZDA2ZmQwNGZkMDZmZjAzZmQwM2ZmMDVmZDAzZmQwN2ZkMDNmZDA3ZmQwNWZkMDVmZDAzZmQwN2ZkMDNmZDA3ZmUwNWZkMDhmZDBiZmQxM2ZkMDhmZDAyZmQxOGZkMDNmZDA2ZmQwNWZkMDZmZDAzZmQwNmZkMDRmZDBhZmQwOWZkMDNmZDA3ZmQwM2ZkMDdmZDA1ZmQwNmZkMDFmZDA4ZmQwM2ZkMDdmZjA1ZmQwOWZkMGNmZDEyZmQwN2ZkMDRmZDE3ZmQwM2ZkMDZmZDA1ZmQwNmZkMDNmZDA2ZmQxMWZkMDlmZDAzZmQwN2ZkMDNmZDA3ZmQwNWZkMDdmYjA5ZmQwM2ZkMGNmZDBhZmQwZGZkMTFmZDI4ZjgwN2ZkMDVmZDA2ZjgwOGY5MGNmZDA5ZmQwM2ZkMDdmZDAzZmQwN2ZkMDJmZjAyZmQwOGZkMGJmZDAxZmQwY2ZkMGJmZDBlZmQxMGZkMjhmODA3ZmQwNWZkMDZmODA5ZjkwYmZkMDlmZDAzZmQwN2ZkMDNmZDA3ZmQwMmZmMDJmZDA4ZmQwY2ZiMGNmZDBjZmQwZmZkMGZmZDI4ZmQwY2ZkMDNmYjA2ZmQwMmZkMGVmZDBhZmQwOWZkMDNmZDA3ZmQwM2ZkMDdmZDAyZmYwMmZkMDdmYjBjZmQwY2ZkMGRmZDEwZmQwZWZkMjhmZDBjZmQwMmZhMDZmZDAzZmQwNmZkMDRmZDBhZmQwOWZkMDNmZDA3ZmQwM2ZkMDhmNzA3ZmQwMWZkMGJmZDBiZmQwNWZmMDhmZDExZmQwZGZkMjhmZDBkZjcwN2ZkMDNmZDA2ZmQwNGZkMGFmZDA5ZmQwM2ZkMDhmZDAxZmQwOWZjMDFmYzA2ZmQwM2ZkMGFmZDBhZmQwNWZlMDhmZDEyZmQwY2ZkMjhmZDBkZjcwN2ZkMDNmZDA2ZmQwNGZkMGFmZDA5ZmQwM2ZkMDlmYjBiZmQwMWZkMDdmZDAzZmQwYWZkMGFmZDA0ZmQwOGZkMTNmZDBiZmQyN2ZiMTJmZDA2ZmMwM2ZkMDdmODA5ZjkwOGY5MGJmZDBjZmQwMWZkMDdmZDAzZmQwOGY5MDhmNjA4ZjkxMGZkMDZmOTNjZmE3ZTU0ZjA3ZTcyZjA3ZTdlN2U3ZTBiZmQxZGZjMjFmYjE5ZmIxOGZjMTBmZDBmZmQwN2ZjMGRmYTM5ZmQxZWZkMjJmZDE5ZmQwMWZkMThmZDEwZmQwZmZkMDhmZDEwZmQzYmZkMWNmZDIyZmQxOWZkMDFmZDE4ZmQxMGZkMGZmZDA4ZmQxMGZkM2JmZDFjZmQyMmZkMTlmZDFjZmQyZGZkMTBmZDRhZjkwOWY4MDhmOTA5ZjgwOGY5MGFmZDBjZmIwMmZlMDdmZDAxZmMwOGZhMGNmYTA4ZmQwM2ZkMGFmZDA5ZjYwNmY4MDlmOTFlZmQwOGZkMDNmZDA2ZmQwM2ZkMDdmZDAzZmQwN2ZkMDNmZDA3ZjgwOGZkMDNmZDA4ZmMwMmZkMGFmZDBmZmQwOGZkMDJmZDBiZmQwOWZkMDJmZjAyZmQwNWZkMDNmZDA3ZmQwM2ZkMWRmZDA4ZmQwM2ZkMDZmZDAzZmQwN2ZkMDNmZDA3ZmQwM2ZkMDdmODA4ZmQwM2ZkMDhmYzAyZmQwYWZkMGZmZDA4ZmQwMWZkMGNmZDA5ZmQwMmZmMDJmZDA1ZmQwM2ZkMDdmZDAzZmQxOGY4MDhmZDAzZmQwNmZkMGRmZDAzZmQwN2Y3MDlmZDBiZmQwM2ZkMDhmZDAzZmQwYWZkMGZmZDA4ZmEwZGZkMDlmZDAyZmYwMmZkMDVmZDAzZmQwN2ZkMDNmZDE3ZmQwM2ZkMDhmZDAzZmQwNmZkMGRmZDAzZmQwN2ZkMGZmZDBiZmQwM2ZkMDhmZDAzZmQwYWZkMGZmZDA4ZmQwMWZkMGNmZDA5ZmQwMmZmMDJmZDA1ZmQwM2ZkMDdmZDAzZmQxN2ZkMDNmZDA4ZmQwM2ZkMDZmZDAzZmQwN2ZkMDNmZDA3ZmQwM2ZkMDlmZDBjZjgwOGZkMDNmZDBhZmQwZmZkMDhmZDAyZmQwYmZkMDlmZDAyZmYwMmZkMDVmZDAzZmQwN2ZkMDNmZDE3ZmQwM2ZkMDhmZDAzZmQwNmZkMDNmZDA3ZmQwM2ZkMDdmZDAzZmQwOWZkMGRmOTA4ZmQwM2ZkMGFmZDBmZmQwOGZkMDNmZDBhZmQwOWZkMDJmZjAyZmQwNWZkMDNmZDA3ZmQwM2ZkMThmYjAyZmUwNmZlMDJmYjA4ZjkwOWZiMDJmZTA3ZjkwOGY5MGZmZDA3ZmMwM2ZkMDdmNzA2ZmQwM2ZkMDdmYzAzZmQwN2Y3MDZmZDA1ZmQwNWZkMDNmZDA4Zjk3OGZkMDNmZDI3ZmQwM2ZkN2U0YWY5MmFmYTdlN2U3ZTdlN2U3ZTE4ZmEwOWZjMDlmYTFlZmU0ZWZmNmVmZDBkZmMwZGZkMWNmYzRjZmU2ZWZkMGRmYzBkZmQxYmZhNGFmZDZlZmQwZGZjMGRmZDFhZmQwMmZkMDdmZTAyZmIwN2ZiMDJmZTA3ZmMwMmZkMDhmOTA4ZjcwN2ZkMDNmZDA3ZmQwM2ZkMDdmZDA1ZmQwNWZkMDJmZDA5ZmQwM2ZkMDZmODBhZmQwZWZjMGVmZDA4ZmIwM2ZkMDVmZDA0ZmQwN2ZkMDNmZDA1ZmQwM2ZkMDlmNzA2ZmQwNGZlMDlmZDBiZmQwM2ZkMDdmZDAzZmQwN2ZkMDVmZDA1ZmQwMmZkMDlmZDAzZmQwNmZlMDNmZDA4ZmQyNGZkMDVmZDAxZmQwMmZkMDVmZTA2ZmUwN2ZkMDNmZDA1ZmQwM2ZkMDlmYzAyZmQwNmZkMDRmZTA5ZmQwYmZkMDNmZDA3ZmQwM2ZkMDdmZDA1ZmQwNmZhMGFmZDAzZmQwNmZmMDNmZDA5ZmQyNGZkMDVmZDAyZmQwMWZkMDVmZTA2ZmUwN2ZkMDNmZDA1ZmQwM2ZkMDlmZDBkZmIwY2ZkMGJmZDAzZmQwN2ZkMDNmZDA3ZmQwMmZmMDJmZDA3ZmMwYmZkMDNmZDA5ZmQwY2ZkMGVmYzBlZmQwN2ZkMDNmYjA2ZmUwNmZlMDdmZDAzZmQwNWZkMDNmZDA5ZmQwZmZiMGFmZDBiZmQwM2ZkMDdmZDAzZmQwN2ZkMDJmZjAyZmQwN2ZjMGJmZDAzZmQwOGZkMGVmZDBkZmMwZGZkMTlmZTA2ZmUwN2ZkMDNmZDA1ZmQwM2ZkMDlmZDBjZmUwNGZkMDlmZDAxZmQwN2ZkMDNmZDA4ZmQwMWZkMDlmYzAxZmMwN2ZhMGJmOTA4ZmQwM2ZmMGJmZDBkZmMwZGZkMTlmZTA2ZmUwN2Y4MDdmODA5ZmQwY2ZlMDRmZDA5ZmQwMWZkMDdmZDAzZmQwOWZiMGJmZDAxZmQwN2ZkMDJmZDBiZmIwOGZkMDNmZTBiZmQwZGZjMGRmZDE5ZjYwN2ZkMTFmZDA4ZmIwY2Y5MGJmYjA5ZmIwMmZlMDlmZDBjZmQwMWZkMDdmZDAyZmQwZGZkMDhmODBjZmEwOWZjMDlmYTFhZjYwN2ZkMTFmZDdjZmQ2OWZiMGZmYjc3ZmEnO1xuIiwKICAiaW1wb3J0IHtcbiAgZ3JhcGhpY3Ncbn0gZnJvbSAnLi4vLi4vLi4nO1xuXG4vLyBpbXBvcnQgKiBhcyBzaGFkZXJzIGZyb20gJy4vc2hhZGVycyc7XG5cbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB0ZXh0UmVuZGVyZXJWZXJ0ZXggZnJvbSAnLi9zaGFkZXJzL3RleHQtcmVuZGVyZXIuZ2xzbC52ZXJ0Jztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB0ZXh0UmVuZGVyZXJGcmFnbWVudCBmcm9tICcuL3NoYWRlcnMvdGV4dC1yZW5kZXJlci5nbHNsLmZyYWcnO1xuXG5pbXBvcnQgeyBhc2NpaVRleHR1cmVIZXggfSBmcm9tICcuL2ludGVybmFscy9hc2NpaVRleHR1cmVIZXgnO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuY29uc3Qga19ncmlkU2l6ZTogZ2xtLlJlYWRvbmx5VmVjMiA9IFsxNiwgNl07XG5jb25zdCBrX3RleENvb3JkOiBnbG0uUmVhZG9ubHlWZWMyID0gWzEgLyBrX2dyaWRTaXplWzBdLCAxIC8ga19ncmlkU2l6ZVsxXV07XG5cbmNvbnN0IGtfYnVmZmVyU2l6ZSA9IDkgKiAxMDI0ICogNDtcblxudHlwZSBIb3Jpem9udGFsVGV4dEFsaWduID0gJ2xlZnQnIHwgJ2NlbnRlcmVkJyB8ICdyaWdodCc7XG50eXBlIFZlcnRpY2FsVGV4dEFsaWduID0gJ3RvcCcgfCAnY2VudGVyZWQnIHwgJ2JvdHRvbSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRleHRSZW5kZXJlciB7XG4gIHNldFRleHRBbGlnbihcbiAgICBpbkhvcml6b250YWxUZXh0QWxpZ246IEhvcml6b250YWxUZXh0QWxpZ24sXG4gICAgaW5WZXJ0aWNhbFRleHRBbGlnbjogVmVydGljYWxUZXh0QWxpZ25cbiAgKTogdGhpcztcbiAgc2V0VGV4dFNjYWxlKGluU2NhbGU6IG51bWJlcik6IHRoaXM7XG4gIHNldFRleHRDb2xvcihpblJlZDogbnVtYmVyLCBpbkdyZWVuOiBudW1iZXIsIGluQmx1ZTogbnVtYmVyKTogdGhpcztcblxuICBwdXNoVGV4dChpbk1lc3NhZ2U6IHN0cmluZywgaW5Qb3NpdGlvbjogZ2xtLlJlYWRvbmx5VmVjMik6IHRoaXM7XG5cbiAgZmx1c2goY29tcG9zZWRNYXRyaXg6IGdsbS5SZWFkb25seU1hdDQpOiB0aGlzO1xuICBjbGVhcigpOiB0aGlzO1xufVxuXG5leHBvcnQgY2xhc3MgVGV4dFJlbmRlcmVyIGltcGxlbWVudHMgSVRleHRSZW5kZXJlciB7XG4gIHByaXZhdGUgX3NoYWRlcjogZ3JhcGhpY3Mud2ViZ2wyLklVbmJvdW5kU2hhZGVyO1xuICBwcml2YXRlIF9nZW9tZXRyeTogZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeTtcbiAgcHJpdmF0ZSBfdGV4dHVyZTogZ3JhcGhpY3Mud2ViZ2wyLklVbmJvdW5kVGV4dHVyZSA9IG5ldyBncmFwaGljcy53ZWJnbDIuVGV4dHVyZSgpO1xuICBwcml2YXRlIF90ZXhDb29yZE1hcDogTWFwPHN0cmluZywgZ2xtLlJlYWRvbmx5VmVjMj47XG5cbiAgcHJpdmF0ZSBfYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShrX2J1ZmZlclNpemUpO1xuICBwcml2YXRlIF9jdXJyZW50U2l6ZTogbnVtYmVyID0gMDtcblxuICBwcml2YXRlIF90ZXh0U2NhbGU6IG51bWJlciA9IDE0O1xuICBwcml2YXRlIF90ZXh0Q29sb3I6IGdsbS52ZWMzID0gWzEsIDEsIDFdO1xuXG4gIHByaXZhdGUgX2hvcml6b250YWxUZXh0QWxpZ246IEhvcml6b250YWxUZXh0QWxpZ24gPSAnbGVmdCc7XG4gIHByaXZhdGUgX3ZlcnRpY2FsVGV4dEFsaWduOiBWZXJ0aWNhbFRleHRBbGlnbiA9ICd0b3AnO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3NoYWRlciA9IG5ldyBncmFwaGljcy53ZWJnbDIuU2hhZGVyUHJvZ3JhbSgnVGV4dFJlbmRlcmVyJywge1xuICAgICAgdmVydGV4U3JjOiB0ZXh0UmVuZGVyZXJWZXJ0ZXgsXG4gICAgICBmcmFnbWVudFNyYzogdGV4dFJlbmRlcmVyRnJhZ21lbnQsXG4gICAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICdhX3ZlcnRleF9wb3NpdGlvbicsXG4gICAgICAgICdhX3ZlcnRleF90ZXhDb29yZCcsXG4gICAgICAgICdhX29mZnNldF9wb3NpdGlvbicsXG4gICAgICAgICdhX29mZnNldF90ZXhDb29yZCcsXG4gICAgICAgICdhX29mZnNldF9jb2xvcicsXG4gICAgICAgICdhX29mZnNldF9zY2FsZSdcbiAgICAgIF0sXG4gICAgICB1bmlmb3JtczogWyd1X2NvbXBvc2VkTWF0cml4JywgJ3VfdGV4dHVyZSddXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZW9CdWlsZGVyID0gbmV3IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlCdWlsZGVyKCk7XG4gICAgZ2VvQnVpbGRlclxuICAgICAgLnJlc2V0KClcbiAgICAgIC5zZXRQcmltaXRpdmVUeXBlKCd0cmlhbmdsZXMnKVxuICAgICAgLmFkZFZibygpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF9wb3NpdGlvbicsICd2ZWMyZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF90ZXhDb29yZCcsICd2ZWMyZicpXG4gICAgICAuc2V0U3RyaWRlKDQgKiA0KVxuICAgICAgLmFkZFZibygpXG4gICAgICAuc2V0VmJvQXNEeW5hbWljKClcbiAgICAgIC5zZXRWYm9Bc0luc3RhbmNlZCgpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF9wb3NpdGlvbicsICd2ZWMzZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF90ZXhDb29yZCcsICd2ZWMyZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF9jb2xvcicsICd2ZWMzZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF9zY2FsZScsICdmbG9hdCcpXG4gICAgICAuc2V0U3RyaWRlKDkgKiA0KTtcblxuICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnkoXG4gICAgICB0aGlzLl9zaGFkZXIsXG4gICAgICBnZW9CdWlsZGVyLmdldERlZigpXG4gICAgKTtcblxuICAgIHR5cGUgVmVydGV4ID0geyBwb3NpdGlvbjogZ2xtLlJlYWRvbmx5VmVjMjsgdGV4Q29vcmQ6IGdsbS5SZWFkb25seVZlYzIgfTtcblxuICAgIGNvbnN0IHZlcnRpY2VzOiBbVmVydGV4LCBWZXJ0ZXgsIFZlcnRleCwgVmVydGV4XSA9IFtcbiAgICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsrMC41LCAtMC41XSxcbiAgICAgICAgdGV4Q29vcmQ6IFtrX3RleENvb3JkWzBdICogMSwga190ZXhDb29yZFsxXSAqIDFdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwb3NpdGlvbjogWy0wLjUsIC0wLjVdLFxuICAgICAgICB0ZXhDb29yZDogW2tfdGV4Q29vcmRbMF0gKiAwLCBrX3RleENvb3JkWzFdICogMV1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbKzAuNSwgKzAuNV0sXG4gICAgICAgIHRleENvb3JkOiBba190ZXhDb29yZFswXSAqIDEsIGtfdGV4Q29vcmRbMV0gKiAwXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcG9zaXRpb246IFstMC41LCArMC41XSxcbiAgICAgICAgdGV4Q29vcmQ6IFtrX3RleENvb3JkWzBdICogMCwga190ZXhDb29yZFsxXSAqIDBdXG4gICAgICB9XG4gICAgXTtcblxuICAgIGNvbnN0IGluZGljZXMgPSBbMSwgMCwgMiwgMSwgMiwgM107XG5cbiAgICBjb25zdCBsZXR0ZXJWZXJ0aWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGluZGV4IG9mIGluZGljZXMpIHtcbiAgICAgIGNvbnN0IHZlcnRleCA9IHZlcnRpY2VzW2luZGV4XTtcbiAgICAgIGxldHRlclZlcnRpY2VzLnB1c2goXG4gICAgICAgIHZlcnRleC5wb3NpdGlvblswXSxcbiAgICAgICAgdmVydGV4LnBvc2l0aW9uWzFdLFxuICAgICAgICB2ZXJ0ZXgudGV4Q29vcmRbMF0sXG4gICAgICAgIHZlcnRleC50ZXhDb29yZFsxXVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZW9tZXRyeS51cGRhdGVCdWZmZXIoMCwgbGV0dGVyVmVydGljZXMsIGxldHRlclZlcnRpY2VzLmxlbmd0aCk7XG4gICAgdGhpcy5fZ2VvbWV0cnkuc2V0UHJpbWl0aXZlQ291bnQobGV0dGVyVmVydGljZXMubGVuZ3RoIC8gNCk7XG4gICAgdGhpcy5fZ2VvbWV0cnkuc2V0RmxvYXRCdWZmZXJTaXplKDEsIGtfYnVmZmVyU2l6ZSk7XG5cbiAgICB0aGlzLl90ZXhDb29yZE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBnbG0uUmVhZG9ubHlWZWMyPihbXG4gICAgICBbJyAnLCBbMCAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJyEnLCBbMSAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1wiJywgWzIgKiBrX3RleENvb3JkWzBdLCAwICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycjJywgWzMgKiBrX3RleENvb3JkWzBdLCAwICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyckJywgWzQgKiBrX3RleENvb3JkWzBdLCAwICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyclJywgWzUgKiBrX3RleENvb3JkWzBdLCAwICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycmJywgWzYgKiBrX3RleENvb3JkWzBdLCAwICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgW1wiJ1wiLCBbNyAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJygnLCBbOCAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJyknLCBbOSAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJyonLCBbMTAgKiBrX3RleENvb3JkWzBdLCAwICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycrJywgWzExICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnLCcsIFsxMiAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJy0nLCBbMTMgKiBrX3RleENvb3JkWzBdLCAwICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycuJywgWzE0ICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnLycsIFsxNSAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG5cbiAgICAgIFsnMCcsIFswICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnMScsIFsxICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnMicsIFsyICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnMycsIFszICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnNCcsIFs0ICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnNScsIFs1ICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnNicsIFs2ICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnNycsIFs3ICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnOCcsIFs4ICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnOScsIFs5ICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnOicsIFsxMCAqIGtfdGV4Q29vcmRbMF0sIDEgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJzsnLCBbMTEgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc8JywgWzEyICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnPScsIFsxMyAqIGtfdGV4Q29vcmRbMF0sIDEgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJz4nLCBbMTQgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc/JywgWzE1ICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcblxuICAgICAgWydAJywgWzAgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydBJywgWzEgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydCJywgWzIgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydDJywgWzMgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydEJywgWzQgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydFJywgWzUgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydGJywgWzYgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydHJywgWzcgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydIJywgWzggKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydJJywgWzkgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydKJywgWzEwICoga190ZXhDb29yZFswXSwgMiAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnSycsIFsxMSAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0wnLCBbMTIgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydNJywgWzEzICoga190ZXhDb29yZFswXSwgMiAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnTicsIFsxNCAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ08nLCBbMTUgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuXG4gICAgICBbJ1AnLCBbMCAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1EnLCBbMSAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1InLCBbMiAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1MnLCBbMyAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1QnLCBbNCAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1UnLCBbNSAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1YnLCBbNiAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1cnLCBbNyAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1gnLCBbOCAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1knLCBbOSAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1onLCBbMTAgKiBrX3RleENvb3JkWzBdLCAzICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydbJywgWzExICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnXFxcXCcsIFsxMiAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ10nLCBbMTMgKiBrX3RleENvb3JkWzBdLCAzICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydeJywgWzE0ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnXycsIFsxNSAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG5cbiAgICAgIFsnYCcsIFswICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnYScsIFsxICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnYicsIFsyICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnYycsIFszICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnZCcsIFs0ICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnZScsIFs1ICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnZicsIFs2ICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnZycsIFs3ICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnaCcsIFs4ICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnaScsIFs5ICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnaicsIFsxMCAqIGtfdGV4Q29vcmRbMF0sIDQgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ2snLCBbMTEgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydsJywgWzEyICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnbScsIFsxMyAqIGtfdGV4Q29vcmRbMF0sIDQgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ24nLCBbMTQgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydvJywgWzE1ICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcblxuICAgICAgWydwJywgWzAgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydxJywgWzEgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydyJywgWzIgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydzJywgWzMgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd0JywgWzQgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd1JywgWzUgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd2JywgWzYgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd3JywgWzcgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd4JywgWzggKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd5JywgWzkgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd6JywgWzEwICoga190ZXhDb29yZFswXSwgNSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsneycsIFsxMSAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3wnLCBbMTIgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd9JywgWzEzICoga190ZXhDb29yZFswXSwgNSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnficsIFsxNCAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV1cbiAgICBdKTtcblxuICAgIGNvbnN0IHdpZHRoID0gMjU2O1xuICAgIGNvbnN0IGhlaWdodCA9IDk2O1xuICAgIGNvbnN0IGltYWdlUGl4ZWxzID0gbmV3IFVpbnQ4QXJyYXkod2lkdGggKiBoZWlnaHQgKiA0KTtcbiAgICB7XG4gICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGFzY2lpVGV4dHVyZUhleC5sZW5ndGg7IGlpICs9IDIpIHtcbiAgICAgICAgbGV0IGN1cnJTaXplID1cbiAgICAgICAgICBwYXJzZUludChgJHthc2NpaVRleHR1cmVIZXguc3Vic3RyaW5nKGlpLCBpaSArIDIpfTAwMDAwMGAsIDE2KSA+PiAyNDtcblxuICAgICAgICBsZXQgY3VyclZhbCA9IDA7XG4gICAgICAgIGlmIChjdXJyU2l6ZSA8IDApIHtcbiAgICAgICAgICBjdXJyU2l6ZSA9IC1jdXJyU2l6ZTtcbiAgICAgICAgICBjdXJyVmFsID0gMjU1O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGN1cnJTaXplOyArK2lpKSB7XG4gICAgICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgMF0gPSBjdXJyVmFsO1xuICAgICAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDFdID0gY3VyclZhbDtcbiAgICAgICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAyXSA9IGN1cnJWYWw7XG4gICAgICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgM10gPSBjdXJyVmFsO1xuICAgICAgICAgICsraW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl90ZXh0dXJlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLl90ZXh0dXJlLmJpbmQoKGJvdW5kVGV4dHVyZSkgPT4ge1xuICAgICAgYm91bmRUZXh0dXJlLmxvYWRGcm9tTWVtb3J5KHdpZHRoLCBoZWlnaHQsIGltYWdlUGl4ZWxzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRleHRBbGlnbihcbiAgICBpbkhvcml6b250YWxUZXh0QWxpZ246IEhvcml6b250YWxUZXh0QWxpZ24sXG4gICAgaW5WZXJ0aWNhbFRleHRBbGlnbjogVmVydGljYWxUZXh0QWxpZ25cbiAgKTogdGhpcyB7XG4gICAgdGhpcy5faG9yaXpvbnRhbFRleHRBbGlnbiA9IGluSG9yaXpvbnRhbFRleHRBbGlnbjtcbiAgICB0aGlzLl92ZXJ0aWNhbFRleHRBbGlnbiA9IGluVmVydGljYWxUZXh0QWxpZ247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRUZXh0U2NhbGUoaW5TY2FsZTogbnVtYmVyKTogdGhpcyB7XG4gICAgdGhpcy5fdGV4dFNjYWxlID0gaW5TY2FsZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFRleHRDb2xvcihpblJlZDogbnVtYmVyLCBpbkdyZWVuOiBudW1iZXIsIGluQmx1ZTogbnVtYmVyKTogdGhpcyB7XG4gICAgdGhpcy5fdGV4dENvbG9yWzBdID0gaW5SZWQ7XG4gICAgdGhpcy5fdGV4dENvbG9yWzFdID0gaW5HcmVlbjtcbiAgICB0aGlzLl90ZXh0Q29sb3JbMl0gPSBpbkJsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdXNoVGV4dChpbk1lc3NhZ2U6IHN0cmluZywgaW5Qb3NpdGlvbjogZ2xtLlJlYWRvbmx5VmVjMik6IHRoaXMge1xuICAgIC8vXG4gICAgLy8gdmFsaWRhdGVcbiAgICAvL1xuXG4gICAgaWYgKGluTWVzc2FnZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5fdGV4dFNjYWxlIDw9IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IGFsbExpbmVXaWR0aDogbnVtYmVyW10gPSBbMF07XG4gICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGluTWVzc2FnZS5sZW5ndGg7ICsraWkpIHtcbiAgICAgIGlmIChpbk1lc3NhZ2VbaWldID09ICdcXG4nKSB7XG4gICAgICAgIGFsbExpbmVXaWR0aC5wdXNoKDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxsTGluZVdpZHRoW2FsbExpbmVXaWR0aC5sZW5ndGggLSAxXSArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhbGxMaW5lV2lkdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gZm9yIChjb25zdCBjdXJyTGluZSBvZiBhbGxMaW5lV2lkdGgpIHtcbiAgICAvLyAgIGlmIChjdXJyTGluZSA9PT0gMCkge1xuICAgIC8vICAgICByZXR1cm4gdGhpcztcbiAgICAvLyAgIH1cbiAgICAvLyB9XG5cbiAgICBsZXQgbGluZUluZGV4ID0gMDtcblxuICAgIGNvbnN0IGN1cnJQb3M6IGdsbS52ZWMyID0gWzAsIDBdO1xuXG4gICAgLy9cbiAgICAvLyBwcmUgcHJvY2Vzc1xuICAgIC8vXG5cbiAgICBjb25zdCBoU2NhbGUgPSB0aGlzLl90ZXh0U2NhbGUgKiAwLjU7XG5cbiAgICBzd2l0Y2ggKHRoaXMuX2hvcml6b250YWxUZXh0QWxpZ24pIHtcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBjdXJyUG9zWzBdID0gaW5Qb3NpdGlvblswXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXJlZCc6XG4gICAgICAgIGN1cnJQb3NbMF0gPSBpblBvc2l0aW9uWzBdIC0gYWxsTGluZVdpZHRoW2xpbmVJbmRleF0gKiBoU2NhbGUgKyBoU2NhbGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICBjdXJyUG9zWzBdID1cbiAgICAgICAgICBpblBvc2l0aW9uWzBdIC1cbiAgICAgICAgICBhbGxMaW5lV2lkdGhbbGluZUluZGV4XSAqIHRoaXMuX3RleHRTY2FsZSArXG4gICAgICAgICAgdGhpcy5fdGV4dFNjYWxlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMuX3ZlcnRpY2FsVGV4dEFsaWduKSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICBjdXJyUG9zWzFdID0gaW5Qb3NpdGlvblsxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXJlZCc6XG4gICAgICAgIGN1cnJQb3NbMV0gPSBpblBvc2l0aW9uWzFdICsgYWxsTGluZVdpZHRoLmxlbmd0aCAqIGhTY2FsZSAtIGhTY2FsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICBjdXJyUG9zWzFdID1cbiAgICAgICAgICBpblBvc2l0aW9uWzFdIC0gKGFsbExpbmVXaWR0aC5sZW5ndGggLSAxKSAqIHRoaXMuX3RleHRTY2FsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBwcm9jZXNzXG4gICAgLy9cblxuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBpbk1lc3NhZ2UubGVuZ3RoOyArK2lpKSB7XG4gICAgICBjb25zdCBsZXR0ZXIgPSBpbk1lc3NhZ2VbaWldO1xuXG4gICAgICBpZiAobGV0dGVyID09ICdcXG4nKSB7XG4gICAgICAgIGxpbmVJbmRleCArPSAxO1xuXG4gICAgICAgIC8vIGdvIGJhY2tcbiAgICAgICAgc3dpdGNoICh0aGlzLl9ob3Jpem9udGFsVGV4dEFsaWduKSB7XG4gICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBjdXJyUG9zWzBdID0gaW5Qb3NpdGlvblswXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NlbnRlcmVkJzpcbiAgICAgICAgICAgIGN1cnJQb3NbMF0gPVxuICAgICAgICAgICAgICBpblBvc2l0aW9uWzBdIC0gYWxsTGluZVdpZHRoW2xpbmVJbmRleF0gKiBoU2NhbGUgKyBoU2NhbGU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICBjdXJyUG9zWzBdID1cbiAgICAgICAgICAgICAgaW5Qb3NpdGlvblswXSAtXG4gICAgICAgICAgICAgIGFsbExpbmVXaWR0aFtsaW5lSW5kZXhdICogdGhpcy5fdGV4dFNjYWxlICtcbiAgICAgICAgICAgICAgdGhpcy5fdGV4dFNjYWxlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyUG9zWzFdIC09IHRoaXMuX3RleHRTY2FsZTsgLy8gZ28gZG93blxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcHVzaExldHRlcihsZXR0ZXIsIGN1cnJQb3MpO1xuICAgICAgICAvLyBnbyByaWdodFxuICAgICAgICBjdXJyUG9zWzBdICs9IHRoaXMuX3RleHRTY2FsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcml2YXRlIF9wdXNoTGV0dGVyKGluQ2hhcmFjdGVyOiBzdHJpbmcsIGluUG9zaXRpb246IGdsbS5SZWFkb25seVZlYzIpIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFNpemUgKyA5ICogMTAgPj0gdGhpcy5fYnVmZmVyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRleENvb3JkID0gdGhpcy5fdGV4Q29vcmRNYXAuZ2V0KGluQ2hhcmFjdGVyKTtcblxuICAgIGlmICghdGV4Q29vcmQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGZhaWwgdG8gZmluZCBhIGxldHRlciwgbGV0dGVyPSR7aW5DaGFyYWN0ZXJ9YCk7XG5cbiAgICBmb3IgKGxldCB5eSA9IC0xOyB5eSA8PSAxOyArK3l5KSB7XG4gICAgICBmb3IgKGxldCB4eCA9IC0xOyB4eCA8PSAxOyArK3h4KSB7XG4gICAgICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluUG9zaXRpb25bMF0gKyAyICogeHg7XG4gICAgICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluUG9zaXRpb25bMV0gKyAyICogeXk7XG4gICAgICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IC0wLjE7XG4gICAgICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IHRleENvb3JkWzBdO1xuICAgICAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0ZXhDb29yZFsxXTtcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gMDsgLy8gYmxhY2tDb2xvclxuICAgICAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSAwOyAvLyBibGFja0NvbG9yXG4gICAgICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IDA7IC8vIGJsYWNrQ29sb3JcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gdGhpcy5fdGV4dFNjYWxlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluUG9zaXRpb25bMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gaW5Qb3NpdGlvblsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSAwLjA7XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gdGV4Q29vcmRbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gdGV4Q29vcmRbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gdGhpcy5fdGV4dENvbG9yWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IHRoaXMuX3RleHRDb2xvclsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0aGlzLl90ZXh0Q29sb3JbMl07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gdGhpcy5fdGV4dFNjYWxlO1xuICB9XG5cbiAgZmx1c2goY29tcG9zZWRNYXRyaXg6IGdsbS5SZWFkb25seU1hdDQpOiB0aGlzIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMuX3NoYWRlci5iaW5kKChib3VuZFNoYWRlcikgPT4ge1xuICAgICAgYm91bmRTaGFkZXIuc2V0TWF0cml4NFVuaWZvcm0oJ3VfY29tcG9zZWRNYXRyaXgnLCBjb21wb3NlZE1hdHJpeCk7XG4gICAgICBib3VuZFNoYWRlci5zZXRUZXh0dXJlVW5pZm9ybSgndV90ZXh0dXJlJywgdGhpcy5fdGV4dHVyZSwgMCk7XG5cbiAgICAgIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZUJ1ZmZlcigxLCB0aGlzLl9idWZmZXIsIHRoaXMuX2N1cnJlbnRTaXplKTtcbiAgICAgIHRoaXMuX2dlb21ldHJ5LnNldEluc3RhbmNlZENvdW50KHRoaXMuX2N1cnJlbnRTaXplIC8gOSk7XG4gICAgICB0aGlzLl9nZW9tZXRyeS5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIGdyYXBoaWNzLndlYmdsMi5UZXh0dXJlLnVuYmluZCgpO1xuXG4gICAgdGhpcy5jbGVhcigpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbGVhcigpOiB0aGlzIHtcbiAgICAvLyByZXNldCB2ZXJ0aWNlc1xuICAgIHRoaXMuX2N1cnJlbnRTaXplID0gMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwKICAiaW1wb3J0IHsgc3lzdGVtLCBncmFwaGljcyB9IGZyb20gJy4uLy4uLy4uJztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmludGVyZmFjZSBJbmRpY2F0b3Ige1xuICBjZW50ZXI6IGdsbS5SZWFkb25seVZlYzI7XG4gIHNpemU6IGdsbS5SZWFkb25seVZlYzI7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIGxpbmVzPzoge1xuICAgIGE6IGdsbS5SZWFkb25seVZlYzI7XG4gICAgYjogZ2xtLlJlYWRvbmx5VmVjMjtcbiAgICB0aGlja25lc3M6IG51bWJlcjtcbiAgICBjb2xvcjogZ2xtLlJlYWRvbmx5VmVjMztcbiAgfVtdO1xuICBjb2xvcjogZ2xtLlJlYWRvbmx5VmVjMztcbn1cblxuY29uc3QgZGVmYXVsdENvbG9yOiBnbG0uUmVhZG9ubHlWZWMzID0gWzAuMiwgMC4yLCAwLjJdO1xuY29uc3QgYWN0aXZhdGVkQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgPSBbMC4yLCAwLjYsIDAuMl07XG5cbmNvbnN0IF9yZW5kZXJJbmRpY2F0b3IgPSAoXG4gIGN1cnJJbmRpY2F0b3I6IEluZGljYXRvcixcbiAgc3RhY2tSZW5kZXJlcnM6IGdyYXBoaWNzLnJlbmRlcmVycy5JU3RhY2tSZW5kZXJlcnMsXG4gIHRleHRSZW5kZXJlcjogZ3JhcGhpY3MucmVuZGVyZXJzLklUZXh0UmVuZGVyZXJcbikgPT4ge1xuXG4gIGNvbnN0IHsgY2VudGVyIH0gPSBjdXJySW5kaWNhdG9yO1xuXG4gIHN0YWNrUmVuZGVyZXJzLnB1c2hDZW50ZXJlZFJlY3RhbmdsZShcbiAgICBnbG0udmVjMy5mcm9tVmFsdWVzKGNlbnRlclswXSwgY2VudGVyWzFdLCAtMC4zKSxcbiAgICBjdXJySW5kaWNhdG9yLnNpemUsXG4gICAgWzAsIDAsIDBdXG4gICk7XG5cbiAgc3RhY2tSZW5kZXJlcnMucHVzaENlbnRlcmVkUmVjdGFuZ2xlKFxuICAgIGdsbS52ZWMzLmZyb21WYWx1ZXMoY2VudGVyWzBdLCBjZW50ZXJbMV0sIC0wLjIpLFxuICAgIFtjdXJySW5kaWNhdG9yLnNpemVbMF0gLSAyLCBjdXJySW5kaWNhdG9yLnNpemVbMV0gLSAyXSxcbiAgICBjdXJySW5kaWNhdG9yLmNvbG9yXG4gICk7XG5cbiAgaWYgKGN1cnJJbmRpY2F0b3IudGV4dCkge1xuICAgIHRleHRSZW5kZXJlclxuICAgICAgLnNldFRleHRTY2FsZSgxNilcbiAgICAgIC5zZXRUZXh0QWxpZ24oJ2NlbnRlcmVkJywgJ2NlbnRlcmVkJylcbiAgICAgIC5wdXNoVGV4dChjdXJySW5kaWNhdG9yLnRleHQsIGNlbnRlcilcbiAgICAgIC5zZXRUZXh0QWxpZ24oJ2xlZnQnLCAndG9wJyk7XG4gIH1cblxuICBpZiAoY3VyckluZGljYXRvci5saW5lcykge1xuICAgIGN1cnJJbmRpY2F0b3IubGluZXMuZm9yRWFjaCgoY3VyckxpbmUpID0+IHtcbiAgICAgIHN0YWNrUmVuZGVyZXJzLnB1c2hUaGlja0xpbmUoXG4gICAgICAgIFtjZW50ZXJbMF0gKyBjdXJyTGluZS5hWzBdLCBjZW50ZXJbMV0gKyBjdXJyTGluZS5hWzFdLCAwXSxcbiAgICAgICAgW2NlbnRlclswXSArIGN1cnJMaW5lLmJbMF0sIGNlbnRlclsxXSArIGN1cnJMaW5lLmJbMV0sIDBdLFxuICAgICAgICBjdXJyTGluZS50aGlja25lc3MsXG4gICAgICAgIGN1cnJMaW5lLmNvbG9yXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgYWRkS2V5U3Ryb2tlc1dpZGdldHMgPSAoXG4gIGluUG9zOiBnbG0uUmVhZG9ubHlWZWMyLFxuICBzdGFja1JlbmRlcmVyczogZ3JhcGhpY3MucmVuZGVyZXJzLklTdGFja1JlbmRlcmVycyxcbiAgdGV4dFJlbmRlcmVyOiBncmFwaGljcy5yZW5kZXJlcnMuSVRleHRSZW5kZXJlclxuKSA9PiB7XG4gIF9yZW5kZXJJbmRpY2F0b3Ioe1xuICAgIGNlbnRlcjogW2luUG9zWzBdLCBpblBvc1sxXV0sXG4gICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgdGV4dDogJ0FcXG5RJyxcbiAgICBjb2xvcjogc3lzdGVtLmJyb3dzZXIuR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQScsICdRJylcbiAgICAgID8gYWN0aXZhdGVkQ29sb3JcbiAgICAgIDogZGVmYXVsdENvbG9yXG4gIH0sIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xuXG4gIF9yZW5kZXJJbmRpY2F0b3Ioe1xuICAgIGNlbnRlcjogW2luUG9zWzBdICsgNDUgKiAxLCBpblBvc1sxXV0sXG4gICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgdGV4dDogJ1MnLFxuICAgIGNvbG9yOiBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdTJykgPyBhY3RpdmF0ZWRDb2xvciA6IGRlZmF1bHRDb2xvclxuICB9LCBzdGFja1JlbmRlcmVycywgdGV4dFJlbmRlcmVyKTtcblxuICBfcmVuZGVySW5kaWNhdG9yKHtcbiAgICBjZW50ZXI6IFtpblBvc1swXSArIDQ1ICogMSwgaW5Qb3NbMV0gKyA0NV0sXG4gICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgdGV4dDogJ1dcXG5aJyxcbiAgICBjb2xvcjogc3lzdGVtLmJyb3dzZXIuR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnVycsICdaJylcbiAgICAgID8gYWN0aXZhdGVkQ29sb3JcbiAgICAgIDogZGVmYXVsdENvbG9yXG4gIH0sIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xuXG4gIF9yZW5kZXJJbmRpY2F0b3Ioe1xuICAgIGNlbnRlcjogW2luUG9zWzBdICsgNDUgKiAyLCBpblBvc1sxXV0sXG4gICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgdGV4dDogJ0QnLFxuICAgIGNvbG9yOiBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdEJykgPyBhY3RpdmF0ZWRDb2xvciA6IGRlZmF1bHRDb2xvclxuICB9LCBzdGFja1JlbmRlcmVycywgdGV4dFJlbmRlcmVyKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRBcnJvd1N0cm9rZXNXaWRnZXRzID0gKFxuICBpblBvczogZ2xtLlJlYWRvbmx5VmVjMixcbiAgc3RhY2tSZW5kZXJlcnM6IGdyYXBoaWNzLnJlbmRlcmVycy5JU3RhY2tSZW5kZXJlcnMsXG4gIHRleHRSZW5kZXJlcjogZ3JhcGhpY3MucmVuZGVyZXJzLklUZXh0UmVuZGVyZXJcbikgPT4ge1xuICAvLyBhcnJvdyBsZWZ0XG4gIF9yZW5kZXJJbmRpY2F0b3Ioe1xuICAgIGNlbnRlcjogW2luUG9zWzBdLCBpblBvc1sxXV0sXG4gICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgbGluZXM6IFtcbiAgICAgIHsgYTogWzE1LCAwXSwgYjogWy04LCAwXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFswLCAxMF0sIGI6IFstMTIsIC0yXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFswLCAtMTBdLCBiOiBbLTEyLCAyXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH1cbiAgICBdLFxuICAgIGNvbG9yOiBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBcnJvd0xlZnQnKVxuICAgICAgPyBhY3RpdmF0ZWRDb2xvclxuICAgICAgOiBkZWZhdWx0Q29sb3JcbiAgfSwgc3RhY2tSZW5kZXJlcnMsIHRleHRSZW5kZXJlcik7XG5cbiAgLy8gYXJyb3cgZG93blxuICBfcmVuZGVySW5kaWNhdG9yKHtcbiAgICBjZW50ZXI6IFtpblBvc1swXSArIDQ1LCBpblBvc1sxXV0sXG4gICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgbGluZXM6IFtcbiAgICAgIHsgYTogWzAsIDE1XSwgYjogWzAsIC04XSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFsxMCwgMF0sIGI6IFstMiwgLTEyXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFstMTAsIDBdLCBiOiBbMiwgLTEyXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH1cbiAgICBdLFxuICAgIGNvbG9yOiBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBcnJvd0Rvd24nKVxuICAgICAgPyBhY3RpdmF0ZWRDb2xvclxuICAgICAgOiBkZWZhdWx0Q29sb3JcbiAgfSwgc3RhY2tSZW5kZXJlcnMsIHRleHRSZW5kZXJlcik7XG5cbiAgLy8gYXJyb3cgdXBcbiAgX3JlbmRlckluZGljYXRvcih7XG4gICAgY2VudGVyOiBbaW5Qb3NbMF0gKyA0NSwgaW5Qb3NbMV0gKyA0NV0sXG4gICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgbGluZXM6IFtcbiAgICAgIHsgYTogWzAsIC0xNV0sIGI6IFswLCA4XSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFsxMCwgMF0sIGI6IFstMiwgMTJdLCB0aGlja25lc3M6IDYsIGNvbG9yOiBbMSwgMSwgMV0gfSxcbiAgICAgIHsgYTogWy0xMCwgMF0sIGI6IFsyLCAxMl0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9XG4gICAgXSxcbiAgICBjb2xvcjogc3lzdGVtLmJyb3dzZXIuR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQXJyb3dVcCcpXG4gICAgICA/IGFjdGl2YXRlZENvbG9yXG4gICAgICA6IGRlZmF1bHRDb2xvclxuICB9LCBzdGFja1JlbmRlcmVycywgdGV4dFJlbmRlcmVyKTtcblxuICAvLyBhcnJvdyByaWdodFxuICBfcmVuZGVySW5kaWNhdG9yKHtcbiAgICBjZW50ZXI6IFtpblBvc1swXSArIDQ1ICogMiwgaW5Qb3NbMV1dLFxuICAgIHNpemU6IFs0MCwgNDBdLFxuICAgIGxpbmVzOiBbXG4gICAgICB7IGE6IFstMTUsIDBdLCBiOiBbOCwgMF0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgeyBhOiBbMCwgMTBdLCBiOiBbMTIsIC0yXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFswLCAtMTBdLCBiOiBbMTIsIDJdLCB0aGlja25lc3M6IDYsIGNvbG9yOiBbMSwgMSwgMV0gfVxuICAgIF0sXG4gICAgY29sb3I6IHN5c3RlbS5icm93c2VyLkdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0Fycm93UmlnaHQnKVxuICAgICAgPyBhY3RpdmF0ZWRDb2xvclxuICAgICAgOiBkZWZhdWx0Q29sb3JcbiAgfSwgc3RhY2tSZW5kZXJlcnMsIHRleHRSZW5kZXJlcik7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkS2V5c1RvdWNoZXNXaWRnZXRzID0gKFxuICBpbkNhbnZhc0VsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50LFxuICBpblBvczogZ2xtLlJlYWRvbmx5VmVjMixcbiAgc3RhY2tSZW5kZXJlcnM6IGdyYXBoaWNzLnJlbmRlcmVycy5JU3RhY2tSZW5kZXJlcnMsXG4gIHRleHRSZW5kZXJlcjogZ3JhcGhpY3MucmVuZGVyZXJzLklUZXh0UmVuZGVyZXJcbikgPT4ge1xuICBpZiAoc3lzdGVtLmJyb3dzZXIuR2xvYmFsVG91Y2hNYW5hZ2VyLmlzU3VwcG9ydGVkKGluQ2FudmFzRWxlbWVudCkpIHtcbiAgICBfcmVuZGVySW5kaWNhdG9yKHtcbiAgICAgIGNlbnRlcjogW2luUG9zWzBdICsgMTE1LCBpblBvc1sxXV0sXG4gICAgICBzaXplOiBbMjMwLCA2MF0sXG4gICAgICB0ZXh0OiAnVG91Y2ggRXZlbnRzXFxuU3VwcG9ydGVkXFxuKGRvdWJsZSB0YXApJyxcbiAgICAgIGNvbG9yOiBbMCwgMC41LCAwXVxuICAgIH0sIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xuICB9IGVsc2Uge1xuICAgIF9yZW5kZXJJbmRpY2F0b3Ioe1xuICAgICAgY2VudGVyOiBbaW5Qb3NbMF0gKyAxMTUsIGluUG9zWzFdXSxcbiAgICAgIHNpemU6IFsyMzAsIDYwXSxcbiAgICAgIHRleHQ6ICdUb3VjaCBFdmVudHNcXG5Ob3QgU3VwcG9ydGVkJyxcbiAgICAgIGNvbG9yOiBbMC41LCAwLCAwXVxuICAgIH0sIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xuICB9XG5cbiAgaWYgKHN5c3RlbS5icm93c2VyLkdsb2JhbFBvaW50ZXJMb2NrTWFuYWdlci5jYW5CZVBvaW50ZXJMb2NrZWQoaW5DYW52YXNFbGVtZW50KSkge1xuICAgIF9yZW5kZXJJbmRpY2F0b3Ioe1xuICAgICAgY2VudGVyOiBbaW5Qb3NbMF0gKyAxMDUsIGluUG9zWzFdICsgNzBdLFxuICAgICAgc2l6ZTogWzIxMCwgNjBdLFxuICAgICAgdGV4dDogJ01vdXNlXFxuU3VwcG9ydGVkJyxcbiAgICAgIGNvbG9yOiBbMCwgMC41LCAwXVxuICAgIH0sIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xuICB9IGVsc2Uge1xuICAgIF9yZW5kZXJJbmRpY2F0b3Ioe1xuICAgICAgY2VudGVyOiBbaW5Qb3NbMF0gKyAxMDUsIGluUG9zWzFdICsgNzBdLFxuICAgICAgc2l6ZTogWzIxMCwgNjBdLFxuICAgICAgdGV4dDogJ01vdXNlIEV2ZW50c1xcbk5vdCBTdXBwb3J0ZWQnLFxuICAgICAgY29sb3I6IFswLjUsIDAsIDBdXG4gICAgfSwgc3RhY2tSZW5kZXJlcnMsIHRleHRSZW5kZXJlcik7XG4gIH1cbn07XG5cbi8vIGV4cG9ydCBjb25zdCByZW5kZXJDb250cm9scyA9IChcbi8vICAgaW5DYW52YXNFbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudCxcbi8vICAgc3RhY2tSZW5kZXJlcnM6IGdyYXBoaWNzLnJlbmRlcmVycy5JU3RhY2tSZW5kZXJlcnMsXG4vLyAgIHRleHRSZW5kZXJlcjogZ3JhcGhpY3MucmVuZGVyZXJzLklUZXh0UmVuZGVyZXJcbi8vICkgPT4ge1xuLy8gICAvLyBjb25zdCBhbGxJbmRpY2F0b3I6IEluZGljYXRvcltdID0gW107XG5cbi8vICAgY29uc3Qga2V5RXZlbnRzUG9zOiBnbG0uUmVhZG9ubHlWZWMyID0gWzcgKyAyMCwgMTY1XTtcbi8vICAgY29uc3QgdG91Y2hFdmVudHNQb3M6IGdsbS5SZWFkb25seVZlYzIgPSBbNyArIDIwLCAyNjBdO1xuLy8gICBjb25zdCBib2FyZFBvczogZ2xtLlJlYWRvbmx5VmVjMiA9IFs3LCAzNV07XG5cbi8vICAgYWRkS2V5U3Ryb2tlc1dpZGdldHMoa2V5RXZlbnRzUG9zLCBzdGFja1JlbmRlcmVycywgdGV4dFJlbmRlcmVyKTtcbi8vICAgYWRkQXJyb3dTdHJva2VzV2lkZ2V0cyh0b3VjaEV2ZW50c1Bvcywgc3RhY2tSZW5kZXJlcnMsIHRleHRSZW5kZXJlcik7XG4vLyAgIGFkZEtleXNUb3VjaGVzV2lkZ2V0cyhpbkNhbnZhc0VsZW1lbnQsIGJvYXJkUG9zLCBzdGFja1JlbmRlcmVycywgdGV4dFJlbmRlcmVyKTtcbi8vIH07XG4iLAogICJpbXBvcnQgeyBzeXN0ZW0sIGdyYXBoaWNzIH0gZnJvbSAnLi4vLi4vLi4nO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuZXhwb3J0IGNvbnN0IHJlbmRlckZwc01ldGVyID0gKFxuICBpblBvczogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICBpbkZyYW1lUHJvZmlsZXI6IHN5c3RlbS5tZXRyaWNzLklGcmFtZVByb2ZpbGVyLFxuICBpblN0YWNrUmVuZGVyZXJzOiBncmFwaGljcy5yZW5kZXJlcnMuSVN0YWNrUmVuZGVyZXJzLFxuICBpblRleHRSZW5kZXJlcjogZ3JhcGhpY3MucmVuZGVyZXJzLklUZXh0UmVuZGVyZXIsXG4gIGluU2hvd0ZwcyA9IGZhbHNlXG4pID0+IHtcbiAgLy8gZnBzIG1ldGVyXG5cbiAgY29uc3Qga19kaXZpZGVyID0gNTtcbiAgY29uc3Qga192ZXJ0aWNhbFNpemUgPVxuICAgIE1hdGguY2VpbChpbkZyYW1lUHJvZmlsZXIubWF4RGVsdGEgLyBrX2RpdmlkZXIpICoga19kaXZpZGVyO1xuXG4gIHtcbiAgICAvLyBib3JkZXJcblxuICAgIGluU3RhY2tSZW5kZXJlcnMucHVzaE9yaWdpbkJvdW5kUmVjdGFuZ2xlKGluUG9zLCBpblNpemUsIFswLCAwLCAwLCAwLjVdKTtcblxuICAgIGNvbnN0IGFsbFZlcnRpY2VzOiBbXG4gICAgICBnbG0uUmVhZG9ubHlWZWMzLFxuICAgICAgZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICAgIGdsbS5SZWFkb25seVZlYzMsXG4gICAgICBnbG0uUmVhZG9ubHlWZWMzXG4gICAgXSA9IFtcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDAsIGluUG9zWzFdICsgaW5TaXplWzFdICogMCwgMF0sXG4gICAgICBbaW5Qb3NbMF0gKyBpblNpemVbMF0gKiAxLCBpblBvc1sxXSArIGluU2l6ZVsxXSAqIDAsIDBdLFxuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMSwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAxLCAwXSxcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDAsIGluUG9zWzFdICsgaW5TaXplWzFdICogMSwgMF1cbiAgICBdO1xuXG4gICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShhbGxWZXJ0aWNlc1swXSwgYWxsVmVydGljZXNbMV0sIFsxLCAxLCAxXSk7XG4gICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShhbGxWZXJ0aWNlc1sxXSwgYWxsVmVydGljZXNbMl0sIFsxLCAxLCAxXSk7XG4gICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShhbGxWZXJ0aWNlc1syXSwgYWxsVmVydGljZXNbM10sIFsxLCAxLCAxXSk7XG4gICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShhbGxWZXJ0aWNlc1szXSwgYWxsVmVydGljZXNbMF0sIFsxLCAxLCAxXSk7XG4gIH0gLy8gYm9yZGVyXG5cbiAge1xuICAgIC8vIGRpdmlkZXJzXG5cbiAgICBmb3IgKFxuICAgICAgbGV0IGN1cnJEaXZpZGVyID0ga19kaXZpZGVyO1xuICAgICAgY3VyckRpdmlkZXIgPCBrX3ZlcnRpY2FsU2l6ZTtcbiAgICAgIGN1cnJEaXZpZGVyICs9IGtfZGl2aWRlclxuICAgICkge1xuICAgICAgY29uc3QgcmF0aW8gPSBjdXJyRGl2aWRlciAvIGtfdmVydGljYWxTaXplO1xuXG4gICAgICBjb25zdCBwb2ludEE6IGdsbS5SZWFkb25seVZlYzMgPSBbXG4gICAgICAgIGluUG9zWzBdICsgMCxcbiAgICAgICAgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiByYXRpbyxcbiAgICAgICAgMFxuICAgICAgXTtcbiAgICAgIGNvbnN0IHBvaW50QjogZ2xtLlJlYWRvbmx5VmVjMyA9IFtcbiAgICAgICAgaW5Qb3NbMF0gKyBpblNpemVbMF0sXG4gICAgICAgIGluUG9zWzFdICsgaW5TaXplWzFdICogcmF0aW8sXG4gICAgICAgIDBcbiAgICAgIF07XG5cbiAgICAgIGluU3RhY2tSZW5kZXJlcnMucHVzaExpbmUocG9pbnRBLCBwb2ludEIsIFswLjUsIDAuNSwgMC41XSk7XG4gICAgfVxuICB9IC8vIGRpdmlkZXJzXG5cbiAge1xuICAgIC8vIGN1cnZlXG5cbiAgICBpZiAoaW5GcmFtZVByb2ZpbGVyLmZyYW1lc0RlbHRhLmxlbmd0aCA+PSAyKSB7XG4gICAgICBjb25zdCB3aWR0aFN0ZXAgPSBpblNpemVbMF0gLyBpbkZyYW1lUHJvZmlsZXIuZnJhbWVzRGVsdGEubGVuZ3RoO1xuXG4gICAgICBsZXQgcHJldkRlbHRhID0gaW5GcmFtZVByb2ZpbGVyLmZyYW1lc0RlbHRhWzBdO1xuICAgICAgbGV0IHByZXZDb29yZFggPSAwO1xuICAgICAgbGV0IHByZXZDb29yZFkgPSAoaW5TaXplWzFdICogcHJldkRlbHRhKSAvIGtfdmVydGljYWxTaXplO1xuXG4gICAgICBmb3IgKGxldCBpaSA9IDE7IGlpIDwgaW5GcmFtZVByb2ZpbGVyLmZyYW1lc0RlbHRhLmxlbmd0aDsgKytpaSkge1xuICAgICAgICBjb25zdCBjdXJyRGVsdGEgPSBpbkZyYW1lUHJvZmlsZXIuZnJhbWVzRGVsdGFbaWldO1xuICAgICAgICBjb25zdCBjdXJyQ29vcmRYID0gaWkgKiB3aWR0aFN0ZXA7XG4gICAgICAgIGNvbnN0IGN1cnJDb29yZFkgPSAoaW5TaXplWzFdICogY3VyckRlbHRhKSAvIGtfdmVydGljYWxTaXplO1xuXG4gICAgICAgIGNvbnN0IHBvaW50QTogZ2xtLlJlYWRvbmx5VmVjMyA9IFtcbiAgICAgICAgICBpblBvc1swXSArIHByZXZDb29yZFgsXG4gICAgICAgICAgaW5Qb3NbMV0gKyBwcmV2Q29vcmRZLFxuICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgcG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzID0gW1xuICAgICAgICAgIGluUG9zWzBdICsgY3VyckNvb3JkWCxcbiAgICAgICAgICBpblBvc1sxXSArIGN1cnJDb29yZFksXG4gICAgICAgICAgMFxuICAgICAgICBdO1xuXG4gICAgICAgIGluU3RhY2tSZW5kZXJlcnMucHVzaExpbmUocG9pbnRBLCBwb2ludEIsIFsxLCAxLCAxXSk7XG5cbiAgICAgICAgcHJldkRlbHRhID0gY3VyckRlbHRhO1xuICAgICAgICBwcmV2Q29vcmRYID0gY3VyckNvb3JkWDtcbiAgICAgICAgcHJldkNvb3JkWSA9IGN1cnJDb29yZFk7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIGN1cnZlXG5cbiAge1xuICAgIC8vIGNvdW50ZXJcblxuICAgIGNvbnN0IGtfdGV4dFNjYWxlID0gMTQ7XG4gICAgY29uc3Qga190ZXh0SFNjYWxlID0ga190ZXh0U2NhbGUgKiAwLjU7XG5cbiAgICBjb25zdCBhdmVyYWdlVmFsdWUgPSBpbkZyYW1lUHJvZmlsZXIuYXZlcmFnZURlbHRhO1xuICAgIGNvbnN0IG1heFZhbHVlID0gaW5GcmFtZVByb2ZpbGVyLm1heERlbHRhO1xuICAgIGNvbnN0IG1pblZhbHVlID0gaW5GcmFtZVByb2ZpbGVyLm1pbkRlbHRhO1xuXG4gICAgbGV0IGF2ZXJhZ2VTdHIgPSBgfiR7YXZlcmFnZVZhbHVlLnRvRml4ZWQoMCl9bXNgO1xuICAgIGxldCBtYXhTdHIgPSBgPCR7bWF4VmFsdWV9bXNgO1xuICAgIGxldCBtaW5TdHIgPSBgPiR7bWluVmFsdWV9bXNgO1xuXG4gICAgaWYgKGluU2hvd0ZwcyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgX2dldEZwc1N0ciA9IChpblZhbDogbnVtYmVyKSA9PlxuICAgICAgICBpblZhbCA8IDk5OSA/IGluVmFsLnRvRml4ZWQoMCkgOiAnPz8/JztcblxuICAgICAgYXZlcmFnZVN0ciArPSBgXFxufiR7X2dldEZwc1N0cigxMDAwIC8gYXZlcmFnZVZhbHVlKX1mcHNgO1xuICAgICAgbWF4U3RyICs9IGBcXG48JHtfZ2V0RnBzU3RyKDEwMDAgLyBtYXhWYWx1ZSl9ZnBzYDtcbiAgICAgIG1pblN0ciArPSBgXFxuPiR7X2dldEZwc1N0cigxMDAwIC8gbWluVmFsdWUpfWZwc2A7XG4gICAgfVxuXG4gICAgaW5UZXh0UmVuZGVyZXJcbiAgICAgIC5zZXRUZXh0U2NhbGUoa190ZXh0U2NhbGUpXG4gICAgICAuc2V0VGV4dEFsaWduKCdsZWZ0JywgJ3RvcCcpXG4gICAgICAuc2V0VGV4dENvbG9yKDEuMCwgMS4wLCAwLjc1KVxuICAgICAgLnB1c2hUZXh0KGF2ZXJhZ2VTdHIsIFtpblBvc1swXSArIDcsIGluUG9zWzFdIC0gOF0pXG4gICAgICAuc2V0VGV4dEFsaWduKCdsZWZ0JywgJ2NlbnRlcmVkJylcbiAgICAgIC5zZXRUZXh0Q29sb3IoMS4wLCAwLjc1LCAwLjc1KVxuICAgICAgLnB1c2hUZXh0KG1heFN0ciwgW1xuICAgICAgICBpblBvc1swXSArIGluU2l6ZVswXSArIGtfdGV4dEhTY2FsZSxcbiAgICAgICAgaW5Qb3NbMV0gKyBpblNpemVbMV0gLSBrX3RleHRIU2NhbGUgKiAxXG4gICAgICBdKVxuICAgICAgLnNldFRleHRDb2xvcigwLjc1LCAxLjAsIDAuNzUpXG4gICAgICAucHVzaFRleHQobWluU3RyLCBbXG4gICAgICAgIGluUG9zWzBdICsgaW5TaXplWzBdICsga190ZXh0SFNjYWxlLFxuICAgICAgICBpblBvc1sxXSArIGtfdGV4dEhTY2FsZSAqIDFcbiAgICAgIF0pXG4gICAgICAuc2V0VGV4dENvbG9yKDEuMCwgMS4wLCAxLjApO1xuICB9IC8vIGNvdW50ZXJcbn07XG4iLAogICJleHBvcnQgY2xhc3MgV2ViR0xDb250ZXh0IHtcbiAgcHJpdmF0ZSBzdGF0aWMgX2dsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc3RhdGljIF9leHRlbnNpb25Mb3NlQ29udGV4dDogV0VCR0xfbG9zZV9jb250ZXh0IHwgbnVsbCA9IG51bGw7XG5cbiAgc3RhdGljIGluaXRpYWxpemUoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIGNvbnN0IHJlbmRlcmluZ0NvbnRleHRBdHRyaWJzOiBXZWJHTENvbnRleHRBdHRyaWJ1dGVzID0ge1xuICAgICAgLy8gQm9vbGVhbiB0aGF0IGluZGljYXRlcyBpZiB0aGUgY2FudmFzIGNvbnRhaW5zIGFuIGFscGhhIGJ1ZmZlci5cbiAgICAgIGFscGhhOiBmYWxzZSxcblxuICAgICAgLy8gQm9vbGVhbiB0aGF0IGluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0byBwZXJmb3JtIGFudGktYWxpYXNpbmcuXG4gICAgICBhbnRpYWxpYXM6IGZhbHNlLFxuXG4gICAgICAvLyBCb29sZWFuIHRoYXQgaW5kaWNhdGVzIHRoYXQgdGhlIGRyYXdpbmcgYnVmZmVyIGhhcyBhIGRlcHRoXG4gICAgICAvLyBidWZmZXIgb2YgYXQgbGVhc3QgMTYgYml0cy5cbiAgICAgIGRlcHRoOiB0cnVlLFxuXG4gICAgICAvLyBCb29sZWFuIHRoYXQgaW5kaWNhdGVzIGlmIGEgY29udGV4dCB3aWxsIGJlIGNyZWF0ZWQgaWYgdGhlXG4gICAgICAvLyBzeXN0ZW0gcGVyZm9ybWFuY2UgaXMgbG93LlxuICAgICAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdDogZmFsc2UsXG5cbiAgICAgIC8vIEEgaGludCB0byB0aGUgdXNlciBhZ2VudCBpbmRpY2F0aW5nIHdoYXQgY29uZmlndXJhdGlvbiBvZiBHUFUgaXNcbiAgICAgIC8vIHN1aXRhYmxlIGZvciB0aGUgV2ViR0wgY29udGV4dC4gUG9zc2libGUgdmFsdWVzIGFyZTpcbiAgICAgIC8vIFwiZGVmYXVsdFwiOlxuICAgICAgLy8gICAgIExldCB0aGUgdXNlciBhZ2VudCBkZWNpZGUgd2hpY2ggR1BVIGNvbmZpZ3VyYXRpb24gaXMgbW9zdFxuICAgICAgLy8gICAgIHN1aXRhYmxlLiBUaGlzIGlzIHRoZSBkZWZhdWx0IHZhbHVlLlxuICAgICAgLy8gXCJoaWdoLXBlcmZvcm1hbmNlXCI6XG4gICAgICAvLyAgICAgUHJpb3JpdGl6ZXMgcmVuZGVyaW5nIHBlcmZvcm1hbmNlIG92ZXIgcG93ZXIgY29uc3VtcHRpb24uXG4gICAgICAvLyBcImxvdy1wb3dlclwiOlxuICAgICAgLy8gICAgIFByaW9yaXRpemVzIHBvd2VyIHNhdmluZyBvdmVyIHJlbmRlcmluZyBwZXJmb3JtYW5jZS5cbiAgICAgIHBvd2VyUHJlZmVyZW5jZTogJ2hpZ2gtcGVyZm9ybWFuY2UnLFxuXG4gICAgICAvLyBCb29sZWFuIHRoYXQgaW5kaWNhdGVzIHRoYXQgdGhlIHBhZ2UgY29tcG9zaXRvciB3aWxsIGFzc3VtZSB0aGVcbiAgICAgIC8vIGRyYXdpbmcgYnVmZmVyIGNvbnRhaW5zIGNvbG9ycyB3aXRoIHByZS1tdWx0aXBsaWVkIGFscGhhLlxuICAgICAgcHJlbXVsdGlwbGllZEFscGhhOiB0cnVlLCAvLyBzbG93ZXIgZnJhbWVyYXRlIHdoZW4gZmFsc2VcblxuICAgICAgLy8gSWYgdGhlIHZhbHVlIGlzIHRydWUgdGhlIGJ1ZmZlcnMgd2lsbCBub3QgYmUgY2xlYXJlZCBhbmQgd2lsbFxuICAgICAgLy8gcHJlc2VydmUgdGhlaXIgdmFsdWVzIHVudGlsIGNsZWFyZWQgb3Igb3ZlcndyaXR0ZW4gYnkgdGhlIGF1dGhvci5cbiAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZSxcblxuICAgICAgLy8gQm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGF0IHRoZSBkcmF3aW5nIGJ1ZmZlciBoYXMgYVxuICAgICAgLy8gc3RlbmNpbCBidWZmZXIgb2YgYXQgbGVhc3QgOCBiaXRzLlxuICAgICAgc3RlbmNpbDogZmFsc2VcbiAgICB9O1xuXG4gICAgV2ViR0xDb250ZXh0Ll9nbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbDInLCByZW5kZXJpbmdDb250ZXh0QXR0cmlicyk7XG5cbiAgICBpZiAoIVdlYkdMQ29udGV4dC5fZ2wpIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IGNyZWF0ZSB3ZWJnbCBjb250ZXh0Jyk7XG5cbiAgICBXZWJHTENvbnRleHQuX2V4dGVuc2lvbkxvc2VDb250ZXh0ID1cbiAgICAgIFdlYkdMQ29udGV4dC5fZ2wuZ2V0RXh0ZW5zaW9uKCdXRUJHTF9sb3NlX2NvbnRleHQnKTtcblxuICAgIFdlYkdMQ29udGV4dC5fZ2wuZ2V0RXh0ZW5zaW9uKCdFWFRfY29sb3JfYnVmZmVyX2Zsb2F0Jyk7XG4gICAgV2ViR0xDb250ZXh0Ll9nbC5nZXRFeHRlbnNpb24oJ0VYVF9mbG9hdF9ibGVuZCcpO1xuICB9XG5cbiAgLy9cbiAgLy9cbiAgLy9cblxuICBzdGF0aWMgZ2V0Q29udGV4dCgpIHtcbiAgICBpZiAoIVdlYkdMQ29udGV4dC5fZ2wpIHRocm93IG5ldyBFcnJvcignd2ViZ2wgY29udGV4dCBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgICByZXR1cm4gV2ViR0xDb250ZXh0Ll9nbDtcbiAgfVxuXG4gIC8vXG4gIC8vXG4gIC8vXG5cbiAgc3RhdGljIGdldEV4dGVuc2lvbkxvc2VDb250ZXh0KCkge1xuICAgIHJldHVybiBXZWJHTENvbnRleHQuX2V4dGVuc2lvbkxvc2VDb250ZXh0O1xuICB9XG5cbiAgc3RhdGljIGdldEV4dGVuc2lvbkxvc2VDb250ZXh0U3RyaWN0KCkge1xuICAgIGlmICghV2ViR0xDb250ZXh0Ll9leHRlbnNpb25Mb3NlQ29udGV4dClcbiAgICAgIHRocm93IG5ldyBFcnJvcignbG9zZSBjb250ZXh0IGV4dGVuc2lvbiBub3QgYXZhaWxhYmxlJyk7XG5cbiAgICByZXR1cm4gV2ViR0xDb250ZXh0Ll9leHRlbnNpb25Mb3NlQ29udGV4dDtcbiAgfVxufVxuIiwKICAiaW1wb3J0IHsgV2ViR0xDb250ZXh0IH0gZnJvbSAnLi9XZWJHTENvbnRleHQnO1xuXG5leHBvcnQgZW51bSBDdWJlTWFwVHlwZSB7XG4gIHBvc2l0aXZlWCxcbiAgbmVnYXRpdmVYLFxuICBwb3NpdGl2ZVksXG4gIG5lZ2F0aXZlWSxcbiAgcG9zaXRpdmVaLFxuICBuZWdhdGl2ZVpcbn1cblxuZXhwb3J0IGNvbnN0IGdldEN1YmVNYXBUeXBlID0gKGluVHlwZTogQ3ViZU1hcFR5cGUpOiBudW1iZXIgPT4ge1xuICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gIHN3aXRjaCAoaW5UeXBlKSB7XG4gICAgY2FzZSBDdWJlTWFwVHlwZS5wb3NpdGl2ZVg6XG4gICAgICByZXR1cm4gZ2wuVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YO1xuICAgIGNhc2UgQ3ViZU1hcFR5cGUubmVnYXRpdmVYOlxuICAgICAgcmV0dXJuIGdsLlRFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWDtcbiAgICBjYXNlIEN1YmVNYXBUeXBlLnBvc2l0aXZlWTpcbiAgICAgIHJldHVybiBnbC5URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1k7XG4gICAgY2FzZSBDdWJlTWFwVHlwZS5uZWdhdGl2ZVk6XG4gICAgICByZXR1cm4gZ2wuVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9ZO1xuICAgIGNhc2UgQ3ViZU1hcFR5cGUucG9zaXRpdmVaOlxuICAgICAgcmV0dXJuIGdsLlRFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWjtcbiAgICBjYXNlIEN1YmVNYXBUeXBlLm5lZ2F0aXZlWjpcbiAgICAgIHJldHVybiBnbC5URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1o7XG4gIH1cbiAgLy8gdGhyb3cgbmV3IEVycm9yKCdjdWJlIG1hcDogaW52YWxpZCB0eXBlJyk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElVbmJvdW5kQ3ViZU1hcCB7XG4gIGluaXRpYWxpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkO1xuICByYXdCaW5kKCk6IHZvaWQ7XG4gIGJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmRDdWJlTWFwKSA9PiB2b2lkKTogdm9pZDtcbiAgZ2V0UmF3T2JqZWN0KCk6IFdlYkdMVGV4dHVyZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQm91bmRDdWJlTWFwIHtcbiAgYWxsb2NhdGUoKTogdm9pZDtcbiAgbG9hZEZyb21NZW1vcnkoaW5UeXBlOiBDdWJlTWFwVHlwZSwgaW5QaXhlbHM6IFVpbnQ4QXJyYXkpOiB2b2lkO1xuICBjb21wbGV0ZSgpOiB2b2lkO1xuICBnZXRSYXdPYmplY3QoKTogV2ViR0xUZXh0dXJlO1xufVxuXG5leHBvcnQgY2xhc3MgQ3ViZU1hcCBpbXBsZW1lbnRzIElVbmJvdW5kQ3ViZU1hcCwgSUJvdW5kQ3ViZU1hcCB7XG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX21pbkJ1ZmZlclNpemU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3RleHR1cmU6IFdlYkdMVGV4dHVyZSB8IG51bGwgPSBudWxsO1xuXG4gIGluaXRpYWxpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAod2lkdGggPCAxKSB0aHJvdyBuZXcgRXJyb3IoYGN1YmUgbWFwOiB3aWR0aCBpcyA8IDEsIGlucHV0OiAke3dpZHRofWApO1xuICAgIGlmIChoZWlnaHQgPCAxKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjdWJlIG1hcDogaGVpZ2h0IGlzIDwgMSwgaW5wdXQ6ICR7aGVpZ2h0fWApO1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICB0aGlzLl90ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuX21pbkJ1ZmZlclNpemUgPSB0aGlzLl93aWR0aCAqIHRoaXMuX2hlaWdodCAqIDQ7XG4gIH1cblxuICByYXdCaW5kKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdjdWJlIG1hcDogbm90IGluaXRpYWxpemVkJyk7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIHRoaXMuX3RleHR1cmUpO1xuICB9XG5cbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZEN1YmVNYXApID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnJhd0JpbmQoKTtcblxuICAgIGluQ2FsbGJhY2sodGhpcyk7XG5cbiAgICBDdWJlTWFwLnVuYmluZCgpO1xuICB9XG5cbiAgc3RhdGljIHVuYmluZCgpOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFX0NVQkVfTUFQLCBudWxsKTtcbiAgfVxuXG4gIGxvYWRGcm9tTWVtb3J5KGluVHlwZTogQ3ViZU1hcFR5cGUsIGluUGl4ZWxzOiBVaW50OEFycmF5KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ2N1YmUgbWFwOiBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgICBpZiAoaW5QaXhlbHMubGVuZ3RoIDwgdGhpcy5fbWluQnVmZmVyU2l6ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGN1YmUgbWFwOiBtaXNzLW1hdGNoaW5nIHBpeGVscyBidWZmZXIgc2l6ZSwgaW5wdXQ6ICR7aW5QaXhlbHMubGVuZ3RofWBcbiAgICAgICk7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBjb25zdCBsZXZlbCA9IDA7XG4gICAgY29uc3QgaW50ZXJuYWxGb3JtYXQgPSBnbC5SR0JBO1xuICAgIGNvbnN0IGJvcmRlciA9IDA7XG4gICAgY29uc3Qgc3JjRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBzcmNUeXBlID0gZ2wuVU5TSUdORURfQllURTtcblxuICAgIGdsLnRleEltYWdlMkQoXG4gICAgICBnZXRDdWJlTWFwVHlwZShpblR5cGUpLFxuICAgICAgbGV2ZWwsXG4gICAgICBpbnRlcm5hbEZvcm1hdCxcbiAgICAgIHRoaXMuX3dpZHRoLFxuICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgYm9yZGVyLFxuICAgICAgc3JjRm9ybWF0LFxuICAgICAgc3JjVHlwZSxcbiAgICAgIGluUGl4ZWxzXG4gICAgKTtcbiAgfVxuXG4gIGFsbG9jYXRlKCk6IHZvaWQge1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgY29uc3QgbGV2ZWwgPSAwO1xuICAgIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBib3JkZXIgPSAwO1xuICAgIGNvbnN0IHNyY0Zvcm1hdCA9IGdsLlJHQkE7XG4gICAgY29uc3Qgc3JjVHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XG5cbiAgICBjb25zdCBwaXhlbHMgPSBuZXcgVWludDhBcnJheSh0aGlzLl93aWR0aCAqIHRoaXMuX2hlaWdodCAqIDQpO1xuXG4gICAgW1xuICAgICAgQ3ViZU1hcFR5cGUubmVnYXRpdmVYLFxuICAgICAgQ3ViZU1hcFR5cGUubmVnYXRpdmVZLFxuICAgICAgQ3ViZU1hcFR5cGUubmVnYXRpdmVaLFxuICAgICAgQ3ViZU1hcFR5cGUucG9zaXRpdmVYLFxuICAgICAgQ3ViZU1hcFR5cGUucG9zaXRpdmVZLFxuICAgICAgQ3ViZU1hcFR5cGUucG9zaXRpdmVaLFxuICAgIF0uZm9yRWFjaCgodHlwZSkgPT4ge1xuXG4gICAgICBnbC50ZXhJbWFnZTJEKFxuICAgICAgICBnZXRDdWJlTWFwVHlwZSh0eXBlKSxcbiAgICAgICAgbGV2ZWwsXG4gICAgICAgIGludGVybmFsRm9ybWF0LFxuICAgICAgICB0aGlzLl93aWR0aCxcbiAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICBib3JkZXIsXG4gICAgICAgIHNyY0Zvcm1hdCxcbiAgICAgICAgc3JjVHlwZSxcbiAgICAgICAgcGl4ZWxzXG4gICAgICApO1xuXG4gICAgfSk7XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFX0NVQkVfTUFQKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKFxuICAgICAgZ2wuVEVYVFVSRV9DVUJFX01BUCxcbiAgICAgIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUixcbiAgICAgIGdsLkxJTkVBUl9NSVBNQVBfTElORUFSXG4gICAgKTtcbiAgfVxuXG4gIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ2N1YmUgbWFwOiBub3QgaW5pdGlhbGl6ZWQnKTtcblxuICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgfVxuXG4gIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdjdWJlIG1hcDogbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICB9XG5cbiAgZ2V0UmF3T2JqZWN0KCkge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgLy8gVE9ETzogdGhpcyBpcyB1Z2x5XG4gICAgcmV0dXJuIHRoaXMuX3RleHR1cmU7XG4gIH1cblxufVxuIiwKICAiaW1wb3J0IHsgV2ViR0xDb250ZXh0IH0gZnJvbSAnLi9XZWJHTENvbnRleHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElVbmJvdW5kRGF0YVRleHR1cmUge1xuICBpbml0aWFsaXplKGRhdGE/OiBudW1iZXJbXSk6IHZvaWQ7XG4gIHJhd0JpbmQoKTogdm9pZDtcbiAgcHJlQmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZERhdGFUZXh0dXJlKSA9PiB2b2lkKTogdm9pZDtcbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZERhdGFUZXh0dXJlKSA9PiB2b2lkKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQm91bmREYXRhVGV4dHVyZSBleHRlbmRzIElVbmJvdW5kRGF0YVRleHR1cmUge1xuICB1cGRhdGUoZGF0YTogbnVtYmVyW10pOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgRGF0YVRleHR1cmUgaW1wbGVtZW50cyBJQm91bmREYXRhVGV4dHVyZSB7XG4gIHByaXZhdGUgX3RleHR1cmU6IFdlYkdMVGV4dHVyZSB8IG51bGwgPSBudWxsO1xuXG4gIC8vIGluaXRpYWxpemUoZGF0YTogbnVtYmVyW10gPSBbXSwgbnVtQ29tcG9uZW50czogbnVtYmVyID0gMSkge1xuICBpbml0aWFsaXplKGRhdGE6IG51bWJlcltdID0gW10pIHtcbiAgICBpZiAodGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdkYXRhIHRleHR1cmUgYWxyZWFkeSBpbml0aWFsaXplZCcpO1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgdGhpcy5fdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcblxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuX3RleHR1cmUpO1xuXG4gICAgLy8gbWFrZSBpdCBwb3NzaWJsZSB0byB1c2UgYSBub24tcG93ZXItb2YtMiB0ZXh0dXJlICsgd2UgZG9uJ3QgbmVlZCBhbnkgZmlsdGVyaW5nXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcblxuICAgIC8vIHRoaXMudXBkYXRlKGRhdGEsIG51bUNvbXBvbmVudHMpO1xuICAgIHRoaXMudXBkYXRlKGRhdGEpO1xuICB9XG5cbiAgLy8gdXBkYXRlKGRhdGE6IG51bWJlcltdLCBudW1Db21wb25lbnRzOiBudW1iZXIgPSAxKSB7XG4gIHVwZGF0ZShkYXRhOiBudW1iZXJbXSkge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdkYXRhIHRleHR1cmUgbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl90ZXh0dXJlKTtcblxuICAgIGNvbnN0IGV4cGFuZGVkRGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkoZGF0YSk7XG5cbiAgICAvLyAvLyBleHBhbmQgdGhlIGRhdGEgdG8gNCB2YWx1ZXMgcGVyIHBpeGVsLlxuICAgIC8vIGNvbnN0IG51bUVsZW1lbnRzID0gZGF0YS5sZW5ndGggLyBudW1Db21wb25lbnRzO1xuICAgIC8vIGNvbnN0IGV4cGFuZGVkRGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkobnVtRWxlbWVudHMgKiA0KTtcbiAgICAvLyBmb3IgKGxldCBpaSA9IDA7IGlpIDwgbnVtRWxlbWVudHM7ICsraWkpIHtcbiAgICAvLyAgIGNvbnN0IHNyY09mZnNldCA9IGlpICogbnVtQ29tcG9uZW50cztcbiAgICAvLyAgIGNvbnN0IGRzdE9mZnNldCA9IGlpICogNDtcbiAgICAvLyAgIGZvciAobGV0IGpqID0gMDsgamogPCBudW1Db21wb25lbnRzOyArK2pqKVxuICAgIC8vICAgICBleHBhbmRlZERhdGFbZHN0T2Zmc2V0ICsgampdID0gZGF0YVtzcmNPZmZzZXQgKyBqal07XG4gICAgLy8gfVxuXG4gICAgY29uc3QgbGV2ZWwgPSAwO1xuICAgIC8vIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICAvLyBjb25zdCBpbnRlcm5hbEZvcm1hdCA9IGdsLlJHQkEzMkY7XG4gICAgY29uc3QgaW50ZXJuYWxGb3JtYXQgPSBnbC5SMzJGO1xuICAgIC8vIGNvbnN0IHdpZHRoID0gbnVtRWxlbWVudHM7XG4gICAgY29uc3Qgd2lkdGggPSBkYXRhLmxlbmd0aDtcbiAgICBjb25zdCBoZWlnaHQgPSAxO1xuICAgIGNvbnN0IGJvcmRlciA9IDA7XG4gICAgLy8gY29uc3QgZm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBmb3JtYXQgPSBnbC5SRUQ7XG4gICAgLy8gY29uc3QgdHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XG4gICAgY29uc3QgdHlwZSA9IGdsLkZMT0FUO1xuICAgIGdsLnRleEltYWdlMkQoXG4gICAgICBnbC5URVhUVVJFXzJELFxuICAgICAgbGV2ZWwsXG4gICAgICBpbnRlcm5hbEZvcm1hdCxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgYm9yZGVyLFxuICAgICAgZm9ybWF0LFxuICAgICAgdHlwZSxcbiAgICAgIGV4cGFuZGVkRGF0YVxuICAgICk7XG4gIH1cblxuICByYXdCaW5kKCkge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdkYXRhIHRleHR1cmUgbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl90ZXh0dXJlKTtcbiAgfVxuXG4gIHByZUJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmREYXRhVGV4dHVyZSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMucmF3QmluZCgpO1xuICAgIGluQ2FsbGJhY2sodGhpcyk7XG4gIH1cblxuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kRGF0YVRleHR1cmUpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnByZUJpbmQoaW5DYWxsYmFjayk7XG4gICAgRGF0YVRleHR1cmUudW5iaW5kKCk7XG4gIH1cblxuICBzdGF0aWMgdW5iaW5kKCk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuICB9XG59XG4iLAogICJpbXBvcnQgeyBXZWJHTENvbnRleHQgfSBmcm9tICcuL1dlYkdMQ29udGV4dCc7XG5pbXBvcnQgeyBJQm91bmRUZXh0dXJlIH0gZnJvbSAnLi9UZXh0dXJlJztcbmltcG9ydCB7IEN1YmVNYXBUeXBlLCBJQm91bmRDdWJlTWFwLCBnZXRDdWJlTWFwVHlwZSB9IGZyb20gJy4vQ3ViZU1hcCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVuYm91bmRGcmFtZUJ1ZmZlciB7XG4gIHJhd0JpbmQoKTogdm9pZDtcbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZEZyYW1lQnVmZmVyKSA9PiB2b2lkKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQm91bmRGcmFtZUJ1ZmZlciB7XG4gIGF0dGFjaFRleHR1cmUodGV4dHVyZTogSUJvdW5kVGV4dHVyZSk6IHZvaWQ7XG4gIGF0dGFjaEN1YmVNYXAodGV4dHVyZTogSUJvdW5kQ3ViZU1hcCwgdHlwZTogQ3ViZU1hcFR5cGUpOiB2b2lkO1xuICBnZXRQaXhlbHMoXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIG91dERzdDogVWludDhBcnJheVxuICApOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgRnJhbWVCdWZmZXIgaW1wbGVtZW50cyBJVW5ib3VuZEZyYW1lQnVmZmVyLCBJQm91bmRGcmFtZUJ1ZmZlciB7XG4gIHByaXZhdGUgX2ZyYW1lQnVmZmVyOiBXZWJHTEZyYW1lYnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGNvbnN0IHRtcEZibyA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG4gICAgaWYgKHRtcEZibyA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdudWxsIGZyYW1lIGJ1ZmZlciBvYmplY3QnKTtcbiAgICB0aGlzLl9mcmFtZUJ1ZmZlciA9IHRtcEZibztcbiAgfVxuXG4gIHJhd0JpbmQoKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgdGhpcy5fZnJhbWVCdWZmZXIpO1xuICB9XG5cbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZEZyYW1lQnVmZmVyKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5yYXdCaW5kKCk7XG5cbiAgICBpbkNhbGxiYWNrKHRoaXMpO1xuXG4gICAgRnJhbWVCdWZmZXIudW5iaW5kKCk7XG4gIH1cblxuICBzdGF0aWMgdW5iaW5kKCkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbCk7XG4gIH1cblxuICBhdHRhY2hUZXh0dXJlKHRleHR1cmU6IElCb3VuZFRleHR1cmUpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICAvLyBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMuX2ZyYW1lQnVmZmVyKTtcblxuICAgIC8vIHRleHR1cmUucmF3QmluZCgpO1xuXG4gICAgY29uc3QgbWlwbWFwTGV2ZWwgPSAwO1xuXG4gICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoXG4gICAgICBnbC5GUkFNRUJVRkZFUixcbiAgICAgIGdsLkNPTE9SX0FUVEFDSE1FTlQwLFxuICAgICAgZ2wuVEVYVFVSRV8yRCxcbiAgICAgIHRleHR1cmUuZ2V0UmF3T2JqZWN0KCksXG4gICAgICBtaXBtYXBMZXZlbFxuICAgICk7XG4gIH1cblxuICBhdHRhY2hDdWJlTWFwKHRleHR1cmU6IElCb3VuZEN1YmVNYXAsIHR5cGU6IEN1YmVNYXBUeXBlKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgLy8gZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLl9mcmFtZUJ1ZmZlcik7XG5cbiAgICAvLyB0ZXh0dXJlLnJhd0JpbmQoKTtcblxuICAgIGNvbnN0IG1pcG1hcExldmVsID0gMDtcblxuICAgIGdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKFxuICAgICAgZ2wuRlJBTUVCVUZGRVIsXG4gICAgICBnbC5DT0xPUl9BVFRBQ0hNRU5UMCxcbiAgICAgIGdldEN1YmVNYXBUeXBlKHR5cGUpLFxuICAgICAgdGV4dHVyZS5nZXRSYXdPYmplY3QoKSxcbiAgICAgIG1pcG1hcExldmVsXG4gICAgKTtcbiAgfVxuXG4gIGdldFBpeGVscyhcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgb3V0RHN0OiBVaW50OEFycmF5XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC5yZWFkUGl4ZWxzKHgsIHksIHdpZHRoLCBoZWlnaHQsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIG91dERzdCk7XG4gIH1cbn1cbiIsCiAgImltcG9ydCB7IFdlYkdMQ29udGV4dCB9IGZyb20gJy4vV2ViR0xDb250ZXh0JztcbmltcG9ydCB7IElVbmJvdW5kU2hhZGVyLCBTaGFkZXJQcm9ncmFtIH0gZnJvbSAnLi9TaGFkZXJQcm9ncmFtJztcblxuZXhwb3J0IG5hbWVzcGFjZSBHZW9tZXRyeVdyYXBwZXIge1xuICBleHBvcnQgY29uc3QgQnl0ZXNQZXJQaXhlbCA9IDQ7IC8vIGZsb2F0IChmbG9hdDMyID0gNCBieXRlcylcblxuICBleHBvcnQgZW51bSBBdHRyaWJ1dGVUeXBlIHtcbiAgICBmbG9hdCxcbiAgICB2ZWMyZixcbiAgICB2ZWMzZixcbiAgICB2ZWM0ZixcbiAgICBtYXQzZixcbiAgICBtYXQ0ZlxuICB9XG5cbiAgY29uc3QgZ2V0QXR0clR5cGVTaXplID0gKGluVHlwZTogQXR0cmlidXRlVHlwZSkgPT4ge1xuICAgIHN3aXRjaCAoaW5UeXBlKSB7XG4gICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUuZmxvYXQ6XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLnZlYzJmOlxuICAgICAgICByZXR1cm4gMjtcbiAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWMzZjpcbiAgICAgICAgcmV0dXJuIDM7XG4gICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUudmVjNGY6XG4gICAgICAgIHJldHVybiA0O1xuICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLm1hdDNmOlxuICAgICAgICByZXR1cm4gOTtcbiAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS5tYXQ0ZjpcbiAgICAgICAgcmV0dXJuIDE2O1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgZW51bSBQcmltaXRpdmVUeXBlIHtcbiAgICBsaW5lcyxcbiAgICB0cmlhbmdsZXMsXG4gICAgdHJpYW5nbGVTdHJpcFxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBWYm9BdHRyIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdHlwZTogQXR0cmlidXRlVHlwZTtcbiAgICBpbmRleDogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBWYm9EZWZpbml0aW9uIHtcbiAgICBhdHRyczogVmJvQXR0cltdO1xuICAgIHN0cmlkZT86IG51bWJlcjtcbiAgICBpbnN0YW5jZWQ6IGJvb2xlYW47XG4gICAgZHluYW1pYz86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEdlb21ldHJ5RGVmaW5pdGlvbiB7XG4gICAgdmJvczogVmJvRGVmaW5pdGlvbltdO1xuICAgIHByaW1pdGl2ZVR5cGU6IFByaW1pdGl2ZVR5cGU7XG4gIH1cblxuICBleHBvcnQgY2xhc3MgR2VvbWV0cnkge1xuICAgIHByaXZhdGUgX2RlZjogR2VvbWV0cnlEZWZpbml0aW9uO1xuICAgIHByaXZhdGUgX3ZhbzogV2ViR0xWZXJ0ZXhBcnJheU9iamVjdE9FUztcbiAgICBwcml2YXRlIF92Ym9zOiB7IG9iamVjdDogV2ViR0xCdWZmZXI7IG1heFNpemU6IG51bWJlcjsgZHluYW1pYzogYm9vbGVhbiB9W107XG4gICAgcHJpdmF0ZSBfcHJpbWl0aXZlVHlwZTogbnVtYmVyO1xuICAgIHByaXZhdGUgX3ByaW1pdGl2ZVN0YXJ0OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3ByaW1pdGl2ZUNvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2luc3RhbmNlQ291bnQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfaXNJbnN0YW5jZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHNoYWRlcjogSVVuYm91bmRTaGFkZXIsIGRlZjogR2VvbWV0cnlEZWZpbml0aW9uKSB7XG4gICAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICAgIGlmIChkZWYudmJvcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlbXB0eSB2Ym8gZGVmaW5pdGlvbicpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHZibyBvZiBkZWYudmJvcykge1xuICAgICAgICBpZiAodmJvLmF0dHJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZW1wdHkgdmJvIGF0dHJpYnV0ZSBkZWZpbml0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgdmJvLmF0dHJzKSB7XG4gICAgICAgICAgaWYgKCFzaGFkZXIuaGFzQXR0cmlidXRlKGF0dHIubmFtZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgYXR0cmlidXRlIG5vdCBmb3VuZCwgbmFtZT1cIiR7YXR0ci5uYW1lfVwiYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2RlZiA9IGRlZjtcblxuICAgICAgc3dpdGNoIChkZWYucHJpbWl0aXZlVHlwZSkge1xuICAgICAgICBjYXNlIFByaW1pdGl2ZVR5cGUubGluZXM6XG4gICAgICAgICAgdGhpcy5fcHJpbWl0aXZlVHlwZSA9IGdsLkxJTkVTO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFByaW1pdGl2ZVR5cGUudHJpYW5nbGVzOlxuICAgICAgICAgIHRoaXMuX3ByaW1pdGl2ZVR5cGUgPSBnbC5UUklBTkdMRVM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUHJpbWl0aXZlVHlwZS50cmlhbmdsZVN0cmlwOlxuICAgICAgICAgIHRoaXMuX3ByaW1pdGl2ZVR5cGUgPSBnbC5UUklBTkdMRV9TVFJJUDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByaW1pdGl2ZSB0eXBlIG5vdCBmb3VuZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdWYW8gPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xuICAgICAgaWYgKCFuZXdWYW8pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmYWlsIG8gY3JlYXRlIGEgdmFvIHVuaXQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdmFvID0gbmV3VmFvO1xuICAgICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMuX3Zhbyk7XG5cbiAgICAgIC8vXG5cbiAgICAgIHRoaXMuX3Zib3MgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgdmJvRGVmIG9mIHRoaXMuX2RlZi52Ym9zKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZibyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICBpZiAoIW5ld1Zibykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZmFpbCBvIGNyZWF0ZSBhIHZibyB1bml0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92Ym9zLnB1c2goe1xuICAgICAgICAgIG9iamVjdDogbmV3VmJvLFxuICAgICAgICAgIG1heFNpemU6IDAsXG4gICAgICAgICAgZHluYW1pYzogdmJvRGVmLmR5bmFtaWMgfHwgZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG5ld1Zibyk7XG5cbiAgICAgICAgbGV0IHN0cmlkZSA9IHZib0RlZi5zdHJpZGUgfHwgMDtcbiAgICAgICAgaWYgKCFzdHJpZGUpIHtcbiAgICAgICAgICAvLyBhdXRvIGRldGVybWluZSBzdHJpZGUgdmFsdWVcbiAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgdmJvRGVmLmF0dHJzKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGF0dHIudHlwZSkge1xuICAgICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUuZmxvYXQ6XG4gICAgICAgICAgICAgICAgc3RyaWRlICs9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWMyZjpcbiAgICAgICAgICAgICAgICBzdHJpZGUgKz0gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLnZlYzNmOlxuICAgICAgICAgICAgICAgIHN0cmlkZSArPSAzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUudmVjNGY6XG4gICAgICAgICAgICAgICAgc3RyaWRlICs9IDQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS5tYXQzZjpcbiAgICAgICAgICAgICAgICBzdHJpZGUgKz0gOTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLm1hdDRmOlxuICAgICAgICAgICAgICAgIHN0cmlkZSArPSAxNjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc3RyaWRlICo9IEJ5dGVzUGVyUGl4ZWw7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgdmJvRGVmLmF0dHJzKSB7XG4gICAgICAgICAgbGV0IHJvd1NpemUgPSAxO1xuICAgICAgICAgIGxldCB0b3RhbFJvd3MgPSAxO1xuICAgICAgICAgIHN3aXRjaCAoYXR0ci50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUuZmxvYXQ6XG4gICAgICAgICAgICAgIHJvd1NpemUgPSAxO1xuICAgICAgICAgICAgICB0b3RhbFJvd3MgPSAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWMyZjpcbiAgICAgICAgICAgICAgcm93U2l6ZSA9IDI7XG4gICAgICAgICAgICAgIHRvdGFsUm93cyA9IDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLnZlYzNmOlxuICAgICAgICAgICAgICByb3dTaXplID0gMztcbiAgICAgICAgICAgICAgdG90YWxSb3dzID0gMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUudmVjNGY6XG4gICAgICAgICAgICAgIHJvd1NpemUgPSA0O1xuICAgICAgICAgICAgICB0b3RhbFJvd3MgPSAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS5tYXQzZjpcbiAgICAgICAgICAgICAgcm93U2l6ZSA9IDM7XG4gICAgICAgICAgICAgIHRvdGFsUm93cyA9IDM7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLm1hdDRmOlxuICAgICAgICAgICAgICByb3dTaXplID0gNDtcbiAgICAgICAgICAgICAgdG90YWxSb3dzID0gNDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgYXR0ckxvY2F0aW9uID0gc2hhZGVyLmdldEF0dHJpYnV0ZShhdHRyLm5hbWUpO1xuXG4gICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgdGhlIGluZGV4IGlzIDAgb24gaz4wIGFuZCBhc3NlcnQvdGhyb3cgb24gaXRcblxuICAgICAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCB0b3RhbFJvd3M7ICsraWkpIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJJZCA9IGF0dHJMb2NhdGlvbiArIGlpO1xuICAgICAgICAgICAgY29uc3Qgcm93SW5kZXggPSAoYXR0ci5pbmRleCArIGlpICogcm93U2l6ZSkgKiBCeXRlc1BlclBpeGVsO1xuXG4gICAgICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRySWQpO1xuICAgICAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgICAgICAgYXR0cklkLFxuICAgICAgICAgICAgICByb3dTaXplLFxuICAgICAgICAgICAgICBnbC5GTE9BVCxcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgIHN0cmlkZSxcbiAgICAgICAgICAgICAgcm93SW5kZXhcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICh2Ym9EZWYuaW5zdGFuY2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IoYXR0cklkLCAxKTtcbiAgICAgICAgICAgICAgdGhpcy5faXNJbnN0YW5jZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL1xuXG4gICAgICBnbC5iaW5kVmVydGV4QXJyYXkobnVsbCk7XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgICAgZm9yIChjb25zdCB2Ym8gb2YgdGhpcy5fdmJvcykgZ2wuZGVsZXRlQnVmZmVyKHZiby5vYmplY3QpO1xuICAgICAgdGhpcy5fdmJvcy5sZW5ndGggPSAwO1xuXG4gICAgICBnbC5kZWxldGVWZXJ0ZXhBcnJheSh0aGlzLl92YW8pO1xuICAgIH1cblxuICAgIHNldEJ1ZmZlclNpemUoaW5kZXg6IG51bWJlciwgaW5TaXplOiBudW1iZXIpIHtcbiAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5fdmJvcy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBidWZmZXIgYXZhaWxhYmxlIHRvIHRoYXQgaW5kZXgnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGluU2l6ZSA8PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VyclZibyA9IHRoaXMuX3Zib3NbaW5kZXhdO1xuXG4gICAgICBpZiAoaW5TaXplIDwgY3VyclZiby5tYXhTaXplKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY3VyclZiby5tYXhTaXplID0gaW5TaXplO1xuXG4gICAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICAgIGNvbnN0IHVzYWdlID0gY3VyclZiby5keW5hbWljID8gZ2wuRFlOQU1JQ19EUkFXIDogZ2wuU1RBVElDX0RSQVc7XG5cbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBjdXJyVmJvLm9iamVjdCk7XG4gICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgaW5TaXplLCB1c2FnZSk7XG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XG4gICAgfVxuXG4gICAgc2V0RmxvYXRCdWZmZXJTaXplKGluZGV4OiBudW1iZXIsIGluU2l6ZTogbnVtYmVyKSB7XG4gICAgICB0aGlzLnNldEJ1ZmZlclNpemUoaW5kZXgsIGluU2l6ZSAqIDQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUJ1ZmZlcihcbiAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICB2ZXJ0aWNlczogUmVhZG9ubHlBcnJheTxudW1iZXI+IHwgUmVhZG9ubHk8RmxvYXQzMkFycmF5PixcbiAgICAgIGluU2l6ZTogbnVtYmVyXG4gICAgKSB7XG4gICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuX3Zib3MubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gYnVmZmVyIGF2YWlsYWJsZSB0byB0aGF0IGluZGV4Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpblNpemUgPD0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgICAgY29uc3QgYnVmZmVyID1cbiAgICAgICAgdmVydGljZXMgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXlcbiAgICAgICAgICA/IHZlcnRpY2VzXG4gICAgICAgICAgOiBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKTtcblxuICAgICAgY29uc3QgY3VyclZibyA9IHRoaXMuX3Zib3NbaW5kZXhdO1xuXG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY3VyclZiby5vYmplY3QpO1xuXG4gICAgICBpZiAoaW5TaXplID4gY3VyclZiby5tYXhTaXplKSB7XG4gICAgICAgIGN1cnJWYm8ubWF4U2l6ZSA9IGluU2l6ZTtcbiAgICAgICAgY29uc3QgdXNhZ2UgPSBjdXJyVmJvLmR5bmFtaWMgPyBnbC5EWU5BTUlDX0RSQVcgOiBnbC5TVEFUSUNfRFJBVztcbiAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlciwgdXNhZ2UsIDAsIGluU2l6ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnbC5idWZmZXJTdWJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgMCwgYnVmZmVyLCAwLCBpblNpemUpO1xuICAgICAgfVxuXG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgaWYgKHRoaXMuX3ByaW1pdGl2ZUNvdW50ID09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5faXNJbnN0YW5jZWQgJiYgdGhpcy5faW5zdGFuY2VDb3VudCA9PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgICBnbC5iaW5kVmVydGV4QXJyYXkodGhpcy5fdmFvKTtcblxuICAgICAgaWYgKHRoaXMuX2lzSW5zdGFuY2VkID09PSB0cnVlKSB7XG4gICAgICAgIGdsLmRyYXdBcnJheXNJbnN0YW5jZWQoXG4gICAgICAgICAgdGhpcy5fcHJpbWl0aXZlVHlwZSxcbiAgICAgICAgICB0aGlzLl9wcmltaXRpdmVTdGFydCxcbiAgICAgICAgICB0aGlzLl9wcmltaXRpdmVDb3VudCxcbiAgICAgICAgICB0aGlzLl9pbnN0YW5jZUNvdW50XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnbC5kcmF3QXJyYXlzKFxuICAgICAgICAgIHRoaXMuX3ByaW1pdGl2ZVR5cGUsXG4gICAgICAgICAgdGhpcy5fcHJpbWl0aXZlU3RhcnQsXG4gICAgICAgICAgdGhpcy5fcHJpbWl0aXZlQ291bnRcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZ2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xuICAgIH1cblxuICAgIHNldFByaW1pdGl2ZVN0YXJ0KHN0YXJ0OiBudW1iZXIpIHtcbiAgICAgIHRoaXMuX3ByaW1pdGl2ZVN0YXJ0ID0gc3RhcnQ7XG4gICAgfVxuXG4gICAgc2V0UHJpbWl0aXZlQ291bnQoY291bnQ6IG51bWJlcikge1xuICAgICAgdGhpcy5fcHJpbWl0aXZlQ291bnQgPSBjb3VudDtcbiAgICB9XG5cbiAgICBzZXRJbnN0YW5jZWRDb3VudChjb3VudDogbnVtYmVyKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZUNvdW50ID0gY291bnQ7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEdlb21ldHJ5QnVpbGRlciB7XG4gICAgcHJpdmF0ZSBfZGVmOiBHZW9tZXRyeURlZmluaXRpb24gPSB7XG4gICAgICB2Ym9zOiBbXSxcbiAgICAgIHByaW1pdGl2ZVR5cGU6IFByaW1pdGl2ZVR5cGUubGluZXNcbiAgICB9O1xuXG4gICAgcmVzZXQoKTogdGhpcyB7XG4gICAgICB0aGlzLl9kZWYgPSB7XG4gICAgICAgIHZib3M6IFtdLFxuICAgICAgICBwcmltaXRpdmVUeXBlOiBQcmltaXRpdmVUeXBlLmxpbmVzXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0RGVmKCk6IEdlb21ldHJ5RGVmaW5pdGlvbiB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmO1xuICAgIH1cblxuICAgIHNldFByaW1pdGl2ZVR5cGUoXG4gICAgICBpblByaW1pdGl2ZTogJ2xpbmVzJyB8ICd0cmlhbmdsZXMnIHwgJ3RyaWFuZ2xlU3RyaXAnXG4gICAgKTogdGhpcyB7XG4gICAgICB0aGlzLl9kZWYucHJpbWl0aXZlVHlwZSA9IFByaW1pdGl2ZVR5cGVbaW5QcmltaXRpdmVdO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFZibygpOiB0aGlzIHtcbiAgICAgIHRoaXMuX2RlZi52Ym9zLnB1c2goe1xuICAgICAgICBhdHRyczogW10sXG4gICAgICAgIC8vIHN0cmlkZTogMCxcbiAgICAgICAgaW5zdGFuY2VkOiBmYWxzZVxuICAgICAgICAvLyBkeW5hbWljOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFZib0FzSW5zdGFuY2VkKCk6IHRoaXMge1xuICAgICAgdGhpcy5fZ2V0TGFzdFZibygpLmluc3RhbmNlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VmJvQXNEeW5hbWljKCk6IHRoaXMge1xuICAgICAgdGhpcy5fZ2V0TGFzdFZibygpLmR5bmFtaWMgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFN0cmlkZShpblN0cmlkZTogbnVtYmVyKTogdGhpcyB7XG4gICAgICB0aGlzLl9nZXRMYXN0VmJvKCkuc3RyaWRlID0gaW5TdHJpZGU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkVmJvQXR0cmlidXRlKFxuICAgICAgaW5OYW1lOiBzdHJpbmcsXG4gICAgICBpblR5cGU6ICdmbG9hdCcgfCAndmVjMmYnIHwgJ3ZlYzNmJyB8ICd2ZWM0ZicgfCAnbWF0M2YnIHwgJ21hdDRmJ1xuICAgICk6IHRoaXMge1xuICAgICAgY29uc3QgY3VyclZibyA9IHRoaXMuX2dldExhc3RWYm8oKTtcbiAgICAgIGNvbnN0IGxhc3RBdHRyID1cbiAgICAgICAgY3VyclZiby5hdHRycy5sZW5ndGggPiAwXG4gICAgICAgICAgPyBjdXJyVmJvLmF0dHJzW2N1cnJWYm8uYXR0cnMubGVuZ3RoIC0gMV1cbiAgICAgICAgICA6IG51bGw7XG4gICAgICBjdXJyVmJvLmF0dHJzLnB1c2goe1xuICAgICAgICBuYW1lOiBpbk5hbWUsXG4gICAgICAgIHR5cGU6IEF0dHJpYnV0ZVR5cGVbaW5UeXBlXSxcbiAgICAgICAgaW5kZXg6IGxhc3RBdHRyID8gbGFzdEF0dHIuaW5kZXggKyBnZXRBdHRyVHlwZVNpemUobGFzdEF0dHIudHlwZSkgOiAwXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldExhc3RWYm8oKTogVmJvRGVmaW5pdGlvbiB7XG4gICAgICBpZiAodGhpcy5fZGVmLnZib3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gVkJPIHNldHVwJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fZGVmLnZib3NbdGhpcy5fZGVmLnZib3MubGVuZ3RoIC0gMV07XG4gICAgfVxuICB9XG59XG4iLAogICJpbXBvcnQgeyBJVW5ib3VuZEN1YmVNYXAgfSBmcm9tICcuL0N1YmVNYXAnO1xuaW1wb3J0IHsgSVVuYm91bmRUZXh0dXJlIH0gZnJvbSAnLi9UZXh0dXJlJztcbmltcG9ydCB7IFdlYkdMQ29udGV4dCB9IGZyb20gJy4vV2ViR0xDb250ZXh0JztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNoYWRlclByb2dyYW1PcHRzIHtcbiAgdmVydGV4U3JjOiBzdHJpbmc7XG4gIGZyYWdtZW50U3JjOiBzdHJpbmc7XG4gIGF0dHJpYnV0ZXM6IHN0cmluZ1tdO1xuICB1bmlmb3Jtczogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVuYm91bmRTaGFkZXIge1xuICBpc0JvdW5kKCk6IGJvb2xlYW47XG4gIGhhc0F0dHJpYnV0ZShuYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuICBnZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nKTogbnVtYmVyO1xuICBnZXRVbmlmb3JtKG5hbWU6IHN0cmluZyk6IFdlYkdMVW5pZm9ybUxvY2F0aW9uO1xuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kU2hhZGVyKSA9PiB2b2lkKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQm91bmRTaGFkZXIge1xuICBzZXRUZXh0dXJlVW5pZm9ybShcbiAgICBpbk5hbWU6IHN0cmluZyxcbiAgICBpblRleHR1cmU6IElVbmJvdW5kVGV4dHVyZSB8IElVbmJvdW5kQ3ViZU1hcCxcbiAgICBpbkluZGV4OiBudW1iZXJcbiAgKTogdm9pZDtcbiAgc2V0SW50ZWdlcjFVbmlmb3JtKGluTmFtZTogc3RyaW5nLCBpblZhbHVlOiBudW1iZXIpOiB2b2lkO1xuICBzZXRJbnRlZ2VyMlVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluVmFsdWVYOiBudW1iZXIsIGluVmFsdWVZOiBudW1iZXIpOiB2b2lkO1xuICBzZXRJbnRlZ2VyM1VuaWZvcm0oXG4gICAgaW5OYW1lOiBzdHJpbmcsXG4gICAgaW5WYWx1ZVg6IG51bWJlcixcbiAgICBpblZhbHVlWTogbnVtYmVyLFxuICAgIGluVmFsdWVaOiBudW1iZXJcbiAgKTogdm9pZDtcbiAgc2V0RmxvYXQxVW5pZm9ybShpbk5hbWU6IHN0cmluZywgaW5WYWx1ZTogbnVtYmVyKTogdm9pZDtcbiAgc2V0RmxvYXQyVW5pZm9ybShpbk5hbWU6IHN0cmluZywgaW5WYWx1ZVg6IG51bWJlciwgaW5WYWx1ZVk6IG51bWJlcik6IHZvaWQ7XG4gIHNldEZsb2F0M1VuaWZvcm0oXG4gICAgaW5OYW1lOiBzdHJpbmcsXG4gICAgaW5WYWx1ZVg6IG51bWJlcixcbiAgICBpblZhbHVlWTogbnVtYmVyLFxuICAgIGluVmFsdWVaOiBudW1iZXJcbiAgKTogdm9pZDtcbiAgc2V0TWF0cml4NFVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQ0KTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFNoYWRlclByb2dyYW0ge1xuICBwcml2YXRlIHN0YXRpYyBfaXNCb3VuZDogU2hhZGVyUHJvZ3JhbSB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcblxuICBwcml2YXRlIF9wcm9ncmFtOiBXZWJHTFByb2dyYW07XG5cbiAgcHJpdmF0ZSBfYXR0cmlidXRlcyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gIHByaXZhdGUgX3VuaWZvcm1zID0gbmV3IE1hcDxzdHJpbmcsIFdlYkdMVW5pZm9ybUxvY2F0aW9uPigpO1xuXG4gIGNvbnN0cnVjdG9yKGluTmFtZTogc3RyaW5nLCBvcHQ6IElTaGFkZXJQcm9ncmFtT3B0cykge1xuICAgIHRoaXMuX25hbWUgPSBpbk5hbWU7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLl9nZXRTaGFkZXIob3B0LnZlcnRleFNyYywgZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLl9nZXRTaGFkZXIob3B0LmZyYWdtZW50U3JjLCBnbC5GUkFHTUVOVF9TSEFERVIpO1xuXG4gICAgLy9cblxuICAgIGNvbnN0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgaWYgKCFwcm9ncmFtKSB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCBjcmVhdGUgYSBzaGFkZXIgcHJvZ3JhbScpO1xuXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICBnbC5kZWxldGVTaGFkZXIodmVydGV4U2hhZGVyKTsgLy8gZnJlZSB1cCBub3cgdW51c2VkIG1lbW9yeVxuICAgIGdsLmRlbGV0ZVNoYWRlcihmcmFnbWVudFNoYWRlcik7IC8vIGZyZWUgdXAgbm93IHVudXNlZCBtZW1vcnlcblxuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgIC8vIEFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGxpbmtpbmdcbiAgICAgIGNvbnN0IGxhc3RFcnJvciA9IGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pO1xuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdGYWlsZWQgdG8gaW5pdGlhbGl6ZWQgc2hhZGVycywgRXJyb3IgbGlua2luZzonICsgbGFzdEVycm9yXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2dyYW0gPSBwcm9ncmFtO1xuXG4gICAgLy8gdGhpcy5fZ2V0QXR0cmliQW5kTG9jYXRpb24ob3B0LmF0dHJpYnV0ZXMsIG9wdC51bmlmb3Jtcyk7XG5cbiAgICAvLyB0aGlzLnJhd0JpbmQoKTtcbiAgICB0aGlzLmJpbmQoKCkgPT4ge1xuICAgICAgdGhpcy5fZ2V0QXR0cmlidXRlcyhvcHQuYXR0cmlidXRlcyk7XG4gICAgICB0aGlzLl9nZXRVbmlmb3JtcyhvcHQudW5pZm9ybXMpO1xuICAgIH0pO1xuICAgIC8vIFNoYWRlclByb2dyYW0udW5iaW5kKCk7XG4gIH1cblxuICAvLyByYXdCaW5kKCkge1xuICAvLyAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAvLyAgIGdsLnVzZVByb2dyYW0odGhpcy5fcHJvZ3JhbSk7XG4gIC8vIH1cblxuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kU2hhZGVyKSA9PiB2b2lkKSB7XG4gICAgaWYgKFNoYWRlclByb2dyYW0uX2lzQm91bmQgIT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYERvdWJsZSBzaGFkZXIgYmluZGluZyAoYm91bmQ6ICR7U2hhZGVyUHJvZ3JhbS5faXNCb3VuZC5fbmFtZX0sIGJpbmRpbmc6ICR7dGhpcy5fbmFtZX0pYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBTaGFkZXJQcm9ncmFtLl9pc0JvdW5kID0gdGhpcztcbiAgICAvLyB0aGlzLnJhd0JpbmQoKTtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgZ2wudXNlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtKTtcblxuICAgIGluQ2FsbGJhY2sodGhpcyk7XG5cbiAgICBTaGFkZXJQcm9ncmFtLnVuYmluZCgpO1xuICB9XG5cbiAgc3RhdGljIHVuYmluZCgpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC51c2VQcm9ncmFtKG51bGwpO1xuICAgIFNoYWRlclByb2dyYW0uX2lzQm91bmQgPSBudWxsO1xuICB9XG5cbiAgaXNCb3VuZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gU2hhZGVyUHJvZ3JhbS5faXNCb3VuZCA9PT0gdGhpcztcbiAgfVxuXG4gIGhhc0F0dHJpYnV0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlcy5oYXMobmFtZSk7XG4gIH1cblxuICBnZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgYXR0cmlidXRlID0gdGhpcy5fYXR0cmlidXRlcy5nZXQobmFtZSk7XG4gICAgaWYgKGF0dHJpYnV0ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBhdHRyaWJ1dGUgbm90IGZvdW5kOiAke25hbWV9YCk7XG5cbiAgICByZXR1cm4gYXR0cmlidXRlO1xuICB9XG5cbiAgZ2V0VW5pZm9ybShuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCB1bmlmb3JtID0gdGhpcy5fdW5pZm9ybXMuZ2V0KG5hbWUpO1xuICAgIGlmICh1bmlmb3JtID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihgdW5pZm9ybSBub3QgZm91bmQ6ICR7bmFtZX1gKTtcblxuICAgIHJldHVybiB1bmlmb3JtO1xuICB9XG5cbiAgc2V0VGV4dHVyZVVuaWZvcm0oXG4gICAgaW5OYW1lOiBzdHJpbmcsXG4gICAgaW5UZXh0dXJlOiBJVW5ib3VuZFRleHR1cmUgfCBJVW5ib3VuZEN1YmVNYXAsXG4gICAgaW5JbmRleDogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyBpbkluZGV4KTtcbiAgICBnbC51bmlmb3JtMWkodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluSW5kZXgpO1xuICAgIGluVGV4dHVyZS5yYXdCaW5kKCk7XG4gIH1cblxuICBzZXRJbnRlZ2VyMVVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluVmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtMWkodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWUpO1xuICB9XG5cbiAgc2V0SW50ZWdlcjJVbmlmb3JtKGluTmFtZTogc3RyaW5nLCBpblZhbHVlWDogbnVtYmVyLCBpblZhbHVlWTogbnVtYmVyKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLnVuaWZvcm0yaSh0aGlzLmdldFVuaWZvcm0oaW5OYW1lKSwgaW5WYWx1ZVgsIGluVmFsdWVZKTtcbiAgfVxuXG4gIHNldEludGVnZXIzVW5pZm9ybShcbiAgICBpbk5hbWU6IHN0cmluZyxcbiAgICBpblZhbHVlWDogbnVtYmVyLFxuICAgIGluVmFsdWVZOiBudW1iZXIsXG4gICAgaW5WYWx1ZVo6IG51bWJlclxuICApIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgZ2wudW5pZm9ybTNpKHRoaXMuZ2V0VW5pZm9ybShpbk5hbWUpLCBpblZhbHVlWCwgaW5WYWx1ZVksIGluVmFsdWVaKTtcbiAgfVxuXG4gIHNldEZsb2F0MVVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluVmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtMWYodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWUpO1xuICB9XG5cbiAgc2V0RmxvYXQyVW5pZm9ybShpbk5hbWU6IHN0cmluZywgaW5WYWx1ZVg6IG51bWJlciwgaW5WYWx1ZVk6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtMmYodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWVYLCBpblZhbHVlWSk7XG4gIH1cblxuICBzZXRGbG9hdDNVbmlmb3JtKFxuICAgIGluTmFtZTogc3RyaW5nLFxuICAgIGluVmFsdWVYOiBudW1iZXIsXG4gICAgaW5WYWx1ZVk6IG51bWJlcixcbiAgICBpblZhbHVlWjogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtM2YodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWVYLCBpblZhbHVlWSwgaW5WYWx1ZVopO1xuICB9XG5cbiAgc2V0TWF0cml4NFVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQ0KSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGZhbHNlLCBpbk1hdHJpeCBhcyBnbG0ubWF0NCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGF0dHJpYnV0ZXMubGVuZ3RoOyArK2lpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuX3Byb2dyYW0sIGF0dHJpYnV0ZXNbaWldKTtcblxuICAgICAgaWYgKHZhbHVlIDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBhdHRyaWJ1dGUgbm90IGZvdW5kID0+ICR7YXR0cmlidXRlc1tpaV19YCk7XG5cbiAgICAgIHRoaXMuX2F0dHJpYnV0ZXMuc2V0KGF0dHJpYnV0ZXNbaWldLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VW5pZm9ybXModW5pZm9ybXM6IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IHVuaWZvcm1zLmxlbmd0aDsgKytpaSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5fcHJvZ3JhbSwgdW5pZm9ybXNbaWldKTtcblxuICAgICAgaWYgKHZhbHVlID09PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuaWZvcm0gbm90IGZvdW5kID0+ICR7dW5pZm9ybXNbaWldfWApO1xuXG4gICAgICB0aGlzLl91bmlmb3Jtcy5zZXQodW5pZm9ybXNbaWldLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy9cblxuICBwcml2YXRlIF9nZXRTaGFkZXIoc3JjOiBzdHJpbmcsIHR5cGU6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICBpZiAoIXNoYWRlcikgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgY3JlYXRlIGEgc2hhZGVyJyk7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzcmMpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICBsZXQgZXJyb3Jfc3RyID0gZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpO1xuICAgICAgaWYgKCFlcnJvcl9zdHIpIGVycm9yX3N0ciA9ICdmYWlsZWQgdG8gY29tcGlsZSBhIHNoYWRlcic7XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl9zdHIpO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cbn1cbiIsCiAgImltcG9ydCB7IFdlYkdMQ29udGV4dCB9IGZyb20gJy4vV2ViR0xDb250ZXh0JztcblxuZXhwb3J0IGludGVyZmFjZSBJVW5ib3VuZFRleHR1cmUge1xuICBpbml0aWFsaXplKCk6IHZvaWQ7XG4gIHJhd0JpbmQoKTogdm9pZDtcbiAgcHJlQmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZFRleHR1cmUpID0+IHZvaWQpOiB2b2lkO1xuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kVGV4dHVyZSkgPT4gdm9pZCk6IHZvaWQ7XG4gIGdldFdpZHRoKCk6IG51bWJlcjtcbiAgZ2V0SGVpZ2h0KCk6IG51bWJlcjtcbiAgZ2V0UmF3T2JqZWN0KCk6IFdlYkdMVGV4dHVyZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQm91bmRUZXh0dXJlIHtcbiAgbG9hZChpbkltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KTogdm9pZDtcbiAgbG9hZEZyb21NZW1vcnkoaW5XaWR0aDogbnVtYmVyLCBpbkhlaWdodDogbnVtYmVyLCBpblBpeGVsczogVWludDhBcnJheSk6IHZvaWQ7XG4gIGFsbG9jYXRlKGluV2lkdGg6IG51bWJlciwgaW5IZWlnaHQ6IG51bWJlcik6IHZvaWQ7XG4gIHJlc2l6ZShpbldpZHRoOiBudW1iZXIsIGluSGVpZ2h0OiBudW1iZXIpOiB2b2lkO1xuICBnZXRSYXdPYmplY3QoKTogV2ViR0xUZXh0dXJlO1xufVxuXG5leHBvcnQgY2xhc3MgVGV4dHVyZSBpbXBsZW1lbnRzIElVbmJvdW5kVGV4dHVyZSwgSUJvdW5kVGV4dHVyZSB7XG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3RleHR1cmU6IFdlYkdMVGV4dHVyZSB8IG51bGwgPSBudWxsO1xuXG4gIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3RleHR1cmUpIHRocm93IG5ldyBFcnJvcigndGV4dHVyZTogYWxyZWFkeSBpbml0aWFsaXplZCcpO1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIHRoaXMuX3RleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gIH1cblxuICByYXdCaW5kKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlOiBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fdGV4dHVyZSk7XG4gIH1cblxuICBwcmVCaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kVGV4dHVyZSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMucmF3QmluZCgpO1xuICAgIGluQ2FsbGJhY2sodGhpcyk7XG4gIH1cblxuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kVGV4dHVyZSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMucHJlQmluZChpbkNhbGxiYWNrKTtcbiAgICBUZXh0dXJlLnVuYmluZCgpO1xuICB9XG5cbiAgc3RhdGljIHVuYmluZCgpOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcbiAgfVxuXG4gIGxvYWQoaW5JbWFnZTogSFRNTEltYWdlRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlOiBub3QgaW5pdGlhbGl6ZWQnKTtcblxuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIHRoaXMuX3dpZHRoID0gaW5JbWFnZS53aWR0aDtcbiAgICB0aGlzLl9oZWlnaHQgPSBpbkltYWdlLmhlaWdodDtcblxuICAgIC8vIHdyYXBwaW5nIHRvIGNsYW1wIHRvIGVkZ2VcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcblxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG5cbiAgICBjb25zdCBsZXZlbCA9IDA7XG4gICAgY29uc3QgaW50ZXJuYWxGb3JtYXQgPSBnbC5SR0JBO1xuICAgIGNvbnN0IHNyY0Zvcm1hdCA9IGdsLlJHQkE7XG4gICAgY29uc3Qgc3JjVHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XG4gICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgIGdsLlRFWFRVUkVfMkQsXG4gICAgICBsZXZlbCxcbiAgICAgIGludGVybmFsRm9ybWF0LFxuICAgICAgc3JjRm9ybWF0LFxuICAgICAgc3JjVHlwZSxcbiAgICAgIGluSW1hZ2VcbiAgICApO1xuICB9XG5cbiAgbG9hZEZyb21NZW1vcnkoXG4gICAgaW5XaWR0aDogbnVtYmVyLFxuICAgIGluSGVpZ2h0OiBudW1iZXIsXG4gICAgaW5QaXhlbHM6IFVpbnQ4QXJyYXlcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fYWxsb2NhdGUoaW5XaWR0aCwgaW5IZWlnaHQsIGluUGl4ZWxzKTtcbiAgfVxuXG4gIGFsbG9jYXRlKGluV2lkdGg6IG51bWJlciwgaW5IZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FsbG9jYXRlKGluV2lkdGgsIGluSGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZShpbldpZHRoOiBudW1iZXIsIGluSGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hbGxvY2F0ZShpbldpZHRoLCBpbkhlaWdodCk7XG4gIH1cblxuICBwcml2YXRlIF9hbGxvY2F0ZShcbiAgICBpbldpZHRoOiBudW1iZXIsXG4gICAgaW5IZWlnaHQ6IG51bWJlcixcbiAgICBpblBpeGVsczogVWludDhBcnJheSB8IG51bGwgPSBudWxsXG4gICk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlOiBub3QgaW5pdGlhbGl6ZWQnKTtcblxuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIHRoaXMuX3dpZHRoID0gaW5XaWR0aDtcbiAgICB0aGlzLl9oZWlnaHQgPSBpbkhlaWdodDtcblxuICAgIC8vIHdyYXBwaW5nIHRvIGNsYW1wIHRvIGVkZ2VcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcblxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG5cbiAgICBjb25zdCBsZXZlbCA9IDA7XG4gICAgY29uc3QgaW50ZXJuYWxGb3JtYXQgPSBnbC5SR0JBO1xuICAgIGNvbnN0IGJvcmRlciA9IDA7XG4gICAgY29uc3Qgc3JjRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBzcmNUeXBlID0gZ2wuVU5TSUdORURfQllURTtcbiAgICBnbC50ZXhJbWFnZTJEKFxuICAgICAgZ2wuVEVYVFVSRV8yRCxcbiAgICAgIGxldmVsLFxuICAgICAgaW50ZXJuYWxGb3JtYXQsXG4gICAgICBpbldpZHRoLFxuICAgICAgaW5IZWlnaHQsXG4gICAgICBib3JkZXIsXG4gICAgICBzcmNGb3JtYXQsXG4gICAgICBzcmNUeXBlLFxuICAgICAgaW5QaXhlbHNcbiAgICApO1xuICB9XG5cbiAgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHRocm93IG5ldyBFcnJvcigndGV4dHVyZSBub3QgaW5pdGlhbGl6ZWQnKTtcblxuICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgfVxuXG4gIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgfVxuXG4gIGdldFJhd09iamVjdCgpIHtcbiAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHRocm93IG5ldyBFcnJvcigndGV4dHVyZSBub3QgaW5pdGlhbGl6ZWQnKTtcblxuICAgIC8vIFRPRE86IHRoaXMgaXMgdWdseVxuICAgIHJldHVybiB0aGlzLl90ZXh0dXJlO1xuICB9XG5cbiAgc3RhdGljIGdldEltYWdlRnJvbVVybCh1cmw6IHN0cmluZyk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1hZ2Uub25lcnJvciA9IHJlamVjdDtcbiAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgICB9O1xuICAgICAgaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH0pO1xuICB9XG59XG4iLAogICJleHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgcHJpdmF0ZSBfdGV4dEFyZWFFbGVtZW50OiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG4gIHByaXZhdGUgX2xpbmVzOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIF9tYXhMaW5lcyA9IDMwO1xuXG4gIGNvbnN0cnVjdG9yKHRleHRBcmVhRWxlbWVudElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90ZXh0QXJlYUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIHRleHRBcmVhRWxlbWVudElkXG4gICAgKSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG4gICAgaWYgKCF0aGlzLl90ZXh0QXJlYUVsZW1lbnQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERPTSBlbGVtZW50cyBub3QgZm91bmQsIGlkPSR7dGV4dEFyZWFFbGVtZW50SWR9YCk7XG5cbiAgICB0aGlzLl90ZXh0QXJlYUVsZW1lbnQudmFsdWUgPSAnJzsgLy8gPD0gY2xlYXIgYW55IGJyb3dzZXIgY2FjaGVcbiAgfVxuXG4gIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgY29uc3QgdGV4dCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpLmpvaW4oJyAnKTtcblxuICAgIGNvbnNvbGUubG9nKHRleHQpO1xuXG4gICAgdGhpcy5fcHVzaFRleHQodGV4dCk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgY29uc3QgdGV4dCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpLmpvaW4oJyAnKTtcblxuICAgIGNvbnNvbGUuZXJyb3IodGV4dCk7XG5cbiAgICB0aGlzLl9wdXNoVGV4dChgW0VSUl0gLSAke3RleHR9YCk7XG4gIH1cblxuICBfcHVzaFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgdGhpcy5fbGluZXMucHVzaCh0ZXh0KTtcbiAgICBpZiAodGhpcy5fbGluZXMubGVuZ3RoID4gdGhpcy5fbWF4TGluZXMpXG4gICAgICB0aGlzLl9saW5lcy5zcGxpY2UoMCwgdGhpcy5fbGluZXMubGVuZ3RoIC0gdGhpcy5fbWF4TGluZXMpO1xuXG4gICAgdGhpcy5fdGV4dEFyZWFFbGVtZW50LnZhbHVlID0gYCR7dGhpcy5fbGluZXMuam9pbignXFxuJyl9XFxuYDtcblxuICAgIC8vIGZvcmNlIGZvY3VzIG9uIGxhc3QgbGluZVxuICAgIHRoaXMuX3RleHRBcmVhRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLl90ZXh0QXJlYUVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICB9XG5cbiAgcGVla0xhc3QoKSB7XG4gICAgaWYgKHRoaXMuX2xpbmVzLmxlbmd0aCA+IDApIHJldHVybiB0aGlzLl9saW5lc1t0aGlzLl9saW5lcy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcG9wTGFzdCgpIHtcbiAgICBpZiAodGhpcy5fbGluZXMubGVuZ3RoID4gMCkgdGhpcy5fbGluZXMuc3BsaWNlKHRoaXMuX2xpbmVzLmxlbmd0aCAtIDEsIDEpO1xuICB9XG59XG4iLAogICJleHBvcnQgaW50ZXJmYWNlIElGcmFtZVByb2ZpbGVyIHtcbiAgZnJhbWVzRGVsdGE6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPjtcbiAgYXZlcmFnZURlbHRhOiBudW1iZXI7XG4gIG1pbkRlbHRhOiBudW1iZXI7XG4gIG1heERlbHRhOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBGcmFtZVByb2ZpbGVyIGltcGxlbWVudHMgSUZyYW1lUHJvZmlsZXIge1xuICBwcml2YXRlIF9mcmFtZXNEZWx0YTogbnVtYmVyW10gPSBbXTtcbiAgcHJpdmF0ZSBfYXZlcmFnZURlbHRhOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9taW5EZWx0YTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfbWF4RGVsdGE6IG51bWJlciA9IDA7XG5cbiAgcHVzaERlbHRhKGluRGVsdGE6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9mcmFtZXNEZWx0YS5sZW5ndGggPj0gMTAwKSB7XG4gICAgICB0aGlzLl9mcmFtZXNEZWx0YS5zaGlmdCgpO1xuICAgIH1cblxuICAgIHRoaXMuX2ZyYW1lc0RlbHRhLnB1c2goaW5EZWx0YSk7XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy9cblxuICAgIHRoaXMuX21pbkRlbHRhID0gKzk5OTk5OTk5OTtcbiAgICB0aGlzLl9tYXhEZWx0YSA9IC05OTk5OTk5OTk7XG4gICAgdGhpcy5fYXZlcmFnZURlbHRhID0gMDtcblxuICAgIGZvciAoY29uc3QgY3VyckRlbHRhIG9mIHRoaXMuX2ZyYW1lc0RlbHRhKSB7XG4gICAgICB0aGlzLl9taW5EZWx0YSA9IE1hdGgubWluKHRoaXMuX21pbkRlbHRhLCBjdXJyRGVsdGEpO1xuICAgICAgdGhpcy5fbWF4RGVsdGEgPSBNYXRoLm1heCh0aGlzLl9tYXhEZWx0YSwgY3VyckRlbHRhKTtcbiAgICAgIHRoaXMuX2F2ZXJhZ2VEZWx0YSArPSBjdXJyRGVsdGE7XG4gICAgfVxuICAgIHRoaXMuX2F2ZXJhZ2VEZWx0YSAvPSB0aGlzLl9mcmFtZXNEZWx0YS5sZW5ndGg7XG4gIH1cblxuICBnZXQgZnJhbWVzRGVsdGEoKTogUmVhZG9ubHlBcnJheTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fZnJhbWVzRGVsdGE7XG4gIH1cbiAgZ2V0IGF2ZXJhZ2VEZWx0YSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hdmVyYWdlRGVsdGE7XG4gIH1cbiAgZ2V0IG1pbkRlbHRhKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21pbkRlbHRhO1xuICB9XG4gIGdldCBtYXhEZWx0YSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tYXhEZWx0YTtcbiAgfVxufVxuIiwKICAiaW1wb3J0IHsgSUZyYW1lUHJvZmlsZXIgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlsaXRpZXMvRnJhbWVQcm9maWxlcic7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5pbXBvcnQgeyBncmFwaGljcyB9IGZyb20gJ0Bsb2NhbC1mcmFtZXdvcmsnO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyRnBzTWV0ZXIgPSAoXG4gIGluUG9zOiBnbG0uUmVhZG9ubHlWZWMzLFxuICBpblNpemU6IGdsbS5SZWFkb25seVZlYzIsXG4gIGluRnJhbWVQcm9maWxlcjogSUZyYW1lUHJvZmlsZXIsXG4gIGluU3RhY2tSZW5kZXJlcnM6IGdyYXBoaWNzLnJlbmRlcmVycy5JU3RhY2tSZW5kZXJlcnMsXG4gIGluVGV4dFJlbmRlcmVyOiBncmFwaGljcy5yZW5kZXJlcnMuSVRleHRSZW5kZXJlcixcbiAgaW5TaG93RnBzID0gZmFsc2VcbikgPT4ge1xuICAvLyBmcHMgbWV0ZXJcblxuICBjb25zdCBrX2RpdmlkZXIgPSA1O1xuICBjb25zdCBrX3ZlcnRpY2FsU2l6ZSA9XG4gICAgTWF0aC5jZWlsKGluRnJhbWVQcm9maWxlci5tYXhEZWx0YSAvIGtfZGl2aWRlcikgKiBrX2RpdmlkZXI7XG5cbiAge1xuICAgIC8vIGJvcmRlclxuXG4gICAgaW5TdGFja1JlbmRlcmVycy5wdXNoT3JpZ2luQm91bmRSZWN0YW5nbGUoaW5Qb3MsIGluU2l6ZSwgWzAsIDAsIDAsIDAuNV0pO1xuXG4gICAgY29uc3QgYWxsVmVydGljZXM6IFtcbiAgICAgIGdsbS5SZWFkb25seVZlYzMsXG4gICAgICBnbG0uUmVhZG9ubHlWZWMzLFxuICAgICAgZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICAgIGdsbS5SZWFkb25seVZlYzNcbiAgICBdID0gW1xuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMCwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAwLCAwXSxcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDEsIGluUG9zWzFdICsgaW5TaXplWzFdICogMCwgMF0sXG4gICAgICBbaW5Qb3NbMF0gKyBpblNpemVbMF0gKiAxLCBpblBvc1sxXSArIGluU2l6ZVsxXSAqIDEsIDBdLFxuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMCwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAxLCAwXVxuICAgIF07XG5cbiAgICBpblN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKGFsbFZlcnRpY2VzWzBdLCBhbGxWZXJ0aWNlc1sxXSwgWzEsIDEsIDFdKTtcbiAgICBpblN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKGFsbFZlcnRpY2VzWzFdLCBhbGxWZXJ0aWNlc1syXSwgWzEsIDEsIDFdKTtcbiAgICBpblN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKGFsbFZlcnRpY2VzWzJdLCBhbGxWZXJ0aWNlc1szXSwgWzEsIDEsIDFdKTtcbiAgICBpblN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKGFsbFZlcnRpY2VzWzNdLCBhbGxWZXJ0aWNlc1swXSwgWzEsIDEsIDFdKTtcbiAgfSAvLyBib3JkZXJcblxuICB7XG4gICAgLy8gZGl2aWRlcnNcblxuICAgIGZvciAoXG4gICAgICBsZXQgY3VyckRpdmlkZXIgPSBrX2RpdmlkZXI7XG4gICAgICBjdXJyRGl2aWRlciA8IGtfdmVydGljYWxTaXplO1xuICAgICAgY3VyckRpdmlkZXIgKz0ga19kaXZpZGVyXG4gICAgKSB7XG4gICAgICBjb25zdCByYXRpbyA9IGN1cnJEaXZpZGVyIC8ga192ZXJ0aWNhbFNpemU7XG5cbiAgICAgIGNvbnN0IHBvaW50QTogZ2xtLlJlYWRvbmx5VmVjMyA9IFtcbiAgICAgICAgaW5Qb3NbMF0gKyAwLFxuICAgICAgICBpblBvc1sxXSArIGluU2l6ZVsxXSAqIHJhdGlvLFxuICAgICAgICAwXG4gICAgICBdO1xuICAgICAgY29uc3QgcG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzID0gW1xuICAgICAgICBpblBvc1swXSArIGluU2l6ZVswXSxcbiAgICAgICAgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiByYXRpbyxcbiAgICAgICAgMFxuICAgICAgXTtcblxuICAgICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShwb2ludEEsIHBvaW50QiwgWzAuNSwgMC41LCAwLjVdKTtcbiAgICB9XG4gIH0gLy8gZGl2aWRlcnNcblxuICB7XG4gICAgLy8gY3VydmVcblxuICAgIGlmIChpbkZyYW1lUHJvZmlsZXIuZnJhbWVzRGVsdGEubGVuZ3RoID49IDIpIHtcbiAgICAgIGNvbnN0IHdpZHRoU3RlcCA9IGluU2l6ZVswXSAvIGluRnJhbWVQcm9maWxlci5mcmFtZXNEZWx0YS5sZW5ndGg7XG5cbiAgICAgIGxldCBwcmV2RGVsdGEgPSBpbkZyYW1lUHJvZmlsZXIuZnJhbWVzRGVsdGFbMF07XG4gICAgICBsZXQgcHJldkNvb3JkWCA9IDA7XG4gICAgICBsZXQgcHJldkNvb3JkWSA9IChpblNpemVbMV0gKiBwcmV2RGVsdGEpIC8ga192ZXJ0aWNhbFNpemU7XG5cbiAgICAgIGZvciAobGV0IGlpID0gMTsgaWkgPCBpbkZyYW1lUHJvZmlsZXIuZnJhbWVzRGVsdGEubGVuZ3RoOyArK2lpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJEZWx0YSA9IGluRnJhbWVQcm9maWxlci5mcmFtZXNEZWx0YVtpaV07XG4gICAgICAgIGNvbnN0IGN1cnJDb29yZFggPSBpaSAqIHdpZHRoU3RlcDtcbiAgICAgICAgY29uc3QgY3VyckNvb3JkWSA9IChpblNpemVbMV0gKiBjdXJyRGVsdGEpIC8ga192ZXJ0aWNhbFNpemU7XG5cbiAgICAgICAgY29uc3QgcG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzID0gW1xuICAgICAgICAgIGluUG9zWzBdICsgcHJldkNvb3JkWCxcbiAgICAgICAgICBpblBvc1sxXSArIHByZXZDb29yZFksXG4gICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBwb2ludEI6IGdsbS5SZWFkb25seVZlYzMgPSBbXG4gICAgICAgICAgaW5Qb3NbMF0gKyBjdXJyQ29vcmRYLFxuICAgICAgICAgIGluUG9zWzFdICsgY3VyckNvb3JkWSxcbiAgICAgICAgICAwXG4gICAgICAgIF07XG5cbiAgICAgICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShwb2ludEEsIHBvaW50QiwgWzEsIDEsIDFdKTtcblxuICAgICAgICBwcmV2RGVsdGEgPSBjdXJyRGVsdGE7XG4gICAgICAgIHByZXZDb29yZFggPSBjdXJyQ29vcmRYO1xuICAgICAgICBwcmV2Q29vcmRZID0gY3VyckNvb3JkWTtcbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gY3VydmVcblxuICB7XG4gICAgLy8gY291bnRlclxuXG4gICAgY29uc3Qga190ZXh0U2NhbGUgPSAxNDtcbiAgICBjb25zdCBrX3RleHRIU2NhbGUgPSBrX3RleHRTY2FsZSAqIDAuNTtcblxuICAgIGNvbnN0IGF2ZXJhZ2VWYWx1ZSA9IGluRnJhbWVQcm9maWxlci5hdmVyYWdlRGVsdGE7XG4gICAgY29uc3QgbWF4VmFsdWUgPSBpbkZyYW1lUHJvZmlsZXIubWF4RGVsdGE7XG4gICAgY29uc3QgbWluVmFsdWUgPSBpbkZyYW1lUHJvZmlsZXIubWluRGVsdGE7XG5cbiAgICBsZXQgYXZlcmFnZVN0ciA9IGB+JHthdmVyYWdlVmFsdWUudG9GaXhlZCgwKX1tc2A7XG4gICAgbGV0IG1heFN0ciA9IGA8JHttYXhWYWx1ZX1tc2A7XG4gICAgbGV0IG1pblN0ciA9IGA+JHttaW5WYWx1ZX1tc2A7XG5cbiAgICBpZiAoaW5TaG93RnBzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBfZ2V0RnBzU3RyID0gKGluVmFsOiBudW1iZXIpID0+XG4gICAgICAgIGluVmFsIDwgOTk5ID8gaW5WYWwudG9GaXhlZCgwKSA6ICc/Pz8nO1xuXG4gICAgICBhdmVyYWdlU3RyICs9IGBcXG5+JHtfZ2V0RnBzU3RyKDEwMDAgLyBhdmVyYWdlVmFsdWUpfWZwc2A7XG4gICAgICBtYXhTdHIgKz0gYFxcbjwke19nZXRGcHNTdHIoMTAwMCAvIG1heFZhbHVlKX1mcHNgO1xuICAgICAgbWluU3RyICs9IGBcXG4+JHtfZ2V0RnBzU3RyKDEwMDAgLyBtaW5WYWx1ZSl9ZnBzYDtcbiAgICB9XG5cbiAgICBpblRleHRSZW5kZXJlclxuICAgICAgLnNldFRleHRTY2FsZShrX3RleHRTY2FsZSlcbiAgICAgIC5zZXRUZXh0QWxpZ24oJ2xlZnQnLCAndG9wJylcbiAgICAgIC5zZXRUZXh0Q29sb3IoMS4wLCAxLjAsIDAuNzUpXG4gICAgICAucHVzaFRleHQoYXZlcmFnZVN0ciwgW2luUG9zWzBdICsgNywgaW5Qb3NbMV0gLSA4XSlcbiAgICAgIC5zZXRUZXh0QWxpZ24oJ2xlZnQnLCAnY2VudGVyZWQnKVxuICAgICAgLnNldFRleHRDb2xvcigxLjAsIDAuNzUsIDAuNzUpXG4gICAgICAucHVzaFRleHQobWF4U3RyLCBbXG4gICAgICAgIGluUG9zWzBdICsgaW5TaXplWzBdICsga190ZXh0SFNjYWxlLFxuICAgICAgICBpblBvc1sxXSArIGluU2l6ZVsxXSAtIGtfdGV4dEhTY2FsZSAqIDFcbiAgICAgIF0pXG4gICAgICAuc2V0VGV4dENvbG9yKDAuNzUsIDEuMCwgMC43NSlcbiAgICAgIC5wdXNoVGV4dChtaW5TdHIsIFtcbiAgICAgICAgaW5Qb3NbMF0gKyBpblNpemVbMF0gKyBrX3RleHRIU2NhbGUsXG4gICAgICAgIGluUG9zWzFdICsga190ZXh0SFNjYWxlICogMVxuICAgICAgXSlcbiAgICAgIC5zZXRUZXh0Q29sb3IoMS4wLCAxLjAsIDEuMCk7XG4gIH0gLy8gY291bnRlclxufTtcbiIsCiAgImltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5pbXBvcnQgeyBzeXN0ZW0sIGdyYXBoaWNzIH0gZnJvbSAnQGxvY2FsLWZyYW1ld29yayc7XG5cbmNvbnN0IHtcbiAgR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLFxuICBHbG9iYWxUb3VjaE1hbmFnZXIsXG4gIEdsb2JhbFBvaW50ZXJMb2NrTWFuYWdlcixcbn0gPSBzeXN0ZW0uYnJvd3NlcjtcblxuaW50ZXJmYWNlIEluZGljYXRvciB7XG4gIGNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMjtcbiAgc2l6ZTogZ2xtLlJlYWRvbmx5VmVjMjtcbiAgdGV4dD86IHN0cmluZztcbiAgbGluZXM/OiB7XG4gICAgYTogZ2xtLlJlYWRvbmx5VmVjMjtcbiAgICBiOiBnbG0uUmVhZG9ubHlWZWMyO1xuICAgIHRoaWNrbmVzczogbnVtYmVyO1xuICAgIGNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzO1xuICB9W107XG4gIGNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzO1xufVxuXG5jb25zdCBkZWZhdWx0Q29sb3I6IGdsbS5SZWFkb25seVZlYzMgPSBbMC4yLCAwLjIsIDAuMl07XG5jb25zdCBhY3RpdmF0ZWRDb2xvcjogZ2xtLlJlYWRvbmx5VmVjMyA9IFswLjIsIDAuNiwgMC4yXTtcblxuY29uc3QgX2FkZEtleVN0cm9rZXNXaWRnZXRzID0gKFxuICBpbkFsbEluZGljYXRvcjogSW5kaWNhdG9yW10sXG4gIGluUG9zOiBnbG0uUmVhZG9ubHlWZWMyXG4pID0+IHtcbiAgaW5BbGxJbmRpY2F0b3IucHVzaCh7XG4gICAgY2VudGVyOiBbaW5Qb3NbMF0sIGluUG9zWzFdXSxcbiAgICBzaXplOiBbNDAsIDQwXSxcbiAgICB0ZXh0OiAnQVxcblEnLFxuICAgIGNvbG9yOiBHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBJywgJ1EnKVxuICAgICAgPyBhY3RpdmF0ZWRDb2xvclxuICAgICAgOiBkZWZhdWx0Q29sb3JcbiAgfSk7XG5cbiAgaW5BbGxJbmRpY2F0b3IucHVzaCh7XG4gICAgY2VudGVyOiBbaW5Qb3NbMF0gKyA0NSAqIDEsIGluUG9zWzFdXSxcbiAgICBzaXplOiBbNDAsIDQwXSxcbiAgICB0ZXh0OiAnUycsXG4gICAgY29sb3I6IEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ1MnKSA/IGFjdGl2YXRlZENvbG9yIDogZGVmYXVsdENvbG9yXG4gIH0pO1xuXG4gIGluQWxsSW5kaWNhdG9yLnB1c2goe1xuICAgIGNlbnRlcjogW2luUG9zWzBdICsgNDUgKiAxLCBpblBvc1sxXSArIDQ1XSxcbiAgICBzaXplOiBbNDAsIDQwXSxcbiAgICB0ZXh0OiAnV1xcblonLFxuICAgIGNvbG9yOiBHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdXJywgJ1onKVxuICAgICAgPyBhY3RpdmF0ZWRDb2xvclxuICAgICAgOiBkZWZhdWx0Q29sb3JcbiAgfSk7XG5cbiAgaW5BbGxJbmRpY2F0b3IucHVzaCh7XG4gICAgY2VudGVyOiBbaW5Qb3NbMF0gKyA0NSAqIDIsIGluUG9zWzFdXSxcbiAgICBzaXplOiBbNDAsIDQwXSxcbiAgICB0ZXh0OiAnRCcsXG4gICAgY29sb3I6IEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0QnKSA/IGFjdGl2YXRlZENvbG9yIDogZGVmYXVsdENvbG9yXG4gIH0pO1xufTtcblxuY29uc3QgX2FkZEFycm93U3Ryb2tlc1dpZGdldHMgPSAoXG4gIGluQWxsSW5kaWNhdG9yOiBJbmRpY2F0b3JbXSxcbiAgaW5Qb3M6IGdsbS5SZWFkb25seVZlYzJcbikgPT4ge1xuICAvLyBhcnJvdyBsZWZ0XG4gIGluQWxsSW5kaWNhdG9yLnB1c2goe1xuICAgIGNlbnRlcjogW2luUG9zWzBdLCBpblBvc1sxXV0sXG4gICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgbGluZXM6IFtcbiAgICAgIHsgYTogWzE1LCAwXSwgYjogWy04LCAwXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFswLCAxMF0sIGI6IFstMTIsIC0yXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFswLCAtMTBdLCBiOiBbLTEyLCAyXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH1cbiAgICBdLFxuICAgIGNvbG9yOiBHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBcnJvd0xlZnQnKVxuICAgICAgPyBhY3RpdmF0ZWRDb2xvclxuICAgICAgOiBkZWZhdWx0Q29sb3JcbiAgfSk7XG5cbiAgLy8gYXJyb3cgZG93blxuICBpbkFsbEluZGljYXRvci5wdXNoKHtcbiAgICBjZW50ZXI6IFtpblBvc1swXSArIDQ1LCBpblBvc1sxXV0sXG4gICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgbGluZXM6IFtcbiAgICAgIHsgYTogWzAsIDE1XSwgYjogWzAsIC04XSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFsxMCwgMF0sIGI6IFstMiwgLTEyXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFstMTAsIDBdLCBiOiBbMiwgLTEyXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH1cbiAgICBdLFxuICAgIGNvbG9yOiBHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBcnJvd0Rvd24nKVxuICAgICAgPyBhY3RpdmF0ZWRDb2xvclxuICAgICAgOiBkZWZhdWx0Q29sb3JcbiAgfSk7XG5cbiAgLy8gYXJyb3cgdXBcbiAgaW5BbGxJbmRpY2F0b3IucHVzaCh7XG4gICAgY2VudGVyOiBbaW5Qb3NbMF0gKyA0NSwgaW5Qb3NbMV0gKyA0NV0sXG4gICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgbGluZXM6IFtcbiAgICAgIHsgYTogWzAsIC0xNV0sIGI6IFswLCA4XSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFsxMCwgMF0sIGI6IFstMiwgMTJdLCB0aGlja25lc3M6IDYsIGNvbG9yOiBbMSwgMSwgMV0gfSxcbiAgICAgIHsgYTogWy0xMCwgMF0sIGI6IFsyLCAxMl0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9XG4gICAgXSxcbiAgICBjb2xvcjogR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQXJyb3dVcCcpXG4gICAgICA/IGFjdGl2YXRlZENvbG9yXG4gICAgICA6IGRlZmF1bHRDb2xvclxuICB9KTtcblxuICAvLyBhcnJvdyByaWdodFxuICBpbkFsbEluZGljYXRvci5wdXNoKHtcbiAgICBjZW50ZXI6IFtpblBvc1swXSArIDQ1ICogMiwgaW5Qb3NbMV1dLFxuICAgIHNpemU6IFs0MCwgNDBdLFxuICAgIGxpbmVzOiBbXG4gICAgICB7IGE6IFstMTUsIDBdLCBiOiBbOCwgMF0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgeyBhOiBbMCwgMTBdLCBiOiBbMTIsIC0yXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFswLCAtMTBdLCBiOiBbMTIsIDJdLCB0aGlja25lc3M6IDYsIGNvbG9yOiBbMSwgMSwgMV0gfVxuICAgIF0sXG4gICAgY29sb3I6IEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0Fycm93UmlnaHQnKVxuICAgICAgPyBhY3RpdmF0ZWRDb2xvclxuICAgICAgOiBkZWZhdWx0Q29sb3JcbiAgfSk7XG59O1xuXG5jb25zdCBfYWRkS2V5c1RvdWNoZXNXaWRnZXRzID0gKFxuICBpbkFsbEluZGljYXRvcjogSW5kaWNhdG9yW10sXG4gIGluQ2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQsXG4gIGluUG9zOiBnbG0uUmVhZG9ubHlWZWMyXG4pID0+IHtcbiAgaWYgKEdsb2JhbFRvdWNoTWFuYWdlci5pc1N1cHBvcnRlZChpbkNhbnZhc0VsZW1lbnQpKSB7XG4gICAgaW5BbGxJbmRpY2F0b3IucHVzaCh7XG4gICAgICBjZW50ZXI6IFtpblBvc1swXSArIDExNSwgaW5Qb3NbMV1dLFxuICAgICAgc2l6ZTogWzIzMCwgNjBdLFxuICAgICAgdGV4dDogJ1RvdWNoIEV2ZW50c1xcblN1cHBvcnRlZFxcbihkb3VibGUgdGFwKScsXG4gICAgICBjb2xvcjogWzAsIDAuNSwgMF1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBpbkFsbEluZGljYXRvci5wdXNoKHtcbiAgICAgIGNlbnRlcjogW2luUG9zWzBdICsgMTE1LCBpblBvc1sxXV0sXG4gICAgICBzaXplOiBbMjMwLCA2MF0sXG4gICAgICB0ZXh0OiAnVG91Y2ggRXZlbnRzXFxuTm90IFN1cHBvcnRlZCcsXG4gICAgICBjb2xvcjogWzAuNSwgMCwgMF1cbiAgICB9KTtcbiAgfVxuXG4gIGlmIChHbG9iYWxQb2ludGVyTG9ja01hbmFnZXIuY2FuQmVQb2ludGVyTG9ja2VkKGluQ2FudmFzRWxlbWVudCkpIHtcbiAgICBpbkFsbEluZGljYXRvci5wdXNoKHtcbiAgICAgIGNlbnRlcjogW2luUG9zWzBdICsgMTA1LCBpblBvc1sxXSArIDcwXSxcbiAgICAgIHNpemU6IFsyMTAsIDYwXSxcbiAgICAgIHRleHQ6ICdNb3VzZVxcblN1cHBvcnRlZCcsXG4gICAgICBjb2xvcjogWzAsIDAuNSwgMF1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBpbkFsbEluZGljYXRvci5wdXNoKHtcbiAgICAgIGNlbnRlcjogW2luUG9zWzBdICsgMTA1LCBpblBvc1sxXSArIDcwXSxcbiAgICAgIHNpemU6IFsyMTAsIDYwXSxcbiAgICAgIHRleHQ6ICdNb3VzZSBFdmVudHNcXG5Ob3QgU3VwcG9ydGVkJyxcbiAgICAgIGNvbG9yOiBbMC41LCAwLCAwXVxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyQ29udHJvbHMgPSAoXG4gIGluQ2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQsXG4gIHN0YWNrUmVuZGVyZXJzOiBncmFwaGljcy5yZW5kZXJlcnMuSVN0YWNrUmVuZGVyZXJzLFxuICB0ZXh0UmVuZGVyZXI6IGdyYXBoaWNzLnJlbmRlcmVycy5JVGV4dFJlbmRlcmVyXG4pID0+IHtcbiAgY29uc3QgYWxsSW5kaWNhdG9yOiBJbmRpY2F0b3JbXSA9IFtdO1xuXG4gIGNvbnN0IGtleUV2ZW50c1BvczogZ2xtLlJlYWRvbmx5VmVjMiA9IFs3ICsgMjAsIDE2NV07XG4gIGNvbnN0IHRvdWNoRXZlbnRzUG9zOiBnbG0uUmVhZG9ubHlWZWMyID0gWzcgKyAyMCwgMjYwXTtcbiAgY29uc3QgYm9hcmRQb3M6IGdsbS5SZWFkb25seVZlYzIgPSBbNywgMzVdO1xuXG4gIF9hZGRLZXlTdHJva2VzV2lkZ2V0cyhhbGxJbmRpY2F0b3IsIGtleUV2ZW50c1Bvcyk7XG4gIF9hZGRBcnJvd1N0cm9rZXNXaWRnZXRzKGFsbEluZGljYXRvciwgdG91Y2hFdmVudHNQb3MpO1xuICBfYWRkS2V5c1RvdWNoZXNXaWRnZXRzKGFsbEluZGljYXRvciwgaW5DYW52YXNFbGVtZW50LCBib2FyZFBvcyk7XG5cbiAgYWxsSW5kaWNhdG9yLmZvckVhY2goKGN1cnJJbmRpY2F0b3IpID0+IHtcbiAgICBjb25zdCB7IGNlbnRlciB9ID0gY3VyckluZGljYXRvcjtcblxuICAgIHN0YWNrUmVuZGVyZXJzLnB1c2hDZW50ZXJlZFJlY3RhbmdsZShcbiAgICAgIGdsbS52ZWMzLmZyb21WYWx1ZXMoY2VudGVyWzBdLCBjZW50ZXJbMV0sIC0wLjMpLFxuICAgICAgY3VyckluZGljYXRvci5zaXplLFxuICAgICAgWzAsIDAsIDBdXG4gICAgKTtcblxuICAgIHN0YWNrUmVuZGVyZXJzLnB1c2hDZW50ZXJlZFJlY3RhbmdsZShcbiAgICAgIGdsbS52ZWMzLmZyb21WYWx1ZXMoY2VudGVyWzBdLCBjZW50ZXJbMV0sIC0wLjIpLFxuICAgICAgW2N1cnJJbmRpY2F0b3Iuc2l6ZVswXSAtIDIsIGN1cnJJbmRpY2F0b3Iuc2l6ZVsxXSAtIDJdLFxuICAgICAgY3VyckluZGljYXRvci5jb2xvclxuICAgICk7XG5cbiAgICBpZiAoY3VyckluZGljYXRvci50ZXh0KSB7XG4gICAgICB0ZXh0UmVuZGVyZXJcbiAgICAgICAgLnNldFRleHRTY2FsZSgxNilcbiAgICAgICAgLnNldFRleHRBbGlnbignY2VudGVyZWQnLCAnY2VudGVyZWQnKVxuICAgICAgICAucHVzaFRleHQoY3VyckluZGljYXRvci50ZXh0LCBjZW50ZXIpXG4gICAgICAgIC5zZXRUZXh0QWxpZ24oJ2xlZnQnLCAndG9wJyk7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJJbmRpY2F0b3IubGluZXMpIHtcbiAgICAgIGN1cnJJbmRpY2F0b3IubGluZXMuZm9yRWFjaCgoY3VyckxpbmUpID0+IHtcbiAgICAgICAgc3RhY2tSZW5kZXJlcnMucHVzaFRoaWNrTGluZShcbiAgICAgICAgICBbY2VudGVyWzBdICsgY3VyckxpbmUuYVswXSwgY2VudGVyWzFdICsgY3VyckxpbmUuYVsxXSwgMF0sXG4gICAgICAgICAgW2NlbnRlclswXSArIGN1cnJMaW5lLmJbMF0sIGNlbnRlclsxXSArIGN1cnJMaW5lLmJbMV0sIDBdLFxuICAgICAgICAgIGN1cnJMaW5lLnRoaWNrbmVzcyxcbiAgICAgICAgICBjdXJyTGluZS5jb2xvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG4iLAogICJleHBvcnQgZGVmYXVsdCBgXG4jdmVyc2lvbiAzMDAgZXNcblxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuXG5pbiB2ZWMyIGFfdmVydGV4UG9zaXRpb247XG5pbiB2ZWMzIGFfcGxvdFBvc2l0aW9uO1xuXG5vdXQgdmVjMyB2X3Bvc2l0aW9uO1xuXG52b2lkIG1haW4odm9pZClcbntcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KGFfdmVydGV4UG9zaXRpb24sIDEuMCwgMS4wKTtcblxuICB2X3Bvc2l0aW9uID0gYV9wbG90UG9zaXRpb247XG59XG5gLnRyaW0oKTsiLAogICJleHBvcnQgZGVmYXVsdCBgXG4jdmVyc2lvbiAzMDAgZXNcblxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuXG4vL1xuLy9cbi8vXG5cblxuLy8gSW5kaWNlcyBvZiByZWZyYWN0aW9uXG5jb25zdCBmbG9hdCBBaXIgPSAxLjA7XG5jb25zdCBmbG9hdCBHbGFzcyA9IDEuNTE3MTQ7XG5cbi8vIEFpciB0byBnbGFzcyByYXRpbyBvZiB0aGUgaW5kaWNlcyBvZiByZWZyYWN0aW9uIChFdGEpXG5jb25zdCBmbG9hdCBFdGEgPSBBaXIgLyBHbGFzcztcblxuLy8gc2VlIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUmVmcmFjdGl2ZV9pbmRleCBSZWZsZWN0aXZpdHlcbmNvbnN0IGZsb2F0IFIwID0gKChBaXIgLSBHbGFzcykgKiAoQWlyIC0gR2xhc3MpKSAvICgoQWlyICsgR2xhc3MpICogKEFpciArIEdsYXNzKSk7XG5cblxuLy9cbi8vXG4vL1xuXG51bmlmb3JtIHZlYzMgICAgICAgIHVfY2FtZXJhRXllO1xuXG4vL1xuXG51bmlmb3JtIHNhbXBsZXIyRCAgIHVfc2NlbmVUZXh0dXJlRGF0YTtcbnVuaWZvcm0gaW50ICAgICAgICAgdV9zY2VuZVRleHR1cmVTaXplO1xuXG51bmlmb3JtIGludCAgICAgICB1X3NwaGVyZXNTdGFydDtcbnVuaWZvcm0gaW50ICAgICAgIHVfc3BoZXJlc1N0b3A7XG5cbnVuaWZvcm0gaW50ICAgICAgIHVfYm94ZXNTdGFydDtcbnVuaWZvcm0gaW50ICAgICAgIHVfYm94ZXNTdG9wO1xuXG51bmlmb3JtIGludCAgICAgICB1X3RyaWFuZ2xlc1N0YXJ0O1xudW5pZm9ybSBpbnQgICAgICAgdV90cmlhbmdsZXNTdG9wO1xuXG4vL1xuXG51bmlmb3JtIHNhbXBsZXIyRCAgIHVfbGlnaHRzVGV4dHVyZURhdGE7XG5cbnVuaWZvcm0gaW50ICAgICAgIHVfc3VuTGlnaHRzU3RhcnQ7XG51bmlmb3JtIGludCAgICAgICB1X3N1bkxpZ2h0c1N0b3A7XG5cbnVuaWZvcm0gaW50ICAgICAgIHVfc3BvdExpZ2h0c1N0YXJ0O1xudW5pZm9ybSBpbnQgICAgICAgdV9zcG90TGlnaHRzU3RvcDtcblxuLy9cbi8vXG4vL1xuXG5pbiB2ZWMzICB2X3Bvc2l0aW9uO1xuXG5vdXQgdmVjNCBvX2NvbG9yO1xuXG4vL1xuXG5jb25zdCBmbG9hdCAgICAgZ19hbWJpYW50TGlnaHQgPSAwLjA1O1xuXG5jb25zdCBpbnQgICAgICAgZ19yZWZsZWN0aW9uTWF4ID0gMjtcbmNvbnN0IGJvb2wgICAgICBnX3NoYWRvd3NFbmFibGVkID0gdHJ1ZTtcblxuY29uc3QgdmVjMyAgICAgIGdfYmFja2dyb3VuZENvbG9yID0gdmVjMygwLjEpO1xuXG4vL1xuXG5zdHJ1Y3QgUmF5VmFsdWVzXG57XG4gIHZlYzMgb3JpZ2luO1xuICB2ZWMzIGRpcmVjdGlvbjtcbn07XG5cbnN0cnVjdCBSYXlSZXN1bHRcbntcbiAgYm9vbCBoYXNIaXQ7XG4gIGZsb2F0IGRlcHRoO1xuICB2ZWMzIHBvc2l0aW9uO1xuICB2ZWMzIG5vcm1hbDtcbiAgdmVjNCBjb2xvcjtcbiAgZmxvYXQgcmVmbGVjdGlvbjtcbiAgYm9vbCBsaWdodEVuYWJsZWQ7XG59O1xuXG4vL1xuLy9cbi8vXG4vL1xuLy9cblxuZmxvYXQgZ2V0U2NlbmVEYXRhQnlJbmRleChpbnQgaW5kZXgpXG57XG4gIHJldHVybiB0ZXhlbEZldGNoKHVfc2NlbmVUZXh0dXJlRGF0YSwgaXZlYzIoaW5kZXgsIDApLCAwKS54O1xufVxuXG52ZWMzIGdldFNjZW5lVmVjM0J5SW5kZXgoaW50IGluZGV4KVxue1xuICByZXR1cm4gdmVjMyhcbiAgICB0ZXhlbEZldGNoKHVfc2NlbmVUZXh0dXJlRGF0YSwgaXZlYzIoaW5kZXggKyAwLCAwKSwgMCkueCxcbiAgICB0ZXhlbEZldGNoKHVfc2NlbmVUZXh0dXJlRGF0YSwgaXZlYzIoaW5kZXggKyAxLCAwKSwgMCkueCxcbiAgICB0ZXhlbEZldGNoKHVfc2NlbmVUZXh0dXJlRGF0YSwgaXZlYzIoaW5kZXggKyAyLCAwKSwgMCkueFxuICApO1xufVxuXG5mbG9hdCBnZXRMaWdodHNEYXRhQnlJbmRleChpbnQgaW5kZXgpXG57XG4gIHJldHVybiB0ZXhlbEZldGNoKHVfbGlnaHRzVGV4dHVyZURhdGEsIGl2ZWMyKGluZGV4LCAwKSwgMCkueDtcbn1cblxudmVjMyBnZXRMaWdodHNWZWMzQnlJbmRleChpbnQgaW5kZXgpXG57XG4gIHJldHVybiB2ZWMzKFxuICAgIHRleGVsRmV0Y2godV9saWdodHNUZXh0dXJlRGF0YSwgaXZlYzIoaW5kZXggKyAwLCAwKSwgMCkueCxcbiAgICB0ZXhlbEZldGNoKHVfbGlnaHRzVGV4dHVyZURhdGEsIGl2ZWMyKGluZGV4ICsgMSwgMCksIDApLngsXG4gICAgdGV4ZWxGZXRjaCh1X2xpZ2h0c1RleHR1cmVEYXRhLCBpdmVjMihpbmRleCArIDIsIDApLCAwKS54XG4gICk7XG59XG5cbi8vXG4vL1xuLy9cbi8vXG4vL1xuXG5ib29sIGludGVyc2VjdFNwaGVyZShSYXlWYWx1ZXMgcmF5LCBmbG9hdCByYWRpdXMsIG91dCBmbG9hdCBkaXN0YW5jZSwgb3V0IHZlYzMgbm9ybWFsKVxue1xuICBmbG9hdCBuZWFyVmFsdWUgPSAwLjAwMTsgLy8gVE9ETzogaGFyZGNvZGVkXG4gIGZsb2F0IGZhclZhbHVlID0gMTAwLjA7IC8vIFRPRE86IGhhcmRjb2RlZFxuXG4gIGZsb2F0IGIgPSBkb3QocmF5Lm9yaWdpbiwgcmF5LmRpcmVjdGlvbik7XG4gIGZsb2F0IGMgPSBkb3QocmF5Lm9yaWdpbiwgcmF5Lm9yaWdpbikgLSByYWRpdXMgKiByYWRpdXM7XG4gIGZsb2F0IGggPSBiICogYiAtIGM7XG4gIGlmIChoIDwgMC4wKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaCA9IHNxcnQoaCk7XG5cbiAgZmxvYXQgZDEgPSAtYiAtIGg7XG4gIGlmIChkMSA+PSBuZWFyVmFsdWUgJiYgZDEgPD0gZmFyVmFsdWUpXG4gIHtcbiAgICBub3JtYWwgPSBub3JtYWxpemUocmF5Lm9yaWdpbiArIHJheS5kaXJlY3Rpb24gKiBkMSk7XG4gICAgZGlzdGFuY2UgPSBkMTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZsb2F0IGQyID0gLWIgKyBoO1xuICBpZiAoZDIgPj0gbmVhclZhbHVlICYmIGQyIDw9IGZhclZhbHVlKVxuICB7XG4gICAgbm9ybWFsID0gbm9ybWFsaXplKHJheS5vcmlnaW4gKyByYXkuZGlyZWN0aW9uICogZDIpO1xuICAgIGRpc3RhbmNlID0gZDI7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmJvb2wgaW50ZXJzZWN0Qm94KFJheVZhbHVlcyByYXksIHZlYzMgYm94U2l6ZSwgb3V0IGZsb2F0IGRpc3RhbmNlLCBvdXQgdmVjMyBub3JtYWwpXG57XG4gIGZsb2F0IG5lYXJWYWx1ZSA9IDAuMDAxOyAvLyBUT0RPOiBoYXJkY29kZWRcbiAgZmxvYXQgZmFyVmFsdWUgPSAxMDAuMDsgLy8gVE9ETzogaGFyZGNvZGVkXG5cbiAgLy9cbiAgLy9cbiAgLy8gc2FkIGhhY2s6IGZpeCBhIHNoYWRvdyByZWxhdGVkIGJ1Z1xuXG4gIGlmIChyYXkuZGlyZWN0aW9uLnggPT0gMC4wKSByYXkuZGlyZWN0aW9uLnggPSAtMWUtODtcbiAgaWYgKHJheS5kaXJlY3Rpb24ueSA9PSAwLjApIHJheS5kaXJlY3Rpb24ueSA9IC0xZS04O1xuICBpZiAocmF5LmRpcmVjdGlvbi56ID09IDAuMCkgcmF5LmRpcmVjdGlvbi56ID0gLTFlLTg7XG5cbiAgLy8gc2FkIGhhY2s6IGZpeCBhIHNoYWRvdyByZWxhdGVkIGJ1Z1xuICAvL1xuICAvL1xuXG4gIHZlYzMgbSA9IHNpZ24ocmF5LmRpcmVjdGlvbikgLyBtYXgoYWJzKHJheS5kaXJlY3Rpb24pLCAxZS04KTtcbiAgdmVjMyBuID0gbSAqIHJheS5vcmlnaW47XG4gIHZlYzMgayA9IGFicyhtKSAqIGJveFNpemU7XG5cbiAgdmVjMyB0MSA9IC1uIC0gaztcbiAgdmVjMyB0MiA9IC1uICsgaztcblxuICBmbG9hdCB0TiA9IG1heChtYXgodDEueCwgdDEueSksIHQxLnopO1xuICBmbG9hdCB0RiA9IG1pbihtaW4odDIueCwgdDIueSksIHQyLnopO1xuXG4gIGlmICh0TiA+IHRGIHx8IHRGIDw9IDAuMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0TiA+PSBuZWFyVmFsdWUgJiYgdE4gPD0gZmFyVmFsdWUpXG4gIHtcbiAgICBub3JtYWwgPSBub3JtYWxpemUoLXNpZ24ocmF5LmRpcmVjdGlvbikgKiBzdGVwKHQxLnl6eCwgdDEueHl6KSAqIHN0ZXAodDEuenh5LCB0MS54eXopKTtcbiAgICBkaXN0YW5jZSA9IHROO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHRGID49IG5lYXJWYWx1ZSAmJiB0RiA8PSBmYXJWYWx1ZSlcbiAge1xuICAgIG5vcm1hbCA9IG5vcm1hbGl6ZSgtc2lnbihyYXkuZGlyZWN0aW9uKSAqIHN0ZXAodDEueXp4LCB0MS54eXopICogc3RlcCh0MS56eHksIHQxLnh5eikpO1xuICAgIGRpc3RhbmNlID0gdEY7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmJvb2wgaW50ZXJzZWN0VHJpYW5nbGUoUmF5VmFsdWVzIHJheSwgdmVjMyB2MCwgdmVjMyB2MSwgdmVjMyB2Miwgb3V0IGZsb2F0IGRpc3RhbmNlLCBvdXQgdmVjMyBub3JtYWwpXG57XG4gIGZsb2F0IG5lYXJWYWx1ZSA9IDAuMDAxOyAvLyBUT0RPOiBoYXJkY29kZWRcbiAgZmxvYXQgZmFyVmFsdWUgPSAxMDAuMDsgLy8gVE9ETzogaGFyZGNvZGVkXG5cbiAgdmVjMyB2MXYwID0gdjEgLSB2MDtcbiAgdmVjMyB2MnYwID0gdjIgLSB2MDtcbiAgdmVjMyByb3YwID0gcmF5Lm9yaWdpbiAtIHYwO1xuXG4gIHZlYzMgbiA9IGNyb3NzKHYxdjAsIHYydjApO1xuICB2ZWMzIHEgPSBjcm9zcyhyb3YwLCByYXkuZGlyZWN0aW9uKTtcbiAgZmxvYXQgZCA9IDEuMCAvIGRvdChyYXkuZGlyZWN0aW9uLCBuKTtcbiAgZmxvYXQgdSA9IGQgKiBkb3QoLXEsIHYydjApO1xuICBmbG9hdCB2ID0gZCAqIGRvdChxLCB2MXYwKTtcbiAgZmxvYXQgdCA9IGQgKiBkb3QoLW4sIHJvdjApO1xuXG4gIGlmICh1IDwgMC4wIHx8IHYgPCAwLjAgfHwgKHUgKyB2KSA+IDEuMCB8fCB0IDwgbmVhclZhbHVlIHx8IHQgPiBmYXJWYWx1ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG5vcm1hbCA9IG5vcm1hbGl6ZSgtbik7XG4gIGRpc3RhbmNlID0gdDtcbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIGZsb2F0IGludGVyc2VjdFBsYW5lKFJheVZhbHVlcyByYXksIHZlYzMgbm9ybWFsLCBmbG9hdCBvZmZzZXQpXG4vLyB7XG4vLyAgICAgcmV0dXJuIC0oZG90KHJheS5vcmlnaW4sIG5vcm1hbCkgKyBvZmZzZXQpIC8gZG90KHJheS5kaXJlY3Rpb24sIG5vcm1hbCk7XG4vLyB9XG5cbi8vIGZsb2F0IGludGVyc2VjdFBsYW5lMihSYXlWYWx1ZXMgcmF5LCB2ZWMzIG5vcm1hbCwgZmxvYXQgb2Zmc2V0KVxuLy8ge1xuLy8gICAgIGZsb2F0IG5lYXJWYWx1ZSA9IDAuMDAxOyAvLyBUT0RPOiBoYXJkY29kZWRcbi8vICAgICBmbG9hdCBmYXJWYWx1ZSA9IDEwMDAuMDsgLy8gVE9ETzogaGFyZGNvZGVkXG5cbi8vICAgICBmbG9hdCBhID0gZG90KHJheS5kaXJlY3Rpb24sIG5vcm1hbCk7XG4vLyAgICAgZmxvYXQgZCA9IC0oZG90KHJheS5vcmlnaW4sIG5vcm1hbCkgKyBvZmZzZXQpIC8gYTtcblxuLy8gICAgIGlmIChhID4gMC4wIHx8IGQgPCBuZWFyVmFsdWUgfHwgZCA+IGZhclZhbHVlKVxuLy8gICAgICAgICByZXR1cm4gLTEuMDtcblxuLy8gICAgIHJldHVybiBkO1xuLy8gfVxuXG4vLyBmbG9hdCBkaXNrSW50ZXJzZWN0KFJheVZhbHVlcyByYXksIHZlYzMgY2VudGVyLCB2ZWMzIG5vcm1hbCwgZmxvYXQgcmFkaXVzKVxuLy8ge1xuLy8gICAgIHZlYzMgIG8gPSByYXkub3JpZ2luIC0gY2VudGVyO1xuLy8gICAgIGZsb2F0IHQgPSAtZG90KG5vcm1hbCwgbykgLyBkb3QocmF5LmRpcmVjdGlvbiwgbm9ybWFsKTtcbi8vICAgICB2ZWMzICBxID0gbyArIHJheS5kaXJlY3Rpb24gKiB0O1xuLy8gICAgIHJldHVybiAoZG90KHEsIHEpIDwgcmFkaXVzICogcmFkaXVzKSA/IHQgOiAtMS4wO1xuLy8gfVxuXG4vL1xuLy9cbi8vXG4vL1xuLy9cblxuYm9vbCBpbnRlcnNlY3RTY2VuZShSYXlWYWx1ZXMgcmF5LCBvdXQgUmF5UmVzdWx0IHJlc3VsdCwgYm9vbCBzaGFkb3dNb2RlKVxue1xuICBmbG9hdCBiZXN0RGlzdGFuY2UgPSAtMS4wO1xuXG4gIHJlc3VsdC5oYXNIaXQgPSBmYWxzZTtcblxuICBpZiAodV9zY2VuZVRleHR1cmVTaXplIDw9IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBSYXlWYWx1ZXMgdG1wUmF5O1xuICB2ZWMzIG5vcm1hbDtcblxuICBmb3IgKGludCBpbmRleCA9IHVfc3BoZXJlc1N0YXJ0OyBpbmRleCA8IHVfc3BoZXJlc1N0b3A7IGluZGV4ICs9IDExKVxuICB7XG4gICAgYm9vbCBzaGFkb3dFbmFibGVkID0gKGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyA4KSAhPSAwLjApO1xuXG4gICAgaWYgKHNoYWRvd01vZGUgJiYgIXNoYWRvd0VuYWJsZWQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHRtcFJheS5vcmlnaW4gPSByYXkub3JpZ2luO1xuICAgIHRtcFJheS5kaXJlY3Rpb24gPSByYXkuZGlyZWN0aW9uO1xuXG4gICAgdmVjMyBjZW50ZXIgPSBnZXRTY2VuZVZlYzNCeUluZGV4KGluZGV4ICsgMCk7XG5cbiAgICB0bXBSYXkub3JpZ2luIC09IGNlbnRlcjtcblxuICAgIGZsb2F0IHJhZGl1cyA9IGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyAzKTtcblxuICAgIGZsb2F0IGN1cnJEaXN0YW5jZSA9IDAuMDtcbiAgICBpZiAoXG4gICAgICAhaW50ZXJzZWN0U3BoZXJlKHRtcFJheSwgcmFkaXVzLCBjdXJyRGlzdGFuY2UsIG5vcm1hbCkgfHxcbiAgICAgIChiZXN0RGlzdGFuY2UgPiAwLjAgJiYgY3VyckRpc3RhbmNlID4gYmVzdERpc3RhbmNlKVxuICAgICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgYmVzdERpc3RhbmNlID0gY3VyckRpc3RhbmNlO1xuXG4gICAgcmVzdWx0Lmhhc0hpdCA9IHRydWU7XG4gICAgcmVzdWx0LmRlcHRoID0gYmVzdERpc3RhbmNlO1xuICAgIHJlc3VsdC5wb3NpdGlvbiA9IHJheS5vcmlnaW4gKyBiZXN0RGlzdGFuY2UgKiByYXkuZGlyZWN0aW9uO1xuICAgIHJlc3VsdC5ub3JtYWwgPSBub3JtYWw7XG5cbiAgICBib29sIGNoZXNzYm9hcmRNYXRlcmlhbCA9IChnZXRTY2VuZURhdGFCeUluZGV4KGluZGV4ICsgMTApICE9IDAuMCk7XG5cbiAgICBpZiAoY2hlc3Nib2FyZE1hdGVyaWFsKVxuICAgIHtcbiAgICAgIC8vIHZlYzMgdHhQb3MgPSAodHh4ICogdmVjNChyZXN1bHQucG9zaXRpb24gLSBjZW50ZXIsIDEuMCkpLnh5ejtcbiAgICAgIHZlYzMgdHhQb3MgPSAodmVjNChyZXN1bHQucG9zaXRpb24gLSBjZW50ZXIsIDEuMCkpLnh5ejtcbiAgICAgIC8vIGNoZXNzYm9hcmQgY29sb3IgZWZmZWN0XG4gICAgICBpZiAoZnJhY3QodHhQb3MueCAqIDAuMikgPiAwLjUgPT0gZnJhY3QodHhQb3MueiAqIDAuMikgPiAwLjUgPT0gZnJhY3QodHhQb3MueSAqIDAuMikgPiAwLjUpXG4gICAgICB7XG4gICAgICAgIHJlc3VsdC5jb2xvciA9IHZlYzQoMS4wKTtcbiAgICAgICAgcmVzdWx0LnJlZmxlY3Rpb24gPSAwLjM7XG4gICAgICB9XG4gICAgICBlbHNlXG4gICAgICB7XG4gICAgICAgIHJlc3VsdC5jb2xvciA9IHZlYzQoMC4wLCAwLjQsIDAuNDUsIDEuMCk7XG4gICAgICAgIHJlc3VsdC5yZWZsZWN0aW9uID0gMC4wO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgdmVjMyBjb2xvciA9IGdldFNjZW5lVmVjM0J5SW5kZXgoaW5kZXggKyA0KTtcblxuICAgICAgZmxvYXQgcmVmbGVjdGlvbiA9IGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyA3KTtcblxuICAgICAgcmVzdWx0LmNvbG9yID0gdmVjNChjb2xvciwgMC41KTtcbiAgICAgIHJlc3VsdC5yZWZsZWN0aW9uID0gcmVmbGVjdGlvbjtcbiAgICB9XG5cbiAgICBib29sIGxpZ2h0RW5hYmxlZCA9IChnZXRTY2VuZURhdGFCeUluZGV4KGluZGV4ICsgOSkgIT0gMC4wKTtcbiAgICByZXN1bHQubGlnaHRFbmFibGVkID0gbGlnaHRFbmFibGVkO1xuXG4gICAgLy8gaWYgKHNoYWRvd01vZGUpXG4gICAgLy8gICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZm9yIChpbnQgaW5kZXggPSB1X2JveGVzU3RhcnQ7IGluZGV4IDwgdV9ib3hlc1N0b3A7IGluZGV4ICs9IDI2KVxuICB7XG4gICAgYm9vbCBzaGFkb3dFbmFibGVkID0gKGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyAyMykgIT0gMC4wKTtcblxuICAgIGlmIChzaGFkb3dNb2RlICYmICFzaGFkb3dFbmFibGVkKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB0bXBSYXkub3JpZ2luID0gcmF5Lm9yaWdpbjtcbiAgICB0bXBSYXkuZGlyZWN0aW9uID0gcmF5LmRpcmVjdGlvbjtcblxuICAgIG1hdDQgbm9ybWFsVHJhbnNmb3JtYXRpb25NYXRyaXggPSBtYXQ0KFxuICAgICAgZ2V0U2NlbmVEYXRhQnlJbmRleChpbmRleCArIDApLFxuICAgICAgZ2V0U2NlbmVEYXRhQnlJbmRleChpbmRleCArIDEpLFxuICAgICAgZ2V0U2NlbmVEYXRhQnlJbmRleChpbmRleCArIDIpLFxuICAgICAgZ2V0U2NlbmVEYXRhQnlJbmRleChpbmRleCArIDMpLFxuXG4gICAgICBnZXRTY2VuZURhdGFCeUluZGV4KGluZGV4ICsgNCksXG4gICAgICBnZXRTY2VuZURhdGFCeUluZGV4KGluZGV4ICsgNSksXG4gICAgICBnZXRTY2VuZURhdGFCeUluZGV4KGluZGV4ICsgNiksXG4gICAgICBnZXRTY2VuZURhdGFCeUluZGV4KGluZGV4ICsgNyksXG5cbiAgICAgIGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyA4KSxcbiAgICAgIGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyA5KSxcbiAgICAgIGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyAxMCksXG4gICAgICBnZXRTY2VuZURhdGFCeUluZGV4KGluZGV4ICsgMTEpLFxuXG4gICAgICBnZXRTY2VuZURhdGFCeUluZGV4KGluZGV4ICsgMTIpLFxuICAgICAgZ2V0U2NlbmVEYXRhQnlJbmRleChpbmRleCArIDEzKSxcbiAgICAgIGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyAxNCksXG4gICAgICBnZXRTY2VuZURhdGFCeUluZGV4KGluZGV4ICsgMTUpXG4gICAgKTtcblxuICAgIHZlYzMgYm94U2l6ZSA9IGdldFNjZW5lVmVjM0J5SW5kZXgoaW5kZXggKyAxNik7XG5cbiAgICBtYXQ0IGludmVyc2VkVHJhbnNmb3JtYXRpb25NYXRyaXggPSBpbnZlcnNlKG5vcm1hbFRyYW5zZm9ybWF0aW9uTWF0cml4KTtcblxuICAgIC8vIGNvbnZlcnQgcmF5IGZyb20gd29ybGQgc3BhY2UgdG8gYm94IHNwYWNlXG4gICAgdG1wUmF5Lm9yaWdpbiA9IChpbnZlcnNlZFRyYW5zZm9ybWF0aW9uTWF0cml4ICogdmVjNCh0bXBSYXkub3JpZ2luLCAxLjApKS54eXo7XG4gICAgdG1wUmF5LmRpcmVjdGlvbiA9IChpbnZlcnNlZFRyYW5zZm9ybWF0aW9uTWF0cml4ICogdmVjNCh0bXBSYXkuZGlyZWN0aW9uLCAwLjApKS54eXo7XG5cbiAgICBmbG9hdCBjdXJyRGlzdGFuY2UgPSAwLjA7XG4gICAgaWYgKFxuICAgICAgIWludGVyc2VjdEJveCh0bXBSYXksIGJveFNpemUsIGN1cnJEaXN0YW5jZSwgbm9ybWFsKSB8fFxuICAgICAgKGJlc3REaXN0YW5jZSA+IDAuMCAmJiBjdXJyRGlzdGFuY2UgPiBiZXN0RGlzdGFuY2UpXG4gICAgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBiZXN0RGlzdGFuY2UgPSBjdXJyRGlzdGFuY2U7XG5cbiAgICAvLyBjb252ZXJ0IG5vcm1hbCBmcm9tIGJveCBzcGFjZSB0byB3b3JsZCBzcGFjZVxuICAgIG5vcm1hbCA9IChub3JtYWxUcmFuc2Zvcm1hdGlvbk1hdHJpeCAqIHZlYzQobm9ybWFsLCAwLjApKS54eXo7XG5cbiAgICByZXN1bHQuaGFzSGl0ID0gdHJ1ZTtcbiAgICByZXN1bHQuZGVwdGggPSBiZXN0RGlzdGFuY2U7XG4gICAgcmVzdWx0LnBvc2l0aW9uID0gcmF5Lm9yaWdpbiArIGJlc3REaXN0YW5jZSAqIHJheS5kaXJlY3Rpb247XG4gICAgcmVzdWx0Lm5vcm1hbCA9IG5vcm1hbDtcblxuICAgIGJvb2wgY2hlc3Nib2FyZE1hdGVyaWFsID0gKGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyAyNSkgIT0gMC4wKTtcblxuICAgIGlmIChjaGVzc2JvYXJkTWF0ZXJpYWwpXG4gICAge1xuICAgICAgdmVjMyB0eFBvcyA9IChpbnZlcnNlZFRyYW5zZm9ybWF0aW9uTWF0cml4ICogdmVjNChyZXN1bHQucG9zaXRpb24sIDEuMCkpLnh5ejtcblxuICAgICAgLy8gY2hlc3Nib2FyZCBjb2xvciBlZmZlY3RcbiAgICAgIGlmIChmcmFjdCh0eFBvcy54ICogMC4yKSA+IDAuNSA9PSBmcmFjdCh0eFBvcy56ICogMC4yKSA+IDAuNSA9PSBmcmFjdCh0eFBvcy55ICogMC4yKSA+IDAuNSlcbiAgICAgIHtcbiAgICAgICAgcmVzdWx0LmNvbG9yID0gdmVjNCgxLjApO1xuICAgICAgICByZXN1bHQucmVmbGVjdGlvbiA9IDAuMztcbiAgICAgIH1cbiAgICAgIGVsc2VcbiAgICAgIHtcbiAgICAgICAgcmVzdWx0LmNvbG9yID0gdmVjNCgwLjAsIDAuNCwgMC40NSwgMS4wKTtcbiAgICAgICAgcmVzdWx0LnJlZmxlY3Rpb24gPSAwLjA7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICB2ZWMzIGNvbG9yID0gZ2V0U2NlbmVWZWMzQnlJbmRleChpbmRleCArIDE5KTtcblxuICAgICAgZmxvYXQgcmVmbGVjdGlvbiA9IGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyAyMik7XG5cbiAgICAgIHJlc3VsdC5jb2xvciA9IHZlYzQoY29sb3IsIDEuMCk7XG4gICAgICByZXN1bHQucmVmbGVjdGlvbiA9IHJlZmxlY3Rpb247XG4gICAgfVxuXG4gICAgYm9vbCBsaWdodEVuYWJsZWQgPSAoZ2V0U2NlbmVEYXRhQnlJbmRleChpbmRleCArIDI0KSAhPSAwLjApO1xuICAgIHJlc3VsdC5saWdodEVuYWJsZWQgPSBsaWdodEVuYWJsZWQ7XG5cbiAgICAvLyBpZiAoc2hhZG93TW9kZSlcbiAgICAvLyAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmb3IgKGludCBpbmRleCA9IHVfdHJpYW5nbGVzU3RhcnQ7IGluZGV4IDwgdV90cmlhbmdsZXNTdG9wOyBpbmRleCArPSAxNSlcbiAge1xuICAgIGJvb2wgc2hhZG93RW5hYmxlZCA9IChnZXRTY2VuZURhdGFCeUluZGV4KGluZGV4ICsgMTMpICE9IDAuMCk7XG5cbiAgICBpZiAoc2hhZG93TW9kZSAmJiAhc2hhZG93RW5hYmxlZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdG1wUmF5Lm9yaWdpbiA9IHJheS5vcmlnaW47XG4gICAgdG1wUmF5LmRpcmVjdGlvbiA9IHJheS5kaXJlY3Rpb247XG5cbiAgICB2ZWMzIHYwID0gZ2V0U2NlbmVWZWMzQnlJbmRleChpbmRleCArIDApO1xuICAgIHZlYzMgdjEgPSBnZXRTY2VuZVZlYzNCeUluZGV4KGluZGV4ICsgMyk7XG4gICAgdmVjMyB2MiA9IGdldFNjZW5lVmVjM0J5SW5kZXgoaW5kZXggKyA2KTtcblxuICAgIGZsb2F0IGN1cnJEaXN0YW5jZSA9IDAuMDtcbiAgICBpZiAoXG4gICAgICAhaW50ZXJzZWN0VHJpYW5nbGUodG1wUmF5LCB2MCwgdjEsIHYyLCBjdXJyRGlzdGFuY2UsIG5vcm1hbCkgfHxcbiAgICAgIChiZXN0RGlzdGFuY2UgPiAwLjAgJiYgY3VyckRpc3RhbmNlID4gYmVzdERpc3RhbmNlKVxuICAgICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgYmVzdERpc3RhbmNlID0gY3VyckRpc3RhbmNlO1xuXG4gICAgcmVzdWx0Lmhhc0hpdCA9IHRydWU7XG4gICAgcmVzdWx0LmRlcHRoID0gYmVzdERpc3RhbmNlO1xuICAgIHJlc3VsdC5wb3NpdGlvbiA9IHJheS5vcmlnaW4gKyBiZXN0RGlzdGFuY2UgKiByYXkuZGlyZWN0aW9uO1xuICAgIHJlc3VsdC5ub3JtYWwgPSBub3JtYWw7XG5cbiAgICB2ZWMzIGNvbG9yID0gZ2V0U2NlbmVWZWMzQnlJbmRleChpbmRleCArIDkpO1xuXG4gICAgZmxvYXQgcmVmbGVjdGlvbiA9IGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyAxMik7XG5cbiAgICByZXN1bHQuY29sb3IgPSB2ZWM0KGNvbG9yLCAxLjApO1xuICAgIHJlc3VsdC5yZWZsZWN0aW9uID0gcmVmbGVjdGlvbjtcblxuICAgIGJvb2wgbGlnaHRFbmFibGVkID0gKGdldFNjZW5lRGF0YUJ5SW5kZXgoaW5kZXggKyAxNCkgIT0gMC4wKTtcbiAgICByZXN1bHQubGlnaHRFbmFibGVkID0gbGlnaHRFbmFibGVkO1xuXG4gICAgLy8gaWYgKHNoYWRvd01vZGUpXG4gICAgLy8gICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgeyAvLyBwbGFuZSB0ZXN0XG5cbiAgICAvLyB2ZWMzIHBsYW5lTm9ybWFsID0gbm9ybWFsaXplKHZlYzMoMC4wLCAwLjAsIDEuMCkpO1xuICAgIC8vIGZsb2F0IHZhbCA9IGludGVyc2VjdFBsYW5lKHRtcFJheSwgcGxhbmVOb3JtYWwsIDM1LjAvNC4wKjMuMCk7XG5cbiAgICAvLyB2ZWMzIHBsYW5lTm9ybWFsID0gbm9ybWFsaXplKHZlYzMoMC4wLCAwLjAsIDEuMCkpO1xuICAgIC8vIGZsb2F0IHZhbCA9IGludGVyc2VjdFBsYW5lKHRtcFJheSwgcGxhbmVOb3JtYWwsIDAuMCk7XG5cbiAgICAvLyB2ZWMzIHBsYW5lTm9ybWFsID0gbm9ybWFsaXplKHZlYzMoMC4wLCAwLjAsIDEuMCkpO1xuICAgIC8vIGZsb2F0IHZhbCA9IGludGVyc2VjdFBsYW5lKHRtcFJheSwgcGxhbmVOb3JtYWwsIDEwLjApO1xuXG4gICAgLy8gaWYgKHZhbCA+IDAuMCAmJiAoYmVzdERpc3RhbmNlIDw9IDAuMCB8fCB2YWwgPCBiZXN0RGlzdGFuY2UpKVxuICAgIC8vIHtcbiAgICAvLyAgICAgcmVzdWx0Lmhhc0hpdCA9IHRydWU7XG4gICAgLy8gICAgIHJlc3VsdC5kZXB0aCA9IHZhbDtcbiAgICAvLyAgICAgcmVzdWx0LnBvc2l0aW9uID0gcmF5Lm9yaWdpbiArIHZhbCAqIHJheS5kaXJlY3Rpb247XG4gICAgLy8gICAgIHJlc3VsdC5ub3JtYWwgPSB2ZWMzKHBsYW5lTm9ybWFsKTtcbiAgICAvLyAgICAgcmVzdWx0LmNvbG9yID0gdmVjNCgxLjAsIDEuMCwgMS4wLCAxLjApO1xuICAgIC8vICAgICByZXN1bHQucmVmbGVjdGlvbiA9IDAuMDtcbiAgICAvLyAgICAgcmVzdWx0LmxpZ2h0RW5hYmxlZCA9IHRydWU7XG4gICAgLy8gfVxuXG4gIH0gLy8gcGxhbmUgdGVzdFxuXG4gIHJldHVybiByZXN1bHQuaGFzSGl0O1xufVxuXG5mbG9hdCBsaWdodEF0KHZlYzMgaW1wYWN0UG9zaXRpb24sIHZlYzMgaW1wYWN0Tm9ybWFsLCB2ZWMzIHZpZXdlcilcbntcbiAgZmxvYXQgYmVzdEludGVuc2l0eSA9IDAuMDtcblxuICBmb3IgKGludCBpbmRleCA9IHVfc3VuTGlnaHRzU3RhcnQ7IGluZGV4IDwgdV9zdW5MaWdodHNTdG9wOyBpbmRleCArPSA0KVxuICB7XG4gICAgaWYgKCFnX3NoYWRvd3NFbmFibGVkKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2ZWMzIGxpZ2h0RGlyID0gZ2V0TGlnaHRzVmVjM0J5SW5kZXgoaW5kZXggKyAwKTtcbiAgICBmbG9hdCBsb2NhbEludGVuc2l0eSA9IGdldExpZ2h0c0RhdGFCeUluZGV4KGluZGV4ICsgMyk7XG5cbiAgICBmbG9hdCBjb2VmID0gbG9jYWxJbnRlbnNpdHk7XG4gICAgbGlnaHREaXIgPSBub3JtYWxpemUobGlnaHREaXIpO1xuXG4gICAgLy8gaXMgdGhlIGxpZ2h0IGJsb2NrZWQgYnkgYW4gb2JqZWN0P1xuICAgIFJheVJlc3VsdCByZXN1bHQ7XG4gICAgaWYgKGludGVyc2VjdFNjZW5lKFJheVZhbHVlcyhpbXBhY3RQb3NpdGlvbiwgbGlnaHREaXIpLCByZXN1bHQsIHRydWUpKSB7XG4gICAgICBjb250aW51ZTsgLy8gYW4gb2JqZWN0IGlzIHNoYWRvd2luZyB0aGlzIGxpZ2h0OiBpZ25vcmUgdGhpcyBsaWdodFxuICAgIH1cblxuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuXG4gICAgZmxvYXQgaW50ZW5zaXR5ID0gMC4wO1xuICAgIHZlYzMgcmVmbGVjdGlvbiA9IHJlZmxlY3QoLWxpZ2h0RGlyLCBpbXBhY3ROb3JtYWwpO1xuICAgIGludGVuc2l0eSArPSAwLjYgKiBwb3cobWF4KGRvdChyZWZsZWN0aW9uLCB2aWV3ZXIpLCAwLjApLCAzMC4wKTtcbiAgICBpbnRlbnNpdHkgKz0gMS4wICogZG90KGxpZ2h0RGlyLCBpbXBhY3ROb3JtYWwpO1xuXG4gICAgaW50ZW5zaXR5ICo9IGNvZWY7XG5cbiAgICBpZiAoYmVzdEludGVuc2l0eSA8IGludGVuc2l0eSkge1xuICAgICAgYmVzdEludGVuc2l0eSA9IGludGVuc2l0eTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGludCBpbmRleCA9IHVfc3BvdExpZ2h0c1N0YXJ0OyBpbmRleCA8IHVfc3BvdExpZ2h0c1N0b3A7IGluZGV4ICs9IDUpXG4gIHtcbiAgICB2ZWMzIGxpZ2h0RGlyID0gdmVjMygxLjApO1xuICAgIGZsb2F0IGNvZWYgPSAxLjA7XG5cbiAgICAvLyBzcG90IGxpZ2h0XG5cbiAgICB2ZWMzIGxpZ2h0UG9zID0gZ2V0TGlnaHRzVmVjM0J5SW5kZXgoaW5kZXggKyAwKTtcbiAgICBmbG9hdCBsaWdodFJhZGl1cyA9IGdldExpZ2h0c0RhdGFCeUluZGV4KGluZGV4ICsgMyk7XG5cbiAgICB2ZWMzIGxpZ2h0VG9JbXBhY3RWZWMzID0gbGlnaHRQb3MgLSBpbXBhY3RQb3NpdGlvbjtcblxuICAgIC8vIGlzIHRvbyBmYXI/XG4gICAgZmxvYXQgbGlnaHRUb0ltcGFjdERpc3RhbmNlID0gbGVuZ3RoKGxpZ2h0VG9JbXBhY3RWZWMzKTtcbiAgICBpZiAobGlnaHRUb0ltcGFjdERpc3RhbmNlID4gbGlnaHRSYWRpdXMpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyB0b28gZmFyXG4gICAgfVxuXG4gICAgbGlnaHREaXIueCA9IGxpZ2h0VG9JbXBhY3RWZWMzLnggLyBsaWdodFRvSW1wYWN0RGlzdGFuY2U7IC8vIG5vcm1hbGl6ZVxuICAgIGxpZ2h0RGlyLnkgPSBsaWdodFRvSW1wYWN0VmVjMy55IC8gbGlnaHRUb0ltcGFjdERpc3RhbmNlOyAvLyBub3JtYWxpemVcbiAgICBsaWdodERpci56ID0gbGlnaHRUb0ltcGFjdFZlYzMueiAvIGxpZ2h0VG9JbXBhY3REaXN0YW5jZTsgLy8gbm9ybWFsaXplXG5cbiAgICBmbG9hdCBsb2NhbEludGVuc2l0eSA9IGdldExpZ2h0c0RhdGFCeUluZGV4KGluZGV4ICsgNCk7XG5cbiAgICBjb2VmID0gbG9jYWxJbnRlbnNpdHkgKiAoMS4wIC0gbGlnaHRUb0ltcGFjdERpc3RhbmNlIC8gbGlnaHRSYWRpdXMpO1xuXG4gICAgaWYgKCFnX3NoYWRvd3NFbmFibGVkKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBSYXlSZXN1bHQgcmVzdWx0O1xuICAgIGlmIChcbiAgICAgIC8vIGlzIHRoZSBsaWdodCBibG9ja2VkIGJ5IGFuIG9iamVjdD9cbiAgICAgIGludGVyc2VjdFNjZW5lKFJheVZhbHVlcyhpbXBhY3RQb3NpdGlvbiwgbGlnaHREaXIpLCByZXN1bHQsIHRydWUpICYmXG4gICAgICAvLyBhdm9pZCBcIm9wcG9zaXRlIHNoYWRvd3NcIlxuICAgICAgcmVzdWx0LmRlcHRoIDwgbGlnaHRUb0ltcGFjdERpc3RhbmNlXG4gICAgKSB7XG4gICAgICBjb250aW51ZTsgLy8gc2hhZG93XG4gICAgfVxuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG5cbiAgICBmbG9hdCBpbnRlbnNpdHkgPSAwLjA7XG4gICAgdmVjMyByZWZsZWN0aW9uID0gcmVmbGVjdCgtbGlnaHREaXIsIGltcGFjdE5vcm1hbCk7XG4gICAgaW50ZW5zaXR5ICs9IDAuNiAqIHBvdyhtYXgoZG90KHJlZmxlY3Rpb24sIHZpZXdlciksIDAuMCksIDMwLjApO1xuICAgIGludGVuc2l0eSArPSAxLjAgKiBkb3QobGlnaHREaXIsIGltcGFjdE5vcm1hbCk7XG5cbiAgICBpbnRlbnNpdHkgKj0gY29lZjtcblxuICAgIGlmIChiZXN0SW50ZW5zaXR5IDwgaW50ZW5zaXR5KSB7XG4gICAgICBiZXN0SW50ZW5zaXR5ID0gaW50ZW5zaXR5O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXgoZ19hbWJpYW50TGlnaHQsIGJlc3RJbnRlbnNpdHkpO1xufVxuXG52b2lkIG1haW4oKVxue1xuICAvL1xuICAvL1xuICAvLyBpbml0aWFsIHJheVxuXG4gIHZlYzMgcmF5RGlyID0gbm9ybWFsaXplKHZfcG9zaXRpb24gLSB1X2NhbWVyYUV5ZSk7IC8vIGNhbWVyYSBkaXJlY3Rpb25cbiAgdmVjMyBmaW5hbFBpeGVsQ29sb3IgPSBnX2JhY2tncm91bmRDb2xvcjtcblxuICBSYXlWYWx1ZXMgY3VyclJheSA9IFJheVZhbHVlcyh1X2NhbWVyYUV5ZSwgcmF5RGlyKTtcbiAgUmF5UmVzdWx0IHJlc3VsdDtcblxuICByZXN1bHQucG9zaXRpb24gPSB1X2NhbWVyYUV5ZTtcbiAgcmVzdWx0LnJlZmxlY3Rpb24gPSAxLjA7XG4gIHJlc3VsdC5saWdodEVuYWJsZWQgPSB0cnVlO1xuXG4gIGZsb2F0IGxhc3RSZWZsZWN0aW9uID0gMS4wO1xuXG4gIGNvbnN0IGludCBtYXhJdGVyYXRpb24gPSBnX3JlZmxlY3Rpb25NYXg7XG4gIGZvciAoaW50IGl0ZXJhdGlvbkxlZnQgPSBtYXhJdGVyYXRpb247IGl0ZXJhdGlvbkxlZnQgPj0gMDsgLS1pdGVyYXRpb25MZWZ0KVxuICB7XG4gICAgaWYgKHJlc3VsdC5yZWZsZWN0aW9uIDw9IDAuMDUpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGJvb2wgbXVzdFN0b3AgPSBmYWxzZTtcblxuICAgIGN1cnJSYXkgPSBSYXlWYWx1ZXMocmVzdWx0LnBvc2l0aW9uLCByYXlEaXIpO1xuXG4gICAgcmVzdWx0Lmhhc0hpdCA9IGludGVyc2VjdFNjZW5lKGN1cnJSYXksIHJlc3VsdCwgZmFsc2UpO1xuXG4gICAgdmVjMyB0bXBDb2xvciA9IGdfYmFja2dyb3VuZENvbG9yO1xuXG4gICAgaWYgKHJlc3VsdC5oYXNIaXQpXG4gICAge1xuICAgICAgZmxvYXQgbGlnaHRJbnRlbnNpdHkgPSAxLjA7XG5cbiAgICAgIGlmIChyZXN1bHQubGlnaHRFbmFibGVkKVxuICAgICAge1xuICAgICAgICBsaWdodEludGVuc2l0eSA9IGxpZ2h0QXQocmVzdWx0LnBvc2l0aW9uLCByZXN1bHQubm9ybWFsLCAtY3VyclJheS5kaXJlY3Rpb24pO1xuXG4gICAgICAgIGlmIChsaWdodEludGVuc2l0eSA8PSAwLjApXG4gICAgICAgIHtcbiAgICAgICAgICAvLyBub3QgbGl0XG4gICAgICAgICAgbXVzdFN0b3AgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRtcENvbG9yID0gcmVzdWx0LmNvbG9yLnh5eiAqIGxpZ2h0SW50ZW5zaXR5O1xuICAgIH1cblxuICAgIGZpbmFsUGl4ZWxDb2xvciA9IGZpbmFsUGl4ZWxDb2xvciAqICgxLjAgLSBsYXN0UmVmbGVjdGlvbikgKyB0bXBDb2xvciAqIGxhc3RSZWZsZWN0aW9uO1xuXG4gICAgaWYgKG11c3RTdG9wIHx8ICFyZXN1bHQuaGFzSGl0KVxuICAgIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGxhc3RSZWZsZWN0aW9uICo9IHJlc3VsdC5yZWZsZWN0aW9uO1xuXG4gICAgLy8gcmF5RGlyID0gcmVmbGVjdChyYXlEaXIsIHJlc3VsdC5ub3JtYWwpO1xuICAgIHJheURpciA9IHJlZnJhY3QocmF5RGlyLCByZXN1bHQubm9ybWFsLCBFdGEpO1xuICB9XG5cbiAgb19jb2xvciA9IHZlYzQoZmluYWxQaXhlbENvbG9yLCAxLjApO1xufVxuYC50cmltKCk7IiwKICAiZXhwb3J0IGRlZmF1bHQgYFxuI3ZlcnNpb24gMzAwIGVzXG5cbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcblxuaW4gdmVjMiBhX3ZlcnRleFBvc2l0aW9uO1xuaW4gdmVjMiBhX3ZlcnRleFRleHR1cmVDb29yZDtcblxub3V0IHZlYzIgdl90ZXh0dXJlQ29vcmQ7XG5cbnZvaWQgbWFpbih2b2lkKVxue1xuICB2X3RleHR1cmVDb29yZCA9IGFfdmVydGV4VGV4dHVyZUNvb3JkO1xuXG4gIGdsX1Bvc2l0aW9uID0gdmVjNChhX3ZlcnRleFBvc2l0aW9uLCAxLjAsIDEuMCk7XG59XG5gLnRyaW0oKTsiLAogICJleHBvcnQgZGVmYXVsdCBgXG4jdmVyc2lvbiAzMDAgZXNcblxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuXG51bmlmb3JtIHNhbXBsZXIyRCB1X3RleHR1cmU7XG51bmlmb3JtIHZlYzIgdV9zdGVwO1xuXG5pbiB2ZWMyIHZfdGV4dHVyZUNvb3JkO1xuXG5vdXQgdmVjNCBvX2NvbG9yO1xuXG52b2lkIG1haW4odm9pZClcbntcbiAgLy8gZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZSh1X3RleHR1cmUsIHZfdGV4dHVyZUNvb3JkKTtcblxuICBmbG9hdCB0b3RhbCA9IDAuMDtcbiAgdmVjNCBhY2N1bXVsYXRlZCA9IHZlYzQoMC4wKTtcblxuICAvL1xuXG4gIGlmICh2X3RleHR1cmVDb29yZC54IC0gdV9zdGVwLnggPiAwLjApXG4gIHtcbiAgICBhY2N1bXVsYXRlZCArPSB0ZXh0dXJlKHVfdGV4dHVyZSwgdmVjMih2X3RleHR1cmVDb29yZC54IC0gdV9zdGVwLngsIHZfdGV4dHVyZUNvb3JkLnkpKTtcbiAgICB0b3RhbCArPSAxLjA7XG4gIH1cblxuICBpZiAodl90ZXh0dXJlQ29vcmQueCArIHVfc3RlcC54ID4gMC4wKVxuICB7XG4gICAgYWNjdW11bGF0ZWQgKz0gdGV4dHVyZSh1X3RleHR1cmUsIHZlYzIodl90ZXh0dXJlQ29vcmQueCArIHVfc3RlcC54LCB2X3RleHR1cmVDb29yZC55KSk7XG4gICAgdG90YWwgKz0gMS4wO1xuICB9XG5cbiAgaWYgKHZfdGV4dHVyZUNvb3JkLnkgLSB1X3N0ZXAueSA+IDAuMClcbiAge1xuICAgIGFjY3VtdWxhdGVkICs9IHRleHR1cmUodV90ZXh0dXJlLCB2ZWMyKHZfdGV4dHVyZUNvb3JkLngsIHZfdGV4dHVyZUNvb3JkLnkgLSB1X3N0ZXAueSkpO1xuICAgIHRvdGFsICs9IDEuMDtcbiAgfVxuXG4gIGlmICh2X3RleHR1cmVDb29yZC55ICsgdV9zdGVwLnkgPiAwLjApXG4gIHtcbiAgICBhY2N1bXVsYXRlZCArPSB0ZXh0dXJlKHVfdGV4dHVyZSwgdmVjMih2X3RleHR1cmVDb29yZC54LCB2X3RleHR1cmVDb29yZC55ICsgdV9zdGVwLnkpKTtcbiAgICB0b3RhbCArPSAxLjA7XG4gIH1cblxuICAvL1xuXG4gIGlmICh2X3RleHR1cmVDb29yZC54IC0gdV9zdGVwLnggPiAwLjAgJiYgdl90ZXh0dXJlQ29vcmQueSAtIHVfc3RlcC55ID4gMC4wKVxuICB7XG4gICAgYWNjdW11bGF0ZWQgKz0gdGV4dHVyZSh1X3RleHR1cmUsIHZlYzIodl90ZXh0dXJlQ29vcmQueCAtIHVfc3RlcC54LCB2X3RleHR1cmVDb29yZC55IC0gdV9zdGVwLnkpKTtcbiAgICB0b3RhbCArPSAxLjA7XG4gIH1cblxuICBpZiAodl90ZXh0dXJlQ29vcmQueCArIHVfc3RlcC54ID4gMC4wICYmIHZfdGV4dHVyZUNvb3JkLnkgLSB1X3N0ZXAueSA+IDAuMClcbiAge1xuICAgIGFjY3VtdWxhdGVkICs9IHRleHR1cmUodV90ZXh0dXJlLCB2ZWMyKHZfdGV4dHVyZUNvb3JkLnggKyB1X3N0ZXAueCwgdl90ZXh0dXJlQ29vcmQueSAtIHVfc3RlcC55KSk7XG4gICAgdG90YWwgKz0gMS4wO1xuICB9XG5cbiAgaWYgKHZfdGV4dHVyZUNvb3JkLnggLSB1X3N0ZXAueCA+IDAuMCAmJiB2X3RleHR1cmVDb29yZC55ICsgdV9zdGVwLnkgPiAwLjApXG4gIHtcbiAgICBhY2N1bXVsYXRlZCArPSB0ZXh0dXJlKHVfdGV4dHVyZSwgdmVjMih2X3RleHR1cmVDb29yZC54IC0gdV9zdGVwLngsIHZfdGV4dHVyZUNvb3JkLnkgKyB1X3N0ZXAueSkpO1xuICAgIHRvdGFsICs9IDEuMDtcbiAgfVxuXG4gIGlmICh2X3RleHR1cmVDb29yZC54ICsgdV9zdGVwLnggPiAwLjAgJiYgdl90ZXh0dXJlQ29vcmQueSArIHVfc3RlcC55ID4gMC4wKVxuICB7XG4gICAgYWNjdW11bGF0ZWQgKz0gdGV4dHVyZSh1X3RleHR1cmUsIHZlYzIodl90ZXh0dXJlQ29vcmQueCArIHVfc3RlcC54LCB2X3RleHR1cmVDb29yZC55ICsgdV9zdGVwLnkpKTtcbiAgICB0b3RhbCArPSAxLjA7XG4gIH1cblxuICAvL1xuXG4gIGlmICh0b3RhbCA+IDAuMClcbiAgICBvX2NvbG9yID0gYWNjdW11bGF0ZWQgLyB0b3RhbDtcbiAgZWxzZVxuICAgIG9fY29sb3IgPSB2ZWM0KDEuMCwgMC4wLCAwLjAsIDEuMCk7IC8vIHdhcm5pbmdcbn1cbmAudHJpbSgpOyIsCiAgIlxuaW1wb3J0IHsgZ3JhcGhpY3MgfSBmcm9tICdAbG9jYWwtZnJhbWV3b3JrJztcbmNvbnN0IHtcbiAgV2ViR0xDb250ZXh0LFxuICBEYXRhVGV4dHVyZSxcbiAgVGV4dHVyZSxcbiAgRnJhbWVCdWZmZXIsXG4gIFNoYWRlclByb2dyYW0sXG4gIEdlb21ldHJ5V3JhcHBlcixcbn0gPSBncmFwaGljcy53ZWJnbDI7XG5cbi8vIEB0cy1pZ25vcmVcbmltcG9ydCByYXlUcmFjZXJWZXJ0ZXggZnJvbSAnLi9zaGFkZXJzL3JheS10cmFjZXIuZ2xzbC52ZXJ0Jztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCByYXlUcmFjZXJGcmFnbWVudCBmcm9tICcuL3NoYWRlcnMvcmF5LXRyYWNlci5nbHNsLmZyYWcnO1xuXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgdGV4dHVyZVZlcnRleCBmcm9tICcuL3NoYWRlcnMvdGV4dHVyZS5nbHNsLnZlcnQnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHRleHR1cmVGcmFnbWVudCBmcm9tICcuL3NoYWRlcnMvdGV4dHVyZS5nbHNsLmZyYWcnO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuY29uc3QgX2RlZ3JlZVRvUmFkID0gKGFuZ2xlOiBudW1iZXIpID0+IGFuZ2xlICogTWF0aC5QSSAvIDE4MDtcblxuZXhwb3J0IGludGVyZmFjZSBJRGVmaW5pdGlvbiB7XG4gIGNhbnZhc1dpZHRoOiBudW1iZXI7XG4gIGNhbnZhc0hlaWdodDogbnVtYmVyO1xuICBmb3Z5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVB1YmxpY1NwaGVyZSB7XG4gIHBvc2l0aW9uOiBnbG0uUmVhZG9ubHlWZWMzO1xuICByYWRpdXM6IG51bWJlcjtcbiAgY29sb3I6IGdsbS5SZWFkb25seVZlYzM7XG4gIHJlZmxlY3Rpb246IG51bWJlcjtcbiAgY2hlc3Nib2FyZDogYm9vbGVhbjtcbiAgc2hhZG93RW5hYmxlZDogYm9vbGVhbjtcbiAgbGlnaHRFbmFibGVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElJbnRlcm5hbFNwaGVyZSB7XG4gIHBvc2l0aW9uOiBnbG0uUmVhZG9ubHlWZWMzO1xuICByYWRpdXM6IG51bWJlcjtcbiAgY29sb3I6IGdsbS5SZWFkb25seVZlYzM7XG4gIHJlZmxlY3Rpb246IG51bWJlcjtcbiAgc2hhZG93RW5hYmxlZDogYm9vbGVhbjtcbiAgbGlnaHRFbmFibGVkOiBib29sZWFuO1xuICBjaGVzc2JvYXJkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQdWJsaWNCb3gge1xuICBwb3NpdGlvbjogZ2xtLlJlYWRvbmx5VmVjMztcbiAgYW5nbGVYOiBudW1iZXI7XG4gIGFuZ2xlWTogbnVtYmVyO1xuICBhbmdsZVo6IG51bWJlcjtcbiAgYm94U2l6ZTogZ2xtLlJlYWRvbmx5VmVjMztcbiAgY29sb3I6IGdsbS5SZWFkb25seVZlYzM7XG4gIHJlZmxlY3Rpb246IG51bWJlcjtcbiAgY2hlc3Nib2FyZDogYm9vbGVhbjtcbiAgc2hhZG93RW5hYmxlZDogYm9vbGVhbjtcbiAgbGlnaHRFbmFibGVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsQm94IHtcbiAgbWF0cml4OiBnbG0ubWF0NDtcbiAgYm94U2l6ZTogZ2xtLlJlYWRvbmx5VmVjMztcbiAgY29sb3I6IGdsbS5SZWFkb25seVZlYzM7XG4gIHJlZmxlY3Rpb246IG51bWJlcjtcbiAgc2hhZG93RW5hYmxlZDogYm9vbGVhbjtcbiAgbGlnaHRFbmFibGVkOiBib29sZWFuO1xuICBjaGVzc2JvYXJkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUcmlhbmdsZSB7XG4gIHYwOiBnbG0uUmVhZG9ubHlWZWMzO1xuICB2MTogZ2xtLlJlYWRvbmx5VmVjMztcbiAgdjI6IGdsbS5SZWFkb25seVZlYzM7XG4gIGNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzO1xuICByZWZsZWN0aW9uOiBudW1iZXI7XG4gIHNoYWRvd0VuYWJsZWQ6IGJvb2xlYW47XG4gIGxpZ2h0RW5hYmxlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU3VuTGlnaHQge1xuICBkaXJlY3Rpb246IGdsbS5SZWFkb25seVZlYzM7XG4gIGludGVuc2l0eTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTcG90TGlnaHQge1xuICBwb3NpdGlvbjogZ2xtLlJlYWRvbmx5VmVjMztcbiAgaW50ZW5zaXR5OiBudW1iZXI7XG4gIHJhZGl1czogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDYW1lcmEge1xuICBwb3NpdGlvbjogZ2xtLnZlYzM7XG4gIHRhcmdldDogZ2xtLnZlYzM7XG4gIHVwOiBnbG0udmVjMztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmF5VHJhY2VyUmVuZGVyZXIge1xuICBwdXNoU3BoZXJlKHtcbiAgICBwb3NpdGlvbixcbiAgICByYWRpdXMsXG4gICAgY29sb3IsXG4gICAgcmVmbGVjdGlvbixcbiAgICBjaGVzc2JvYXJkLFxuICAgIHNoYWRvd0VuYWJsZWQsXG4gICAgbGlnaHRFbmFibGVkXG4gIH06IElQdWJsaWNTcGhlcmUpOiB2b2lkO1xuXG4gIHB1c2hCb3goe1xuICAgIHBvc2l0aW9uLFxuICAgIGFuZ2xlWCxcbiAgICBhbmdsZVksXG4gICAgYW5nbGVaLFxuICAgIGJveFNpemUsXG4gICAgY29sb3IsXG4gICAgcmVmbGVjdGlvbixcbiAgICBjaGVzc2JvYXJkLFxuICAgIHNoYWRvd0VuYWJsZWQsXG4gICAgbGlnaHRFbmFibGVkXG4gIH06IElQdWJsaWNCb3gpOiB2b2lkO1xuXG4gIHB1c2hUcmlhbmdsZSh7XG4gICAgdjAsXG4gICAgdjEsXG4gICAgdjIsXG4gICAgY29sb3IsXG4gICAgcmVmbGVjdGlvbixcbiAgICBzaGFkb3dFbmFibGVkLFxuICAgIGxpZ2h0RW5hYmxlZFxuICB9OiBJVHJpYW5nbGUpOiB2b2lkO1xuXG4gIHB1c2hTdW5MaWdodCh7IGRpcmVjdGlvbiwgaW50ZW5zaXR5IH06IElTdW5MaWdodCk6IHZvaWQ7XG5cbiAgcHVzaFNwb3RMaWdodCh7IHBvc2l0aW9uLCBpbnRlbnNpdHksIHJhZGl1cyB9OiBJU3BvdExpZ2h0KTogdm9pZDtcblxuICBsb29rQXQoXG4gICAgZXllOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIHRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICB1cDogZ2xtLlJlYWRvbmx5VmVjM1xuICApOiB2b2lkO1xuXG4gIHJlbmRlcigpOiB2b2lkO1xuXG4gIHJlc2V0KCk6IHZvaWQ7XG5cbiAgc2V0UmVzb2x1dGlvbkNvZWYoaW5SZXNvbHV0aW9uQ29lZjogbnVtYmVyKTogdm9pZDtcbiAgZ2V0UmVzb2x1dGlvbkNvZWYoKTogbnVtYmVyO1xuXG4gIHNldEFudGlBbGlhc2luZyhlbmFibGVkOiBib29sZWFuKTogdm9pZDtcbiAgZ2V0QW50aUFsaWFzaW5nKCk6IGJvb2xlYW47XG5cbiAgZ2V0Q3VycmVudFNpemUoKTogZ2xtLlJlYWRvbmx5VmVjMjtcbn1cblxuZXhwb3J0IGNsYXNzIFJheVRyYWNlclJlbmRlcmVyIGltcGxlbWVudHMgSVJheVRyYWNlclJlbmRlcmVyIHtcbiAgcHJpdmF0ZSBfY2FtZXJhRm92eTogbnVtYmVyO1xuXG4gIHByaXZhdGUgX2NhbnZhc1dpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgX2NhbnZhc0hlaWdodDogbnVtYmVyO1xuICBwcml2YXRlIF9yZW5kZXJXaWR0aDogbnVtYmVyO1xuICBwcml2YXRlIF9yZW5kZXJIZWlnaHQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfcmVzb2x1dGlvbkNvZWY6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgX2FudGlBbGlhc2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3JheVRyYWNlclNoYWRlclByb2dyYW06IGdyYXBoaWNzLndlYmdsMi5JVW5ib3VuZFNoYWRlcjtcbiAgcHJpdmF0ZSBfdGV4dHVyZVNoYWRlclByb2dyYW06IGdyYXBoaWNzLndlYmdsMi5JVW5ib3VuZFNoYWRlcjtcblxuICBwcml2YXRlIF9yYXlUcmFjZXJHZW9tZXRyeTogZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeTtcbiAgcHJpdmF0ZSBfc2NyZWVuR2VvbWV0cnk6IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnk7XG5cbiAgcHJpdmF0ZSBfZmluYWxUZXh0dXJlOiBncmFwaGljcy53ZWJnbDIuSVVuYm91bmRUZXh0dXJlO1xuICBwcml2YXRlIF9mcmFtZUJ1ZmZlcjogZ3JhcGhpY3Mud2ViZ2wyLklVbmJvdW5kRnJhbWVCdWZmZXI7XG5cbiAgcHJpdmF0ZSBfc2NlbmVEYXRhVGV4dHVyZTogZ3JhcGhpY3Mud2ViZ2wyLklVbmJvdW5kRGF0YVRleHR1cmU7XG4gIHByaXZhdGUgX3NwaGVyZXM6IElJbnRlcm5hbFNwaGVyZVtdID0gW107XG4gIHByaXZhdGUgX2JveGVzOiBJbnRlcm5hbEJveFtdID0gW107XG4gIHByaXZhdGUgX3RyaWFuZ2xlczogSVRyaWFuZ2xlW10gPSBbXTtcblxuICBwcml2YXRlIF9saWdodHNEYXRhVGV4dHVyZTogZ3JhcGhpY3Mud2ViZ2wyLklVbmJvdW5kRGF0YVRleHR1cmU7XG4gIHByaXZhdGUgX3N1bkxpZ2h0czogSVN1bkxpZ2h0W10gPSBbXTtcbiAgcHJpdmF0ZSBfc3BvdExpZ2h0czogSVNwb3RMaWdodFtdID0gW107XG5cbiAgcHJpdmF0ZSBfY2FtZXJhOiBJQ2FtZXJhO1xuXG4gIGNvbnN0cnVjdG9yKGluRGVmOiBJRGVmaW5pdGlvbikge1xuICAgIHRoaXMuX2NhbWVyYUZvdnkgPSBpbkRlZi5mb3Z5O1xuXG4gICAgdGhpcy5fcmVuZGVyV2lkdGggPSB0aGlzLl9jYW52YXNXaWR0aCA9IGluRGVmLmNhbnZhc1dpZHRoO1xuICAgIHRoaXMuX3JlbmRlckhlaWdodCA9IHRoaXMuX2NhbnZhc0hlaWdodCA9IGluRGVmLmNhbnZhc0hlaWdodDtcblxuICAgIHRoaXMuX3JheVRyYWNlclNoYWRlclByb2dyYW0gPSBuZXcgU2hhZGVyUHJvZ3JhbSgnUmF5VHJhY2VyUmVuZGVyZXItMScsIHtcbiAgICAgIHZlcnRleFNyYzogcmF5VHJhY2VyVmVydGV4LFxuICAgICAgZnJhZ21lbnRTcmM6IHJheVRyYWNlckZyYWdtZW50LFxuICAgICAgYXR0cmlidXRlczogWydhX3ZlcnRleFBvc2l0aW9uJywgJ2FfcGxvdFBvc2l0aW9uJ10sXG4gICAgICB1bmlmb3JtczogW1xuICAgICAgICAndV9jYW1lcmFFeWUnLFxuXG4gICAgICAgICd1X3NjZW5lVGV4dHVyZURhdGEnLFxuICAgICAgICAndV9zY2VuZVRleHR1cmVTaXplJyxcblxuICAgICAgICAndV9zcGhlcmVzU3RhcnQnLFxuICAgICAgICAndV9zcGhlcmVzU3RvcCcsXG4gICAgICAgICd1X2JveGVzU3RhcnQnLFxuICAgICAgICAndV9ib3hlc1N0b3AnLFxuICAgICAgICAndV90cmlhbmdsZXNTdGFydCcsXG4gICAgICAgICd1X3RyaWFuZ2xlc1N0b3AnLFxuXG4gICAgICAgICd1X2xpZ2h0c1RleHR1cmVEYXRhJyxcblxuICAgICAgICAndV9zdW5MaWdodHNTdGFydCcsXG4gICAgICAgICd1X3N1bkxpZ2h0c1N0b3AnLFxuICAgICAgICAndV9zcG90TGlnaHRzU3RhcnQnLFxuICAgICAgICAndV9zcG90TGlnaHRzU3RvcCdcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHRoaXMuX3RleHR1cmVTaGFkZXJQcm9ncmFtID0gbmV3IFNoYWRlclByb2dyYW0oJ1JheVRyYWNlclJlbmRlcmVyLTEnLCB7XG4gICAgICB2ZXJ0ZXhTcmM6IHRleHR1cmVWZXJ0ZXgsXG4gICAgICBmcmFnbWVudFNyYzogdGV4dHVyZUZyYWdtZW50LFxuICAgICAgYXR0cmlidXRlczogWydhX3ZlcnRleFBvc2l0aW9uJywgJ2FfdmVydGV4VGV4dHVyZUNvb3JkJ10sXG4gICAgICB1bmlmb3JtczogWyd1X3RleHR1cmUnLCAndV9zdGVwJ11cbiAgICB9KTtcblxuICAgIHRoaXMuX2ZpbmFsVGV4dHVyZSA9IG5ldyBUZXh0dXJlKCk7XG4gICAgdGhpcy5fZnJhbWVCdWZmZXIgPSBuZXcgRnJhbWVCdWZmZXIoKTtcblxuICAgIHRoaXMuX2ZpbmFsVGV4dHVyZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5fZmluYWxUZXh0dXJlLnByZUJpbmQoKGJvdW5kVGV4dHVyZSkgPT4ge1xuICAgICAgYm91bmRUZXh0dXJlLmFsbG9jYXRlKHRoaXMuX3JlbmRlcldpZHRoLCB0aGlzLl9yZW5kZXJIZWlnaHQpO1xuXG4gICAgICB0aGlzLl9mcmFtZUJ1ZmZlci5iaW5kKChib3VuZEZyYW1lQnVmZmVyKSA9PiB7XG4gICAgICAgIGJvdW5kRnJhbWVCdWZmZXIuYXR0YWNoVGV4dHVyZShib3VuZFRleHR1cmUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gdGhpcy5fZnJhbWVCdWZmZXIgPSBuZXcgRnJhbWVCdWZmZXIoe1xuICAgIC8vICAgd2lkdGg6IHRoaXMuX3JlbmRlcldpZHRoLFxuICAgIC8vICAgaGVpZ2h0OiB0aGlzLl9yZW5kZXJIZWlnaHQsXG4gICAgLy8gICBjb2xvclRleHR1cmVzOiBbXG4gICAgLy8gICAgIHRoaXMuX2ZpbmFsVGV4dHVyZSxcbiAgICAvLyAgIF0sXG4gICAgLy8gfSk7XG4gICAgLy8gdGhpcy5fZnJhbWVCdWZmZXIuYXR0YWNoVGV4dHVyZSgpO1xuXG4gICAgLy9cbiAgICAvL1xuXG4gICAgY29uc3QgZ2VvQnVpbGRlciA9IG5ldyBHZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlCdWlsZGVyKCk7XG4gICAgZ2VvQnVpbGRlclxuICAgICAgLnJlc2V0KClcbiAgICAgIC5zZXRQcmltaXRpdmVUeXBlKCd0cmlhbmdsZVN0cmlwJylcbiAgICAgIC5hZGRWYm8oKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV92ZXJ0ZXhQb3NpdGlvbicsICd2ZWMyZicpXG4gICAgICAuYWRkVmJvKClcbiAgICAgIC5zZXRWYm9Bc0R5bmFtaWMoKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV9wbG90UG9zaXRpb24nLCAndmVjM2YnKTtcblxuICAgIHRoaXMuX3JheVRyYWNlckdlb21ldHJ5ID0gbmV3IEdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeShcbiAgICAgIHRoaXMuX3JheVRyYWNlclNoYWRlclByb2dyYW0sXG4gICAgICBnZW9CdWlsZGVyLmdldERlZigpXG4gICAgKTtcblxuICAgIGNvbnN0IHJheVRyYWNlclZlcnRpY2VzID0gW107XG4gICAgcmF5VHJhY2VyVmVydGljZXMucHVzaCgrMS4wLCArMS4wKTsgLy8gdG9wIHJpZ2h0XG4gICAgcmF5VHJhY2VyVmVydGljZXMucHVzaCgtMS4wLCArMS4wKTsgLy8gdG9wIGxlZnRcbiAgICByYXlUcmFjZXJWZXJ0aWNlcy5wdXNoKCsxLjAsIC0xLjApOyAvLyBib3R0b20gcmlnaHRcbiAgICByYXlUcmFjZXJWZXJ0aWNlcy5wdXNoKC0xLjAsIC0xLjApOyAvLyBib3R0b20gbGVmdFxuXG4gICAgdGhpcy5fcmF5VHJhY2VyR2VvbWV0cnkudXBkYXRlQnVmZmVyKFxuICAgICAgMCxcbiAgICAgIHJheVRyYWNlclZlcnRpY2VzLFxuICAgICAgcmF5VHJhY2VyVmVydGljZXMubGVuZ3RoXG4gICAgKTtcbiAgICB0aGlzLl9yYXlUcmFjZXJHZW9tZXRyeS5zZXRQcmltaXRpdmVTdGFydCgwKTtcbiAgICB0aGlzLl9yYXlUcmFjZXJHZW9tZXRyeS5zZXRQcmltaXRpdmVDb3VudCg0KTtcblxuICAgIC8vXG4gICAgLy9cblxuICAgIGdlb0J1aWxkZXJcbiAgICAgIC5yZXNldCgpXG4gICAgICAuc2V0UHJpbWl0aXZlVHlwZSgndHJpYW5nbGVTdHJpcCcpXG4gICAgICAuYWRkVmJvKClcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2FfdmVydGV4UG9zaXRpb24nLCAndmVjMmYnKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV92ZXJ0ZXhUZXh0dXJlQ29vcmQnLCAndmVjMmYnKTtcblxuICAgIHRoaXMuX3NjcmVlbkdlb21ldHJ5ID0gbmV3IEdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeShcbiAgICAgIHRoaXMuX3RleHR1cmVTaGFkZXJQcm9ncmFtLFxuICAgICAgZ2VvQnVpbGRlci5nZXREZWYoKVxuICAgICk7XG5cbiAgICBjb25zdCBzY3JlZW5WZXJ0aWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBzY3JlZW5WZXJ0aWNlcy5wdXNoKCsxLjAsICsxLjAsIDEsIDEpOyAvLyB0b3AgcmlnaHRcbiAgICBzY3JlZW5WZXJ0aWNlcy5wdXNoKC0xLjAsICsxLjAsIDAsIDEpOyAvLyB0b3AgbGVmdFxuICAgIHNjcmVlblZlcnRpY2VzLnB1c2goKzEuMCwgLTEuMCwgMSwgMCk7IC8vIGJvdHRvbSByaWdodFxuICAgIHNjcmVlblZlcnRpY2VzLnB1c2goLTEuMCwgLTEuMCwgMCwgMCk7IC8vIGJvdHRvbSBsZWZ0XG5cbiAgICB0aGlzLl9zY3JlZW5HZW9tZXRyeS51cGRhdGVCdWZmZXIoMCwgc2NyZWVuVmVydGljZXMsIHNjcmVlblZlcnRpY2VzLmxlbmd0aCk7XG4gICAgdGhpcy5fc2NyZWVuR2VvbWV0cnkuc2V0UHJpbWl0aXZlU3RhcnQoMCk7XG4gICAgdGhpcy5fc2NyZWVuR2VvbWV0cnkuc2V0UHJpbWl0aXZlQ291bnQoNCk7XG5cbiAgICAvL1xuICAgIC8vXG5cbiAgICB0aGlzLl9zY2VuZURhdGFUZXh0dXJlID0gbmV3IERhdGFUZXh0dXJlKCk7XG4gICAgdGhpcy5fc2NlbmVEYXRhVGV4dHVyZS5pbml0aWFsaXplKCk7XG5cbiAgICB0aGlzLl9saWdodHNEYXRhVGV4dHVyZSA9IG5ldyBEYXRhVGV4dHVyZSgpO1xuICAgIHRoaXMuX2xpZ2h0c0RhdGFUZXh0dXJlLmluaXRpYWxpemUoKTtcblxuICAgIHRoaXMuX2NhbWVyYSA9IHtcbiAgICAgIHBvc2l0aW9uOiBnbG0udmVjMy5mcm9tVmFsdWVzKDAsIDAsIDApLFxuICAgICAgdGFyZ2V0OiBnbG0udmVjMy5mcm9tVmFsdWVzKDEuNSwgMS41LCAxLjUpLFxuICAgICAgdXA6IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMSwgMClcbiAgICB9O1xuICB9XG5cbiAgcHVzaFNwaGVyZSh7XG4gICAgcG9zaXRpb24sXG4gICAgcmFkaXVzLFxuICAgIGNvbG9yLFxuICAgIHJlZmxlY3Rpb24sXG4gICAgY2hlc3Nib2FyZCxcbiAgICBzaGFkb3dFbmFibGVkLFxuICAgIGxpZ2h0RW5hYmxlZFxuICB9OiBJUHVibGljU3BoZXJlKTogdm9pZCB7XG4gICAgaWYgKHJhZGl1cyA8PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3BoZXJlIHJhZGl1cycpO1xuICAgIGlmIChyZWZsZWN0aW9uIDwgMCB8fCByZWZsZWN0aW9uID4gMSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzcGhlcmUgcmVmbGVjdGlvbicpO1xuXG4gICAgdGhpcy5fc3BoZXJlcy5wdXNoKHtcbiAgICAgIHBvc2l0aW9uOiBbcG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdLCBwb3NpdGlvblsyXV0sXG4gICAgICByYWRpdXMsXG4gICAgICBjb2xvcjogW2NvbG9yWzBdLCBjb2xvclsxXSwgY29sb3JbMl1dLFxuICAgICAgcmVmbGVjdGlvbixcbiAgICAgIGNoZXNzYm9hcmQsXG4gICAgICBzaGFkb3dFbmFibGVkLFxuICAgICAgbGlnaHRFbmFibGVkXG4gICAgfSk7XG4gIH1cblxuICBwdXNoQm94KHtcbiAgICBwb3NpdGlvbixcbiAgICBhbmdsZVgsXG4gICAgYW5nbGVZLFxuICAgIGFuZ2xlWixcbiAgICBib3hTaXplLFxuICAgIGNvbG9yLFxuICAgIHJlZmxlY3Rpb24sXG4gICAgY2hlc3Nib2FyZCxcbiAgICBzaGFkb3dFbmFibGVkLFxuICAgIGxpZ2h0RW5hYmxlZFxuICB9OiBJUHVibGljQm94KTogdm9pZCB7XG4gICAgaWYgKGJveFNpemVbMF0gPD0gMCB8fCBib3hTaXplWzFdIDw9IDAgfHwgYm94U2l6ZVsyXSA8PSAwKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGJveCBzaXplJyk7XG4gICAgaWYgKHJlZmxlY3Rpb24gPCAwIHx8IHJlZmxlY3Rpb24gPiAxKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGJveCByZWZsZWN0aW9uJyk7XG5cbiAgICBjb25zdCBtYXQ0ID0gZ2xtLm1hdDQuY3JlYXRlKCk7XG4gICAgZ2xtLm1hdDQuaWRlbnRpdHkobWF0NCk7XG4gICAgZ2xtLm1hdDQudHJhbnNsYXRlKG1hdDQsIG1hdDQsIHBvc2l0aW9uKTtcbiAgICBnbG0ubWF0NC5yb3RhdGVZKG1hdDQsIG1hdDQsIGFuZ2xlWSk7IC8vIHZlcnRpY2FsIGF4aXMgZmlyc3RcbiAgICBnbG0ubWF0NC5yb3RhdGVaKG1hdDQsIG1hdDQsIGFuZ2xlWik7XG4gICAgZ2xtLm1hdDQucm90YXRlWChtYXQ0LCBtYXQ0LCBhbmdsZVgpO1xuXG4gICAgdGhpcy5fYm94ZXMucHVzaCh7XG4gICAgICBtYXRyaXg6IG1hdDQsXG4gICAgICBib3hTaXplOiBnbG0udmVjMy5jbG9uZShib3hTaXplKSxcbiAgICAgIGNvbG9yOiBnbG0udmVjMy5jbG9uZShjb2xvciksXG4gICAgICByZWZsZWN0aW9uLFxuICAgICAgY2hlc3Nib2FyZCxcbiAgICAgIHNoYWRvd0VuYWJsZWQsXG4gICAgICBsaWdodEVuYWJsZWRcbiAgICB9KTtcbiAgfVxuXG4gIHB1c2hUcmlhbmdsZSh7XG4gICAgdjAsXG4gICAgdjEsXG4gICAgdjIsXG4gICAgY29sb3IsXG4gICAgcmVmbGVjdGlvbixcbiAgICBzaGFkb3dFbmFibGVkLFxuICAgIGxpZ2h0RW5hYmxlZFxuICB9OiBJVHJpYW5nbGUpIHtcbiAgICBpZiAocmVmbGVjdGlvbiA8IDAgfHwgcmVmbGVjdGlvbiA+IDEpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgdHJpYW5nbGUgcmVmbGVjdGlvbicpO1xuXG4gICAgdGhpcy5fdHJpYW5nbGVzLnB1c2goe1xuICAgICAgdjA6IGdsbS52ZWMzLmNsb25lKHYwKSxcbiAgICAgIHYxOiBnbG0udmVjMy5jbG9uZSh2MSksXG4gICAgICB2MjogZ2xtLnZlYzMuY2xvbmUodjIpLFxuICAgICAgY29sb3I6IGdsbS52ZWMzLmNsb25lKGNvbG9yKSxcbiAgICAgIHJlZmxlY3Rpb24sXG4gICAgICBzaGFkb3dFbmFibGVkLFxuICAgICAgbGlnaHRFbmFibGVkXG4gICAgfSk7XG4gIH1cblxuICBwdXNoU3VuTGlnaHQoeyBkaXJlY3Rpb24sIGludGVuc2l0eSB9OiBJU3VuTGlnaHQpIHtcbiAgICAvLyBhZGQgc3VuIGxpZ2h0XG5cbiAgICBpZiAoaW50ZW5zaXR5IDw9IDApIHRocm93IG5ldyBFcnJvcignaW50ZW5zaXR5IGNhbm5vdCBiZSAwJyk7XG4gICAgaWYgKGdsbS52ZWMzLmxlbmd0aChkaXJlY3Rpb24pID09PSAwKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkaXJlY3Rpb24gY2Fubm90IGJlIDAnKTtcblxuICAgIGNvbnN0IGRpciA9IGdsbS52ZWMzLm5vcm1hbGl6ZShnbG0udmVjMy5jbG9uZShkaXJlY3Rpb24pLCBkaXJlY3Rpb24pO1xuXG4gICAgdGhpcy5fc3VuTGlnaHRzLnB1c2goeyBkaXJlY3Rpb246IGRpciwgaW50ZW5zaXR5IH0pO1xuICB9XG5cbiAgcHVzaFNwb3RMaWdodCh7IHBvc2l0aW9uLCBpbnRlbnNpdHksIHJhZGl1cyB9OiBJU3BvdExpZ2h0KTogdm9pZCB7XG4gICAgLy8gYWRkIHNwb3QgbGlnaHRcblxuICAgIGlmIChpbnRlbnNpdHkgPD0gMCkgdGhyb3cgbmV3IEVycm9yKCdpbnRlbnNpdHkgY2Fubm90IGJlIDAnKTtcbiAgICBpZiAocmFkaXVzIDw9IDApIHRocm93IG5ldyBFcnJvcigncmFkaXVzIGNhbm5vdCBiZSA8PSAwJyk7XG5cbiAgICB0aGlzLl9zcG90TGlnaHRzLnB1c2goe1xuICAgICAgcG9zaXRpb246IGdsbS52ZWMzLmNsb25lKHBvc2l0aW9uKSxcbiAgICAgIGludGVuc2l0eSxcbiAgICAgIHJhZGl1c1xuICAgIH0pO1xuICB9XG5cbiAgbG9va0F0KFxuICAgIGV5ZTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICB0YXJnZXQ6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgdXA6IGdsbS5SZWFkb25seVZlYzNcbiAgKSB7XG4gICAgLy8gY29uc3QgbGVmdERpciA9IGdsbS52ZWMzLmNyb3NzKGdsbS52ZWMzLmNyZWF0ZSgpLCBmb3J3YXJkRGlyLCB0aGlzLl9jYW1lcmEudXApO1xuICAgIC8vIGNvbnN0IHVwRGlyID0gZ2xtLnZlYzMuY3Jvc3MoZ2xtLnZlYzMuY3JlYXRlKCksIGxlZnREaXIsIGZvcndhcmREaXIpO1xuXG4gICAgZ2xtLnZlYzMuY29weSh0aGlzLl9jYW1lcmEucG9zaXRpb24sIGV5ZSk7XG5cbiAgICAvL1xuICAgIC8vXG5cbiAgICAvLyBnbG0udmVjMy5jb3B5KHRoaXMuX2NhbWVyYS50YXJnZXQsIHRhcmdldCk7XG4gICAgbGV0IGZvcndhcmREaXIgPSBnbG0udmVjMy5zdWIoZ2xtLnZlYzMuY3JlYXRlKCksIHRhcmdldCwgZXllKTtcbiAgICBmb3J3YXJkRGlyID0gZ2xtLnZlYzMubm9ybWFsaXplKGZvcndhcmREaXIsIGZvcndhcmREaXIpO1xuICAgIGZvcndhcmREaXIgPSBnbG0udmVjMy5hZGQoZm9yd2FyZERpciwgZXllLCBmb3J3YXJkRGlyKTtcbiAgICBnbG0udmVjMy5jb3B5KHRoaXMuX2NhbWVyYS50YXJnZXQsIGZvcndhcmREaXIpO1xuXG4gICAgLy9cbiAgICAvL1xuXG4gICAgLy8gZ2xtLnZlYzMuY29weSh0aGlzLl9jYW1lcmEudXAsIHVwKTtcbiAgICBjb25zdCB1cERpciA9IGdsbS52ZWMzLm5vcm1hbGl6ZShnbG0udmVjMy5jcmVhdGUoKSwgdXApO1xuICAgIGdsbS52ZWMzLmNvcHkodGhpcy5fY2FtZXJhLnVwLCB1cERpcik7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgLy8gZ2wuZGlzYWJsZShnbC5ERVBUSF9URVNUKTtcblxuICAgIGNvbnN0IGZhckNvcm5lcnMgPSB0aGlzLl9jb21wdXRlQ2FtZXJhRmFyQ29ybmVycygpO1xuICAgIHRoaXMuX3JheVRyYWNlckdlb21ldHJ5LnVwZGF0ZUJ1ZmZlcigxLCBmYXJDb3JuZXJzLCBmYXJDb3JuZXJzLmxlbmd0aCk7XG5cbiAgICBjb25zdCBzY2FsZWRXaWR0aCA9IE1hdGguZmxvb3IodGhpcy5fcmVuZGVyV2lkdGgpO1xuICAgIGNvbnN0IHNjYWxlZEhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5fcmVuZGVySGVpZ2h0KTtcblxuICAgIHRoaXMuX2ZyYW1lQnVmZmVyLmJpbmQoKCkgPT4ge1xuICAgICAgZ2wudmlld3BvcnQoMCwgMCwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCk7XG4gICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIC8qfCBnbC5ERVBUSF9CVUZGRVJfQklUKi8pO1xuICAgICAgLy8gZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuXG4gICAgICB7XG4gICAgICAgIC8vIHJheXRyYWNpbmcgcGFzc1xuXG4gICAgICAgIGNvbnN0IHNoYWRlciA9IHRoaXMuX3JheVRyYWNlclNoYWRlclByb2dyYW07XG5cbiAgICAgICAgc2hhZGVyLmJpbmQoKGJvdW5kU2hhZGVyKSA9PiB7XG4gICAgICAgICAgYm91bmRTaGFkZXIuc2V0RmxvYXQzVW5pZm9ybShcbiAgICAgICAgICAgICd1X2NhbWVyYUV5ZScsXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEucG9zaXRpb25bMF0sXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEucG9zaXRpb25bMV0sXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEucG9zaXRpb25bMl1cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vXG5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBzY2VuZSBkYXRhXG5cbiAgICAgICAgICAgIGNvbnN0IHNjZW5lRGF0YVZhbHVlczogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gc3BoZXJlc1xuXG4gICAgICAgICAgICAgICAgYm91bmRTaGFkZXIuc2V0SW50ZWdlcjFVbmlmb3JtKCd1X3NwaGVyZXNTdGFydCcsIDApO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzcGhlcmUgb2YgdGhpcy5fc3BoZXJlcykge1xuICAgICAgICAgICAgICAgICAgLy8gYWRkIHNwaGVyZVxuXG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgc3BoZXJlLnBvc2l0aW9uWzBdLFxuICAgICAgICAgICAgICAgICAgICBzcGhlcmUucG9zaXRpb25bMV0sXG4gICAgICAgICAgICAgICAgICAgIHNwaGVyZS5wb3NpdGlvblsyXVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHNjZW5lRGF0YVZhbHVlcy5wdXNoKHNwaGVyZS5yYWRpdXMpO1xuXG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgc3BoZXJlLmNvbG9yWzBdLFxuICAgICAgICAgICAgICAgICAgICBzcGhlcmUuY29sb3JbMV0sXG4gICAgICAgICAgICAgICAgICAgIHNwaGVyZS5jb2xvclsyXVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHNjZW5lRGF0YVZhbHVlcy5wdXNoKHNwaGVyZS5yZWZsZWN0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgc2NlbmVEYXRhVmFsdWVzLnB1c2goc3BoZXJlLnNoYWRvd0VuYWJsZWQgPyAxIDogMCk7XG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMucHVzaChzcGhlcmUubGlnaHRFbmFibGVkID8gMSA6IDApO1xuXG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMucHVzaChzcGhlcmUuY2hlc3Nib2FyZCA/IDEgOiAwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBib3VuZFNoYWRlci5zZXRJbnRlZ2VyMVVuaWZvcm0oXG4gICAgICAgICAgICAgICAgICAndV9zcGhlcmVzU3RvcCcsXG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSAvLyBzcGhlcmVzXG5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGJveGVzXG5cbiAgICAgICAgICAgICAgICBib3VuZFNoYWRlci5zZXRJbnRlZ2VyMVVuaWZvcm0oXG4gICAgICAgICAgICAgICAgICAndV9ib3hlc1N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgIHNjZW5lRGF0YVZhbHVlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBib3ggb2YgdGhpcy5fYm94ZXMpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGFkZCBib3hcblxuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IDE2OyArK2lpKVxuICAgICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMucHVzaChib3gubWF0cml4W2lpXSk7XG5cbiAgICAgICAgICAgICAgICAgIHNjZW5lRGF0YVZhbHVlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBib3guYm94U2l6ZVswXSxcbiAgICAgICAgICAgICAgICAgICAgYm94LmJveFNpemVbMV0sXG4gICAgICAgICAgICAgICAgICAgIGJveC5ib3hTaXplWzJdXG4gICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgYm94LmNvbG9yWzBdLFxuICAgICAgICAgICAgICAgICAgICBib3guY29sb3JbMV0sXG4gICAgICAgICAgICAgICAgICAgIGJveC5jb2xvclsyXVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHNjZW5lRGF0YVZhbHVlcy5wdXNoKGJveC5yZWZsZWN0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgc2NlbmVEYXRhVmFsdWVzLnB1c2goYm94LnNoYWRvd0VuYWJsZWQgPyAxIDogMCk7XG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMucHVzaChib3gubGlnaHRFbmFibGVkID8gMSA6IDApO1xuXG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMucHVzaChib3guY2hlc3Nib2FyZCA/IDEgOiAwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBib3VuZFNoYWRlci5zZXRJbnRlZ2VyMVVuaWZvcm0oXG4gICAgICAgICAgICAgICAgICAndV9ib3hlc1N0b3AnLFxuICAgICAgICAgICAgICAgICAgc2NlbmVEYXRhVmFsdWVzLmxlbmd0aFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gLy8gYm94ZXNcblxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gdHJpYW5nbGVzXG5cbiAgICAgICAgICAgICAgICBib3VuZFNoYWRlci5zZXRJbnRlZ2VyMVVuaWZvcm0oXG4gICAgICAgICAgICAgICAgICAndV90cmlhbmdsZXNTdGFydCcsXG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdHJpYW5nbGUgb2YgdGhpcy5fdHJpYW5nbGVzKSB7XG4gICAgICAgICAgICAgICAgICAvLyBhZGQgdHJpYW5nbGVcblxuICAgICAgICAgICAgICAgICAgc2NlbmVEYXRhVmFsdWVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHRyaWFuZ2xlLnYwWzBdLFxuICAgICAgICAgICAgICAgICAgICB0cmlhbmdsZS52MFsxXSxcbiAgICAgICAgICAgICAgICAgICAgdHJpYW5nbGUudjBbMl1cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgdHJpYW5nbGUudjFbMF0sXG4gICAgICAgICAgICAgICAgICAgIHRyaWFuZ2xlLnYxWzFdLFxuICAgICAgICAgICAgICAgICAgICB0cmlhbmdsZS52MVsyXVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHNjZW5lRGF0YVZhbHVlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICB0cmlhbmdsZS52MlswXSxcbiAgICAgICAgICAgICAgICAgICAgdHJpYW5nbGUudjJbMV0sXG4gICAgICAgICAgICAgICAgICAgIHRyaWFuZ2xlLnYyWzJdXG4gICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgdHJpYW5nbGUuY29sb3JbMF0sXG4gICAgICAgICAgICAgICAgICAgIHRyaWFuZ2xlLmNvbG9yWzFdLFxuICAgICAgICAgICAgICAgICAgICB0cmlhbmdsZS5jb2xvclsyXVxuICAgICAgICAgICAgICAgICAgKTsgLy8gY29sb3JcbiAgICAgICAgICAgICAgICAgIHNjZW5lRGF0YVZhbHVlcy5wdXNoKHRyaWFuZ2xlLnJlZmxlY3Rpb24pOyAvLyByZWZsZWN0aW9uXG5cbiAgICAgICAgICAgICAgICAgIHNjZW5lRGF0YVZhbHVlcy5wdXNoKHRyaWFuZ2xlLnNoYWRvd0VuYWJsZWQgPyAxIDogMCk7IC8vIHNoYWRvd0VuYWJsZWRcbiAgICAgICAgICAgICAgICAgIHNjZW5lRGF0YVZhbHVlcy5wdXNoKHRyaWFuZ2xlLmxpZ2h0RW5hYmxlZCA/IDEgOiAwKTsgLy8gbGlnaHRFbmFibGVkXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYm91bmRTaGFkZXIuc2V0SW50ZWdlcjFVbmlmb3JtKFxuICAgICAgICAgICAgICAgICAgJ3VfdHJpYW5nbGVzU3RvcCcsXG4gICAgICAgICAgICAgICAgICBzY2VuZURhdGFWYWx1ZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSAvLyB0cmlhbmdsZXNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIDApO1xuICAgICAgICAgICAgdGhpcy5fc2NlbmVEYXRhVGV4dHVyZS5wcmVCaW5kKChib3VuZERhdGFUZXh0dXJlKSA9PiB7XG4gICAgICAgICAgICAgIGJvdW5kRGF0YVRleHR1cmUudXBkYXRlKHNjZW5lRGF0YVZhbHVlcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYm91bmRTaGFkZXIuc2V0SW50ZWdlcjFVbmlmb3JtKCd1X3NjZW5lVGV4dHVyZURhdGEnLCAwKTtcbiAgICAgICAgICAgIGJvdW5kU2hhZGVyLnNldEludGVnZXIxVW5pZm9ybShcbiAgICAgICAgICAgICAgJ3Vfc2NlbmVUZXh0dXJlU2l6ZScsXG4gICAgICAgICAgICAgIHNjZW5lRGF0YVZhbHVlcy5sZW5ndGhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSAvLyBzY2VuZSBkYXRhXG5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBsaWdodHMgZGF0YVxuXG4gICAgICAgICAgICBjb25zdCBsaWdodHNEYXRhVmFsdWVzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIC8vIHN1biBsaWdodHNcblxuICAgICAgICAgICAgICBib3VuZFNoYWRlci5zZXRJbnRlZ2VyMVVuaWZvcm0oJ3Vfc3VuTGlnaHRzU3RhcnQnLCAwKTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1bkxpZ2h0IG9mIHRoaXMuX3N1bkxpZ2h0cykge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBzdW4gbGlnaHRcblxuICAgICAgICAgICAgICAgIGxpZ2h0c0RhdGFWYWx1ZXMucHVzaChcbiAgICAgICAgICAgICAgICAgIHN1bkxpZ2h0LmRpcmVjdGlvblswXSxcbiAgICAgICAgICAgICAgICAgIHN1bkxpZ2h0LmRpcmVjdGlvblsxXSxcbiAgICAgICAgICAgICAgICAgIHN1bkxpZ2h0LmRpcmVjdGlvblsyXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgbGlnaHRzRGF0YVZhbHVlcy5wdXNoKHN1bkxpZ2h0LmludGVuc2l0eSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBib3VuZFNoYWRlci5zZXRJbnRlZ2VyMVVuaWZvcm0oXG4gICAgICAgICAgICAgICAgJ3Vfc3VuTGlnaHRzU3RvcCcsXG4gICAgICAgICAgICAgICAgbGlnaHRzRGF0YVZhbHVlcy5sZW5ndGhcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gLy8gc3VuIGxpZ2h0c1xuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIC8vIHNwb3QgbGlnaHRzXG5cbiAgICAgICAgICAgICAgYm91bmRTaGFkZXIuc2V0SW50ZWdlcjFVbmlmb3JtKFxuICAgICAgICAgICAgICAgICd1X3Nwb3RMaWdodHNTdGFydCcsXG4gICAgICAgICAgICAgICAgbGlnaHRzRGF0YVZhbHVlcy5sZW5ndGhcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNwb3RMaWdodCBvZiB0aGlzLl9zcG90TGlnaHRzKSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIHNwb3QgbGlnaHRcblxuICAgICAgICAgICAgICAgIGxpZ2h0c0RhdGFWYWx1ZXMucHVzaChcbiAgICAgICAgICAgICAgICAgIHNwb3RMaWdodC5wb3NpdGlvblswXSxcbiAgICAgICAgICAgICAgICAgIHNwb3RMaWdodC5wb3NpdGlvblsxXSxcbiAgICAgICAgICAgICAgICAgIHNwb3RMaWdodC5wb3NpdGlvblsyXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgbGlnaHRzRGF0YVZhbHVlcy5wdXNoKHNwb3RMaWdodC5yYWRpdXMpO1xuICAgICAgICAgICAgICAgIGxpZ2h0c0RhdGFWYWx1ZXMucHVzaChzcG90TGlnaHQuaW50ZW5zaXR5KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJvdW5kU2hhZGVyLnNldEludGVnZXIxVW5pZm9ybShcbiAgICAgICAgICAgICAgICAndV9zcG90TGlnaHRzU3RvcCcsXG4gICAgICAgICAgICAgICAgbGlnaHRzRGF0YVZhbHVlcy5sZW5ndGhcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gLy8gc3BvdCBsaWdodHNcblxuICAgICAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIDEpO1xuICAgICAgICAgICAgdGhpcy5fbGlnaHRzRGF0YVRleHR1cmUucHJlQmluZCgoYm91bmREYXRhVGV4dHVyZSkgPT4ge1xuICAgICAgICAgICAgICBib3VuZERhdGFUZXh0dXJlLnVwZGF0ZShsaWdodHNEYXRhVmFsdWVzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBib3VuZFNoYWRlci5zZXRJbnRlZ2VyMVVuaWZvcm0oJ3VfbGlnaHRzVGV4dHVyZURhdGEnLCAxKTtcbiAgICAgICAgICB9IC8vIGxpZ2h0cyBkYXRhXG5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vXG4gICAgICAgICAgLy9cblxuICAgICAgICAgIHRoaXMuX3JheVRyYWNlckdlb21ldHJ5LnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0gLy8gcmF5dHJhY2luZyBwYXNzXG4gICAgfSk7XG5cbiAgICBnbC52aWV3cG9ydCgwLCAwLCB0aGlzLl9jYW52YXNXaWR0aCwgdGhpcy5fY2FudmFzSGVpZ2h0KTtcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIC8qfCBnbC5ERVBUSF9CVUZGRVJfQklUKi8pO1xuXG4gICAge1xuICAgICAgLy8gdGV4dHVyZSBwYXNzXG5cbiAgICAgIGNvbnN0IHNoYWRlciA9IHRoaXMuX3RleHR1cmVTaGFkZXJQcm9ncmFtO1xuXG4gICAgICBzaGFkZXIuYmluZCgoYm91bmRTaGFkZXIpID0+IHtcbiAgICAgICAgLy8gc2hhZGVyLnNldEludGVnZXIxVW5pZm9ybSgndV90ZXh0dXJlJywgMCk7XG4gICAgICAgIC8vIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyAwKTtcbiAgICAgICAgLy8gdGhpcy5fZmluYWxUZXh0dXJlLmJpbmQoKTtcbiAgICAgICAgYm91bmRTaGFkZXIuc2V0VGV4dHVyZVVuaWZvcm0oJ3VfdGV4dHVyZScsIHRoaXMuX2ZpbmFsVGV4dHVyZSwgMCk7XG5cbiAgICAgICAgLy8gYW50aSBhbGlhc2luZyBzZXR1cFxuXG4gICAgICAgIC8vIGNvbnN0IHVfc3RlcCA9IGJvdW5kU2hhZGVyLmdldFVuaWZvcm0oJ3Vfc3RlcCcpO1xuXG4gICAgICAgIGlmICh0aGlzLl9hbnRpQWxpYXNpbmcpIHtcbiAgICAgICAgICBjb25zdCBzdGVwWCA9ICgxIC0gdGhpcy5fcmVuZGVyV2lkdGggLyB0aGlzLl9jYW52YXNXaWR0aCkgKiAwLjAwNTtcbiAgICAgICAgICBjb25zdCBzdGVwWSA9ICgxIC0gdGhpcy5fcmVuZGVySGVpZ2h0IC8gdGhpcy5fY2FudmFzSGVpZ2h0KSAqIDAuMDA1O1xuXG4gICAgICAgICAgYm91bmRTaGFkZXIuc2V0RmxvYXQyVW5pZm9ybSgndV9zdGVwJywgc3RlcFgsIHN0ZXBZKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib3VuZFNoYWRlci5zZXRGbG9hdDJVbmlmb3JtKCd1X3N0ZXAnLCAwLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NjcmVlbkdlb21ldHJ5LnJlbmRlcigpO1xuICAgICAgfSk7XG4gICAgfSAvLyB0ZXh0dXJlIHBhc3NcblxuICAgIC8vIFNoYWRlclByb2dyYW0udW5iaW5kKCk7XG5cbiAgICAvLyBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdW5MaWdodHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9zcG90TGlnaHRzLmxlbmd0aCA9IDA7XG5cbiAgICB0aGlzLl9zcGhlcmVzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fYm94ZXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLl90cmlhbmdsZXMubGVuZ3RoID0gMDtcbiAgfVxuXG4gIHNldFJlc29sdXRpb25Db2VmKGluUmVzb2x1dGlvbkNvZWY6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIGluUmVzb2x1dGlvbkNvZWYgPT09IHRoaXMuX3Jlc29sdXRpb25Db2VmIHx8XG4gICAgICBpblJlc29sdXRpb25Db2VmIDw9IDAgfHxcbiAgICAgIGluUmVzb2x1dGlvbkNvZWYgPiAxXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcmVzb2x1dGlvbkNvZWYgPSBpblJlc29sdXRpb25Db2VmO1xuXG4gICAgdGhpcy5fcmVuZGVyV2lkdGggPSBNYXRoLmZsb29yKHRoaXMuX2NhbnZhc1dpZHRoICogdGhpcy5fcmVzb2x1dGlvbkNvZWYpO1xuICAgIHRoaXMuX3JlbmRlckhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5fY2FudmFzSGVpZ2h0ICogdGhpcy5fcmVzb2x1dGlvbkNvZWYpO1xuXG4gICAgdGhpcy5fZmluYWxUZXh0dXJlLnByZUJpbmQoKGJvdW5kVGV4dHVyZSkgPT4ge1xuICAgICAgYm91bmRUZXh0dXJlLnJlc2l6ZSh0aGlzLl9yZW5kZXJXaWR0aCwgdGhpcy5fcmVuZGVySGVpZ2h0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFJlc29sdXRpb25Db2VmKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc29sdXRpb25Db2VmO1xuICB9XG5cbiAgc2V0QW50aUFsaWFzaW5nKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hbnRpQWxpYXNpbmcgPSBlbmFibGVkO1xuICB9XG5cbiAgZ2V0QW50aUFsaWFzaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hbnRpQWxpYXNpbmc7XG4gIH1cblxuICBnZXRDdXJyZW50U2l6ZSgpOiBnbG0uUmVhZG9ubHlWZWMyIHtcbiAgICByZXR1cm4gW3RoaXMuX3JlbmRlcldpZHRoLCB0aGlzLl9yZW5kZXJIZWlnaHRdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcHV0ZUNhbWVyYUZhckNvcm5lcnMoKTogUmVhZG9ubHlBcnJheTxudW1iZXI+IHtcbiAgICBjb25zdCBmb3J3YXJkRGlyID0gZ2xtLnZlYzMuc3ViKFxuICAgICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICB0aGlzLl9jYW1lcmEudGFyZ2V0LFxuICAgICAgdGhpcy5fY2FtZXJhLnBvc2l0aW9uXG4gICAgKTtcblxuICAgIGNvbnN0IGxlZnREaXIgPSBnbG0udmVjMy5jcm9zcyhcbiAgICAgIGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgZm9yd2FyZERpcixcbiAgICAgIHRoaXMuX2NhbWVyYS51cFxuICAgICk7XG4gICAgY29uc3QgdXBEaXIgPSBnbG0udmVjMy5jcm9zcyhnbG0udmVjMy5jcmVhdGUoKSwgbGVmdERpciwgZm9yd2FyZERpcik7XG5cbiAgICBjb25zdCByYWRIRm92eSA9IF9kZWdyZWVUb1JhZCh0aGlzLl9jYW1lcmFGb3Z5ICogMC41KTtcbiAgICBjb25zdCB4TGVuZ3RoID0gKE1hdGguY29zKHJhZEhGb3Z5KSAqIDEpIC8gTWF0aC5zaW4ocmFkSEZvdnkpO1xuXG4gICAgY29uc3Qgc2NhbGVkRm9yd2FyZERpciA9IGdsbS52ZWMzLm11bHRpcGx5KFxuICAgICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICBmb3J3YXJkRGlyLFxuICAgICAgZ2xtLnZlYzMuZnJvbVZhbHVlcyh4TGVuZ3RoLCB4TGVuZ3RoLCB4TGVuZ3RoKVxuICAgICk7XG4gICAgY29uc3QgZmFyQ2VudGVyID0gZ2xtLnZlYzMuYWRkKFxuICAgICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICB0aGlzLl9jYW1lcmEucG9zaXRpb24sXG4gICAgICBzY2FsZWRGb3J3YXJkRGlyXG4gICAgKTtcblxuICAgIGNvbnN0IGFzcGVjdFJhdGlvID0gdGhpcy5fY2FudmFzV2lkdGggLyB0aGlzLl9jYW52YXNIZWlnaHQ7XG4gICAgY29uc3QgZmFySGFsZldpZHRoID0gZ2xtLnZlYzMubXVsdGlwbHkoXG4gICAgICBnbG0udmVjMy5jcmVhdGUoKSxcbiAgICAgIGxlZnREaXIsXG4gICAgICBnbG0udmVjMy5mcm9tVmFsdWVzKGFzcGVjdFJhdGlvLCBhc3BlY3RSYXRpbywgYXNwZWN0UmF0aW8pXG4gICAgKTtcblxuICAgIGNvbnN0IGZhclVwID0gZ2xtLnZlYzMuYWRkKGdsbS52ZWMzLmNyZWF0ZSgpLCBmYXJDZW50ZXIsIHVwRGlyKTtcbiAgICBjb25zdCBmYXJCb3R0b20gPSBnbG0udmVjMy5zdWJ0cmFjdChnbG0udmVjMy5jcmVhdGUoKSwgZmFyQ2VudGVyLCB1cERpcik7XG4gICAgY29uc3QgZmFyVG9wTGVmdCA9IGdsbS52ZWMzLnN1YnRyYWN0KFxuICAgICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICBmYXJVcCxcbiAgICAgIGZhckhhbGZXaWR0aFxuICAgICk7XG4gICAgY29uc3QgZmFyQm90dG9tTGVmdCA9IGdsbS52ZWMzLnN1YnRyYWN0KFxuICAgICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICBmYXJCb3R0b20sXG4gICAgICBmYXJIYWxmV2lkdGhcbiAgICApO1xuICAgIGNvbnN0IGZhclRvcFJpZ2h0ID0gZ2xtLnZlYzMuYWRkKGdsbS52ZWMzLmNyZWF0ZSgpLCBmYXJVcCwgZmFySGFsZldpZHRoKTtcbiAgICBjb25zdCBmYXJCb3R0b21SaWdodCA9IGdsbS52ZWMzLmFkZChcbiAgICAgIGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgZmFyQm90dG9tLFxuICAgICAgZmFySGFsZldpZHRoXG4gICAgKTtcblxuICAgIHJldHVybiBbXG4gICAgICBmYXJUb3BSaWdodFswXSxcbiAgICAgIGZhclRvcFJpZ2h0WzFdLFxuICAgICAgZmFyVG9wUmlnaHRbMl0sXG4gICAgICBmYXJUb3BMZWZ0WzBdLFxuICAgICAgZmFyVG9wTGVmdFsxXSxcbiAgICAgIGZhclRvcExlZnRbMl0sXG4gICAgICBmYXJCb3R0b21SaWdodFswXSxcbiAgICAgIGZhckJvdHRvbVJpZ2h0WzFdLFxuICAgICAgZmFyQm90dG9tUmlnaHRbMl0sXG4gICAgICBmYXJCb3R0b21MZWZ0WzBdLFxuICAgICAgZmFyQm90dG9tTGVmdFsxXSxcbiAgICAgIGZhckJvdHRvbUxlZnRbMl1cbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNhbnZhc1dpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLl9jYW52YXNXaWR0aDtcbiAgfVxuICBnZXQgY2FudmFzSGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLl9jYW52YXNIZWlnaHQ7XG4gIH1cbiAgZ2V0IHJlbmRlcldpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJXaWR0aDtcbiAgfVxuICBnZXQgcmVuZGVySGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJIZWlnaHQ7XG4gIH1cblxuICBnZXQgY2FtZXJhKCk6IFJlYWRvbmx5PElDYW1lcmE+IHtcbiAgICByZXR1cm4gdGhpcy5fY2FtZXJhO1xuICB9XG5cbiAgZ2V0IHNwaGVyZXMoKTogUmVhZG9ubHlBcnJheTxJSW50ZXJuYWxTcGhlcmU+IHtcbiAgICByZXR1cm4gdGhpcy5fc3BoZXJlcztcbiAgfVxuICBnZXQgYm94ZXMoKTogUmVhZG9ubHlBcnJheTxJbnRlcm5hbEJveD4ge1xuICAgIHJldHVybiB0aGlzLl9ib3hlcztcbiAgfVxuICBnZXQgdHJpYW5nbGVzKCk6IFJlYWRvbmx5QXJyYXk8SVRyaWFuZ2xlPiB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaWFuZ2xlcztcbiAgfVxuXG4gIGdldCBzdW5MaWdodHMoKTogUmVhZG9ubHlBcnJheTxJU3VuTGlnaHQ+IHtcbiAgICByZXR1cm4gdGhpcy5fc3VuTGlnaHRzO1xuICB9XG4gIGdldCBzcG90TGlnaHRzKCk6IFJlYWRvbmx5QXJyYXk8SVNwb3RMaWdodD4ge1xuICAgIHJldHVybiB0aGlzLl9zcG90TGlnaHRzO1xuICB9XG59XG4iLAogICJpbXBvcnQgeyBncmFwaGljcyB9IGZyb20gJ0Bsb2NhbC1mcmFtZXdvcmsnO1xuY29uc3Qge1xuICBXZWJHTENvbnRleHQsXG59ID0gZ3JhcGhpY3Mud2ViZ2wyO1xuY29uc3Qge1xuICBDYW1lcmEsXG59ID0gZ3JhcGhpY3MuY2FtZXJhO1xuY29uc3Qge1xuICBUZXh0UmVuZGVyZXIsXG4gIFN0YWNrUmVuZGVyZXJzLFxufSA9IGdyYXBoaWNzLnJlbmRlcmVycztcblxuaW1wb3J0IHtcbiAgUmF5VHJhY2VyUmVuZGVyZXIsXG4gIElUcmlhbmdsZSxcbiAgSVB1YmxpY1NwaGVyZSxcbiAgSVJheVRyYWNlclJlbmRlcmVyLFxuICBJbnRlcm5hbEJveCxcbn0gZnJvbSAnLi9yZW5kZXJlcnMnO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuLy9cblxuY29uc3Qga19mb3Z5ID0gNzA7XG5cbmludGVyZmFjZSBJRGVmaW5pdGlvbiB7XG4gIGNhbnZhc0RvbUVsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xufVxuXG5leHBvcnQgY2xhc3MgUmVuZGVyZXIge1xuICBwcml2YXRlIF9kZWY6IElEZWZpbml0aW9uO1xuXG4gIHByaXZhdGUgX3JheVRyYWNlclJlbmRlcmVyOiBSYXlUcmFjZXJSZW5kZXJlcjtcbiAgcHJpdmF0ZSBfdGV4dFJlbmRlcmVyOiBncmFwaGljcy5yZW5kZXJlcnMuVGV4dFJlbmRlcmVyO1xuICBwcml2YXRlIF9zdGFja1JlbmRlcmVyczogZ3JhcGhpY3MucmVuZGVyZXJzLlN0YWNrUmVuZGVyZXJzO1xuXG4gIHByaXZhdGUgX2RlYnVnU2NlbmVDYW1lcmEgPSBuZXcgQ2FtZXJhKCk7XG4gIHByaXZhdGUgX21haW5IdWRDYW1lcmEgPSBuZXcgQ2FtZXJhKCk7XG5cbiAgY29uc3RydWN0b3IoZGVmOiBJRGVmaW5pdGlvbikge1xuICAgIHRoaXMuX2RlZiA9IGRlZjtcblxuICAgIHRoaXMucmVzaXplKFxuICAgICAgdGhpcy5fZGVmLmNhbnZhc0RvbUVsZW1lbnQud2lkdGgsXG4gICAgICB0aGlzLl9kZWYuY2FudmFzRG9tRWxlbWVudC5oZWlnaHRcbiAgICApO1xuXG4gICAgV2ViR0xDb250ZXh0LmluaXRpYWxpemUodGhpcy5fZGVmLmNhbnZhc0RvbUVsZW1lbnQpO1xuXG4gICAgdGhpcy5fcmF5VHJhY2VyUmVuZGVyZXIgPSBuZXcgUmF5VHJhY2VyUmVuZGVyZXIoe1xuICAgICAgY2FudmFzV2lkdGg6IHRoaXMuX2RlZi5jYW52YXNEb21FbGVtZW50LndpZHRoLFxuICAgICAgY2FudmFzSGVpZ2h0OiB0aGlzLl9kZWYuY2FudmFzRG9tRWxlbWVudC5oZWlnaHQsXG4gICAgICBmb3Z5OiBrX2ZvdnlcbiAgICB9KTtcbiAgICB0aGlzLl90ZXh0UmVuZGVyZXIgPSBuZXcgVGV4dFJlbmRlcmVyKCk7XG4gICAgdGhpcy5fc3RhY2tSZW5kZXJlcnMgPSBuZXcgU3RhY2tSZW5kZXJlcnMoKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgLy8gZm90IHRoZSBkYXRhIHRleHR1cmUgdG8gZ290IGZyb20gXCJmbG9hdCB0byBmbG9hdFwiXG4gICAgLy8gPT4gaW5zdGVhZCBvZiBcInZlYzQgdG8gdmVjNFwiXG4gICAgY29uc3QgYWxpZ25tZW50ID0gMTtcbiAgICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfQUxJR05NRU5ULCBhbGlnbm1lbnQpO1xuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vIGluaXRpYWxpemUgV2ViR0xcblxuICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgZ2wuZGlzYWJsZShnbC5CTEVORCk7XG4gICAgZ2wuZGlzYWJsZShnbC5DVUxMX0ZBQ0UpO1xuICAgIGdsLmRlcHRoRnVuYyhnbC5ORVZFUik7XG5cbiAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XG4gICAgZ2wuY2xlYXJEZXB0aCgxLjApO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5fZGVidWdTY2VuZUNhbWVyYS5zZXRWaWV3cG9ydFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5fZGVidWdTY2VuZUNhbWVyYS5zZXRBc1BlcnNwZWN0aXZlKHtcbiAgICAgIGZvdnk6IGtfZm92eSxcbiAgICAgIG5lYXI6IDEsXG4gICAgICBmYXI6IDUwMFxuICAgIH0pO1xuXG4gICAgdGhpcy5fbWFpbkh1ZENhbWVyYS5zZXRWaWV3cG9ydFNpemUod2lkdGgsIGhlaWdodCk7XG5cbiAgICBjb25zdCBoV2lkdGggPSB3aWR0aCAqIDAuNTtcbiAgICBjb25zdCBoSGVpZ2h0ID0gaGVpZ2h0ICogMC41O1xuXG4gICAgdGhpcy5fbWFpbkh1ZENhbWVyYS5zZXRBc09ydGhvZ29uYWwoe1xuICAgICAgbGVmdDogLWhXaWR0aCxcbiAgICAgIHJpZ2h0OiAraFdpZHRoLFxuICAgICAgdG9wOiAtaEhlaWdodCxcbiAgICAgIGJvdHRvbTogK2hIZWlnaHQsXG4gICAgICBuZWFyOiAtMjAwLFxuICAgICAgZmFyOiAyMDBcbiAgICB9KTtcbiAgICB0aGlzLl9tYWluSHVkQ2FtZXJhLnNldEV5ZShbaFdpZHRoLCBoSGVpZ2h0LCAxXSk7XG4gICAgdGhpcy5fbWFpbkh1ZENhbWVyYS5zZXRUYXJnZXQoW2hXaWR0aCwgaEhlaWdodCwgMF0pO1xuICAgIHRoaXMuX21haW5IdWRDYW1lcmEuc2V0VXBBeGlzKFswLCAxLCAwXSk7XG4gICAgdGhpcy5fbWFpbkh1ZENhbWVyYS5jb21wdXRlTWF0cmljZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3B1c2hXaXJlRnJhbWVTcGhlcmUoc3BoZXJlOiBJUHVibGljU3BoZXJlKSB7XG4gICAgY29uc3QgWCA9IDAuNTI1NzMxMTEyMTE5MTMzNjA2ICogc3BoZXJlLnJhZGl1cztcbiAgICBjb25zdCBaID0gMC44NTA2NTA4MDgzNTIwMzk5MzIgKiBzcGhlcmUucmFkaXVzO1xuICAgIGNvbnN0IE4gPSAwLjA7XG5cbiAgICBjb25zdCBwb3NpdGlvbnM6IFJlYWRvbmx5QXJyYXk8Z2xtLnZlYzM+ID0gW1xuICAgICAgWy1YLCBOLCBaXSxcbiAgICAgIFtYLCBOLCBaXSxcbiAgICAgIFstWCwgTiwgLVpdLFxuICAgICAgW1gsIE4sIC1aXSxcbiAgICAgIFtOLCBaLCBYXSxcbiAgICAgIFtOLCBaLCAtWF0sXG4gICAgICBbTiwgLVosIFhdLFxuICAgICAgW04sIC1aLCAtWF0sXG4gICAgICBbWiwgWCwgTl0sXG4gICAgICBbLVosIFgsIE5dLFxuICAgICAgW1osIC1YLCBOXSxcbiAgICAgIFstWiwgLVgsIE5dXG4gICAgXTtcblxuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBwb3NpdGlvbnMubGVuZ3RoOyArK2lpKSB7XG4gICAgICBwb3NpdGlvbnNbaWldWzBdICs9IHNwaGVyZS5wb3NpdGlvblswXTtcbiAgICAgIHBvc2l0aW9uc1tpaV1bMV0gKz0gc3BoZXJlLnBvc2l0aW9uWzFdO1xuICAgICAgcG9zaXRpb25zW2lpXVsyXSArPSBzcGhlcmUucG9zaXRpb25bMl07XG4gICAgfVxuXG4gICAgY29uc3QgaW5kaWNlczogUmVhZG9ubHlBcnJheTxnbG0uUmVhZG9ubHlWZWMzPiA9IFtcbiAgICAgIFswLCA0LCAxXSxcbiAgICAgIFswLCA5LCA0XSxcbiAgICAgIFs5LCA1LCA0XSxcbiAgICAgIFs0LCA1LCA4XSxcbiAgICAgIFs0LCA4LCAxXSxcbiAgICAgIFs4LCAxMCwgMV0sXG4gICAgICBbOCwgMywgMTBdLFxuICAgICAgWzUsIDMsIDhdLFxuICAgICAgWzUsIDIsIDNdLFxuICAgICAgWzIsIDcsIDNdLFxuICAgICAgWzcsIDEwLCAzXSxcbiAgICAgIFs3LCA2LCAxMF0sXG4gICAgICBbNywgMTEsIDZdLFxuICAgICAgWzExLCAwLCA2XSxcbiAgICAgIFswLCAxLCA2XSxcbiAgICAgIFs2LCAxLCAxMF0sXG4gICAgICBbOSwgMCwgMTFdLFxuICAgICAgWzksIDExLCAyXSxcbiAgICAgIFs5LCAyLCA1XSxcbiAgICAgIFs3LCAyLCAxMV1cbiAgICBdO1xuXG4gICAgZm9yIChjb25zdCBpbmRleCBvZiBpbmRpY2VzKSB7XG4gICAgICBjb25zdCB2MSA9IHBvc2l0aW9uc1tpbmRleFswXV07XG4gICAgICBjb25zdCB2MiA9IHBvc2l0aW9uc1tpbmRleFsxXV07XG4gICAgICBjb25zdCB2MyA9IHBvc2l0aW9uc1tpbmRleFsyXV07XG5cbiAgICAgIHRoaXMuX3N0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKHYxLCB2Miwgc3BoZXJlLmNvbG9yKTtcbiAgICAgIHRoaXMuX3N0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKHYyLCB2Mywgc3BoZXJlLmNvbG9yKTtcbiAgICAgIHRoaXMuX3N0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKHYzLCB2MSwgc3BoZXJlLmNvbG9yKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9wdXNoV2lyZUZyYW1lQm94KGJveDogSW50ZXJuYWxCb3gpIHtcbiAgICBjb25zdCB2ZXJ0aWNlczogUmVhZG9ubHlBcnJheTxnbG0uUmVhZG9ubHlWZWMzPiA9IFtcbiAgICAgIGdsbS52ZWMzLmZyb21WYWx1ZXMoLWJveC5ib3hTaXplWzBdLCAtYm94LmJveFNpemVbMV0sIC1ib3guYm94U2l6ZVsyXSksXG4gICAgICBnbG0udmVjMy5mcm9tVmFsdWVzKCtib3guYm94U2l6ZVswXSwgLWJveC5ib3hTaXplWzFdLCAtYm94LmJveFNpemVbMl0pLFxuICAgICAgZ2xtLnZlYzMuZnJvbVZhbHVlcygtYm94LmJveFNpemVbMF0sICtib3guYm94U2l6ZVsxXSwgLWJveC5ib3hTaXplWzJdKSxcbiAgICAgIGdsbS52ZWMzLmZyb21WYWx1ZXMoK2JveC5ib3hTaXplWzBdLCArYm94LmJveFNpemVbMV0sIC1ib3guYm94U2l6ZVsyXSksXG4gICAgICBnbG0udmVjMy5mcm9tVmFsdWVzKC1ib3guYm94U2l6ZVswXSwgLWJveC5ib3hTaXplWzFdLCArYm94LmJveFNpemVbMl0pLFxuICAgICAgZ2xtLnZlYzMuZnJvbVZhbHVlcygrYm94LmJveFNpemVbMF0sIC1ib3guYm94U2l6ZVsxXSwgK2JveC5ib3hTaXplWzJdKSxcbiAgICAgIGdsbS52ZWMzLmZyb21WYWx1ZXMoLWJveC5ib3hTaXplWzBdLCArYm94LmJveFNpemVbMV0sICtib3guYm94U2l6ZVsyXSksXG4gICAgICBnbG0udmVjMy5mcm9tVmFsdWVzKCtib3guYm94U2l6ZVswXSwgK2JveC5ib3hTaXplWzFdLCArYm94LmJveFNpemVbMl0pXG4gICAgXTtcblxuICAgIGNvbnN0IHZlcnRpY2VzMjogZ2xtLlJlYWRvbmx5VmVjM1tdID0gW107XG5cbiAgICB2ZXJ0aWNlcy5mb3JFYWNoKCh2ZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IHBvcyA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMCk7XG4gICAgICBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KHBvcywgdmVydGV4LCBib3gubWF0cml4KTtcbiAgICAgIHZlcnRpY2VzMi5wdXNoKHBvcyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBpbmRpY2VzR3JvdXA6IFJlYWRvbmx5QXJyYXk8Z2xtLlJlYWRvbmx5VmVjMj4gPSBbXG4gICAgICBbMCwgMV0sXG4gICAgICBbMSwgM10sXG4gICAgICBbMywgMl0sXG4gICAgICBbMiwgMF0sXG4gICAgICBbNCwgNV0sXG4gICAgICBbNSwgN10sXG4gICAgICBbNywgNl0sXG4gICAgICBbNiwgNF0sXG4gICAgICBbMCwgNF0sXG4gICAgICBbMSwgNV0sXG4gICAgICBbMywgN10sXG4gICAgICBbMiwgNl1cbiAgICBdO1xuXG4gICAgaW5kaWNlc0dyb3VwLmZvckVhY2goKGluZGV4KSA9PiB7XG4gICAgICB0aGlzLl9zdGFja1JlbmRlcmVycy5wdXNoTGluZShcbiAgICAgICAgdmVydGljZXMyW2luZGV4WzBdXSxcbiAgICAgICAgdmVydGljZXMyW2luZGV4WzFdXSxcbiAgICAgICAgYm94LmNvbG9yXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHVzaFdpcmVGcmFtZVRyaWFuZ2xlKHRyaWFuZ2xlOiBJVHJpYW5nbGUpIHtcbiAgICB0aGlzLl9zdGFja1JlbmRlcmVycy5wdXNoTGluZSh0cmlhbmdsZS52MCwgdHJpYW5nbGUudjEsIHRyaWFuZ2xlLmNvbG9yKTtcbiAgICB0aGlzLl9zdGFja1JlbmRlcmVycy5wdXNoTGluZSh0cmlhbmdsZS52MSwgdHJpYW5nbGUudjIsIHRyaWFuZ2xlLmNvbG9yKTtcbiAgICB0aGlzLl9zdGFja1JlbmRlcmVycy5wdXNoTGluZSh0cmlhbmdsZS52MiwgdHJpYW5nbGUudjAsIHRyaWFuZ2xlLmNvbG9yKTtcbiAgfVxuXG4gIC8vIGZsdXNoU2NlbmVXaXJlRnJhbWUoKSB7XG4gIC8vICAgdGhpcy5fc3RhY2tSZW5kZXJlcnMuZmx1c2godGhpcy5fZGVidWdTY2VuZUNhbWVyYS5nZXRDb21wb3NlZE1hdHJpeCgpKTtcbiAgLy8gfVxuXG4gIHNhZmVTY2VuZVdpcmVGcmFtZShpbkNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fZGVidWdTY2VuZUNhbWVyYS5zZXRFeWUodGhpcy5fcmF5VHJhY2VyUmVuZGVyZXIuY2FtZXJhLnBvc2l0aW9uKTtcbiAgICB0aGlzLl9kZWJ1Z1NjZW5lQ2FtZXJhLnNldFRhcmdldCh0aGlzLl9yYXlUcmFjZXJSZW5kZXJlci5jYW1lcmEudGFyZ2V0KTtcbiAgICB0aGlzLl9kZWJ1Z1NjZW5lQ2FtZXJhLnNldFVwQXhpcyh0aGlzLl9yYXlUcmFjZXJSZW5kZXJlci5jYW1lcmEudXApO1xuICAgIHRoaXMuX2RlYnVnU2NlbmVDYW1lcmEuY29tcHV0ZU1hdHJpY2VzKCk7XG5cbiAgICB0aGlzLl9zdGFja1JlbmRlcmVycy5zYWZlUmVuZGVyKFxuICAgICAgdGhpcy5fZGVidWdTY2VuZUNhbWVyYS5nZXRDb21wb3NlZE1hdHJpeCgpLFxuICAgICAgaW5DYWxsYmFja1xuICAgICk7XG4gIH1cblxuICBmbHVzaEh1ZFdpcmVGcmFtZSgpIHtcbiAgICB0aGlzLl9zdGFja1JlbmRlcmVycy5mbHVzaCh0aGlzLl9tYWluSHVkQ2FtZXJhLmdldENvbXBvc2VkTWF0cml4KCkpO1xuICB9XG5cbiAgZmx1c2hIdWRUZXh0KCkge1xuICAgIHRoaXMuX3RleHRSZW5kZXJlci5mbHVzaCh0aGlzLl9tYWluSHVkQ2FtZXJhLmdldENvbXBvc2VkTWF0cml4KCkpO1xuICB9XG5cbiAgc2V0dXBEZWJ1Z1JlbmRlcmVyKCkge1xuICAgIHRoaXMuX3JheVRyYWNlclJlbmRlcmVyLnNwaGVyZXMuZm9yRWFjaCgoc3BoZXJlKSA9PlxuICAgICAgdGhpcy5fcHVzaFdpcmVGcmFtZVNwaGVyZShzcGhlcmUpXG4gICAgKTtcbiAgICB0aGlzLl9yYXlUcmFjZXJSZW5kZXJlci5ib3hlcy5mb3JFYWNoKChib3gpID0+IHRoaXMuX3B1c2hXaXJlRnJhbWVCb3goYm94KSk7XG4gICAgdGhpcy5fcmF5VHJhY2VyUmVuZGVyZXIudHJpYW5nbGVzLmZvckVhY2goKHRyaWFuZ2xlKSA9PlxuICAgICAgdGhpcy5fcHVzaFdpcmVGcmFtZVRyaWFuZ2xlKHRyaWFuZ2xlKVxuICAgICk7XG4gIH1cblxuICBnZXQgcmF5VHJhY2VyUmVuZGVyZXIoKTogSVJheVRyYWNlclJlbmRlcmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcmF5VHJhY2VyUmVuZGVyZXI7XG4gIH1cbiAgZ2V0IHN0YWNrUmVuZGVyZXJzKCk6IGdyYXBoaWNzLnJlbmRlcmVycy5JU3RhY2tSZW5kZXJlcnMge1xuICAgIHJldHVybiB0aGlzLl9zdGFja1JlbmRlcmVycztcbiAgfVxuICBnZXQgdGV4dFJlbmRlcmVyKCk6IGdyYXBoaWNzLnJlbmRlcmVycy5JVGV4dFJlbmRlcmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdGV4dFJlbmRlcmVyO1xuICB9XG59XG4iLAogICJpbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJy4uL2dyYXBoaWNzL1JlbmRlcmVyJztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmxldCBjb250aW51b3VzVGltZTogbnVtYmVyID0gMDtcbmxldCBjb250aW51b3VzQW5nbGU6IG51bWJlciA9IDA7XG5cbmxldCBjdXJyU3RlcCA9IDA7XG5sZXQgbmV4dFN0ZXAgPSAxO1xuY29uc3QgYWxsU3RlcHM6IGdsbS5SZWFkb25seVZlYzNbXSA9IFtcbiAgWy01LCA0LCAwXSxcbiAgWys1LCA0LCAwXSxcbiAgWys1LCAxMCwgMF0sXG4gIFstNSwgMTAsIDBdXG5dO1xuXG5leHBvcnQgY2xhc3MgVGVzdFNjZW5lMiB7XG4gIHJlc2V0KCkge1xuICAgIGNvbnRpbnVvdXNUaW1lID0gMDtcbiAgICBjb250aW51b3VzQW5nbGUgPSAwO1xuICAgIGN1cnJTdGVwID0gMDtcbiAgICBuZXh0U3RlcCA9IDE7XG4gIH1cblxuICBydW4ocmVuZGVyZXI6IFJlbmRlcmVyLCBlbGFwc2VkVGltZTogbnVtYmVyKSB7XG4gICAgY29udGludW91c0FuZ2xlICs9IGVsYXBzZWRUaW1lICogMi4wO1xuICAgIGlmIChjb250aW51b3VzQW5nbGUgPj0gTWF0aC5QSSAqIDIpIHtcbiAgICAgIGNvbnRpbnVvdXNBbmdsZSAtPSBNYXRoLlBJICogMjtcbiAgICB9XG5cbiAgICBjb250aW51b3VzVGltZSArPSBlbGFwc2VkVGltZSAqIDAuNzU7XG4gICAgaWYgKGNvbnRpbnVvdXNUaW1lID4gMSkge1xuICAgICAgY29udGludW91c1RpbWUgPSAwO1xuXG4gICAgICBjdXJyU3RlcCA9IChjdXJyU3RlcCArIDEpICUgYWxsU3RlcHMubGVuZ3RoO1xuICAgICAgbmV4dFN0ZXAgPSAoY3VyclN0ZXAgKyAxKSAlIGFsbFN0ZXBzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBjb25zdCBsaWdodFBvczogZ2xtLnZlYzMgPSBbXG4gICAgICBhbGxTdGVwc1tjdXJyU3RlcF1bMF0gK1xuICAgICAgICAoYWxsU3RlcHNbbmV4dFN0ZXBdWzBdIC0gYWxsU3RlcHNbY3VyclN0ZXBdWzBdKSAqIGNvbnRpbnVvdXNUaW1lLFxuICAgICAgYWxsU3RlcHNbY3VyclN0ZXBdWzFdICtcbiAgICAgICAgKGFsbFN0ZXBzW25leHRTdGVwXVsxXSAtIGFsbFN0ZXBzW2N1cnJTdGVwXVsxXSkgKiBjb250aW51b3VzVGltZSxcbiAgICAgIGFsbFN0ZXBzW2N1cnJTdGVwXVsyXSArXG4gICAgICAgIChhbGxTdGVwc1tuZXh0U3RlcF1bMl0gLSBhbGxTdGVwc1tjdXJyU3RlcF1bMl0pICogY29udGludW91c1RpbWVcbiAgICBdO1xuXG4gICAgLy9cbiAgICAvL1xuXG4gICAgLy8gcmVuZGVyZXIucmF5VHJhY2VyUmVuZGVyZXIucHVzaFN1bkxpZ2h0KHtcbiAgICAvLyAgIGRpcmVjdGlvbjogWzEuMCwgMS4wLCAxLjBdLFxuICAgIC8vICAgaW50ZW5zaXR5OiAwLjVcbiAgICAvLyB9KTtcblxuICAgIHtcbiAgICAgIC8vIG1vdmluZyBzcG90IGxpZ2h0c1xuXG4gICAgICAvLyBhY3R1YWwgc3BvdCBsaWdodHNcbiAgICAgIHJlbmRlcmVyLnJheVRyYWNlclJlbmRlcmVyLnB1c2hTcG90TGlnaHQoe1xuICAgICAgICBwb3NpdGlvbjogWzAsIDEwLCAxMF0sXG4gICAgICAgIGludGVuc2l0eTogMixcbiAgICAgICAgcmFkaXVzOiAyMFxuICAgICAgfSk7XG4gICAgICAvLyBncmFwaGljYWwgcHJlc2VudGF0aW9uIG9mIHRoZSBzcG90IGxpZ2h0c1xuICAgICAgcmVuZGVyZXIucmF5VHJhY2VyUmVuZGVyZXIucHVzaFNwaGVyZSh7XG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMTAsIDEwXSxcbiAgICAgICAgcmFkaXVzOiAwLjI1LFxuICAgICAgICBjb2xvcjogWzEsIDEsIDFdLFxuICAgICAgICByZWZsZWN0aW9uOiAwLFxuICAgICAgICBjaGVzc2JvYXJkOiBmYWxzZSxcbiAgICAgICAgbGlnaHRFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgc2hhZG93RW5hYmxlZDogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICAvLyBhY3R1YWwgc3BvdCBsaWdodHNcbiAgICAgIHJlbmRlcmVyLnJheVRyYWNlclJlbmRlcmVyLnB1c2hTcG90TGlnaHQoe1xuICAgICAgICBwb3NpdGlvbjogbGlnaHRQb3MsXG4gICAgICAgIGludGVuc2l0eTogMixcbiAgICAgICAgcmFkaXVzOiAxMFxuICAgICAgfSk7XG5cbiAgICAgIC8vIGdyYXBoaWNhbCBwcmVzZW50YXRpb24gb2YgdGhlIHNwb3QgbGlnaHRzXG4gICAgICByZW5kZXJlci5yYXlUcmFjZXJSZW5kZXJlci5wdXNoU3BoZXJlKHtcbiAgICAgICAgcG9zaXRpb246IGxpZ2h0UG9zLFxuICAgICAgICByYWRpdXM6IDAuMjUsXG4gICAgICAgIGNvbG9yOiBbMSwgMSwgMV0sXG4gICAgICAgIHJlZmxlY3Rpb246IDAsXG4gICAgICAgIGNoZXNzYm9hcmQ6IGZhbHNlLFxuICAgICAgICBsaWdodEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzaGFkb3dFbmFibGVkOiBmYWxzZVxuICAgICAgfSk7XG5cblxuXG4gICAgICAvLyBzaW1wbGUgcmVmbGVjdGl2ZSBzcGhlcmVcbiAgICAgIHJlbmRlcmVyLnJheVRyYWNlclJlbmRlcmVyLnB1c2hTcGhlcmUoe1xuICAgICAgICBwb3NpdGlvbjogWzAsIDcsIDFdLFxuICAgICAgICByYWRpdXM6IDEuMCxcbiAgICAgICAgY29sb3I6IFsxLCAxLCAxXSxcbiAgICAgICAgcmVmbGVjdGlvbjogMS4wLFxuICAgICAgICBjaGVzc2JvYXJkOiBmYWxzZSxcbiAgICAgICAgbGlnaHRFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgc2hhZG93RW5hYmxlZDogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIC8vIC8vIHNpbXBsZSByZWZsZWN0aXZlIGJveFxuICAgICAgLy8gcmVuZGVyZXIucmF5VHJhY2VyUmVuZGVyZXIucHVzaEJveCh7XG4gICAgICAvLyAgIHBvc2l0aW9uOiBbMCwgNywgMV0sXG4gICAgICAvLyAgIGFuZ2xlWDogY29udGludW91c0FuZ2xlICogMC4wLFxuICAgICAgLy8gICBhbmdsZVk6IGNvbnRpbnVvdXNBbmdsZSAqIDEuMCxcbiAgICAgIC8vICAgYW5nbGVaOiAwLFxuICAgICAgLy8gICBib3hTaXplOiBbMC44LDAuOCwwLjhdLFxuXG4gICAgICAvLyAgIGNvbG9yOiBbMSwgMSwgMV0sXG4gICAgICAvLyAgIHJlZmxlY3Rpb246IDEuMCxcbiAgICAgIC8vICAgY2hlc3Nib2FyZDogZmFsc2UsXG4gICAgICAvLyAgIGxpZ2h0RW5hYmxlZDogZmFsc2UsXG4gICAgICAvLyAgIHNoYWRvd0VuYWJsZWQ6IHRydWVcbiAgICAgIC8vIH0pO1xuXG4gICAgICAvLyAvLyBzaW1wbGUgcmVmbGVjdGl2ZSB0cmlhbmdsZVxuICAgICAgLy8gcmVuZGVyZXIucmF5VHJhY2VyUmVuZGVyZXIucHVzaFRyaWFuZ2xlKHtcbiAgICAgIC8vICAgdjA6IFswLCA3LCAxXSxcbiAgICAgIC8vICAgdjE6IFswLCA4LCAxXSxcbiAgICAgIC8vICAgdjI6IFswLCA4LCAyXSxcblxuICAgICAgLy8gICBjb2xvcjogWzEsIDEsIDFdLFxuICAgICAgLy8gICByZWZsZWN0aW9uOiAxLjAsXG4gICAgICAvLyAgIGxpZ2h0RW5hYmxlZDogZmFsc2UsXG4gICAgICAvLyAgIHNoYWRvd0VuYWJsZWQ6IHRydWVcbiAgICAgIC8vIH0pO1xuXG5cblxuICAgICAgY29uc3QgYWxsQm94ZXM6IHtcbiAgICAgICAgcG9zOiBnbG0uUmVhZG9ubHlWZWMzO1xuICAgICAgICBzaXplOiBnbG0uUmVhZG9ubHlWZWMzO1xuICAgICAgICBjb2xvcj86IGdsbS5SZWFkb25seVZlYzM7XG4gICAgICAgIHJlZmxlY3Rpb24/OiBudW1iZXI7XG4gICAgICB9W10gPSBbXG4gICAgICAgIHsgcG9zOiBbLTIsIDQsIC0xXSwgc2l6ZTogWzEsIDEsIDAuMTI1XSB9LFxuICAgICAgICB7IHBvczogWy0yLCA0LCArMV0sIHNpemU6IFsxLCAxLCAwLjEyNV0gfSxcbiAgICAgICAgeyBwb3M6IFstMiwgNCAtIDEsIDBdLCBzaXplOiBbMSwgMC4xMjUsIDFdIH0sXG4gICAgICAgIHsgcG9zOiBbLTIsIDQgKyAxLCAwXSwgc2l6ZTogWzEsIDAuMTI1LCAxXSB9LFxuICAgICAgICB7IHBvczogWysyLCA0LCAtMV0sIHNpemU6IFsxLCAxLCAwLjEyNV0gfSxcbiAgICAgICAgeyBwb3M6IFsrMiwgNCwgKzFdLCBzaXplOiBbMSwgMSwgMC4xMjVdIH0sXG4gICAgICAgIHsgcG9zOiBbKzIsIDQgLSAxLCAwXSwgc2l6ZTogWzEsIDAuMTI1LCAxXSB9LFxuICAgICAgICB7IHBvczogWysyLCA0ICsgMSwgMF0sIHNpemU6IFsxLCAwLjEyNSwgMV0gfSxcblxuICAgICAgICB7IHBvczogWzAsIDgsIC04XSwgc2l6ZTogWzgsIDgsIDAuMTI1XSwgY29sb3I6IFsxLjAsIDAuNSwgMC41XSB9LFxuICAgICAgICB7IHBvczogWy04LCA4LCAwXSwgc2l6ZTogWzAuMTI1LCA4LCA4XSwgY29sb3I6IFswLjUsIDEuMCwgMC41XSB9LFxuICAgICAgICB7IHBvczogWys4LCA4LCAwXSwgc2l6ZTogWzAuMTI1LCA4LCA4XSwgY29sb3I6IFswLjUsIDAuNSwgMS4wXSB9LFxuICAgICAgICB7IHBvczogWzAsIC0wLCAwXSwgc2l6ZTogWzgsIDAuMTI1LCA4XSwgcmVmbGVjdGlvbjogMC4zIH1cbiAgICAgIF07XG4gICAgICBhbGxCb3hlcy5mb3JFYWNoKCh7IHBvcywgc2l6ZSwgY29sb3IsIHJlZmxlY3Rpb24gfSkgPT4ge1xuICAgICAgICByZW5kZXJlci5yYXlUcmFjZXJSZW5kZXJlci5wdXNoQm94KHtcbiAgICAgICAgICBwb3NpdGlvbjogcG9zLFxuICAgICAgICAgIGFuZ2xlWDogMCxcbiAgICAgICAgICBhbmdsZVk6IDAsXG4gICAgICAgICAgYW5nbGVaOiAwLFxuICAgICAgICAgIGJveFNpemU6IHNpemUsXG4gICAgICAgICAgY29sb3I6IGNvbG9yID8/IFsxLCAxLCAxXSxcbiAgICAgICAgICByZWZsZWN0aW9uOiByZWZsZWN0aW9uID8/IDAsXG4gICAgICAgICAgY2hlc3Nib2FyZDogZmFsc2UsXG4gICAgICAgICAgbGlnaHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHNoYWRvd0VuYWJsZWQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAge1xuICAgICAgICBjb25zdCBhbGxSb3RhdGVkQm94ZXM6IHtcbiAgICAgICAgICBwb3M6IGdsbS5SZWFkb25seVZlYzM7XG4gICAgICAgICAgYW5nbGVZOiBudW1iZXI7XG4gICAgICAgICAgc2l6ZTogZ2xtLlJlYWRvbmx5VmVjMztcbiAgICAgICAgfVtdID0gW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBvczogW1xuICAgICAgICAgICAgICA1ICsgMSAqIE1hdGguY29zKGNvbnRpbnVvdXNBbmdsZSksXG4gICAgICAgICAgICAgIDYsXG4gICAgICAgICAgICAgIDAgKyAxICogTWF0aC5zaW4oY29udGludW91c0FuZ2xlKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFuZ2xlWTogLWNvbnRpbnVvdXNBbmdsZSxcbiAgICAgICAgICAgIHNpemU6IFswLjEyNSwgMS4wLCAxLjBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwb3M6IFtcbiAgICAgICAgICAgICAgNSAtIDEgKiBNYXRoLmNvcyhjb250aW51b3VzQW5nbGUpLFxuICAgICAgICAgICAgICA2ICsgMixcbiAgICAgICAgICAgICAgMCAtIDEgKiBNYXRoLnNpbihjb250aW51b3VzQW5nbGUpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYW5nbGVZOiAtY29udGludW91c0FuZ2xlLFxuICAgICAgICAgICAgc2l6ZTogWzAuMTI1LCAxLjAsIDEuMF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBvczogW1xuICAgICAgICAgICAgICA1ICsgMSAqIE1hdGguY29zKGNvbnRpbnVvdXNBbmdsZSArIE1hdGguUEkgKiAwLjUpLFxuICAgICAgICAgICAgICA2ICsgMSxcbiAgICAgICAgICAgICAgMCArIDEgKiBNYXRoLnNpbihjb250aW51b3VzQW5nbGUgKyBNYXRoLlBJICogMC41KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFuZ2xlWTogLWNvbnRpbnVvdXNBbmdsZSArIE1hdGguUEkgKiAwLjUsXG4gICAgICAgICAgICBzaXplOiBbMC4xMjUsIDIuMCwgMS4wXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcG9zOiBbXG4gICAgICAgICAgICAgIDUgKyAxICogTWF0aC5jb3MoY29udGludW91c0FuZ2xlIC0gTWF0aC5QSSAqIDAuNSksXG4gICAgICAgICAgICAgIDYgKyAxLFxuICAgICAgICAgICAgICAwICsgMSAqIE1hdGguc2luKGNvbnRpbnVvdXNBbmdsZSAtIE1hdGguUEkgKiAwLjUpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYW5nbGVZOiAtY29udGludW91c0FuZ2xlIC0gTWF0aC5QSSAqIDAuNSxcbiAgICAgICAgICAgIHNpemU6IFswLjEyNSwgMi4wLCAxLjBdXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHsgcG9zOiBbLTIsNCwrMV0sIHNpemU6IFsxLDEsMC4xMjVdIH0sXG4gICAgICAgICAgLy8geyBwb3M6IFstMiw0LTEsMF0sIHNpemU6IFsxLDAuMTI1LDFdIH0sXG4gICAgICAgIF07XG4gICAgICAgIGFsbFJvdGF0ZWRCb3hlcy5mb3JFYWNoKCh7IHBvcywgYW5nbGVZLCBzaXplIH0pID0+IHtcbiAgICAgICAgICAvLyBjb25zdCBwb3NBOiBnbG0uUmVhZG9ubHlWZWMzID0gW1xuICAgICAgICAgIC8vICAgTWF0aC5zaW4oYW5nbGUpICogNyxcbiAgICAgICAgICAvLyAgIDQsXG4gICAgICAgICAgLy8gICBNYXRoLmNvcyhhbmdsZSkgKiA3XG4gICAgICAgICAgLy8gXTtcblxuICAgICAgICAgIHJlbmRlcmVyLnJheVRyYWNlclJlbmRlcmVyLnB1c2hCb3goe1xuICAgICAgICAgICAgcG9zaXRpb246IHBvcyxcbiAgICAgICAgICAgIGFuZ2xlWDogMCxcbiAgICAgICAgICAgIGFuZ2xlWTogYW5nbGVZLFxuICAgICAgICAgICAgYW5nbGVaOiAwLFxuICAgICAgICAgICAgYm94U2l6ZTogc2l6ZSxcbiAgICAgICAgICAgIGNvbG9yOiBbMCwgMSwgMF0sXG4gICAgICAgICAgICByZWZsZWN0aW9uOiAwLFxuICAgICAgICAgICAgY2hlc3Nib2FyZDogZmFsc2UsXG4gICAgICAgICAgICBsaWdodEVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBzaGFkb3dFbmFibGVkOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gLy8gbW92aW5nIHNwb3QgbGlnaHRzXG4gIH1cbn1cbiIsCiAgIlxuaW1wb3J0IHsgc3lzdGVtLCBncmFwaGljcyB9IGZyb20gJ0Bsb2NhbC1mcmFtZXdvcmsnO1xuY29uc3Qge1xuICBHbG9iYWxNb3VzZU1hbmFnZXIsXG4gIEdsb2JhbEtleWJvYXJkTWFuYWdlcixcbiAgR2xvYmFsVG91Y2hNYW5hZ2VyLFxuICBHbG9iYWxWaXNpYmlsaXR5TWFuYWdlcixcbiAgR2xvYmFsUG9pbnRlckxvY2tNYW5hZ2VyXG59ID0gc3lzdGVtLmJyb3dzZXI7XG5jb25zdCB7IFdlYkdMQ29udGV4dCB9ID0gZ3JhcGhpY3Mud2ViZ2wyO1xuY29uc3QgeyBGcmVlRmx5Q29udHJvbGxlciB9ID0gc3lzdGVtLmNvbnRyb2xsZXJzO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuL3V0aWxpdGllcy9Mb2dnZXInO1xuaW1wb3J0IHsgRnJhbWVQcm9maWxlciB9IGZyb20gJy4vdXRpbGl0aWVzL0ZyYW1lUHJvZmlsZXInO1xuaW1wb3J0IHsgcmVuZGVyRnBzTWV0ZXIgfSBmcm9tICcuL2dyYXBoaWNzL3JlbmRlcmVycy93aWRnZXRzL3JlbmRlckZwc01ldGVyJztcbmltcG9ydCB7IHJlbmRlckNvbnRyb2xzIH0gZnJvbSAnLi9ncmFwaGljcy9yZW5kZXJlcnMvd2lkZ2V0cy9yZW5kZXJDb250cm9scyc7XG4vLyBpbXBvcnQgeyBGcmVlRmx5Q29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcnMvRnJlZUZseUNvbnRyb2xsZXInO1xuXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJy4vZ3JhcGhpY3MvUmVuZGVyZXInO1xuaW1wb3J0ICogYXMgc2NlbmVzIGZyb20gJy4vc2NlbmVzL2ludGV4JztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmNvbnN0IF9jbGFtcCA9IChpblZhbHVlOiBudW1iZXIsIGluTWluOiBudW1iZXIsIGluTWF4OiBudW1iZXIpID0+XG4gIE1hdGgubWluKE1hdGgubWF4KGluVmFsdWUsIGluTWluKSwgaW5NYXgpO1xuXG5pbnRlcmZhY2UgRXhwZXJpbWVudERlZiB7XG4gIGNhbnZhc0VsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICBsb2dnZXI6IExvZ2dlcjtcbiAgcGVyZkF1dG9TY2FsaW5nOiBIVE1MSW5wdXRFbGVtZW50O1xuICByZXNvbHV0aW9uOiBIVE1MUHJvZ3Jlc3NFbGVtZW50O1xuICBhbnRpX2FsaWFzaW5nX2VuYWJsZWQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGRlYnVnX21vZGVfZW5hYmxlZDogSFRNTElucHV0RWxlbWVudDtcbn1cblxuY29uc3Qga19tYXhGcmFtZXNVbnRpbE5leHRDaGVjayA9IDYwO1xuXG5leHBvcnQgY2xhc3MgRXhwZXJpbWVudCB7XG4gIHByaXZhdGUgX2NhbnZhc0VsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIF9hbmltYXRpb25GcmFtZUhhbmRsZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfZGVmOiBPbWl0PEV4cGVyaW1lbnREZWYsICdjYW52YXNFbGVtZW50Jz47XG5cbiAgcHJpdmF0ZSBfZnJlZUZseUNvbnRyb2xsZXI6IHN5c3RlbS5jb250cm9sbGVycy5GcmVlRmx5Q29udHJvbGxlcjtcblxuICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXI7XG5cbiAgcHJpdmF0ZSBfcnVubmluZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfZXJyb3JHcmFwaGljQ29udGV4dDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9jdXJyRnJhbWVNc2VjVGltZTogbnVtYmVyID0gRGF0ZS5ub3coKTtcbiAgcHJpdmF0ZSBfZnJhbWVQcm9maWxlciA9IG5ldyBGcmFtZVByb2ZpbGVyKCk7XG5cbiAgcHJpdmF0ZSBfY29udGludW91c1NlY1RpbWUgPSAwO1xuXG4gIHByaXZhdGUgX3BlcmZBdXRvU2NhbGluZ0VuYWJsZWQgPSB0cnVlO1xuICBwcml2YXRlIF9mcmFtZXNVbnRpbE5leHRDaGVjayA9IGtfbWF4RnJhbWVzVW50aWxOZXh0Q2hlY2s7XG5cbiAgLy8gcHJpdmF0ZSBfc2NlbmUgPSBuZXcgc2NlbmVzLlRlc3RTY2VuZTEoKTtcbiAgcHJpdmF0ZSBfc2NlbmUgPSBuZXcgc2NlbmVzLlRlc3RTY2VuZTIoKTtcblxuICBjb25zdHJ1Y3RvcihpbkRlZjogRXhwZXJpbWVudERlZikge1xuICAgIHRoaXMuX2NhbnZhc0VsZW1lbnQgPSBpbkRlZi5jYW52YXNFbGVtZW50O1xuICAgIHRoaXMuX2RlZiA9IGluRGVmO1xuXG4gICAgdGhpcy5fZnJlZUZseUNvbnRyb2xsZXIgPSBuZXcgRnJlZUZseUNvbnRyb2xsZXIoe1xuICAgICAgY29vcmRpbmF0ZXM6IFsnWicsICdYJywgJ1knXSxcbiAgICAgIC8vIHBvc2l0aW9uOiBbLTEwLCA5LCAyMl0sXG4gICAgICAvLyB0aGV0YTogTWF0aC5QSSAqIDAuODUsXG4gICAgICAvLyBwaGk6IC1NYXRoLlBJICogMC4xNSxcbiAgICAgIHBvc2l0aW9uOiBbLTEwLCAxMywgMTVdLFxuICAgICAgdGhldGE6IE1hdGguUEkgKiAwLjg1LFxuICAgICAgcGhpOiAtTWF0aC5QSSAqIDAuMTUsXG4gICAgICBtb3VzZVNlbnNpYmlsaXR5OiAwLjEsXG4gICAgICBrZXlib2FyZFNlbnNpYmlsaXR5OiBNYXRoLlBJICogMC40NSxcbiAgICAgIHRvdWNoU2Vuc2liaWxpdHk6IDAuMyxcbiAgICAgIG1vdmluZ1NwZWVkOiAxMFxuICAgIH0pO1xuXG4gICAgLy9cbiAgICAvL1xuXG4gICAge1xuICAgICAgR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmFjdGl2YXRlKCk7XG4gICAgICBHbG9iYWxUb3VjaE1hbmFnZXIuYWN0aXZhdGUodGhpcy5fY2FudmFzRWxlbWVudCk7XG5cbiAgICAgIEdsb2JhbFZpc2liaWxpdHlNYW5hZ2VyLmFjdGl2YXRlKCk7XG4gICAgICBHbG9iYWxWaXNpYmlsaXR5TWFuYWdlci5hZGRWaXNpYmlsaXR5Q2hhbmdlKChpc1Zpc2libGUpID0+IHtcbiAgICAgICAgaWYgKGlzVmlzaWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLl9kZWYubG9nZ2VyLmxvZygnZG9jdW1lbnQgdmlzaWJpbGl0eSBjaGFuZ2VkOiBoaWRkZW4nKTtcbiAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9kZWYubG9nZ2VyLmxvZygnZG9jdW1lbnQgdmlzaWJpbGl0eSBjaGFuZ2VkOiB2aXNpYmxlJyk7XG4gICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgR2xvYmFsUG9pbnRlckxvY2tNYW5hZ2VyLmFsbG93UG9pbnRlckxvY2tlZE9uQ2xpY2tFdmVudChcbiAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudFxuICAgICAgKTtcbiAgICAgIEdsb2JhbFBvaW50ZXJMb2NrTWFuYWdlci5hZGRPbkxvY2tDaGFuZ2UoKCkgPT4ge1xuICAgICAgICBjb25zdCBpc0xvY2tlZCA9IEdsb2JhbFBvaW50ZXJMb2NrTWFuYWdlci5pc1BvaW50ZXJMb2NrZWQoXG4gICAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpc0xvY2tlZCkge1xuICAgICAgICAgIHRoaXMuX2RlZi5sb2dnZXIubG9nKCdUaGUgcG9pbnRlciBsb2NrIHN0YXR1cyBpcyBub3cgbG9ja2VkJyk7XG5cbiAgICAgICAgICBHbG9iYWxNb3VzZU1hbmFnZXIuYWN0aXZhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9kZWYubG9nZ2VyLmxvZygnVGhlIHBvaW50ZXIgbG9jayBzdGF0dXMgaXMgbm93IHVubG9ja2VkJyk7XG5cbiAgICAgICAgICBHbG9iYWxNb3VzZU1hbmFnZXIuZGVhY3RpdmF0ZSgpO1xuXG4gICAgICAgICAgR2xvYmFsUG9pbnRlckxvY2tNYW5hZ2VyLmFsbG93UG9pbnRlckxvY2tlZE9uQ2xpY2tFdmVudChcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhc0VsZW1lbnRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgR2xvYmFsUG9pbnRlckxvY2tNYW5hZ2VyLmFkZE9uTG9ja0Vycm9yKChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLl9kZWYubG9nZ2VyLmxvZyhcbiAgICAgICAgICBgVGhlIHBvaW50ZXIgbG9jayBzZW50IGFuIGVycm9yLCBldmVudDogXCIke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1cImBcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9yZW5kZXJlciA9IG5ldyBSZW5kZXJlcih7IGNhbnZhc0RvbUVsZW1lbnQ6IHRoaXMuX2NhbnZhc0VsZW1lbnQgfSk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG5cbiAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fZXJyb3JHcmFwaGljQ29udGV4dCA9IGZhbHNlO1xuXG4gICAgLy8gdGhpcy5fcmVuZGVyZXIuc2V0T25Db250ZXh0TG9zdCgoKSA9PiB7XG4gICAgLy8gICB0aGlzLl9kZWYubG9nZ2VyLmxvZygnb25fY29udGV4dF9sb3N0Jyk7XG5cbiAgICAvLyAgIHRoaXMuX2Vycm9yR3JhcGhpY0NvbnRleHQgPSB0cnVlO1xuICAgIC8vICAgdGhpcy5zdG9wKCk7XG4gICAgLy8gfSk7XG5cbiAgICAvLyB0aGlzLl9yZW5kZXJlci5zZXRPbkNvbnRleHRSZXN0b3JlZCgoKSA9PiB7XG4gICAgLy8gICB0aGlzLl9kZWYubG9nZ2VyLmxvZygnb25fY29udGV4dF9yZXN0b3JlZCcpO1xuXG4gICAgLy8gICB0aGlzLl9lcnJvckdyYXBoaWNDb250ZXh0ID0gZmFsc2U7XG4gICAgLy8gICB0aGlzLnN0YXJ0KCk7XG4gICAgLy8gfSk7XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy9cblxuICAgIHRoaXMuX2RlZi5yZXNvbHV0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuX2RlZi5yZXNvbHV0aW9uLnZhbHVlO1xuICAgICAgdGhpcy5fc2V0UmVzb2x1dGlvbihuZXdWYWx1ZSk7XG4gICAgICB0aGlzLl9sb2dSZXNvbHV0aW9uKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kZWYuYW50aV9hbGlhc2luZ19lbmFibGVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLl9kZWYuYW50aV9hbGlhc2luZ19lbmFibGVkLmNoZWNrZWQgPT09IHRydWU7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJheVRyYWNlclJlbmRlcmVyLnNldEFudGlBbGlhc2luZyhuZXdWYWx1ZSk7XG5cbiAgICAgIHRoaXMuX2RlZi5sb2dnZXIubG9nKFxuICAgICAgICBgQW50aSBhbGlhc2luZyBjaGFuZ2U6ICR7bmV3VmFsdWUgPT09IHRydWUgPyAnZW5hYmxlZCcgOiAnZGlzYWJsZWQnfWBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9zZXRSZXNvbHV0aW9uKHRoaXMuX2RlZi5yZXNvbHV0aW9uLnZhbHVlKTtcblxuICAgIC8vIHBlcmZvcm1hbmNlIGF1dG8tc2NhbGluZ1xuICAgIHRoaXMuX2RlZi5wZXJmQXV0b1NjYWxpbmcuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICB0aGlzLl9mcmFtZXNVbnRpbE5leHRDaGVjayA9IGtfbWF4RnJhbWVzVW50aWxOZXh0Q2hlY2s7XG5cbiAgICAgIHRoaXMuX3BlcmZBdXRvU2NhbGluZ0VuYWJsZWQgPSB0aGlzLl9kZWYucGVyZkF1dG9TY2FsaW5nLmNoZWNrZWQgPT09IHRydWU7XG5cbiAgICAgIHRoaXMuX2RlZi5sb2dnZXIubG9nKFxuICAgICAgICBgUGVyZm9ybWFuY2UgYXV0byBzY2FsZXIgY2hhbmdlOiAke1xuICAgICAgICAgIHRoaXMuX3BlcmZBdXRvU2NhbGluZ0VuYWJsZWQgPT09IHRydWUgPyAnZW5hYmxlZCcgOiAnZGlzYWJsZWQnXG4gICAgICAgIH1gXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgaW5pdCgpIHtcbiAgICBhd2FpdCB0aGlzLl9yZW5kZXJlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICByZXNpemUoaW5XaWR0aDogbnVtYmVyLCBpbkhlaWdodDogbnVtYmVyLCBpbklzRnVsbFNjcmVlbjogYm9vbGVhbikge1xuICAgIGxldCBjdXJyZW50V2lkdGggPSBpbldpZHRoO1xuICAgIGxldCBjdXJyZW50SGVpZ2h0ID0gaW5IZWlnaHQ7XG5cbiAgICBpZiAoaW5Jc0Z1bGxTY3JlZW4pIHtcbiAgICAgIHRoaXMuX2NhbnZhc0VsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgY3VycmVudFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBjdXJyZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jYW52YXNFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICB9XG5cbiAgICB0aGlzLl9jYW52YXNFbGVtZW50LnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICB0aGlzLl9jYW52YXNFbGVtZW50LnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgIHRoaXMuX2NhbnZhc0VsZW1lbnQuc3R5bGUud2lkdGggPSBgJHtjdXJyZW50V2lkdGh9cHhgO1xuICAgIHRoaXMuX2NhbnZhc0VsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7Y3VycmVudEhlaWdodH1weGA7XG4gICAgdGhpcy5fY2FudmFzRWxlbWVudC53aWR0aCA9IGN1cnJlbnRXaWR0aDtcbiAgICB0aGlzLl9jYW52YXNFbGVtZW50LmhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5yZXNpemUoY3VycmVudFdpZHRoLCBjdXJyZW50SGVpZ2h0KTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICh0aGlzLmlzUnVubmluZygpKSByZXR1cm47XG5cbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcblxuICAgIHRoaXMuX3RpY2soKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKCF0aGlzLmlzUnVubmluZygpKSByZXR1cm47XG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRpb25GcmFtZUhhbmRsZSk7XG4gIH1cblxuICBpc1J1bm5pbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3J1bm5pbmcgJiYgIXRoaXMuX2Vycm9yR3JhcGhpY0NvbnRleHQ7XG4gIH1cblxuICAvL1xuICAvL1xuICAvL1xuXG4gIHByaXZhdGUgX3RpY2soKSB7XG4gICAgY29uc3QgdGljayA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5fcnVubmluZyB8fCB0aGlzLl9lcnJvckdyYXBoaWNDb250ZXh0KSByZXR1cm47XG5cbiAgICAgIC8vIHBsYW4gdGhlIG5leHQgZnJhbWVcblxuICAgICAgdGhpcy5fYW5pbWF0aW9uRnJhbWVIYW5kbGUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xuXG4gICAgICB0aGlzLl9tYWluTG9vcCgpO1xuICAgIH07XG5cbiAgICB0aWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9tYWluTG9vcCgpIHtcbiAgICBjb25zdCBjdXJyZW50TXNlY1RpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGRlbHRhTXNlY1RpbWUgPSBjdXJyZW50TXNlY1RpbWUgLSB0aGlzLl9jdXJyRnJhbWVNc2VjVGltZTtcbiAgICB0aGlzLl9jdXJyRnJhbWVNc2VjVGltZSA9IGN1cnJlbnRNc2VjVGltZTtcbiAgICB0aGlzLl9mcmFtZVByb2ZpbGVyLnB1c2hEZWx0YShkZWx0YU1zZWNUaW1lKTtcblxuICAgIHRoaXMuX2hhbmRsZVBlcmZvcm1hbmNlQXV0b1NjYWxpbmcoZGVsdGFNc2VjVGltZSk7XG5cbiAgICBjb25zdCBlbGFwc2VkU2VjVGltZSA9IGRlbHRhTXNlY1RpbWUgLyAxMDAwO1xuXG4gICAgdGhpcy5fY29udGludW91c1NlY1RpbWUgKz0gZWxhcHNlZFNlY1RpbWU7XG5cbiAgICB0aGlzLl9mcmVlRmx5Q29udHJvbGxlci51cGRhdGUoZWxhcHNlZFNlY1RpbWUpO1xuXG4gICAgR2xvYmFsTW91c2VNYW5hZ2VyLnJlc2V0RGVsdGFzKCk7XG5cbiAgICAvL1xuICAgIC8vXG5cbiAgICB7XG4gICAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY29udGludW91c1NlY1RpbWUgKz0gZWxhcHNlZFNlY1RpbWU7XG5cbiAgICB0aGlzLl9zY2VuZS5ydW4odGhpcy5fcmVuZGVyZXIsIGVsYXBzZWRTZWNUaW1lKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnJheVRyYWNlclJlbmRlcmVyLmxvb2tBdChcbiAgICAgIHRoaXMuX2ZyZWVGbHlDb250cm9sbGVyLmdldFBvc2l0aW9uKCksXG4gICAgICB0aGlzLl9mcmVlRmx5Q29udHJvbGxlci5nZXRUYXJnZXQoKSxcbiAgICAgIHRoaXMuX2ZyZWVGbHlDb250cm9sbGVyLmdldFVwQXhpcygpXG4gICAgKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnJheVRyYWNlclJlbmRlcmVyLnJlbmRlcigpO1xuXG4gICAgY29uc3Qgc2hvd0RlYnVnID0gdGhpcy5fZGVmLmRlYnVnX21vZGVfZW5hYmxlZC5jaGVja2VkID09PSB0cnVlO1xuICAgIGlmIChzaG93RGVidWcpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNhZmVTY2VuZVdpcmVGcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldHVwRGVidWdSZW5kZXJlcigpO1xuXG4gICAgICAgIGNvbnN0IGF4aXNPcmlnaW46IGdsbS5SZWFkb25seVZlYzMgPSBbMCwgMCwgMF07XG4gICAgICAgIGNvbnN0IGF4aXNYOiBnbG0uUmVhZG9ubHlWZWMzID0gWzEwMCwgMCwgMF07XG4gICAgICAgIGNvbnN0IGF4aXNZOiBnbG0uUmVhZG9ubHlWZWMzID0gWzAsIDEwMCwgMF07XG4gICAgICAgIGNvbnN0IGF4aXNaOiBnbG0uUmVhZG9ubHlWZWMzID0gWzAsIDAsIDEwMF07XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUoYXhpc09yaWdpbiwgYXhpc1gsIFsxLCAwLCAwXSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKGF4aXNPcmlnaW4sIGF4aXNZLCBbMCwgMSwgMF0pO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShheGlzT3JpZ2luLCBheGlzWiwgWzAsIDAsIDFdKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC5jbGVhcihnbC5ERVBUSF9CVUZGRVJfQklUKTtcbiAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgZ2wuZGVwdGhGdW5jKGdsLkxFU1MpO1xuXG4gICAgcmVuZGVyQ29udHJvbHMoXG4gICAgICB0aGlzLl9jYW52YXNFbGVtZW50LFxuICAgICAgdGhpcy5fcmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMsXG4gICAgICB0aGlzLl9yZW5kZXJlci50ZXh0UmVuZGVyZXJcbiAgICApO1xuXG4gICAgcmVuZGVyRnBzTWV0ZXIoXG4gICAgICBbMTAsIHRoaXMuX2NhbnZhc0VsZW1lbnQuaGVpZ2h0IC0gNjAsIDBdLFxuICAgICAgWzEwMCwgNTBdLFxuICAgICAgdGhpcy5fZnJhbWVQcm9maWxlcixcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLFxuICAgICAgdGhpcy5fcmVuZGVyZXIudGV4dFJlbmRlcmVyLFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5mbHVzaEh1ZFdpcmVGcmFtZSgpO1xuICAgIHRoaXMuX3JlbmRlcmVyLmZsdXNoSHVkVGV4dCgpO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIucmF5VHJhY2VyUmVuZGVyZXIucmVzZXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFJlc29sdXRpb24oaW5WYWx1ZTogbnVtYmVyKSB7XG4gICAgY29uc3Qgc2FmZVZhbHVlID0gX2NsYW1wKGluVmFsdWUsIDAsIDkpOyAvLyBbMC4uOV1cbiAgICBjb25zdCBuZXdWYWx1ZSA9IDEwIC0gc2FmZVZhbHVlOyAvLyBbMS4uMTBdXG4gICAgY29uc3QgbmV3Q29lZiA9IDEgLyBuZXdWYWx1ZTsgLy8gWzAuLjFdXG4gICAgdGhpcy5fcmVuZGVyZXIucmF5VHJhY2VyUmVuZGVyZXIuc2V0UmVzb2x1dGlvbkNvZWYobmV3Q29lZik7XG4gIH1cblxuICBwcml2YXRlIF9sb2dSZXNvbHV0aW9uKCkge1xuICAgIGNvbnN0IHJheVRyYWNlclJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXIucmF5VHJhY2VyUmVuZGVyZXI7XG5cbiAgICBjb25zdCBuZXdDb2VmID0gcmF5VHJhY2VyUmVuZGVyZXIuZ2V0UmVzb2x1dGlvbkNvZWYoKTtcbiAgICBjb25zdCBuZXdTaXplID0gcmF5VHJhY2VyUmVuZGVyZXIuZ2V0Q3VycmVudFNpemUoKTtcbiAgICBjb25zdCB0b3RhbFBpeGVscyA9IG5ld1NpemVbMF0gKiBuZXdTaXplWzFdO1xuXG4gICAgdGhpcy5fZGVmLmxvZ2dlci5sb2coXG4gICAgICBgcmVzb2x1dGlvbiBjaGFuZ2VkICgxLyR7TWF0aC5jZWlsKDEgLyBuZXdDb2VmKX0pID0+ICR7bmV3U2l6ZVswXX14JHtcbiAgICAgICAgbmV3U2l6ZVsxXVxuICAgICAgfSAoJHt0b3RhbFBpeGVsc31weClgXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVBlcmZvcm1hbmNlQXV0b1NjYWxpbmcoaW5EZWx0YU1zZWNUaW1lOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fcGVyZkF1dG9TY2FsaW5nRW5hYmxlZCAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpbkRlbHRhTXNlY1RpbWUgPD0gMjApIHtcbiAgICAgIHRoaXMuX2ZyYW1lc1VudGlsTmV4dENoZWNrID0ga19tYXhGcmFtZXNVbnRpbE5leHRDaGVjaztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAtLXRoaXMuX2ZyYW1lc1VudGlsTmV4dENoZWNrO1xuXG4gICAgaWYgKHRoaXMuX2ZyYW1lc1VudGlsTmV4dENoZWNrID4gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2RlZi5sb2dnZXIubG9nKFxuICAgICAgYHBlcmZvcm1hbmNlIGF1dG8gc2NhbGluZzogc2xvdyBmcmFtZXJhdGUsIHNjYWxpbmcgZG93biByZXNvbHV0aW9uYFxuICAgICk7XG5cbiAgICBjb25zdCBjdXJyVmFsdWUgPSB0aGlzLl9kZWYucmVzb2x1dGlvbi52YWx1ZTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGN1cnJWYWx1ZSAtIDE7XG5cbiAgICBpZiAobmV3VmFsdWUgPj0gMCAmJiBuZXdWYWx1ZSA8PSA5KSB7XG4gICAgICB0aGlzLl9zZXRSZXNvbHV0aW9uKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMuX2xvZ1Jlc29sdXRpb24oKTtcblxuICAgICAgdGhpcy5fZGVmLnJlc29sdXRpb24udmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLl9mcmFtZXNVbnRpbE5leHRDaGVjayA9IGtfbWF4RnJhbWVzVW50aWxOZXh0Q2hlY2s7XG4gIH1cbn1cbiIsCiAgIlxuaW1wb3J0IHsgc3lzdGVtIH0gZnJvbSAnQGxvY2FsLWZyYW1ld29yayc7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4vZXhwZXJpbWVudC91dGlsaXRpZXMvTG9nZ2VyJztcblxuaW1wb3J0IHsgRXhwZXJpbWVudCB9IGZyb20gJy4vZXhwZXJpbWVudC9FeHBlcmltZW50JztcblxubGV0IGxvZ2dlcjogTG9nZ2VyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xubGV0IG1haW5EZW1vOiBFeHBlcmltZW50IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4vL1xuLy9cbi8vXG4vL1xuLy9cblxuY29uc3QgX3F1ZXJ5SHRtbEVsZW1lbnQgPSA8VCBleHRlbmRzIEVsZW1lbnQ+KGluTmFtZTogc3RyaW5nKTogVCA9PiB7XG4gIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPFQ+KGluTmFtZSk7XG4gIGlmICghbmV3RWxlbWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgaHRtbCBlbGVtZW50IFwiJHtpbk5hbWV9XCIgbm90IGZvdW5kYCk7XG4gIH1cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuXG5jb25zdCBfcXVlcnlDYW52YXMgPSAoaW5OYW1lOiBzdHJpbmcpID0+XG4gIF9xdWVyeUh0bWxFbGVtZW50PEhUTUxDYW52YXNFbGVtZW50Pihpbk5hbWUpO1xuY29uc3QgX3F1ZXJ5UHJvZ3Jlc3MgPSAoaW5OYW1lOiBzdHJpbmcpID0+XG4gIF9xdWVyeUh0bWxFbGVtZW50PEhUTUxQcm9ncmVzc0VsZW1lbnQ+KGluTmFtZSk7XG5jb25zdCBfcXVlcnlJbnB1dCA9IChpbk5hbWU6IHN0cmluZykgPT5cbiAgX3F1ZXJ5SHRtbEVsZW1lbnQ8SFRNTElucHV0RWxlbWVudD4oaW5OYW1lKTtcblxuLy9cbi8vXG4vL1xuLy9cbi8vXG5cbmNvbnN0IG9uUGFnZUVycm9yID0gYXN5bmMgKGVycjogRXJyb3JFdmVudCkgPT4ge1xuICBpZiAobG9nZ2VyKSB7XG4gICAgbG9nZ2VyLmVycm9yKGVyci5tZXNzYWdlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKGVyci5tZXNzYWdlKTtcbiAgfVxuXG4gIGlmIChtYWluRGVtbykge1xuICAgIG1haW5EZW1vLnN0b3AoKTtcbiAgfVxufTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uUGFnZUVycm9yKTtcblxuLy9cbi8vXG4vL1xuLy9cbi8vXG5cbmNvbnN0IG9uUGFnZUxvYWQgPSBhc3luYyAoKSA9PiB7XG4gIGxvZ2dlciA9IG5ldyBMb2dnZXIoJ2xvZ2dlck91dHB1dCcpO1xuICBsb2dnZXIubG9nKCdbU0VUVVBdIHBhZ2UgbG9hZGVkJyk7XG5cbiAgdHJ5IHtcblxuICAgIC8vXG4gICAgLy8gSFRNTCBlbGVtZW50cyBjaGVja1xuICAgIC8vXG5cbiAgICBjb25zdCBjYW52YXNFbGVtZW50ID0gX3F1ZXJ5Q2FudmFzKCcjcmVuZGVyaW5nLWNhbnZhcycpO1xuICAgIGNvbnN0IHBlcmZBdXRvU2NhbGluZyA9IF9xdWVyeUlucHV0KCcjYXV0by1zY2FsaW5nLWVuYWJsZWQnKTtcbiAgICBjb25zdCByZXNvbHV0aW9uID0gX3F1ZXJ5UHJvZ3Jlc3MoJyNyZXNvbHV0aW9uJyk7XG4gICAgY29uc3QgYW50aV9hbGlhc2luZ19lbmFibGVkID0gX3F1ZXJ5SW5wdXQoJyNhbnRpLWFsaWFzaW5nLWVuYWJsZWQnKTtcbiAgICBjb25zdCBkZWJ1Z19tb2RlX2VuYWJsZWQgPSBfcXVlcnlJbnB1dCgnI2RlYnVnLW1vZGUtZW5hYmxlZCcpO1xuXG4gICAgLy9cbiAgICAvLyBicm93c2VyIGZlYXR1cmVzIGNoZWNrXG4gICAgLy9cblxuICAgIGlmICghc3lzdGVtLmJyb3dzZXIuaXNXZWJHTDJTdXBwb3J0ZWQoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIFdlYkdMMiBmZWF0dXJlICh1bnN1cHBvcnRlZCknKTtcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIHNldHVwIGFwcGxpY2F0aW9uXG4gICAgLy9cblxuICAgIG1haW5EZW1vID0gbmV3IEV4cGVyaW1lbnQoe1xuICAgICAgY2FudmFzRWxlbWVudCxcbiAgICAgIGxvZ2dlcixcbiAgICAgIHBlcmZBdXRvU2NhbGluZyxcbiAgICAgIHJlc29sdXRpb24sXG4gICAgICBhbnRpX2FsaWFzaW5nX2VuYWJsZWQsXG4gICAgICBkZWJ1Z19tb2RlX2VuYWJsZWRcbiAgICB9KTtcblxuICAgIGxvZ2dlci5sb2coJ1tTRVRVUF0gRGVtbzogaW5pdGlhbGl6aW5nJyk7XG5cbiAgICBhd2FpdCBtYWluRGVtby5pbml0KCk7XG5cbiAgICBsb2dnZXIubG9nKCdbU0VUVVBdIERlbW86IGluaXRpYWxpemVkJyk7XG5cbiAgICBtYWluRGVtby5zdGFydCgpO1xuXG4gICAgbG9nZ2VyLmxvZygnW1NFVFVQXSBEZW1vOiBydW5uaW5nJyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5lcnJvcihgRXJyb3I6IFwiJHsoZXJyIGFzIEVycm9yKT8ubWVzc2FnZX1cImApO1xuICAgIHRocm93IGVycjtcbiAgfVxuXG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uUGFnZUxvYWQsIGZhbHNlKTtcbiIKICBdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sbUJBQTZCO0FBQUEsRUFDakM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLElBQU0sa0JBQTRCO0FBQUEsRUFDaEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQVNBO0FBQUEsTUFBTSxrQkFBa0I7QUFBQSxFQUNkLCtCQUFtRCxDQUFDO0FBQUEsRUFFcEQsaUJBQTBCO0FBQUEsRUFFMUIsV0FBVyxHQUFHO0FBQ3BCLFFBQUksS0FBSyxnQkFBZ0I7QUFDdkI7QUFBQSxJQUNGO0FBQ0EsU0FBSyxpQkFBaUI7QUFFdEIsVUFBTSxlQUFlLE1BQU07QUFDekIsV0FBSyw2QkFBNkIsUUFBUSxDQUFDLGFBQWEsU0FBUyxDQUFDO0FBQUE7QUFHcEUsZUFBVyxhQUFhO0FBQ3RCLGVBQVMsaUJBQWlCLFdBQVcsY0FBYyxLQUFLO0FBQUE7QUFBQSxFQUs1RCxZQUFZLENBQUMsaUJBQThCO0FBQ3pDLGVBQVcsYUFBYSxrQkFBa0I7QUFDeEMsVUFBSSxhQUFhLGlCQUFpQjtBQUNoQyxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUE7QUFBQSxFQUtULFlBQVksQ0FBQyxpQkFBOEI7QUFDekMsV0FBTyxTQUFTLHNCQUFzQjtBQUFBO0FBQUEsT0FLbEMsa0JBQWlCLENBQUMsaUJBQWdEO0FBQ3RFLFFBQUksS0FBSyxhQUFhLGVBQWUsR0FBRztBQUN0QyxhQUFPLEVBQUUsU0FBUyxPQUFPLFNBQVMsaUNBQWlDO0FBQUEsSUFDckU7QUFFQSxTQUFLLFlBQVk7QUFFakIsZUFBVyxhQUFhLGtCQUFrQjtBQUN4QyxVQUFJLGFBQWEsaUJBQWlCO0FBQ2hDLFFBQUMsZ0JBQXdCLFdBQVc7QUFFcEMsZUFBTyxFQUFFLFNBQVMsTUFBTSxTQUFTLCtCQUErQjtBQUFBLE1BQ2xFO0FBQUEsSUFDRjtBQUVBLFdBQU8sRUFBRSxTQUFTLE9BQU8sU0FBUyxzQ0FBc0M7QUFBQTtBQUFBLEVBSzFFLHFCQUFxQixDQUFDLFlBQThCO0FBQ2xELFNBQUssNkJBQTZCLEtBQUssVUFBVTtBQUFBO0FBQUEsRUFFbkQsd0JBQXdCLENBQUMsWUFBOEI7QUFDckQsVUFBTSxRQUFRLEtBQUssNkJBQTZCLFFBQVEsVUFBVTtBQUNsRSxRQUFJLFFBQVEsR0FBRztBQUNiO0FBQUEsSUFDRjtBQUNBLFNBQUssNkJBQTZCLE9BQU8sT0FBTyxDQUFDO0FBQUE7QUFBQSxFQUVuRCxrQkFBa0IsR0FBRztBQUNuQixTQUFLLDZCQUE2QixTQUFTO0FBQUE7QUFFL0M7QUFFQSxJQUFNLDBCQUEwQixJQUFJOztBQzlGN0IsSUFBTSxjQUFjO0FBQUEsRUFFekIsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBR0gsV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsV0FBVztBQUFBLEVBQ1gsY0FBYztBQUFBLEVBQ2QsT0FBTztBQUFBLEVBR1AsT0FBTztBQUFBLEVBQ1AsTUFBTTtBQUFBLEVBQ04sS0FBSztBQUFBLEVBQ0wsVUFBVTtBQUFBLEVBR1YsS0FBSztBQUFBLEVBQ0wsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsVUFBVTtBQUFBLEVBQ1YsS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsU0FBUztBQUFBLEVBQ1QsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsYUFBYTtBQUFBLEVBQ2IsWUFBWTtBQUFBLEVBR1osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0os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UyxjQUFjLENBQUMsS0FBSyxHQUFHO0FBQ3JDLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFFNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUU1RSxPQUFLLEtBQUs7QUFDUixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sSUFBTTtBQUNaLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUMvQyxNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDL0MsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1B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S0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7QUFBQTtBQU8xdkIsSUFBSSxNQUFNO0FBTVYsSUFBSSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixTQUFPO0FBQUE7QUFTRixTQUFTLFNBQVEsQ0FBQyxLQUFLO0FBQzVCLE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLFNBQU87QUFBQTtBQVVGLFNBQVMsVUFBUyxDQUFDLEtBQUssR0FBRztBQUVoQyxNQUFJLFFBQVEsR0FBRztBQUNiLFFBQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osUUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixRQUFJLE1BQU0sRUFBRTtBQUNaLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSztBQUNULFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUs7QUFDVCxRQUFJLEtBQUs7QUFDVCxRQUFJLE1BQU0sRUFBRTtBQUNaLFFBQUksTUFBTTtBQUNWLFFBQUksTUFBTTtBQUNWLFFBQUksTUFBTTtBQUFBLEVBQ1osT0FBTztBQUNMLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxNQUFNLEVBQUU7QUFDWixRQUFJLE1BQU0sRUFBRTtBQUNaLFFBQUksTUFBTSxFQUFFO0FBQ1osUUFBSSxNQUFNLEVBQUU7QUFDWixRQUFJLE1BQU0sRUFBRTtBQUNaLFFBQUksTUFBTSxFQUFFO0FBQUE7QUFHZCxTQUFPO0FBQUE7QUFVRixTQUFTLE9BQU0sQ0FBQyxLQUFLLEdBQUc7QUFDN0IsTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUU1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBRTVFLE9BQUssS0FBSztBQUNSLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxJQUFNO0FBQ1osTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQy9DLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUMvQyxNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDL0MsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQy9DLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUMvQyxNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDL0MsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQy9DLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUMvQyxNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDL0MsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQy9DLE1BQUksT0FBTyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUNoRCxNQUFJLE9BQU8sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDaEQsTUFBSSxPQUFPLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQ2hELE1BQUksT0FBTyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUNoRCxNQUFJLE9BQU8sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDaEQsTUFBSSxPQUFPLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQ2hELFNBQU87QUFBQTtBQVVGLFNBQVMsUUFBTyxDQUFDLEtBQUssR0FBRztBQUM5QixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksS0FBSyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDbEcsTUFBSSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNwRyxNQUFJLEtBQUssT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ2xHLE1BQUksT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDcEcsTUFBSSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNwRyxNQUFJLEtBQUssT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ2xHLE1BQUksT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDcEcsTUFBSSxLQUFLLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNsRyxNQUFJLEtBQUssT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ2xHLE1BQUksT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDcEcsTUFBSSxNQUFNLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNuRyxNQUFJLFFBQVEsT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ3JHLE1BQUksUUFBUSxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDckcsTUFBSSxNQUFNLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNuRyxNQUFJLFFBQVEsT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ3JHLE1BQUksTUFBTSxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDbkcsU0FBTztBQUFBO0FBU0YsU0FBUyxZQUFXLENBQUMsR0FBRztBQUM3QixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBRTVCLFNBQU8sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQUE7QUFXcEUsU0FBUyxTQUFRLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDbEMsTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFFWixNQUFJLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksTUFBTSxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQ2hELE1BQUksTUFBTSxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQ2hELE9BQUssRUFBRTtBQUNQ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Q2hCLE1BQUksS0FBSyxJQUFJLEdBQUc7QUFDaEIsTUFBSSxJQUFJO0FBRVIsTUFBSSxLQUFLLElBQUksSUFBSSxJQUFJO0FBQ3JCLE1BQUksS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJO0FBQ3pCLE1BQUksS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJO0FBQ3pCLE1BQUksS0FBSztBQUNULE1BQUksS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJO0FBQ3pCLE1BQUksS0FBSyxJQUFJLElBQUksSUFBSTtBQUNyQixNQUFJLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSTtBQUN6QixNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSTtBQUN6QixNQUFJLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSTtBQUN6QixNQUFJLE1BQU0sSUFBSSxJQUFJLElBQUk7QUFDdEIsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBY0YsU0FBUyxhQUFhLENBQUMsS0FBSyxLQUFLO0FBQ3RDLE1BQUksSUFBSSxLQUFLLElBQUksR0FBRztBQUNwQixNQUFJLElBQUksS0FBSyxJQUFJLEdBQUc7QUFFcEIsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBY0YsU0FBUyxhQUFhLENBQUMsS0FBSyxLQUFLO0FBQ3RDLE1BQUksSUFBSSxLQUFLLElBQUksR0FBRztBQUNwQixNQUFJLElBQUksS0FBSyxJQUFJLEdBQUc7QUFFcEIsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBY0YsU0FBUyxhQUFhLENBQUMsS0FBSyxLQUFLO0FBQ3RDLE1BQUksSUFBSSxLQUFLLElBQUksR0FBRztBQUNwQixNQUFJLElBQUksS0FBSyxJQUFJLEdBQUc7QUFFcEIsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBa0JGLFNBQVMsdUJBQXVCLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFFakQsTUFBSSxJQUFJLEVBQUUsSUFDTixJQUFJLEVBQUUsSUFDTixJQUFJLEVBQUUsSUFDTixJQUFJLEVBQUU7QUFDVixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFD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QUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxFQUFFO0FBQ1gsTUFBSSxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxFQUFFO0FBQ1gsTUFBSSxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRTtBQUNYLE1BQUksUUFBUSxLQUFLLEtBQUssT0FBTztBQUM3QixNQUFJLFFBQVEsS0FBSyxNQUFNO0FBQ3ZCLE1BQUksUUFBUSxLQUFLLE1BQU07QUFDdkIsTUFBSSxRQUFRLEtBQUssTUFBTTtBQUN2QixNQUFJLFFBQVEsS0FBSyxLQUFLLE9BQU87QUFDN0IsTUFBSSxRQUFRLEtBQUssTUFBTTtBQUN2QixNQUFJLFFBQVEsS0FBSyxNQUFNO0FBQ3ZCLE1BQUksUUFBUSxLQUFLLE1BQU07QUFDdkIsTUFBSSxTQUFTLEtBQUssS0FBSyxPQUFPO0FBQzlCLE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTSxFQUFFLEtBQUssTUFBTSxPQUFPLEtBQUssT0FBTyxLQUFLLE9BQU87QUFDdEQsTUFBSSxNQUFNLEVBQUUsS0FBSyxNQUFNLE9BQU8sS0FBSyxPQUFPLEtBQUssT0FBTztBQUN0RCxNQUFJLE1BQU0sRUFBRSxLQUFLLE1BQU0sT0FBTyxLQUFLLE9BQU8sS0FBSyxRQUFRO0FBQ3ZELE1BQUksTUFBTTtBQUNWLFNBQU87QUFBQTtBQVdGLFNBQVMsU0FBUSxDQUFDLEtBQUssR0FBRztBQUMvQixNQUFJLElBQUksRUFBRSxJQUNOLElBQUksRUFBRSxJQUNOLElBQUksRUFBRSxJQUNOLElBQUksRUFBRTtBQUNWLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJLEtBQUs7QUFDbEIsTUFBSSxLQUFLLEtBQUs7QUFDZCxNQUFJLEtBQUssS0FBSztBQUNkLE1BQUksS0FBSztBQUNULE1BQUksS0FBSyxLQUFLO0FBQ2QsTUFBSSxLQUFLLElBQUksS0FBSztBQUNsQixNQUFJLEtBQUssS0FBSztBQUNkLE1BQUksS0FBSztBQUNULE1BQUksS0FBSyxLQUFLO0FBQ2QsTUFBSSxLQUFLLEtBQUs7QUFDZCxNQUFJLE1BQU0sSUFBSSxLQUFLO0FBQ25CLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLFNBQU87QUFBQTtBQWVGLFNBQVMsT0FBTyxDQUFDLEtBQUssTUFBTSxPQUFPLFFBQVEsS0FBSyxNQUFNLEtBQUs7QUFDaEUsTUFBSSxLQUFLLEtBQUssUUFBUTtBQUN0QixNQUFJLEtBQUssS0FBSyxNQUFNO0FBQ3BCLE1BQUksS0FBSyxLQUFLLE9BQU87QUFDckIsTUFBSSxLQUFLLE9BQU8sSUFBSTtBQUNwQixNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUssT0FBTyxJQUFJO0FBQ3BCLE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksTUFBTSxRQUFRLFFBQVE7QUFDMUIsTUFBSSxNQUFNLE1BQU0sVUFBVTtBQUMxQixNQUFJLE9BQU8sTUFBTSxRQUFRO0FBQ3pCLE1BQUksT0FBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTSxNQUFNLE9BQU8sSUFBSTtBQUMzQixNQUFJLE1BQU07QUFDVixTQUFPO0FBQUE7QUFnQkYsU0FBUyxhQUFhLENBQUMsS0FBSyxNQUFNLFFBQVEsTUFBTSxLQUFLO0FBQzFELE1BQUksSUFBSSxJQUFNLEtBQUssSUFBSSxPQUFPLENBQUMsR0FDM0I7QUFDSixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksT0FBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUVWLE1BQUksT0FBTyxRQUFRLFFBQVEsVUFBVTtBQUNuQyxTQUFLLEtBQUssT0FBTztBQUNqQixRQUFJLE9BQU8sTUFBTSxRQUFRO0FBQ3pCLFFBQUksTUFBTSxJQUFJLE1BQU0sT0FBTztBQUFBLEVBQzdCLE9BQU87QUFDTCxRQUFJLE9BQU07QUFDVixRQUFJLE9BQU0sSUFBSztBQUFBO0FBR2pCLFNBQU87QUFBQTtBQXNCRixTQUFTLGFBQWEsQ0FBQyxLQUFLLE1BQU0sUUFBUSxNQUFNLEtBQUs7QUFDMUQsTUFBSSxJQUFJLElBQU0sS0FBSyxJQUFJLE9BQU8sQ0FBQyxHQUMzQjtBQUNKLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxPQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBRVYsTUFBSSxPQUFPLFFBQVEsUUFBUSxVQUFVO0FBQ25DLFNBQUssS0FBSyxPQUFPO0FBQ2pCLFFBQUksTUFBTSxNQUFNO0FBQ2hCLFFBQUksTUFBTSxNQUFNLE9BQU87QUFBQSxFQUN6QixPQUFPO0FBQ0wsUUFBSSxPQUFNO0FBQ1YsUUFBSSxPQUFPO0FBQUE7QUFHYixTQUFPO0FBQUE7QUFjRixTQUFTLDBCQUEwQixDQUFDLEtBQUssS0FBSyxNQUFNLEtBQUs7QUFDOUQsTUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLFlBQVksS0FBSyxLQUFLLEdBQUs7QUFDcEQsTUFBSSxVQUFVLEtBQUssSUFBSSxJQUFJLGNBQWMsS0FBSyxLQUFLLEdBQUs7QUFDeEQsTUFBSSxVQUFVLEtBQUssSUFBSSxJQUFJLGNBQWMsS0FBSyxLQUFLLEdBQUs7QUFDeEQsTUFBSSxXQUFXLEtBQUssSUFBSSxJQUFJLGVBQWUsS0FBSyxLQUFLLEdBQUs7QUFDMUQsTUFBSSxTQUFTLEtBQU8sVUFBVTtBQUM5QixNQUFJLFNBQVMsS0FBTyxRQUFRO0FBQzVCLE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksUUFBUSxVQUFVLFlBQVksU0FBUztBQUMzQyxNQUFJLE1BQU0sUUFBUSxXQUFXLFNBQVM7QUFDdEMsTUFBSSxNQUFNLE9BQU8sT0FBTztBQUN4QixNQUFJLE9BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU0sTUFBTSxRQUFRLE9BQU87QUFDL0IsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBaUJGLFNBQVMsT0FBTyxDQUFDLEtBQUssTUFBTSxPQUFPLFFBQVEsS0FBSyxNQUFNLEtBQUs7QUFDaEUsTUFBSSxLQUFLLEtBQUssT0FBTztBQUNyQixNQUFJLEtBQUssS0FBSyxTQUFTO0FBQ3ZCLE1BQUksS0FBSyxLQUFLLE9BQU87QUFDckIsTUFBSSxNQUFLLElBQUs7QUFDZCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLE1BQUssSUFBSztBQUNkLE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksTUFBTSxJQUFJO0FBQ2QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxPQUFPLE9BQU8sU0FBUztBQUMzQixNQUFJLE9BQU8sTUFBTSxVQUFVO0FBQzNCLE1BQUksT0FBTyxNQUFNLFFBQVE7QUFDekIsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBdUJGLFNBQVMsT0FBTyxDQUFDLEtBQUssTUFBTSxPQUFPLFFBQVEsS0FBSyxNQUFNLEtBQUs7QUFDaEUsTUFBSSxLQUFLLEtBQUssT0FBTztBQUNyQixNQUFJLEtBQUssS0FBSyxTQUFTO0FBQ3ZCLE1BQUksS0FBSyxLQUFLLE9BQU87QUFDckIsTUFBSSxNQUFLLElBQUs7QUFDZCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLE1BQUssSUFBSztBQUNkLE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksT0FBTyxPQUFPLFNBQVM7QUFDM0IsTUFBSSxPQUFPLE1BQU0sVUFBVTtBQUMzQixNQUFJLE1BQU0sT0FBTztBQUNqQixNQUFJLE1BQU07QUFDVixTQUFPO0FBQUE7QUFhRixTQUFTLE1BQU0sQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJO0FBQzNDLE1BQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUk7QUFDeEMsTUFBSSxPQUFPLElBQUk7QUFDZixNQUFJLE9BQU8sSUFBSTtBQUNmLE1BQUksT0FBTyxJQUFJO0FBQ2YsTUFBSSxNQUFNLEdBQUc7QUFDYixNQUFJLE1BQU0sR0FBRztBQUNiLE1BQUksTUFBTSxHQUFHO0FBQ2IsTUFBSSxVQUFVLE9BQU87QUFDckIsTUFBSSxVQUFVLE9BQU87QUFDckIsTUFBSSxVQUFVLE9BQU87QUFFckIsTUFBSSxLQUFLLElBQUksT0FBTyxPQUFPLElBQWEsV0FBVyxLQUFLLElBQUksT0FBTyxPQUFPLElBQWEsV0FBVyxLQUFLLElBQUksT0FBTyxPQUFPLElBQWEsU0FBUztBQUM3SSxXQUFPLFVBQVMsR0FBRztBQUFBLEVBQ3JCO0FBRUEsT0FBSyxPQUFPO0FBQ1osT0FBSyxPQUFPO0FBQ1osT0FBSyxPQUFPO0FBQ1osUUFBTSxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksRUFBRTtBQUMvQixRQUFNO0FBQ04sUUFBTTtBQUNOLFFBQU07QUFDTixPQUFLLE1BQU0sS0FBSyxNQUFNO0FBQ3RCLE9BQUssTUFBTSxLQUFLLE1BQU07QUFDdEIsT0FBSyxNQUFNLEtBQUssTUFBTTtBQUN0QixRQUFNLEtBQUssTUFBTSxJQUFJLElBQUksRUFBRTtBQUUzQixPQUFLLEtBQUs7QUFDUixTQUFLO0FBQ0wsU0FBSztBQUNMLFNBQUs7QUFBQSxFQUNQLE9BQU87QUFDTCxVQUFNLElBQUk7QUFDVixVQUFNO0FBQ04sVUFBTTtBQUNOLFVBQU07QUFBQTtBQUdSLE9BQUssS0FBSyxLQUFLLEtBQUs7QUFDcEIsT0FBSyxLQUFLLEtBQUssS0FBSztBQUNwQixPQUFLLEtBQUssS0FBSyxLQUFLO0FBQ3BCLFFBQU0sS0FBSyxNQUFNLElBQUksSUFBSSxFQUFFO0FBRTNCLE9BQUssS0FBSztBQUNSLFNBQUs7QUFDTCxTQUFLO0FBQ0wsU0FBSztBQUFBLEVBQ1AsT0FBTztBQUNMLFVBQU0sSUFBSTtBQUNWLFVBQU07QUFDTixVQUFNO0FBQ04sVUFBTTtBQUFBO0FBR1IsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxRQUFRLEtBQUssT0FBTyxLQUFLLE9BQU8sS0FBSztBQUN6QyxNQUFJLFFBQVEsS0FBSyxPQUFPLEtBQUssT0FBTyxLQUFLO0FBQ3pDLE1BQUksUUFBUSxLQUFLLE9BQU8sS0FBSyxPQUFPLEtBQUs7QUFDekMsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBWUYsU0FBUyxRQUFRLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSTtBQUM3QyxNQUFJLE9BQU8sSUFBSSxJQUNYLE9BQU8sSUFBSSxJQUNYLE9BQU8sSUFBSSxJQUNYLE1BQU0sR0FBRyxJQUNULE1BQU0sR0FBRyxJQUNULE1BQU0sR0FBRztBQUNiLE1BQUksS0FBSyxPQUFPLE9BQU8sSUFDbkIsS0FBSyxPQUFPLE9BQU8sSUFDbkIsS0FBSyxPQUFPLE9BQU87QUFDdkIsTUFBSSxNQUFNLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSztBQUVuQyxNQUFJLE1BQU0sR0FBRztBQUNYLFVBQU0sSUFBSSxLQUFLLEtBQUssR0FBRztBQUN2QixVQUFNO0FBQ04sVUFBTTtBQUNOLFVBQU07QUFBQSxFQUNSO0FBRUEsTUFBSSxLQUFLLE1BQU0sS0FBSyxNQUFNLElBQ3RCLEtBQUssTUFBTSxLQUFLLE1BQU0sSUFDdEIsS0FBSyxNQUFNLEtBQUssTUFBTTtBQUMxQixRQUFNLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSztBQUUvQixNQUFJLE1BQU0sR0FBRztBQUNYLFVBQU0sSUFBSSxLQUFLLEtBQUssR0FBRztBQUN2QixVQUFNO0FBQ04sVUFBTTtBQUNOLFVBQU07QUFBQSxFQUNSO0FBRUEsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLLEtBQUssS0FBSyxLQUFLO0FBQ3hCLE1BQUksS0FBSyxLQUFLLEtBQUssS0FBSztBQUN4QixNQUFJLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFDeEIsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBU0YsU0FBUyxJQUFHLENBQUMsR0FBRztBQUNyQixTQUFPLFVBQVUsRUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFLLE9BQU8sRUFBRSxNQUFNLE9BQU8sRUFBRSxNQUFNLE9BQU8sRUFBRSxNQUFNLE9BQU8sRUFBRSxNQUFNLE9BQU8sRUFBRSxNQUFNLE9BQU8sRUFBRSxNQUFNO0FBQUE7QUFTM08sU0FBUyxLQUFJLENBQUMsR0FBRztBQUN0QixTQUFPLEtBQUssTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUc7QUFBQTtBQVdqSCxTQUFTLElBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRztBQUM3QixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixNQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEIsTUFBSSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixNQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEIsU0FBTztBQUFBO0FBV0YsU0FBUyxTQUFRLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDbEMsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixNQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUU7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QUNQLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFDWixTQUFPLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQztB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QixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsU0FBTztBQUFBO0FBV0YsU0FBUyxTQUFRLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDbEMsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLFNBQU87QUFBQTtBQVdGLFNBQVMsT0FBTSxDQUFDLEtBQUssR0FBRyxHQUFHO0FBQ2hDLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixTQUFPO0FBQUE7QUFVRixTQUFTLEtBQUksQ0FBQyxLQUFLLEdBQUc7QUFDM0IsTUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDdkIsTUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDdkIsTUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDdkIsTUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDdkIsU0FBTztBQUFBO0FBVUYsU0FBUyxNQUFLLENBQUMsS0FBSyxHQUFHO0FBQzVCLE1BQUksS0FBSyxLQUFLLE1BQU0sRUFBRSxFQUFFO0FBQ3hCLE1BQUksS0FBSyxLQUFLLE1BQU0sRUFBRSxFQUFFO0FBQ3hCLE1BQUksS0FBSyxLQUFLLE1BQU0sRUFBRSxFQUFFO0FBQ3hCLE1BQUksS0FBSyxLQUFLLE1BQU0sRUFBRSxFQUFFO0FBQ3hCLFNBQU87QUFBQTtBQVdGLFNBQVMsSUFBRyxDQUFDLEtBQUssR0FBRyxHQUFHO0FBQzdCLE1BQUksS0FBSyxLQUFLLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtBQUM1QixNQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7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RSxPQUFPLElBQU0sS0FBSztBQUFBLElBQ3BCLEVBQUUsT0FBTyxJQUFNLEtBQUs7QUFBQSxJQUNwQixFQUFFLE9BQU8sSUFBTSxLQUFLO0FBQUEsSUFDcEIsRUFBRSxPQUFPLElBQU0sS0FBSztBQUFBLElBQ3BCLENBQUMsSUFBTSxRQUFRLEtBQUs7QUFBQSxJQUNwQixDQUFDLElBQU0sUUFBUSxLQUFLO0FBQUEsSUFDcEIsQ0FBQyxJQUFNLFFBQVEsS0FBSztBQUFBLElBQ3BCLENBQUMsSUFBTSxRQUFRLEtBQUs7QUFBQSxJQUNwQixFQUFFLFFBQVEsT0FBTyxDQUFHO0FBQUEsSUFDcEIsRUFBRSxRQUFRLE9BQU8sQ0FBRztBQUFBLElBQ3BCLEVBQUUsUUFBUSxPQUFPLENBQUc7QUFBQSxJQUNwQixFQUFFLFFBQVEsT0FBTyxDQUFHO0FBQUEsRUFDdEI7QUFFQSxRQUFNLGFBQWlDO0FBQUEsSUFDckMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQ1IsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQ1IsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQ1IsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQ1IsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQ1IsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUFBLElBQ1QsQ0FBQyxHQUFHLEdBQUcsRUFBRTtBQUFBLElBQ1QsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQ1IsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQ1IsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQ1IsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUFBLElBQ1QsQ0FBQyxHQUFHLEdBQUcsRUFBRTtBQUFBLElBQ1QsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUFBLElBQ1QsQ0FBQyxJQUFJLEdBQUcsQ0FBQztBQUFBLElBQ1QsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQ1IsQ0FBQyxHQUFHLEdBQUcsRUFBRTtBQUFBLElBQ1QsQ0FBQyxHQUFHLEdBQUcsRUFBRTtBQUFB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TUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUU3QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFFN0MsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BRTdDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM5QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUU3QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFFN0MsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJ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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWtxQmIsS0FBSzs7O0FDbHFCUCxJQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFnQmIsS0FBSzs7O0FDaEJQLElBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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QyxVQUFNLFdBQVcsWUFBWTtBQUU3QixRQUFJLFlBQVksS0FBSyxZQUFZLEdBQUc7QUFDbEMsV0FBSyxlQUFlLFFBQVE7QUFDNUIsV0FBSyxlQUFlO0FBRXBCLFdBQUssS0FBSyxXQUFXLFFBQVE7QUFBQSxJQUMvQjtBQUVBLFNBQUssd0JBQXdCO0FBQUE7QUFFakM7OztBQ3JYQSxJQUFJLFNBQTZCO0FBQ2pDLElBQUksV0FBbUM7QUFRdkMsSUFBTSxvQkFBb0IsQ0FBb0IsV0FBc0I7QUFDbEUsUUFBTSxhQUFhLFNBQVMsY0FBaUIsTUFBTTtBQUNuRCxPQUFLLFlBQVk7QUFDZixVQUFNLElBQUksTUFBTSxpQkFBaUIsbUJBQW1CO0FBQUEsRUFDdEQ7QUFDQSxTQUFPO0FBQUE7QUFHVCxJQUFNLGVBQWUsQ0FBQyxXQUNwQixrQkFBcUMsTUFBTTtBQUM3QyxJQUFNLGlCQUFpQixDQUFDLFdBQ3RCLGtCQUF1QyxNQUFNO0FBQy9DLElBQU0sY0FBYyxDQUFDLFdBQ25CLGtCQUFvQyxNQUFNO0FBUTVDLElBQU0sY0FBYyxPQUFPLFFBQW9CO0FBQzdDLE1BQUksUUFBUTtBQUNWLFdBQU8sTUFBTSxJQUFJLE9BQU87QUFBQSxFQUMxQixPQUFPO0FBQ0wsWUFBUSxNQUFNLElBQUksT0FBTztBQUFBO0FBRzNCLE1BQUksVUFBVTtBQUNaLGFBQVMsS0FBSztBQUFBLEVBQ2hCO0FBQUE7QUFFRixPQUFPLGlCQUFpQixTQUFTLFdBQVc7QUFRNUMsSUFBTSxhQUFhLFlBQVk7QUFDN0IsV0FBUyxJQUFJLE9BQU8sY0FBYztBQUNsQyxTQUFPLElBQUkscUJBQXFCO0FBRWhDLE1BQUk7QUFNRixVQUFNLGdCQUFnQixhQUFhLG1CQUFtQjtBQUN0RCxVQUFNLGtCQUFrQixZQUFZLHVCQUF1QjtBQUMzRCxVQUFNLGFBQWEsZUFBZSxhQUFhO0FBQy9DLFVBQU0sd0JBQXdCLFlBQVksd0JBQXdCO0FBQ2xFLFVBQU0scUJBQXFCLFlBQVkscUJBQXFCO0FBTTVELFNBQUssZUFBTyxRQUFRLGtCQUFrQixHQUFHO0FBQ3ZDLFlBQU0sSUFBSSxNQUFNLHNDQUFzQztBQUFBLElBQ3hEO0FBTUEsZUFBVyxJQUFJLFdBQVc7QUFBQSxNQUN4QjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBRUQsV0FBTyxJQUFJLDRCQUE0QjtBQUV2QyxVQUFNLFNBQVMsS0FBSztBQUVwQixXQUFPLElBQUksMkJBQTJCO0FBRXRDLGFBQVMsTUFBTTtBQUVmLFdBQU8sSUFBSSx1QkFBdUI7QUFBQSxXQUMzQixLQUFQO0FBQ0EsV0FBTyxNQUFNLFdBQVksS0FBZSxVQUFVO0FBQ2xELFVBQU07QUFBQTtBQUFBO0FBS1YsT0FBTyxpQkFBaUIsUUFBUSxZQUFZLEtBQUs7IiwKICAiZGVidWdJZCI6ICI0MjFDRENCNTE0Njk0MTIzNjQ3NTZlMjE2NDc1NmUyMSIsCiAgIm5hbWVzIjogW10KfQ==

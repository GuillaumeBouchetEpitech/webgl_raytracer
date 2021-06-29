
import { KeyboardHandler, keyCodes } from "../inputs/KeyboardHandler";

type IVec3 = [number, number, number];

interface IFreeFlyControllerDef {
    position: IVec3;
    theta: number;
    phi: number;
    mouseSensivity: number;
    movingSpeed: number;
};

export class FreeFlyController {

    private _isActivated: boolean = false;
    private _theta: number = 0;
    private _phi: number = 0;

    private _mouseSensivity: number;
    private _movingSpeed: number;

    private _position: IVec3 = [0, 0, 0]; // TODO: hardcoded
    private _target: IVec3 = [0, 0, 0];
    private _forward: IVec3 = [1, 0, 0]; // TODO: hardcoded
    private _left: IVec3 = [0, 1, 0]; // TODO: hardcoded
    private _up: IVec3 = [0, 1, 0]; // TODO: hardcoded

    private _keyboardHandler = new KeyboardHandler();

    private _mouseMoveCallback: (event: MouseEvent) => void;

    constructor(def: IFreeFlyControllerDef) {

        this._mouseSensivity = def.mouseSensivity;
        this._movingSpeed = def.movingSpeed;
        this._position[0] = def.position[0];
        this._position[1] = def.position[1];
        this._position[2] = def.position[2];
        this._theta = def.theta;
        this._phi = def.phi;

        const mouseMoveCallback = (event: MouseEvent) => {

            const movementX: number = event.movementX || (event as any).mozMovementX || (event as any).webkitMovementX || 0;
            const movementY: number = event.movementY || (event as any).mozMovementY || (event as any).webkitMovementY || 0;

            this._theta -= movementX * this._mouseSensivity;
            this._phi   -= movementY * this._mouseSensivity;
        };

        this._mouseMoveCallback = mouseMoveCallback.bind(this);
    }

    activate(anchorElement: HTMLElement) {

        if (this._isActivated)
            return;
        this._isActivated = true;

        anchorElement.addEventListener('mousemove', this._mouseMoveCallback, false);

        this._keyboardHandler.activate();
    }

    deactivate(anchorElement: HTMLElement) {

        if (!this._isActivated)
            return;
        this._isActivated = false;

        anchorElement.removeEventListener('mousemove', this._mouseMoveCallback, false);

        this._keyboardHandler.deactivate();
    }

    isActivated() {
        return this._isActivated;
    }

    update(elapsedTime: number) {

        { // keyboard

            // forward
            if (this._keyboardHandler.isPressed( keyCodes.KEY_Z ) ||
                this._keyboardHandler.isPressed( keyCodes.KEY_W )) {

                for (let ii = 0; ii < 3; ++ii)
                    this._position[ii] += this._forward[ii] * elapsedTime * this._movingSpeed;
            }

            // backward
            if (this._keyboardHandler.isPressed( keyCodes.KEY_S )) {

                for (let ii = 0; ii < 3; ++ii)
                    this._position[ii] -= this._forward[ii] * elapsedTime * this._movingSpeed;
            }

            // strafe left
            if (this._keyboardHandler.isPressed( keyCodes.KEY_A ) ||
                this._keyboardHandler.isPressed( keyCodes.KEY_Q )) {

                for (let ii = 0; ii < 3; ++ii)
                    this._position[ii] -= this._left[ii] * elapsedTime * this._movingSpeed;
            }

            // strafe right
            if (this._keyboardHandler.isPressed( keyCodes.KEY_D )) {

                for (let ii = 0; ii < 3; ++ii)
                    this._position[ii] += this._left[ii] * elapsedTime * this._movingSpeed;
            }

        } // keyboard

        { // update internals

            const verticalLimit = 89;

            this._phi = Math.min(Math.max(this._phi, -verticalLimit), +verticalLimit)

            const Up: IVec3 = [0, 1, 0];

            const upRadius = Math.cos((this._phi + 90) * 3.14 / 180);
            this._up[1] = Math.sin((this._phi + 90) * 3.14 / 180);
            this._up[0] = upRadius * Math.cos(this._theta * 3.14 / 180);
            this._up[2] = upRadius * Math.sin(this._theta * 3.14 / 180);

            const forwardRadius = Math.cos(this._phi * 3.14 / 180);
            this._forward[1] = Math.sin(this._phi * 3.14 / 180);
            this._forward[0] = forwardRadius * Math.cos(this._theta * 3.14 / 180);
            this._forward[2] = forwardRadius * Math.sin(this._theta * 3.14 / 180);

            this._left[0] = this._up[1] * this._forward[2] - this._up[2] * this._forward[1];
            this._left[1] = this._up[2] * this._forward[0] - this._up[0] * this._forward[2];
            this._left[2] = this._up[0] * this._forward[1] - this._up[1] * this._forward[0];

            this._target[0] = this._position[0] + this._forward[0];
            this._target[1] = this._position[1] + this._forward[1];
            this._target[2] = this._position[2] + this._forward[2];

        } // update internals
    }

    getPosition(): IVec3 {
        return [
            this._position[0],
            this._position[1],
            this._position[2],
        ];
    }

    getTarget(): IVec3 {
        return [
            this._target[0],
            this._target[1],
            this._target[2],
        ];
    }

    getUpAxis(): IVec3 {
        return [
            this._up[0],
            this._up[1],
            this._up[2],
        ];
    }

    getTheta(): number {
        return this._theta;
    }

    getPhi(): number {
        return this._phi;
    }
}

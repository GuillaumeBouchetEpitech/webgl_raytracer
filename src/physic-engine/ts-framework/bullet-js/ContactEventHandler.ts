
import { IPhysicBody } from "./PhysicBody";

import * as glm from "gl-matrix";

export type allContactEvents = "beginContact" | "updateContact" | "endContact" | "ccdContact";

export interface ContactDataWorld {
	contactId: number,
	rigidBodyA: IPhysicBody,
	rigidBodyB: IPhysicBody,
	// other?: IPhysicBody,
	position: glm.vec3,
	normalB: glm.vec3,
}

export interface ContactDataBody {
	contactId: number,
	target?: ContactEventHandler<ContactDataBody>,
	other: IPhysicBody,
	position: glm.vec3,
	normalB: glm.vec3,
}

export type contactEvent<T extends allContactEvents, D> = { type: T, data: D };
export type contactCallback<T extends allContactEvents, D> = (data: contactEvent<T, D>) => void

export interface IContactEventHandler<D> {

	isEventListenedTo(type: allContactEvents): boolean;
	addEventListener<T extends allContactEvents>(type: T, listener: contactCallback<T, D>): void;
	on<T extends allContactEvents>(type: T, listener: contactCallback<T, D>): void;
	hasEventListener<T extends allContactEvents>(type: T, listener: contactCallback<T, D>): void;
	removeEventListener<T extends allContactEvents>(type: T, listener: contactCallback<T, D>): void;
	dispatchEvent<T extends allContactEvents>(event: contactEvent<T, D>): void;
};

export class ContactEventHandler<D> implements IContactEventHandler<D> {

  private _listenersMap = new Map<allContactEvents, contactCallback<allContactEvents, D>[]>();

  // constructor() {
  // }

	isEventListenedTo(type: allContactEvents): boolean {
		const listeners = this._listenersMap.get(type);
		return (!!listeners && listeners.length > 0);
	}

	addEventListener<T extends allContactEvents>(type: T, listener: contactCallback<T, D>): void {
		// if (!this.isEventAllowed(type))
		// 	return ErrorHandler.reportError(`event type not in the white list, type=${type}`);

		let listeners = this._listenersMap.get(type);
		if (!listeners) {
			listeners = [];
			this._listenersMap.set(type, listeners);
		}

    // dirty cast
		if (listeners.indexOf(listener as contactCallback<allContactEvents, D>) !== -1) {
			// return ErrorHandler.reportError(`duplicate event listener, type=${type}`);
      throw new Error(`duplicated event listener, type=${type}`);
    }

    // dirty cast
		listeners.push(listener as contactCallback<allContactEvents, D>);
	}

	on<T extends allContactEvents>(type: T, listener: contactCallback<T, D>) {
		this.addEventListener(type, listener);
	}

	hasEventListener<T extends allContactEvents>(type: T, listener: contactCallback<T, D>) {
    // if (!this.isEventAllowed(type))
		// 	return ErrorHandler.reportError(`event type not in the white list, type=${type}`);

		const listeners = this._listenersMap.get(type);

    // dirty cast
		return (listeners !== undefined && listeners.indexOf(listener as contactCallback<allContactEvents, D>) !== -1);
	}

	removeEventListener<T extends allContactEvents>(type: T, listener: contactCallback<T, D>) {
		// if (!this.isEventAllowed(type))
		// 	return ErrorHandler.reportError(`event type not in the white list, type=${type}`);

		const listeners = this._listenersMap.get(type);

		if (listeners === undefined)
			return

		const index = listeners.indexOf(listener as contactCallback<allContactEvents, D>);

		if (index === -1) {
      throw new Error(`unknown event listener, type=${type}`);
			// return ErrorHandler.reportError(`unknown event listener, type=${type}`);
    }

		listeners.splice(index, 1);
	}

	dispatchEvent<T extends allContactEvents>(event: contactEvent<T, D>) {
		// if (!this.isEventAllowed(event.type))
		// 	return ErrorHandler.reportError(`event type not in the white list, type=${event.type}`);

		const listeners = this._listenersMap.get(event.type);
		if (listeners === undefined) {
			return;
    }

		// event.target = this;

		const listenersCopy = listeners.slice(0);

		for (let ii = 0; ii < listenersCopy.length; ++ii) {
			listenersCopy[ii].call(this, event);
    }
	}
}



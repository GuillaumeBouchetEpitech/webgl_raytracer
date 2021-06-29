
"use strict"

interface IDefinition {
    targetElement: HTMLElement;
    enabledCallback: () => void;
    disabledCallback: () => void;
    errorCallback?: (error: any) => void;
};

export const PointerLockSetup = (def: IDefinition) => {

    def.targetElement.requestPointerLock = def.targetElement.requestPointerLock ||
                                            (def.targetElement as any).mozRequestPointerLock ||
                                            (def.targetElement as any).webkitRequestPointerLock;

    document.exitPointerLock = document.exitPointerLock ||
                               (document as any).mozExitPointerLock ||
                               (document as any).webkitExitPointerLock;

    def.targetElement.onclick = () => {

        if (def.targetElement.requestPointerLock)
            def.targetElement.requestPointerLock();
    };

    //
    //
    //

    const onLockChange = () => {

        if (document.pointerLockElement === def.targetElement ||
            (document as any).mozPointerLockElement === def.targetElement ||
            (document as any).webkitPointerLockElement === def.targetElement) {

            def.enabledCallback();
        }
        else {


            def.disabledCallback();
        }
    };

    const onLockError = (event: Event) => {

        console.error("Pointer lock failed");
        console.error(event);

        if (def.errorCallback)
            def.errorCallback(event);
    };

    //
    //
    //

    if ("onpointerlockchange" in document)
        document.addEventListener('pointerlockchange', onLockChange, false);
    else if ("onmozpointerlockchange" in document)
        (document as any).addEventListener('mozpointerlockchange', onLockChange, false);
    else if ("onwebkitpointerlockchange" in document)
        (document as any).addEventListener('webkitpointerlockchange', onLockChange, false);

    if ("onpointerlockerror" in document)
        document.addEventListener('pointerlockerror', onLockError, false);
    else if ("onmozpointerlockerror" in document)
        (document as any).addEventListener('mozpointerlockerror', onLockError, false);
    else if ("onwebkitpointerlockerror" in document)
        (document as any).addEventListener('webkitpointerlockerror', onLockError, false);

};

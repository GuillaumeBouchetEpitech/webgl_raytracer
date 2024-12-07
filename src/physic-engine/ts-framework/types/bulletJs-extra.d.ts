export default bulletjs;
declare function bulletjs<T>(target?: T): Promise<T & typeof bulletjs>;
declare module bulletjs {

    const DISABLE_DEACTIVATION: number;
    const CF_STATIC_OBJECT: number;
    const CF_KINEMATIC_OBJECT: number;
    const CF_NO_CONTACT_RESPONSE: number;
    const CF_CUSTOM_MATERIAL_CALLBACK: number;

    function listenToContactCallbacks(): void;

    function isListened(event: "beginContact");
    function isListened(event: "updateContact");
    function isListened(event: "endContact");
    function isListened(event: "ccdContact");
    function addEventListener(event: "beginContact", callback: (data: { type: "beginContact", data: btjsContactData }) => void);
    function addEventListener(event: "updateContact", callback: (data: { type: "updateContact", data: btjsContactData }) => void);
    function addEventListener(event: "endContact", callback: (data: { type: "endContact", data: btjsContactData }) => void);
    function addEventListener(event: "ccdContact", callback: (data: { type: "ccdContact", data: btjsContactData }) => void);
    function on(event: "beginContact", callback: (data: { type: "beginContact", data: btjsContactData }) => void);
    function on(event: "updateContact", callback: (data: { type: "updateContact", data: btjsContactData }) => void);
    function on(event: "endContact", callback: (data: { type: "endContact", data: btjsContactData }) => void);
    function on(event: "ccdContact", callback: (data: { type: "ccdContact", data: btjsContactData }) => void);
    function removeEventListener(event: "beginContact", callback: (data: { type: "beginContact", data: btjsContactData }) => void);
    function removeEventListener(event: "updateContact", callback: (data: { type: "updateContact", data: btjsContactData }) => void);
    function removeEventListener(event: "endContact", callback: (data: { type: "endContact", data: btjsContactData }) => void);
    function removeEventListener(event: "ccdContact", callback: (data: { type: "ccdContact", data: btjsContactData }) => void);
    function containListener(event: "beginContact", callback: (data: { type: "beginContact", data: btjsContactData }) => void);
    function containListener(event: "updateContact", callback: (data: { type: "updateContact", data: btjsContactData }) => void);
    function containListener(event: "endContact", callback: (data: { type: "endContact", data: btjsContactData }) => void);
    function containListener(event: "ccdContact", callback: (data: { type: "ccdContact", data: btjsContactData }) => void);
    function hasEventListener(event: "beginContact", callback: (data: { type: "beginContact", data: btjsContactData }) => void);
    function hasEventListener(event: "updateContact", callback: (data: { type: "updateContact", data: btjsContactData }) => void);
    function hasEventListener(event: "endContact", callback: (data: { type: "endContact", data: btjsContactData }) => void);
    function hasEventListener(event: "ccdContact", callback: (data: { type: "ccdContact", data: btjsContactData }) => void);

    class btjsContactData {
        getId(): number;
        getBodyA(): btRigidBody;
        getBodyB(): btRigidBody;
        getPosition(): btVector3;
        getNormalB(): btVector3;
    }

}

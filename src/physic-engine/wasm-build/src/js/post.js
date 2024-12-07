
var _supportedEvents = [
    "beginContact",
    "updateContact",
    "endContact",
    "ccdContact",
];

var _listenersMap = {};

Module.addEventListener = function(eventType, listener) {

    if (_supportedEvents.indexOf(eventType) === -1) {
        throw new Error("unknown event, type="+eventType+", supported="+_supportedEvents);
    }

    var currentListeners = _listenersMap[eventType];
    if (currentListeners === undefined) {
        currentListeners = [];
        _listenersMap[eventType] = currentListeners;
    }

    if (currentListeners.indexOf(listener) !== -1) {
        throw new Error("duplicate event listener, type="+eventType);
    }

    currentListeners.push(listener);
};

Module.on = Module.addEventListener;

Module.isListened = function(eventType) {

    var currentListeners = _listenersMap[eventType];
    return (
        currentListeners !== undefined &&
        currentListeners.length > 0
    );
};

Module.containListener = function(eventType, listener) {

    var currentListeners = _listenersMap[eventType];
    return (
        currentListeners !== undefined &&
        currentListeners.indexOf(listener) !== -1
    );
};

Module.hasEventListener = Module.containListener;

Module.removeEventListener = function(eventType, listener) {

    var currentListeners = _listenersMap[eventType];
    if (currentListeners === undefined) {
        return;
    }

    var index = currentListeners.indexOf(listener);
    if (index === -1) {
        throw new Error("unknown event listener, type="+type);
    }

    currentListeners.splice(index, 1); // <= remove from array
}

function dispatchEvent(event) {

    if (_supportedEvents.indexOf(event.type) === -1) {
        throw new Error("unknown event, type="+event.type+", supported="+_supportedEvents);
    }

    var currentListeners = _listenersMap[event.type];
    if (currentListeners === undefined) {
        return;
    }

    // a copy is used in case a callback modify the original array
    var listenersCopy = currentListeners.slice(0); // <= FAST
    listenersCopy.forEach(function(callback) { callback(event); });
}

function contactCallback(eventId, pContactData) {

    var eventType = _supportedEvents[eventId];

    if (!Module.isListened(eventType)) {
        return;
    }

    var data = Module.wrapPointer(pContactData, Module.btjsContactData);

    dispatchEvent({ type: eventType, data: data, });
}

// var contactCallbackPtr = Module.addFunction(contactCallback);
// var setContactCallback = Module.cwrap("setContactCallback", null, ["number"]);
// setContactCallback(contactCallbackPtr);

var listenToContactCallbacksCalled = false;

Module.listenToContactCallbacks = function() {

    if (listenToContactCallbacksCalled) {
        return;
    }
    listenToContactCallbacksCalled = true;

    var contactCallbackPtr = Module.addFunction(contactCallback, "vii"); // vii -> Void Int Int
    var setContactCallback = Module.cwrap("setContactCallback", null, ["number"]);
    setContactCallback(contactCallbackPtr);
}

Module.DISABLE_DEACTIVATION = 4;
Module.CF_STATIC_OBJECT = 1;
Module.CF_KINEMATIC_OBJECT = 2;
Module.CF_NO_CONTACT_RESPONSE = 4;
Module.CF_CUSTOM_MATERIAL_CALLBACK = 8; // <= allows per-triangle material (friction/restitution)

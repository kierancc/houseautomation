// Constructor
// Takes a reference to a DataModel object
function Controller(dataModel) {
    this.dataModel = dataModel;
    this.views = [];
    this.components = [];
}

// Member variables
Controller.prototype.dataModel;
Controller.prototype.views;
Controller.prototype.components;
Controller.prototype.controlPanel;

// Functions

// Function called to register a view with the controller
// This needs to be done so that the controller is aware of the view and can notify it of state changes
Controller.prototype.registerView = function (view) {
    // Ensure required functions exist
    if (typeof view.receiveInitialData !== "function") {
        throw "Function 'receiveInitialData' not implemented by provided view";
    }
    else if (typeof view.getFriendlyName !== "function") {
        throw "Function 'getFriendlyName' not implemented by provided view";
    }
    else if (typeof view.onRoomStateUpdated !== "function") {
        throw "Function 'onRoomStateUpdated' not implemented by provided view";
    }
    else if (typeof view.show !== "function") {
        throw "Function 'show' not implemented by provided view";
    }
    else if (typeof view.hide !== "function") {
        throw "Function 'hide' not implemented by provided view";
    }

    this.views.push(view);

    // Send initial state data to the view
    view.receiveInitialData(this.dataModel.getRooms());
};

// Function called to register a component with the controller
// This needs to be done so that the controller is aware of the component and can notify it of state changes
Controller.prototype.registerComponent = function (component) {
    // Ensure required functions exist
    if (typeof component.onRoomStateUpdated !== "function") {
        throw "Function 'onRoomStateUpdated' not implemented by provided component";
    }
    else if (typeof component.getFriendlyName !== "function") {
        throw "Function 'getFriendlyName' not implemented by provided component";
    }
    else if (typeof component.drawGraphicalState !== "function") {
        throw "Function 'drawGraphicalState' not implemented by provided component";
    }
    else if (typeof component.createControlPanelItem !== "function") {
        throw "Function 'createControlPanelItem' not implemented by provided component";
    }
    else if (typeof component.addControlledRoom !== "function") {
        throw "Function 'addControlledRoom' not implemented by provided component";
    }

    // Ensure that the friendly name of the component is unique
    if (this.components[component.getFriendlyName()] !== undefined) {
        throw "Duplicate Component : " + component.getFriendlyName();
    }

    this.components[component.getFriendlyName()] = component;
};

// Function called to register a control panel with the controller
// This needs to be done so that the controller is aware of the control panel
Controller.prototype.registerControlPanel = function (controlPanel) {
    // Ensure required functions exist
    if (typeof controlPanel.receiveInitialData !== "function") {
        throw "Function 'receiveInitialData' not implemented by provided controlPanel";
    }
    else if (typeof controlPanel.show !== "function") {
        throw "Function 'show' not implemented by provided controlPanel";
    }
    else if (typeof controlPanel.hide !== "function") {
        throw "Function 'hide' not implemented by provided controlPanel";
    }

    this.controlPanel = controlPanel;

    // Send initial state data to the control panel
    controlPanel.receiveInitialData(this.dataModel.getRooms());
};

// Function called to update the state of the system
Controller.prototype.updateRoomState = function (roomID, componentName, value) {
    // First update the data model
    this.dataModel.updateRoomState(roomID, componentName, value);

    // Then trigger a RoomStateUpdatedEvent for the relevant component
    this.components[componentName].onRoomStateUpdated(new RoomStateUpdatedEvent(roomID, componentName, value));

    // Finally trigger a RoomStateUpdatedEvent for all registered views
    for (var i = 0; i < this.views.length; i++) {
        this.views[i].onRoomStateUpdated(new RoomStateUpdatedEvent(roomID, componentName, value));
    }
};

// Function called to get the Room object in the data model corresponding to the provided room ID
Controller.prototype.getRoom = function (roomID) {
    return this.dataModel.getRoom(roomID);
};

// Function called to cause the default view to be displayed
Controller.prototype.showDefaultView = function () {
    this.views[0].show(); // The default view is the view that was first added
};

// Function called to change the displayed view
Controller.prototype.changeView = function (viewID) {
    // Hide all views except the view indicated by viewID
    for (var i = 0; i < this.views.length; i++) {
        if (i === viewID) {
            this.views[i].show();
        }
        else {
            this.views[i].hide();
        }
    }
};

// Function called to show the ControlPanel
Controller.prototype.showControlPanel = function () {
    this.controlPanel.show();
};

// Function called to hide the ControlPanel
Controller.prototype.hideControlPanel = function () {
    this.controlPanel.hide();
};

// Function called by the ControlPanel that delegates the creation of a control panel item to the correct component
Controller.prototype.createComponentControlPanelItem = function (roomID, componentName, initialValue) {
    return this.components[componentName].createControlPanelItem(roomID, initialValue);
};

// Function called by the GraphicalViewer to get a map of function pointers to the graphical state drawing functions 
// of all registered components
Controller.prototype.getComponentGraphicalDrawFunctions = function () {
    var context = this;

    var functions = [];
    Object.keys(this.components).forEach(function (key) {
        functions[key] = context.components[key].drawGraphicalState;
    });
        
    return functions;
};
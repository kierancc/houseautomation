// Constructor
function TemperatureComponent() {
    this.controlledRooms = [];
}

// Member variables
TemperatureComponent.prototype.friendlyName = "TEMP";
TemperatureComponent.prototype.controlledRooms;

// Functions

// Function that returns the friendly name of this Component
TemperatureComponent.prototype.getFriendlyName = function () {
    return this.friendlyName;
};

// Function called by the controller to create a control panel item for this component for a given room
// The control panel item must clearly indicate to the user what it controls (e.g. "Light") and provide
// a means for this value to be changed.  The control must also call the houseAutomation.updateRoomState(...)
// function with the new value if it is changed by the user
// This function returns a div, which wraps the control
TemperatureComponent.prototype.createControlPanelItem = function (roomID, initialValue) {
    // Create a new div to hold the ControlPanelItem
    var itemDiv = document.createElement("div");
    itemDiv.className = "controlPanelItem";

    // Create the label for the control
    var itemLabel = document.createElement("span");
    itemLabel.innerText = this.friendlyName + ": ";
    itemLabel.className = "controlPanelItemLabel";

    itemDiv.appendChild(itemLabel);

    // Build the control that modifies the value
    var item = document.createElement("input");
    item.id = "ControlPanelItemRoom" + roomID + "Component" + this.friendlyName;
    item.className = "tempSpinnerInput";
    item.type = "text";
    item.value = initialValue;

    // Save the identifying data to this element for consumption in any event handlers
    $(item).data("roomID", roomID);
    $(item).data("componentName", this.friendlyName);

    // Append the control to the parent
    // Note that this must be called before initializing the spinner
    itemDiv.appendChild(item);

    $(item).spinner({
        step: 1,
        classes: { "ui-spinner": "tempSpinnerContainer" },
        stop: function (event, ui) {
            var roomID = $(this).data("roomID");
            var componentName = $(this).data("componentName");

            // Update the system state
            houseAutomation.updateRoomState(roomID, componentName, this.value);
        }
    });

    // Return the div
    return itemDiv;
};

// Event handler for roomStateUpdated event
TemperatureComponent.prototype.onRoomStateUpdated = function (roomStateUpdatedEvent) {
    // Here in a real automation system we would actually cause the state of the room to change
    // e.g. by actually turning on or off a heater, or physically opening or closing the curtains using a motor
    // and return true if the operation succeeded, false otherwise
    // Data model and view updating is handled by the controller, not the component
    return true;
};

// Function called by the GraphicalViewer to draw a graphical representation of the current state of the room
// for this Component
TemperatureComponent.prototype.drawGraphicalState = function (context, graphicalRoom, value) {
    var originalFont = context.font;
    var originalFillStyle = context.fillStyle;

    context.font = "12px Arial";
    context.fillStyle = "black";

    // Append degree symbol
    var outputValue = value + "°";

    // Draw the current temperature beside the window
    context.fillText(outputValue, graphicalRoom.windowOriginX + graphicalRoom.windowWidth + 6, graphicalRoom.windowOriginY + 12);

    context.font = originalFont;
    context.fillStyle = originalFillStyle;
};

// Function called to notify this Component of a room that it can control
TemperatureComponent.prototype.addControlledRoom = function (roomID) {
    this.controlledRooms.push(roomID);
};
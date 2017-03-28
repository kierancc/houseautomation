function LightComponent() {
    this.controlledRooms = [];
}

// Member variables
LightComponent.prototype.friendlyName = "LIGHT";
LightComponent.prototype.controlledRooms;

// Functions

LightComponent.prototype.getFriendlyName = function () {
    return this.friendlyName;
};

LightComponent.prototype.createControlPanelItem = function (roomID, initialValue) {
    // Create a new div to hold the ControlPanelItem
    var itemDiv = document.createElement("div");
    itemDiv.className = "controlPanelItem";

    // Create the label for the control
    var itemLabel = document.createElement("span");
    itemLabel.innerText = this.friendlyName + ": ";
    itemLabel.className = "controlPanelItemLabel";

    itemDiv.appendChild(itemLabel);

    // Build the control that modifies the value
    // Determine initial state (convert bool -> int)
    // true: 1, false: 0
    var initialState = initialValue ? 1 : 0;

    var item = document.createElement("div");
    item.id = "ControlPanelItemRoom" + roomID + "Component" + this.friendlyName;
    item.className = "toggleDiv";

    // Save the identifying data to this element for consumption in any event handlers
    $(item).data("roomID", roomID);
    $(item).data("componentName", this.friendlyName);

    $(item).slider({
        orientation: "horizontal",
        min: 0,
        max: 1,
        step: 1,
        value: initialState,
        slide: function (event, ui) {
            // Convert value (int -> bool)
            var updatedState = ui.value === 1 ? true : false;
            var roomID = $(this).data("roomID");
            var componentName = $(this).data("componentName");

            houseAutomation.updateRoomState(roomID, componentName, updatedState);
        }
    });

    // Append the control to the parent
    itemDiv.appendChild(item);

    // Return the div
    return itemDiv;
};

LightComponent.prototype.onRoomStateUpdated = function (roomStateUpdatedEvent) {
    // Here in a real automation system we would actually cause the state of the room to change
    // e.g. by actually turning on or off a heater, or physically opening or closing the curtains using a motor
    // and return true if the operation succeeded, false otherwise
    // Data model and view updating is handled by the controller, not the component
    return true;
};

LightComponent.prototype.drawGraphicalState = function (context, graphicalRoom, value) {
    // We will represent the state of the light by drawing a simple light bulb descending in the middle of the window
    // If the light is on, the bulb will be yellow, if the light is off the bulb will be grey

    // Determine the relevant points for drawing the light bulb state
    var lightWireOriginX = graphicalRoom.windowOriginX + (graphicalRoom.windowWidth / 2);
    var lightWireOriginY = graphicalRoom.windowOriginY;
    var lightWireLength = graphicalRoom.windowHeight / 3;
    var lightBulbRadius = graphicalRoom.windowHeight / 10;

    // Save original context state
    var originalLineWidth = context.lineWidth;
    var originalStrokeStyle = context.strokeStyle;
    var originalFillStyle = context.fillStyle;

    // Set new state
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.fillStyle = value == true ? "yellow" : "grey"; // Yellow if true, grey if false

    // Draw wire
    context.beginPath();
    context.moveTo(lightWireOriginX, lightWireOriginY);
    context.lineTo(lightWireOriginX, lightWireOriginY + lightWireLength);
    context.closePath();
    context.stroke();

    // Draw light bulb sphere
    context.beginPath();
    context.arc(lightWireOriginX, lightWireOriginY + lightWireLength + lightBulbRadius, lightBulbRadius, 0, 2 * Math.PI, false);
    context.closePath();
    context.fill();
    context.stroke();

    // Restore context state
    context.lineWidth = originalLineWidth;
    context.strokeStyle = originalStrokeStyle;
    context.fillStyle = originalFillStyle;
};

LightComponent.prototype.addControlledRoom = function (roomID) {
    this.controlledRooms.push(roomID);
};
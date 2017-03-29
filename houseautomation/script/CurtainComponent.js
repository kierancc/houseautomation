// Constructor
function CurtainComponent() {
    this.controlledRooms = [];
}

// Member variables
CurtainComponent.prototype.friendlyName = "CURTAIN";
CurtainComponent.prototype.controlledRooms;

// Functions

// Function that returns the friendly name of this Component
CurtainComponent.prototype.getFriendlyName = function () {
    return this.friendlyName;
};

// Function called by the controller to create a control panel item for this component for a given room
// The control panel item must clearly indicate to the user what it controls (e.g. "Light") and provide
// a means for this value to be changed.  The control must also call the houseAutomation.updateRoomState(...)
// function with the new value if it is changed by the user
// This function returns a div, which wraps the control
CurtainComponent.prototype.createControlPanelItem = function (roomID, initialValue) {
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
    item.className = "toggleDiv"; // Style the control appropriately

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

            // Update the system state
            houseAutomation.updateRoomState(roomID, componentName, updatedState);
        }
    });

    // Append the control to the parent
    itemDiv.appendChild(item);

    // Return the div
    return itemDiv;
};

// Event handler for roomStateUpdated event
CurtainComponent.prototype.onRoomStateUpdated = function (roomStateUpdatedEvent) {
    // Here in a real automation system we would actually cause the state of the room to change
    // e.g. by actually turning on or off a heater, or physically opening or closing the curtains using a motor
    // and return true if the operation succeeded, false otherwise
    // Data model and view updating is handled by the controller, not the component
    return true;
};

// Function called by the GraphicalViewer to draw a graphical representation of the current state of the room
// for this Component
CurtainComponent.prototype.drawGraphicalState = function (context, graphicalRoom, value) {
    // Curtains are represented as follows:
    // Open curtains have two arcs on the top left and top right side of the window, exposing the center of the window
    // Closed curtains cover the whole window, and have a few interspersed lines to create contour

    // Save original context state
    var originalLineWidth = context.lineWidth;
    var originalStrokeStyle = context.strokeStyle;
    var originalFillStyle = context.fillStyle;

    // Set new state
    context.lineWidth = 1;
    context.strokeStyle = "#330033";
    context.fillStyle = "#660066";

    if (value === true) {
        // Determine relevant points
        var topLeftCurtainOriginX = graphicalRoom.windowOriginX;
        var topLeftCurtainOriginY = graphicalRoom.windowOriginY;
        var topRightCurtainOriginX = topLeftCurtainOriginX + graphicalRoom.windowWidth;
        var topRightCurtainOriginY = topLeftCurtainOriginY;
        var curtainRadius = graphicalRoom.windowHeight * 0.66;

        // Draw the top left curtain
        context.beginPath();
        context.arc(topLeftCurtainOriginX, topLeftCurtainOriginY, curtainRadius, 0, Math.PI / 2, false);
        context.lineTo(topLeftCurtainOriginX, topLeftCurtainOriginY);
        context.closePath();
        context.fill();
        context.stroke();

        // Draw the top right curtain
        context.beginPath();
        context.arc(topRightCurtainOriginX, topRightCurtainOriginY, curtainRadius, Math.PI, Math.PI / 2, true);
        context.lineTo(topRightCurtainOriginX, topRightCurtainOriginY);
        context.closePath();
        context.fill();
        context.stroke();
    }
    else {
        // Determine relevant points
        var topLeftCurtainOriginX = graphicalRoom.windowOriginX;
        var topLeftCurtainOriginY = graphicalRoom.windowOriginY;

        // Simply fill a rectangle the size of the window
        context.fillRect(topLeftCurtainOriginX, topLeftCurtainOriginY, graphicalRoom.windowWidth, graphicalRoom.windowHeight);

        // Draw a few lines for contour
        for (var i = 1; i <= 5; i++) {
            var lineOriginX = topLeftCurtainOriginX + (i * graphicalRoom.windowWidth / 6);

            // Alternate the length of the line
            var lineLength = i % 2 == 0 ? graphicalRoom.windowHeight * 0.8 : graphicalRoom.windowHeight * 0.6;

            // Draw the line
            context.beginPath();
            context.moveTo(lineOriginX, topLeftCurtainOriginY);
            context.lineTo(lineOriginX, topLeftCurtainOriginY + lineLength);
            context.closePath();
            context.stroke();
        }
    }

    // Restore context state
    context.lineWidth = originalLineWidth;
    context.strokeStyle = originalStrokeStyle;
    context.fillStyle = originalFillStyle;
};

// Function called to notify this Component of a room that it can control
CurtainComponent.prototype.addControlledRoom = function (roomID) {
    this.controlledRooms.push(roomID);
};
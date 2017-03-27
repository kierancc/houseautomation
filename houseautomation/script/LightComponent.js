function LightComponent(componentID) {
    this.id = componentID;
    this.controlledRooms = [];
}

// Member variables
LightComponent.prototype.id;
LightComponent.prototype.friendlyName = "LIGHT";
LightComponent.prototype.controlledRooms;

// Functions
LightComponent.prototype.getID = function () {
    return this.id
};

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
    item.id = "ControlPanelItemRoom" + roomID + "Attribute" + this.id;
    item.className = "toggleDiv";

    // Save the identifying data to this element for consumption in any event handlers
    $(item).data("roomID", roomID);
    $(item).data("attributeID", this.id);

    $(item).slider({
        orientation: "horizontal",
        min: 0,
        max: 1,
        step: 1,
        value: initialState,
        slide: function (event, ui) {
            // Convert value (int -> bool)
            var updatedState = ui.value == 1 ? true : false;
            var roomID = $(this).data("roomID");
            var attributeID = $(this).data("attributeID");

            houseAutomation.updateRoomState(roomID, attributeID, updatedState);
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

LightComponent.prototype.addControlledRoom = function (roomID) {
    this.controlledRooms.push(roomID);
};
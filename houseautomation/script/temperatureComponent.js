function TemperatureComponent() {
    this.controlledRooms = [];
}

// Member variables
TemperatureComponent.prototype.friendlyName = "TEMP";
TemperatureComponent.prototype.controlledRooms;

// Functions

TemperatureComponent.prototype.getFriendlyName = function () {
    return this.friendlyName;
};

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

            houseAutomation.updateRoomState(roomID, componentName, this.value);
        }
    });

    // Return the div
    return itemDiv;
};

TemperatureComponent.prototype.onRoomStateUpdated = function (roomStateUpdatedEvent) {
    // Here in a real automation system we would actually cause the state of the room to change
    // e.g. by actually turning on or off a heater, or physically opening or closing the curtains using a motor
    // and return true if the operation succeeded, false otherwise
    // Data model and view updating is handled by the controller, not the component
    return true;
};

TemperatureComponent.prototype.addControlledRoom = function (roomID) {
    this.controlledRooms.push(roomID);
};
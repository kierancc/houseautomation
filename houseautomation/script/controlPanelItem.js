function CreateControlPanelItem (roomID, attributeID, value) {
    // Create a new div to hold the ControlPanelItem
    var itemDiv = document.createElement("div");
    itemDiv.className = "controlPanelItem";

    // Create the label for the control
    var itemLabel = document.createElement("span");
    itemLabel.innerText = houseAutomation.attributeIDToFriendlyName(attributeID) + ": ";
    itemLabel.className = "controlPanelItemLabel";

    itemDiv.appendChild(itemLabel);

    // Build the correct control for the attribute type
    var itemField = BuildControlFromAttributeID(roomID, attributeID, value, houseAutomation.updateRoomState, itemDiv);

    // Save the identifying data to this element for consumption in any event handlers
    $(itemField).data("roomID", roomID);
    $(itemField).data("attributeID", attributeID);

    // Return the div
    return itemDiv;
}

function BuildControlFromAttributeID(roomID, attributeID, value, updateFunction, parent) {
    switch (attributeID) {
        case houseAutomation.SUPPORTED_ATTRIBUTES.LIGHT:
        case houseAutomation.SUPPORTED_ATTRIBUTES.CURTAIN:
            // Determine initial state (convert bool -> int)
            // true: 1, false: 0
            var initialState = value ? 1 : 0;

            var item = document.createElement("div");
            item.id = "ControlPanelItemRoom" + roomID + "Attribute" + attributeID;
            item.className = "toggleDiv";

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

                    updateFunction(roomID, attributeID, updatedState);
                }
            });

            // Append the control to the parent
            parent.appendChild(item);

            return item;

        case houseAutomation.SUPPORTED_ATTRIBUTES.TEMP:
            var item = document.createElement("input");
            item.id = "ControlPanelItemRoom" + roomID + "Attribute" + attributeID;
            item.className = "tempSpinnerInput";
            item.type = "text";
            item.value = value;

            // Append the control to the parent
            // Note that this must be called before initializing the spinner
            parent.appendChild(item);

            $(item).spinner({
                step: 1,
                classes: { "ui-spinner": "tempSpinnerContainer" },
                stop: function (event, ui) {
                    var roomID = $(this).data("roomID");
                    var attributeID = $(this).data("attributeID");

                    updateFunction(roomID, attributeID, this.value);
                }
            });

            return item;

        default:
            throw "Invalid attributeID parameter!";
    }
}
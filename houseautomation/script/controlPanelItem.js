function CreateControlPanelItem(roomID, attributeID, value) {
    var itemDiv = document.createElement("div");

    var itemLabel = document.createElement("span");
    itemLabel.innerText = houseAutomation.attributeIDToFriendlyName(attributeID) + ": ";

    itemDiv.appendChild(itemLabel);

    var itemField = document.createElement("input");
    itemField.id = "ControlPanelItemRoom" + roomID + "Attribute" + attributeID;
    itemField.value = value;

    // Save the identifying data to this element for consumption in any event handlers
    $(itemField).data("roomID", roomID);
    $(itemField).data("attributeID", attributeID);

    // Wire up event listener for value change
    $(itemField).change(function (event) {
        var roomID = $(this).data("roomID");
        var attributeID = $(this).data("attributeID");

        // Perform the state update
        houseAutomation.updateRoomState(roomID, attributeID, this.value);
    });

    itemDiv.appendChild(itemField);

    return itemDiv;
}
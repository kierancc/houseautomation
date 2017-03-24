function CreateControlPanelItem(roomID, attributeID, value) {
    var itemDiv = document.createElement("div");

    var itemLabel = document.createElement("span");
    itemLabel.innerText = houseAutomation.attributeIDToFriendlyName(attributeID) + ": ";

    itemDiv.appendChild(itemLabel);

    var itemField = document.createElement("input");
    itemField.id = "ControlPanelItemRoom" + roomID + "Attribute" + attributeID;
    itemField.value = value;

    itemDiv.appendChild(itemField);

    return itemDiv;
}
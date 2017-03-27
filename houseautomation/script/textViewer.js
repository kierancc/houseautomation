function TextViewer(controller) {
    this.controller = controller;

    // Create the containing DIV for this control and save it
    this.container = document.createElement("div");
    this.container.id = this.containerID;
    $("#" + houseAutomation.VIEWER_PLACEHOLDER_ID).append(this.container);

    this.mutableFields = [];

    // Ensure that the control is hidden after it is created
    $(this.container).hide();
}

// Member variables
TextViewer.prototype.containerID = "textViewerContainerDiv";
TextViewer.prototype.controller;
TextViewer.prototype.container;
TextViewer.prototype.mutableFields;

// Functions

// receiveInitialData : Required function that is called by the controller to provide this view with the initial data
// @param initialData this will be an array of Room objects
TextViewer.prototype.receiveInitialData = function (initialData) {
    if (!Array.isArray(initialData)) {
        throw "Invalid parameter received!";
    }

    // Iterate over all received rooms, creating the required DOM elements to output the values as required
    for (var i = 0; i < initialData.length; i++)
    {
        var roomDiv = document.createElement("div");
        roomDiv.id = "room" + i + "div";
        roomDiv.className = "roomdiv";

        // Name
        var nameField = document.createElement("p");
        nameField.innerText = initialData[i].getName();
        roomDiv.appendChild(nameField);

        this.mutableFields[i] = [];

        var numAttributes = initialData[i].getNumAttributes();

        for (var j = 0; j < numAttributes; j++)
        {
            // If this attribute is not defined for this room, continue
            if (initialData[i].getState(j) === undefined) {
                continue;
            }

            // Get the friendly name of the attribute
            var attributeName = this.controller.attributeIDToFriendlyName(j);

            var stateLabel = document.createElement("span");
            stateLabel.innerText = attributeName + " state: ";
            roomDiv.appendChild(stateLabel);

            var attributeState = document.createElement("span");
            attributeState.id = "room" + i + attributeName + "State";
            attributeState.innerText = initialData[i].getState(j);
            roomDiv.appendChild(attributeState);
            roomDiv.appendChild(document.createElement("br"));

            this.mutableFields[i][j] = attributeState;
        }

        this.container.appendChild(roomDiv);
    }
};

TextViewer.prototype.onRoomStateUpdated = function (event) {
    // Update the field's inner text
    this.mutableFields[event.roomID][event.attributeID].innerText = event.value;
};

TextViewer.prototype.show = function () {
    $(this.container).show();
};

TextViewer.prototype.hide = function () {
    $(this.container).hide();
};
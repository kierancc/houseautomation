// Constructor
function TextViewer() {
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
TextViewer.prototype.container;
TextViewer.prototype.friendlyName = "Text Viewer";
TextViewer.prototype.mutableFields;

// Functions

// Function that returns the friendly name of the viewer
TextViewer.prototype.getFriendlyName = function () {
    return this.friendlyName;
};

// Function that is called by the controller when it is ready to send initial state data to this object
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

        // Iterate over all components that control this room
        var numComponents = initialData[i].getNumSupportedComponents();
        var components = initialData[i].getSupportedComponents();

        for (var j = 0; j < numComponents; j++)
        {
            // Get the friendly name of the component
            var componentName = components[j];

            // Create the label for the component
            var stateLabel = document.createElement("span");
            stateLabel.innerText = componentName + " state: ";
            roomDiv.appendChild(stateLabel);

            // Create the field to display the state
            var componentState = document.createElement("span");
            componentState.id = "room" + i + componentName + "State";
            componentState.innerText = initialData[i].getState(componentName);
            roomDiv.appendChild(componentState);
            roomDiv.appendChild(document.createElement("br"));

            // Save a reference to this field so that it can be easily updated
            this.mutableFields[i][componentName] = componentState;
        }

        this.container.appendChild(roomDiv);
    }
};

// Event handler for roomStateUpdated event
TextViewer.prototype.onRoomStateUpdated = function (event) {
    // Update the field's inner text to the new value
    this.mutableFields[event.roomID][event.componentName].innerText = event.value;
};

// Shows the TextViewer
TextViewer.prototype.show = function () {
    $(this.container).show();
};

// Hides the TextViewer
TextViewer.prototype.hide = function () {
    $(this.container).hide();
};
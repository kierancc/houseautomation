function TextViewer(controller) {
    this.controller = controller;

    // Create the containing DIV for this control and save it
    this.container = document.createElement("div");
    this.container.id = "textViewerContainerDiv";
    $("#" + houseAutomation.VIEWER_PLACEHOLDER_ID).append(this.container);

    this.mutableFields = [];
}

// Member variables
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

        // Lights
        var lightStateLabel = document.createElement("span");
        lightStateLabel.innerText = "Light state: ";
        roomDiv.appendChild(lightStateLabel);

        var lightState = document.createElement("span");
        lightState.id = "room" + i + "lightstate";
        lightState.innerText = initialData[i].getLightState();
        roomDiv.appendChild(lightState);

        this.mutableFields[i][houseAutomation.SUPPORTED_ATTRIBUTES.LIGHT] = lightState;

        roomDiv.appendChild(document.createElement("br"));

        // Curtain
        var curtainStateLabel = document.createElement("span");
        curtainStateLabel.innerText = "Curtain state: ";
        roomDiv.appendChild(curtainStateLabel);

        var curtainState = document.createElement("span");
        curtainState.id = "room" + i + "curtainstate";
        curtainState.innerText = initialData[i].getCurtainState();
        roomDiv.appendChild(curtainState);

        this.mutableFields[i][houseAutomation.SUPPORTED_ATTRIBUTES.CURTAIN] = curtainState;

        roomDiv.appendChild(document.createElement("br"));

        // Temperature
        var tempStateLabel = document.createElement("span");
        tempStateLabel.innerText = "Temperature: ";
        roomDiv.appendChild(tempStateLabel);

        var tempState = document.createElement("span");
        tempState.id = "room" + i + "temp";
        tempState.innerText = initialData[i].getTemp();
        roomDiv.appendChild(tempState);

        this.mutableFields[i][houseAutomation.SUPPORTED_ATTRIBUTES.TEMP] = tempState;

        roomDiv.appendChild(document.createElement("br"));

        this.container.appendChild(roomDiv);
    }
};

TextViewer.prototype.show = function () {
    $(this.container).fadeIn(500);
};

TextViewer.prototype.hide = function () {
    $(this.container).hide();
};
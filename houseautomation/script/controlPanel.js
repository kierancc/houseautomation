// Constructor
// Takes a reference to the controller object
function ControlPanel(controller) {
    this.controller = controller;

    // Create the containing DIV for this control and save it
    this.container = document.createElement("div");
    this.container.id = this.containerID;
    $("#" + houseAutomation.CONTROL_PANEL_PLACEHOLDER_ID).append(this.container);

    // Ensure that the control is hidden after it is created
    $(this.container).hide();
}

// Member variables
ControlPanel.prototype.containerID = "controlPanelContainerDiv";
ControlPanel.prototype.controller;
ControlPanel.prototype.container;

// Functions

// Function that is called by the controller when it is ready to send initial state data to this ControlPanel
ControlPanel.prototype.receiveInitialData = function (initialData) {
    if (!Array.isArray(initialData)) {
        throw "Invalid parameter received!";
    }

    // Create ControlPanelItems for each room
    for (var i = 0; i < initialData.length; i++) {
        // Create containing div
        var roomDiv = document.createElement("div");
        roomDiv.className = "roomDiv";

        // Create the header
        var roomHeader = document.createElement("p");
        roomHeader.className = "controlPanelRoomHeader";
        roomHeader.innerText = initialData[i].getName();
        roomDiv.appendChild(roomHeader);

        // Iterate over all components that control this room
        var numComponents = initialData[i].getNumSupportedComponents();
        var components = initialData[i].getSupportedComponents();

        for (var j = 0; j < numComponents; j++) {

            // Get the friendly name of the component
            var componentName = components[j];

            // Call the controller to delegate the creation of the control panel item to the appropriate component
            var item = this.controller.createComponentControlPanelItem(i, componentName, initialData[i].getState(componentName));
            roomDiv.appendChild(item);
        }
        
        this.container.appendChild(roomDiv);
    }

};

// Shows the ControlPanel
ControlPanel.prototype.show = function () {
    $(this.container).show();
};

// Hides the ControlPanel
ControlPanel.prototype.hide = function () {
    $(this.container).hide();
};
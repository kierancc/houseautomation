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
ControlPanel.prototype.receiveInitialData = function (initialData) {
    if (!Array.isArray(initialData)) {
        throw "Invalid parameter received!";
    }

    // Create ControlPanelItems for each room
    for (var i = 0; i < initialData.length; i++) {
        var roomDiv = document.createElement("div");
        roomDiv.className = "roomDiv";

        var roomHeader = document.createElement("p");
        roomHeader.className = "controlPanelRoomHeader";
        roomHeader.innerText = initialData[i].getName();
        roomDiv.appendChild(roomHeader);

        var numAttributes = initialData[i].getNumAttributes();

        for (var j = 0; j < numAttributes; j++) {
            // If this attribute is not defined for this room, continue
            if (initialData[i].getState(j) === undefined) {
                continue;
            }

            var item = this.controller.createComponentControlPanelItem(i, j, initialData[i].getState(j));
            roomDiv.appendChild(item);
        }
                
        this.container.appendChild(roomDiv);
    }

};

ControlPanel.prototype.show = function () {
    $(this.container).show();
};

ControlPanel.prototype.hide = function () {
    $(this.container).hide();
};
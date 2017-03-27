function Controller(dataModel) {
    this.dataModel = dataModel;
    this.views = [];
    this.components = [];
}

// Member variables
Controller.prototype.dataModel;
Controller.prototype.views;
Controller.prototype.components;
Controller.prototype.controlPanel;

// Functions
Controller.prototype.registerView = function (view) {
    // TODO Check that all required functions are provided in the view object parameter

    this.views.push(view);
    view.receiveInitialData(this.dataModel.getRooms());
};

Controller.prototype.registerComponent = function (component) {
    // Ensure that the friendly name of the component is unique
    if (this.components[component.getFriendlyName()] !== undefined) {
        throw "Duplicate Component : " + component.getFriendlyName();
    }

    this.components[component.getFriendlyName()] = component;
};

Controller.prototype.registerControlPanel = function (controlPanel) {
    // TODO Check that all required functions are provided in the view object parameter

    this.controlPanel = controlPanel;
    controlPanel.receiveInitialData(this.dataModel.getRooms());
};

Controller.prototype.updateRoomState = function (roomID, componentName, value) {
    // Update the data model
    this.dataModel.updateRoomState(roomID, componentName, value);

    // Trigger a RoomStateUpdatedEvent for all registered views
    for (var i = 0; i < this.views.length; i++) {
        this.views[i].onRoomStateUpdated(new RoomStateUpdatedEvent(roomID, componentName, value));
    }
};

Controller.prototype.showDefaultView = function () {
    // TODO change this
    this.views[0].show();
};

Controller.prototype.showControlPanel = function () {
    this.controlPanel.show();
};

Controller.prototype.createComponentControlPanelItem = function (roomID, componentName, initialValue) {
    return this.components[componentName].createControlPanelItem(roomID, initialValue);
};
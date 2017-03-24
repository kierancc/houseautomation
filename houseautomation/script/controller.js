function Controller(dataModel) {
    this.dataModel = dataModel;
    this.views = [];
}

// Member variables
Controller.prototype.dataModel;
Controller.prototype.views;

// Functions
Controller.prototype.registerView = function (view) {
    // TODO Check that all required functions are provided in the view object parameter

    this.views.push(view);
    view.receiveInitialData(this.dataModel.getRooms());
};

Controller.prototype.updateRoomState = function (roomID, attributeID, value) {
    // Update the data model
    this.dataModel.updateRoomState(roomID, attributeID, value);

    // Trigger a RoomStateUpdatedEvent for all registered views
    for (var i = 0; i < this.views.length; i++) {
        this.views.onRoomStateUpdated(new RoomStateUpdatedEvent(roomID, attributeID, value));
    }
};

Controller.prototype.showDefaultView = function () {
    // TODO change this
    this.views[0].show();
}
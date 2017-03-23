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
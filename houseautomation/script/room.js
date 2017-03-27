function Room(name, initialState) {
    this.name = name;
    this.state = [];

    var context = this;
    // Iterate over provided initial state and add it
    Object.keys(initialState).forEach(function (k) {
        context.state[k] = initialState[k];
    });
}

// Member variables
Room.prototype.name;
Room.prototype.state;

// Functions
Room.prototype.getName = function () {
    return this.name;
};

Room.prototype.getState = function (componentName) {
    // TODO Check valid key
    return this.state[componentName];
};

Room.prototype.setState = function (componentName, value) {
    // TODO check validity of input
    this.state[componentName] = value;
};

Room.prototype.getNumSupportedComponents = function () {
    return Object.keys(this.state).length;
};

Room.prototype.getSupportedComponents = function () {
    return Object.keys(this.state);
};
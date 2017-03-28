function Room(name, initialState) {
    this.name = name;
    this.state = new Object();

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
    if (this.state[componentName] === undefined) {
        throw "Invalid component name : " + componentName;
    }

    return this.state[componentName];
};

Room.prototype.setState = function (componentName, value) {
    if (this.state[componentName] === undefined) {
        throw "Invalid component name : " + componentName;
    }

    this.state[componentName] = value;
};

Room.prototype.getNumSupportedComponents = function () {
    return Object.keys(this.state).length;
};

Room.prototype.getSupportedComponents = function () {
    return Object.keys(this.state);
};
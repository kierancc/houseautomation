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

Room.prototype.getState = function (attributeID) {
    // TODO Check valid key
    return this.state[attributeID];
};

Room.prototype.setState = function (attributeID, value) {
    // TODO check validity of input
    this.state[attributeID] = value;
};

Room.prototype.getNumAttributes = function () {
    return this.state.length;
}
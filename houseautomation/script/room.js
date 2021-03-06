﻿// Constructor
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

// Function that returns the Room's name
Room.prototype.getName = function () {
    return this.name;
};

// Function that returns the current state of the specified Component
Room.prototype.getState = function (componentName) {
    if (this.state[componentName] === undefined) {
        throw "Invalid component name : " + componentName;
    }

    return this.state[componentName];
};

// Function that sets the current state of the specified Component
Room.prototype.setState = function (componentName, value) {
    if (this.state[componentName] === undefined) {
        throw "Invalid component name : " + componentName;
    }

    this.state[componentName] = value;
};

// Function that returns the number of Commponents that control this room
Room.prototype.getNumSupportedComponents = function () {
    return Object.keys(this.state).length;
};

// Function that returns the names of the Components that control this room
Room.prototype.getSupportedComponents = function () {
    return Object.keys(this.state);
};
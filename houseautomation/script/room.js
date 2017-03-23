function Room(name, initialLightState, initialCurtainState, initialTemp) {
    this.name = name;
    this.lightState = initialLightState;
    this.curtainState = initialCurtainState;
    this.temp = initialTemp;
}

// Member variables
Room.prototype.name;
Room.prototype.lightState;
Room.prototype.curtainState;
Room.prototype.temp;

// Functions
Room.prototype.getName = function () {
    return this.name;
};

Room.prototype.getLightState = function () {
    return this.lightState;
};

Room.prototype.getCurtainState = function () {
    return this.curtainState;
};

Room.prototype.getTemp = function () {
    return this.temp;
};
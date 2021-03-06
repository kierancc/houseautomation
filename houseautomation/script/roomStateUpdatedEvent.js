﻿// Constructor
// This simple class is used to notify the various parts of the system of a state update
function RoomStateUpdatedEvent(roomID, componentName, value) {
    this.roomID = roomID;
    this.componentName = componentName;
    this.value = value;
}

// Member variables
RoomStateUpdatedEvent.prototype.roomID;
RoomStateUpdatedEvent.prototype.componentName;
RoomStateUpdatedEvent.prototype.value;
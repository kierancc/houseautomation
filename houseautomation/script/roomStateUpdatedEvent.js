function RoomStateUpdatedEvent(roomID, attributeID, value) {
    this.roomID = roomID;
    this.attributeID = attributeID;
    this.value = value;
}

// Member variables
RoomStateUpdatedEvent.prototype.roomID;
RoomStateUpdatedEvent.prototype.attributeID;
RoomStateUpdatedEvent.prototype.value;
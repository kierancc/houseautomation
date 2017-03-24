// Constructor
function DataModel(dataSourceURL) {
    this.dataSourceURL = dataSourceURL;
    var context = this;

    $.ajax({
        async: false,
        url: context.dataSourceURL
    }).done(function (data) {
        context.parseResponse(data);
    }).fail(function (xhr) {
        alert('ERROR: HTTP GET request for initial data failed!');
    });
}

// Member variables
DataModel.prototype.dataSourceURL;
DataModel.prototype.rooms;

// Member functions

DataModel.prototype.parseResponse = function (responseString) {
    // TODO: Implement reading initial state from response
    // For now, just populate some sample data dynamically
    this.rooms = [];

    // Add "Living Room"
    this.rooms.push(new Room("Living Room", [
        true,
        true,
        20
    ]));

    // Add "Kitchen"
    this.rooms.push(new Room("Kitchen", [
        true,
        false,
        19
    ]));

    // Add "Bedroom"
    this.rooms.push(new Room("Bedroom", [
        false,
        false,
        22]));
};

DataModel.prototype.getRooms = function () {
    return this.rooms;
};

DataModel.prototype.updateRoomState = function (roomID, attributeID, value) {
    // TODO error checking

    // Here is where we would send the new state update back to the server if that was required
    // We would most likely POST a request to a specific URL running on the server
    // However, this is not required for this project, so we just simply update our internal model
    this.rooms[roomID].setState(attributeID, value);
};
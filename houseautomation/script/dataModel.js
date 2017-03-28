// Constructor
function DataModel(dataSourceURL) {
    this.dataSourceURL = dataSourceURL;
    this.rooms = [];
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
    // Parse the loaded JSON into Room objects that contain state only (i.e. no function definitions)
    var parsedRooms = JSON.parse(responseString);

    // Recreate the Room objects based on the parsed Room objects, so that they
    // have the expected functions defined
    for (var i = 0; i < parsedRooms.length; i++) {
        this.rooms.push(new Room(parsedRooms[i].name, parsedRooms[i].state));
    }
};

DataModel.prototype.getRoom = function (roomID) {
    return this.rooms[roomID];
};

DataModel.prototype.getRooms = function () {
    return this.rooms;
};

DataModel.prototype.updateRoomState = function (roomID, componentName, value) {
    // TODO error checking

    // Here is where we would send the new state update back to the server if that was required
    // We would most likely POST a request to a specific URL running on the server
    // However, this is not required for this project, so we just simply update our internal model
    this.rooms[roomID].setState(componentName, value);
};
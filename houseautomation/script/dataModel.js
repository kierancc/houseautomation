// Constructor
function DataModel(dataSourceURL) {
    this.dataSourceURL = dataSourceURL;
    this.rooms = [];
    var context = this;

    // Query the "server" for the saved state of the system
    // Note that in this project there is no real server interaction so instead read the
    // initial state from a local JSON file
    $.ajax({
        async: false,
        url: context.dataSourceURL // If we wanted to really read from a server, this line would be changed to point to the URL 
                                   // to retrieve the data from
    }).done(function (data) {
        context.parseResponse(data); // Parse the response from the "server"
    }).fail(function (xhr) {
        alert('ERROR: HTTP GET request for initial data failed!');
        throw "Failed to load data from server";
    });
}   

// Member variables
DataModel.prototype.dataSourceURL;
DataModel.prototype.rooms;

// Member functions

// Function to parse the state returned by the "server" into Room objects used by the DataModel
DataModel.prototype.parseResponse = function (responseString) {
    // Parse the loaded JSON into Room objects that contain state only (i.e. no function definitions)
    var parsedRooms = JSON.parse(responseString);

    // Recreate the Room objects based on the parsed Room objects, so that they
    // have the expected functions defined
    for (var i = 0; i < parsedRooms.length; i++) {
        this.rooms.push(new Room(parsedRooms[i].name, parsedRooms[i].state));
    }
};

// Function called to get a specific room from the DataModel
DataModel.prototype.getRoom = function (roomID) {
    if (this.rooms[roomID] === undefined) {
        throw "Invalid room ID : " + roomID;
    }

    return this.rooms[roomID];
};

// Function called to get all rooms from the DataModel
DataModel.prototype.getRooms = function () {
    return this.rooms;
};

// Function called by the controller to notify the DataModel of an update to the system state
DataModel.prototype.updateRoomState = function (roomID, componentName, value) {
    // Here is where we would send the new state update back to the server if that was required
    // We would most likely POST a request to a specific URL on the server
    // However, this is not required for this project, so we just simply update our internal model

    if (this.rooms[roomID] === undefined) {
        throw "Invalid room ID : " + roomID;
    }

    this.rooms[roomID].setState(componentName, value);
};
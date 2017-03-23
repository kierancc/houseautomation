// Constructor
function DataModel(dataSourceURL) {
    this.dataSourceURL = dataSourceURL;
    var context = this;

    $.ajax({
        async: false,
        url: context.dataSourceURL
    }).done(function (data) {
        context.ParseResponse(data);
    }).fail(function (xhr) {
        alert('ERROR: HTTP GET request for initial data failed!');
    });
}

// Member variables
DataModel.prototype.dataSourceURL;
DataModel.prototype.rooms;

// Member functions

DataModel.prototype.ParseResponse = function (responseString) {
    // TODO: Implement reading initial state from response
    // For now, just populate some sample data dynamically
    this.rooms = [];

    // Add "Living Room"
    this.rooms.push(new Room("Living Room", true, true, 20));

    // Add "Kitchen"
    this.rooms.push(new Room("Kitchen", true, false, 19));

    // Add "Bedroom"
    this.rooms.push(new Room("Bedroom", false, false, 22));
};
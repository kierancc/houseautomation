function GraphicalViewer(controller) {
    this.controller = controller;
    this.graphicalViewerRooms = [];

    // Create the containing DIV for this control and save it
    this.container = document.createElement("div");
    this.container.id = this.containerID;
    $("#" + houseAutomation.VIEWER_PLACEHOLDER_ID).append(this.container);

    // Create the canvas element we will draw to
    // Explicitly set the dimensions of the canvas instead of using CSS
    // This ensures that the canvas is not scaled, avoiding problems such as blurry lines
    this.canvas = document.createElement("canvas");
    this.canvas.width = 640;
    this.canvas.height = 480;
    $(this.container).append(this.canvas);

    // Save the 2d context for easy reference later
    this.context = this.canvas.getContext("2d");

    // Ensure that the control is hidden after it is created
    $(this.container).hide();
}

// Member variables
GraphicalViewer.prototype.canvas;
GraphicalViewer.prototype.context;
GraphicalViewer.prototype.containerID = "grahpicalViewerContainerDiv";
GraphicalViewer.prototype.controller;
GraphicalViewer.prototype.container;
GraphicalViewer.prototype.houseDimensions = { 'WIDTH': 0.8, 'HEIGHT': 0.6 };
GraphicalViewer.prototype.drawing = { 'LINEWIDTH': 5 };
GraphicalViewer.prototype.graphicalViewerRooms;

// Functions
GraphicalViewer.prototype.receiveInitialData = function (initialData) {
    if (!Array.isArray(initialData)) {
        throw "Invalid parameter received!";
    }

    // Get an array of the user-defined drawing functions for each component from the controller
    // These functions are responsible for displaying the state of each component
    var drawingFunctions = this.controller.getComponentGraphicalDrawFunctions();

    // Determine the layout of the house
    // We want to draw as square of a house as possible
    // Calculate the rooms per floor as the ceiling of the sqrt of the number of rooms
    // And then put the remainder on the top floor
    var numRooms = initialData.length;
    var sqrtRooms = Math.sqrt(numRooms);
    var roomsPerFloor = Math.ceil(sqrtRooms);
    var numFullFloors = Math.floor(numRooms / roomsPerFloor);
    var numRoomsLastFloor = numRooms % roomsPerFloor;
    var numTotalFloors = numFullFloors + 1;

    // Now determine and save constants useful for drawing now that we know the layout of the house
    var marginX = (this.canvas.width - this.canvas.width * this.houseDimensions.WIDTH) / 2;
    var marginY = (this.canvas.height - this.canvas.height * this.houseDimensions.HEIGHT) / 2;
    var roomWidth = (this.canvas.width * this.houseDimensions.WIDTH) / roomsPerFloor;
    var roomHeight = (this.canvas.height * this.houseDimensions.HEIGHT) / numTotalFloors;

    // Draw the rooms in a layout roughly following this:
    //
    // [6][7]...
    // [3][4][5]
    // [0][1][2]
    this.context.lineWidth = this.drawing.LINEWIDTH;
    this.context.fillStyle = "blue";

    this.context.translate(marginX / -2, marginY / 2); // Shift everything down by half of the vertical margin, and left by half the horizontal margin

    var roomCounter = 0;

    // Draw the full floors
    for (var i = 0; i < numFullFloors; i++) {
        for (var j = 0; j < roomsPerFloor; j++) {
            // Determine the origin of the rectangle for the room's outline
            // First the X coordinate
            var originX = marginX + (j * roomWidth);

            // Next the Y coordinate
            var originY = marginY + ((numTotalFloors - 1 - i) * roomHeight);

            // Create a GraphicalViewerRoom object at these coordinates and cause it to fully draw itself
            this.graphicalViewerRooms.push(new GraphicalViewerRoom(initialData[roomCounter].getName(), originX, originY, roomWidth, roomHeight, drawingFunctions));
            this.graphicalViewerRooms[roomCounter].drawFull(this.context);

            // Now draw the initial state of each component that controls this room
            var numComponents = initialData[roomCounter].getNumSupportedComponents();
            var components = initialData[roomCounter].getSupportedComponents();

            for (var k = 0; k < numComponents; k++) {
                // Get the friendly name of the component
                var componentName = components[k];

                this.graphicalViewerRooms[roomCounter].drawState(this.context, componentName, initialData[roomCounter].getState(componentName));
            }

            // Increment the roomCounter
            roomCounter++;
        }
    }

    // Draw the last (top) floor
    // Note that here we will draw any extra "rooms" that will not change state but need to be there
    // to visually complete the floor
    for (var i = 0; i < roomsPerFloor; i++) {
        var originX = marginX + (i * roomWidth);

        // Only save information about controllable rooms
        if (roomCounter < initialData.length) {
            // Create a GraphicalViewerRoom object at these coordinates and cause it to fully draw itself
            this.graphicalViewerRooms.push(new GraphicalViewerRoom(initialData[roomCounter].getName(), originX, marginY, roomWidth, roomHeight, drawingFunctions));
            this.graphicalViewerRooms[roomCounter].drawFull(this.context);

            // Now draw the initial state of each component that controls this room
            var numComponents = initialData[roomCounter].getNumSupportedComponents();
            var components = initialData[roomCounter].getSupportedComponents();

            for (var k = 0; k < numComponents; k++) {
                // Get the friendly name of the component
                var componentName = components[k];

                this.graphicalViewerRooms[roomCounter].drawState(this.context, componentName, initialData[roomCounter].getState(componentName));
            }
        }
        // Draw the extra rooms differently
        else {
            var halfLineWidth = this.drawing.LINEWIDTH / 2;
            this.context.fillRect(originX + halfLineWidth, marginY - halfLineWidth, roomWidth, roomHeight);
        }

        // Increment the roomCounter
        roomCounter++;
    }
};

GraphicalViewer.prototype.onRoomStateUpdated = function (event) {
    // Draw the updated state for the specified room and component

    // Depending on the particular state change, we might need to draw more than just the component that changed
    // e.g. transitioning from curtains closed to curtains open will require that we redraw the light since it was previously hidden
    //
    // Since user created components are allowed, it is not possible to guarantee that all such possible transitions will be known
    // so we will simply always draw all components
    // This problem could be addressed by creating a hierarchy of dependencies between components, for example, but this is outside
    // of the scope of this projects

    // Because of the above problem we need to provide the state of the whole room so that it can be correctly rendered
    var room = this.controller.getRoom(event.roomID);

    this.graphicalViewerRooms[event.roomID].drawAllState(this.context, room);
};

GraphicalViewer.prototype.show = function () {
    $(this.container).show();
};

GraphicalViewer.prototype.hide = function () {
    $(this.container).hide();
};
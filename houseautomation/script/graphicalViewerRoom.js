// Constructor
function GraphicalViewerRoom(name, originX, originY, width, height, drawingFunctions) {
    this.name = name;
    this.originX = originX;
    this.originY = originY;
    this.width = width;
    this.height = height;
    this.componentDrawingFunctions = drawingFunctions;

    // Determine the window origin and dimensnions based on the room origin and dimensions
    var windowMarginX = (this.width - this.width * this.windowSize) / 2;
    var windowMarginY = (this.height - this.height * this.windowSize) / 2;
    this.windowOriginX = this.originX + windowMarginX;
    this.windowOriginY = this.originY + windowMarginY;
    this.windowWidth = this.width * this.windowSize;
    this.windowHeight = this.height * this.windowSize;
}

// Member variables
GraphicalViewerRoom.prototype.name;
GraphicalViewerRoom.prototype.originX;
GraphicalViewerRoom.prototype.originY;
GraphicalViewerRoom.prototype.width;
GraphicalViewerRoom.prototype.height;
GraphicalViewerRoom.prototype.windowOriginX;
GraphicalViewerRoom.prototype.windowOriginY;
GraphicalViewerRoom.prototype.windowWidth;
GraphicalViewerRoom.prototype.windowHeight;
GraphicalViewerRoom.prototype.windowSize = 0.66; // Make the window 2/3 of the room size
GraphicalViewerRoom.prototype.windowStrokeWidth = 3;
GraphicalViewerRoom.prototype.componentDrawingFunctions;

// Functions

// Function called to fully draw the room, its window and its name
// Note that this function does not draw any state representation
GraphicalViewerRoom.prototype.drawFull = function (context) {
    // Draw outline of room and fill with the default wall colour (already set)
    context.fillRect(this.originX, this.originY, this.width, this.height);
    context.strokeRect(this.originX, this.originY, this.width, this.height);

    // Draw outline of window
    this.drawWindow(context);

    // Draw the room name
    this.drawRoomName(context);
};

// Function that draws only the window of the room
GraphicalViewerRoom.prototype.drawWindow = function (context) {
    var originalLineWidth = context.lineWidth;
    context.lineWidth = this.windowStrokeWidth;

    // Clear rectangle first to ensure white background
    context.clearRect(this.windowOriginX, this.windowOriginY, this.windowWidth, this.windowHeight);
    context.strokeRect(this.windowOriginX, this.windowOriginY, this.windowWidth, this.windowHeight);
    context.lineWidth = originalLineWidth;
};

// Function that draws the room's name
GraphicalViewerRoom.prototype.drawRoomName = function (context) {
    var originalFont = context.font;
    var originalFillStyle = context.fillStyle;

    context.font = "12px Arial";
    context.fillStyle = "black";

    // Draw the name below the window
    context.fillText(this.name, this.windowOriginX, this.windowOriginY + this.windowHeight + 12);

    context.font = originalFont;
    context.fillStyle = originalFillStyle;
};

// Function that clears the whole room rectangle
GraphicalViewerRoom.prototype.clearFull = function (context) {
    context.clearRect(this.originX, this.originY, this.width, this.height);
};

// Function called to draw the represenation of state for a specific component
GraphicalViewerRoom.prototype.drawState = function (context, componentName, value) {
    // Draw the state for the provided component
    this.componentDrawingFunctions[componentName](context, this, value);
    
};

// Function called to draw the represenation of state for all components
GraphicalViewerRoom.prototype.drawAllState = function (context, room) {
    // Depending on the particular state change, we might need to draw more than just the component that changed
    // e.g. transitioning from curtains closed to curtains open will require that we redraw the light since it was previously hidden
    //
    // Since user created components are allowed, it is not possible to guarantee that all such possible transitions will be known
    // so we will simply always clear and draw all components
    // This problem could be addressed by creating a hierarchy of dependencies between components, for example, but this is outside
    // of the scope of this project
    this.clearFull(context);
    this.drawFull(context);

    var self = this;

    Object.keys(this.componentDrawingFunctions).forEach(function (k) {
        self.componentDrawingFunctions[k](context, self, room.getState(k));
    });

};
function GraphicalViewerRoom(name, originX, originY, width, height) {
    this.name = name;
    this.originX = originX;
    this.originY = originY;
    this.width = width;
    this.height = height;

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
GraphicalViewerRoom.prototype.windowSize = 0.75;
GraphicalViewerRoom.prototype.windowStrokeWidth = 3;

// Functions
GraphicalViewerRoom.prototype.drawFull = function (context) {
    // Draw outline of room
    context.strokeRect(this.originX, this.originY, this.width, this.height);

    // Draw outline of window
    this.drawWindow(context);
};

GraphicalViewerRoom.prototype.drawWindow = function (context) {
    var oldLineWidth = context.lineWidth;
    context.lineWidth = this.windowStrokeWidth;
    context.strokeRect(this.windowOriginX, this.windowOriginY, this.windowWidth, this.windowHeight);
    context.lineWidth = oldLineWidth;
};
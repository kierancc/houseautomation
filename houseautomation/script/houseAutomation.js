// Use a Javascript closure to encapsulate the houseAutomation object
// so that its state is protected from other scripts
var houseAutomation = (function () {
    // Private member variables

    // URL used to access  data from the server
    // (really just a .json file for this exercise)
    var DATA_SOURCE_URL = "../default.json";

    var SUPPORTED_ATTRIBUTES = { 'LIGHT': 0, 'CURTAIN': 1, 'TEMP': 2 };

    // The DataModel object
    var dataModel;

    // The Controller object
    var controller;

    // Private functions

    // This function loads the initial data
    var loadInitialData = function () {
        dataModel = new DataModel(DATA_SOURCE_URL);
    };

    // This function initializes the Controller
    var initController = function () {
        controller = new Controller(dataModel);
    };

    // This function initializes the default views
    var initDefaultViews = function () {
        controller.registerView(new TextViewer(controller));
    };

    // This function initializes the control panel
    var initControlPanel = function () {
        controller.registerControlPanel(new ControlPanel(controller));
    };

    return {
        // Public Variables
        VIEWER_PLACEHOLDER_ID: "viewerParentDiv",
        CONTROL_PANEL_PLACEHOLDER_ID: "controlPanelDiv",

        SUPPORTED_ATTRIBUTES: SUPPORTED_ATTRIBUTES,

        // Public functions
        // Converts an attribue ID int to a printable string
        attributeIDToFriendlyName: function (attributeID) {
            switch (attributeID) {
                case SUPPORTED_ATTRIBUTES.LIGHT:
                    return "Light";
                case SUPPORTED_ATTRIBUTES.CURTAIN:
                    return "Curtain";
                case SUPPORTED_ATTRIBUTES.TEMP:
                    return "Temp";
                default:
                    return "Invalid attribute ID!";
            }
        },

        // This function initializes state but does not change the view
        initialize: function () {
            loadInitialData();
            initController();
            initDefaultViews();
            initControlPanel();
        },

        // This function starts the state machine, including showing componentes
        start: function () {
            controller.showDefaultView();
            controller.showControlPanel();
        },

        // This function allows a ControlPanel component to change the state of a room
        updateRoomState: function (roomID, attributeID, value) {
            controller.updateRoomState(roomID, attributeID, value);
        }

    };
}());
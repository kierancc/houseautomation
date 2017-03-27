// Use a Javascript closure to encapsulate the houseAutomation object
// so that its state is protected from other scripts
var houseAutomation = (function () {
    // Private member variables

    // URL used to access  data from the server
    // (really just a .json file for this exercise)
    var DATA_SOURCE_URL = "../default.json";

    // The DataModel object
    var dataModel;

    // The Controller object
    var controller;

    // Automation components
    var components = [];

    // Private functions

    // This function loads the initial data
    var loadInitialData = function () {
        dataModel = new DataModel(DATA_SOURCE_URL);
    };

    // This function initializes the Controller
    var initController = function () {
        controller = new Controller(dataModel);
    };

    // This function initializes the automation components
    var initComponents = function () {
        for (var i = 0; i < components.length; i++) {
            controller.registerComponent(components[i]);
        }
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

        // Public functions

        // This function registers any Component objects that will be used in the house automation system
        registerComponent: function (component) {
            // Save the component
            components.push(component);
        },

        // This function initializes state but does not change the view
        initialize: function () {
            loadInitialData();
            initController();
            initComponents();
            initDefaultViews();
            initControlPanel();
        },

        // This function starts the state machine, including showing componentes
        start: function () {
            controller.showDefaultView();
            controller.showControlPanel();
        },

        // This function allows a ControlPanel component to change the state of a room
        updateRoomState: function (roomID, componentName, value) {
            controller.updateRoomState(roomID, componentName, value);
        }

    };
}());
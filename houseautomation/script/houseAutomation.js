// Use a Javascript closure to encapsulate the houseAutomation object
// so that its state is protected from other scripts
// This is the "main program" used by consumers of this houseAutomation project
// It exposes functions to initialize and start the system, as well as register custom Components
var houseAutomation = (function () {
    // Private member variables

    // URL used to access data from the server
    // (really just a .json file for this exercise)
    var DATA_SOURCE_URL = "../default.json";

    // The DataModel object
    var dataModel;

    // The Controller object
    var controller;

    // Automation components
    var components = [];

    // User provided vivews
    var userViews = [];

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

    // This function initializes the default view
    var initDefaultView = function () {
        // Add the GraphicalViewer
        var graphicalViewer = new GraphicalViewer(controller);
        controller.registerView(graphicalViewer);

        // Add a viewer selection option for the GraphicalViewer
        var graphicalViewerOption = document.createElement("option");
        graphicalViewerOption.text = graphicalViewer.getFriendlyName();
        $('#viewerSelector').append(graphicalViewerOption);
    };

    // This function initializes any views provided by the user
    var initUserViews = function () {
        for (var i = 0; i < userViews.length; i++) {
            // Add the user view
            controller.registerView(userViews[i]);

            // Add a viewer selection option for the user view
            var userViewerOption = document.createElement("option");
            userViewerOption.text = userViews[i].getFriendlyName();
            $('#viewerSelector').append(userViewerOption);
        }
    };

    // This function initializes the control panel
    var initControlPanel = function () {
        controller.registerControlPanel(new ControlPanel(controller));
    };

    // This function populates and initializes the view select menu
    var initViewSelector = function () {
        $('#viewerSelector').selectmenu({
            change: function (event, ui) {
                controller.changeView(ui.item.index);
            }
        });
    };

    return {
        // Public Variables
        VIEWER_PLACEHOLDER_ID: "viewerParentDiv",
        CONTROL_PANEL_PLACEHOLDER_ID: "controlPanelDiv",

        // Public functions

        // This function registers any Component objects added by the user that will be used in the house automation system
        registerComponent: function (component) {
            // Save the component
            components.push(component);
        },

        // This function registers any View objects added by the user that will be used in the house automation system
        registerView: function (view) {
            // Save the view
            userViews.push(view);
        },

        // This function initializes state but does not change the view
        initialize: function () {
            loadInitialData();
            initController();
            initComponents();
            initDefaultView();
            initUserViews();
            initControlPanel();
            initViewSelector();
        },

        // This function starts the state machine, including showing componentes
        start: function () {
            controller.showDefaultView();
            controller.showControlPanel();
        },

        // This function allows a ControlPanelItem to change the state of a room
        updateRoomState: function (roomID, componentName, value) {
            controller.updateRoomState(roomID, componentName, value);
        }
    };
}());
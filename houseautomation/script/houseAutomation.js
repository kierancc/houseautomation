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

    return {
        // Public Variables
        VIEWER_PLACEHOLDER_ID: "viewerParentDiv",

        SUPPORTED_ATTRIBUTES: { 'LIGHT' : 0, 'CURTAIN' : 1, 'TEMP' : 2 },

        // Public functions

        // This function initializes state but does not change the view
        initialize: function () {
            loadInitialData();
            initController();
            initDefaultViews();
        },

        // This function starts the state machine, including updating the view with current information and components
        start: function () {
            alert('application running!'); // TODO remove this. Need an executable line here in order to break in and check state
        }
    };
}());
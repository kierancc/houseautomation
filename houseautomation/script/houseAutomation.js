// Use a Javascript closure to encapsulate the houseAutomation object
// so that its state is protected from other scripts
var houseAutomation = (function () {
    // Private member variables

    // URL used to access  data from the server
    // (really just a .json file for this exercise)
    var DATA_SOURCE_URL = "../default.json";

    // The DataModel object
    var dataModel;

    // Private functions

    // This function loads the initial data
    var loadInitialData = function () {
        dataModel = new DataModel(DATA_SOURCE_URL);
    };

    // Public functions
    return {
        // This function initializes state but does not change the view
        initialize: function () {
            loadInitialData();
        },

        // This function starts the state machine, including updating the view with current information and components
        start: function () {
            alert('application running!'); // TODO remove this. Need an executable line here in order to break in and check state
        }
    };
}());
define([
    'base/js/namespace',
    'base/js/events',
    'notebook/js/codecell'  // 1-to-1 mapping between these and the function args
], function (Jupyter, events, codecell) {

    function run_import_cells() {
        var cells = Jupyter.notebook.get_cells();
        for (var ii = 0; ii < cells.length; ii++) {
            var cell = cells[ii];
            var cellText = cell.get_text();
            if ((cell instanceof codecell.CodeCell) && (cellText.includes('import'))) {
                cell.execute();
            }
        }
    }

    // Run on start
    // The specially-named function load_ipython_extension will be called
    // by the notebook when the nbextension is to be loaded.
    var load_ipython_extension = function () {
        // Add button to toolbar
        // register action
        var action = {
            icon: 'fa-superpowers', // must be part of 4.7 icon set
            help: 'Run all cells that `import`',
            help_index: 'zz', // put last when tabbing through?
            handler: run_import_cells
        };
        var action_name = 'run-imports';
        var prefix = 'run-cells';
        var action_full_name = Jupyter.notebook.keyboard_manager.actions.register(action, action_name, prefix);

        // add toolbar button
        Jupyter.toolbar.add_buttons_group([action_full_name]);
    };

    // return object to export public methods
    return {
        load_ipython_extension: load_ipython_extension
    };
});
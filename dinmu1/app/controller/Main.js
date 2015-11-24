Ext.define('Dinmu.controller.Main', {
    extend: 'Ext.app.Controller',

    //config: {
        stores: ['Settings'],
        refs: {
            mainView: 'main',
            settingsView: 'settingsview',

            btnSettings: 'main button[action=settings]',
            btnRefresh: 'settingsview button[action=refresh]',
            btnBack: 'main button[action=back]',

            toggleGeo: 'settingsview togglefield',
            fieldCity: 'settingsview textfield[name=city]',
            fieldCountry: 'settingsview textfield[name=country]',
            fieldUnits: 'settingsview selectfield'
        },
        control: {
            'btnRefresh': {
                tap: 'onRefresh'
            },
            'btnSettings': {
                tap: 'onSettingsBtnTap'
            },
            'btnBack': {
                tap: 'onBackBtnTap'
            },
            'toggleGeo': {
                change: 'onToggle'
            },
            'mainView': {
                activeitemchange: 'onCarouselChange'
            }
        },
    //},
    /*
    * When the refresh button is tapped, it will show a loading throbber,
    * then it will create a Settings record, and update this record
    * with the content of the form.
    * Next it validates the record. If it's invalid, it will showcase a
    * messagebox with error messages, else it runs the static method
    * Dinmu.utils.Functions.loadData() for loading the weather data.
    * Also don't forget to hide the loading throbber.
    */
     onRefresh: function() {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            indicator: true,
            message: 'Save Settings...'
        });

        var errorstring = "";
        var store = Ext.getStore('Settings');
        //remove previous settings
        store.removeAll();
        store.sync();

        var model = Ext.create("Dinmu.model.Setting", {});
        this.getSettingsView().updateRecord(model);
        var errors = model.validate();

        if (model.get('geo') !== true && errors.isValid() === false) {
            errors.each(function(errorObj) {
                errorstring += errorObj.getMessage() + "<br />";
            });

            Ext.Msg.alert("Oops", errorstring);

        } else {
          store.add(model);
          store.sync();
          Dinmu.utils.Functions.loadData();
        }


    },
    /* Make the settingsview the active item */
    onSettingsBtnTap: function() {
        this.getMainView().setActiveItem(0);
    },
    /* Make the mainview the active item */
    onBackBtnTap: function() {
        this.getMainView().setActiveItem(1);
    },
    /* When enabling the toggle button, all fields needs a reset and
     * and be disabled. */
    onToggle: function(togglefield, newVal, oldVal) {
        if (!newVal) {
            this.getFieldCity().enable();
            this.getFieldCountry().enable();
            this.getFieldUnits().enable();
        } else {
            this.getFieldCity().disable();
            this.getFieldUnits().disable();
            this.getFieldCountry().disable();
            this.getFieldCity().reset();
            this.getFieldCountry().reset();
        }
    },
    /* Based on the carousel change (drag up or down), it knows
    * to show and hide the back button and update the titlebar
    */
    onCarouselChange: function(carousel, newVal, oldVal) {
        if (newVal.getItemId() == "mainview") {
            this.getBtnBack().hide();
            this.getBtnSettings().show();

            Ext.ComponentQuery.query('titlebar')[0].setTitle('Do I need my Umbrella?');
        } else {
            this.getBtnBack().show();
            this.getBtnSettings().hide();

            Ext.ComponentQuery.query('titlebar')[0].setTitle('Settings');
        }
    },
    /* Called when the Application is launched.
     * Shows the mainview on load and load the correct data.
     */
    onLaunch: function(app) {
        this.getMainView().setActiveItem(1);
        Dinmu.utils.Functions.loadData();
    }
});

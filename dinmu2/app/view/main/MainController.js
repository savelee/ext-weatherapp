Ext.define('Dinmu.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

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
       this.lookupReference('settings').updateRecord(model);
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

    /* When enabling the toggle button, all fields needs a reset and
    * and be disabled. */
    onToggle: function(togglefield, newVal, oldVal) {
      var s = this.lookupReference('settings');

      if (!newVal) {
         s.down('field[name="city"]').enable();
         s.down('field[name="country"]').enable();
         s.down('field[name="units"]').enable();
      } else {
         s.down('field[name="city"]').disable();
         s.down('field[name="country"]').disable();
         s.down('field[name="units"]').disable();
         s.down('field[name="city"]').reset();
         s.down('field[name="country"]').reset();
      }
    },
    /* Based on the carousel change (drag up or down), it knows
    * to show and hide the back button and update the titlebar
    */
    onCarouselChange: function(carousel, newVal, oldVal) {
      var t = this.lookupReference('titlebar');

      if (newVal.getItemId() == "mainview") {
        t.down('button[action=back]').hide();
        t.down('button[action=settings]').show();
        t.setTitle('Do I need my Umbrella?');
      } else {
        t.down('button[action=back]').show();
        t.down('button[action=settings]').hide();
        t.setTitle('Settings');
      }
    },

    /* Make the settingsview the active item */
    onSettingsBtnTap: function() {
       this.getView().setActiveItem(0);
    },
    /* Make the mainview the active item */
    onBackBtnTap: function() {
       this.getView().setActiveItem(1);
    },
    /* Called when the Application is launched.
    * Shows the mainview on load and load the correct data.
    */
    init: function(app) {
      this.getView().setActiveItem(1);
      Dinmu.utils.Functions.loadData();
    }
});

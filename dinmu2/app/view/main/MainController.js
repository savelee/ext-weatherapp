Ext.define('Dinmu.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    requires: [
      'Ext.Deferred'
    ],

    removeAllSettings: function(){
      var d = new Ext.Deferred();
      var store = Ext.getStore('Settings');
      //console.log(store.getCount());
      if(store.getCount() == 0){
        d.resolve();
      } else {
        //console.log("remove settings");

        store.removeAll();
        store.sync({
          success: function(recs){
            d.resolve(recs);
          },
          failure: function(e){
            d.reject(e);
          }
        });
      }

      return d.promise;
    },
    addSettings: function(record){
      var d = new Ext.Deferred();
      if(record){
        var store = Ext.getStore('Settings');
        store.add(record);
        //console.log("adding settings: " + record);

        store.sync({
          failure: function(e){
            d.reject(e);
          },
          success: function(recs){
            d.resolve(recs);
          }
        });
      } else {
        d.resolve();
      }

      return d.promise;
    },
    onRefresh: function() {
       Ext.Viewport.setMasked({
           xtype: 'loadmask',
           indicator: true,
           message: 'Save Settings...'
       });

       var errorstring = "";
       var store = Ext.getStore('Settings');

       //validate
       var model = Ext.create("Dinmu.model.Setting", {});
       this.lookupReference('settings').updateRecord(model);
       var errors = model.validate();

       if (model.get('geo') !== true && errors.isValid() === false) {
           errors.each(function(errorObj) {
               errorstring += errorObj.getMessage() + "<br />";
           });

           Ext.Msg.alert("Oops", errorstring);
       } else {
         var me = this;
         me.removeAllSettings().then(
           function(records){
             //console.log("remove ok");
             me.addSettings(model).then(function(){
              //console.log("add ok, now load data");
              Dinmu.utils.Functions.loadData();
             });
           },
           function(error){
             //<debug>
             console.error(error);
             //</debug>
           }
         ).always(function(){
             Ext.Viewport.unmask();
           });
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

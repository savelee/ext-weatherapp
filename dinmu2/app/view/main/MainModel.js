Ext.define('Dinmu.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
      'Dinmu.store.Settings'
    ],

    stores: {
      'settings': {
          type: 'settings'
      }
    }
});

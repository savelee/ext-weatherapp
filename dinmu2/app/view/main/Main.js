Ext.define('Dinmu.view.main.Main', {
    extend: 'Ext.Carousel',
    xtype: 'main',
    requires: [
        'Dinmu.view.main.MainController',
        'Dinmu.view.main.MainModel',
        'Ext.TitleBar',
        'Ext.Toolbar',
        'Dinmu.view.settings.Settings'
    ],
    controller: 'main',
    viewModel: 'main',

    listeners: {
      'activeitemchange': 'onCarouselChange'
    },

    direction: 'vertical',
    items: [
    {
        xtype: 'titlebar',
        reference: 'titlebar',
        cls: 'title',
        docked: 'top',
        title: 'Do I need my Umbrella?',
        items: [{
           cls: 'back',
           hidden: true,
           ui: 'back',
           action: 'back',
           align: 'left',
           text: 'back',
           listeners: {
             'tap': 'onBackBtnTap'
           }
        },
        {
           iconCls: 'x-fa fa-cog',
           action: 'settings',
           ui: 'plain',
           align: 'right',
           listeners: {
             'tap': 'onSettingsBtnTap'
           }
        }]
    },
    {
        xtype: 'settingsview'
    },{
        itemId: 'mainview',
        cls: 'textview'
    },
    {
        xtype: 'toolbar',
        cls: 'footer',
        ui: 'light',
        docked: 'bottom',
        html: '<span>Powered by &copy; Ext JS 6</span>'
    }]

});

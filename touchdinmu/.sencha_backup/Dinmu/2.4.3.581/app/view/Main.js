Ext.define('Dinmu.view.Main', {
    extend: 'Ext.Carousel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Toolbar',
        'Dinmu.view.SettingsView'
    ],
    config: {
        direction: 'vertical',
        items: [
        {
            xtype: 'titlebar',
            cls: 'title',
            docked: 'top',
            title: 'Do I need my Umbrella?',
            items: [{
               cls: 'back',
               hidden: true,
               ui: 'back',
               action: 'back',
               align: 'left',
               text: 'back'
            },
            {
               iconCls: 'settings',
               action: 'settings',
               ui: 'plain',
               align: 'right'
            }]
        },
        {
            xtype: 'settingsview',
        },{
            itemId: 'mainview',
            cls: 'textview'
        },
        {
            xtype: 'toolbar',
            cls: 'footer',
            ui: 'light',
            docked: 'bottom',
            html: '<span>Powered by &copy; Sencha Touch</span>'
        }]
    }
});
